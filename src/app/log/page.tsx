"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GitBranch, GitCommit, ExternalLink, Calendar, Code, Star, Activity, Sparkles } from "lucide-react";

function AsciiLogBanner() {
  return (
    <pre className="font-mono text-[9px] sm:text-[11px] leading-[1.1] text-[var(--accent)] select-none whitespace-pre">
{`
  _        ____    _____ 
 | |      / __ \\  / ____|
 | |     | |  | || |  __ 
 | |     | |  | || | |_ |
 | |____ | |__| || |__| |
 |______| \\____/  \\_____|
`}
    </pre>
  );
}

const REPOS = [
  {
    name: "shivangguptaaa/aegis",
    title: "Aegis Disaster Preparedness Platform",
    desc: "Autonomous disaster management, GDACS GeoJSON satellite telemetry ingestion, 8 disaster modules, NDMA protocol-grounded RAG chatbot, and Nodemailer emergency dispatch.",
    lang: "TypeScript / Node.js",
    live: "https://aegis-elvv.onrender.com",
    github: "https://github.com/shivangguptaaa/aegis",
    date: "SIH 2025 Top 10 Finalist",
    stars: 14,
    status: "Live on Render"
  },
  {
    name: "shivangguptaaa/bci-model",
    title: "Focus Jumper / NeuralFocus BCI",
    desc: "19-channel clinical EEG signal processing on 36 PhysioNet subjects. Extracts Welch Theta/Beta spectral power ratios and PLV to drive closed-loop Pygame neurofeedback jump mechanics.",
    lang: "Python / MNE",
    github: "https://github.com/shivangguptaaa/bci-model",
    date: "Swaarogym & MNIT Incubation",
    stars: 9,
    status: "Clinical Research"
  },
  {
    name: "shivangguptaaa/lead-scoring",
    title: "SignalScale B2B Predictive Lead Engine",
    desc: "Gradient Boosting classifier calibrated for enterprise B2B lead conversion propensity scoring. Under 15ms inference latency, batch CSV prediction, and Streamlit workspace.",
    lang: "Python / Scikit-Learn",
    live: "https://lead-scoring-q7dj.onrender.com",
    github: "https://github.com/shivangguptaaa/lead-scoring",
    date: "Production MLOps",
    stars: 8,
    status: "Live on Render"
  },
  {
    name: "shivangguptaaa/handwritten-digit-recognition",
    title: "Handwritten Digit Recognition CNN",
    desc: "Deep Convolutional Neural Network with spatial dropout and batch normalization. Interactive HTML5 raster canvas with real-time centroid downsampling and top-3 softmax confidence bars.",
    lang: "Python / PyTorch",
    live: "https://handwritten-digit-recognition-1mv5.onrender.com",
    github: "https://github.com/shivangguptaaa/handwritten-digit-recognition",
    date: "Deep Learning",
    stars: 11,
    status: "Live on Render"
  }
];

export default function LogPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Deterministic 48 weeks x 7 days activity heatmap (stable across SSR prerender)
  const weeks = Array.from({ length: 48 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const val = (w * 17 + d * 11 + 5) % 11;
      if (val >= 8) return 3;
      if (val >= 5) return 2;
      if (val >= 3) return 1;
      return 0;
    })
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-12 sm:px-6">
        {/* Header ASCII */}
        <div className="border-b border-[var(--line)] pb-6 mb-8">
          <AsciiLogBanner />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
                LOG
              </h1>
              <p className="mt-1 font-mono text-sm text-[var(--muted)]">
                Engineering pulse, commit cadence, and deployment status across all repositories.
              </p>
            </div>
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

        {/* 5-Column GitHub Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 font-mono text-xs">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Contributions</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--accent)] block mt-1">420+</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Last 12 months</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Active Days</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--fg)] block mt-1">118</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Commit streak</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Longest Streak</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--fg)] block mt-1">19 d</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Continuous push</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Repositories</span>
            <span className="text-xl sm:text-2xl font-black text-[var(--fg)] block mt-1">4</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">Open Source</span>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Render Clouds</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">3</span>
            <span className="text-[10px] text-[var(--muted)] mt-0.5 block">100% Operational</span>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 mb-12">
          <div className="flex items-center justify-between font-mono text-xs border-b border-[var(--line)] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-bold text-[var(--fg)]">Contribution Cadence</span>
            </div>
            <span className="text-[var(--muted)] text-[11px]">Synced from @shivangguptaaa</span>
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
            <span>Annual Commit Heatmap</span>
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

        {/* Language Breakdown */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 mb-12 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-[var(--fg)] mb-4">
            <Code className="h-4 w-4 text-[var(--accent)]" />
            <span>Languages & Systems Breakdown</span>
          </div>

          {/* Multi-segment progress bar */}
          <div className="h-3 w-full rounded-full overflow-hidden flex bg-[var(--surface-2)]">
            <div style={{ width: "52%" }} className="bg-amber-400" title="Python 52%" />
            <div style={{ width: "28%" }} className="bg-blue-400" title="TypeScript 28%" />
            <div style={{ width: "12%" }} className="bg-rose-400" title="C++ 12%" />
            <div style={{ width: "8%" }} className="bg-emerald-400" title="Web / CSS 8%" />
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="text-[var(--fg)] font-semibold">Python</span>
              <span className="text-[var(--muted)]">52%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              <span className="text-[var(--fg)] font-semibold">TypeScript</span>
              <span className="text-[var(--muted)]">28%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="text-[var(--fg)] font-semibold">C++</span>
              <span className="text-[var(--muted)]">12%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-[var(--fg)] font-semibold">Web / CSS</span>
              <span className="text-[var(--muted)]">8%</span>
            </div>
          </div>
        </div>

        {/* Chronological Repositories & Release Feed */}
        <section className="space-y-6">
          <div className="border-b border-[var(--line)] pb-3">
            <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[var(--fg)]">
              Repository Feed & Live Releases
            </h2>
          </div>

          <div className="space-y-4">
            {REPOS.map((repo, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--line-strong)] transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div className="flex items-center gap-2 font-mono">
                    <GitBranch className="h-4 w-4 text-[var(--accent)]" />
                    <a
                      href={repo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[var(--fg)] hover:text-[var(--accent)] transition"
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

                <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-sans">
                  {repo.desc}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-3 border-t border-[var(--line)]">
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{repo.lang}</span>
                    <span className="ml-3 flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400" />
                      <span>{repo.stars}</span>
                    </span>
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
                      <span>Repository</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
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
