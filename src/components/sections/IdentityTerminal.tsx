import React from "react";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";

export function IdentityTerminal() {
  return (
    <Reveal>
      <div className="border border-line bg-canvas font-mono text-sm shadow-rose">
        <div className="flex items-center gap-2 border-b border-line bg-surface-soft px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-400">
          <span className="h-2.5 w-2.5 rounded-full bg-rose" />
          <span className="h-2.5 w-2.5 rounded-full bg-ember" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          <span className="ml-3">/usr/bin/whoami</span>
        </div>
        <pre className="overflow-x-auto p-6 leading-7 text-zinc-300">
{`$ whoami
> Handle       : ${portfolio.handle}
> Name         : ${portfolio.name}
> Location     : ${portfolio.location}
> Role         : ${portfolio.title}
> Education    : ${portfolio.education.status}
> Institution  : ${portfolio.education.institution} (CUET)
> TryHackMe    : ${portfolio.platforms.tryHackMe.username} (${portfolio.platforms.tryHackMe.tier} · ${portfolio.platforms.tryHackMe.percentile})
> Hack The Box : ${portfolio.platforms.hackTheBox.username} (${portfolio.platforms.hackTheBox.rank})
> Availability : ${portfolio.liveStatus.line2.toLowerCase()}

$ cat mission.txt
${portfolio.about}`}
        </pre>
      </div>
    </Reveal>
  );
}
