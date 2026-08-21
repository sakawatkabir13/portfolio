import { describe, expect, it } from "vitest";
import { md5 } from "@/lib/md5";

describe("md5 (RFC 1321 reference vectors)", () => {
  it("matches the canonical empty-string digest", () => {
    expect(md5("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
  });
  it("matches the canonical 'a' digest", () => {
    expect(md5("a")).toBe("0cc175b9c0f1b6a831c399e269772661");
  });
  it("matches the canonical 'abc' digest", () => {
    expect(md5("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
  });
  it("matches the canonical 'message digest' digest", () => {
    expect(md5("message digest")).toBe("f96b697d7cb7938d525a2f31aaf161d0");
  });
  it("matches the canonical 'abcdefghijklmnopqrstuvwxyz' digest", () => {
    expect(md5("abcdefghijklmnopqrstuvwxyz")).toBe(
      "c3fcd3d76192e4007dfb496cca67e13b"
    );
  });
  it("matches the canonical 56-char 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' digest", () => {
    expect(
      md5(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      )
    ).toBe("d174ab98d277d9f5a5611c2c9f419d9f");
  });
  it("matches the canonical 80-char digit-string digest", () => {
    expect(
      md5(
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890"
      )
    ).toBe("57edf4a22be3c955ac49da2e2107b67a");
  });
});