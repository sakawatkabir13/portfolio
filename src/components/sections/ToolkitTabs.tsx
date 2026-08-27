"use client";

import React, { useRef, useState } from "react";
import { CipherLab } from "@/components/toolkit/CipherLab";
import { HashGenerator } from "@/components/toolkit/HashGenerator";
import { PasswordAnalyzer } from "@/components/toolkit/PasswordAnalyzer";

const TABS = [
  { id: "cipher", label: "Encoding & Cipher Lab", component: CipherLab },
  { id: "password", label: "Password Analyzer", component: PasswordAnalyzer },
  { id: "hash", label: "Hash Generator", component: HashGenerator }
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ToolkitTabs() {
  const [active, setActive] = useState<TabId>("cipher");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const Active = TABS.find((t) => t.id === active)?.component ?? CipherLab;

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = TABS.length - 1;
    else return;

    event.preventDefault();
    const nextTab = TABS[nextIndex];
    setActive(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="border border-line bg-surface">
      <div
        role="tablist"
        aria-label="Interactive security tools"
        className="flex flex-wrap border-b border-line bg-surface-soft font-mono text-xs uppercase tracking-[0.22em]"
      >
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`toolkit-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`toolkit-panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
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
      <div
        id={`toolkit-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`toolkit-tab-${active}`}
        tabIndex={0}
        className="p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mint/60"
      >
        <Active />
      </div>
    </div>
  );
}
