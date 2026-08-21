export type CipherAlgorithm = "base64" | "rot13" | "caesar" | "hex";
export type CipherMode = "encode" | "decode";

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);
const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);

function shiftChar(ch: string, shift: number): string {
  const code = ch.charCodeAt(0);
  if (code >= A && code <= Z) {
    return String.fromCharCode(((code - A + shift + 26) % 26) + A);
  }
  if (code >= a && code <= z) {
    return String.fromCharCode(((code - a + shift + 26) % 26) + a);
  }
  return ch;
}

export function caesar(input: string, shift: number, mode: CipherMode): string {
  const normalized = ((shift % 26) + 26) % 26;
  const effective = mode === "decode" ? -normalized : normalized;
  let out = "";
  for (const ch of input) {
    out += shiftChar(ch, effective);
  }
  return out;
}

export function rot13(input: string): string {
  let out = "";
  for (const ch of input) {
    out += shiftChar(ch, 13);
  }
  return out;
}

function utf8ToBytes(input: string): Uint8Array {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(input);
  }
  const bytes: number[] = [];
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6));
      bytes.push(0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff) {
      const next = input.charCodeAt(i + 1);
      i++;
      const cp = 0x10000 + (((code & 0x3ff) << 10) | (next & 0x3ff));
      bytes.push(0xf0 | (cp >> 18));
      bytes.push(0x80 | ((cp >> 12) & 0x3f));
      bytes.push(0x80 | ((cp >> 6) & 0x3f));
      bytes.push(0x80 | (cp & 0x3f));
    } else {
      bytes.push(0xe0 | (code >> 12));
      bytes.push(0x80 | ((code >> 6) & 0x3f));
      bytes.push(0x80 | (code & 0x3f));
    }
  }
  return new Uint8Array(bytes);
}

function bytesToUtf8(bytes: Uint8Array): string {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder().decode(bytes);
  }
  let out = "";
  let i = 0;
  while (i < bytes.length) {
    const b = bytes[i++];
    if (b < 0x80) out += String.fromCharCode(b);
    else if (b < 0xe0) {
      out += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i++] & 0x3f));
    } else if (b < 0xf0) {
      out += String.fromCharCode(
        ((b & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f)
      );
    } else {
      const cp =
        ((b & 0x07) << 18) |
        ((bytes[i++] & 0x3f) << 12) |
        ((bytes[i++] & 0x3f) << 6) |
        (bytes[i++] & 0x3f);
      const offset = cp - 0x10000;
      out += String.fromCharCode(0xd800 + (offset >> 10), 0xdc00 + (offset & 0x3ff));
    }
  }
  return out;
}

export function base64(input: string, mode: CipherMode): string {
  if (mode === "encode") {
    if (typeof btoa !== "undefined") {
      const bytes = utf8ToBytes(input);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary);
    }
    const bytes = utf8ToBytes(input);
    return Buffer.from(bytes).toString("base64");
  }
  if (typeof atob !== "undefined") {
    const binary = atob(input.replace(/\s+/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytesToUtf8(bytes);
  }
  return Buffer.from(input.replace(/\s+/g, ""), "base64").toString("utf8");
}

export function hexEncode(input: string): string {
  const bytes = utf8ToBytes(input);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

export function hexDecode(input: string): string {
  const cleaned = input.replace(/\s+/g, "").toLowerCase();
  if (cleaned.length % 2 !== 0) {
    throw new Error("Hex input must have an even number of characters.");
  }
  if (!/^[0-9a-f]*$/.test(cleaned)) {
    throw new Error("Hex input contains invalid characters.");
  }
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleaned.substring(i * 2, i * 2 + 2), 16);
  }
  return bytesToUtf8(bytes);
}

export function runCipher(
  algorithm: CipherAlgorithm,
  input: string,
  mode: CipherMode = "encode",
  shift = 3
): string {
  switch (algorithm) {
    case "base64":
      return base64(input, mode);
    case "rot13":
      return rot13(input);
    case "caesar":
      return caesar(input, shift, mode);
    case "hex":
      return mode === "encode" ? hexEncode(input) : hexDecode(input);
  }
}