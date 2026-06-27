import { portfolio } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border px-6 py-10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-2 text-lg font-medium text-text">Get in touch</h2>
        <p className="mb-6 text-sm text-text-muted">
          Open to opportunities and collaborations.
        </p>

        <a
          href={`mailto:${portfolio.email}`}
          className="link-hover mb-8 inline-block text-accent"
        >
          {portfolio.email}
        </a>

        <div className="flex items-center justify-center gap-6 text-sm">
          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-text-muted"
          >
            GitHub
          </a>
          <a
            href={portfolio.bountyGithub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-text-muted"
          >
            Bounties
          </a>
          <a
            href={portfolio.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-text-muted"
          >
            LinkedIn
          </a>
          <a
            href={portfolio.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-text-muted"
          >
            LeetCode
          </a>
          <a
            href={portfolio.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-text-muted"
          >
            Twitter
          </a>
        </div>

        <p className="mt-10 text-xs text-text-muted">
          © {new Date().getFullYear()} {portfolio.name}
        </p>
      </div>
    </footer>
  );
}
