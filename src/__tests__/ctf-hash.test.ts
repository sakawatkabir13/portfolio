import { describe, expect, it } from "vitest";
import { sha256 } from "@/lib/hash";
import { portfolio } from "@/data/portfolio";

/** Must match `normalize()` in src/components/ctf/FlagHunt.tsx */
function normalize(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, "-");
}

const KNOWN_FLAGS: Record<string, string> = {
  "base64-beacon": "basilisk-shell",
  "source-inspector": "basilisk-cyber",
  "console-broadcast": "kali-basilisk"
};

describe("CTF challenge hashes", () => {
  for (const challenge of portfolio.ctf.challenges) {
    it(`verifies the known answer for ${challenge.id}`, async () => {
      const answer = KNOWN_FLAGS[challenge.id];
      expect(answer, `missing known answer for ${challenge.id}`).toBeDefined();
      const normalized = normalize(answer);
      const hash = await sha256(normalized);
      expect(hash).toBe(challenge.expectedHash);
    });
  }
});
