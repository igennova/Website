import { fetchGitHubStats } from "@/lib/github";

const fallback = {
  publicRepos: 0,
  followers: 0,
  following: 0,
  totalStars: 0,
};

export default async function GitHubStats({ username }: { username: string }) {
  const stats = (await fetchGitHubStats(username)) ?? fallback;

  const items = [
    { label: "Repos", value: stats.publicRepos },
    { label: "Stars", value: stats.totalStars },
    { label: "Followers", value: stats.followers },
    { label: "Following", value: stats.following },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="stat-card rounded-lg border border-border bg-surface px-3 py-4 text-center"
        >
          <p className="text-2xl font-medium text-text">{item.value}</p>
          <p className="mt-1 text-xs text-text-muted">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
