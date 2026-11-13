"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { AsciiAboutBanner } from "@/components/AsciiBanners";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { PERSONAL_INFO, INTERNSHIPS, EDUCATION_LIST, CERTIFICATIONS, ACHIEVEMENTS } from "@/data/portfolioData";
import { User, Briefcase, GraduationCap, Award, MapPin, Mail, ExternalLink, Sparkles, Binary } from "lucide-react";

export default function AboutPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [portraitMode, setPortraitMode] = useState<"ascii" | "clean">("ascii");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-12 sm:px-6">
        {/* Header ASCII */}
        <div className="border-b border-[var(--line)] pb-6 mb-8">
          <AsciiAboutBanner />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
                ABOUT
              </h1>
              <p className="mt-1 font-mono text-sm text-[var(--muted)]">
                The engineer behind the boundaries. Systems, neurotechnology, and production deployments.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent)] font-bold">
              JAIPUR, RAJASTHAN · JECRC CSE
            </span>
          </div>
        </div>

        {/* Profile Card & Portrait Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Left: Portrait Card with ASCII vs Clean toggle */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-[var(--fg)]">PORTRAIT</span>
                {/* Toggle */}
                <div className="flex items-center rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-0.5 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => setPortraitMode("ascii")}
                    className={`px-2 py-0.5 rounded transition ${
                      portraitMode === "ascii"
                        ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    ASCII
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortraitMode("clean")}
                    className={`px-2 py-0.5 rounded transition ${
                      portraitMode === "clean"
                        ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    CLEAN
                  </button>
                </div>
              </div>

              {/* Display Area */}
              {portraitMode === "ascii" ? (
                <div className="rounded-xl bg-neutral-950 p-4 border border-[var(--line)] flex items-center justify-center select-none overflow-hidden">
                  <pre className="font-mono text-[8px] sm:text-[9px] leading-[1.05] text-[var(--accent)] text-center">
{`
       .---.
      /     \\
     | () () |
      \\  -  /
     .-'---'-.
    /         \\
   |  SHIVANG  |
   |   GUPTA   |
   |   9.22    |
    \\         /
     \`-------'
`}
                  </pre>
                </div>
              ) : (
                <div className="rounded-xl bg-[var(--surface-2)] p-8 border border-[var(--line)] flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)] flex items-center justify-center text-2xl font-black text-[var(--accent)]">
                    SG
                  </div>
                  <div className="mt-3 font-mono font-bold text-sm text-[var(--fg)]">Shivang Gupta</div>
                  <div className="font-mono text-xs text-[var(--muted)]">Jaipur, India</div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--line)] font-mono text-xs space-y-1.5 text-[var(--muted)]">
              <div className="flex justify-between">
                <span>Education:</span>
                <strong className="text-[var(--fg)]">JECRC Foundation</strong>
              </div>
              <div className="flex justify-between">
                <span>Current CGPA:</span>
                <strong className="text-[var(--accent)]">9.22 / 10.0</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <strong className="text-emerald-400">Open to Roles</strong>
              </div>
            </div>
          </div>

          {/* Right: Narrative Bio */}
          <div className="md:col-span-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)] font-sans">
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[var(--fg)]">
                The Narrative
              </h2>
              <p>
                I am a final-year Computer Science Engineering student at <strong className="text-[var(--fg)]">JECRC Foundation, Jaipur</strong> with a cumulative CGPA of <strong className="text-[var(--accent)]">9.22</strong>. My engineering work sits at the intersection of production-grade distributed cloud backends, deterministic machine learning models, and clinical biomedical signal processing.
              </p>
              <p>
                During <strong className="text-[var(--fg)]">Smart India Hackathon 2025</strong>, my team was selected as a <strong className="text-[var(--fg)]">Top 10 Finalist</strong> out of over 250+ teams nationwide for developing <em>Aegis</em> — an institutional disaster command center powered by live GDACS satellite feeds and zero-hallucination NDMA emergency response protocols.
              </p>
              <p>
                At <strong className="text-[var(--fg)]">Swaarogym Medical Devices</strong> (incubated at MIIC, MNIT Jaipur), I conducted biomedical EEG signal processing on 36 clinical subjects, extracting Theta/Beta spectral power ratios and Phase Locking Values to classify human cognitive attention with 93% accuracy, directly driving an interactive closed-loop neurofeedback system.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
              <a
                href="/Shivang_Gupta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-[var(--accent)] hover:underline"
              >
                <span>Download Official Résumé</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Work Experience / Internships */}
        <section className="mb-16">
          <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3 mb-6">
            <Briefcase className="h-4 w-4 text-[var(--accent)]" />
            <h2 className="font-mono text-lg font-bold uppercase tracking-tight text-[var(--fg)]">
              Work Experience & Research Internships
            </h2>
          </div>

          <div className="space-y-4">
            {INTERNSHIPS.map((intern, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--line-strong)] transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div>
                    <h3 className="font-mono text-base font-bold text-[var(--fg)]">
                      {intern.role}
                    </h3>
                    <div className="font-mono text-xs text-[var(--muted)]">
                      {intern.company} · {intern.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {intern.badge && (
                      <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--accent)] border border-[var(--line)]">
                        {intern.badge}
                      </span>
                    )}
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {intern.period}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-1.5 text-xs text-[var(--muted)] leading-relaxed">
                  {intern.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-mono">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education, Certifications & Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Education */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3 mb-4">
              <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
              <h2 className="font-mono text-base font-bold uppercase tracking-tight text-[var(--fg)]">
                Education
              </h2>
            </div>

            <div className="space-y-4">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="rounded-xl bg-[var(--paper)] p-3.5 border border-[var(--line)] font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--fg)]">{edu.degree}</span>
                    <span className="font-bold text-[var(--accent)]">{edu.score}</span>
                  </div>
                  <div className="text-[var(--muted)] mt-1">{edu.institution}, {edu.location}</div>
                  <div className="text-[10px] text-[var(--muted)] mt-1">{edu.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Honors */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3 mb-4">
              <Award className="h-4 w-4 text-[var(--accent)]" />
              <h2 className="font-mono text-base font-bold uppercase tracking-tight text-[var(--fg)]">
                Certifications & Honors
              </h2>
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

              <div className="mt-4 pt-3 border-t border-[var(--line)]">
                <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block mb-2 font-bold">
                  Leadership:
                </span>
                <p className="text-xs text-[var(--fg)] leading-relaxed">
                  <strong>Student Head Coordinator</strong> @ Aashayein - The Life Saviours (Organized campus-wide blood donation drives and relief campaigns).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Matrix */}
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
