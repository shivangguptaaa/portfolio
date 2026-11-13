"use client";

import React from "react";
import { NUMBERS_TICKER } from "@/data/portfolioData";

export function NumbersTicker() {
  // Duplicate array once for seamless infinite marquee loop
  const duplicated = [...NUMBERS_TICKER, ...NUMBERS_TICKER];

  return (
    <div className="w-full border-y border-[var(--line)] bg-[var(--surface)] py-5 sm:py-6 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-10">
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-baseline gap-3 shrink-0"
          >
            <span className="font-display font-black text-2xl sm:text-4xl text-[var(--accent)] tracking-tight">
              {item.value}
            </span>
            <span className="text-[var(--muted)] text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap font-mono font-semibold">
              {item.label}
            </span>
            <span className="text-[var(--line-strong)] text-lg ml-8 select-none opacity-60">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
