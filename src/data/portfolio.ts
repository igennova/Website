export const portfolio = {
  name: "Lalit Negi",
  title: "Full Stack & AI Engineer",
  bio: "GSoC '25 contributor at OWASP. I build real-time systems, LLM agent pipelines, and scalable backends — with $20k+ earned in open-source bounties.",
  email: "luckynegi1025@gmail.com",
  leetcodeUsername: "igennova",
  githubUsername: "igennova",
  githubAvatar:
    "https://avatars.githubusercontent.com/u/91773416?v=4",
  githubAccounts: ["igennova", "devwill2"],
  excludeOrgs: ["igennova", "devwill2", "devsuryansh","fineanmol"],
  bountyGithub: {
    username: "devwill2",
    url: "https://github.com/Devwill2",
    earned: "$20k+",
    description: "Open-source bounties via Gumroad / Antiwork",
  },
  social: {
    github: "https://github.com/igennova",
    linkedin: "https://www.linkedin.com/in/lalitnegi001/",
    twitter: "https://twitter.com/_luckynot",
    leetcode: "https://leetcode.com/igennova",
  },
  experience: [
    {
      role: "Open Source Contributor",
      company: "Gumroad / Antiwork",
      period: "Oct 2025 — Feb 2026",
      description:
        "Merged PRs migrating Rails pages to Inertia.js, optimizing a 135M-row CSV export from 5+ minutes to 4.7s, and refactoring legacy SCSS to Tailwind CSS.",
      highlights: ["Rails", "Inertia.js", "PostgreSQL", "Tailwind"],
    },
    {
      role: "AI Engineer",
      company: "PUCH AI",
      period: "Jul 2025 — Aug 2025",
      description:
        "Built a multi-tool LLM agent pipeline with structured tool calling. Added Redis + Lua rate limiting for 10k+ users and unified image/video generation infrastructure.",
      highlights: ["LLM Agents", "Redis", "Python"],
    },
    {
      role: "GSoC 2025 Contributor",
      company: "OWASP Foundation",
      period: "May 2025 — Aug 2025",
      description:
        "Built real-time video calling with WebRTC (sub-150ms latency), a WebSocket leaderboard for 100+ concurrent users, and deployed 5+ security simulation labs.",
      highlights: ["WebRTC", "WebSockets", "Security", "Django"],
    },
    {
      role: "Backend Developer",
      company: "Persist Venture",
      period: "Apr 2025 — Jun 2025",
      description:
        "Engineered FastAPI backend services and an AI media generation pipeline. Optimized PostgreSQL with indexing and primary-replica read scaling.",
      highlights: ["FastAPI", "PostgreSQL", "AI Pipeline"],
    },
  ],
  projects: [
    {
      name: "LeetFight",
      description:
        "A gaming-style competitive coding arena — real-time DSA battles, ELO rating, leaderboards, and private friend rooms. Built with Suryansh Singh to make coding social, competitive, and fun.",
      tech: ["Next.js", "TypeScript", "WebSockets", "Real-time"],
      github: "",
      live: "https://cp-nextjs-iota.vercel.app/",
    },
    {
      name: "WeMakeVideos",
      description:
        "AI video generation SaaS — prompt to script, voiceover, scene composition, and rendered output using Next.js, TypeScript, and Remotion.",
      tech: ["Next.js", "Remotion", "TypeScript"],
      github: "",
      live: "https://quotesnap-alpha.vercel.app/",
    },
    {
      name: "ZeroCostShorts",
      description:
        "Fully automated AI video pipeline (LLM → TTS → image gen → FFmpeg → YouTube upload) running daily via GitHub Actions at ~$0/day.",
      tech: ["Python", "FFmpeg", "GitHub Actions"],
      github: "https://github.com/igennova/youtube_bot",
      live: "",
    },
  ],
} as const;

export type Experience = (typeof portfolio.experience)[number];
export type Project = (typeof portfolio.projects)[number];
