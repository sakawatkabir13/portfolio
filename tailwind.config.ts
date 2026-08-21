import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#09090b",
        surface: "#141416",
        "surface-soft": "#1b1b1f",
        line: "rgba(244, 244, 245, 0.14)",
        rose: "#ff4d7d",
        ember: "#f5b041",
        mint: "#4ade80",
        ink: "#f7f3ea"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        rose: "0 16px 60px rgba(255, 77, 125, 0.16)",
        amber: "0 12px 44px rgba(245, 176, 65, 0.12)",
        mint: "0 12px 44px rgba(74, 222, 128, 0.12)"
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" }
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" }
        },
        "reveal-fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        marquee: "marquee 40s linear infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        blink: "blink 1s steps(1) infinite",
        "reveal-fade-up": "reveal-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
