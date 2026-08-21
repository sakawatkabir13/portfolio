import { ArrowUpRight } from "lucide-react";
import React from "react";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  detailed?: boolean;
};

export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} on GitHub`}
      className="group flex h-full flex-col border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-rose/70 hover:shadow-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-mint">{project.category}</p>
        <ArrowUpRight className="h-5 w-5 text-zinc-400 transition group-hover:text-rose" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400">{project.description}</p>
      {detailed && project.problem && project.build ? (
        <dl className="mt-5 space-y-4 border-t border-line pt-4 text-sm leading-6">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">Challenge</dt>
            <dd className="mt-1 text-zinc-300">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">What I built</dt>
            <dd className="mt-1 text-zinc-300">{project.build}</dd>
          </div>
        </dl>
      ) : null}
      {project.evidence ? (
        <p className="mt-5 border-l-2 border-rose bg-rose/5 px-3 py-2 text-sm font-medium leading-6 text-zinc-200">
          {project.evidence}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
        {project.stack.map((item) => (
          <span
            key={item}
            className="border border-ember/30 bg-ember/10 px-2.5 py-1 font-mono text-xs text-ember"
          >
            {item}
          </span>
        ))}
      </div>
    </a>
  );
}
