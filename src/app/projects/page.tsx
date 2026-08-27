import type { Metadata } from "next";
import React from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Security, backend, infrastructure, automation, and community projects built by Mohammad Sakawat Kabir."
};

const PROJECT_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects", active: true },
  { href: "/#achievements", label: "Achievements" },
  { href: "/blog", label: "Writeups" },
  { href: "/#contact", label: "Contact" }
];

export default function ProjectsPage() {
  return (
    <>
      <SiteNav items={PROJECT_NAV_ITEMS} />
      <main id="main-content" tabIndex={-1} className="min-h-screen px-5 py-14 text-zinc-100 outline-none sm:px-8 lg:py-20">
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-10 border-l-4 border-rose pl-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">Project archive</p>
            <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">Public projects</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              Security labs, production-minded backends, self-hosted infrastructure,
              automation, and community platforms—documented through their purpose,
              implementation, and outcomes.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.projects.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index * 0.035, 0.16)}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
