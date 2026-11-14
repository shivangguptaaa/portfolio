"use client";

import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)] py-6 sm:py-7 transition-colors relative z-10">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Left: Always Building indicator */}
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
              Always Building
            </span>
          </div>

          {/* Right: Site Navigation & Verified Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 font-mono text-xs">
            {/* Page navigation links */}
            <nav className="flex flex-wrap items-center justify-center gap-4 font-bold text-[var(--fg)]">
              <Link href="/" className="hover:text-[var(--accent)] transition">
                HOME
              </Link>
              <Link href="/builds" className="hover:text-[var(--accent)] transition">
                BUILDS
              </Link>
              <Link href="/about" className="hover:text-[var(--accent)] transition">
                ABOUT
              </Link>
              <Link href="/log" className="hover:text-[var(--accent)] transition">
                LOG
              </Link>
              <Link href="/contact" className="hover:text-[var(--accent)] transition">
                CONTACT
              </Link>
            </nav>

            <span className="hidden sm:inline-block h-3.5 w-px bg-[var(--line-strong)]" aria-hidden="true" />

            {/* Social channels */}
            <div className="flex items-center gap-4 text-[var(--muted)] font-semibold">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--fg)] transition flex items-center gap-1.5"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--fg)] transition flex items-center gap-1.5"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LINKEDIN</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-[var(--fg)] transition flex items-center gap-1.5"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>EMAIL</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
