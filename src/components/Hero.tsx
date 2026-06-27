import { portfolio } from "@/data/portfolio";
import HeroBanner from "./HeroBanner";
import VisitorLocation from "./VisitorLocation";

export default function Hero() {
  return (
    <section id="hero" className="pb-10">
      <HeroBanner />

      <div className="mx-auto w-full max-w-3xl px-6">
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
