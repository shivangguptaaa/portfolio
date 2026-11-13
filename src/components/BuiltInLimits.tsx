"use client";

import React, { useState } from "react";
import { Shield, ShieldAlert, CheckCircle2 } from "lucide-react";

interface LimitItem {
  name: string;
  does: string;
  wont: string;
}

const LIMITS_DATA: LimitItem[] = [
  {
    name: "01 · Context Window",
    does: "Redacts sensitive credentials and sanitizes prompt buffers before LLM dispatch.",
    wont: "Never leaks unverified raw tokens or authorization headers into persistent memory.",
  },
  {
    name: "02 · Realtime RAG",
    does: "Grounds emergency response queries strictly in verified institutional protocols.",
    wont: "Never hallucinates or synthesizes unverified medical or evacuation procedures.",
  },
  {
    name: "03 · Lead Scoring",
    does: "Calculates conversion propensity using calibrated probability distributions.",
    wont: "Never triggers automated outreach on unverified or skewed confidence intervals.",
  },
  {
    name: "04 · Attention ML",
    does: "Extracts theta-beta power ratios via Welch periodograms for cognitive feedback.",
    wont: "Never computes attention states on noisy, clipped, or corrupted sensor streams.",
  },
  {
    name: "05 · Vision Classifier",
    does: "Executes numerical digit inference 100% client-side in browser runtime.",
    wont: "Never transmits drawn pixel buffers to third-party endpoints or external servers.",
  },
  {
    name: "06 · Data Ingestion",
    does: "Validates incoming telemetry payloads against strict schema boundaries.",
    wont: "Never passes unvalidated or malformed event records to downstream database models.",
  },
];

export function BuiltInLimits() {
  const [globalMode, setGlobalMode] = useState<"does" | "wont">("does");
  const [cardOverrides, setCardOverrides] = useState<Record<number, "does" | "wont">>({});

  const toggleCard = (idx: number) => {
    const currentMode = cardOverrides[idx] ?? globalMode;
    const nextMode = currentMode === "does" ? "wont" : "does";
    setCardOverrides((prev) => ({ ...prev, [idx]: nextMode }));
  };

  const handleGlobalChange = (mode: "does" | "wont") => {
    setGlobalMode(mode);
    setCardOverrides({}); // reset individual card overrides when global switch is clicked
  };

  return (
    <section id="limits" className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            <Shield className="h-4 w-4" />
            <span>Built-in limits</span>
          </div>
          <h2 className="mt-1 font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
            Built-In Limits
          </h2>
          <p className="mt-1 font-sans text-sm sm:text-base text-[var(--muted)]">
            Every build does something useful and refuses something risky. Click any card or toggle below.
          </p>
        </div>

        {/* The Signature Segmented Toggle */}
        <div className="flex items-center rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] p-1 font-mono text-xs select-none shrink-0 shadow-sm">
          <button
            type="button"
            onClick={() => handleGlobalChange("does")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 font-bold transition-all ${
              globalMode === "does"
                ? "bg-[var(--surface-2)] text-[var(--fg)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>DOES</span>
          </button>

          <button
            type="button"
            onClick={() => handleGlobalChange("wont")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 font-bold transition-all ${
              globalMode === "wont"
                ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>WON’T</span>
          </button>
        </div>
      </div>

      {/* 6 Clean Minimal Limit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LIMITS_DATA.map((item, idx) => {
          const isWont = (cardOverrides[idx] ?? globalMode) === "wont";

          return (
            <div
              key={idx}
              onClick={() => toggleCard(idx)}
              className={`rounded-2xl border p-6 flex flex-col justify-between min-h-[170px] cursor-pointer transition-all duration-300 select-none shadow-sm hover:-translate-y-0.5 ${
                isWont
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[#111111] shadow-lg"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
              }`}
            >
              <div
                className={`flex items-center justify-between border-b pb-3 transition-colors ${
                  isWont ? "border-[#111111]/20" : "border-[var(--line)]"
                }`}
              >
                <span
                  className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                    isWont ? "text-[#111111]/80 font-bold" : "text-[var(--muted)]"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full transition-all ${
                    isWont
                      ? "bg-[#111111] text-[var(--accent)]"
                      : "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--line)]"
                  }`}
                >
                  {isWont ? "Won’t" : "Does"}
                </span>
              </div>

              <div className="mt-4 flex-1 flex items-center">
                <p
                  className={`font-sans text-sm sm:text-base leading-relaxed transition-colors ${
                    isWont
                      ? "text-[#111111] font-semibold"
                      : "text-[var(--fg)] font-normal"
                  }`}
                >
                  {isWont ? item.wont : item.does}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
