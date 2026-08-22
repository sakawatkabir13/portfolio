"use client";

import Link from "next/link";
import { EyeOff, Menu, Network, Sparkles, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BACKGROUND_MODE_EVENT,
  BACKGROUND_MODE_STORAGE_KEY,
  LEGACY_MATRIX_STORAGE_KEY,
  nextBackgroundMode,
  readBackgroundMode,
  type BackgroundMode
} from "@/components/background/background-mode";

export type NavItem = {
  href: string;
  label: string;
  active?: boolean;
};

type SiteNavProps = {
  items: NavItem[];
  showBackgroundToggle?: boolean;
};

const MODE_LABELS: Record<BackgroundMode, string> = {
  network: "Network",
  matrix: "Matrix",
  off: "Off"
};

export function SiteNav({ items, showBackgroundToggle = true }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>("network");

  useEffect(() => {
    const storedMode = readBackgroundMode(window.localStorage);
    setBackgroundMode(storedMode);
    window.localStorage.setItem(BACKGROUND_MODE_STORAGE_KEY, storedMode);
    window.localStorage.removeItem(LEGACY_MATRIX_STORAGE_KEY);
  }, []);

  function cycleBackgroundMode() {
    const mode = nextBackgroundMode(backgroundMode);
    setBackgroundMode(mode);
    window.localStorage.setItem(BACKGROUND_MODE_STORAGE_KEY, mode);
    window.dispatchEvent(
      new CustomEvent(BACKGROUND_MODE_EVENT, { detail: { mode } })
    );
  }

  const nextMode = nextBackgroundMode(backgroundMode);
  const BackgroundIcon =
    backgroundMode === "network" ? Network : backgroundMode === "matrix" ? Sparkles : EyeOff;

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-50 -translate-y-20 bg-mint px-4 py-2 font-mono text-sm font-semibold text-canvas transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary navigation"
        className="sticky top-0 z-30 border-b border-line bg-canvas/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link
            href="/"
            className="font-mono text-sm font-semibold text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            <span className="text-mint">~/</span>Basilisk13
          </Link>

          <div className="hidden items-center gap-5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 xl:flex">
            {items.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                  item.active ? "text-ink" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {showBackgroundToggle ? (
              <button
                type="button"
                onClick={cycleBackgroundMode}
                aria-label={`Background mode: ${MODE_LABELS[backgroundMode]}. Switch to ${MODE_LABELS[nextMode]}`}
                title={`Background: ${MODE_LABELS[backgroundMode]} · Click for ${MODE_LABELS[nextMode]}`}
                data-background-mode={backgroundMode}
                className={`inline-flex min-h-10 items-center gap-2 border px-3 font-mono text-xs uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                  backgroundMode === "network"
                    ? "border-mint/40 bg-mint/10 text-mint"
                    : backgroundMode === "matrix"
                      ? "border-rose/40 bg-rose/10 text-rose"
                      : "border-line bg-surface-soft text-zinc-400"
                }`}
              >
                <BackgroundIcon className="h-4 w-4" aria-hidden />
                <span className="whitespace-nowrap">BG {MODE_LABELS[backgroundMode]}</span>
              </button>
            ) : null}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={`${open ? "Close" : "Open"} navigation menu`}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center border border-line bg-surface-soft text-ink transition hover:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint xl:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-navigation" className="border-t border-line bg-canvas/95 px-5 py-4 backdrop-blur xl:hidden">
            <div className="mx-auto grid max-w-6xl gap-1 font-mono text-sm uppercase tracking-[0.14em] text-zinc-300 sm:grid-cols-2 sm:px-3">
              {items.map((item) => (
                <Link
                  key={`mobile-${item.href}-${item.label}`}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`border border-transparent px-3 py-3 transition hover:border-line hover:bg-surface-soft hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                    item.active ? "text-mint" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}
