"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/hooks/useLocale";

const STEP_KEYS = ["loading.step1", "loading.step2", "loading.step3", "loading.step4"];
const STEP_INTERVAL = 2500;

export function useLoadingSteps(isLoading: boolean) {
  const { t } = useLocale();
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setStepIndex(0);
      intervalRef.current = setInterval(() => {
        setStepIndex((prev) => Math.min(prev + 1, STEP_KEYS.length - 1));
      }, STEP_INTERVAL);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoading]);

  return {
    stepMessage: t(STEP_KEYS[stepIndex]),
    progress: ((stepIndex + 1) / STEP_KEYS.length) * 100,
  };
}
