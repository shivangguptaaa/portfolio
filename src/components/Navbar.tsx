"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { Terminal, Command, Palette, Code2 } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
}

export function Navbar({ onOpenCommandPalette, onToggleTerminal }: NavbarProps) {
  const { skin, cycleSkin } = useSkin();
  const pathname = usePathname();

  const navLinks = [
    { href: "/builds", label: "BUILDS" },
    { href: "/about", label: "ABOUT" },
    { href: "/log", label: "LOG" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand & Live Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-sm sm:text-base font-bold tracking-tight text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            SHIVANG GUPTA
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to AI Roles</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors uppercase ${
                  isActive
                    ? "text-[var(--accent)] font-bold border-b border-[var(--accent)] pb-0.5"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/ide"
            className="flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>IDE</span>
          </Link>
        </nav>

        {/* Action Controls: Theme Switcher, Terminal, Command Palette */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Skin Switcher */}
          <button
            type="button"
            onClick={cycleSkin}
            title="Cycle Visual Skin (Shift + T)"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Palette className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="hidden sm:inline capitalize">{skin}</span>
          </button>

          {/* Terminal Drawer Button */}
          <button
            type="button"
            onClick={onToggleTerminal}
            title="Open Interactive Terminal (Ctrl + `)"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--fg)]"
          >
            <Terminal className="h-3.5 w-3.5" />
          </button>

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            title="Command Palette (Ctrl + K)"
            className="flex items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 py-1 text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--fg)]"
          >
            <Command className="h-3 w-3" />
            <span className="hidden sm:inline text-[11px]">K</span>
          </button>
        </div>
      </div>
    </header>
  );
}
