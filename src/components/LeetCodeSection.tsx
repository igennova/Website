import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { fetchLeetCodeStats, type LeetCodeStats } from "@/lib/leetcode";

const DIFFICULTIES = [
  { key: "easy", label: "Easy", color: "#1cbaba" },
  { key: "medium", label: "Medium", color: "#ffb700" },
  { key: "hard", label: "Hard", color: "#f63737" },
] as const;

const fmt = (n: number) => n.toLocaleString("en-US");

export default async function LeetCodeSection() {
  const stats = await fetchLeetCodeStats(portfolio.leetcodeUsername);

  if (!stats) return null;

  return (
    <section className="section-wrap !pt-0">
      <div className="mx-auto max-w-3xl">
        <div className="glass-card lc-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://leetcode.com&size=64"
                alt=""
                width={32}
                height={32}
                className="rounded-lg border border-border bg-surface p-1"
              />
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
            </div>
            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Profile ↗
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.contest && <ContestPanel contest={stats.contest} />}
            <SolvedPanel stats={stats} />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {stats.streak > 0 && (
              <span className="lc-chip lc-chip--hot">
                <FlameIcon /> {stats.streak}-day streak
              </span>
            )}
            {stats.activeDays > 0 && (
              <span className="lc-chip">{stats.activeDays} active days</span>
            )}
            {stats.topBadge && <span className="lc-chip">🏅 {stats.topBadge}</span>}
            {stats.topLanguage && <span className="lc-chip">Mostly {stats.topLanguage}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContestPanel({ contest }: { contest: NonNullable<LeetCodeStats["contest"]> }) {
  const peak = Math.max(...contest.history, contest.rating);

  return (
    <div className="lc-panel flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="lc-eyebrow">Contest rating</p>
          <p className="lc-rating">{fmt(contest.rating)}</p>
        </div>
        <span className="lc-top">Top {contest.topPercentage}%</span>
      </div>

      <Sparkline points={contest.history} />

      <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 text-xs text-text-muted">
        <span>
          <span className="text-text">{contest.attended}</span> contests
        </span>
        <span>
          Peak <span className="text-text">{fmt(peak)}</span>
        </span>
        <span>
          Global <span className="text-text">#{fmt(contest.globalRanking)}</span>
        </span>
      </p>
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return null;

  const w = 300;
  const h = 64;
  const pad = 6;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => [
    (i / (points.length - 1)) * w,
    pad + (1 - (p - min) / range) * (h - pad * 2),
  ]);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = coords[coords.length - 1];

  return (
    <div className="relative mt-3 h-16">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label={`Contest rating went from ${points[0]} to ${points[points.length - 1]}`}
      >
        <defs>
          <linearGradient id="lc-spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffa116" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffa116" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#lc-spark-fill)" className="lc-spark__area" />
        <path
          d={line}
          fill="none"
          stroke="#ffa116"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="lc-spark__line"
        />
      </svg>
      <span
        className="lc-spark__dot"
        style={{ left: `${(lastX / w) * 100}%`, top: `${(lastY / h) * 100}%` }}
        aria-hidden
      />
    </div>
  );
}

function SolvedPanel({ stats }: { stats: LeetCodeStats }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const gap = stats.totalSolved ? 3 : 0;
  let offset = 0;

  return (
    <div className="lc-panel flex items-center gap-5">
      <div className="relative shrink-0">
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          {DIFFICULTIES.map((d) => {
            const share = stats.totalSolved ? stats[d.key].solved / stats.totalSolved : 0;
            const length = Math.max(0, share * circumference - gap);
            const dash = (
              <circle
                key={d.key}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="7"
                strokeDasharray={`${length} ${circumference}`}
                strokeDashoffset={-offset}
                className="lc-ring__arc"
              />
            );
            offset += share * circumference;
            return dash;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight text-text">
            {fmt(stats.totalSolved)}
          </span>
          <span className="text-[0.6875rem] text-text-muted">solved</span>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-2.5">
        {DIFFICULTIES.map((d) => {
          const { solved, total } = stats[d.key];
          return (
            <div key={d.key}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                <span style={{ color: d.color }}>{d.label}</span>
                <span className="text-text-muted">
                  <span className="text-text">{solved}</span>
                  {total ? ` / ${fmt(total)}` : ""}
                </span>
              </div>
              <div className="lc-bar">
                <span
                  style={{
                    width: `${total ? Math.min(100, (solved / total) * 100) : 0}%`,
                    background: d.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M8.5 1.5c.3 2-1 3.2-2 4.3C5.5 6.9 4.5 8 4.5 9.8A3.5 3.5 0 0 0 8 13.5a3.5 3.5 0 0 0 3.5-3.6c0-1.3-.6-2.4-1.2-3.1-.1.9-.6 1.6-1.3 1.9.4-2.3-.2-5-1.5-7.2Z" />
    </svg>
  );
}
