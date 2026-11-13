"use client";

import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)] py-12 transition-colors relative z-10">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="text-center md:text-left">
            <span className="font-display text-lg font-black uppercase text-[var(--fg)] tracking-tight">
              SHIVANG GUPTA
            </span>
            <p className="mt-1 font-mono text-xs text-[var(--muted)]">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Quick Page Links (All Caps) */}
          <nav className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs font-bold text-[var(--fg)]">
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
        </div>

        <div className="mt-8 border-t border-[var(--line)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
          <div>
            © 2026 SHIVANG GUPTA · FULL STACK DEVELOPER & AI ENGINEER
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--fg)] transition flex items-center gap-1"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GITHUB</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--fg)] transition flex items-center gap-1"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
              <span>LINKEDIN</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[var(--fg)] transition flex items-center gap-1"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>EMAIL</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
