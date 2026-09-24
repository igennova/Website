import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import {
  fetchContributionsFromAccounts,
  fetchGitHubProfile,
  fetchGitHubStats,
  type OrgContributions,
} from "@/lib/github";
import BountyCard from "./BountyCard";
import ImpactStats from "./ImpactStats";
import OrgWall from "./OrgWall";
import SectionHeader from "./SectionHeader";

export default async function GitHubSection() {
  const [profile, stats, liveOrgs] = await Promise.all([
    fetchGitHubProfile(portfolio.githubUsername),
    fetchGitHubStats(portfolio.githubUsername),
    fetchContributionsFromAccounts(
      [...portfolio.githubAccounts],
      [...portfolio.excludeOrgs],
    ),
  ]);
  const archived: OrgContributions[] = portfolio.archivedContributions.map((a) => ({
    org: a.org,
    orgUrl: `https://github.com/${a.login}`,
    avatarUrl: `https://github.com/${a.login}.png`,
    prCount: a.prCount,
    archived: { countLabel: a.countLabel, note: a.note },
    pullRequests: a.highlights.map((title) => ({
      title,
      url: "",
      owner: a.login,
      repoName: a.repo,
      repoUrl: "",
      date: a.period,
      kind: "archived" as const,
    })),
  }));
  const orgs = [...archived, ...liveOrgs].sort((a, b) => b.prCount - a.prCount);
  const contributions = orgs.reduce((sum, o) => sum + o.prCount, 0);
  const repos = new Set(
    orgs.flatMap((o) => o.pullRequests.map((pr) => `${pr.owner}/${pr.repoName}`)),
  ).size;
  const chartUrl = `https://ghchart.rshah.org/${portfolio.githubUsername}`;
  const avatar = profile?.avatar_url ?? portfolio.githubAvatar;
  const bio = profile?.bio ?? "GSoC @OWASP";

  return (
    <section id="github" className="section-wrap">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="GitHub" subtitle="Contributions and activity" />

        <div className="glass-card p-5">
          <div className="mb-4 flex items-start gap-4">
            <Image
              src={avatar}
              alt={portfolio.name}
              width={64}
              height={64}
              className="avatar-glow rounded-full border border-border"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-text">
                    {profile?.name ?? portfolio.name}
                  </p>
                  <a
                    href={portfolio.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover text-sm text-accent"
                  >
                    @{portfolio.githubUsername}
                  </a>
                </div>
                <a
                  href={portfolio.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover text-sm text-text-muted"
                >
                  Profile →
                </a>
              </div>
              {bio && (
                <p className="mt-2 text-sm text-text-muted">{bio}</p>
              )}
              {stats && (
                <p className="mt-2 flex flex-wrap gap-x-3 text-xs text-text-muted">
                  <span><span className="text-text">{stats.publicRepos}</span> repos</span>
                  <span><span className="text-text">{stats.totalStars}</span> stars</span>
                  <span><span className="text-text">{stats.followers}</span> followers</span>
                </p>
              )}
            </div>
          </div>

          <BountyCard />

          <ImpactStats
            stats={[
              {
                label: "Merged contributions",
                value: contributions,
                suffix: archived.length ? "+" : undefined,
              },
              { label: "Organizations", value: orgs.length },
              { label: "Repositories", value: repos },
              { label: "Summer of Code · OWASP", value: "GSoC '25" },
            ]}
          />

          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-black/40 p-3">
            <Image
              src={chartUrl}
              alt={`GitHub contributions for ${portfolio.githubUsername}`}
              width={824}
              height={120}
              className="mx-auto h-auto w-full"
              unoptimized
            />
          </div>

          {orgs.length > 0 ? (
            <OrgWall orgs={orgs} />
          ) : (
            <p className="mt-6 text-sm text-text-muted">
              No merged pull requests found yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
