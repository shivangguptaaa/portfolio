"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function BuiltInLimits() {
  const [mode, setMode] = useState<"does" | "wont">("wont");

  return (
    <section id="limits" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            <Shield className="h-4 w-4" />
            <span>Deterministic Engineering</span>
          </div>
          <h2 className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--fg)]">
            Built-In Limits
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Every production system has a perimeter. Here is what my builds do — and what they strictly refuse to do.
          </p>
        </div>

        {/* The Signature Segmented Toggle */}
        <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1 font-mono text-xs select-none shrink-0">
          <button
            type="button"
            onClick={() => setMode("does")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
              mode === "does"
                ? "bg-[var(--surface-2)] text-[var(--fg)] font-semibold shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>WHAT IT DOES</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("wont")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
              mode === "wont"
                ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>WHAT IT REFUSES TO DO</span>
          </button>
        </div>
      </div>

      {/* Grid of Limits */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => {
          const isWont = mode === "wont";

          return (
            <div
              key={project.id}
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                isWont
                  ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]/20 shadow-md"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {project.index} • {project.domain}
                  </span>
                  <h3 className="mt-1 font-mono text-lg font-bold text-[var(--fg)]">
                    {project.title}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                    isWont
                      ? "bg-[var(--accent)] text-[var(--on-accent)]"
                      : "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--line)]"
                  }`}
                >
                  {isWont ? "Strict Limits" : "Capabilities"}
                </span>
              </div>

              {/* Dynamic Content: Does vs Won't */}
              <div className="mt-5">
                {isWont ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wide">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Hard Architectural Refusals:</span>
                    </div>
                    <ul className="space-y-2 font-mono text-xs text-[var(--fg)]">
                      {project.whatItRefuses.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 rounded-lg bg-[var(--paper)]/70 p-2.5 border border-[var(--line)]">
                          <span className="text-[var(--accent)] font-bold shrink-0">✕</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Grounded Execution Protocols:</span>
                    </div>
                    <ul className="space-y-2 font-mono text-xs text-[var(--muted)]">
                      {project.whatItDoes.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 rounded-lg bg-[var(--paper)]/50 p-2.5 border border-[var(--line)]">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span className="leading-relaxed text-[var(--fg)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Quick Link */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-xs">
                <span className="text-[var(--muted)] text-[11px]">
                  {project.metrics[0].label}: <strong className="text-[var(--fg)]">{project.metrics[0].value}</strong>
                </span>

                <a
                  href={`#${project.id}`}
                  className="flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold"
                >
                  <span>Inspect Build</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
