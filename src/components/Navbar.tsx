"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { Terminal, Command, Palette, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
}

export function Navbar({ onOpenCommandPalette, onToggleTerminal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { skin, setSkin } = useSkin();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/builds", label: "Builds" },
    { href: "/about", label: "About" },
    { href: "/log", label: "Log" },
    { href: "/contact", label: "Contact" },
  ];

  const skins = [
    { id: "phosphor", label: "Phosphor", color: "#ffb547" },
    { id: "ivory", label: "Ivory", color: "#8a2432" },
    { id: "riso", label: "Riso", color: "#c81e74" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-transparent bg-[var(--nav-bg)] backdrop-blur-md transition-all duration-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* 1. Left: Brand Name Pill (exactly matching Vansh's .brand) */}
          <Link
            href="/"
            className="inline-flex items-center font-display text-[17px] sm:text-[18px] font-black uppercase tracking-tight text-[var(--fg)] border-[1.5px] border-[var(--fg)] rounded-[10px] px-3.5 py-1 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200"
          >
            Shivang Gupta
          </Link>

          {/* 2. Right: Hamburger Button with Animated Lines */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] transition"
          >
            <span
              className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </header>

      {/* 3. Slide-in / Dropdown Menu with Smooth Animation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[var(--bg)]/95 backdrop-blur-xl p-6 sm:p-12 animate-in fade-in duration-200">
          {/* Top Bar inside Menu */}
          <div className="mx-auto w-full max-w-6xl flex items-center justify-between border-b border-[var(--line)] pb-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center font-display text-[18px] font-black uppercase tracking-tight text-[var(--fg)] border-[1.5px] border-[var(--fg)] rounded-[10px] px-3.5 py-1"
            >
              Shivang Gupta
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links in Massive Archivo Typography */}
          <div className="mx-auto w-full max-w-6xl py-8 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-baseline justify-between font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight transition-colors duration-200 ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--fg)] hover:text-[var(--accent)]"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-8 w-8 text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all -translate-x-4 group-hover:translate-x-0" />
                </Link>
              );
            })}
          </div>

          {/* Bottom Tools & Visual Skin Swatches */}
          <div className="mx-auto w-full max-w-6xl pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            {/* Skin Swatches */}
            <div className="flex items-center gap-3">
              <span className="text-[var(--muted)] uppercase tracking-wider text-[11px]">Skin:</span>
              <div className="flex items-center gap-2">
                {skins.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSkin(s.id as any)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition ${
                      skin === s.id
                        ? "border-[var(--fg)] bg-[var(--surface)] text-[var(--fg)] font-bold shadow-sm"
                        : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="capitalize">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Modals */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <Command className="h-3.5 w-3.5" />
                <span>Commands <kbd className="text-[10px] text-[var(--accent)]">Ctrl K</kbd></span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onToggleTerminal();
                }}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Terminal <kbd className="text-[10px] text-[var(--accent)]">Ctrl `</kbd></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
