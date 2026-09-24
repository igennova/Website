"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";

const ROLES = ["real-time systems", "LLM agent pipelines", "scalable backends"];

/** Types each role out, holds, deletes, then moves to the next. */
function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    let word = 0;
    let chars = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (deleting) {
        chars--;
        if (chars === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
      } else {
        chars++;
      }
      setText(words[word].slice(0, chars));

      const done = !deleting && chars === words[word].length;
      if (done) deleting = true;
      timer = setTimeout(step, done ? 1800 : deleting ? 30 : 60);
    };

    timer = setTimeout(step, 2200);
    return () => clearTimeout(timer);
  }, [words]);

  return { text, reduced };
}

export default function HeroIntro() {
  const { text, reduced } = useTypewriter(ROLES);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${portfolio.email}`;
    }
  };

  return (
    <>
      <p className="animate-fade-up-d2 hero-status mb-5">
        <span className="visitor-pill__dot" aria-hidden />
        Open to opportunities
      </p>

      <div className="animate-fade-up-d3 mb-7 max-w-xl">
        <p className="text-lg leading-relaxed text-text-muted sm:text-xl">
          <span className="hero-mark">GSoC &apos;25</span> contributor at{" "}
          <span className="text-text">OWASP</span>.
        </p>
        <p className="text-lg leading-relaxed text-text-muted sm:text-xl">
          I build{" "}
          {reduced ? (
            <span className="text-text">{ROLES.join(", ")}</span>
          ) : (
            <>
              <span className="sr-only">{ROLES.join(", ")}</span>
              <span className="hero-typed" aria-hidden>
                {text}
              </span>
            </>
          )}
        </p>
        <p className="mt-2 text-sm text-text-muted sm:text-base">
          <span className="hero-gold">{portfolio.bountyGithub.earned}</span> earned in
          open-source bounties.
        </p>
      </div>

      <div className="animate-fade-up-d4 flex flex-wrap items-center gap-2.5">
        <a href="#projects" className="btn-primary hero-cta">
          View projects
          <span className="hero-cta__arrow" aria-hidden>
            ↓
          </span>
        </a>
        <a
          href={portfolio.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary hero-btn"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href={portfolio.social.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary hero-btn"
        >
          <Image
            src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://leetcode.com&size=64"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
          LeetCode
        </a>

        <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden />

        <a
          href={portfolio.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-icon-btn"
          aria-label="LinkedIn"
          data-tip="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href={portfolio.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-icon-btn"
          aria-label="X (Twitter)"
          data-tip="X"
        >
          <XIcon />
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className={`hero-icon-btn ${copied ? "is-copied" : ""}`}
          aria-label={copied ? "Email copied" : `Copy email ${portfolio.email}`}
          data-tip={copied ? "Copied!" : "Copy email"}
        >
          {copied ? <CheckIcon /> : <MailIcon />}
        </button>
      </div>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M0 1.15C0 .52.52 0 1.18 0h13.64C15.48 0 16 .52 16 1.15v13.7c0 .63-.52 1.15-1.18 1.15H1.18C.52 16 0 15.48 0 14.85V1.15Zm4.94 12.24V6.17H2.54v7.22h2.4ZM3.74 5.18c.84 0 1.36-.55 1.36-1.25-.01-.71-.52-1.25-1.34-1.25-.82 0-1.36.54-1.36 1.25 0 .7.52 1.25 1.33 1.25h.01Zm4.91 8.21V9.36c0-.22.02-.43.08-.59.17-.43.57-.88 1.23-.88.87 0 1.21.66 1.21 1.64v3.86h2.4V9.25c0-2.22-1.18-3.25-2.76-3.25-1.27 0-1.84.7-2.16 1.19v.02h-.02l.02-.02V6.17h-2.4c.03.68 0 7.22 0 7.22h2.4Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
      <path d="M12.6.75h2.45L9.7 6.87 16 15.25h-4.94l-3.87-5.06-4.42 5.06H.32L6.05 8.7 0 .75h5.06l3.5 4.63L12.6.75Zm-.86 13.03h1.36L4.32 2.15H2.86l8.88 11.63Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4" aria-hidden>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="m2 4 6 4.5L14 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden>
      <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
