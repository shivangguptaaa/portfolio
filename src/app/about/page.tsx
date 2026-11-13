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
import { Briefcase, GraduationCap, Award, MapPin, Mail, ExternalLink, User } from "lucide-react";

export default function AboutPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const workTimeline = [
    {
      code: "CLB",
      role: "Data Science Intern",
      company: "Celebal Technologies · Jaipur, India",
      when: "May 2026 – Jul 2026",
      isCurrent: true,
      badge: "Celebal Excellence Internship",
      points: [
        "Selected for the prestigious Celebal Excellence Internship (CEI) in the Data Science domain.",
        "Engineered production-grade exploratory data analysis pipelines and feature engineering workflows on enterprise datasets.",
        "Trained, benchmarked, and evaluated predictive machine learning models in Python for industry workloads."
      ],
      chips: ["Python", "Pandas", "Scikit-Learn", "EDA", "Enterprise ML"]
    },
    {
      code: "MNIT",
      role: "Summer Research Intern — AI & ML in Healthcare",
      company: "MNIT Jaipur (Malaviya National Institute of Technology) · Jaipur, India",
      when: "Jun 2025 – Jul 2025",
      isCurrent: false,
      badge: "Academic Research",
      points: [
        "Implemented medical machine learning pipelines on clinical datasets using Python and Scikit-learn under institute faculty mentorship.",
        "Conducted clinical biomarker feature extraction, patient cohort clustering, and ROC-AUC classification calibration."
      ],
      chips: ["Healthcare AI", "Biomarker DSP", "Scikit-Learn", "Python"]
    },
    {
      code: "SWA",
      role: "EEG Research & Machine Learning Engineer",
      company: "Swaarogym Medical Devices (MIIC, MNIT Jaipur) · Jaipur, India",
      when: "Jun 2025 – Jul 2025",
      isCurrent: false,
      badge: "Medical Incubation",
      points: [
        "Engineered biomedical EEG cognitive attention regulation system on 36 clinical subjects recorded at 500 Hz across 19 scalp channels.",
        "Computed Welch's Power Spectral Density across Theta (4-8 Hz) and Beta (13-30 Hz) bands, deriving real-time Theta/Beta Ratio (TBR) and Phase Locking Value (PLV) connectivity.",
        "Achieved 93% accuracy with Random Forest classifier, driving real-time closed-loop Pygame neurofeedback jump mechanics."
      ],
      chips: ["MNE-Python", "Welch PSD", "SciPy DSP", "Phase Locking (PLV)", "Random Forest", "Pygame"]
    }
  ];

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

        {/* 1. Massive Interactive Canvas Glyph Header */}
        <div className="border-b border-[var(--line)] pb-4 mb-10">
          <InteractiveGlyph text="About" subtext="FULL STACK DEVELOPER & AI ENGINEER · JECRC CSE 9.22 CGPA" />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <p className="font-mono text-xs sm:text-sm text-[var(--muted)]">
              The engineer behind the boundaries. Full-stack architectures, neurotech DSP, and production systems.
            </p>
            <span className="font-mono text-xs text-[var(--accent)] font-bold">
              JAIPUR, RAJASTHAN · INDIA
            </span>
          </div>
        </div>

        {/* 2. Main Two-Column About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left Column: Profile Card & Real Photo Box (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <aside className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-6 shadow-xl">
              {/* Photo Box */}
              <div className="relative aspect-[4/5] w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] overflow-hidden flex flex-col items-center justify-center">
                {!imgError ? (
                  <img
                    src="/images/shivang.jpg"
                    alt="Shivang Gupta"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-24 w-24 rounded-full bg-[var(--accent-soft)] border-2 border-[var(--accent)] flex items-center justify-center font-display font-black text-3xl text-[var(--accent)]">
                      SG
                    </div>
                    <span className="font-display text-lg font-black uppercase text-[var(--fg)] mt-3">
                      Shivang Gupta
                    </span>
                    <span className="font-mono text-xs text-[var(--muted)] mt-0.5">
                      Full Stack Developer & AI Engineer
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Facts List (<dl class="qf">) */}
              <dl className="mt-6 space-y-3.5 border-t border-[var(--line)] pt-4 font-mono text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">Based in</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">Jaipur, Rajasthan, India</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">Studying</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">B.Tech CSE @ JECRC Foundation (<strong className="text-[var(--accent)]">9.22 CGPA</strong>)</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">Building</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">Aegis Disaster Platform & NeuralFocus BCI</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">Fastest reply</dt>
                  <dd className="font-semibold text-[var(--accent)] mt-0.5 truncate">{PERSONAL_INFO.email}</dd>
                </div>
              </dl>

              {/* Download Resume Button */}
              <div className="mt-6 pt-4 border-t border-[var(--line)]">
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

          {/* Right Column: Bio + "Where I've worked" Timeline Chart (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Short Version Bio */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold block mb-1">
                Background
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--fg)]">
                The Short Version
              </h2>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-[var(--muted)] font-sans">
                <p>
                  I am a final-year Computer Science Engineering undergraduate at <strong className="text-[var(--fg)]">JECRC Foundation, Jaipur</strong> maintaining a cumulative CGPA of <strong className="text-[var(--accent)]">9.22</strong>. I engineer scalable full-stack web applications, deterministic machine learning models, and biomedical brain-computer interface systems.
                </p>
                <p>
                  At <strong className="text-[var(--fg)]">Smart India Hackathon (SIH 2025)</strong>, my team was selected as a <strong className="text-[var(--fg)]">Top 10 Finalist</strong> out of 250+ teams nationwide for developing <em>Aegis</em> — an institutional disaster command platform powered by live GDACS satellite telemetry and protocol-grounded NDMA emergency response RAG workflows.
                </p>
                <p>
                  At <strong className="text-[var(--fg)]">Swaarogym Medical Devices</strong> (incubated at MIIC, MNIT Jaipur), I conducted biomedical EEG signal processing across 36 clinical subjects, computing real-time Theta/Beta spectral power ratios and Phase Locking Values to classify attention states with 93% accuracy, directly driving an interactive closed-loop neurofeedback game.
                </p>
              </div>
            </div>

            {/* Where I've Worked (Exact Vansh Arora .dtl Timeline Chart) */}
            <section>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-8">
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--fg)]">
                  Where I’ve Worked
                </h3>
                <span className="font-mono text-xs text-[var(--muted)]">3 Internships</span>
              </div>

              {/* Detailed Timeline List (.dtl) with Vertical Connection Track */}
              <div className="relative border-l-2 border-[var(--line-strong)] ml-4 pl-6 sm:pl-8 space-y-10">
                {workTimeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Monogram Badge (.dia) on the timeline track */}
                    <span className="absolute -left-[37px] sm:-left-[45px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--line-strong)] bg-[var(--surface)] font-mono text-[10px] font-bold text-[var(--accent)] shadow-md group-hover:border-[var(--accent)] transition-colors">
                      {item.code}
                    </span>

                    {/* Timeline Item Content */}
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--line-strong)] transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--line)] pb-3">
                        <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                          {item.when}
                        </p>
                        <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--accent)] border border-[var(--line)] w-fit">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--fg)] mt-3">
                        {item.role}
                      </h4>
                      <p className="font-mono text-xs text-[var(--muted)] font-medium mt-1">
                        {item.company}
                      </p>

                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                        {item.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-[var(--accent)] font-mono text-sm leading-none mt-1">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Chips / Tech Stack */}
                      <div className="mt-5 pt-3 border-t border-[var(--line)] flex flex-wrap gap-1.5">
                        {item.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
