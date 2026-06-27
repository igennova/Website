"use client";

import { useState } from "react";
import type { OrgContributions } from "@/lib/github";

export default function OrgContributionsList({
  orgs,
}: {
  orgs: OrgContributions[];
}) {
  const [openOrg, setOpenOrg] = useState<string | null>(orgs[0]?.org ?? null);

  return (
    <div className="mt-8">
      <h3 className="mb-3 text-sm font-medium text-text">
        Open source contributions
      </h3>
      <div className="space-y-2">
        {orgs.map((org) => {
          const isOpen = openOrg === org.org;

          return (
            <div
              key={org.org}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              <button
                type="button"
                onClick={() => setOpenOrg(isOpen ? null : org.org)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={org.avatarUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="flex-1 text-sm font-medium text-text">
                  {org.org}
                </span>
                <span className="text-xs text-text-muted">
                  {org.prCount} merged
                </span>
                <Chevron open={isOpen} />
              </button>

              {isOpen && (
                <div className="border-t border-border px-2 pb-2 pt-1">
                  {org.pullRequests.map((pr) => (
                    <a
                      key={pr.url}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-md px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <MergedBadge />
                        <span className="text-xs text-text-muted">
                          {pr.date}
                        </span>
                        <span className="text-xs text-text-muted">
                          · {pr.repoName}
                        </span>
                      </div>
                      <p className="text-sm text-text">{pr.title}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MergedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-purple-500/15 px-1.5 py-0.5 text-xs font-medium text-purple-400">
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-3 w-3"
      >
        <path
          d="M2 6l2.5 2.5L10 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Merged
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
