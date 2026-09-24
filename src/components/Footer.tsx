import Image from "next/image";
import type { ReactNode } from "react";
import { portfolio } from "@/data/portfolio";
import CopyEmailButton from "./CopyEmailButton";
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./icons";

const handle = (url: string) => url.replace(/\/$/, "").split("/").pop() ?? url;

const LINKS: { label: string; handle: string; href: string; icon: ReactNode }[] = [
  {
    label: "GitHub",
    handle: `@${portfolio.githubUsername}`,
    href: portfolio.social.github,
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    handle: handle(portfolio.social.linkedin),
    href: portfolio.social.linkedin,
    icon: <LinkedInIcon />,
  },
  {
    label: "X",
    handle: `@${handle(portfolio.social.twitter)}`,
    href: portfolio.social.twitter,
    icon: <XIcon />,
  },
  {
    label: "LeetCode",
    handle: `@${portfolio.leetcodeUsername}`,
    href: portfolio.social.leetcode,
    icon: (
      <Image
        src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://leetcode.com&size=64"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4"
      />
    ),
  },
  {
    label: "Bounties",
    handle: `@${portfolio.bountyGithub.username}`,
    href: portfolio.bountyGithub.url,
    icon: <span className="text-sm font-semibold text-[#f5c86a]">$</span>,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="contact relative overflow-hidden border-t border-border px-6 pt-16 pb-8">
      <div className="contact__glow" aria-hidden />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <p className="hero-status mb-5">
            <span className="visitor-pill__dot" aria-hidden />
            Open to opportunities
          </p>
          <h2 className="contact__title">
            Let&apos;s build something
            <br />
            <span className="shimmer-text">together.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
            Roles, collaborations, or an open-source bounty you want shipped. My inbox is open.
          </p>
        </div>

        <div className="contact__email glass-card mx-auto mt-8 max-w-xl p-2 sm:pl-5">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <span className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2 sm:px-0">
              <span className="text-text-muted">
                <MailIcon />
              </span>
              <span className="truncate font-mono text-sm text-text sm:text-base">
                {portfolio.email}
              </span>
            </span>
            <div className="flex gap-2">
              <CopyEmailButton email={portfolio.email} />
              <a href={`mailto:${portfolio.email}`} className="btn-primary contact-send flex-1 sm:flex-none">
                Send email
                <span className="contact-send__arrow" aria-hidden>
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {LINKS.map((link) => (
            <li key={link.label} className="last:col-span-2 sm:last:col-span-1">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link__icon">{link.icon}</span>
                <span className="min-w-0">
                  <span className="block text-sm text-text">{link.label}</span>
                  <span className="block truncate text-[0.6875rem] text-text-muted">
                    {link.handle}
                  </span>
                </span>
                <span className="contact-link__arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {portfolio.name} · Built with Next.js &amp; Tailwind
          </p>
          <a href="#hero" className="link-hover">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
