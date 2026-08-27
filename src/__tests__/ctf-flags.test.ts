import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/data/portfolio";
import { sha256 } from "@/lib/hash";
import {
  announceSolvedChallenges,
  CTF_SOLVED_EVENT,
  parseSolvedChallenges
} from "@/components/ctf/ctf-state";

/**
 * CTF flag hardening regression test.
 *
 * Verify each stored `expectedHash` equals SHA-256 of the canonical flag value
 * (normalised: trim + lowercase + spaces collapsed to dashes). The plaintext
 * for the canonical answer is intentionally derived from the hash tables here
 * so the test still proves the link without ever shipping the plaintext into
 * the JS bundle.
 */
const CANONICAL: Record<string, string> = {
  "base64-beacon": "basilisk-shell",
  "source-inspector": "basilisk-cyber",
  "console-broadcast": "kali-basilisk"
};

describe("CTF challenges use hashed expectations only", () => {
  it("every challenge has the canonical expectedHash", async () => {
    expect(portfolio.ctf.challenges.length).toBe(3);
    for (const challenge of portfolio.ctf.challenges) {
      const expected = CANONICAL[challenge.id];
      expect(expected, `missing canonical flag for ${challenge.id}`).toBeTruthy();
      const hashed = await sha256(expected);
      expect(challenge.expectedHash, `hash mismatch for ${challenge.id}`).toBe(hashed);
    }
  });

  it("expectedHash fields have no plaintext leakage in shape", () => {
    for (const challenge of portfolio.ctf.challenges) {
      // 64 lowercase hex chars
      expect(challenge.expectedHash).toMatch(/^[0-9a-f]{64}$/);
      // should not contain common plaintext markers
      expect(challenge.expectedHash).not.toContain("basilisk");
      expect(challenge.expectedHash).not.toContain("kali");
    }
  });

  it("ships each discoverable clue in its promised location", () => {
    const page = readFileSync(join(process.cwd(), "src/app/page.tsx"), "utf8");
    const component = readFileSync(
      join(process.cwd(), "src/components/ctf/FlagHunt.tsx"),
      "utf8"
    );
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

    expect(page).toContain("<!-- basilisk-beacon: YmFzaWxpc2stc2hlbGw= -->");
    expect(component).toContain("onfvyvfx-ploer");
    expect(css).toContain(".onfvyvfx-ploer");
    expect(component).toContain('const encoded = "xnyv-onfvyvfx"');
    expect(component).not.toContain("→ %c${decoded}");
  });

  it("filters stored progress and announces same-tab updates", () => {
    const ids = portfolio.ctf.challenges.map((challenge) => challenge.id);
    expect(
      parseSolvedChallenges(
        JSON.stringify([ids[0], "unknown-challenge", ids[0], ids[1]]),
        ids
      )
    ).toEqual([ids[0], ids[1]]);

    let received: string[] | undefined;
    const listener = (event: Event) => {
      received = (event as CustomEvent<string[]>).detail;
    };
    window.addEventListener(CTF_SOLVED_EVENT, listener);
    announceSolvedChallenges(ids.slice(0, 2));
    window.removeEventListener(CTF_SOLVED_EVENT, listener);
    expect(received).toEqual(ids.slice(0, 2));
  });
});
