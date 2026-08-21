import React from "react";
import { Crosshair, Tag } from "lucide-react";

type MotoTagsProps = {
  tags: readonly string[];
  primary?: string;
};

export function MotoTags({ tags, primary }: MotoTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-7 border border-line bg-canvas/40 p-4 sm:p-5">
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <Tag className="h-4 w-4 text-rose" />
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-ember">
          core strengths
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {tags.map((tag) => {
          const isPrimary = primary != null && tag === primary;
          const className = isPrimary
            ? "inline-flex items-center gap-2 border border-rose/60 bg-rose/10 px-3 py-1.5 font-mono text-sm font-semibold text-rose shadow-rose"
            : "inline-flex items-center gap-2 border border-mint/20 bg-mint/5 px-3 py-1.5 font-mono text-sm text-zinc-200 transition hover:border-mint/50 hover:text-mint";

          return (
            <span key={tag} className={className}>
              {isPrimary ? <Crosshair className="h-3.5 w-3.5" /> : null}
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
