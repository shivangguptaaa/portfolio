"use client";

import React from "react";
import { SKILL_CATEGORIES, TECH_MATRIX } from "@/data/portfolioData";
import { Check, Minus, Layers } from "lucide-react";

export function SkillsMatrix() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-[var(--fg)]">
            03. Matrix: Where I Used What
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Cross-system technical stack distribution across Shivang's 4 flagship builds
          </p>
        </div>
      </div>

      {/* Skills Categories Pills */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {cat.title}
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The Dot-Matrix Cross-Reference Table */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="w-full border-collapse text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--paper)] text-[var(--muted)]">
              <th className="py-3 px-4 font-semibold">Technology / Framework</th>
              <th className="py-3 px-3 text-center">Aegis (Disaster)</th>
              <th className="py-3 px-3 text-center">SignalScale (ML)</th>
              <th className="py-3 px-3 text-center">Digit CNN</th>
              <th className="py-3 px-3 text-center">Cognitive Monitor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {TECH_MATRIX.map((row, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-hover)] transition-colors">
                <td className="py-2.5 px-4 font-medium text-[var(--fg)]">{row.tech}</td>
                
                {/* Aegis */}
                <td className="py-2.5 px-3 text-center">
                  {row.aegis ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[var(--muted)] opacity-30">•</span>
                  )}
                </td>

                {/* SignalScale */}
                <td className="py-2.5 px-3 text-center">
                  {row.signal ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[var(--muted)] opacity-30">•</span>
                  )}
                </td>

                {/* Digit CNN */}
                <td className="py-2.5 px-3 text-center">
                  {row.mnist ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[var(--muted)] opacity-30">•</span>
                  )}
                </td>

                {/* BCI Focus Jumper */}
                <td className="py-2.5 px-3 text-center">
                  {row.bci ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 font-bold">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[var(--muted)] opacity-30">•</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
