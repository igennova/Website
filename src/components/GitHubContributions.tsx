import { portfolio } from "@/data/portfolio";
import { fetchContributionsByOrg } from "@/lib/github";
import OrgContributionsList from "./OrgContributionsList";

export default async function GitHubContributions({
  username,
}: {
  username: string;
}) {
  const orgs = await fetchContributionsByOrg(username, [
    ...portfolio.excludeOrgs,
  ]);

  if (orgs.length === 0) {
    return (
      <p className="mt-6 text-sm text-text-muted">
        No merged pull requests found. Make sure your GitHub username is correct.
      </p>
    );
  }

  return <OrgContributionsList orgs={orgs} />;
}
