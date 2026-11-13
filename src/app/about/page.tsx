"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { PERSONAL_INFO, INTERNSHIPS, EDUCATION_LIST, CERTIFICATIONS, ACHIEVEMENTS } from "@/data/portfolioData";
import { Briefcase, GraduationCap, Award, MapPin, Mail, ExternalLink, Sparkles, Terminal } from "lucide-react";

export default function AboutPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [portraitMode, setPortraitMode] = useState<"ascii" | "photo">("ascii");

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

        {/* 1. Header with Interactive Canvas Glyph */}
        <div className="border-b border-[var(--line)] pb-4 mb-10">
          <InteractiveGlyph text="ABOUT" subtext="FULL STACK DEVELOPER & AI ENGINEER · JECRC CSE 9.22 CGPA" />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <p className="font-mono text-xs sm:text-sm text-[var(--muted)]">
              The engineer behind the boundaries. Systems, neurotechnology, and production deployments.
            </p>
            <span className="font-mono text-xs text-[var(--accent)] font-bold">
              JAIPUR, RAJASTHAN · INDIA
            </span>
          </div>
        </div>

        {/* 2. Main Two-Column About Grid (minmax(0, 360px) minmax(0, 1fr)) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left Column: Portrait Card & Quick Facts (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <aside className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 shadow-xl">
              {/* Photo Box with ASCII / Clean Toggle */}
              <div className="relative">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-3 font-mono text-[11px]">
                  <span className="text-[var(--muted)] uppercase font-bold tracking-wider">PORTRAIT</span>
                  <button
                    type="button"
                    onClick={() => setPortraitMode(portraitMode === "ascii" ? "photo" : "ascii")}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] px-2.5 py-0.5 text-[10px] text-[var(--fg)] hover:border-[var(--accent)] transition"
                  >
                    <span>{portraitMode === "ascii" ? "Show photo" : "Show ASCII"}</span>
                  </button>
                </div>

                {portraitMode === "ascii" ? (
                  <div className="rounded-xl bg-neutral-950 p-4 border border-[var(--line)] flex items-center justify-center select-none overflow-hidden">
                    <pre className="font-mono text-[8px] sm:text-[9.5px] leading-[1.08] text-[var(--accent)] text-center">
{`
       .---.
      /     \\
     | () () |
      \\  -  /
     .-'---'-.
    /         \\
   |  SHIVANG  |
   |   GUPTA   |
   |  9.22 GPA |
    \\         /
     \`-------'
`}
                    </pre>
                  </div>
                ) : (
                  <div className="rounded-xl bg-[var(--surface-2)] p-8 border border-[var(--line)] flex flex-col items-center justify-center text-center">
                    <div className="h-20 w-20 rounded-full bg-[var(--accent-soft)] border-2 border-[var(--accent)] flex items-center justify-center text-2xl font-black text-[var(--accent)] font-mono">
                      SG
                    </div>
                    <div className="mt-3 font-display font-black text-base uppercase text-[var(--fg)]">Shivang Gupta</div>
                    <div className="font-mono text-xs text-[var(--muted)]">Jaipur, India</div>
                  </div>
                )}
              </div>

              {/* Quick Facts List (<dl class="qf">) */}
              <dl className="mt-5 space-y-3 border-t border-[var(--line)] pt-4 font-mono text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Based in</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">Jaipur, Rajasthan, India</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Studying</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">B.Tech CSE @ JECRC Foundation (<strong className="text-[var(--accent)]">9.22 CGPA</strong>)</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Building</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">Aegis Disaster Platform & NeuralFocus BCI</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Email</dt>
                  <dd className="font-semibold text-[var(--accent)] mt-0.5 truncate">{PERSONAL_INFO.email}</dd>
                </div>
              </dl>

              {/* Download Resume Button */}
              <div className="mt-5 pt-4 border-t border-[var(--line)]">
                <a
                  href="/Shivang_Gupta_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--accent)] py-2.5 font-mono text-xs font-bold text-[var(--on-accent)] shadow transition hover:opacity-90"
                >
                  <span>Download Résumé (PDF)</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>
          </div>

          {/* Right Column: The Short Version + Where I've Worked (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Short Version Bio */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold block mb-1">
                Background
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--fg)]">
                The Short Version
              </h2>
              <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-[var(--muted)] font-sans">
                <p>
                  I am a computer science engineering undergraduate at <strong className="text-[var(--fg)]">JECRC Foundation</strong> with a cumulative CGPA of <strong className="text-[var(--accent)]">9.22</strong>. My focus is engineering production-grade software and AI systems that operate with verifiable, deterministic boundaries.
                </p>
                <p>
                  In 2025, our team was selected as a <strong className="text-[var(--fg)]">Top 10 Finalist</strong> (out of 250+ teams nationwide) at <strong className="text-[var(--fg)]">Smart India Hackathon (SIH 2025)</strong> for architecting <em>Aegis</em> — an autonomous campus emergency command system with live satellite hazard detection and official NDMA RAG safety protocols.
                </p>
                <p>
                  At <strong className="text-[var(--fg)]">Swaarogym Medical Devices</strong> (incubated at MIIC, MNIT Jaipur), I built biomedical brainwave signal processing algorithms for 36 clinical subjects, computing real-time Theta/Beta spectral ratios and Phase Locking Values to classify attention arousal with 93% accuracy.
                </p>
              </div>
            </div>

            {/* Where I've Worked (Code-styled Experience Timeline) */}
            <section>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[var(--accent)]" />
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-[var(--fg)]">
                    Where I’ve Worked
                  </h3>
                </div>
                <span className="font-mono text-xs text-[var(--muted)]">3 Internships</span>
              </div>

              <div className="space-y-8">
                {INTERNSHIPS.map((intern, idx) => (
                  <article
                    key={idx}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--line-strong)] transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-3">
                      <div>
                        <h4 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--fg)]">
                          {intern.role}
                        </h4>
                        <p className="font-mono text-xs text-[var(--accent)] font-bold mt-1">
                          {intern.company} · {intern.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        {intern.badge && (
                          <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--fg)] border border-[var(--line)]">
                            {intern.badge}
                          </span>
                        )}
                        <span className="text-[var(--muted)]">{intern.period}</span>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                      {intern.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)] font-mono text-sm leading-none mt-1">›</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* Education & Certifications */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3 mb-4">
                  <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
                  <h4 className="font-display text-lg font-black uppercase tracking-tight text-[var(--fg)]">
                    Education
                  </h4>
                </div>

                <div className="space-y-4">
                  {EDUCATION_LIST.map((edu, idx) => (
                    <div key={idx} className="rounded-xl bg-[var(--paper)] p-3 border border-[var(--line)] font-mono text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[var(--fg)]">{edu.degree}</span>
                        <span className="text-[var(--accent)]">{edu.score}</span>
                      </div>
                      <div className="text-[var(--muted)] mt-1">{edu.institution}</div>
                      <div className="text-[10px] text-[var(--muted)] mt-0.5">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3 mb-4">
                  <Award className="h-4 w-4 text-[var(--accent)]" />
                  <h4 className="font-display text-lg font-black uppercase tracking-tight text-[var(--fg)]">
                    Certifications
                  </h4>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-[var(--paper)] p-3 border border-[var(--line)]">
                      <div>
                        <div className="font-bold text-[var(--fg)]">{cert.name}</div>
                        <div className="text-[10px] text-[var(--muted)]">{cert.issuer}</div>
                      </div>
                      <span className="text-[10px] text-[var(--accent)] font-semibold">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* 3. Dot-Matrix Tech Stack Table */}
        <SkillsMatrix />
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
