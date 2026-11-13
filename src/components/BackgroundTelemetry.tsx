"use client";

import React, { useEffect, useState } from "react";

const TELEMETRY_KEYWORDS = [
  ["AGENT", "OPEN", "CONTEXT", "LSTM", "TRANSFORMER", "PIPELINE"],
  ["GDACS", "SATELLITE", "TELEMETRY", "NDMA", "RAG", "GEOJSON"],
  ["EEG", "ATTENTION", "WELCH-PSD", "THETA-BETA", "RF-93%", "SIGNAL"],
  ["CNN", "28x28", "MNIST", "TOPOLOGY", "EULER", "WEIGHTS"],
  ["ROC-AUC", "LOGISTIC", "SCIKIT", "PIPELINE", "LEAD-SCORE", "EDA"],
  ["PROTOCOL", "BOUNDARY", "REFUSAL", "LIMITS", "AUDIT", "ZERO-SHOT"]
];

export function BackgroundTelemetry() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0 opacity-[0.045] mix-blend-difference"
    >
      <div className="absolute inset-0 flex justify-between px-6 sm:px-16">
        {TELEMETRY_KEYWORDS.map((column, colIdx) => (
          <div
            key={colIdx}
            className={`flex flex-col gap-16 font-mono text-[10px] sm:text-xs font-black tracking-widest text-[var(--fg)] ${
              colIdx % 2 === 0 ? "animate-stream-up" : "animate-stream-down"
            }`}
            style={{
              animationDuration: `${35 + colIdx * 7}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          >
            {/* Repeat keywords twice for seamless looping */}
            {[...column, ...column, ...column].map((word, wordIdx) => (
              <div key={wordIdx} className="flex flex-col items-center gap-2">
                <span className="rotate-90 sm:rotate-0 tracking-widest">{word}</span>
                <span className="h-10 w-[1px] bg-current opacity-30" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
