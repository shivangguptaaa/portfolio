"use client";

import React from "react";
import { NUMBERS_TICKER } from "@/data/portfolioData";

export function NumbersTicker() {
  return (
    <div className="w-full border-y border-[var(--line)] bg-[var(--surface)] py-3 overflow-hidden select-none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-1">
          {NUMBERS_TICKER.map((item, idx) => (
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
              {idx < NUMBERS_TICKER.length - 1 && (
                <span className="text-[var(--line-strong)] ml-4 select-none">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
