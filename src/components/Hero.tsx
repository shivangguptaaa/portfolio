"use client";

import React, { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { AsciiHeroBanner } from "@/components/AsciiBanners";
import { ArrowDown, Terminal, Clock, MapPin, Sparkles, ExternalLink, Copy, Check, Radio } from "lucide-react";

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 md:pt-14 md:pb-16">
      {/* ASCII Typographic Header */}
      <div className="w-full overflow-hidden border-b border-[var(--line)] pb-4 mb-8">
        <AsciiHeroBanner />
      </div>

      {/* Top Metadata Line */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>Jaipur, India · IST (UTC+5:30)</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>{timeStr || "17:00:00"} IST</span>
        </div>
      </div>

      {/* Brutalist Archivo Display Headline */}
      <div className="mt-6">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[var(--fg)] leading-[0.95]">
          AI THAT KNOWS ITS LIMITS
        </h1>
        <p className="mt-4 font-mono text-base sm:text-xl font-bold text-[var(--accent)] tracking-tight">
          Shivang Gupta — AI & Systems Engineer · JECRC CSE (9.22 CGPA) · SIH 2025 Finalist
        </p>
      </div>

      {/* Bio Statement */}
      <p className="mt-5 max-w-3xl text-sm sm:text-base leading-relaxed text-[var(--muted)] font-sans">
        Final-year Computer Science Engineering student at JECRC Foundation, Jaipur (CGPA: 9.22), Top 10 Smart India Hackathon Finalist. Built Aegis (disaster command with live GDACS satellite telemetry & NDMA RAG), Focus Jumper (clinical EEG BCI with MNIT & Swaarogym), SignalScale (&lt;15ms lead scoring), and 99.2% MNIST CNN. 3 live cloud engines, 3 research internships (Celebal, MNIT, Swaarogym).
      </p>

      {/* Main Action CTAs + Profile Pill */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-semibold">
          <a
            href="#builds-showcase"
            className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-[var(--on-accent)] shadow transition hover:opacity-90 active:scale-95"
          >
            <span>SEE THE BUILDS</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>

          <a
            href="/Shivang_Gupta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>RÉSUMÉ</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={onOpenTerminal}
            className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2.5 text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--fg)]"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>LAUNCH CLI (~ `)</span>
          </button>
        </div>

        {/* Floating Profile Card / Pill */}
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2.5 sm:px-4 font-mono text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[var(--muted)] hidden sm:inline">Status:</span>
            <span className="text-[var(--fg)] font-semibold truncate max-w-[150px] sm:max-w-none">
              Building Aegis & NeuralFocus
            </span>
          </div>

          <span className="text-[var(--line-strong)] select-none">|</span>

          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-1.5 text-[var(--accent)] hover:underline font-semibold"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy email"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
