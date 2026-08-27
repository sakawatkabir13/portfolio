export type GitHubProfileStats = {
  publicRepos: number;
  totalStars: number;
  followers: number;
  following: number;
  topLanguages: string[];
  fetchedAt: string;
};

type GitHubUserResponse = {
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepositoryResponse = {
  stargazers_count: number;
  language: string | null;
};

function getGitHubHeaders() {
  const token = process.env.GITHUB_TOKEN?.trim();

  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "basilisk13-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function fetchGitHubProfileStats(
  username: string,
  signal?: AbortSignal
): Promise<GitHubProfileStats> {
  const encodedUsername = encodeURIComponent(username);
  const requestOptions = {
    headers: getGitHubHeaders(),
    next: { revalidate: 3600 },
    signal
  } as const;

  const [profileResponse, repositoriesResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${encodedUsername}`, requestOptions),
    fetch(
      `https://api.github.com/users/${encodedUsername}/repos?per_page=100&type=owner&sort=updated`,
      requestOptions
    )
  ]);

  if (!profileResponse.ok || !repositoriesResponse.ok) {
    throw new Error(
      `GitHub profile request failed with ${profileResponse.status}/${repositoriesResponse.status}.`
    );
  }

  const profile = (await profileResponse.json()) as GitHubUserResponse;
  const repositories =
    (await repositoriesResponse.json()) as GitHubRepositoryResponse[];
  const languageCounts = new Map<string, number>();

  for (const repository of repositories) {
    if (!repository.language) continue;
    languageCounts.set(
      repository.language,
      (languageCounts.get(repository.language) ?? 0) + 1
    );
  }

  const topLanguages = Array.from(languageCounts.entries())
    .sort(([languageA, countA], [languageB, countB]) =>
      countB === countA ? languageA.localeCompare(languageB) : countB - countA
    )
    .slice(0, 5)
    .map(([language]) => language);

  return {
    publicRepos: profile.public_repos,
    totalStars: repositories.reduce(
      (total, repository) => total + repository.stargazers_count,
      0
    ),
    followers: profile.followers,
    following: profile.following,
    topLanguages,
    fetchedAt: new Date().toISOString()
  };
}
