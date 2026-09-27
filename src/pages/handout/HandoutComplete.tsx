import {useOutletContext} from "react-router";
import type {HandoutOutletContext} from "./HandoutLayout.tsx";
import HandoutCard from "./HandoutCard.tsx";
import {useEffect, useRef} from "react";
import type {Handout} from "../../types/handout.ts";
import type {Template} from "../../types/template.ts";
import {templateById} from "./templates.ts";

const HandoutComplete = () => {

    const {handouts, setHandouts} = useOutletContext<HandoutOutletContext>();
    useEffect(() => {
        setHandouts((prev) =>
            prev.map((handout) => ({...handout, status: 'done'})),
        );
    }, [setHandouts]);

    function copyHandout(element: HTMLDivElement | null) {
        if (!element) return;
        const selection = window.getSelection();
        if (!selection) return;
        const range = document.createRange();
        range.selectNode(element);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();

        alert('복사 완료');
    }


    function HandoutCopyItem({handout, template}: { handout: Handout; template: Template }) {
        const cardRef = useRef<HTMLDivElement>(null);
        return (
            <li>
                <div ref={cardRef}>
                    <HandoutCard handout={handout} template={template}/>
                </div>
                <button type="button" onClick={() => copyHandout(cardRef.current)}>
                    복사
                </button>
            </li>
        );
    }

    return (
        <div>
            <ul>
                {
                    handouts.map((handout) => (
                        <HandoutCopyItem
                            key={handout.id}
                            handout={handout}
                            template={templateById(handout.templateId)}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default HandoutComplete;
