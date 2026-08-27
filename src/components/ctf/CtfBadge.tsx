"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import {
  CTF_SOLVED_EVENT,
  CTF_STORAGE_KEY,
  parseSolvedChallenges
} from "@/components/ctf/ctf-state";

export function CtfBadge() {
  const [solvedCount, setSolvedCount] = useState(0);
  const total = portfolio.ctf.challenges.length;
  const challengeIds: string[] = portfolio.ctf.challenges.map(
    (challenge) => challenge.id
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CTF_STORAGE_KEY);
      setSolvedCount(parseSolvedChallenges(raw, challengeIds).length);
    } catch {
      // ignore
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== CTF_STORAGE_KEY) return;
      setSolvedCount(parseSolvedChallenges(e.newValue, challengeIds).length);
    };

    const onSolvedUpdate = (event: Event) => {
      const solved = (event as CustomEvent<string[]>).detail;
      setSolvedCount(solved.filter((id) => challengeIds.includes(id)).length);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(CTF_SOLVED_EVENT, onSolvedUpdate);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CTF_SOLVED_EVENT, onSolvedUpdate);
    };
  }, []);

  if (solvedCount < total) return null;

  return (
    <span className="inline-flex items-center gap-2 border border-mint/40 bg-mint/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-mint">
      <ShieldCheck className="h-3.5 w-3.5" />
      ctf verified · {solvedCount}/{total}
    </span>
  );
}
