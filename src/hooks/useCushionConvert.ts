"use client";

import { useState } from "react";
import { CushionResponsePayload } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

export function useCushionConvert() {
  const { locale, t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CushionResponsePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = async (params: {
    message: string;
    mbti: string;
    senderMbti: string;
    context: string;
    imageBase64: string | null;
    imageMimeType: string | null;
  }) => {
    if (!params.message.trim() && !params.imageBase64) {
      setError(t("error.emptyMessage"));
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
          senderMbti: params.senderMbti,
          context: params.context,
          imageBase64: params.imageBase64,
          imageMimeType: params.imageMimeType,
          locale,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t("error.generic"));
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("error.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, result, error, setError, convert };
}
