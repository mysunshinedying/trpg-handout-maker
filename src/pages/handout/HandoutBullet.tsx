import type {Handout} from "../../types/handout.ts";
import type {Template} from "../../types/template.ts";

type HandoutBulletProps = {
    handout: Handout;
    template: Template;
    onChangeValue?: (fieldId: string, value: string) => void;
};

function resizeTextarea(element: HTMLTextAreaElement) {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
}

const HandoutBullet =
    ({handout, template, onChangeValue}: HandoutBulletProps) => {
        return (
            <div>
                {template.fields.map((field) => {
                        if (field.type === "image") return null;

                        if (field.type === 'textarea') {
                            return (
                                <div key={field.id}>
                                <textarea
                                    ref={(node) => {
                                        if (node) resizeTextarea(node);
                                    }}
                                    className="textarea"
                                    value={handout.values[field.id] ?? ''}
                                    onChange={(e) => {
                                        onChangeValue?.(field.id, e.target.value);
                                        resizeTextarea(e.target);
                                    }}
                                />
                                </div>
                            )
                        }

                        return (
                            <div key={field.id}>
                                <input
                                    type="text"
                                    key={field.id}
                                    value={handout.values[field.id]}
                                    onChange={(e) => {
                                        onChangeValue?.(field.id, e.target.value)
                                    }}
                                />
                            </div>
                        )
                    }
                )}
            </div>
        )
    }

export default HandoutBullet;
