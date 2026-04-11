"use client";

import { ImagePlus, X } from "lucide-react";
import type { RefObject } from "react";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  message: string;
  onMessageChange: (value: string) => void;
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => void;
  onClearImage: () => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export function MessageInput({
  message,
  onMessageChange,
  imagePreview,
  onImageUpload,
  onClearImage,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
}: Props) {
  const { t } = useLocale();

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
      <label className="mb-3 block text-sm font-semibold text-zinc-400">{t("input.label")}</label>
      <div
        className={`relative rounded-xl p-1 transition-all duration-300 ${isDragging ? "border-2 border-dashed border-indigo-400 bg-indigo-500/20" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-zinc-900/80 backdrop-blur-sm">
            <p className="flex items-center gap-2 font-bold text-indigo-400">
              <ImagePlus className="h-5 w-5 animate-bounce" />
              {t("input.dragText")}
            </p>
          </div>
        )}
        <textarea
          className="h-32 w-full resize-none border-none bg-transparent text-lg text-zinc-200 placeholder:text-zinc-600 focus:ring-0 focus:outline-none"
          placeholder={t("input.placeholder")}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
        />

        {imagePreview ? (
          <div className="relative mt-4 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Uploaded"
              className="max-h-32 rounded-lg border border-white/10 opacity-80"
            />
            <button
              onClick={onClearImage}
              aria-label="이미지 삭제"
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-4 flex">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
            >
              <ImagePlus className="h-4 w-4" />
              {t("input.attachButton")}
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
