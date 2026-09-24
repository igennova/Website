const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

export interface DifficultyStat {
  solved: number;
  total: number;
}

export interface LeetCodeStats {
  username: string;
  ranking: number;
  totalSolved: number;
  totalQuestions: number;
  easy: DifficultyStat;
  medium: DifficultyStat;
  hard: DifficultyStat;
  contest: {
    rating: number;
    attended: number;
    globalRanking: number;
    topPercentage: number;
    /** Rating after each attended contest, oldest first. */
    history: number[];
  } | null;
  streak: number;
  activeDays: number;
  topBadge: string | null;
  topLanguage: string | null;
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

interface ProfileResponse {
  allQuestionsCount: { difficulty: string; count: number }[];
  matchedUser: {
    username: string;
    profile: { ranking: number };
    submitStats: { acSubmissionNum: { difficulty: string; count: number }[] };
    languageProblemCount: { languageName: string; problemsSolved: number }[];
    userCalendar: { streak: number; totalActiveDays: number } | null;
    badges: { displayName: string }[];
  } | null;
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
  } | null;
  userContestRankingHistory: { attended: boolean; rating: number }[] | null;
}

const QUERY = `query getUserProfile($username: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    username
    profile { ranking }
    submitStats { acSubmissionNum { difficulty count } }
    languageProblemCount { languageName problemsSolved }
    userCalendar { streak totalActiveDays }
    badges { displayName }
  }
  userContestRanking(username: $username) {
    attendedContestsCount rating globalRanking topPercentage
  }
  userContestRankingHistory(username: $username) { attended rating }
}`;

/** Largest all-time "N Days Badge" (ignores yearly ones like "100 Days Badge 2025"). */
function pickTopBadge(badges: { displayName: string }[]) {
  const ranked = badges
    .map((b) => ({ name: b.displayName, days: Number(/^(\d+) Days Badge$/.exec(b.displayName)?.[1]) }))
    .filter((b) => b.days)
    .sort((a, b) => b.days - a.days);
  return ranked[0]?.name ?? badges[0]?.displayName ?? null;
}

/** Merge "Python" / "Python3" style variants and return the most used language. */
function pickTopLanguage(langs: { languageName: string; problemsSolved: number }[]) {
  const totals = new Map<string, number>();
  for (const { languageName, problemsSolved } of langs) {
    const name = languageName.replace(/\d+$/, "");
    totals.set(name, (totals.get(name) ?? 0) + problemsSolved);
  }
  return [...totals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

export async function fetchLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  const data = await graphqlFetch<ProfileResponse>(QUERY, { username });
  const user = data?.matchedUser;
  if (!user) return null;

  const solved = Object.fromEntries(
    user.submitStats.acSubmissionNum.map((s) => [s.difficulty, s.count]),
  );
  const totals = Object.fromEntries(
    (data.allQuestionsCount ?? []).map((s) => [s.difficulty, s.count]),
  );
  const contest = data.userContestRanking;

  return {
    username: user.username,
    ranking: user.profile.ranking,
    totalSolved: solved.All ?? 0,
    totalQuestions: totals.All ?? 0,
    easy: { solved: solved.Easy ?? 0, total: totals.Easy ?? 0 },
    medium: { solved: solved.Medium ?? 0, total: totals.Medium ?? 0 },
    hard: { solved: solved.Hard ?? 0, total: totals.Hard ?? 0 },
    contest: contest
      ? {
          rating: Math.round(contest.rating),
          attended: contest.attendedContestsCount,
          globalRanking: contest.globalRanking,
          topPercentage: contest.topPercentage,
          history: (data.userContestRankingHistory ?? [])
            .filter((h) => h.attended)
            .map((h) => Math.round(h.rating)),
        }
      : null,
    streak: user.userCalendar?.streak ?? 0,
    activeDays: user.userCalendar?.totalActiveDays ?? 0,
    topBadge: pickTopBadge(user.badges ?? []),
    topLanguage: pickTopLanguage(user.languageProblemCount ?? []),
    profileUrl: `https://leetcode.com/${user.username}`,
  };
}
