export type HandoutStatus = 'editing' | 'done';

export type Handout = {
    id: string;
    templateId: string;
    subject: string;
    // 확장을 고려하여 values는 Record 처리
    values: Record<string, string>;
    status: HandoutStatus;
}