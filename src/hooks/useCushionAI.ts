import { useState } from "react";
import { CushionRequestPayload, CushionResponsePayload } from "@/lib/types";

export function useCushionAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CushionResponsePayload | null>(null);
    const [error, setError] = useState<string | null>(null);

    const submitToAI = async (payload: CushionRequestPayload) => {
        if (!payload.originalMessage?.trim() && !payload.imageBase64) {
            setError("전달할 메시지를 입력하거나 캡처한 이미지를 첨부해주세요.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/cushion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "오류가 발생했습니다.");
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, result, error, submitToAI };
}
