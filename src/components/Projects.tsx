import { Fragment } from "react";
import Image from "next/image";
import { portfolio, type Project } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

function hostname(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function BrowserFrame({ project, priority }: { project: Project; priority?: boolean }) {
  const address = project.live
    ? hostname(project.live)
    : hostname(project.github);

  return (
    <div className="project-frame">
      <div className="project-frame__bar">
        <span className="project-frame__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="project-frame__url">{address}</span>
      </div>
      <div className="project-frame__viewport">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={1440}
            height={900}
            sizes="(min-width: 768px) 720px, 100vw"
            priority={priority}
            className="project-frame__image"
          />
        ) : (
          <PipelineVisual steps={project.pipeline ?? []} />
        )}
      </div>
    </div>
  );
}

function PipelineVisual({ steps }: { steps: string[] }) {
  return (
    <div className="pipeline">
      <div className="pipeline__meta">
        <span className="pipeline__live" aria-hidden />
        <span>cron: 0 6 * * *</span>
        <span className="pipeline__cost">$0.00 / day</span>
      </div>
      <ol className="pipeline__steps">
        {steps.map((step, i) => (
          <Fragment key={step}>
            {i > 0 && (
              <li className="pipeline__arrow" aria-hidden>
                →
              </li>
            )}
            <li
              className="pipeline__step"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <span className="pipeline__index">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          </Fragment>
        ))}
      </ol>
      <p className="pipeline__log">
        <span className="text-emerald-400">✓</span> short published to YouTube · runs daily
      </p>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link project-link--primary"
        >
          Visit site ↗
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Source code ↗
        </a>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={`glass-card project-card group flex flex-col overflow-hidden ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <a
        href={project.live || project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
        className="block p-3 pb-0"
      >
        <BrowserFrame project={project} priority={featured} />
      </a>

      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:p-6" : ""}`}>
        <div className="mb-1 flex items-center gap-2 text-xs text-text-muted">
          <span className="font-mono">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-4 bg-border" />
          <span>{project.tagline}</span>
        </div>
        <h3
          className={`mb-2 font-semibold tracking-tight text-text ${
            featured ? "text-xl" : "text-lg"
          }`}
        >
          {project.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text">
          {project.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-text-muted" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-wrap">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Projects" subtitle="Things I've built and shipped" />

        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio.projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
