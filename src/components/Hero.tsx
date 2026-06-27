import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import VisitorLocation from "./VisitorLocation";

export default function Hero() {
  return (
    <section id="hero" className="px-6 pb-10 pt-24">
      <div className="mx-auto w-full max-w-3xl">
        <Image
          src={portfolio.githubAvatar}
          alt={portfolio.name}
          width={64}
          height={64}
          className="avatar-glow animate-fade-up mb-4 rounded-full border border-border"
        />
        <p className="animate-fade-up-d1 mb-1 text-sm shimmer-text">
          {portfolio.title}
        </p>
        <h1 className="animate-fade-up-d2 mb-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {portfolio.name}
        </h1>
        <p className="animate-fade-up-d3 mb-5 max-w-lg text-base leading-relaxed text-text-muted">
          {portfolio.bio}
        </p>
        <div className="animate-fade-up-d4 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">
            View projects
          </a>
          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
          <a
            href={portfolio.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LeetCode
          </a>
        </div>
        <VisitorLocation />
      </div>
    </section>
  );
}
