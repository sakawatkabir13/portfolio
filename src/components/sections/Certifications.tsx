import React from "react";
import { Award, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

export function Certifications() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {portfolio.certifications.map((cert, index) => (
        <Reveal key={cert.name} delay={Math.min(index * 0.06, 0.12)}>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-rose/70 hover:shadow-rose"
          >
            <div className="flex items-start justify-between gap-4">
              <Award className="h-7 w-7 text-rose" />
              <ExternalLink className="h-4 w-4 text-zinc-400 transition group-hover:text-rose" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink">{cert.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-mint">
              {cert.issuer}
              {cert.issuedAt ? <span className="text-zinc-400"> · {cert.issuedAt}</span> : null}
            </p>
            <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{cert.focus}</p>
            <p className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-rose">
              View credential
              <span aria-hidden>→</span>
            </p>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
