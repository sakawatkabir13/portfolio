import React from "react";
import { Award, Flag, ShieldAlert, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

const TYPE_META: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; label: string; color: string }
> = {
  milestone: { icon: Flag, label: "milestone", color: "text-mint border-mint/40 bg-mint/10" },
  tool: { icon: Wrench, label: "tool", color: "text-ember border-ember/40 bg-ember/10" },
  finding: { icon: ShieldAlert, label: "finding", color: "text-rose border-rose/40 bg-rose/10" },
  cert: { icon: Award, label: "cert", color: "text-ink border-rose/60 bg-rose/10" }
};

type JourneyEntry = (typeof portfolio.journey)[number];

export function Timeline() {
  const recentEntries = portfolio.journey.slice(0, 6);
  const earlierEntries = portfolio.journey.slice(6);

  function renderEntries(entries: readonly JourneyEntry[], indexOffset = 0) {
    return entries.map((entry, index) => {
      const meta = TYPE_META[entry.type] ?? TYPE_META.milestone;
      const Icon = meta.icon;
      return (
        <Reveal
          key={`${entry.year}-${entry.month}-${entry.title}`}
          delay={Math.min((index + indexOffset) * 0.04, 0.18)}
        >
          <div className="relative pb-8">
            <span className="absolute -left-[34px] top-1 flex h-6 w-6 items-center justify-center border border-line bg-canvas">
              <Icon className={`h-3 w-3 ${meta.color.split(" ")[0]}`} />
            </span>
            <div className="flex flex-wrap items-baseline gap-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              <span className="text-mint">
                {entry.year} · {entry.month}
              </span>
              <span className={`border px-2 py-0.5 text-[10px] ${meta.color}`}>
                {meta.label}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-ink">{entry.title}</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{entry.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line bg-surface-soft px-2 py-1 font-mono text-[11px] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      );
    });
  }

  return (
    <div className="space-y-6">
      <div className="relative ml-3 border-l border-line pl-6 sm:ml-6">
        {renderEntries(recentEntries)}
      </div>
      {earlierEntries.length ? (
        <details className="border border-line bg-surface/80 p-5 backdrop-blur">
          <summary className="cursor-pointer font-mono text-sm uppercase tracking-[0.16em] text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
            View earlier milestones
          </summary>
          <div className="relative ml-3 mt-6 border-l border-line pl-6 sm:ml-6">
            {renderEntries(earlierEntries, recentEntries.length)}
          </div>
        </details>
      ) : null}
    </div>
  );
}
