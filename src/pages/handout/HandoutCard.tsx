import './style.css';
import type {Template} from "../../types/template.ts";
import type {Handout} from "../../types/handout.ts";

type HandoutCardProps = {
    handout: Handout;
    template: Template;
    onChangeValue: (fieldId: string, value: string) => void;
};

const HandoutCard =
    ({handout, template, onChangeValue}: HandoutCardProps) => {
        return (
            <div className="handout-card flex flex-column align-items-center"
                 style={{
                     backgroundColor: template.backgroundColor ? template.backgroundColor : undefined,
                     width: template.width ? `${template.width}px` : '100%'
                 }}>
                {template.headerImage && <img src={template.headerImage}/>}

                {template.fields.map((field) => {
                        if (field.type === 'image') {
                            return field.imageUrl ? (
                                <img key={field.id} src={field.imageUrl} alt={field.label}/>
                            ) : null;
                        }

                        if (field.type === 'textarea') {
                            return (
                                <textarea
                                    key={field.id}
                                    value={handout.values[field.id] ?? ''}
                                    onChange={(e) => {
                                        onChangeValue(field.id, e.target.value)
                                    }}
                                    style={{
                                        color: field.color ? field.color : '#000000',
                                        fontSize: field.size ? `${field.size}pt` : undefined,
                                        textAlign: field.textAlign ? field.textAlign : 'left',
                                    }}
                                />
                            )
                        }

                        return (
                            <input
                                type="text"
                                key={field.id}
                                value={handout.values[field.id]}
                                onChange={(e) => {
                                    onChangeValue(field.id, e.target.value)
                                }}
                                style={{
                                    color: field.color ? field.color : '#000000',
                                    fontSize: field.size ? `${field.size}pt` : undefined,
                                    textAlign: field.textAlign ? field.textAlign : 'left',
                                }}
                            />
                        )
                    }
                )}
                {template.footerImage && <img src={template.footerImage}/>}
            </div>
        )
            ;
    };

export default HandoutCard;
