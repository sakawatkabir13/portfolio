/**
 * Server-side scraper for the public GitHub contributions calendar.
 *
 * GitHub's `/users/<username>/contributions` page renders the activity grid as
 * `<td data-date="YYYY-MM-DD" data-level="0..4">` cells with sibling
 * `<tool-tip>` elements carrying the human-readable count. We scrape that
 * page instead of relying on the third-party `github-contributions-api`
 * because:
 *
 *   - The data is the source of truth (no stale cache, no rate limit beyond
 *     unauthenticated GitHub HTML scraping, which is generous).
 *   - There is no third-party dependency.
 *   - It survives in static-export builds because we run at request time
 *     during dev / on each server render in production.
 *
 * If GitHub ever changes the markup, this function will return `[]` and the
 * UI falls back to a clean "couldn't fetch" message.
 */

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionsPayload = {
  username: string;
  total: number;
  days: ContributionDay[];
  fetchedAt: string;
};

const TOOLTIP_REGEX =
  /<tool-tip[^>]*for="contribution-day-component-[^"]+"[^>]*>([^<]+)<\/tool-tip>/g;

const DAY_REGEX =
  /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;

function parseContributions(html: string): ContributionDay[] {
  const tipMap = new Map<string, number>();
  let match: RegExpExecArray | null;
  while ((match = TOOLTIP_REGEX.exec(html)) !== null) {
    const text = match[1];
    const dateMatch = text.match(/(\w+ \d{1,2}(?:st|nd|rd|th)?)/i);
    if (!dateMatch) continue;
    const countMatch = text.match(/^(\d+)\s+contribution/i);
    const count = countMatch ? Number.parseInt(countMatch[1], 10) : 0;
    // The tooltip text doesn't include the year. We re-key by index instead.
    tipMap.set(String(tipMap.size), count);
  }

  const days: ContributionDay[] = [];
  let i = 0;
  while ((match = DAY_REGEX.exec(html)) !== null) {
    const [, date, levelStr] = match;
    const level = Math.max(0, Math.min(4, Number.parseInt(levelStr, 10))) as
      | 0
      | 1
      | 2
      | 3
      | 4;
    // Map by ordinal position — tooltips and cells are in the same DOM order.
    const count = tipMap.get(String(i)) ?? 0;
    days.push({ date, count, level });
    i += 1;
  }
  return days;
}

export async function fetchGitHubContributions(
  username: string,
  signal?: AbortSignal
): Promise<ContributionsPayload> {
  const url = `https://github.com/users/${encodeURIComponent(username)}/contributions`;
  const response = await fetch(url, {
    headers: {
      // GitHub returns 404 for non-browser User-Agent strings; mimic one.
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      Accept: "text/html"
    },
    // GitHub's HTML is safe to cache at the Next.js data-cache layer for an
    // hour — commits don't update minute-to-minute.
    next: { revalidate: 3600 },
    signal
  });

  if (!response.ok) {
    throw new Error(
      `GitHub responded with ${response.status} for ${username}'s contributions.`
    );
  }

  const html = await response.text();
  const days = parseContributions(html);
  const total = days.reduce((sum, day) => sum + day.count, 0);

  return {
    username,
    total,
    days,
    fetchedAt: new Date().toISOString()
  };
}
