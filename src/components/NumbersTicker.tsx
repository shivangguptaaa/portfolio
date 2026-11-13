"use client";

import React from "react";
import { NUMBERS_TICKER } from "@/data/portfolioData";

export function NumbersTicker() {
  // Duplicate array once for seamless infinite marquee loop
  const duplicated = [...NUMBERS_TICKER, ...NUMBERS_TICKER];

  return (
    <div className="w-full border-y border-[var(--line)] bg-[var(--surface)] py-3 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8">
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-baseline gap-2 shrink-0 font-mono text-xs"
          >
            <span className="font-extrabold text-[var(--accent)] text-sm sm:text-base">
              {item.value}
            </span>
            <span className="text-[var(--muted)] text-[11px] uppercase tracking-wider whitespace-nowrap">
              {item.label}
            </span>
            <span className="text-[var(--line-strong)] ml-6 select-none opacity-60">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
