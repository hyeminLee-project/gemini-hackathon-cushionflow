"use client";

import { ShieldCheck, Globe } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export function Header() {
  const { locale, setLocale } = useLocale();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white/90">CushionFlow</span>
        </div>

        <button
          onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
        >
          <Globe className="h-4 w-4" />
          {locale === "ko" ? "EN" : "KO"}
        </button>
      </div>
    </header>
  );
}
