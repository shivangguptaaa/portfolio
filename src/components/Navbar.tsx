"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { Command, Terminal, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
}

export function Navbar({ onOpenCommandPalette, onToggleTerminal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { skin, setSkin } = useSkin();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close dropdown on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/builds", num: "01", label: "Builds", desc: "Flagship engines, architectures & limits" },
    { href: "/about", num: "02", label: "About", desc: "Background, timeline, leadership & stack" },
    { href: "/log", num: "03", label: "Log", desc: "Verified GitHub commit pulse & public repos" },
    { href: "/contact", num: "04", label: "Contact", desc: "Open an issue directly in my inbox" },
  ];

  const skins = [
    { id: "phosphor", label: "Phosphor", color: "#ffb547" },
    { id: "ivory", label: "Ivory", color: "#8a2432" },
    { id: "riso", label: "Riso", color: "#c81e74" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Pill */}
        <Link
          href="/"
          className="inline-flex items-center font-display text-[16px] sm:text-[18px] font-black uppercase tracking-tight text-[var(--fg)] border-[1.5px] border-[var(--fg)] rounded-[10px] px-3.5 py-1 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200"
        >
          Shivang Gupta
        </Link>

        {/* 2-Bar Animated Burger Button matching Vansh Arora (.burger.x) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] transition-colors focus:outline-none"
        >
          <span
            className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[2px]" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-[0px]" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {/* Top-to-Bottom Smooth Cascading Dropdown Menu (.fold) */}
      <div
        className={`w-full border-b border-[var(--line-strong)] bg-[var(--bg)] shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? "max-h-[550px] opacity-100 py-6" : "max-h-0 opacity-0 py-0 border-b-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Staggered Links List */}
          <div className="divide-y divide-[var(--line)]">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${idx * 60}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                  opacity: isOpen ? 1 : 0,
                }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-3.5 px-3 hover:bg-[var(--surface)] rounded-xl transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  {/* Diamond Icon (.fd) */}
                  <span className="h-2 w-2 rotate-45 border border-[var(--accent)] bg-transparent group-hover:bg-[var(--accent)] transition-all duration-200 shrink-0" />
                  
                  {/* Number (.fn) */}
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    {item.num}
                  </span>

                  {/* Title (.fl) */}
                  <span className="font-display text-2xl sm:text-3xl font-black uppercase text-[var(--fg)] group-hover:text-[var(--accent)] group-hover:translate-x-1.5 transition-all duration-200">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1 sm:mt-0 font-mono text-xs text-[var(--muted)] pl-9 sm:pl-0">
                  <span>{item.desc}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Bar: Themes & Tools (.fold-foot) */}
          <div className="mt-6 pt-5 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            {/* Theme Swatches */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold">
                Theme:
              </span>
              <div className="flex items-center gap-2">
                {skins.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSkin(s.id as any)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 border transition-all duration-200 ${
                      skin === s.id
                        ? "border-[var(--fg)] bg-[var(--surface)] text-[var(--fg)] font-bold shadow-sm ring-1 ring-[var(--accent)]"
                        : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--line-strong)]"
                    }`}
                  >
                    <i
                      className="h-2.5 w-2.5 rounded-full inline-block shrink-0 shadow-sm"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-xs capitalize">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tools */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <Command className="h-3 w-3" />
                <span>Commands <kbd className="text-[10px] text-[var(--accent)] font-semibold">⌘K</kbd></span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onToggleTerminal();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <Terminal className="h-3 w-3" />
                <span>CLI <kbd className="text-[10px] text-[var(--accent)] font-semibold">~ `</kbd></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
