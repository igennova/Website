import { portfolio } from "@/data/portfolio";
import { fetchContributionsFromAccounts } from "@/lib/github";
import OrgContributionsList from "./OrgContributionsList";

export default async function GitHubContributions() {
  const orgs = await fetchContributionsFromAccounts(
    [...portfolio.githubAccounts],
    [...portfolio.excludeOrgs],
  );

  if (orgs.length === 0) {
    return (
      <p className="mt-6 text-sm text-text-muted">
        No merged pull requests found yet.
      </p>
    );
  }

  return <OrgContributionsList orgs={orgs} />;
}
