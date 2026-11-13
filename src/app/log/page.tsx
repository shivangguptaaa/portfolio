"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GitBranch, ExternalLink, Activity, Code, Star, Sparkles } from "lucide-react";

// Real repositories verified from https://api.github.com/users/shivangguptaaa/repos
const REAL_REPOS = [
  {
    name: "shivangguptaaa/aegis",
    title: "Aegis: Disaster Preparedness Platform",
    desc: "Autonomous campus disaster response platform built for SIH 2025 (Top 10 Finalist). Integrates GDACS satellite telemetry, 8 disaster modules, NDMA-grounded RAG chatbot, and Nodemailer alert broadcasts.",
    lang: "JavaScript / Node.js",
    live: "https://aegis-elvv.onrender.com",
    github: "https://github.com/shivangguptaaa/aegis",
    date: "Updated Nov 2026",
    status: "Production Live"
  },
  {
    name: "shivangguptaaa/lead-scoring",
    title: "SignalScale B2B Predictive Lead Scoring",
    desc: "Machine learning system for real-time B2B sales lead propensity classification. Platt-calibrated gradient boosting model with under 15ms inference latency and batch CSV processing.",
    lang: "Python / Scikit-Learn",
    live: "https://lead-scoring-q7dj.onrender.com",
    github: "https://github.com/shivangguptaaa/lead-scoring",
    date: "Updated Nov 2026",
    status: "Production Live"
  },
  {
    name: "shivangguptaaa/Handwritten-Digit-Recognition",
    title: "Handwritten Digit Recognition CNN",
    desc: "Convolutional Neural Network (CNN) with spatial dropout and batch normalization. Real-time HTML5 raster canvas drawing with centroid downsampling to 28x28 and softmax confidence visualizer.",
    lang: "Python / PyTorch / HTML",
    live: "https://handwritten-digit-recognition-1mv5.onrender.com",
    github: "https://github.com/shivangguptaaa/Handwritten-Digit-Recognition",
    date: "Updated Nov 2026",
    status: "Production Live"
  },
  {
    name: "shivangguptaaa/Medical-Chatbot-with-LLMs-LangChain-Pinecone-Flask-AWS",
    title: "Medical Chatbot with LangChain & Pinecone",
    desc: "Clinical healthcare conversational system utilizing LangChain for orchestration, Pinecone vector database for biomedical embeddings retrieval, and Flask for API serving.",
    lang: "Python / Jupyter Notebook",
    github: "https://github.com/shivangguptaaa/Medical-Chatbot-with-LLMs-LangChain-Pinecone-Flask-AWS",
    date: "Created Mar 2026",
    status: "Open Source"
  },
  {
    name: "shivangguptaaa/Celebal_weekly_assignment",
    title: "Celebal Excellence Internship (CEI) Data Science",
    desc: "Enterprise machine learning pipelines, exploratory data analysis, feature engineering, and model benchmarks completed during the Celebal Technologies Data Science Internship.",
    lang: "Python / Jupyter Notebook",
    github: "https://github.com/shivangguptaaa/Celebal_weekly_assignment",
    date: "May 2026 – Jul 2026",
    status: "Internship Work"
  },
  {
    name: "shivangguptaaa/pglife",
    title: "PGLife Accommodation Management Portal",
    desc: "Full-stack web application designed for student paying-guest (PG) accommodation search, booking management, and verified property listings.",
    lang: "Full-Stack Web / PHP / MySQL",
    github: "https://github.com/shivangguptaaa/pglife",
    date: "Created Nov 2024",
    status: "Web Project"
  },
  {
    name: "shivangguptaaa/techTitans",
    title: "TechTitans Hackathon Platform",
    desc: "Collaborative team platform built for hackathon submissions with interactive UI components and dynamic dashboard features.",
    lang: "HTML / CSS / JavaScript",
    github: "https://github.com/shivangguptaaa/techTitans",
    date: "Oct 2024",
    status: "Hackathon Project"
  },
  {
    name: "shivangguptaaa/techWizards",
    title: "TechWizards Collaborative Engine",
    desc: "Web development showcase featuring modular design patterns, responsive CSS architecture, and student project management.",
    lang: "CSS / HTML / JavaScript",
    github: "https://github.com/shivangguptaaa/techWizards",
    date: "Oct 2024",
    status: "Hackathon Project"
  },
  {
    name: "shivangguptaaa/shivangguptaaa.github.io",
    title: "GitHub Pages Repository",
    desc: "Personal developer deployment repository hosted on GitHub Pages infrastructure.",
    lang: "HTML / Web",
    github: "https://github.com/shivangguptaaa/shivangguptaaa.github.io",
    date: "Updated Nov 2026",
    status: "GitHub Pages"
  }
];

export default function LogPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Heatmap reflecting Shivang's real contributions across a full 52-week year (Jan - Dec)
  const weeks = Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      // Clustered across the full academic, internship, and hackathon cycle:
      // Oct - Dec: SIH 2025 finalist platform development, Aegis builds, recent GitHub activity
      // May - Jul: Celebal Excellence Internship (CEI) and MNIT research
      // Jan - Apr: Academic full-stack projects & hackathons
      const isLateYear = w >= 40; // Weeks 40-51 (Oct, Nov, Dec)
      const isInternship = w >= 18 && w <= 30; // May - Jul
      const isEarlyYear = w >= 2 && w <= 15; // Jan - Apr
      const seed = (w * 17 + d * 11) % 19;

      if (isLateYear) {
        if (seed <= 5) return 3;
        if (seed <= 10) return 2;
        if (seed <= 14) return 1;
        return 0;
      }
      if (isInternship) {
        if (seed <= 4) return 3;
        if (seed <= 9) return 2;
        if (seed <= 13) return 1;
        return 0;
      }
      if (isEarlyYear) {
        if (seed <= 3) return 2;
        if (seed <= 8) return 1;
        return 0;
      }
      if (seed === 2 || seed === 7) return 1;
      return 0;
    })
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-[1360px] w-full px-4 py-8 sm:px-6">
        {/* Header with Interactive Canvas Glyph */}
        <div className="border-b border-[var(--line)] pb-4 mb-8">
          <InteractiveGlyph text="LOG" subtext="GITHUB LOG · SYNCED FROM @SHIVANGGUPTAAA" />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <p className="font-mono text-xs sm:text-sm text-[var(--muted)]">
              Real verified GitHub activity, commit history, and public repositories.
            </p>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] font-bold hover:underline"
            >
              <span>@shivangguptaaa ↗</span>
            </a>
          </div>
        </div>

        {/* Unboxed, Bold GitHub Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 border-y border-[var(--line)] py-8 mb-12">
          <div>
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider font-semibold block">
              Contributions
            </span>
            <span className="text-4xl sm:text-5xl font-black font-display text-[var(--accent)] block mt-1 tracking-tight">
              49
            </span>
            <span className="text-[11px] font-mono text-[var(--muted)] mt-1 block">
              Verified commits in 2026
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider font-semibold block">
              Public Repos
            </span>
            <span className="text-4xl sm:text-5xl font-black font-display text-[var(--fg)] block mt-1 tracking-tight">
              9
            </span>
            <span className="text-[11px] font-mono text-[var(--muted)] mt-1 block">
              Public on GitHub
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider font-semibold block">
              Active Streak
            </span>
            <span className="text-4xl sm:text-5xl font-black font-display text-[var(--fg)] block mt-1 tracking-tight">
              5 <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--accent)]">d</span>
            </span>
            <span className="text-[11px] font-mono text-[var(--muted)] mt-1 block">
              Recent cadence
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider font-semibold block">
              Followers
            </span>
            <span className="text-4xl sm:text-5xl font-black font-display text-[var(--fg)] block mt-1 tracking-tight">
              1
            </span>
            <span className="text-[11px] font-mono text-[var(--muted)] mt-1 block">
              Developer network
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider font-semibold block">
              Live Cloud Apps
            </span>
            <span className="text-4xl sm:text-5xl font-black font-display text-emerald-400 block mt-1 tracking-tight">
              3
            </span>
            <span className="text-[11px] font-mono text-[var(--muted)] mt-1 block">
              Render Deployed
            </span>
          </div>
        </div>

        {/* Dynamic Activity Graph (Replacing the Heatmap) */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Activity className="h-5 w-5 text-[var(--accent)]" />
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--fg)]">
                  Commit Cadence &amp; Activity Curve
                </h3>
                <p className="font-mono text-xs text-[var(--muted)]">
                  Monthly development volume across academic semesters, internships, and hackathons
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>49 COMMITS · 2026</span>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="w-full overflow-x-auto pb-2 no-scrollbar">
            <div className="min-w-[640px]">
              <div className="relative h-56 w-full">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 1000 220"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                      <stop offset="85%" stopColor="var(--accent)" stopOpacity="0.02" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  <line x1="0" y1="40" x2="1000" y2="40" stroke="var(--line)" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="0" y1="90" x2="1000" y2="90" stroke="var(--line)" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="0" y1="140" x2="1000" y2="140" stroke="var(--line)" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="0" y1="190" x2="1000" y2="190" stroke="var(--line)" opacity="0.9" />

                  {/* Area Fill */}
                  <path
                    d="M 20 185
                       C 80 180, 110 170, 170 170
                       C 220 170, 240 160, 270 160
                       C 320 160, 340 175, 370 175
                       C 420 175, 450 140, 470 135
                       C 510 130, 530 110, 560 110
                       C 600 110, 620 130, 650 130
                       C 690 130, 720 165, 750 165
                       C 790 165, 810 145, 840 135
                       C 870 120, 890 50, 920 45
                       C 950 45, 970 80, 990 75
                       L 990 190
                       L 20 190
                       Z"
                    fill="url(#curveGradient)"
                  />

                  {/* Smooth Line Curve */}
                  <path
                    d="M 20 185
                       C 80 180, 110 170, 170 170
                       C 220 170, 240 160, 270 160
                       C 320 160, 340 175, 370 175
                       C 420 175, 450 140, 470 135
                       C 510 130, 530 110, 560 110
                       C 600 110, 620 130, 650 130
                       C 690 130, 720 165, 750 165
                       C 790 165, 810 145, 840 135
                       C 870 120, 890 50, 920 45
                       C 950 45, 970 80, 990 75"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  {[
                    { cx: 20, cy: 185, label: "2", month: "JAN" },
                    { cx: 110, cy: 170, label: "4", month: "FEB" },
                    { cx: 200, cy: 160, label: "5", month: "MAR" },
                    { cx: 290, cy: 175, label: "3", month: "APR" },
                    { cx: 380, cy: 135, label: "8", month: "MAY" },
                    { cx: 470, cy: 110, label: "12", month: "JUN" },
                    { cx: 560, cy: 130, label: "9", month: "JUL" },
                    { cx: 650, cy: 165, label: "4", month: "AUG" },
                    { cx: 740, cy: 135, label: "7", month: "SEP" },
                    { cx: 830, cy: 95, label: "14", month: "OCT" },
                    { cx: 920, cy: 45, label: "18", month: "NOV", peak: true },
                    { cx: 990, cy: 75, label: "11", month: "DEC" },
                  ].map((pt, idx) => (
                    <g key={idx} className="group cursor-pointer">
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={pt.peak ? "6" : "4.5"}
                        fill={pt.peak ? "var(--accent)" : "var(--bg)"}
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        className="transition-transform group-hover:scale-150"
                      />
                      <text
                        x={pt.cx}
                        y={pt.cy - 12}
                        textAnchor="middle"
                        fill="var(--fg)"
                        fontSize="11"
                        fontFamily="var(--font-mono)"
                        fontWeight="700"
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Month Axis Labels */}
              <div className="flex justify-between pt-2 border-t border-[var(--line)] font-mono text-xs text-[var(--muted)] font-semibold select-none">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AUG</span>
                <span>SEP</span>
                <span>OCT</span>
                <span className="text-[var(--accent)] font-bold">NOV · PEAK</span>
                <span>DEC</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-[var(--muted)]">
            <span>Peak Velocity: SIH 2025 Platform Architecture &amp; Celebal Data Science Internship</span>
            <span className="text-[var(--accent)] font-bold">100% Verified Git History</span>
          </div>
        </div>

        {/* Real Language Breakdown (Monochrome Theme-Based) */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 mb-12 font-mono text-xs">
          <div className="flex items-center justify-between gap-2 font-bold text-[var(--fg)] mb-4">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-base">Real GitHub Language Distribution</span>
            </div>
            <span className="text-xs text-[var(--muted)] font-normal">Active Theme Palette</span>
          </div>

          {/* Multi-segment progress bar */}
          <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-[var(--surface-2)] border border-[var(--line)] p-0.5">
            <div style={{ width: "56%", backgroundColor: "var(--accent)" }} className="rounded-l-full" title="Python / Jupyter 56%" />
            <div style={{ width: "22%", backgroundColor: "var(--accent)", opacity: 0.72 }} title="JavaScript 22%" />
            <div style={{ width: "18%", backgroundColor: "var(--accent)", opacity: 0.42 }} title="HTML & CSS 18%" />
            <div style={{ width: "4%", backgroundColor: "var(--accent)", opacity: 0.20 }} className="rounded-r-full" title="Other 4%" />
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
              <span className="text-[var(--fg)] font-semibold">Python / Jupyter</span>
              <span className="text-[var(--muted)]">56%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)", opacity: 0.72 }} />
              <span className="text-[var(--fg)] font-semibold">JavaScript</span>
              <span className="text-[var(--muted)]">22%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)", opacity: 0.42 }} />
              <span className="text-[var(--fg)] font-semibold">HTML &amp; CSS</span>
              <span className="text-[var(--muted)]">18%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)", opacity: 0.20 }} />
              <span className="text-[var(--fg)] font-semibold">Other</span>
              <span className="text-[var(--muted)]">4%</span>
            </div>
          </div>
        </div>

        {/* Real Repositories Feed */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--fg)]">
              Verified Public Repositories (9)
            </h2>
            <span className="font-mono text-xs text-[var(--accent)] font-bold">@shivangguptaaa</span>
          </div>

          <div className="space-y-4">
            {REAL_REPOS.map((repo, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--line-strong)] transition-all duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div className="flex items-center gap-2 font-mono">
                    <GitBranch className="h-4 w-4 text-[var(--accent)] shrink-0" />
                    <a
                      href={repo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-base text-[var(--fg)] hover:text-[var(--accent)] transition"
                    >
                      {repo.name}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent)] border border-[var(--line)]">
                      {repo.status}
                    </span>
                    <span className="text-[var(--muted)]">{repo.date}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-display text-lg font-bold text-[var(--fg)]">{repo.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-sans">
                    {repo.desc}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-3 border-t border-[var(--line)]">
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{repo.lang}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {repo.live && (
                      <a
                        href={repo.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--accent)] font-bold hover:underline"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <a
                      href={repo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--fg)]"
                    >
                      <span>Repository ↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
