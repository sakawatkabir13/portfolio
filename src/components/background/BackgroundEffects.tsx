"use client";

import React, { useEffect, useState } from "react";
import { MatrixRain } from "@/components/background/MatrixRain";
import { NetworkTelemetry } from "@/components/background/NetworkTelemetry";
import {
  BACKGROUND_MODE_EVENT,
  BACKGROUND_MODE_STORAGE_KEY,
  LEGACY_MATRIX_STORAGE_KEY,
  isBackgroundMode,
  readBackgroundMode,
  type BackgroundMode
} from "@/components/background/background-mode";

export function BackgroundEffects() {
  const [mode, setMode] = useState<BackgroundMode>("network");

  useEffect(() => {
    const storedMode = readBackgroundMode(window.localStorage);
    setMode(storedMode);
    window.localStorage.setItem(BACKGROUND_MODE_STORAGE_KEY, storedMode);
    window.localStorage.removeItem(LEGACY_MATRIX_STORAGE_KEY);

    function handleModeChange(event: Event) {
      const nextMode = (event as CustomEvent<{ mode?: string }>).detail?.mode ?? null;
      if (isBackgroundMode(nextMode)) setMode(nextMode);
    }

    window.addEventListener(BACKGROUND_MODE_EVENT, handleModeChange);
    return () => window.removeEventListener(BACKGROUND_MODE_EVENT, handleModeChange);
  }, []);

  if (mode === "off") return null;
  if (mode === "matrix") return <MatrixRain className="opacity-[0.35]" />;

  return <NetworkTelemetry />;
}
