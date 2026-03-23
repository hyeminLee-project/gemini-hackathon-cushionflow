"use client";

import { useState } from "react";
import { CushionResponsePayload } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

export function useCushionConvert() {
  const { locale, t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
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
      setError(t("error.emptyMessage"));
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setStreamingText("");

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
          locale,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || t("error.generic"));
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error(t("error.generic"));

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const data = line.replace(/^data: /, "");
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);

            if (parsed.error) {
              setError(parsed.error);
              setIsLoading(false);
              return;
            }

            if (parsed.chunk) {
              setStreamingText((prev) => prev + parsed.chunk);
            }

            if (parsed.done && parsed.result) {
              setResult(parsed.result);
              setStreamingText("");
            }
          } catch {
            // skip malformed SSE data
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("error.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, streamingText, result, error, setError, convert };
}
