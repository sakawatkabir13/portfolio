import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function read(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("visual direction", () => {
  it("uses the distinct editorial palette instead of the old neon dashboard tokens", () => {
    const source = [
      read("src/app/page.tsx"),
      read("src/app/globals.css"),
      read("tailwind.config.ts"),
      read("src/components/MetricCard.tsx"),
      read("src/components/ProjectCard.tsx"),
      read("src/components/ExternalLinkButton.tsx"),
      read("src/components/layout/SiteFooter.tsx")
    ].join("\n");

    expect(source).toContain("bg-canvas");
    expect(source).toContain("text-rose");
    expect(source).toContain("border-ember");
    expect(source).not.toContain("text-acid");
    expect(source).not.toContain("text-signal");
    expect(source).not.toContain("corner-frame");
    expect(source).not.toContain("grid-mask");
  });

  it("uses Network telemetry as the default background with accessible motion handling", () => {
    const layout = read("src/app/layout.tsx");
    const background = read("src/components/background/NetworkTelemetry.tsx");
    const modes = read("src/components/background/background-mode.ts");

    expect(layout).toContain("<BackgroundEffects />");
    expect(modes).toContain('["network", "matrix", "off"]');
    expect(background).toContain("prefers-reduced-motion: reduce");
    expect(background).toContain('data-background-effect="network"');
    expect(background).not.toContain("scanline");
  });

  it("self-hosts the Ubuntu typography and compacts short desktop viewports", () => {
    const layout = read("src/app/layout.tsx");
    const theme = read("tailwind.config.ts");
    const styles = read("src/app/globals.css");

    expect(layout).toContain('from "next/font/local"');
    expect(layout).toContain("noto-sans-400.woff2");
    expect(layout).toContain("dejavu-sans-mono-400.woff2");
    expect(theme).toContain("var(--font-noto-sans)");
    expect(theme).toContain("var(--font-dejavu-sans-mono)");
    expect(styles).toContain("@media (min-width: 1024px) and (max-height: 850px)");
    expect(styles).toContain("#top.hero-shell");
  });
});
