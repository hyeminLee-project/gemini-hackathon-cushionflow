"use client";

import { useState } from "react";
import { ShieldCheck, Globe } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { LOCALE_LABELS, type Locale } from "@/lib/i18n";

const LOCALES = Object.keys(LOCALE_LABELS) as Locale[];

export function Header() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white/90">CushionFlow</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
          >
            <Globe className="h-4 w-4" />
            {LOCALE_LABELS[locale]}
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 rounded-xl border border-white/10 bg-zinc-800 py-2 shadow-2xl">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                    locale === l ? "bg-indigo-500/10 font-bold text-indigo-400" : "text-zinc-300"
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
