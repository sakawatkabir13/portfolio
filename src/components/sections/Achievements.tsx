import { ArrowUpRight, Medal, Trophy } from "lucide-react";
import React from "react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

export function Achievements() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {portfolio.achievements.map((achievement, index) => {
        const Icon = index === 0 ? Trophy : Medal;
        const credentialUrl = "credentialUrl" in achievement ? achievement.credentialUrl : undefined;
        const content = (
          <>
            <div className="flex items-start justify-between gap-4">
              <Icon className={`h-7 w-7 ${index === 0 ? "text-ember" : "text-mint"}`} aria-hidden />
              {credentialUrl ? (
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-rose" aria-hidden />
              ) : null}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink">{achievement.title}</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-mint">
              {achievement.organization} <span className="text-zinc-400">· {achievement.issuedAt}</span>
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">{achievement.description}</p>
            {credentialUrl ? (
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-rose">
                View certificate →
              </p>
            ) : null}
          </>
        );

        return (
          <Reveal key={achievement.title} delay={Math.min(index * 0.05, 0.15)}>
            {credentialUrl ? (
              <a
                href={credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="group block h-full border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-ember/70 hover:shadow-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                {content}
              </a>
            ) : (
              <article className="h-full border border-line bg-surface p-6">{content}</article>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
