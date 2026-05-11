"use client";

import { useLocale } from "@/hooks/useLocale";

interface Props {
  score: number | null;
}

export function ScorePreview({ score }: Props) {
  const { t } = useLocale();

  if (score === null) return null;

  const colorClass = score > 80 ? "bg-emerald-500" : score > 49 ? "bg-amber-500" : "bg-rose-500";
  const textClass =
    score > 80 ? "text-emerald-400" : score > 49 ? "text-amber-400" : "text-rose-400";
  const label = score > 80 ? t("score.safe") : score > 49 ? t("score.caution") : t("score.danger");

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3">
      <span className="shrink-0 text-xs font-medium text-zinc-500">{t("score.preview")}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`shrink-0 text-sm font-bold ${textClass}`}>{score}</span>
      <span className={`shrink-0 text-xs ${textClass}`}>{label}</span>
    </div>
  );
}
