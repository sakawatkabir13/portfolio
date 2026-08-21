import React from "react";

type TagPillProps = {
  tag: string;
};

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className="border border-ember/30 bg-ember/10 px-2.5 py-1 font-mono text-xs text-ember">
      #{tag}
    </span>
  );
}
