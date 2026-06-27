export const portfolio = {
  name: "Your Name",
  title: "Full Stack Developer",
  bio: "I build clean, reliable web applications. Focused on simple solutions that work well.",
  githubUsername: "igennova",
  excludeOrgs: ["igennova", "devsuryansh"],
  email: "your.email@example.com",
  social: {
    github: "https://github.com/igennova",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourhandle",
  },
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Company Name",
      period: "2023 — Present",
      description:
        "Lead full-stack development across product features, code reviews, and team mentoring.",
      highlights: ["React", "Next.js", "System Design"],
    },
    {
      role: "Software Developer",
      company: "Previous Company",
      period: "2021 — 2023",
      description:
        "Built and maintained APIs and front-end features for customer-facing products.",
      highlights: ["Node.js", "PostgreSQL", "AWS"],
    },
    {
      role: "Junior Developer",
      company: "First Company",
      period: "2019 — 2021",
      description:
        "Learned fundamentals, contributed to bug fixes, and shipped small features.",
      highlights: ["JavaScript", "Git", "REST APIs"],
    },
  ],
  projects: [
    {
      name: "Project One",
      description: "A web app that solves a specific problem with a clean interface.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      github: "https://github.com/igennova/project-one",
      live: "",
    },
    {
      name: "Project Two",
      description: "Dashboard for tracking metrics with real-time updates.",
      tech: ["React", "Node.js", "PostgreSQL"],
      github: "https://github.com/igennova/project-two",
      live: "https://example.com",
    },
    {
      name: "Project Three",
      description: "Open-source tool used by developers for everyday tasks.",
      tech: ["Python", "FastAPI", "Docker"],
      github: "https://github.com/igennova/project-three",
      live: "",
    },
    {
      name: "Project Four",
      description: "Mobile-friendly landing page with fast load times.",
      tech: ["Next.js", "Vercel", "CSS"],
      github: "https://github.com/igennova/project-four",
      live: "",
    },
  ],
} as const;

export type Experience = (typeof portfolio.experience)[number];
export type Project = (typeof portfolio.projects)[number];
