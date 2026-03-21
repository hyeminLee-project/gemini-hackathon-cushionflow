"use client";

import { useState, useRef } from "react";
import { CushionResponsePayload } from "@/lib/types";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { MessageInput } from "@/components/MessageInput";
import { MbtiSelector } from "@/components/MbtiSelector";
import { ContextSelector } from "@/components/ContextSelector";
import { ResultCard } from "@/components/ResultCard";

export default function Home() {
  const [message, setMessage] = useState("");
  const [mbti, setMbti] = useState("INFP");
  const [context, setContext] = useState("휴가 중 보고");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CushionResponsePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const file = "dataTransfer" in e ? e.dataTransfer.files?.[0] : e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`이미지 크기는 ${MAX_SIZE_MB}MB 이하만 업로드 가능합니다.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setImageBase64((reader.result as string).split(",")[1]);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConvert = async () => {
    if (!message.trim() && !imageBase64) {
      setError("전달할 메시지를 입력하거나 캡처한 이미지를 첨부해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/cushion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalMessage: message,
          mbti,
          context,
          imageBase64,
          imageMimeType,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "오류가 발생했습니다.");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-24 font-sans text-zinc-50 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] h-[40%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center px-4 pt-32">
        <section className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            사내 갈등 제로,
            <br />
            완만한 커뮤니케이션의 시작
          </h1>
          <p className="text-lg font-medium text-zinc-400 md:text-xl">
            긴박함과 배려 사이의 간극을 AI가 메워드립니다.
            <br />
            MBTI 기반 최적 쿠션어로 자동 변환합니다.
          </p>
        </section>

        <div className="w-full max-w-3xl space-y-4">
          <MessageInput
            message={message}
            onMessageChange={setMessage}
            imagePreview={imagePreview}
            onImageUpload={handleImageUpload}
            onClearImage={clearImage}
            isDragging={isDragging}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleImageUpload(e);
            }}
            fileInputRef={fileInputRef}
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
                  AI 분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  쿠션어로 변환하기
                </>
              )}
            </button>
          </div>
        </div>

        {result && <ResultCard result={result} />}
      </main>
    </div>
  );
}
