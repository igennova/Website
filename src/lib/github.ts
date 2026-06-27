const GITHUB_API = "https://api.github.com";

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
}

export interface PullRequest {
  title: string;
  url: string;
  owner: string;
  repoName: string;
  repoUrl: string;
  date: string;
}

export interface OrgContributions {
  org: string;
  orgUrl: string;
  avatarUrl: string;
  prCount: number;
  pullRequests: PullRequest[];
}

export async function fetchGitHubStats(
  username: string,
): Promise<GitHubStats | null> {
  const user = await githubFetch<{
    public_repos: number;
    followers: number;
    following: number;
  }>(`${GITHUB_API}/users/${username}`);
  if (!user) return null;

  const repos = await githubFetch<{ stargazers_count: number }[]>(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
  );

  const totalStars =
    repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0;

  return {
    publicRepos: user.public_repos ?? 0,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    totalStars,
  };
}

interface SearchIssue {
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  repository_url: string;
  pull_request?: { merged_at: string | null };
}

function parseRepo(url: string) {
  const parts = url.replace(`${GITHUB_API}/repos/`, "").split("/");
  const owner = parts[0];
  const repoName = parts[1];
  return {
    owner,
    repoName,
    fullName: `${owner}/${repoName}`,
    repoUrl: `https://github.com/${owner}/${repoName}`,
  };
}

function prState(item: SearchIssue): boolean {
  return Boolean(item.pull_request?.merged_at);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function fetchPullRequests(
  username: string,
  limit = 50,
): Promise<PullRequest[]> {
  const data = await githubFetch<{ items: SearchIssue[] }>(
    `${GITHUB_API}/search/issues?q=author:${username}+type:pr+is:merged&sort=updated&order=desc&per_page=${limit}`,
  );
  if (!data?.items) return [];

  return data.items
    .filter((item) => prState(item))
    .map((item) => {
      const { owner, repoName, repoUrl } = parseRepo(item.repository_url);
      return {
        title: item.title,
        url: item.html_url,
        owner,
        repoName,
        repoUrl,
        date: formatDate(item.created_at),
      };
    });
}

export async function fetchContributionsByOrg(
  username: string,
  excludeOrgs: string[] = [],
): Promise<OrgContributions[]> {
  const excluded = new Set(excludeOrgs.map((o) => o.toLowerCase()));
  const pullRequests = await fetchPullRequests(username);
  const orgMap = new Map<string, OrgContributions>();

  for (const pr of pullRequests) {
    if (excluded.has(pr.owner.toLowerCase())) continue;

    let org = orgMap.get(pr.owner);
    if (!org) {
      org = {
        org: pr.owner,
        orgUrl: `https://github.com/${pr.owner}`,
        avatarUrl: `https://github.com/${pr.owner}.png`,
        prCount: 0,
        pullRequests: [],
      };
      orgMap.set(pr.owner, org);
    }
    org.pullRequests.push(pr);
    org.prCount += 1;
  }

  return [...orgMap.values()].sort((a, b) => b.prCount - a.prCount);
}
