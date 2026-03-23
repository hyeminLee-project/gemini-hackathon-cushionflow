"use client";

import { useState, useRef } from "react";
import { useLocale } from "@/hooks/useLocale";

const MAX_SIZE_MB = 5;

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

    if (!file.type.startsWith("image/")) {
      onError(t("error.imageOnly"));
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      onError(t("error.imageSize", { max: String(MAX_SIZE_MB) }));
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
