"use client";

import { ShieldCheck } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  insights: string[];
}

export function AnalysisCard({ insights }: Props) {
  const { t } = useLocale();
  const data = Array.isArray(insights) ? insights : typeof insights === "string" ? [insights] : [];

  return (
    <div className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-400">
        <ShieldCheck className="h-4 w-4 text-indigo-400" />
        {t("analysis.title")}
      </h3>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 p-5 backdrop-blur-md">
        <ul className="space-y-4">
          {data.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-400">
                {idx + 1}
              </span>
              <p className="flex-1 text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
