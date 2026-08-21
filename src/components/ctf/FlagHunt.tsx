"use client";

import React, { useEffect, useState } from "react";
import { Check, Flag, Lock, Unlock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";
import { sha256 } from "@/lib/hash";

const STORAGE_KEY = "basilisk:ctf-solved";

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
  // Per-challenge working state so the UI can show "checking..." on submit.
  const [pending, setPending] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSolved(parsed.filter((s): s is string => typeof s === "string"));
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(solved));
    } catch {
      // ignore
    }
  }, [solved, hydrated]);

  const challenges = portfolio.ctf.challenges;

  const handleSubmit = async (id: string, expectedHash: string) => {
    const value = inputs[id] ?? "";
    const normalized = normalize(value);
    if (!normalized) return;
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
    }
  };

  const solvedCount = solved.length;
  const total = challenges.length;
  const allSolved = solvedCount === total;

  // Console ROT13 hint — flag 3.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const encoded = "ynxv-onfvyvfx";
    const decoded = encoded.replace(/[a-zA-Z]/g, (ch) =>
      ch.charCodeAt(0) <= 90
        ? String.fromCharCode(((ch.charCodeAt(0) - 65 + 13) % 26) + 65)
        : String.fromCharCode(((ch.charCodeAt(0) - 97 + 13) % 26) + 97)
    );
    // eslint-disable-next-line no-console
    console.log(
      `%c[basilisk-broadcast] %c${encoded} → %c${decoded}`,
      "color:#4ade80",
      "color:#f5b041",
      "color:#4ade80;font-weight:bold"
    );
  }, []);

  return (
    <div className="space-y-5">
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
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [challenge.id]: e.target.value }))
                    }
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
                {isSolved && (
                  <p className="mt-3 font-mono text-xs text-mint">
                    ✓ {challenge.id} accepted
                  </p>
                )}
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
