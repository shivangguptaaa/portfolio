"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { NumbersTicker } from "@/components/NumbersTicker";
import { BuiltInLimits } from "@/components/BuiltInLimits";
import { BentoShowcase } from "@/components/BentoShowcase";
import { AgentTraceSimulator } from "@/components/AgentTraceSimulator";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { MilestonesTimeline } from "@/components/MilestonesTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { Terminal } from "lucide-react";

export default function HomePage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      {/* Sticky Header */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Dynamic Hero with Canvas Glyph + Rotated ID Badge Card */}
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 2. Numbers Ticker Infinite Marquee */}
        <NumbersTicker />

        {/* 3. Built-In Limits (Does vs Refuses toggle) */}
        <BuiltInLimits />

        {/* 4. Four Builds, Opened Up (Interactive Bento Showcase) */}
        <BentoShowcase />

        {/* 5. Try To Make My Agent Lie (Interactive LLM Trace Simulator) */}
        <AgentTraceSimulator />

        {/* 6. Where I Used What (Cross-Tech Matrix) */}
        <SkillsMatrix />

        {/* 7. The Path So Far (Milestones Timeline) */}
        <MilestonesTimeline />

        {/* 8. Open An Issue Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Quick Triggers */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--fg)] shadow-lg backdrop-blur hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
        >
          <Terminal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">CLI (~ `)</span>
        </button>

        <button
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--fg)] shadow-lg backdrop-blur hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
        >
          <span>⌘K</span>
        </button>
      </div>

      {/* Modals */}
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
