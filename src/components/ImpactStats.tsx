"use client";

import { useEffect, useRef, useState } from "react";

export interface ImpactStat {
  label: string;
  /** Numeric stats count up; string stats render as-is. */
  value: number | string;
  suffix?: string;
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, run]);

  return <>{value}</>;
}

export default function ImpactStats({ stats }: { stats: ImpactStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`impact-stat ${inView ? "is-in" : ""}`}
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <p className="impact-stat__value">
            {typeof stat.value === "number" ? (
              <CountUp to={stat.value} run={inView} />
            ) : (
              stat.value
            )}
            {stat.suffix && <span className="impact-stat__suffix">{stat.suffix}</span>}
          </p>
          <p className="impact-stat__label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
