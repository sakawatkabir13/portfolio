"use client";

import React, { useState } from "react";
import { CipherLab } from "@/components/toolkit/CipherLab";
import { HashGenerator } from "@/components/toolkit/HashGenerator";
import { PasswordAnalyzer } from "@/components/toolkit/PasswordAnalyzer";

const TABS = [
  { id: "cipher", label: "Cipher Lab", component: CipherLab },
  { id: "password", label: "Password Analyzer", component: PasswordAnalyzer },
  { id: "hash", label: "Hash Generator", component: HashGenerator }
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ToolkitTabs() {
  const [active, setActive] = useState<TabId>("cipher");
  const Active = TABS.find((t) => t.id === active)?.component ?? CipherLab;

  return (
    <div className="border border-line bg-surface">
      <div
        role="tablist"
        className="flex flex-wrap border-b border-line bg-surface-soft font-mono text-xs uppercase tracking-[0.22em]"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`border-b-2 px-4 py-3 transition ${
              active === tab.id
                ? "border-mint text-mint"
                : "border-transparent text-zinc-400 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto self-center pr-4 text-[10px] text-zinc-400">
          root@basilisk:~#
        </span>
      </div>
      <div className="p-5">
        <Active />
      </div>
    </div>
  );
}
