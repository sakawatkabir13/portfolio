import React from "react";

type GridScanlinesProps = {
  className?: string;
};

export function GridScanlines({ className = "" }: GridScanlinesProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74, 222, 128, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, rgba(0,0,0,0.4) 70%, transparent 100%)"
        }}
      />
      <div
        className="absolute inset-0 animate-scanline"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 0%, rgba(74, 222, 128, 0.12) 50%, transparent 100%)",
          height: "160px",
          top: 0
        }}
      />
    </div>
  );
}