"use client";

import React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Entrance animation wrapper.
 *
 * Uses a CSS keyframe animation rather than framer-motion so that:
 *   - SSR ships fully visible content (never `opacity: 0`)
 *   - The page is readable even before JS hydration
 *   - The animation still plays once on first paint
 *
 * The `reveal-fade-up` keyframe is defined in `src/app/globals.css`.
 * Respects `prefers-reduced-motion` via the `motion-safe:` variant.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const style: React.CSSProperties | undefined = delay
    ? { animationDelay: `${delay}s` }
    : undefined;

  return (
    <div
      className={`motion-safe:animate-reveal-fade-up ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
