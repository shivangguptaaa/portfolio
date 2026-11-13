"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { PROJECTS } from "@/data/portfolioData";
import { Search, LayoutGrid, List, ExternalLink, GitBranch, Shield, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function BuildsPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", label: "All", count: PROJECTS.length },
    { id: "ai", label: "AI & ML", count: 3 },
    { id: "fullstack", label: "Full-Stack", count: 1 },
    { id: "neurotech", label: "Neurotech", count: 1 },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.whatItRefuses.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "ai") return matchesSearch && (p.id === "signalscale" || p.id === "digit-recognition" || p.id === "focus-jumper");
    if (selectedCategory === "fullstack") return matchesSearch && p.id === "aegis";
    if (selectedCategory === "neurotech") return matchesSearch && p.id === "focus-jumper";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-12 sm:px-6">
        {/* Header with Interactive Canvas Glyph */}
        <div className="border-b border-[var(--line)] pb-4 mb-8">
          <InteractiveGlyph text="BUILDS" subtext="FLAGSHIP ENGINES • OPEN ARCHITECTURES & BOUNDARIES" />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <p className="font-mono text-sm text-[var(--muted)]">
                Everything I have engineered, opened up. Architecture, live links, and strict perimeter limits.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent)] font-bold">
              {PROJECTS.length} PRODUCTION BUILDS
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 font-mono text-xs">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search builds, stack, limits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-4 py-2.5 text-xs text-[var(--fg)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition"
            />
          </div>

          {/* Category Pills & View Mode */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-1 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    selectedCategory === c.id
                      ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {c.label} ({c.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-[var(--surface-2)] text-[var(--fg)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-1.5 rounded-lg transition ${
                  viewMode === "list"
                    ? "bg-[var(--surface-2)] text-[var(--fg)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Display: Grid vs List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col justify-between hover:border-[var(--line-strong)] transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                      {p.index} • {p.domain}
                    </span>
                    <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--muted)] border border-[var(--line)]">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 font-mono text-xl font-bold tracking-tight text-[var(--fg)]">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                    {p.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                    {p.description}
                  </p>

                  {/* Refusal box */}
                  <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-[var(--accent)] font-bold text-[11px] mb-1">
                      <Shield className="h-3 w-3" />
                      <span>Refuses to do:</span>
                    </div>
                    <p className="text-[var(--muted)] text-[11px] leading-relaxed">
                      {p.whatItRefuses[0]}
                    </p>
                  </div>

                  {/* Stack pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-bold text-[var(--accent)] hover:underline"
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--fg)]"
                    >
                      <GitBranch className="h-3 w-3" />
                      <span>Source</span>
                    </a>
                  </div>

                  <span className="text-[10px] text-[var(--muted)]">
                    {p.metrics[0].value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Dense List View */
          <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
            <table className="w-full border-collapse text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--paper)] text-[var(--muted)]">
                  <th className="py-3 px-4 font-semibold">Build</th>
                  <th className="py-3 px-4 font-semibold">Domain</th>
                  <th className="py-3 px-4 font-semibold">Primary Metric</th>
                  <th className="py-3 px-4 font-semibold">Hard Limit (Won't)</th>
                  <th className="py-3 px-4 text-right font-semibold">Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[var(--surface-2)] transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--fg)]">{p.title}</div>
                      <div className="text-[11px] text-[var(--muted)]">{p.subtitle}</div>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">{p.domain}</td>
                    <td className="py-3 px-4 font-bold text-[var(--accent)]">
                      {p.metrics[0].label}: {p.metrics[0].value}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[var(--muted)] max-w-xs truncate">
                      {p.whatItRefuses[0]}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline"
                          >
                            Live ↗
                          </a>
                        )}
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--muted)] hover:text-[var(--fg)]"
                        >
                          Repo
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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


