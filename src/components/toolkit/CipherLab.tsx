"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import {
  CipherAlgorithm,
  CipherMode,
  runCipher
} from "@/lib/ciphers";

const ALGORITHMS: Array<{ id: CipherAlgorithm; label: string }> = [
  { id: "base64", label: "Base64" },
  { id: "rot13", label: "ROT13" },
  { id: "caesar", label: "Caesar" },
  { id: "hex", label: "Hex" }
];

export function CipherLab() {
  const [algorithm, setAlgorithm] = useState<CipherAlgorithm>("base64");
  const [mode, setMode] = useState<CipherMode>("encode");
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return runCipher(algorithm, input, mode, shift);
    } catch (err) {
      return `[error] ${(err as Error).message}`;
    }
  }, [algorithm, input, mode, shift]);

  const handleCopy = async () => {
    if (!output || output.startsWith("[error]")) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  const swap = () => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output && !output.startsWith("[error]") ? output : "");
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      <div className="flex flex-wrap items-center gap-2 border border-line bg-surface p-3">
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-400">algo</span>
        {ALGORITHMS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAlgorithm(a.id)}
            aria-pressed={algorithm === a.id}
            className={`border px-3 py-1.5 text-xs uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 ${
              algorithm === a.id
                ? "border-mint bg-mint/10 text-mint"
                : "border-line bg-surface-soft text-zinc-400 hover:border-ember hover:text-ember"
            }`}
          >
            {a.label}
          </button>
        ))}
        {algorithm === "caesar" && (
          <label className="ml-auto flex items-center gap-2 text-xs text-zinc-400">
            <span className="uppercase tracking-[0.22em] text-zinc-400">shift</span>
            <input
              type="number"
              min={0}
              max={25}
              value={shift}
              onChange={(e) =>
                setShift(Math.max(0, Math.min(25, Number(e.target.value) || 0)))
              }
              className="w-14 border border-line bg-canvas px-2 py-1 text-center text-ink outline-none focus:border-mint focus-visible:ring-2 focus-visible:ring-mint/40"
            />
          </label>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between border border-line bg-surface-soft px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-zinc-400">
            <label htmlFor="cipher-input">input</label>
            <span>{input.length} chars</span>
          </div>
          <textarea
            id="cipher-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text..."
            aria-label="Cipher input text"
            className="h-44 w-full resize-none border-x border-b border-line bg-canvas p-3 text-ink outline-none focus:border-mint focus-visible:ring-2 focus-visible:ring-mint/40"
          />
        </div>

        <div>
          <div className="flex items-center justify-between border border-line bg-surface-soft px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-zinc-400">
            <span>output</span>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output || output.startsWith("[error]")}
              aria-label="Copy cipher output"
              className="inline-flex items-center gap-1 text-zinc-400 transition hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 disabled:opacity-40"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "copied" : "copy"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            aria-label="Cipher output text"
            placeholder="Result appears here..."
            className="h-44 w-full resize-none border-x border-b border-line bg-canvas p-3 text-mint outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border border-line bg-surface p-3">
        <button
          type="button"
          onClick={swap}
          className="inline-flex items-center gap-2 border border-rose bg-rose/10 px-3 py-1.5 text-xs uppercase tracking-wider text-rose transition hover:bg-rose hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          swap encode ⇄ decode
        </button>
        <button
          type="button"
          onClick={() => setMode("encode")}
          aria-pressed={mode === "encode"}
          className={`border px-3 py-1.5 text-xs uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 ${
            mode === "encode"
              ? "border-mint bg-mint/10 text-mint"
              : "border-line text-zinc-400 hover:text-ink"
          }`}
        >
          encode
        </button>
        <button
          type="button"
          onClick={() => setMode("decode")}
          aria-pressed={mode === "decode"}
          className={`border px-3 py-1.5 text-xs uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 ${
            mode === "decode"
              ? "border-ember bg-ember/10 text-ember"
              : "border-line text-zinc-400 hover:text-ink"
          }`}
        >
          decode
        </button>
        <button
          type="button"
          onClick={() => setInput("")}
          className="ml-auto border border-line bg-surface-soft px-3 py-1.5 text-xs uppercase tracking-wider text-zinc-400 transition hover:border-rose hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
        >
          clear
        </button>
      </div>
      <p className="text-xs text-zinc-400">
        Base64 and Hex are encodings; ROT13 and Caesar are classical ciphers. All
        processing stays in your browser.
      </p>
    </div>
  );
}
