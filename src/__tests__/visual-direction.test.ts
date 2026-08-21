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
});
