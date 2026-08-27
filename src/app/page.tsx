import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal
} from "lucide-react";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";
import { MetricCard } from "@/components/MetricCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { FlagHunt } from "@/components/ctf/FlagHunt";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { IdentityTerminal } from "@/components/sections/IdentityTerminal";
import { PlatformsStrip } from "@/components/sections/PlatformsStrip";
import { Timeline } from "@/components/sections/Timeline";
import { TechnicalSkills } from "@/components/sections/TechnicalSkills";
import { CoreStrengths } from "@/components/sections/CoreStrengths";
import { ToolkitTabs } from "@/components/sections/ToolkitTabs";
import { PostCard } from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";
import { portfolio } from "@/data/portfolio";
import { fetchGitHubContributions, type ContributionDay } from "@/lib/github-contributions";
import {
  fetchGitHubProfileStats,
  type GitHubProfileStats
} from "@/lib/github-profile";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";

export const revalidate = 3600;

const HOME_NAV_ITEMS = [
  { href: "#identity", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#writeups", label: "Writeups" },
  { href: "#contact", label: "Contact" }
];

async function loadGithubContributions(): Promise<ContributionDay[]> {
  try {
    const data = await fetchGitHubContributions(portfolio.platforms.github.username);
    return data.days;
  } catch {
    return [];
  }
}

async function loadGithubProfileStats(): Promise<GitHubProfileStats | null> {
  try {
    return await fetchGitHubProfileStats(portfolio.platforms.github.username);
  } catch {
    return null;
  }
}

export default async function Home() {
  const [contributions, githubStats] = await Promise.all([
    loadGithubContributions(),
    loadGithubProfileStats()
  ]);
  const thm = portfolio.platforms.tryHackMe;
  const htb = portfolio.platforms.hackTheBox;
  const latestPosts = getAllPosts().slice(0, 2);
  const featuredProjects = portfolio.projects.filter(
    (project) => "featured" in project && project.featured
  );

  return (
    <>
      <SiteNav items={HOME_NAV_ITEMS} />
      <main id="main-content" tabIndex={-1} className="relative min-h-screen text-zinc-100 outline-none">
      <span
        hidden
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: "<!-- basilisk-beacon: YmFzaWxpc2stc2hlbGw= -->"
        }}
      />
      <section
        id="top"
        className="relative isolate mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-6xl items-center gap-8 overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6 lg:py-10 xl:grid-cols-[300px_minmax(0,1fr)]"
      >
        <Reveal className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-none">
          <aside className="border border-line bg-surface/90 p-4 backdrop-blur shadow-rose xl:p-5">
            <div className="border-b border-line pb-4">
              <Image
                src={portfolio.avatarUrl}
                alt={`${portfolio.name} avatar`}
                width={640}
                height={640}
                sizes="(max-width: 1023px) calc(100vw - 80px), 290px"
                priority
                className="aspect-square w-full border border-rose/40 object-cover"
              />
            </div>
            <div className="pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-ember">
                alias
              </p>
              <p className="mt-1.5 text-2xl font-black text-ink">{portfolio.handle}</p>
            </div>
            <div className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-rose" />
                {portfolio.education.studentStatus}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose" />
                {portfolio.location}
              </span>
            </div>
          </aside>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={0.1}>
          <div className="rail-card border border-line bg-surface-soft/90 p-6 backdrop-blur sm:p-8">
            <div className="inline-flex items-center gap-2 border border-mint/40 bg-mint/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.22em] text-mint">
              <Sparkles className="h-4 w-4" />
              {portfolio.liveStatus.line2}
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-ink sm:text-6xl lg:whitespace-nowrap lg:text-[clamp(2.625rem,4.4vw,3.5rem)] lg:leading-none">
              {portfolio.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold text-rose sm:text-xl">
              {portfolio.title}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
              {portfolio.tagline}
            </p>
            <CoreStrengths
              tags={portfolio.motoTags}
              primary={portfolio.cybersecPrimary}
            />
            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
              <ExternalLinkButton
                href={portfolio.links.resume}
                variant="primary"
                className="gap-1.5 px-2.5 whitespace-nowrap"
              >
                <FileText className="h-4 w-4" />
                View résumé
              </ExternalLinkButton>
              <ExternalLinkButton
                href={portfolio.links.github}
                className="gap-1.5 px-2.5 whitespace-nowrap"
              >
                <Github className="h-4 w-4" />
                GitHub
              </ExternalLinkButton>
              <ExternalLinkButton
                href={portfolio.links.linkedin}
                className="gap-1.5 px-2.5 whitespace-nowrap"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </ExternalLinkButton>
              <ExternalLinkButton
                href={portfolio.links.email}
                className="gap-1.5 px-2.5 whitespace-nowrap"
              >
                <Mail className="h-4 w-4" />
                Email me
              </ExternalLinkButton>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="THM Rank"
                value={thm.percentile}
                detail={`${thm.tier} · ${thm.streak}-day streak`}
              />
              <MetricCard
                label="Hack The Box"
                value={`${htb.userOwns + htb.systemOwns} owns`}
                detail={`${htb.rank} rank`}
              />
              <MetricCard
                label="Problems"
                value={portfolio.competitiveProgramming.solvedProblems}
                detail="solved online"
              />
              <MetricCard
                label="Codeforces"
                value={portfolio.competitiveProgramming.codeforcesRank}
                detail={`${portfolio.competitiveProgramming.codeforcesRating} rating · ${portfolio.competitiveProgramming.codeforcesMaxRating} max`}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <Section id="identity" eyebrow="Identity" title="$ whoami">
        <IdentityTerminal />
      </Section>

      <Section id="platforms" eyebrow="Platforms" title="Where I practice and compete">
        <PlatformsStrip />
      </Section>

      <Section
        id="skills"
        eyebrow="Technical Skills"
        title="Tools I use to build and secure systems"
      >
        <TechnicalSkills />
      </Section>

      <Section id="projects" eyebrow="Selected Work" title="Security, backend, and systems in practice">
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.18)}>
              <ProjectCard project={project} detailed />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-ember transition hover:bg-ember hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            View all projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <Section
        id="github"
        eyebrow="GitHub Activity"
        title="@sakawatkabir13 at a glance"
      >
        <GithubActivity contributions={contributions} stats={githubStats} />
      </Section>

      <Section id="achievements" eyebrow="Achievements" title="Competition and hackathon highlights">
        <Achievements />
      </Section>

      <Section id="certifications" eyebrow="Certifications" title="Verified credentials">
        <Certifications />
      </Section>

      <Section id="journey" eyebrow="Journey" title="Recent milestones and shipped work">
        <Timeline />
      </Section>

      <Section id="toolkit" eyebrow="Researcher's Toolkit" title="Interactive tools built into the site">
        <ToolkitTabs />
      </Section>

      <Section id="writeups" eyebrow="Writing" title="Latest writeups & notes">
        <div className="grid gap-5 md:grid-cols-2">
          {latestPosts.length > 0 ? (
            latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={Math.min(index * 0.06, 0.12)}>
                <PostCard post={post} />
              </Reveal>
            ))
          ) : (
            <Reveal>
              <div className="border border-line bg-surface p-6 text-sm text-zinc-400">
                No posts yet — drop an <code className="font-mono text-mint">.mdx</code> file into
                <code className="font-mono text-mint"> src/content/posts/</code> to publish.
              </div>
            </Reveal>
          )}
        </div>
        <Reveal className="mt-6">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 border border-ember/40 bg-ember/5 px-4 py-2.5 font-mono text-sm uppercase tracking-[0.18em] text-ember transition hover:border-ember hover:bg-ember hover:text-canvas"
          >
            <BookOpen className="h-4 w-4" />
            view all writeups
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </Section>

      <Section id="ctf" eyebrow="Capture the Flag" title="Three challenges hidden in this site">
        <FlagHunt />
      </Section>

      <section
        id="contact"
        className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20"
      >
        <Reveal>
          <div className="rail-card border border-line bg-surface-soft p-8 text-center shadow-rose">
            <Terminal className="mx-auto h-9 w-9 text-rose" />
            <h2 className="mt-5 text-3xl font-bold text-ink">Let&apos;s connect</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-300">
              Open to cybersecurity and backend internships, collaborative builds, and
              conversations about securing systems in practice.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ExternalLinkButton href={portfolio.links.email} variant="primary">
                <Mail className="h-4 w-4" />
                Email me
              </ExternalLinkButton>
              <ExternalLinkButton href={portfolio.links.linkedin}>
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </ExternalLinkButton>
              <ExternalLinkButton href={portfolio.links.github}>
                <Github className="h-4 w-4" />
                GitHub
              </ExternalLinkButton>
            </div>
          </div>
        </Reveal>
      </section>

      </main>
      <SiteFooter />
    </>
  );
}
