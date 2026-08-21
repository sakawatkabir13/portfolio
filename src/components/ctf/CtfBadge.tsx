"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const STORAGE_KEY = "basilisk:ctf-solved";

export function CtfBadge() {
  const [solvedCount, setSolvedCount] = useState(0);
  const total = portfolio.ctf.challenges.length;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSolvedCount(parsed.filter((s): s is string => typeof s === "string").length);
        }
      }
    } catch {
      // ignore
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          setSolvedCount(parsed.length);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (solvedCount < total) return null;

  return (
    <span className="inline-flex items-center gap-2 border border-mint/40 bg-mint/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-mint">
      <ShieldCheck className="h-3.5 w-3.5" />
      ctf verified · {solvedCount}/{total}
    </span>
  );
}
