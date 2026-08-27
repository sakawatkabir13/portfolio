"use client";

import React, { useMemo, useState } from "react";
import { Eye, EyeOff, ShieldCheck, ShieldAlert } from "lucide-react";
import { analyzePassword, formatCrackTime } from "@/lib/password";

const STRENGTH_LABEL: Record<string, string> = {
  "very-weak": "very weak",
  weak: "weak",
  fair: "fair",
  strong: "strong",
  "very-strong": "very strong"
};

const STRENGTH_COLOR: Record<string, string> = {
  "very-weak": "bg-rose",
  weak: "bg-rose/70",
  fair: "bg-ember",
  strong: "bg-mint/70",
  "very-strong": "bg-mint"
};

const CHECK_LIST: Array<{
  key: keyof ReturnType<typeof analyzePassword>["checks"];
  label: string;
}> = [
  { key: "lengthAtLeast8", label: "Length ≥ 8" },
  { key: "lengthAtLeast12", label: "Length ≥ 12" },
  { key: "hasUpper", label: "Uppercase A-Z" },
  { key: "hasLower", label: "Lowercase a-z" },
  { key: "hasDigit", label: "Digits 0-9" },
  { key: "hasSymbol", label: "Symbols !@#" },
  { key: "noRepeats", label: "No 3+ repeated characters" },
  { key: "noCommon", label: "Not in small demo list" }
];

export function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const result = useMemo(() => analyzePassword(password), [password]);
  const strengthIndex = ["very-weak", "weak", "fair", "strong", "very-strong"].indexOf(
    result.strength
  );
  const meterWidth = useMemo(() => {
    return `${Math.max(8, ((strengthIndex + 1) / 5) * 100)}%`;
  }, [strengthIndex]);

  return (
    <div className="space-y-4 font-mono text-sm">
      <p className="border border-ember/40 bg-ember/5 px-3 py-2 text-xs leading-5 text-ember">
        Do not paste a real password. This is a simplified educational estimate,
        calculated entirely in your browser.
      </p>
      <div className="flex items-center gap-2 border border-line bg-surface p-3">
        <label htmlFor="password-analyzer-input" className="sr-only">
          Password to analyze
        </label>
        <input
          id="password-analyzer-input"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password to analyze..."
          className="flex-1 border border-line bg-canvas px-3 py-2 text-ink outline-none focus:border-mint focus-visible:ring-2 focus-visible:ring-mint/40"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="inline-flex h-9 w-9 items-center justify-center border border-line bg-surface-soft text-zinc-400 transition hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="border border-line bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">estimated strength</p>
          <p className="mt-2 flex items-center gap-2 text-lg text-ink">
            {result.strength === "very-strong" || result.strength === "strong" ? (
              <ShieldCheck className="h-4 w-4 text-mint" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-rose" />
            )}
            {STRENGTH_LABEL[result.strength]}
          </p>
          <div className="mt-3 h-1.5 w-full bg-surface-soft">
            <div
              className={`h-full transition-all ${STRENGTH_COLOR[result.strength]}`}
              style={{ width: meterWidth }}
              role="progressbar"
              aria-label="Estimated password strength"
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={strengthIndex + 1}
              aria-valuetext={STRENGTH_LABEL[result.strength]}
            />
          </div>
        </div>
        <div className="border border-line bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
            theoretical entropy upper bound
          </p>
          <p className="mt-2 text-lg text-ink">{result.entropy.toFixed(1)} bits</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
            brute-force estimate
          </p>
          <p className="mt-2 text-lg text-ink">@ 10B guesses/sec</p>
          <p className="mt-1 text-xs text-mint">{formatCrackTime(result.crackTimeSeconds)}</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">length × charset</p>
          <p className="mt-2 text-lg text-ink">
            {result.length} × {result.charsetSize}
          </p>
        </div>
      </div>

      <div className="grid gap-2 border border-line bg-surface p-4 sm:grid-cols-2 md:grid-cols-4">
        {CHECK_LIST.map((c) => {
          const passed = result.checks[c.key];
          return (
            <div
              key={c.key}
              className={`flex items-center gap-2 text-xs ${
                passed ? "text-mint" : "text-zinc-400"
              }`}
            >
              <span
                className={`inline-flex h-4 w-4 items-center justify-center border ${
                  passed ? "border-mint bg-mint/10" : "border-line"
                }`}
              >
                {passed ? "✓" : "·"}
              </span>
              {c.label}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-zinc-400">
        Pattern-based attacks and breached-password data are outside this demo&apos;s
        scope, so these values are not a security guarantee.
      </p>
    </div>
  );
}
