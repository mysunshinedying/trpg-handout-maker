import type {Template} from "../../types/template.ts";
import {initialTemplate} from "./mock.ts";

export const templates: Template[] = [
    initialTemplate,
    {
        ...initialTemplate,
        id: "2",
        subject: "다른 양식",
        backgroundColor: "#1a1a1a",
    },
];

export function templateById(id: string) {
    return templates.find((item) => item.id === id) ?? initialTemplate;
}
