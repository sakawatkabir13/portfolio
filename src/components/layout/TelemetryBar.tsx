"use client";

import React, { useEffect, useState } from "react";

type TelemetryBarProps = {
  tagline: string;
  secondLine: string;
};

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatLocal(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatTimezone(d: Date): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const offset = -d.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  const h = pad(Math.floor(abs / 60));
  const m = pad(abs % 60);
  return `${tz} (UTC${sign}${h}:${m})`;
}

function detectConnection(): string {
  if (typeof navigator === "undefined") return "—";
  const conn =
    (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  return conn?.effectiveType?.toUpperCase() ?? "ONLINE";
}

export function TelemetryBar({ tagline, secondLine }: TelemetryBarProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const localTime = now ? formatLocal(now) : "--:--:--";
  const tz = now ? formatTimezone(now) : "—";
  const conn = detectConnection();

  return (
    <div className="hidden border-b border-line bg-canvas/85 font-mono text-[11px] text-zinc-400 backdrop-blur sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-mint">
            <span className="h-2 w-2 animate-glow-pulse rounded-full bg-mint shadow-[0_0_8px_#4ade80]" />
            LIVE
          </span>
          <span className="text-zinc-500">·</span>
          <span>
            LOCAL {localTime} {tz}
          </span>
          <span className="text-zinc-500">·</span>
          <span>CONN {conn}</span>
        </div>
        <div className="flex items-center gap-2 text-ember">
          <span className="uppercase tracking-[0.24em]">{tagline}</span>
          <span className="text-zinc-500">·</span>
          <span className="uppercase tracking-[0.24em]">{secondLine}</span>
        </div>
      </div>
    </div>
  );
}