export type FieldType = 'input' | 'textarea' | 'image';

export type Template = {
    id: string;
    subject: string;
    backgroundColor?: string;
    backgroundImage?: string;
    headerImage?: string;
    footerImage?: string;
    width: number;
    fields: TemplateField[];
}

// 확장을 고려하여 TemplateField 처리
export type TemplateField = {
    id: string;
    label: string;
    type: FieldType;
    color?: string;
    size?: number;
    imageUrl?: string;
    textAlign?: 'left' | 'center' | 'right';
    margin: number;
};