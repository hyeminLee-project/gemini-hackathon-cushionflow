"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { DemoCard } from "@/components/DemoCard";
import { MessageInput } from "@/components/MessageInput";
import { MbtiSelector } from "@/components/MbtiSelector";
import { ContextSelector } from "@/components/ContextSelector";
import { ResultCard } from "@/components/ResultCard";
import { ResultSkeleton } from "@/components/ResultSkeleton";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useCushionConvert } from "@/hooks/useCushionConvert";
import { useLocale } from "@/hooks/useLocale";

export default function Home() {
  const { t } = useLocale();
  const [message, setMessage] = useState("");
  const [senderMbti, setSenderMbti] = useState("UNKNOWN");
  const [mbti, setMbti] = useState("INFP");
  const [context, setContext] = useState("휴가 중 보고");

  const { isLoading, result, error, setError, convert } = useCushionConvert();
  const image = useImageUpload(setError);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleConvert = () =>
    convert({
      message,
      mbti,
      senderMbti,
      context,
      imageBase64: image.imageBase64,
      imageMimeType: image.imageMimeType,
    });

  const handleDemo = () => {
    const demoMessage = t("demo.before");
    const demoMbti = "ISTJ";
    const demoContext = "상사 실수 지적";
    setMessage(demoMessage);
    setMbti(demoMbti);
    setContext(demoContext);
    setSenderMbti("UNKNOWN");
    convert({
      message: demoMessage,
      mbti: demoMbti,
      senderMbti: "UNKNOWN",
      context: demoContext,
      imageBase64: null,
      imageMimeType: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-24 font-sans text-zinc-50 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] h-[40%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center px-4 pt-32">
        <section className="mb-12 text-center">
          <h1 className="mb-4 bg-linear-to-b from-white to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
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

        <DemoCard onTryDemo={handleDemo} />

        <div className="mt-8 w-full max-w-3xl space-y-4">
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
            <MbtiSelector
              mbti={senderMbti}
              onMbtiChange={setSenderMbti}
              labelKey="senderMbti.label"
              footerKey="senderMbti.footer"
              footerUnknownKey="senderMbti.footer.unknown"
            />
            <MbtiSelector mbti={mbti} onMbtiChange={setMbti} />
          </div>
          <ContextSelector context={context} onContextChange={setContext} />

          {error && (
            <div
              role="alert"
              className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400"
            >
              <AlertCircle className="h-5 w-5 shrink-0" />
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

        <div ref={resultRef}>
          {isLoading && <ResultSkeleton />}
          {result && !isLoading && <ResultCard result={result} />}
        </div>
      </main>
    </div>
  );
}
