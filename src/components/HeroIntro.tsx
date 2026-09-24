"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { CheckIcon, GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./icons";

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
