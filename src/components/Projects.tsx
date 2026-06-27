import { portfolio } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Projects" subtitle="Things I've built" />

        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio.projects.map((project) => (
            <article key={project.name} className="glass-card flex flex-col p-5">
              <h3 className="mb-2 font-medium text-text">{project.name}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent"
                >
                  Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent"
                  >
                    Live
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
