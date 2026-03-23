import { z } from "zod/v4";

export const MBTI_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export const cushionRequestSchema = z
  .object({
    originalMessage: z.string().max(2000).default(""),
    mbti: z.enum(MBTI_TYPES),
    context: z.string().min(1).max(100),
    imageBase64: z.string().max(10_000_000).nullable().optional(),
    imageMimeType: z
      .string()
      .regex(/^image\//)
      .nullable()
      .optional(),
    locale: z.enum(["ko", "en", "ja", "zh", "fr", "de"]).default("ko"),
  })
  .refine((data) => data.originalMessage.trim() || data.imageBase64, {
    message: "메시지 또는 이미지를 제공해주세요.",
  });

export type CushionRequestPayload = z.infer<typeof cushionRequestSchema>;

export interface CushionResponsePayload {
  score: number;
  suggestion: string;
  koreanTranslation?: string | null;
  insights: string[];
}
