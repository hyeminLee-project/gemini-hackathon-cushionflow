"use client";

import { useLocale } from "@/hooks/useLocale";
import { CONTEXT_KEYS, getContextValue } from "@/lib/i18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  context: string;
  onContextChange: (value: string) => void;
}

export function ContextSelector({ context, onContextChange }: Props) {
  const { t } = useLocale();

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
      <label className="mb-3 block text-sm font-semibold text-zinc-400">{t("context.label")}</label>
      <div className="flex flex-wrap gap-2">
        {CONTEXT_KEYS.map((key) => {
          const value = getContextValue(key);
          return (
            <Tooltip key={key}>
              <TooltipTrigger
                onClick={() => onContextChange(value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  context === value
                    ? "border-indigo-500 bg-indigo-600/30 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    : "border-white/5 bg-black/40 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                {t(key)}
              </TooltipTrigger>
              <TooltipContent side="bottom">{t(`${key}.desc`)}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
