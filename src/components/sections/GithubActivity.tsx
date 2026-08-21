import React from "react";
import { Award, CalendarRange, GitBranch, Star, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContributionHeatmap } from "@/components/sections/ContributionHeatmap";
import { portfolio } from "@/data/portfolio";
import type { ContributionDay } from "@/lib/github-contributions";
import type { GitHubProfileStats } from "@/lib/github-profile";

const languageSwatch: Record<string, string> = {
  Python: "bg-[#3572A5]/20 border-[#3572A5]/50 text-[#7aa6cc]",
  TypeScript: "bg-[#3178c6]/20 border-[#3178c6]/50 text-[#7eb3ee]",
  Shell: "bg-[#89e051]/20 border-[#89e051]/50 text-[#a9ee87]",
  Java: "bg-[#b07219]/20 border-[#b07219]/50 text-[#e0a060]",
  CSS: "bg-[#563d7c]/20 border-[#563d7c]/50 text-[#a892d4]",
  Markdown: "bg-[#083fa1]/20 border-[#083fa1]/50 text-[#6c93d2]"
};

type Props = {
  contributions: ContributionDay[];
  stats: GitHubProfileStats | null;
};

export function GithubActivity({ contributions, stats }: Props) {
  const gh = portfolio.platforms.github;
  const fallbackStars = portfolio.projects.reduce(
    (sum, project) => sum + (project.stars ?? 0),
    0
  );
  const publicRepos = stats?.publicRepos ?? gh.totalRepos;
  const totalStars = stats?.totalStars ?? fallbackStars;
  const followers = stats?.followers ?? gh.followers;
  const following = stats?.following ?? gh.following;
  const topLanguages = stats?.topLanguages.length
    ? stats.topLanguages
    : [...gh.topLanguages];

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="border border-line bg-surface p-5">
            <GitBranch className="h-6 w-6 text-mint" />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              active
            </p>
            <p className="mt-2 text-2xl font-bold text-ink">{publicRepos}</p>
            <p className="mt-1 text-sm text-zinc-400">Public repositories</p>
          </div>
          <div className="border border-line bg-surface p-5">
            <Star className="h-6 w-6 text-ember" />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              stars
            </p>
            <p className="mt-2 text-2xl font-bold text-ink">{totalStars}</p>
            <p className="mt-1 text-sm text-zinc-400">Across all public repos</p>
          </div>
          <div className="border border-line bg-surface p-5">
            <Users className="h-6 w-6 text-rose" />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              followers
            </p>
            <p className="mt-2 text-2xl font-bold text-ink">{followers}</p>
            <p className="mt-1 text-sm text-zinc-400">
              Following {following} accounts
            </p>
          </div>
        </div>
        <p className="mt-3 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          {stats
            ? "Live GitHub statistics · refreshed hourly"
            : "Last known GitHub values"}
        </p>
      </Reveal>

      <Reveal>
        <div className="border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember">
              language ticker
            </p>
            <p className="font-mono text-xs text-zinc-400">
              primary languages
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {topLanguages.map((language) => {
              const tone =
                languageSwatch[language] ??
                "border-mint/40 bg-mint/10 text-mint";
              return (
                <span
                  key={language}
                  className={`border px-3 py-1.5 font-mono text-sm ${tone}`}
                >
                  {language}
                </span>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-zinc-400">
            Languages ranked by the number of public repositories where they are the
            primary language on{" "}
            <a
              href={gh.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-mint underline-offset-2 hover:underline"
            >
              github.com/{gh.username}
            </a>
            .
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-rose">
              achievement chips
            </p>
            <p className="font-mono text-xs text-zinc-400">unlocked</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {gh.achievements.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 border border-rose/40 bg-rose/5 px-3 py-2 font-mono text-sm text-rose"
              >
                <Award className="h-4 w-4" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-ember">
              <CalendarRange className="h-4 w-4" />
              contribution heatmap
            </p>
            <p className="font-mono text-xs text-zinc-400">last 12 months</p>
          </div>
          <ContributionHeatmap
            data={contributions}
            username={gh.username}
            profileUrl={gh.profileUrl}
          />
          <p className="mt-5 text-sm text-zinc-400">
            Live commit activity scraped directly from{" "}
            <a
              href={gh.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-mint underline-offset-2 hover:underline"
            >
              github.com/{gh.username}
            </a>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
