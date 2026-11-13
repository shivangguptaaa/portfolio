"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MilestoneItem {
  when: string;
  title: string;
  org: string;
  description: string;
  isKey?: boolean;
  linkText?: string;
  linkHref?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    when: "Aug 2023",
    title: "B.Tech in Computer Science",
    org: "JECRC Foundation, Jaipur",
    description: "Started B.Tech CSE. Maintained academic excellence with a current cumulative CGPA of 9.22.",
  },
  {
    when: "Mar 2024",
    title: "3rd Prize — Energy Hackathon",
    org: "MIIC, MNIT Jaipur",
    description: "Secured 3rd prize for predictive energy optimization modeling at Malaviya Innovation Centre.",
  },
  {
    when: "Jun 2025",
    title: "Healthcare AI & EEG Intern",
    org: "Swaarogym Medical Devices (MIIC, MNIT Jaipur)",
    description: "Extracted Welch PSD theta-beta frequency ratios for biomedical signal processing and cognitive monitoring research.",
    isKey: true,
    linkText: "Build notes →",
    linkHref: "/builds/focus-jumper",
  },
  {
    when: "Nov 2025",
    title: "Top 10 Finalist (250+ teams)",
    org: "Smart India Hackathon 2025",
    description: "Engineered Aegis: College Disaster Preparedness Platform with live GDACS feeds and NDMA SOP RAG.",
    isKey: true,
    linkText: "Build notes →",
    linkHref: "/builds/aegis",
  },
  {
    when: "May 2026",
    title: "Data Science CEI Intern",
    org: "Celebal Technologies",
    description: "Completed Celebal Excellence Internship. Engineered enterprise ML preprocessing pipelines and predictive models.",
  },
  {
    when: "Jun 2026",
    title: "ServiceNow CAD & CSA",
    org: "ServiceNow Worldwide",
    description: "Earned Certified Application Developer (CAD) and Certified System Administrator (CSA) credentials.",
  },
  {
    when: "2027",
    title: "Graduating (B.Tech CSE)",
    org: "JECRC Foundation",
    description: "B.Tech in Computer Science and Engineering, Final Year, Department of CSE.",
  },
];

export function MilestonesTimeline() {
  const scrollRef = useRef<HTMLOListElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const temporarilyPause = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3500);
  }, []);

  // Auto-scrolling marquee effect
  useEffect(() => {
    let animId: number;
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      if (!isPaused && !isDragging && el) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, isDragging]);

  // Wheel horizontal scrolling (allows trackpad or mouse wheel to scroll left/right freely)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) || Math.abs(e.deltaX) > 0) {
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        el.scrollLeft += delta;
        temporarilyPause();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [temporarilyPause]);

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLOListElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current.isDown = true;
    dragRef.current.startX = e.pageX - el.offsetLeft;
    dragRef.current.scrollLeft = el.scrollLeft;
    dragRef.current.hasMoved = false;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLOListElement>) => {
    if (!dragRef.current.isDown) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.4;
    if (Math.abs(walk) > 3) {
      dragRef.current.hasMoved = true;
    }
    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false;
      setIsDragging(false);
      temporarilyPause();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLOListElement>) => {
    const el = scrollRef.current;
    if (!el || e.touches.length === 0) return;
    dragRef.current.isDown = true;
    dragRef.current.startX = e.touches[0].pageX - el.offsetLeft;
    dragRef.current.scrollLeft = el.scrollLeft;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLOListElement>) => {
    if (!dragRef.current.isDown || e.touches.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.2;
    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    dragRef.current.isDown = false;
    setIsDragging(false);
    temporarilyPause();
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      temporarilyPause();
    }
  };

  return (
    <section id="path" className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-[var(--line)] pb-4 mb-6">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
            The path so far
          </h2>
          <p className="mt-1 font-sans text-sm sm:text-base text-[var(--muted)]">
            From first Python projects to scalable full-stack web platforms and machine learning systems.
          </p>
        </div>

        {/* Arrow Tools */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll back"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll forward"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Draggable & Auto-scrolling Timeline Rail */}
      <div className="relative">
        <ol
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`path ${isDragging ? "dragging" : ""}`}
          aria-label="Milestones timeline"
        >
          {MILESTONES.map((m, idx) => (
            <li key={idx} className={`stop ${m.isKey ? "key" : ""}`}>
              <p className="when">{m.when}</p>
              <h3>{m.title}</h3>
              <p className="org">{m.org}</p>
              <p className="desc">{m.description}</p>

              {m.linkText && m.linkHref && (
                <div className="mt-3 pt-3 border-t border-[var(--line)]">
                  <Link
                    href={m.linkHref}
                    onClick={(e) => {
                      if (dragRef.current.hasMoved) {
                        e.preventDefault();
                      }
                    }}
                    className="font-mono text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{m.linkText}</span>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
