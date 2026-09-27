import './style.css';
import type {Template} from "../../types/template.ts";
import type {Handout} from "../../types/handout.ts";

type HandoutCardProps = {
    handout: Handout;
    template: Template;
    onChangeValue?: (fieldId: string, value: string) => void;
};

function resizeTextarea(element: HTMLTextAreaElement) {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
}

const HandoutCard =
    ({handout, template, onChangeValue}: HandoutCardProps) => {
        return (
            <div className="handout-card flex flex-column align-items-center"
                 style={{
                     backgroundColor: template.backgroundColor ? template.backgroundColor : undefined,
                     width: template.width ? `${template.width}px` : '100%'
                 }}>
                {template.headerImage && <img alt="" aria-hidden="true" src={template.headerImage}/>}

                {template.fields.map((field) => {
                        const textStyle = {
                            color: field.color ? field.color : '#000000',
                            fontSize: field.size ? `${field.size}pt` : undefined,
                            textAlign: field.textAlign ? field.textAlign : 'left',
                        };

                        if (field.type === 'image') {
                            return field.imageUrl ? (
                                <div
                                    key={field.id}
                                    className="handout-image"
                                    style={{margin: field.margin ? `${field.margin}px auto` : undefined,}}
                                >
                                    <img key={field.id}
                                         src={field.imageUrl}
                                         alt={field.label}
                                         style={{margin: '0 auto'}}
                                    />
                                </div>
                            ) : null;
                        }

                        if (handout.status === 'done') {
                            return (
                                <div
                                    key={field.id}
                                    className={field.type === 'textarea' ? 'handout-textarea' : 'handout-input'}
                                    style={{
                                        margin: field.margin ? `${field.margin}px auto` : '0 auto',
                                    }}>
                                    <p key={field.id} style={{...textStyle, whiteSpace: 'pre-wrap'}}>
                                        {handout.values[field.id]}
                                    </p>
                                </div>
                            )
                        }


                        if (field.type === 'textarea') {
                            return (
                                <div
                                    key={field.id}
                                    className="handout-textarea"
                                    style={{
                                        margin: field.margin ? `${field.margin}px auto` : undefined,
                                    }}>
                                <textarea
                                    ref={(node) => {
                                        if (node) resizeTextarea(node);
                                    }}
                                    className="textarea"
                                    key={field.id}
                                    value={handout.values[field.id] ?? ''}
                                    onChange={(e) => {
                                        onChangeValue?.(field.id, e.target.value);
                                        resizeTextarea(e.target);
                                    }}
                                    style={textStyle}
                                />
                                </div>
                            )
                        }

                        return (
                            <div
                                className="handout-input"
                                style={{margin: field.margin ? `${field.margin}px auto` : undefined,}}
                                key={field.id}
                            >
                                <input
                                    type="text"
                                    key={field.id}
                                    value={handout.values[field.id]}
                                    onChange={(e) => {
                                        onChangeValue?.(field.id, e.target.value)
                                    }}
                                    style={textStyle}
                                />
                            </div>
                        )
                    }
                )}
                {template.footerImage && <img alt="" aria-hidden="true" src={template.footerImage}/>}
            </div>
        )
            ;
    };

export default HandoutCard;
