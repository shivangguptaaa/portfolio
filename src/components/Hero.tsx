"use client";

import React, { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { ArrowRight, ExternalLink, Terminal, Copy, Check } from "lucide-react";

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
          hour12: false,
        }) + " IST"
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
    <section className="relative mx-auto max-w-[1360px] px-4 pt-4 pb-14 sm:px-6 md:pt-6 md:pb-20">
      {/* 1. Interactive ASCII Matrix Glyph Canvas Header */}
      <div className="w-full border-b border-[var(--line)] pb-4 mb-8">
        <InteractiveGlyph words={["SHIVANG", "GUPTA"]} isHero={true} id="hero-glyph" />
      </div>

      {/* 2. Hero Grid: Main Headline + Rotated Profile ID Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, Bio & CTAs (7 cols) */}
        <div className="lg:col-span-7">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black uppercase tracking-tight text-[var(--fg)] leading-[0.92]">
            AI THAT KNOWS ITS <em className="text-[var(--accent)] not-italic font-black">LIMITS.</em>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-2xl font-sans">
            I’m <strong className="text-[var(--fg)]">Shivang Gupta</strong>, a final-year computer science engineering student at JECRC Foundation (<strong className="text-[var(--accent)]">9.22 CGPA</strong>) and Top 10 Smart India Hackathon Finalist. I build production-grade full-stack web platforms, cloud architectures, and automated data pipelines.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm font-medium">
            <a
              href="#builds-showcase"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[var(--on-accent)] font-bold shadow-md hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>See the builds</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/Shivang_Gupta_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] px-5 py-3 text-[var(--fg)] font-semibold hover:border-[var(--fg)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Résumé</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Rotated Profile ID Card (.idcard) (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <aside
            aria-label="Profile card"
            className="relative w-full max-w-[380px] rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-6 pt-7 shadow-2xl transition-transform duration-300 hover:rotate-0 rotate-[-2.5deg]"
            style={{
              boxShadow: "0 1px 0 var(--line), 0 30px 60px -32px var(--card-shadow, rgba(0,0,0,0.5))"
            }}
          >
            {/* Lanyard Punch Hole Slot */}
            <div
              aria-hidden="true"
              className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-2 rounded-full bg-[var(--bg)] border border-[var(--line-strong)] shadow-inner"
            />

            {/* Card Head */}
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold border-b border-[var(--line)] pb-3">
              <span>ENGINEER</span>
              <span className="text-[var(--accent)]">JECRC · CSE ’27</span>
            </div>

            {/* Card Main: Avatar + Name */}
            <div className="mt-4 flex items-center gap-4">
              {/* Photo Box */}
              <div className="h-24 w-20 shrink-0 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="h-10 w-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold font-mono text-sm border border-[var(--accent)]">
                  SG
                </div>
                <span className="text-[9px] font-mono text-[var(--muted)] mt-1.5 font-bold">
                  9.22 CGPA
                </span>
              </div>

              {/* Name & Title */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--fg)] leading-none">
                  Shivang Gupta
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)] font-mono font-medium">
                  Full Stack Developer & AI Engineer
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                  <span>SIH 2025 Finalist</span>
                </div>
              </div>
            </div>

            {/* Card Facts Grid */}
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-[var(--line-strong)] pt-3.5 font-mono text-xs">
              <div>
                <dt className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Status</dt>
                <dd className="font-semibold text-[var(--fg)] flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate">Building Aegis</span>
                </dd>
              </div>

              <div>
                <dt className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Local time</dt>
                <dd className="font-semibold text-[var(--fg)] mt-0.5">
                  {timeStr || "17:20 IST"}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Based in</dt>
                <dd className="font-semibold text-[var(--fg)] mt-0.5">
                  Jaipur, India
                </dd>
              </div>

              <div>
                <dt className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Fastest reply</dt>
                <dd className="font-semibold text-[var(--accent)] mt-0.5">
                  Email
                </dd>
              </div>
            </dl>

            {/* Card Foot: Copy Email + Barcode */}
            <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3">
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] px-3 py-1 font-mono text-xs text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied!" : "Copy email"}</span>
              </button>

              {/* Decorative Barcode */}
              <span className="barcode" aria-hidden="true" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
