import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export default function BountyCard() {
  const bounty = portfolio.bountyGithub;

  return (
    <a
      href={bounty.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bounty-card group mb-4 block"
      aria-label={`${bounty.earned} earned in open-source bounties — view @${bounty.username} on GitHub`}
    >
      <span className="bounty-card__sheen" aria-hidden />
      <span className="bounty-card__glow" aria-hidden />

      <div className="relative flex flex-wrap items-center gap-x-5 gap-y-4 p-5">
        <div className="bounty-card__trophy" aria-hidden>
          <TrophyIcon />
        </div>

        <div className="min-w-0 flex-1">
          <p className="bounty-card__eyebrow">Open-source bounties</p>
          <p className="flex items-baseline gap-2">
            <span className="bounty-card__amount">{bounty.earned}</span>
            <span className="text-sm text-text-muted">earned</span>
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Paid for merged work on Gumroad &amp; Antiwork repos
          </p>
        </div>

        <div className="bounty-card__account">
          <Image
            src={`https://github.com/${bounty.username}.png`}
            alt=""
            width={28}
            height={28}
            className="rounded-full border border-border"
          />
          <span className="min-w-0">
            <span className="block text-[0.6875rem] leading-tight text-text-muted">
              Bounty account
            </span>
            <span className="block text-sm leading-tight text-text">
              @{bounty.username}
            </span>
          </span>
          <span className="bounty-card__arrow" aria-hidden>
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path
        d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 5h2.5a.5.5 0 0 1 .5.5V7a3 3 0 0 1-3 3M7 5H4.5a.5.5 0 0 0-.5.5V7a3 3 0 0 0 3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
