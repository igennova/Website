"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { portfolio } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Oct 2025 — Feb 2026" → "5 mos" */
function duration(period: string) {
  const [start, end] = period.split("—").map((p) => p.trim().split(" "));
  if (!start || !end) return "";
  const months =
    (Number(end[1]) - Number(start[1])) * 12 +
    MONTHS.indexOf(end[0]) -
    MONTHS.indexOf(start[0]) +
    1;
  if (!Number.isFinite(months) || months <= 0) return "";
  return months === 1 ? "1 mo" : `${months} mos`;
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>(".timeline__item"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list.style.setProperty("--progress", "1");
      items.forEach((el) => el.classList.add("is-visible", "is-active"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const anchor = vh * 0.55;
      const rect = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      list.style.setProperty("--progress", progress.toFixed(4));

      items.forEach((el) => {
        const node = el.querySelector(".timeline__node")!.getBoundingClientRect();
        if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add("is-visible");
        el.classList.toggle("is-active", node.top + node.height / 2 < anchor);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="experience" className="section-wrap">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Experience" subtitle="Where I've worked and what I shipped" />

        <ol ref={listRef} className="timeline">
          {portfolio.experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="timeline__item">
              <div className="timeline__date">
                <span className="text-text">{job.period.split("—")[0].trim()}</span>
                <span>— {job.period.split("—")[1]?.trim()}</span>
                <span className="timeline__duration">{duration(job.period)}</span>
              </div>

              <div className="timeline__node">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={40}
                  height={40}
                  className="exp-logo rounded-full bg-surface object-cover"
                />
              </div>

              <article className="timeline__card glass-card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div className="min-w-0">
                    <p className="mb-1 text-xs text-text-muted sm:hidden">
                      {job.period} · {duration(job.period)}
                    </p>
                    <h3 className="text-base font-semibold tracking-tight text-text">
                      {job.role}
                    </h3>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-hover mt-0.5 inline-block text-sm text-accent"
                    >
                      {job.company} ↗
                    </a>
                  </div>
                  <div className="exp-metric">
                    <span className="exp-metric__value">{job.metric.value}</span>
                    <span className="exp-metric__label">{job.metric.label}</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.highlights.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
