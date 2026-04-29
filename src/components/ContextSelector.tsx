"use client";

import { useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import { CONTEXT_KEYS, getContextValue } from "@/lib/i18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  context: string;
  onContextChange: (value: string) => void;
}

export function ContextSelector({ context, onContextChange }: Props) {
  const { t } = useLocale();
  const [isCustom, setIsCustom] = useState(false);
  const [customText, setCustomText] = useState("");

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
      <label className="mb-3 block text-sm font-semibold text-zinc-400">{t("context.label")}</label>
      <div className="flex flex-wrap gap-2">
        {CONTEXT_KEYS.map((key) => {
          const value = getContextValue(key);
          return (
            <Tooltip key={key}>
              <TooltipTrigger
                onClick={() => {
                  setIsCustom(false);
                  onContextChange(value);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  !isCustom && context === value
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
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              setIsCustom(true);
              onContextChange(customText);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              isCustom
                ? "border-indigo-500 bg-indigo-600/30 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                : "border-white/5 bg-black/40 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}
          >
            {t("context.custom")}
          </TooltipTrigger>
          <TooltipContent side="bottom">{t("context.custom.desc")}</TooltipContent>
        </Tooltip>
      </div>
      {isCustom && (
        <input
          type="text"
          value={customText}
          onChange={(e) => {
            setCustomText(e.target.value);
            onContextChange(e.target.value);
          }}
          maxLength={100}
          placeholder={t("context.custom.placeholder")}
          className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          autoFocus
        />
      )}
    </div>
  );
}
