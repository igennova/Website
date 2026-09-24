"use client";

import { useMemo, useState } from "react";
import type { OrgContributions, PullRequest } from "@/lib/github";

const PAGE_SIZE = 6;

type Row = PullRequest & { orgAvatar: string };

/** Archived rows carry month-only dates; unparsable dates sort last. */
function time(date: string) {
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? 0 : t;
}

const COLUMNS = 4;

/**
 * Size tiles by contribution count (top org 2×2, busy orgs 2×1), then widen
 * the largest remaining 1×1 tiles so the grid ends on a full row.
 */
function tileSizes(orgs: OrgContributions[]) {
  const sizes = orgs.map((org, i) =>
    i === 0 && org.prCount >= 10 ? "xl" : org.prCount >= 5 ? "wide" : "",
  );
  const cells = sizes.reduce((n, s) => n + (s === "xl" ? 4 : s === "wide" ? 2 : 1), 0);
  let gap = (COLUMNS - (cells % COLUMNS)) % COLUMNS;
  for (let i = 0; i < sizes.length && gap > 0; i++) {
    if (sizes[i] === "") {
      sizes[i] = "wide";
      gap--;
    }
  }
  return sizes.map((s) => (s ? `org-tile--${s}` : ""));
}

export default function OrgWall({ orgs }: { orgs: OrgContributions[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const max = orgs[0]?.prCount ?? 1;
  const sizes = useMemo(() => tileSizes(orgs), [orgs]);

  const rows = useMemo<Row[]>(() => {
    const source = selected ? orgs.filter((o) => o.org === selected) : orgs;
    return source
      .flatMap((o) =>
        o.pullRequests.map((pr) => ({ ...pr, orgAvatar: o.avatarUrl })),
      )
      .sort((a, b) => time(b.date) - time(a.date));
  }, [orgs, selected]);
  const selectedOrg = orgs.find((o) => o.org === selected);
  const countLabel = (o: OrgContributions) => o.archived?.countLabel ?? String(o.prCount);

  const visible = expanded ? rows : rows.slice(0, PAGE_SIZE);

  const select = (org: string | null) => {
    setSelected((current) => (current === org ? null : org));
    setExpanded(false);
  };

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium text-text">Organizations I&apos;ve shipped to</h3>
        <span className="text-xs text-text-muted">Tap a logo to filter</span>
      </div>

      <div className={`org-wall ${selected ? "has-selection" : ""}`}>
        {orgs.map((org, i) => {
          const active = selected === org.org;
          return (
            <button
              key={org.org}
              type="button"
              onClick={() => select(org.org)}
              aria-pressed={active}
              className={`org-tile ${sizes[i]} ${active ? "is-active" : ""}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={org.avatarUrl} alt="" className="org-tile__logo" />
              {org.archived && <span className="org-tile__badge">Archived · GSoC</span>}
              <span className="org-tile__body">
                <span className="org-tile__name">{org.org}</span>
                <span className="org-tile__count">
                  {countLabel(org)} {org.archived ? "merged PRs" : `contribution${org.prCount !== 1 ? "s" : ""}`}
                </span>
                {sizes[i] === "org-tile--xl" && (
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {[...new Set(org.pullRequests.map((pr) => pr.repoName))]
                      .slice(0, 4)
                      .map((repo) => (
                        <span key={repo} className="tag">
                          {repo}
                        </span>
                      ))}
                  </span>
                )}
              </span>
              <span className="org-tile__bar" aria-hidden>
                <span style={{ width: `${(org.prCount / max) * 100}%` }} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border bg-black/30">
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <p className="text-xs text-text-muted">
            {selected ? (
              <>
                <span className="text-text">{selected}</span> ·{" "}
                {selectedOrg?.archived
                  ? `${selectedOrg.archived.countLabel} merged PRs · highlights`
                  : `${rows.length} contribution${rows.length !== 1 ? "s" : ""}`}
              </>
            ) : (
              <>
                Latest across all orgs · <span className="text-text">{rows.length}</span> total
              </>
            )}
          </p>
          {selected && (
            <button
              type="button"
              onClick={() => select(null)}
              className="link-hover text-xs text-text-muted"
            >
              Show all ✕
            </button>
          )}
        </div>

        {selectedOrg?.archived && (
          <p className="border-b border-border bg-white/[0.02] px-4 py-2.5 text-xs text-text-muted">
            {selectedOrg.archived.note}
          </p>
        )}

        <div key={selected ?? "all"} className="p-1.5">
          {visible.map((pr, i) => {
            const body = (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pr.orgAvatar}
                  alt=""
                  width={20}
                  height={20}
                  className="mt-0.5 shrink-0 rounded"
                />
                <span className="min-w-0 flex-1">
                  <span className="mb-0.5 flex flex-wrap items-center gap-2">
                    {pr.kind === "commit" ? (
                      <CommitBadge />
                    ) : pr.kind === "archived" ? (
                      <ArchivedBadge />
                    ) : (
                      <MergedBadge />
                    )}
                    <span className="text-xs text-text-muted">
                      {pr.owner}/{pr.repoName}
                    </span>
                  </span>
                  <span className="block text-sm text-text">{pr.title}</span>
                </span>
                <span className="shrink-0 pt-0.5 text-xs text-text-muted">{pr.date}</span>
              </>
            );
            const className = "pr-row pr-row--in flex items-start gap-3 rounded-md px-3 py-2.5";
            const style = { animationDelay: `${Math.min(i, PAGE_SIZE) * 40}ms` };

            return pr.url ? (
              <a
                key={pr.url}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={style}
              >
                {body}
              </a>
            ) : (
              <div key={`${pr.owner}-${pr.title}`} className={className} style={style}>
                {body}
              </div>
            );
          })}
        </div>

        {rows.length > PAGE_SIZE && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="w-full border-t border-border py-2.5 text-xs text-text-muted transition-colors hover:bg-white/[0.03] hover:text-text"
          >
            {expanded ? "Show less" : `Show all ${rows.length}`}
          </button>
        )}
      </div>
    </div>
  );
}

function MergedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-purple-500/15 px-1.5 py-0.5 text-xs font-medium text-purple-300">
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-3 w-3"
      >
        <path d="M2 6l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Merged
    </span>
  );
}

function CommitBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-sky-500/15 px-1.5 py-0.5 text-xs font-medium text-sky-300">
      Commit
    </span>
  );
}

function ArchivedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-xs font-medium text-amber-300">
      GSoC &apos;25
    </span>
  );
}
