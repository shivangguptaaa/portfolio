"use client";

import { useEffect } from "react";
import { PROJECTS } from "@/data/portfolioData";

export function ProjectWarmup() {
  useEffect(() => {
    // Only run after the main page has completely loaded and browser is idle
    const runWarmup = () => {
      const liveUrls = PROJECTS.map((p) => p.liveUrl).filter(Boolean) as string[];
      if (liveUrls.length === 0) return;

      liveUrls.forEach((url) => {
        try {
          fetch(url, {
            mode: "no-cors",
            cache: "no-cache",
            credentials: "omit",
          }).catch(() => {
            // Silently ignore
          });
        } catch {
          // Ignore
        }
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number })
        .requestIdleCallback(runWarmup, { timeout: 4000 });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(runWarmup, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
