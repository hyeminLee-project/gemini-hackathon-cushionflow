"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { MessageInput } from "@/components/MessageInput";
import { MbtiSelector } from "@/components/MbtiSelector";
import { ContextSelector } from "@/components/ContextSelector";
import { ResultCard } from "@/components/ResultCard";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useCushionConvert } from "@/hooks/useCushionConvert";
import { useLocale } from "@/hooks/useLocale";

export default function Home() {
  const { t } = useLocale();
  const [message, setMessage] = useState("");
  const [mbti, setMbti] = useState("INFP");
  const [context, setContext] = useState("휴가 중 보고");

  const { isLoading, streamingText, result, error, setError, convert } = useCushionConvert();
  const image = useImageUpload(setError);

  const handleConvert = () =>
    convert({
      message,
      mbti,
      context,
      imageBase64: image.imageBase64,
      imageMimeType: image.imageMimeType,
    });

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-24 font-sans text-zinc-50 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] h-[40%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center px-4 pt-32">
        <section className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            {t("hero.title.1")}
            <br />
            {t("hero.title.2")}
          </h1>
          <p className="text-lg font-medium text-zinc-400 md:text-xl">
            {t("hero.subtitle.1")}
            <br />
            {t("hero.subtitle.2")}
          </p>
        </section>

        <div className="w-full max-w-3xl space-y-4">
          <MessageInput
            message={message}
            onMessageChange={setMessage}
            imagePreview={image.imagePreview}
            onImageUpload={image.handleImageUpload}
            onClearImage={image.clearImage}
            isDragging={image.isDragging}
            onDragOver={image.handleDragOver}
            onDragLeave={image.handleDragLeave}
            onDrop={image.handleDrop}
            fileInputRef={image.fileInputRef}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MbtiSelector mbti={mbti} onMbtiChange={setMbti} />
            <ContextSelector context={context} onContextChange={setContext} />
          </div>

          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="group font-pj relative inline-flex w-64 items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  {t("button.loading")}
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  {t("button.convert")}
                </>
              )}
            </button>
          </div>
        </div>

        {isLoading && streamingText && (
          <div className="mt-12 w-full max-w-3xl">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("button.loading")}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-400">
                {streamingText}
              </p>
            </div>
          </div>
        )}

        {result && <ResultCard result={result} />}
      </main>
    </div>
  );
}
