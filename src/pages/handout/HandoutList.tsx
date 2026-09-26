import {Link, useOutletContext} from "react-router";
import HandoutCard from "./HandoutCard.tsx";
import type {HandoutOutletContext} from "./HandoutLayout.tsx";
import {useEffect, useState} from "react";
import HandoutBullet from "./HandoutBullet.tsx";
import type {Template} from "../../types/template.ts";
import {templateById, templates} from "./templates.ts";

const HandoutList = () => {
    const {handouts, setHandouts} = useOutletContext<HandoutOutletContext>();
    const [selectedId, setSelectedId] = useState<string | undefined>(handouts[0]?.id);
    const [open, setOpen] = useState(false);

    const selected = handouts.find((handout) => handout.id === selectedId);

    useEffect(() => {
        setHandouts((prev) =>
            prev.map((handout) => ({...handout, status: 'editing'})),
        );
    }, [setHandouts]);

    function updateValue(id: string, fieldId: string, value: string) {
        setHandouts((prev) =>
            prev.map((handout) =>
                handout.id === id
                    ? {...handout, values: {...handout.values, [fieldId]: value}}
                    : handout,
            ),
        );
    }

    function loadTemplate(chosen: Template, id: string) {
        setHandouts((prev) =>
            prev.map((handout) =>
                handout.id === id
                    ? {...handout, templateId: chosen.id}
                    : handout,
            ),
        );
    }

    return (
        <div>
            <div className="flex items-center justify-center w-full">
                {
                    selected &&
                    <HandoutCard
                        key={selected.id}
                        handout={selected}
                        template={templateById(selected.templateId)}
                        onChangeValue={(fieldId, value) => updateValue(selected.id, fieldId, value)}
                    />
                }
            </div>
            {selected &&
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setOpen((prev) => !prev)}
                >템플릿 변경
                </button>
            }
            {open && selected &&
                templates.map((item) => (
                    <button type="button"
                            key={item.id}
                            onClick={() =>
                                loadTemplate(item, selected.id)}>
                        {item.subject}
                    </button>
                ))}
            { /*아래쪽 생성, 복사, 삭제 UI*/}

            <div>
                <ul className="flex items-center gap-2">
                    {
                        handouts && handouts.map((handout) => (
                            <li key={handout.id}
                                className="list-none"
                            >
                                <div
                                    className="cursor-pointer select-none"
                                    style={{zoom: 1 / 6}}
                                    onClick={() => setSelectedId(handout.id)}
                                >
                                    <HandoutCard
                                        handout={{...handout, status: 'done'}}
                                        template={templateById(handout.templateId)}
                                    />
                                </div>
                                <input
                                    className="w-20 text-sm leading-tight focus:outline-none"
                                    type="text"
                                    value={handout.subject}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setHandouts((prev) =>
                                            prev.map((item) =>
                                                item.id === handout.id
                                                    ? {...item, subject: value}
                                                    : item,
                                            ),
                                        );
                                    }}
                                />
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setHandouts((prev) => {
                                            const nextId = String(
                                                handouts.reduce((max, item) => Math.max(max, Number(item.id)), 0) + 1,
                                            );

                                            return [
                                                ...prev,
                                                {
                                                    id: String(nextId),
                                                    templateId: handout.templateId,
                                                    subject: `복제 - ${handout.subject}`,
                                                    status: 'editing',
                                                    values: {...handout.values},
                                                }
                                            ]
                                        });
                                    }}
                                >복제
                                </button>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        const rest = handouts.filter((item) => item.id !== handout.id);

                                        const lastId = String(
                                            rest.reduce((max, item) => Math.max(max, Number(item.id)), 0),
                                        );

                                        setHandouts((prev) => prev.filter((item) => item.id !== handout.id));
                                        if (selectedId === handout.id) {
                                            setSelectedId(rest.length === 0 ? undefined : lastId);
                                        }
                                    }}>
                                    삭제
                                </button>

                            </li>
                        ))
                    }
                </ul>
            </div>

            {/*일괄 수정용*/}
            {
                handouts && handouts.map((handout) => (
                    <HandoutBullet
                        key={handout.id}
                        handout={{...handout}}
                        template={templateById(handout.templateId)}
                        onChangeValue={(fieldId, value) => updateValue(handout.id, fieldId, value)}
                    />
                ))
            }

            <Link
                to="complete"
                onClick={() => {
                    setHandouts((prev) =>
                        prev.map((handout) => ({...handout, status: 'done'})),
                    );
                }}>완료</Link>
            <button type="button"
                    className="cursor-pointer"
                    onClick={() => {
                        const nextId = String(
                            handouts.reduce((max, item) => Math.max(max, Number(item.id)), 0) + 1,
                        );

                        setHandouts((prev) => {
                            const lastHandout =
                                prev.length === 0
                                    ? undefined
                                    : prev.reduce((latest, handout) =>
                                        Number(handout.id) > Number(latest.id) ? handout : latest,
                                    );
                            const source = templateById(lastHandout?.templateId ?? templates[0].id);

                            return [
                                ...prev,
                                {
                                    id: nextId,
                                    templateId: source.id,
                                    subject: `핸드아웃(${nextId})`,
                                    status: 'editing',
                                    values: Object.fromEntries(
                                        source.fields
                                            .filter((field) => field.type !== "image")
                                            .map((field) => [field.id, field.label]),
                                    ),
                                },
                            ]
                        });
                        if (!selected) setSelectedId(nextId);

                    }}
            >
                생성
            </button>
        </div>
    );
};

export default HandoutList;
