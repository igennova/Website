import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import GitHubContributions from "./GitHubContributions";
import GitHubStats from "./GitHubStats";
import SectionHeader from "./SectionHeader";

export default function GitHubSection() {
  const chartUrl = `https://ghchart.rshah.org/${portfolio.githubUsername}`;

  return (
    <section id="github" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          title="GitHub"
          subtitle="Contributions and activity"
        />

        <div className="glass-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              @{portfolio.githubUsername}
            </p>
            <a
              href={portfolio.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              Profile
            </a>
          </div>

          <GitHubStats username={portfolio.githubUsername} />

          <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-bg p-3">
            <Image
              src={chartUrl}
              alt={`GitHub contributions for ${portfolio.githubUsername}`}
              width={824}
              height={120}
              className="mx-auto h-auto w-full"
              unoptimized
            />
          </div>

          <GitHubContributions username={portfolio.githubUsername} />
        </div>
      </div>
    </section>
  );
}
