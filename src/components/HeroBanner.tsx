"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export default function HeroBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
      setTilt({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={bannerRef} className="asta-banner mx-auto mb-8 max-w-4xl px-4 pt-20">
      <div
        className="asta-banner__frame"
        style={{
          transform: `perspective(900px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <div className="asta-banner__glow" aria-hidden />
        <div className="asta-banner__scan" aria-hidden />

        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="asta-ink-drop"
            style={{
              left: `${12 + i * 14}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2.5 + i * 0.4}s`,
            }}
            aria-hidden
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <span
            key={`s-${i}`}
            className="asta-splash"
            style={{
              top: `${10 + (i % 4) * 22}%`,
              left: `${5 + i * 11}%`,
              animationDelay: `${i * 0.35}s`,
            }}
            aria-hidden
          />
        ))}

        <div className="asta-banner__image-wrap">
          <Image
            src="/asta-banner.png"
            alt="My magic is never giving up"
            width={1200}
            height={400}
            priority
            className="asta-banner__image"
          />
          <div className="asta-banner__glitch" aria-hidden />
        </div>

        <div className="asta-banner__profile">
          <Image
            src={portfolio.githubAvatar}
            alt={portfolio.name}
            width={56}
            height={56}
            className="asta-banner__avatar"
          />
          <div>
            <p className="asta-banner__name">{portfolio.name}</p>
            <p className="asta-banner__title">{portfolio.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
