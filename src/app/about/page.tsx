"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ExternalLink, Check } from "lucide-react";

export default function AboutPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const workList = [
    {
      code: "CLB",
      role: "Data Science Intern",
      company: "Celebal Technologies · Jaipur, India",
      when: "May 2026 – Jul 2026",
      isCurrent: false,
      badge: "Celebal Excellence Internship",
      points: [
        "Completed the prestigious Celebal Excellence Internship (CEI) in the Data Science domain.",
        "Engineered production-grade exploratory data analysis pipelines and feature engineering workflows on enterprise datasets.",
        "Trained, benchmarked, and evaluated predictive machine learning models in Python for industry workloads.",
      ],
      chips: ["Python", "Pandas", "Scikit-Learn", "EDA", "Enterprise ML"],
    },
    {
      code: "SDI",
      role: "ServiceNow Developer Intern",
      company: "ServiceNow Enterprise Platform · Jaipur, India",
      when: "Feb 2026 – Mar 2026",
      isCurrent: false,
      badge: "CAD & CSA Certified",
      points: [
        "Developed custom scoped applications and automated enterprise IT service management (ITSM) workflows.",
        "Authored Business Rules, Script Includes, Client Scripts, and UI Policies adhering to platform governance standards.",
        "Automated cross-departmental incident and service request pipelines using Flow Designer and Integration Hub.",
      ],
      chips: ["ServiceNow", "JavaScript", "Workflow Automation", "ITSM", "CAD", "CSA"],
    },
    {
      code: "MNIT",
      role: "Summer Research Intern — Biomedical Signal Processing",
      company: "Swaarogym Medical Devices (MIIC, MNIT Jaipur) · Jaipur, India",
      when: "Jun 2025 – Jul 2025",
      isCurrent: false,
      badge: "Biomedical Research",
      points: [
        "Conducted biomedical signal processing research on multi-channel EEG recordings under institute mentorship at MIIC, MNIT Jaipur.",
        "Extracted theta and beta frequency band features using Welch's power spectral density (PSD) estimation.",
        "Applied zero-phase Butterworth bandpass filtering (1–40 Hz) and notch filtering for electrical noise and artifact reduction.",
        "Analyzed Theta/Beta power spectral ratios (TBR) across rest and mental arithmetic task conditions in Python.",
      ],
      chips: ["Biomedical Signals", "EEG Research", "Welch PSD", "SciPy", "Python", "DSP"],
    },
  ];

  const leadershipList = [
    {
      code: "ASH",
      role: "Student Coordinator",
      org: "Aashayein : The Life Saviours · Jaipur, Rajasthan (On-site)",
      when: "Aug 2025 – Apr 2026 · 9 mos",
      isCurrent: true,
      points: [
        "Coordinated arrangements for blood and SDP (Single Donor Platelets) requirements across hospitals in Jaipur during emergency medical situations.",
        "Managed on-call hospital emergency response, donor verification logistics, and volunteer task force allocation.",
      ],
      chips: ["Team Leadership", "Team Coordination", "Emergency Response", "Healthcare Logistics"],
    },
    {
      code: "SIH",
      role: "Top 10 Finalist & Team Lead",
      org: "Smart India Hackathon 2025 (SIH 2025) · National",
      when: "Nov 2025",
      isCurrent: true,
      points: [
        "Led a 6-member engineering team to Top 10 national ranking out of 250+ competing institutions.",
        "Architected Aegis: Disaster Preparedness Platform with disaster awareness modules, quizzes, an AI chatbot, and student progress tracking.",
      ],
      chips: ["Team Lead", "Emergency Drills", "AI Chatbot", "Full Stack"],
    },
    {
      code: "ASH",
      role: "Member",
      org: "Aashayein : The Life Saviours · Jaipur, Rajasthan (On-site)",
      when: "Sep 2023 – Aug 2025 · 2 yrs",
      isCurrent: false,
      points: [
        "Assisted in arranging blood and SDP donors for patients across hospitals in Jaipur during urgent medical requirements.",
        "Contributed to organizing Blood Donation Camps (BDC) and Blood Group Checking Camps (BGC) as part of community outreach and awareness initiatives.",
        "Coordinated with volunteers and donors to support smooth execution of healthcare and social service activities.",
        "Participated actively in awareness drives and volunteer activities focused on encouraging blood donation and community support.",
        "Strengthened teamwork, communication, and coordination skills through active involvement in organizational activities and emergency support operations.",
      ],
      chips: ["Event Management", "Team Coordination", "Donor Logistics", "Community Outreach"],
    },
  ];

  const studiedList = [
    {
      code: "CSE",
      degree: "B.Tech, Computer Science and Engineering",
      org: "JECRC Foundation, Jaipur · Current CGPA 9.16",
      when: "2023 – 2027 (Final Year)",
      isCurrent: true,
    },
    {
      code: "XII",
      degree: "Senior Secondary (Class XII)",
      org: "Maheshwari Public School, Jaipur · CBSE 88.4%",
      when: "2023",
      isCurrent: false,
    },
    {
      code: "X",
      degree: "Secondary Education (Class X)",
      org: "Maheshwari Public School, Jaipur · CBSE 97.0%",
      when: "2021",
      isCurrent: false,
    },
  ];

  const certList = [
    "ServiceNow CAD (Certified Application Developer)",
    "ServiceNow CSA (Certified System Administrator)",
    "Full Stack Web Development",
    "Machine Learning Specialization",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-[1360px] w-full px-4 py-8 sm:px-6">
        {/* 1. Interactive Canvas Glyph Header */}
        <div className="border-b border-[var(--line)] pb-4 mb-10">
          <InteractiveGlyph text="ABOUT" subtext="FULL STACK DEVELOPER & AI ENGINEER · JECRC CSE 9.16 CGPA" />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <p className="font-mono text-xs sm:text-sm text-[var(--muted)]">
              The engineer behind the boundaries. Scalable full-stack systems, machine learning pipelines, and interactive applications.
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
                    className="w-full h-full object-cover object-top grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
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

              {/* Quick Facts List */}
              <dl className="mt-6 space-y-3.5 border-t border-[var(--line)] pt-4 font-mono text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">Based in</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">Jaipur, Rajasthan, India</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">Studying</dt>
                  <dd className="font-semibold text-[var(--fg)] mt-0.5">
                    B.Tech CSE @ JECRC Foundation (<strong className="text-[var(--accent)]">9.16 CGPA</strong>)
                  </dd>
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

          {/* Right Column: Bio + Work + Leadership + Studied (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Short Version Bio */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold block mb-1">
                Background
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg)]">
                Short version
              </h2>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-[var(--muted)] font-sans">
                <p>
                  I’m <strong className="text-[var(--fg)]">Shivang Gupta</strong>, a final-year Computer Science and Engineering student at <strong className="text-[var(--fg)]">JECRC Foundation, Jaipur</strong> (<strong className="text-[var(--accent)]">9.16 CGPA</strong>), with a strong academic foundation and a focus on software development and artificial intelligence. My technical interests span full-stack development, AI/ML, cloud technologies, and data science, with an emphasis on building scalable web platforms and practical solutions to real-world problems.
                </p>
                <p>
                  Beyond academics, I&apos;ve gained hands-on experience through industry internships, research projects, national hackathons (including Top 10 at SIH 2025), and technical certifications. I&apos;ve also been actively involved in student leadership and social initiatives, which have shaped my approach to teamwork, problem-solving, and taking ownership of engineering challenges.
                </p>
              </div>
            </div>

            {/* Where I've Worked (.dtl Diamond Layout) */}
            <section className="about-sec" id="about-work">
              <h2>Where I’ve worked</h2>

              <ol className="dtl">
                {workList.map((item, idx) => (
                  <li key={idx} className={item.isCurrent ? "now" : ""}>
                    {/* 45-degree Diamond Monogram */}
                    <span className="dia" aria-hidden="true">
                      <span>{item.code}</span>
                    </span>

                    <div>
                      <p className="when label">{item.when}</p>
                      <h3>{item.role}</h3>
                      <p className="org">{item.company}</p>
                      <ul>
                        {item.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                      <div className="chips">
                        {item.chips.map((chip) => (
                          <span key={chip}>{chip}</span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Leadership Section (.dtl Diamond Layout) */}
            <section className="about-sec" id="about-lead">
              <h2>Leadership</h2>

              <ol className="dtl">
                {leadershipList.map((item, idx) => (
                  <li key={idx} className={item.isCurrent ? "now" : ""}>
                    <span className="dia" aria-hidden="true">
                      <span>{item.code}</span>
                    </span>
                    <div>
                      <p className="when label">{item.when}</p>
                      <h3>{item.role}</h3>
                      <p className="org">{item.org}</p>
                      <ul>
                        {item.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                      <div className="chips">
                        {item.chips.map((chip) => (
                          <span key={chip}>{chip}</span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Studied Section (.dtl Diamond Layout + Cert Pills) */}
            <section className="about-sec" id="about-study">
              <h2>Studied</h2>

              <ol className="dtl">
                {studiedList.map((item, idx) => (
                  <li key={idx} className={item.isCurrent ? "now" : ""}>
                    <span className="dia" aria-hidden="true">
                      <span>{item.code}</span>
                    </span>
                    <div>
                      <p className="when label">{item.when}</p>
                      <h3>{item.degree}</h3>
                      <p className="org">{item.org}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Inline Certifications Badges */}
              <div className="certs" aria-label="Certificates">
                {certList.map((cert, idx) => (
                  <span key={idx} className="cert">
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span>{cert}</span>
                  </span>
                ))}
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
