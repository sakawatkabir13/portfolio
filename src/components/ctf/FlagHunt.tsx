"use client";

import React, { useEffect, useState } from "react";
import { Check, Flag, Lock, Unlock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";
import { sha256 } from "@/lib/hash";
import {
  announceSolvedChallenges,
  CTF_STORAGE_KEY,
  parseSolvedChallenges
} from "@/components/ctf/ctf-state";

function normalize(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, "-");
}

// Constant-time string comparison so the SHA-256 hashes can't be used as a
// timing oracle to brute-force the flag one character at a time.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function FlagHunt() {
  const [solved, setSolved] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const challenges = portfolio.ctf.challenges;
  const challengeIds = challenges.map((challenge) => challenge.id);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CTF_STORAGE_KEY);
      setSolved(parseSolvedChallenges(raw, challengeIds));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CTF_STORAGE_KEY, JSON.stringify(solved));
      announceSolvedChallenges(solved);
    } catch {
      // ignore
    }
  }, [solved, hydrated]);

  const handleSubmit = async (id: string, expectedHash: string) => {
    const value = inputs[id] ?? "";
    const normalized = normalize(value);
    if (!normalized) {
      setFeedback((prev) => ({ ...prev, [id]: "Enter a flag before submitting." }));
      return;
    }
    setFeedback((prev) => ({ ...prev, [id]: "" }));
    setPending((prev) => ({ ...prev, [id]: true }));
    let ok = false;
    try {
      const hash = await sha256(normalized);
      ok = timingSafeEqual(hash, expectedHash.toLowerCase());
    } catch {
      ok = false;
    }
    setPending((prev) => ({ ...prev, [id]: false }));
    if (ok) {
      setSolved((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setFeedback((prev) => ({ ...prev, [id]: "Flag accepted." }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [id]: "Flag not accepted. Recheck the clue and try again."
      }));
    }
  };

  const solvedCount = solved.length;
  const total = challenges.length;
  const allSolved = solvedCount === total;

  // Console ROT13 hint — flag 3.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const encoded = "xnyv-onfvyvfx";
    // eslint-disable-next-line no-console
    console.log(
      `%c[basilisk-broadcast] %c${encoded} %c· decode with ROT13`,
      "color:#4ade80",
      "color:#f5b041",
      "color:#a1a1aa"
    );
  }, []);

  return (
    <div className="onfvyvfx-ploer space-y-5">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-surface-soft px-5 py-3 font-mono text-xs uppercase tracking-[0.22em]">
          <span className="text-zinc-400">
            session: <span className="text-ink">guest</span>
          </span>
          <span className="text-zinc-400">
            solved:{" "}
            <span className="text-mint">
              {solvedCount}/{total}
            </span>
          </span>
          <span className="text-zinc-400">
            status:{" "}
            <span className={allSolved ? "text-mint" : "text-ember"}>
              {allSolved ? "verified" : "active"}
            </span>
          </span>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {challenges.map((challenge, index) => {
          const isSolved = solved.includes(challenge.id);
          const inputId = `flag-${challenge.id}`;
          return (
            <Reveal key={challenge.id} delay={Math.min(index * 0.06, 0.18)}>
              <div
                className={`flex h-full flex-col border p-5 transition ${
                  isSolved
                    ? "border-mint/60 bg-mint/5"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
                    {isSolved ? (
                      <Unlock className="h-3.5 w-3.5 text-mint" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-rose" />
                    )}
                    flag {String(index + 1).padStart(2, "0")} · {challenge.difficulty}
                  </div>
                  <Flag className={`h-4 w-4 ${isSolved ? "text-mint" : "text-zinc-600"}`} />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink">{challenge.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400">{challenge.hint}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleSubmit(challenge.id, challenge.expectedHash);
                  }}
                  className="mt-4 flex items-center gap-2"
                >
                  <label htmlFor={inputId} className="sr-only">
                    Flag for {challenge.title}
                  </label>
                  <input
                    id={inputId}
                    type="text"
                    value={inputs[challenge.id] ?? ""}
                    onChange={(e) => {
                      setInputs((prev) => ({ ...prev, [challenge.id]: e.target.value }));
                      setFeedback((prev) => ({ ...prev, [challenge.id]: "" }));
                    }}
                    placeholder="enter flag"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label={`Flag submission for ${challenge.title}`}
                    className="flex-1 border border-line bg-canvas px-3 py-2 font-mono text-sm text-ink outline-none focus:border-mint focus-visible:ring-2 focus-visible:ring-mint/40"
                  />
                  <button
                    type="submit"
                    disabled={pending[challenge.id]}
                    className="inline-flex items-center gap-1 border border-rose bg-rose/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.22em] text-rose transition hover:bg-rose hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 disabled:opacity-50"
                  >
                    {isSolved ? <Check className="h-3.5 w-3.5" /> : null}
                    {pending[challenge.id] ? "checking…" : isSolved ? "solved" : "submit"}
                  </button>
                </form>
                <p
                  className={`mt-3 min-h-4 font-mono text-xs ${
                    isSolved ? "text-mint" : "text-ember"
                  }`}
                  aria-live="polite"
                >
                  {isSolved ? `✓ ${challenge.id} accepted` : feedback[challenge.id]}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="font-mono text-xs text-zinc-400">{portfolio.ctf.intro}</p>
      </Reveal>
    </div>
  );
}
