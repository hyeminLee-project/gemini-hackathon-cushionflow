"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import { CushionResponsePayload } from "@/lib/types";
import { ScoreIndicator } from "./ScoreIndicator";
import { AnalysisCard } from "./AnalysisCard";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  result: CushionResponsePayload;
}

export function ResultCard({ result }: Props) {
  const { t } = useLocale();
  const [isCopied, setIsCopied] = useState(false);
  const [activeTone, setActiveTone] = useState(1);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setIsCopied(true);
      copyTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch {
      /* clipboard API may fail in some contexts */
    }
  };

  const suggestions = result.suggestions;
  const hasToneVariants = suggestions && suggestions.length > 0;
  const activeSuggestion = hasToneVariants
    ? (suggestions[activeTone]?.suggestion ?? result.suggestion)
    : result.suggestion;
  const activeTranslation = hasToneVariants
    ? (suggestions[activeTone]?.koreanTranslation ?? result.koreanTranslation)
    : result.koreanTranslation;

  return (
    <div
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-4 mt-12 w-full max-w-3xl space-y-6 duration-700"
    >
      <div className="rounded-3xl bg-linear-to-br from-indigo-500/40 via-purple-500/40 to-rose-500/40 p-1 opacity-100 transition-opacity">
        <div className="h-full rounded-[23px] bg-zinc-950 p-8 backdrop-blur-xl">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <ScoreIndicator score={result.score} />

            <div className="flex-1 space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                    <Sparkles className="h-5 w-5" />
                    {t("result.suggestion")}
                  </h3>
                  <button
                    onClick={() => handleCopy(activeSuggestion)}
                    aria-label="추천 메시지 복사"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">{t("result.copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t("result.copy")}
                      </>
                    )}
                  </button>
                </div>

                {hasToneVariants && (
                  <div className="mb-3 flex gap-1 rounded-lg border border-white/5 bg-black/30 p-1">
                    {suggestions.map((variant, i) => (
                      <button
                        key={variant.tone}
                        onClick={() => setActiveTone(i)}
                        className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                          activeTone === i
                            ? "bg-indigo-600/30 text-indigo-200"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {variant.tone}
                      </button>
                    ))}
                  </div>
                )}

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap text-zinc-200">
                    {activeSuggestion}
                  </p>
                </div>

                {activeTranslation && (
                  <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                      {t("result.translation")}
                    </h4>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                      {activeTranslation}
                    </p>
                  </div>
                )}
              </div>

              <AnalysisCard insights={result.insights} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
