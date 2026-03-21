"use client";

import { useState } from "react";
import { CushionResponsePayload } from "@/lib/types";

export function useCushionConvert() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CushionResponsePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = async (params: {
    message: string;
    mbti: string;
    context: string;
    imageBase64: string | null;
    imageMimeType: string | null;
  }) => {
    if (!params.message.trim() && !params.imageBase64) {
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
        body: JSON.stringify({
          originalMessage: params.message,
          mbti: params.mbti,
          context: params.context,
          imageBase64: params.imageBase64,
          imageMimeType: params.imageMimeType,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "오류가 발생했습니다.");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, result, error, setError, convert };
}
