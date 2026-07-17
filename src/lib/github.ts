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
    if (!res.ok) {
      console.warn(`GitHub API ${res.status}: ${url}`);
      return null;
    }
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
  /** Gumboard has PRs disabled — those show as commits instead. */
  kind?: "merged" | "commit";
}

export interface OrgContributions {
  org: string;
  orgUrl: string;
  avatarUrl: string;
  prCount: number;
  pullRequests: PullRequest[];
}

/** Map related owners into one display org (e.g. gumroad → antiwork). */
const ORG_ALIASES: Record<string, string> = {
  gumroad: "antiwork",
  gumboard: "antiwork",
};

const DISPLAY_NAMES: Record<string, string> = {
  antiwork: "Antiwork / Gumroad / Gumboard",
};

/** Repos where PRs are disabled / not searchable — pull commits instead. */
const COMMIT_REPOS = [{ owner: "antiwork", repo: "gumboard" }] as const;

function resolveOrg(owner: string): string {
  return ORG_ALIASES[owner.toLowerCase()] ?? owner;
}

function displayName(org: string): string {
  return DISPLAY_NAMES[org.toLowerCase()] ?? org;
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapIssues(items: SearchIssue[]): PullRequest[] {
  return items
    .filter((item) => Boolean(item.pull_request?.merged_at))
    .map((item) => {
      const { owner, repoName, repoUrl } = parseRepo(item.repository_url);
      return {
        title: item.title,
        url: item.html_url,
        owner,
        repoName,
        repoUrl,
        date: formatDate(item.created_at),
        kind: "merged" as const,
      };
    });
}

interface RepoCommit {
  html_url: string;
  commit: {
    message: string;
    author: { date: string } | null;
    committer: { date: string } | null;
  };
}

/**
 * Gumboard (and similar) disabled the PR API — contributions only show as commits.
 * Commit messages often include (#123) from the original merged PR.
 */
async function fetchRepoCommits(
  username: string,
  owner: string,
  repo: string,
): Promise<PullRequest[]> {
  const data = await githubFetch<RepoCommit[]>(
    `${GITHUB_API}/repos/${owner}/${repo}/commits?author=${username}&per_page=30`,
  );
  if (!data?.length) return [];

  return data.map((c) => {
    const title = c.commit.message.split("\n")[0]?.trim() || "Contribution";
    const dateIso =
      c.commit.author?.date ?? c.commit.committer?.date ?? new Date().toISOString();
    return {
      title,
      url: c.html_url,
      owner,
      repoName: repo,
      repoUrl: `https://github.com/${owner}/${repo}`,
      date: formatDate(dateIso),
      kind: "commit" as const,
    };
  });
}

/** General merged PRs for an account (recent). */
async function fetchRecentMergedPRs(
  username: string,
  limit = 100,
): Promise<PullRequest[]> {
  const data = await githubFetch<{ items: SearchIssue[] }>(
    `${GITHUB_API}/search/issues?q=author:${username}+type:pr+is:merged&sort=updated&order=desc&per_page=${limit}`,
  );
  return mapIssues(data?.items ?? []);
}

/**
 * Extra targeted search so important orgs aren't lost when an account
 * has many newer PRs elsewhere (search is capped / sorted by updated).
 */
async function fetchOrgMergedPRs(
  username: string,
  org: string,
  limit = 50,
): Promise<PullRequest[]> {
  const data = await githubFetch<{ items: SearchIssue[] }>(
    `${GITHUB_API}/search/issues?q=author:${username}+type:pr+is:merged+org:${org}&sort=updated&order=desc&per_page=${limit}`,
  );
  return mapIssues(data?.items ?? []);
}

async function fetchPullRequestsForUser(
  username: string,
): Promise<PullRequest[]> {
  const [recent, antiwork, ...commitBatches] = await Promise.all([
    fetchRecentMergedPRs(username),
    fetchOrgMergedPRs(username, "antiwork"),
    ...COMMIT_REPOS.map(({ owner, repo }) =>
      fetchRepoCommits(username, owner, repo),
    ),
  ]);

  const byUrl = new Map<string, PullRequest>();
  for (const pr of [...recent, ...antiwork, ...commitBatches.flat()]) {
    byUrl.set(pr.url, pr);
  }
  return [...byUrl.values()];
}

export async function fetchContributionsByOrg(
  username: string,
  excludeOrgs: string[] = [],
): Promise<OrgContributions[]> {
  return fetchContributionsFromAccounts([username], excludeOrgs);
}

export async function fetchContributionsFromAccounts(
  usernames: string[],
  excludeOrgs: string[] = [],
): Promise<OrgContributions[]> {
  const excluded = new Set(excludeOrgs.map((o) => o.toLowerCase()));
  const orgMap = new Map<string, OrgContributions>();
  const seenUrls = new Set<string>();

  const allPrs = (
    await Promise.all(usernames.map((u) => fetchPullRequestsForUser(u)))
  ).flat();

  for (const pr of allPrs) {
    const orgKey = resolveOrg(pr.owner);
    if (excluded.has(orgKey.toLowerCase())) continue;
    if (excluded.has(pr.owner.toLowerCase())) continue;
    if (seenUrls.has(pr.url)) continue;
    seenUrls.add(pr.url);

    let org = orgMap.get(orgKey);
    if (!org) {
      org = {
        org: displayName(orgKey),
        orgUrl: `https://github.com/${orgKey}`,
        avatarUrl: `https://github.com/${orgKey}.png`,
        prCount: 0,
        pullRequests: [],
      };
      orgMap.set(orgKey, org);
    }
    org.pullRequests.push(pr);
    org.prCount += 1;
  }

  // Newest first within each org
  for (const org of orgMap.values()) {
    org.pullRequests.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da;
    });
  }

  return [...orgMap.values()].sort((a, b) => b.prCount - a.prCount);
}

export async function fetchGitHubProfile(username: string) {
  return githubFetch<{
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    html_url: string;
    public_repos: number;
  }>(`${GITHUB_API}/users/${username}`);
}
