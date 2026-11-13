"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Milestone, Calendar, MapPin, Award } from "lucide-react";

interface MilestoneItem {
  year: string;
  month?: string;
  title: string;
  org: string;
  tag: string;
  description: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "2021",
    title: "Secondary School (CBSE X)",
    org: "Maheshwari Public School, Jaipur",
    tag: "97.0%",
    description: "Graduated with 97% aggregate score with distinction in Mathematics and Science."
  },
  {
    year: "2023",
    title: "Senior Secondary (CBSE XII)",
    org: "Maheshwari Public School, Jaipur",
    tag: "88.4%",
    description: "Completed senior secondary schooling focusing on Physics, Chemistry, and Mathematics."
  },
  {
    year: "2023",
    month: "Aug",
    title: "B.Tech in Computer Science",
    org: "JECRC Foundation, Jaipur",
    tag: "CGPA 9.22",
    description: "Enrolled in CSE program. Maintained academic excellence with a current cumulative CGPA of 9.22."
  },
  {
    year: "2024",
    month: "Mar",
    title: "3rd Prize — Energy Hackathon",
    org: "MIIC, MNIT Jaipur",
    tag: "Hackathon",
    description: "Secured 3rd prize for predictive energy optimization modeling at Malaviya Innovation Centre."
  },
  {
    year: "2025",
    month: "Jun",
    title: "Healthcare AI Summer Intern",
    org: "MNIT Jaipur",
    tag: "Research",
    description: "Conducted clinical machine learning research, biomarker feature extraction, and medical classification."
  },
  {
    year: "2025",
    month: "Jun",
    title: "EEG & BCI ML Engineer",
    org: "Swaarogym Medical Devices",
    tag: "Neurotech",
    description: "Engineered 19-channel EEG DSP pipeline and trained Random Forest model achieving 93% accuracy."
  },
  {
    year: "2025",
    month: "Nov",
    title: "Top 10 Finalist (250+ teams)",
    org: "Smart India Hackathon 2025",
    tag: "SIH Finalist",
    description: "Engineered Aegis: College Disaster Preparedness Platform with live GDACS feeds and NDMA RAG."
  },
  {
    year: "2026",
    month: "May",
    title: "Data Science CEI Intern",
    org: "Celebal Technologies",
    tag: "Data Science",
    description: "Selected for Celebal Excellence Internship. Building enterprise ML preprocessing pipelines."
  },
  {
    year: "2026",
    month: "Jun",
    title: "ServiceNow CAD & CSA",
    org: "ServiceNow Worldwide",
    tag: "Certified",
    description: "Earned Certified Application Developer (CAD) and Certified System Administrator (CSA) credentials."
  }
];

export function MilestonesTimeline() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="path" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Header with Navigation Controls */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            <Milestone className="h-4 w-4" />
            <span>Chronology</span>
          </div>
          <h2 className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--fg)]">
            The Path So Far
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Key milestones, research internships, hackathon honors, and certifications
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)] transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)] transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Rail */}
      <div
        ref={scrollRef}
        className="mt-8 flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {MILESTONES.map((item, idx) => (
          <div
            key={idx}
            className="w-72 shrink-0 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col justify-between hover:border-[var(--line-strong)] transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">
                  {item.month ? `${item.month} ${item.year}` : item.year}
                </span>
                <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--muted)] border border-[var(--line)]">
                  {item.tag}
                </span>
              </div>

              <h4 className="mt-3 font-mono text-sm font-bold text-[var(--fg)] leading-snug">
                {item.title}
              </h4>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {item.org}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--line)] font-mono text-[10px] text-[var(--muted)] flex items-center justify-between">
              <span>Step {idx + 1} of {MILESTONES.length}</span>
              <span>Jaipur, India</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
