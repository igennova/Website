"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      for (const link of [...links].reverse()) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(link.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "glass-nav" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-sm font-medium text-text">
          {portfolio.name.split(" ")[0]}
        </a>

        <ul className="hidden items-center gap-6 sm:flex">
          {links.slice(1).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link text-sm ${
                  active === link.href ? "active" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
