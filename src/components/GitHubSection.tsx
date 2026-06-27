import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { fetchGitHubProfile } from "@/lib/github";
import GitHubContributions from "./GitHubContributions";
import GitHubStats from "./GitHubStats";
import SectionHeader from "./SectionHeader";

export default async function GitHubSection() {
  const profile = await fetchGitHubProfile(portfolio.githubUsername);
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
            </div>
          </div>

          <div className="stat-card mb-4 rounded-lg border border-border bg-surface px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-text">
                  Bounty account · @{portfolio.bountyGithub.username}
                </p>
                <p className="text-xs text-text-muted">
                  {portfolio.bountyGithub.description}
                </p>
              </div>
              <p className="text-sm font-medium text-accent">
                {portfolio.bountyGithub.earned} earned
              </p>
            </div>
            <a
              href={portfolio.bountyGithub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover mt-2 inline-block text-xs text-text-muted"
            >
              github.com/{portfolio.bountyGithub.username} →
            </a>
          </div>

          <GitHubStats username={portfolio.githubUsername} />

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

          <GitHubContributions />
        </div>
      </div>
    </section>
  );
}
