export const CTF_STORAGE_KEY = "basilisk:ctf-solved";
export const CTF_SOLVED_EVENT = "basilisk:ctf-solved-updated";

export function parseSolvedChallenges(
  raw: string | null,
  knownIds: readonly string[]
): string[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const allowed = new Set(knownIds);
    return Array.from(
      new Set(
        parsed.filter(
          (id): id is string => typeof id === "string" && allowed.has(id)
        )
      )
    );
  } catch {
    return [];
  }
}

export function announceSolvedChallenges(solved: readonly string[]) {
  window.dispatchEvent(
    new CustomEvent<string[]>(CTF_SOLVED_EVENT, { detail: [...solved] })
  );
}
