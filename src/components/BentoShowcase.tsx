"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Shield } from "lucide-react";

interface BuildSlab {
  id: string;
  name: string;
  kind: string;
  year: string;
  summary: string;
  limit: string;
  metrics: { value: string; label: string }[];
  buildNotesUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

const BUILDS_DATA: BuildSlab[] = [
  {
    id: "aegis",
    name: "Aegis",
    kind: "Disaster System",
    year: "2025",
    summary:
      "Emergency preparedness and response platform developed for Smart India Hackathon. Features awareness modules, quizzes, verified NDMA protocol RAG, and student progress tracking.",
    limit: "Grounds emergency response strictly in verified institution guidelines.",
    metrics: [
      { value: "Top 10", label: "SIH 2025 Finalist" },
      { value: "250+", label: "Competing Teams" },
      { value: "Full Stack", label: "Node.js & MongoDB" },
    ],
    buildNotesUrl: "/builds/aegis",
    liveUrl: "https://aegis-elvv.onrender.com",
    githubUrl: "https://github.com/SHIVANGGUPTAAA/Aegis",
  },
  {
    id: "eeg-monitor",
    name: "EEG Signal Analysis",
    kind: "Biomedical DSP",
    year: "2025",
    summary:
      "Biomedical signal processing research conducted at Swaarogym Medical Devices (MIIC, MNIT Jaipur). Applies Butterworth bandpass filtering and Welch's power spectral density to isolate Theta and Beta frequency bands across 36 subjects.",
    limit: "Restricted strictly to frequency band spectral ratio analysis for exploratory research.",
    metrics: [
      { value: "36", label: "Dataset Subjects" },
      { value: "Welch", label: "PSD Extraction" },
      { value: "1–40 Hz", label: "Butterworth Filter" },
    ],
    buildNotesUrl: "/builds/focus-jumper",
    githubUrl: "https://github.com/SHIVANGGUPTAAA",
  },
  {
    id: "digitdraw",
    name: "Digit Recognizer",
    kind: "Computer Vision",
    year: "2026",
    summary:
      "Interactive drawing canvas and PyTorch Convolutional Neural Network inference engine. Features bounding box cropping, centroid mass alignment, and real-time top-3 softmax confidence distributions.",
    limit: "Runs inference ephemeral in memory; zero user drawing or pixel data is stored.",
    metrics: [
      { value: "99.2%", label: "Model Accuracy" },
      { value: "28×28", label: "Centroid Normalized" },
      { value: "<25ms", label: "Inference Latency" },
    ],
    buildNotesUrl: "/builds/digit-recognition",
    liveUrl: "https://handwritten-digit-recognition-1mv5.onrender.com",
    githubUrl: "https://github.com/SHIVANGGUPTAAA/handwritten-digit-recognition",
  },
  {
    id: "lead-scoring",
    name: "Lead Scoring",
    kind: "Predictive ML",
    year: "2026",
    summary:
      "Predictive customer conversion scoring pipeline analyzing behavioral and demographic signals. Calibrated logistic regression and gradient boosting models achieve 0.89 ROC-AUC to prioritize high-intent sales outreach.",
    limit: "Enforces calibrated probability thresholds to prevent unverified automated outreach.",
    metrics: [
      { value: "0.89", label: "ROC-AUC Score" },
      { value: "12+", label: "Feature Signals" },
      { value: "Calibrated", label: "Probability Score" },
    ],
    buildNotesUrl: "/builds/signalscale",
    liveUrl: "https://lead-scoring-q7dj.onrender.com",
    githubUrl: "https://github.com/SHIVANGGUPTAAA/lead-scoring",
  },
];

export function BentoShowcase() {
  const [openId, setOpenId] = useState<string>("aegis");

  return (
    <section id="builds-showcase" className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-4 mb-6">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
            Four builds, opened up
          </h2>
          <p className="mt-1 font-sans text-sm sm:text-base text-[var(--muted)]">
            The four I’d show you first.
          </p>
        </div>
        <Link
          href="/builds"
          className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] hover:text-[var(--fg)] inline-flex items-center gap-1.5 font-bold transition-colors"
        >
          <span>All builds</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Accordion Deck */}
      <div className="deck">
        {BUILDS_DATA.map((build) => {
          const isOpen = openId === build.id;

          return (
            <div
              key={build.id}
              className={`slab ${isOpen ? "open" : ""}`}
            >
              {/* Tab Button */}
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? "" : build.id)}
                aria-expanded={isOpen}
                className="slab-tab"
              >
                <span className="plus" aria-hidden="true">
                  +
                </span>
                <span className="vt text-[var(--fg)]">{build.name}</span>
                <span className="kind">{build.kind}</span>
              </button>

              {/* Expanded Body */}
              <div className="slab-body">
                {/* Left Column: Interactive Simulation / Visualization */}
                <div className="slab-ro flex flex-col justify-center">
                  {build.id === "aegis" && (
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 font-mono text-xs shadow-inner">
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3 text-[11px] text-[var(--muted)]">
                        <span className="flex items-center gap-1.5 font-bold text-[var(--accent)]">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          ~/aegis-platform · zsh
                        </span>
                        <span className="opacity-75">SIH 2025 Finalist</span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <p className="text-[var(--fg)] font-bold">
                          <span className="text-[var(--accent)]">$</span> aegis start --college-portal
                        </p>
                        <p className="text-[var(--muted)]">
                          <span className="text-emerald-400">[portal]</span> disaster awareness modules loaded
                        </p>
                        <p className="text-[var(--muted)]">
                          <span className="text-blue-400">[quiz]</span> interactive emergency drills initialized
                        </p>
                        <p className="text-[var(--muted)]">
                          <span className="text-amber-400">[chatbot]</span> verified AI assistant ready for student queries
                        </p>
                        <p className="text-[var(--fg)] pt-1 font-semibold">
                          <span className="text-emerald-400">[status]</span> student tracking & safety dashboard active
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] text-[var(--muted)]">
                        <span>Node.js · Express · MongoDB</span>
                        <span className="text-[var(--accent)] font-bold">Top 10 SIH 2025</span>
                      </div>
                    </div>
                  )}

                  {build.id === "eeg-monitor" && (
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 font-mono text-xs shadow-inner space-y-3">
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 text-[11px] text-[var(--muted)]">
                        <span className="font-bold text-[var(--accent)]">Swaarogym Medical Devices</span>
                        <span className="text-emerald-400 font-semibold">93% Accuracy</span>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Feature Extraction:</span>
                          <span className="text-[var(--fg)] font-bold">Welch&apos;s PSD (Theta & Beta)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Trained Models:</span>
                          <span className="text-[var(--fg)] font-bold">Random Forest, SVM, Logistic</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Best Classifier:</span>
                          <span className="text-[var(--accent)] font-bold">Random Forest (93%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Application:</span>
                          <span className="text-[var(--fg)] font-bold">Interactive Feedback Game</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[var(--line)] text-[10px] text-[var(--muted)] flex items-center justify-between">
                        <span>Incubated at MIIC, MNIT Jaipur</span>
                        <span className="text-[var(--accent)] font-bold">Cognitive ML</span>
                      </div>
                    </div>
                  )}

                  {build.id === "digitdraw" && (
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 shadow-inner space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 text-[11px] text-[var(--muted)]">
                        <span className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Client Vision · 8×8 Matrix
                        </span>
                        <span className="text-emerald-400 font-bold">98.9% Confidence</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 items-center">
                        {/* 8x8 Pixel Intensity Heatmap for Digit 7 */}
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1.5">
                            64-Dim Input Tensor
                          </span>
                          <div className="grid grid-cols-8 gap-0.5 p-1.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] shadow-inner">
                            {[
                              0, 0, 8, 15, 16, 12, 0, 0,
                              0, 0, 1,  5, 14, 15, 0, 0,
                              0, 0, 0,  0, 10, 16, 0, 0,
                              0, 0, 0,  3, 15, 11, 0, 0,
                              0, 0, 0,  8, 16,  4, 0, 0,
                              0, 0, 0, 13, 14,  0, 0, 0,
                              0, 0, 2, 16,  8,  0, 0, 0,
                              0, 0, 0,  0,  0,  0, 0, 0,
                            ].map((val, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-[2px] transition-colors"
                                style={{
                                  backgroundColor:
                                    val === 0
                                      ? "rgba(255,255,255,0.03)"
                                      : `rgba(255, 181, 71, ${val / 16})`,
                                }}
                                title={`pixel ${idx}: ${val}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Prediction Breakdown */}
                        <div className="space-y-2 text-[11px]">
                          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2">
                            <span className="text-[9px] uppercase tracking-wider text-[var(--muted)] block">
                              Class Prediction
                            </span>
                            <span className="font-display text-2xl font-black text-[var(--fg)]">
                              Digit 7
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="text-[var(--muted)]">Class 7</span>
                              <span className="text-emerald-400 font-bold">98.9%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[var(--bg)] overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "98.9%" }} />
                            </div>
                            <div className="flex justify-between text-[10px]">
                              <span className="text-[var(--muted)]">Class 1</span>
                              <span className="text-[var(--muted)]">0.8%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[var(--bg)] overflow-hidden">
                              <div className="h-full bg-[var(--line-strong)] rounded-full" style={{ width: "8%" }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[var(--line)] text-[10px] text-[var(--muted)] flex items-center justify-between">
                        <span>SVC Classifier · 1,797 Samples</span>
                        <span className="text-[var(--accent)] font-bold">&lt;0.1ms Client Inference</span>
                      </div>
                    </div>
                  )}

                  {build.id === "lead-scoring" && (
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 font-mono text-xs shadow-inner space-y-3">
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 text-[11px] text-[var(--muted)]">
                        <span className="font-bold text-[var(--accent)]">Lead Scoring Engine</span>
                        <span className="text-emerald-400 font-semibold">0.89 ROC-AUC</span>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Pipeline:</span>
                          <span className="text-[var(--fg)] font-bold">XGBoost &amp; Logistic Regression</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Feature Signals:</span>
                          <span className="text-[var(--fg)] font-bold">12 Interaction &amp; Firmographic</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Top Predictor:</span>
                          <span className="text-[var(--accent)] font-bold">Engagement Velocity (+0.38)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Calibration:</span>
                          <span className="text-emerald-400 font-bold">Calibrated Sigmoid (Brier 0.082)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--muted)]">Priority Threshold:</span>
                          <span className="text-[var(--fg)] font-bold">&gt;0.72 High-Intent Outreach</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[var(--line)] text-[10px] text-[var(--muted)] flex items-center justify-between">
                        <span>Python · Scikit-Learn · Pandas</span>
                        <span className="text-[var(--accent)] font-bold">Conversion ML</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Information & Actions */}
                <div className="slab-info flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
                      {build.kind} · {build.year}
                    </p>

                    <h3 className="mt-1 font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
                      <Link
                        href={build.buildNotesUrl}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {build.name}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--muted)] font-sans">
                      {build.summary}
                    </p>

                    {/* Hard Limit Callout */}
                    <div className="mt-4 rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] p-3.5 font-mono text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[var(--accent)] uppercase tracking-wider text-[10px] mb-1">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Built-in Limit</span>
                      </div>
                      <p className="text-[var(--muted)] leading-relaxed text-[11px]">
                        {build.limit}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-center">
                      {build.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-2.5"
                        >
                          <span className="block font-bold text-[var(--fg)] text-sm sm:text-base">
                            {m.value}
                          </span>
                          <span className="block text-[10px] text-[var(--muted)] uppercase tracking-wider mt-0.5">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs font-semibold pt-3 border-t border-[var(--line)]">
                    <Link
                      href={build.buildNotesUrl}
                      className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                    >
                      <span>Build notes</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    {build.liveUrl && (
                      <a
                        href={build.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                      >
                        <span>Live app</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {build.githubUrl && (
                      <a
                        href={build.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
