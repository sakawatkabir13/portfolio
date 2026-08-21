import { describe, expect, it } from "vitest";
import { base64, caesar, hexDecode, hexEncode, rot13, runCipher } from "@/lib/ciphers";
import { analyzePassword } from "@/lib/password";
import { sha256 } from "@/lib/hash";

describe("ciphers", () => {
  it("base64 round-trips utf8 strings", () => {
    const original = "hello bāsilisk 🦎";
    const encoded = base64(original, "encode");
    expect(typeof encoded).toBe("string");
    expect(base64(encoded, "decode")).toBe(original);
  });

  it("rot13 is its own inverse", () => {
    const input = "Basilisk13";
    expect(rot13(rot13(input))).toBe(input);
    expect(rot13("Uryyb")).toBe("Hello");
  });

  it("caesar shifts correctly and round-trips with matching shift", () => {
    expect(caesar("HELLO", 3, "encode")).toBe("KHOOR");
    expect(caesar("KHOOR", 3, "decode")).toBe("HELLO");
    expect(caesar("hello", 1, "encode")).toBe("ifmmp");
  });

  it("hex round-trips", () => {
    expect(hexDecode(hexEncode("hi"))).toBe("hi");
    expect(hexEncode("ABC")).toBe("414243");
  });

  it("runCipher dispatches correctly", () => {
    expect(runCipher("rot13", "Basilisk")).toBe("Onfvyvfx");
    expect(runCipher("caesar", "Basilisk", "encode", 5)).toBe("Gfxnqnxp");
    expect(runCipher("base64", "hi", "encode")).toBe("aGk=");
  });
});

describe("password analyzer", () => {
  it("flags empty password as very weak with zero entropy", () => {
    const r = analyzePassword("");
    expect(r.strength).toBe("very-weak");
    expect(r.entropy).toBe(0);
    expect(r.charsetSize).toBe(0);
  });

  it("rates a common short password as very weak", () => {
    const r = analyzePassword("password");
    expect(r.strength).toBe("very-weak");
    expect(r.checks.noCommon).toBe(false);
    expect(r.checks.lengthAtLeast8).toBe(true);
  });

  it("computes entropy from length and charset", () => {
    const r = analyzePassword("abcdefgh");
    expect(r.charsetSize).toBe(26);
    expect(r.entropy).toBeCloseTo(8 * Math.log2(26), 1);
    expect(r.checks.hasLower).toBe(true);
    expect(r.checks.hasUpper).toBe(false);
  });

  it("rates a long mixed password as strong", () => {
    const r = analyzePassword("9!Fr@m3ngin3-Hunter");
    expect(["strong", "very-strong"]).toContain(r.strength);
    expect(r.checks.hasUpper).toBe(true);
    expect(r.checks.hasDigit).toBe(true);
    expect(r.checks.hasSymbol).toBe(true);
  });
});

describe("hash", () => {
  it("produces the canonical SHA-256 hash", async () => {
    expect(await sha256("")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    expect(await sha256("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
  });
});