export type PasswordAnalysis = {
  length: number;
  charsetSize: number;
  entropy: number;
  crackTimeSeconds: number;
  strength: "very-weak" | "weak" | "fair" | "strong" | "very-strong";
  checks: {
    lengthAtLeast8: boolean;
    lengthAtLeast12: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasDigit: boolean;
    hasSymbol: boolean;
    noRepeats: boolean;
    noCommon: boolean;
  };
};

const COMMON = new Set([
  "password",
  "123456",
  "12345678",
  "123456789",
  "qwerty",
  "abc123",
  "password1",
  "admin",
  "letmein",
  "welcome",
  "iloveyou",
  "monkey",
  "dragon"
]);

export function analyzePassword(raw: string): PasswordAnalysis {
  const password = raw ?? "";
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  let charset = 0;
  if (hasLower) charset += 26;
  if (hasUpper) charset += 26;
  if (hasDigit) charset += 10;
  if (hasSymbol) charset += 33;

  const entropy = length === 0 || charset === 0 ? 0 : length * Math.log2(charset);

  const guessesPerSecond = 1e10;
  const totalGuesses = Math.pow(2, entropy);
  const crackTimeSeconds = totalGuesses / guessesPerSecond;

  let strength: PasswordAnalysis["strength"] = "very-weak";
  if (length === 0) strength = "very-weak";
  else if (entropy < 28) strength = "very-weak";
  else if (entropy < 36) strength = "weak";
  else if (entropy < 60) strength = "fair";
  else if (entropy < 80) strength = "strong";
  else strength = "very-strong";

  const noRepeats = !/(.)\1{2,}/.test(password);
  const noCommon = !COMMON.has(password.toLowerCase());

  // Common-password override: cap strength based on length.
  if (!noCommon) {
    if (length < 12) {
      strength = "very-weak";
    } else {
      strength = "weak";
    }
  }

  return {
    length,
    charsetSize: charset,
    entropy: Math.round(entropy * 10) / 10,
    crackTimeSeconds,
    strength,
    checks: {
      lengthAtLeast8: length >= 8,
      lengthAtLeast12: length >= 12,
      hasUpper,
      hasLower,
      hasDigit,
      hasSymbol,
      noRepeats,
      noCommon
    }
  };
}

export function formatCrackTime(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "instant";
  if (seconds < 1) return "instant";
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)}m`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}h`;
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)}d`;
  if (seconds < 31536000 * 100) return `${(seconds / 31536000).toFixed(1)}y`;
  if (seconds < 31536000 * 1e6) return `${(seconds / 31536000 / 1000).toFixed(1)}k years`;
  return "centuries+";
}