"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  onTryDemo: () => void;
}

export function DemoCard({ onTryDemo }: Props) {
  const { t } = useLocale();

  return (
    <div className="w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
          <Sparkles className="h-3 w-3" />
          {t("demo.badge")}
        </span>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <span className="mb-2 inline-block rounded-md bg-rose-500/20 px-2 py-0.5 text-xs font-bold text-rose-400">
              {t("demo.label.before")}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{t("demo.before")}</p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <span className="mb-2 inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
              {t("demo.label.after")}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{t("demo.after")}</p>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={onTryDemo}
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-200"
          >
            {t("demo.button")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
