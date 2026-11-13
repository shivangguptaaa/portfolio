"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { ExternalLink, GitBranch, Shield, Zap, Sparkles, CheckCircle2, AlertOctagon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isWarmingUp, setIsWarmingUp] = useState(false);

  // Silent warmup ping for Render free-tier cold starts
  const handleMouseEnter = () => {
    if (project.liveUrl && !isWarmingUp) {
      setIsWarmingUp(true);
      try {
        fetch(project.liveUrl, { method: "HEAD", mode: "no-cors" }).catch(() => {});
      } catch (_) {}
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      className="group relative flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-xl"
    >
      <div>
        {/* Top Badges & Category */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            {project.domain}
          </span>
          <span className="rounded-full bg-[var(--badge-bg)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--badge-text)] border border-[var(--line)]">
            {project.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-3">
          <h3 className="font-mono text-xl md:text-2xl font-bold tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[var(--muted)]">
            {project.subtitle}
          </p>
        </div>

        {/* Main Description */}
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>

        {/* Key Features Checklist */}
        <div className="mt-5 space-y-2 border-t border-[var(--line)] pt-4">
          <span className="block font-mono text-xs uppercase tracking-wider text-[var(--fg)] font-semibold">
            Core Capabilities:
          </span>
          <ul className="space-y-1.5 text-xs text-[var(--muted)]">
            {(project.whatItDoes || project.keyFeatures || []).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Limits & Refusals (Vansh Arora "AI that knows its limits" philosophy) */}
        {(project.whatItRefuses || project.refusals || []).length > 0 && (
          <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3.5">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--fg)] uppercase tracking-wide">
              <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Architectural Boundaries:</span>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              {(project.whatItRefuses || project.refusals || []).map((ref, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-mono text-xs">•</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Live Metrics Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-2.5 font-mono text-xs">
              <span className="text-[var(--muted)] block text-[10px]">{metric.label}</span>
              <span className="font-bold text-[var(--fg)] text-xs truncate block mt-0.5">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-4 font-mono text-xs font-semibold">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-[var(--on-accent)] shadow transition-all hover:opacity-90 active:scale-95"
          >
            <span>LAUNCH LIVE APP</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2 text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <GitBranch className="h-3.5 w-3.5" />
          <span>VIEW SOURCE</span>
        </a>
      </div>
    </article>
  );
}
