import { portfolio } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[85vh] flex-col justify-center px-6 pt-16"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-3 text-sm text-accent">{portfolio.title}</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {portfolio.name}
        </h1>
        <p className="mb-8 max-w-lg text-base leading-relaxed text-text-muted">
          {portfolio.bio}
        </p>
        <div className="flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
}
