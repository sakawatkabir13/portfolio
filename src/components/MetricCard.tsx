import React from "react";

type MetricCardProps = {
  label: string;
  value: string | number;
  detail?: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="border border-line bg-surface p-4 shadow-amber">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      {detail ? <p className="mt-1 text-xs leading-5 text-zinc-400">{detail}</p> : null}
    </div>
  );
}
