export type ExperienceData = {
  role: string;
  company: string;
  url: string;
  logo: string;
  period: string;
  metric: { value: string; label: string };
  points: string[];
  highlights: string[];
};

export type ProjectData = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  live: string;
  /** Screenshot in /public/projects; omit to render a custom visual instead. */
  image?: string;
  /** Rendered as a step-by-step pipeline graphic when there is no screenshot. */
  pipeline?: string[];
  /** Rendered as an animated scatter-gather diagram when there is no screenshot. */
  shards?: { count: number; caption: string };
  /** Small badge next to the tagline, e.g. "In progress". */
  status?: string;
};

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
  /**
   * Contributions GitHub can no longer serve (repo deleted), merged into the
   * open source section by hand.
   */
  archivedContributions: [
    {
      org: "OWASP BLT",
      login: "OWASP-BLT",
      repo: "BLT",
      prCount: 50,
      countLabel: "50+",
      period: "Aug 2025",
      note: "The OWASP-BLT repository was removed from GitHub, so individual PR links are no longer available.",
      highlights: [
        "Real-time video calling with WebRTC at sub-150ms latency",
        "WebSocket leaderboard for 100+ concurrent users",
        "Deployed 5+ security simulation labs",
      ],
    },
  ],
  excludeOrgs: ["igennova", "devwill2", "devsuryansh", "fineanmol", "rahulnegi20"],
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
      url: "https://github.com/antiwork",
      logo: "https://github.com/antiwork.png",
      period: "Oct 2025 — Feb 2026",
      metric: { value: "5m → 4.7s", label: "135M-row CSV export" },
      points: [
        "Optimized a 135M-row CSV export from 5+ minutes down to 4.7s.",
        "Migrated legacy Rails pages to Inertia.js with merged PRs to production.",
        "Refactored legacy SCSS to Tailwind CSS across the app.",
      ],
      highlights: ["Rails", "Inertia.js", "PostgreSQL", "Tailwind"],
    },
    {
      role: "AI Engineer",
      company: "PUCH AI",
      url: "https://puch.ai",
      logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://puch.ai&size=128",
      period: "Jul 2025 — Aug 2025",
      metric: { value: "10k+", label: "users rate-limited" },
      points: [
        "Built a multi-tool LLM agent pipeline with structured tool calling.",
        "Added Redis + Lua rate limiting serving 10k+ users.",
        "Unified image and video generation infrastructure.",
      ],
      highlights: ["LLM Agents", "Redis", "Python"],
    },
    {
      role: "GSoC 2025 Contributor",
      company: "OWASP Foundation",
      url: "https://owasp.org",
      logo: "https://github.com/OWASP.png",
      period: "May 2025 — Aug 2025",
      metric: { value: "<150ms", label: "WebRTC call latency" },
      points: [
        "Built real-time video calling with WebRTC at sub-150ms latency.",
        "Shipped a WebSocket leaderboard for 100+ concurrent users.",
        "Deployed 5+ security simulation labs.",
      ],
      highlights: ["WebRTC", "WebSockets", "Security", "Django"],
    },
    {
      role: "Backend Developer",
      company: "Persist Venture",
      url: "https://persistventures.com",
      logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://persistventures.com&size=128",
      period: "Apr 2025 — Jun 2025",
      metric: { value: "Read replicas", label: "PostgreSQL scaling" },
      points: [
        "Engineered FastAPI backend services and an AI media generation pipeline.",
        "Optimized PostgreSQL with indexing and primary-replica read scaling.",
      ],
      highlights: ["FastAPI", "PostgreSQL", "AI Pipeline"],
    },
  ] as ExperienceData[],
  projects: [
    {
      name: "Distributed Vector Search",
      tagline: "ANN search engine, built from scratch",
      status: "In progress",
      description:
        "A distributed approximate-nearest-neighbor engine exploring the internals of systems like Qdrant and Milvus — HNSW indexing, sharding across gRPC services, and a scatter-gather coordinator, all benchmarked for recall vs latency.",
      features: [
        "HNSW from scratch: 0.93 recall@10, 2.5× faster than exact",
        "gRPC shards + scatter-gather top-K merge",
        "3.5× lower fan-out latency (5.6 → 1.6 ms) after diagnosing GIL contention",
      ],
      tech: ["Python", "gRPC", "Protocol Buffers", "NumPy", "pytest"],
      github: "https://github.com/igennova/Distributed-Vector-Search-Engine",
      live: "",
      shards: { count: 4, caption: "parallel fan-out · p50 1.6 ms" },
    },
    {
      name: "LeetFight",
      tagline: "Competitive coding, as a sport",
      description:
        "A gaming-style coding arena where developers face off in real-time DSA battles. Built with Suryansh Singh to make coding social, competitive, and fun.",
      features: ["Real-time 1v1 battles", "ELO rating", "Leaderboards", "Private friend rooms"],
      tech: ["Next.js", "TypeScript", "WebSockets", "Real-time"],
      github: "",
      live: "https://cp-nextjs-iota.vercel.app/",
      image: "/projects/leetfight.png",
    },
    {
      name: "WeMakeVideos",
      tagline: "Prompt in, finished video out",
      description:
        "AI video generation SaaS — turns a single idea into script, voiceover, scene composition, and a rendered edit.",
      features: ["Script generation", "AI voiceover", "Remotion rendering"],
      tech: ["Next.js", "Remotion", "TypeScript"],
      github: "",
      live: "https://quotesnap-vfaw.vercel.app/",
      image: "/projects/wemakevideos.png",
    },
    {
      name: "ZeroCostShorts",
      tagline: "A YouTube channel on autopilot",
      description:
        "Fully automated faceless Shorts pipeline that writes, voices, illustrates, edits, and uploads a video every day via GitHub Actions — at ~$0/day.",
      features: ["Daily cron via Actions", "~$0/day to run", "Auto YouTube upload"],
      tech: ["Python", "FFmpeg", "GitHub Actions"],
      github: "https://github.com/igennova/ZeroCost-Shorts",
      live: "",
      pipeline: ["LLM", "TTS", "Image gen", "FFmpeg", "YouTube"],
    },
  ] as ProjectData[],
} as const;

export type Experience = ExperienceData;
export type Project = ProjectData;
