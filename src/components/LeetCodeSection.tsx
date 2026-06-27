import { portfolio } from "@/data/portfolio";
import { fetchLeetCodeStats } from "@/lib/leetcode";

export default async function LeetCodeSection() {
  const stats = await fetchLeetCodeStats(portfolio.leetcodeUsername);

  if (!stats) return null;

  return (
    <section className="section-wrap !pt-0">
      <div className="mx-auto max-w-3xl">
        <div className="glass-card p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-text">LeetCode</p>
              <a
                href={stats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover text-sm text-accent"
              >
                @{stats.username}
              </a>
            </div>
            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-text"
            >
              Profile →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.contestRating && (
              <Stat label="Contest rating" value={stats.contestRating} />
            )}
            <Stat label="Solved" value={stats.totalSolved} />
            <Stat label="Medium" value={stats.medium} />
            <Stat label="Hard" value={stats.hard} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card rounded-lg border border-border bg-surface px-3 py-3 text-center">
      <p className="text-xl font-medium text-text">{value}</p>
      <p className="mt-0.5 text-xs text-text-muted">{label}</p>
    </div>
  );
}
