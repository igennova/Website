const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";
const LEETCODE_API = "https://alfa-leetcode-api.onrender.com";

export interface LeetCodeStats {
  username: string;
  ranking: number;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  contestRating: number | null;
  contestsAttended: number | null;
  profileUrl: string;
}

async function graphqlFetch<T>(
  query: string,
  variables: Record<string, string>,
): Promise<T | null> {
  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

async function fetchContestStats(username: string) {
  try {
    const res = await fetch(`${LEETCODE_API}/${username}/contest`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      rating: Math.round(data.contestRating ?? 0),
      attended: data.contestAttend ?? 0,
    };
  } catch {
    return null;
  }
}

export async function fetchLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  const data = await graphqlFetch<{
    matchedUser: {
      username: string;
      profile: { ranking: number };
      submitStats: {
        acSubmissionNum: { difficulty: string; count: number }[];
      };
    } | null;
  }>(
    `query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking }
        submitStats { acSubmissionNum { difficulty count } }
      }
    }`,
    { username },
  );

  const user = data?.matchedUser;
  if (!user) return null;

  const counts = Object.fromEntries(
    user.submitStats.acSubmissionNum.map((s) => [s.difficulty, s.count]),
  );

  const contest = await fetchContestStats(username);

  return {
    username: user.username,
    ranking: user.profile.ranking,
    totalSolved: counts.All ?? 0,
    easy: counts.Easy ?? 0,
    medium: counts.Medium ?? 0,
    hard: counts.Hard ?? 0,
    contestRating: contest?.rating ?? null,
    contestsAttended: contest?.attended ?? null,
    profileUrl: `https://leetcode.com/${user.username}`,
  };
}
