"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { NumbersTicker } from "@/components/NumbersTicker";
import { BuiltInLimits } from "@/components/BuiltInLimits";
import { BentoShowcase } from "@/components/BentoShowcase";
import { AgentTraceSimulator } from "@/components/AgentTraceSimulator";
import { MilestonesTimeline } from "@/components/MilestonesTimeline";
import { SayHelloSection } from "@/components/SayHelloSection";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { Terminal } from "lucide-react";

export default function HomePage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      {/* 1. Header with Brand Pill and Animated Menu Drawer */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Dynamic Hero: Interactive Canvas Glyph + Rotated ID Badge Card */}
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 3. Infinite Numbers Ticker Marquee */}
        <NumbersTicker />

        {/* 4. Built-In Limits (Does vs Won't segmented toggle) */}
        <BuiltInLimits />

        {/* 5. Four Builds, Opened Up (Interactive Bento Showcase) */}
        <BentoShowcase />

        {/* 6. Try To Make My Agent Lie (Interactive LLM Trace Simulator) */}
        <AgentTraceSimulator />

        {/* 7. The Path So Far (Milestones Timeline) */}
        <MilestonesTimeline />

        {/* 8. Promptish "Say hello" CTA Banner */}
        <SayHelloSection />
      </main>

      {/* Footer */}
      <Footer />

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
