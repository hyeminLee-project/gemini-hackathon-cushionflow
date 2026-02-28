export interface CushionRequestPayload {
    originalMessage: string;
    mbti: string;
    context: string;
    imageBase64?: string | null;
    imageMimeType?: string | null;
}

export interface CushionResponsePayload {
    score: number;
    suggestion: string;
    koreanTranslation?: string | null;
    insights: string[];
}
