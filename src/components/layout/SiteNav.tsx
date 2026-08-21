"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export type NavItem = {
  href: string;
  label: string;
  active?: boolean;
};

type SiteNavProps = {
  items: NavItem[];
  showMatrixToggle?: boolean;
};

const MATRIX_STORAGE_KEY = "matrix-rain-enabled";

export function SiteNav({ items, showMatrixToggle = true }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(true);

  useEffect(() => {
    setMatrixEnabled(window.localStorage.getItem(MATRIX_STORAGE_KEY) !== "false");
  }, []);

  function toggleMatrix() {
    const enabled = !matrixEnabled;
    setMatrixEnabled(enabled);
    window.localStorage.setItem(MATRIX_STORAGE_KEY, String(enabled));
    window.dispatchEvent(
      new CustomEvent("matrix-rain-toggle", { detail: { enabled } })
    );
  }

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
            {showMatrixToggle ? (
              <button
                type="button"
                onClick={toggleMatrix}
                aria-pressed={matrixEnabled}
                aria-label={`${matrixEnabled ? "Disable" : "Enable"} MatrixRain background`}
                className={`inline-flex min-h-10 items-center gap-2 border px-3 font-mono text-xs uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                  matrixEnabled
                    ? "border-mint/40 bg-mint/10 text-mint"
                    : "border-line bg-surface-soft text-zinc-400"
                }`}
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                <span className="whitespace-nowrap">Rain {matrixEnabled ? "on" : "off"}</span>
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
