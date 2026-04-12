"use client";

import { useState, useRef } from "react";
import { useLocale } from "@/hooks/useLocale";

const MAX_SIZE_MB = 5;
const MAX_DIMENSION = 1536;
const COMPRESS_QUALITY = 0.8;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

function compressImage(file: File): Promise<{ base64: string; dataUrl: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));

      ctx.drawImage(img, 0, 0, width, height);

      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const dataUrl = canvas.toDataURL(outputType, COMPRESS_QUALITY);

      resolve({
        base64: dataUrl.split(",")[1],
        dataUrl,
        mimeType: outputType,
      });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export function useImageUpload(onError: (msg: string) => void) {
  const { t } = useLocale();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const file = "dataTransfer" in e ? e.dataTransfer.files?.[0] : e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      onError(t("error.imageOnly"));
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      onError(t("error.imageSize", { max: String(MAX_SIZE_MB) }));
      return;
    }

    compressImage(file)
      .then(({ base64, dataUrl, mimeType }) => {
        setImagePreview(dataUrl);
        setImageBase64(base64);
        setImageMimeType(mimeType);
      })
      .catch(() => {
        onError(t("error.imageOnly"));
      });
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e);
  };

  return {
    imagePreview,
    imageBase64,
    imageMimeType,
    isDragging,
    fileInputRef,
    handleImageUpload,
    clearImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
