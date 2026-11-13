"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { ExternalLink, GitBranch, Shield, Zap, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { AegisLiveTelemetry } from "@/components/AegisLiveTelemetry";
import { BciSimulatorCard } from "@/components/BciSimulatorCard";
import { SignalScaleWidget } from "@/components/SignalScaleWidget";
import { DigitCanvas } from "@/components/DigitCanvas";

export function BentoShowcase() {
  const [activeColdWarm, setActiveColdWarm] = useState<Record<string, boolean>>({});

  const triggerWarmup = (url?: string, id?: string) => {
    if (url && id && !activeColdWarm[id]) {
      setActiveColdWarm((prev) => ({ ...prev, [id]: true }));
      try {
        fetch(url, { method: "HEAD", mode: "no-cors" }).catch(() => {});
      } catch (_) {}
    }
  };

  const aegis = PROJECTS.find((p) => p.id === "aegis")!;
  const bci = PROJECTS.find((p) => p.id === "focus-jumper")!;
  const signal = PROJECTS.find((p) => p.id === "signalscale")!;
  const mnist = PROJECTS.find((p) => p.id === "digit-recognition")!;

  return (
    <section id="builds-showcase" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[var(--line)] pb-4 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            <Layers className="h-4 w-4" />
            <span>Interactive Catalog</span>
          </div>
          <h2 className="mt-1 font-mono text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[var(--fg)]">
            Four Builds, Opened Up
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Deep dive into live production architectures, neurotech DSP, and interactive engines
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>3 Engines Deployed on Render</span>
        </div>
      </div>

      <div className="space-y-12">
        {/* ======================================================== */}
        {/* BUILD 01: AEGIS DISASTER PREPAREDNESS */}
        {/* ======================================================== */}
        <article
          id="aegis"
          onMouseEnter={() => triggerWarmup(aegis.liveUrl, "aegis")}
          className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 hover:border-[var(--line-strong)] transition-all shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Specs & Context */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                    {aegis.index} • {aegis.domain}
                  </span>
                  <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--accent)] border border-[var(--line)]">
                    {aegis.badge}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-3xl sm:text-5xl font-black tracking-tight text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-150">
                  {aegis.title}
                </h3>
                <p className="mt-1 font-mono text-sm font-medium text-[var(--muted)]">
                  {aegis.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {aegis.description}
                </p>

                {/* Refusal / Perimeter */}
                <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3.5 font-mono text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[var(--accent)] uppercase tracking-wider text-[11px] mb-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Hard Limit:</span>
                  </div>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {aegis.whatItRefuses[0]}
                  </p>
                </div>

                {/* Metrics */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {aegis.metrics.map((m, i) => (
                    <div key={i} className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-2 font-mono text-xs">
                      <span className="text-[10px] text-[var(--muted)] block">{m.label}</span>
                      <span className="font-bold text-[var(--fg)] text-xs block mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs pt-4 border-t border-[var(--line)]">
                {aegis.liveUrl && (
                  <a
                    href={aegis.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-4 py-2 font-bold text-[var(--on-accent)] shadow transition hover:opacity-90 active:scale-95"
                  >
                    <span>LAUNCH AEGIS PLATFORM</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={aegis.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2 text-[var(--fg)] hover:border-[var(--accent)] transition"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Telemetry & RAG Playground */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <AegisLiveTelemetry />
            </div>
          </div>
        </article>

        {/* ======================================================== */}
        {/* BUILD 02: NEUROFOCUS BCI & FOCUS JUMPER */}
        {/* ======================================================== */}
        <article
          id="focus-jumper"
          className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 hover:border-[var(--line-strong)] transition-all shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Specs & Context */}
            <div className="lg:w-2/5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                    {bci.index} • {bci.domain}
                  </span>
                  <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 font-mono text-[11px] font-bold text-purple-400 border border-[var(--line)]">
                    {bci.badge}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-3xl sm:text-5xl font-black tracking-tight text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-150">
                  {bci.title}
                </h3>
                <p className="mt-1 font-mono text-sm font-medium text-[var(--muted)]">
                  {bci.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {bci.description}
                </p>

                {/* Refusal / Perimeter */}
                <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3.5 font-mono text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[var(--accent)] uppercase tracking-wider text-[11px] mb-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Hard Limit:</span>
                  </div>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {bci.whatItRefuses[0]}
                  </p>
                </div>

                {/* Metrics */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {bci.metrics.map((m, i) => (
                    <div key={i} className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-2 font-mono text-xs">
                      <span className="text-[10px] text-[var(--muted)] block">{m.label}</span>
                      <span className="font-bold text-[var(--fg)] text-xs block mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs pt-4 border-t border-[var(--line)]">
                <a
                  href={bci.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2 text-[var(--fg)] hover:border-[var(--accent)] transition"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>BCI Model Repository</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Neuro Simulator */}
            <div className="lg:w-3/5">
              <BciSimulatorCard />
            </div>
          </div>
        </article>

        {/* ======================================================== */}
        {/* BUILD 03 & BUILD 04: SIGNALSCALE + DIGIT CNN GRID */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* BUILD 03: SIGNALSCALE */}
          <article
            id="signalscale"
            onMouseEnter={() => triggerWarmup(signal.liveUrl, "signal")}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--line-strong)] transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                  {signal.index} • {signal.domain}
                </span>
                <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--accent)] border border-[var(--line)]">
                  {signal.badge}
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-4xl font-black tracking-tight text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-150">
                {signal.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {signal.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                {signal.description}
              </p>

              {/* Interactive Widget */}
              <div className="mt-5">
                <SignalScaleWidget />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-4 border-t border-[var(--line)]">
              <a
                href={signal.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-1.5 font-bold text-[var(--on-accent)] hover:opacity-90 transition"
              >
                <span>LAUNCH APP</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={signal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <GitBranch className="h-3 w-3" />
                <span>GitHub Source</span>
              </a>
            </div>
          </article>

          {/* BUILD 04: HANDWRITTEN DIGIT RECOGNITION */}
          <article
            id="digit-recognition"
            onMouseEnter={() => triggerWarmup(mnist.liveUrl, "mnist")}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--line-strong)] transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                  {mnist.index} • {mnist.domain}
                </span>
                <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-[var(--line)]">
                  {mnist.badge}
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-4xl font-black tracking-tight text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-150">
                {mnist.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {mnist.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                {mnist.description}
              </p>

              {/* Interactive Widget */}
              <div className="mt-5">
                <DigitCanvas />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-4 border-t border-[var(--line)]">
              <a
                href={mnist.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-1.5 font-bold text-[var(--on-accent)] hover:opacity-90 transition"
              >
                <span>LAUNCH APP</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={mnist.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <GitBranch className="h-3 w-3" />
                <span>GitHub Source</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
