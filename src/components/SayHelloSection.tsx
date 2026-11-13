"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { ArrowRight, Copy, Check } from "lucide-react";

export function SayHelloSection() {
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
    <section className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6">
      <div className="close-cta rounded-3xl border border-[var(--line-strong)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl">
        {/* Left Column: Giant Canvas Glyph "SAY HELLO" */}
        <div className="w-full">
          <InteractiveGlyph words={["SAY", "HELLO"]} className="contact-glyph" />
        </div>

        {/* Right Column: Close Side CTAs */}
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
            Hiring? Open an issue.
          </h2>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--muted)]">
            It’s <span className="text-[var(--accent)] font-bold">{timeStr || "--:-- IST"}</span> for me right now (Jaipur, India)
          </p>

          <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
            Send a brief, schedule a chat, or open an inquiry ticket. Transmissions land directly in my priority inbox.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-sm font-semibold">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[var(--on-accent)] font-bold hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all hover:-translate-y-0.5"
            >
              <span>Open an issue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)] px-5 py-3 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all hover:-translate-y-0.5"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied to clipboard" : "Copy email"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
