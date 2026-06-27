"use client";

import { useEffect, useState } from "react";

interface Location {
  city: string;
  region: string | null;
  country: string;
}

export default function VisitorLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("/api/location")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Location | null) => {
        if (data?.city) {
          setLocation(data);
          requestAnimationFrame(() => setVisible(true));
        }
      })
      .catch(() => {});
  }, []);

  if (!location) return null;

  const label = [location.city, location.region, location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`visitor-pill mt-6 transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <span className="visitor-pill__dot" aria-hidden />
      <span className="text-xs text-text-muted">
        You&apos;re viewing from{" "}
        <span className="text-text">{label}</span>
      </span>
    </div>
  );
}
