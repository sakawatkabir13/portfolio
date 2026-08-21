export async function sha1(input: string): Promise<string> {
  return hash(input, "SHA-1");
}

export async function sha256(input: string): Promise<string> {
  return hash(input, "SHA-256");
}

export async function sha384(input: string): Promise<string> {
  return hash(input, "SHA-384");
}

export async function sha512(input: string): Promise<string> {
  return hash(input, "SHA-512");
}

export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export async function hash(input: string, algorithm: HashAlgorithm): Promise<string> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("SubtleCrypto is not available in this environment.");
  }
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algorithm, data);
  const bytes = new Uint8Array(digest);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}