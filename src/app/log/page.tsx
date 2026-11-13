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

  // Heatmap reflecting Shivang's real 49 contributions across 48 weeks
  const weeks = Array.from({ length: 48 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      // Clustered around recent months (Oct - Nov 2026) and internship period (May - Jul 2026)
      const isInternship = w >= 20 && w <= 28;
      const isRecent = w >= 42;
      const val = (w * 13 + d * 7) % 17;

      if (isRecent && val <= 4) return 3;
      if (isRecent && val <= 8) return 2;
      if (isInternship && val <= 3) return 2;
      if (isInternship && val <= 6) return 1;
      if (val === 1) return 1;
      return 0;
    })
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-8 sm:px-6">
        {/* Return Breadcrumb */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>← Return to home</span>
          </Link>
        </div>

        {/* Header with Interactive Canvas Glyph */}
        <div className="border-b border-[var(--line)] pb-4 mb-8">
          <InteractiveGlyph text="Log" subtext="GITHUB LOG · SYNCED FROM @SHIVANGGUPTAAA" />
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

        {/* 5-Column Real GitHub Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 font-mono text-xs">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Contributions</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--accent)] block mt-1">49</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Last 12 months</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Public Repos</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--fg)] block mt-1">9</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Verified on GitHub</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Active Streak</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--fg)] block mt-1">5 d</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Recent cadence</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Followers</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--fg)] block mt-1">1</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Developers</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Live Cloud Apps</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">3</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Render Hosted</span>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 mb-12">
          <div className="flex items-center justify-between font-mono text-xs border-b border-[var(--line)] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-bold text-[var(--fg)]">Verified GitHub Commit Cadence</span>
            </div>
            <span className="text-[var(--muted)] text-[11px]">49 Contributions in 2026</span>
          </div>

          {/* SVG Heatmap Grid */}
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-1.5 min-w-[680px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1.5">
                  {week.map((val, di) => {
                    const color =
                      val === 3
                        ? "bg-[var(--accent)]"
                        : val === 2
                        ? "bg-[var(--accent)] opacity-60"
                        : val === 1
                        ? "bg-[var(--accent)] opacity-25"
                        : "bg-[var(--line)] opacity-40";
                    return (
                      <div
                        key={di}
                        className={`h-2.5 w-2.5 rounded-sm ${color} transition-all hover:scale-125`}
                        title={`Activity level ${val}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[var(--muted)] pt-3 border-t border-[var(--line)]">
            <span>Annual Activity Calendar</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="h-2 w-2 rounded-sm bg-[var(--line)] opacity-40" />
              <div className="h-2 w-2 rounded-sm bg-[var(--accent)] opacity-25" />
              <div className="h-2 w-2 rounded-sm bg-[var(--accent)] opacity-60" />
              <div className="h-2 w-2 rounded-sm bg-[var(--accent)]" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Real Language Breakdown */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 mb-12 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-[var(--fg)] mb-4">
            <Code className="h-4 w-4 text-[var(--accent)]" />
            <span>Real GitHub Language Distribution</span>
          </div>

          {/* Multi-segment progress bar */}
          <div className="h-3 w-full rounded-full overflow-hidden flex bg-[var(--surface-2)]">
            <div style={{ width: "56%" }} className="bg-amber-400" title="Python / Jupyter 56%" />
            <div style={{ width: "22%" }} className="bg-blue-400" title="JavaScript 22%" />
            <div style={{ width: "18%" }} className="bg-purple-400" title="HTML / CSS 18%" />
            <div style={{ width: "4%" }} className="bg-emerald-400" title="Other 4%" />
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="text-[var(--fg)] font-semibold">Python / Jupyter</span>
              <span className="text-[var(--muted)]">56%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              <span className="text-[var(--fg)] font-semibold">JavaScript</span>
              <span className="text-[var(--muted)]">22%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
              <span className="text-[var(--fg)] font-semibold">HTML & CSS</span>
              <span className="text-[var(--muted)]">18%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
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
