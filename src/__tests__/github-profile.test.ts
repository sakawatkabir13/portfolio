import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubProfileStats } from "@/lib/github-profile";

describe("GitHub profile statistics", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("combines live profile and repository data", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ public_repos: 15, followers: 3, following: 4 })
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          { stargazers_count: 2, language: "Python" },
          { stargazers_count: 3, language: "TypeScript" },
          { stargazers_count: 0, language: "Python" },
          { stargazers_count: 0, language: null }
        ]
      });
    vi.stubGlobal("fetch", fetchMock);

    const stats = await fetchGitHubProfileStats("sakawatkabir13");

    expect(stats).toMatchObject({
      publicRepos: 15,
      totalStars: 5,
      followers: 3,
      following: 4,
      topLanguages: ["Python", "TypeScript"]
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
