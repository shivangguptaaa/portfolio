"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useSkin } from "@/context/SkinContext";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  const { skin, setSkin } = useSkin();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)] py-12 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="text-center md:text-left">
            <span className="font-mono text-base font-bold text-[var(--fg)]">
              SHIVANG GUPTA
            </span>
            <p className="mt-1 font-mono text-xs text-[var(--muted)]">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Skin Switcher in Footer */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[var(--muted)] mr-1">Visual Skin:</span>
            {[
              { id: "phosphor", label: "Phosphor" },
              { id: "ivory", label: "Ivory" },
              { id: "riso", label: "Riso" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSkin(s.id as any)}
                className={`rounded-md border px-2.5 py-1 transition ${
                  skin === s.id
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] font-semibold"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 text-[var(--muted)]">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[var(--fg)] transition"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[var(--fg)] transition"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send Email"
              className="hover:text-[var(--fg)] transition"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--line)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
          <div>
            © 2026 Shivang Gupta. Designed with deterministic boundaries.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Next.js 16 & Tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
