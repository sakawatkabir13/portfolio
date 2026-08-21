"use client";

import React, { useEffect, useRef } from "react";

type MatrixRainProps = {
  className?: string;
};

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFbasilisk13";
const MATRIX_STORAGE_KEY = "matrix-rain-enabled";

export function MatrixRain({ className = "" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = width < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let enabled = window.localStorage.getItem(MATRIX_STORAGE_KEY) !== "false";

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = width < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();

    const fontSize = 14;
    let columns = Math.max(1, Math.floor(width / fontSize));
    let drops: number[] = new Array(columns).fill(0).map(() => Math.random() * height);

    function handleResize() {
      resize();
      columns = Math.max(1, Math.floor(width / fontSize));
      drops = new Array(columns).fill(0).map(() => Math.random() * height);
    }

    window.addEventListener("resize", handleResize);

    let raf = 0;
    let last = 0;
    const fps = 24;
    const interval = 1000 / fps;

    function draw(now: number) {
      if (!ctx || !enabled || document.hidden) {
        raf = 0;
        return;
      }
      if (now - last < interval) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;

      ctx.fillStyle = "rgba(9, 9, 11, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const text = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
        const x = i * fontSize;
        const y = drops[i];

        ctx.fillStyle = "#ff4d7d";
        ctx.globalAlpha = 0.18;
        ctx.fillText(text, x, y);

        ctx.fillStyle = "#4ade80";
        ctx.globalAlpha = 0.65;
        ctx.fillText(text, x, y - fontSize);

        ctx.fillStyle = "#f7f3ea";
        ctx.globalAlpha = 0.95;
        ctx.fillText(text, x, y - fontSize * 2);

        ctx.globalAlpha = 1;

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += fontSize * 0.75;
      }

      raf = requestAnimationFrame(draw);
    }

    function drawReducedMotionFrame() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(9, 9, 11, 0.9)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.fillStyle = "#4ade80";
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 30; i++) {
        const text = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
        ctx.fillText(text, Math.random() * width, Math.random() * height);
      }
    }

    function start() {
      if (!enabled || document.hidden) return;
      if (prefersReducedMotion) {
        drawReducedMotionFrame();
      } else if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        start();
      }
    }

    function handleToggle(event: Event) {
      enabled = (event as CustomEvent<{ enabled: boolean }>).detail.enabled;
      cancelAnimationFrame(raf);
      raf = 0;
      if (!enabled) {
        ctx?.clearRect(0, 0, width, height);
        return;
      }
      start();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("matrix-rain-toggle", handleToggle);
    start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("matrix-rain-toggle", handleToggle);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 h-full w-full -z-10 ${className}`}
    />
  );
}
