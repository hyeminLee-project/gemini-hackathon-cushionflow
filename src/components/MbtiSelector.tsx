"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, ShieldCheck } from "lucide-react";
import { MBTI_TYPES } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  mbti: string;
  onMbtiChange: (value: string) => void;
  labelKey?: string;
  footerKey?: string;
  footerUnknownKey?: string;
}

export function MbtiSelector({
  mbti,
  onMbtiChange,
  labelKey = "mbti.label",
  footerKey = "mbti.footer",
  footerUnknownKey = "mbti.footer.unknown",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocale();

  return (
    <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
      <label className="mb-3 block text-sm font-semibold text-zinc-400">{t(labelKey)}</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="MBTI 유형 선택"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-left transition-colors hover:bg-black/60"
        >
          <span className="font-semibold text-zinc-200">
            {mbti === "UNKNOWN" ? t("mbti.unknown") : mbti}
          </span>
          <ChevronDown className="h-5 w-5 text-zinc-500" />
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-label="MBTI 유형 목록"
            className="custom-scrollbar absolute top-full left-0 z-50 mt-2 max-h-64 w-48 overflow-y-auto rounded-xl border border-white/10 bg-zinc-800 py-2 shadow-2xl"
          >
            <button
              role="option"
              aria-selected={mbti === "UNKNOWN"}
              className={`w-full px-4 py-2 text-left transition-colors hover:bg-white/5 ${mbti === "UNKNOWN" ? "bg-indigo-500/10 font-bold text-indigo-400" : "text-zinc-400"}`}
              onClick={() => {
                onMbtiChange("UNKNOWN");
                setIsOpen(false);
              }}
            >
              {mbti === "UNKNOWN" && <CheckCircle2 className="mr-2 inline-block h-4 w-4" />}
              {t("mbti.unknown")}
            </button>
            <div className="mx-3 my-1 border-t border-white/5" />
            {MBTI_TYPES.filter((type) => type !== "UNKNOWN").map((type) => (
              <button
                key={type}
                role="option"
                aria-selected={mbti === type}
                className={`w-full px-4 py-2 text-left transition-colors hover:bg-white/5 ${mbti === type ? "bg-indigo-500/10 font-bold text-indigo-400" : "text-zinc-300"}`}
                onClick={() => {
                  onMbtiChange(type);
                  setIsOpen(false);
                }}
              >
                {mbti === type && <CheckCircle2 className="mr-2 inline-block h-4 w-4" />}
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="mt-3 flex items-center gap-1 text-xs text-zinc-500">
        <ShieldCheck className="h-3 w-3" />{" "}
        {mbti === "UNKNOWN" ? t(footerUnknownKey) : t(footerKey, { mbti })}
      </p>
    </div>
  );
}
