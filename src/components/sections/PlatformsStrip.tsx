import React from "react";
import { ArrowUpRight, Code2, Shield, Trophy } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

export function PlatformsStrip() {
  const thm = portfolio.platforms.tryHackMe;
  const htb = portfolio.platforms.hackTheBox;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Reveal>
        <a
          href={portfolio.links.tryHackMe}
          target="_blank"
          rel="noreferrer"
          className="group flex h-full flex-col border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-mint/60 hover:shadow-rose"
        >
          <div className="flex items-center justify-between">
            <Shield className="h-7 w-7 text-mint" />
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-mint" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-ink">TryHackMe</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            {thm.username}
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Tier: <span className="text-mint">{thm.tier}</span> · {thm.percentile}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Global rank: <span className="text-ink">{thm.globalRank.toLocaleString()}</span> · Streak:{" "}
            <span className="text-ink">{thm.streak}d</span>
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Rooms: <span className="text-ink">{thm.completedRooms}</span> · Badges:{" "}
            <span className="text-ink">{thm.badges}</span>
          </p>
        </a>
      </Reveal>

      <Reveal delay={0.08}>
        <a
          href={portfolio.links.hackTheBox}
          target="_blank"
          rel="noreferrer"
          className="group flex h-full flex-col border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-ember/60 hover:shadow-amber"
        >
          <div className="flex items-center justify-between">
            <Trophy className="h-7 w-7 text-ember" />
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-ember" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-ink">Hack The Box</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            {htb.username}
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Rank: <span className="text-ember">{htb.rank}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Points: <span className="text-ink">{htb.points}</span> · User owns:{" "}
            <span className="text-ink">{htb.userOwns}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            System owns: <span className="text-ink">{htb.systemOwns}</span>
          </p>
        </a>
      </Reveal>

      <Reveal delay={0.16}>
        <a
          href={portfolio.links.codeforces}
          target="_blank"
          rel="noreferrer"
          className="group flex h-full flex-col border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-mint/60 hover:shadow-rose"
        >
          <div className="flex items-center justify-between">
            <Code2 className="h-7 w-7 text-mint" />
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-mint" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-ink">Codeforces</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            {portfolio.competitiveProgramming.codeforcesUsername}
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Rank: <span className="text-mint">{portfolio.competitiveProgramming.codeforcesRank}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Rating: <span className="text-ink">{portfolio.competitiveProgramming.codeforcesRating}</span> · Max:{" "}
            <span className="text-ink">{portfolio.competitiveProgramming.codeforcesMaxRating}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Problems: <span className="text-ink">{portfolio.competitiveProgramming.solvedProblems}</span>{" "}
            across online judges
          </p>
        </a>
      </Reveal>
    </div>
  );
}
