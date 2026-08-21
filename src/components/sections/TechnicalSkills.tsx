import { Code2, Database, ServerCog, ShieldCheck } from "lucide-react";
import React from "react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

const ICONS = [Code2, Database, ShieldCheck, ServerCog];

export function TechnicalSkills() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {portfolio.technicalSkills.map((group, index) => {
        const Icon = ICONS[index] ?? Code2;

        return (
          <Reveal key={group.label} delay={Math.min(index * 0.05, 0.15)}>
            <article className="h-full border border-line bg-surface p-6">
              <Icon className="h-7 w-7 text-rose" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-ink">{group.label}</h3>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-ember/30 bg-ember/10 px-2.5 py-1 font-mono text-xs text-ember"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
