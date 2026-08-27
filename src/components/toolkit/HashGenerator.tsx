"use client";

import React, { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { hash, HashAlgorithm } from "@/lib/hash";
import { md5 } from "@/lib/md5";

const ALGORITHMS: Array<{ id: HashAlgorithm; label: string }> = [
  { id: "SHA-1", label: "SHA-1" },
  { id: "SHA-256", label: "SHA-256" },
  { id: "SHA-384", label: "SHA-384" },
  { id: "SHA-512", label: "SHA-512" }
];

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<HashAlgorithm, string>>({
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": ""
  });
  const [md5Result, setMd5Result] = useState("");
  const [computing, setComputing] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setResults({
        "SHA-1": "",
        "SHA-256": "",
        "SHA-384": "",
        "SHA-512": ""
      });
      setMd5Result("");
      setComputing(false);
      return;
    }
    let cancelled = false;
    setComputing(true);
    const timer = setTimeout(async () => {
      const next: Record<HashAlgorithm, string> = {
        "SHA-1": "",
        "SHA-256": "",
        "SHA-384": "",
        "SHA-512": ""
      };
      for (const algo of ALGORITHMS) {
        try {
          next[algo.id] = await hash(input, algo.id);
        } catch (err) {
          next[algo.id] = `[error] ${(err as Error).message}`;
        }
      }
      const md5Out = (() => {
        try {
          return md5(input);
        } catch (err) {
          return `[error] ${(err as Error).message}`;
        }
      })();
      if (!cancelled) {
        setResults(next);
        setMd5Result(md5Out);
        setComputing(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [input]);

  const handleCopy = async (label: string, value: string) => {
    if (!value || value.startsWith("[error]")) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 1500);
    } catch {
      // ignore
    }
  };

  const renderHashRow = (label: string, value: string) => {
    const copied = copiedLabel === label;
    return (
      <div key={label} className="border border-line bg-surface p-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
          <span>{label}</span>
          <button
            type="button"
            onClick={() => handleCopy(label, value)}
            disabled={!value || value.startsWith("[error]")}
            aria-label={`Copy ${label} digest`}
            className="inline-flex items-center gap-1 text-zinc-400 transition hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 disabled:opacity-40"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <p className="mt-1 break-all text-xs text-ink">
          {value || (
            <span className="text-zinc-400">
              — waiting for input —
            </span>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      <div className="border border-line bg-surface p-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
          <span>input</span>
          <span>{input.length} chars</span>
        </div>
        <label htmlFor="hash-input" className="sr-only">
          Text to hash
        </label>
        <textarea
          id="hash-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Text to hash..."
          className="mt-2 h-28 w-full resize-none border border-line bg-canvas p-3 text-ink outline-none focus:border-mint focus-visible:ring-2 focus-visible:ring-mint/40"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border border-line bg-surface p-3">
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-400">
          digest comparison
        </span>
        {computing && (
          <span className="text-xs uppercase tracking-[0.22em] text-ember">
            computing…
          </span>
        )}
      </div>

      <div className="space-y-2">
        {ALGORITHMS.map((a) => renderHashRow(a.label, results[a.id]))}
        {renderHashRow("MD5", md5Result)}
      </div>

      <p className="space-y-1 text-xs text-zinc-400">
        SHA-family digests run client-side via Web Crypto. MD5 is shown for
        legacy comparison only — MD5 is cryptographically broken for
        collision resistance and must not be used for integrity or
        authentication. Use SHA-256 or stronger in real systems.
      </p>
    </div>
  );
}
