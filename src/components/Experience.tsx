import { portfolio } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Experience" subtitle="Where I've worked" />

        <div className="space-y-4">
          {portfolio.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="glass-card p-6">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium text-text">{job.role}</h3>
                <span className="text-sm text-text-muted">{job.period}</span>
              </div>
              <p className="mb-3 text-sm text-accent">{job.company}</p>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {job.highlights.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
