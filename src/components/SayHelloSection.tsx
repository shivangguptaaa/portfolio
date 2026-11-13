"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowRight, Clock, MapPin, Copy, Check } from "lucide-react";

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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* The Signature Promptish Lineish Banner */}
      <Link
        href="/contact"
        className="group relative block w-full rounded-3xl border border-[var(--line-strong)] bg-[var(--surface)] p-8 sm:p-12 transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:shadow-2xl"
      >
        <div className="flex flex-col justify-between min-h-[160px] sm:min-h-[200px]">
          {/* Prompt prefix */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--muted)] group-hover:text-[var(--on-accent)] transition-colors">
            <span className="text-[var(--accent)] group-hover:text-[var(--on-accent)] font-bold">~</span>
            <span>/</span>
            <span>say-hello</span>
            <span className="animate-pulse">$</span>
          </div>

          {/* Big Archivo Thesis */}
          <div className="flex items-baseline justify-between gap-4 mt-6">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[var(--fg)] group-hover:text-[var(--on-accent)] transition-colors duration-200">
              Hiring? Say hello
            </h2>

            <span className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-[var(--fg)] group-hover:text-[var(--on-accent)] transition-all duration-200 group-hover:translate-x-3">
              →
            </span>
          </div>

          <p className="mt-3 font-mono text-xs text-[var(--muted)] group-hover:text-[var(--on-accent)] transition-colors">
            It lands directly in my inbox. Response time &lt; 24h.
          </p>
        </div>
      </Link>

      {/* Sub-bar with Live Coordinates & Email Copier */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--muted)] px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>{timeStr || "17:30 IST"}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>Jaipur, India</span>
          </div>
        </div>

        <button
          type="button"
          onClick={copyEmail}
          className="flex items-center gap-1.5 text-[var(--accent)] hover:underline font-semibold"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied to clipboard!" : `Copy ${PERSONAL_INFO.email}`}</span>
        </button>
      </div>
    </section>
  );
}
