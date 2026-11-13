"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { Terminal, Command, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
}

export function Navbar({ onOpenCommandPalette, onToggleTerminal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { skin, setSkin } = useSkin();
  const pathname = usePathname();

  // Close menu on route change or ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
      <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-md transition-all duration-200">
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
            className="flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] transition focus:outline-none"
          >
            <span
              className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-200 ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--fg)] transition-all duration-200 ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </header>

      {/* 3. Sleek Dropdown Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Menu Card Panel (Anchored Right, Decent Responsive Size) */}
          <nav
            aria-label="Navigation drawer"
            className="relative z-10 w-full max-w-sm sm:max-w-md h-full bg-[var(--surface)] border-l border-[var(--line)] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Top */}
            <div>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-display text-[17px] font-black uppercase text-[var(--fg)] border-[1.5px] border-[var(--fg)] rounded-[9px] px-3 py-0.5"
                >
                  Shivang Gupta
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--fg)] transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Decent-sized Navigation Links */}
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl font-display text-xl sm:text-2xl font-black uppercase tracking-tight transition-all duration-150 ${
                        isActive
                          ? "bg-[var(--surface-2)] text-[var(--accent)]"
                          : "text-[var(--fg)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls: Skin Swatches + Tools */}
            <div className="space-y-6 pt-6 border-t border-[var(--line)] mt-6 font-mono text-xs">
              {/* Swatches (Matching Vansh's exact swatch style) */}
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block mb-2 font-bold">
                  Skin Theme:
                </span>
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Visual skins">
                  {skins.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSkin(s.id as any)}
                      aria-pressed={skin === s.id}
                      className={`flex items-center justify-center gap-2 rounded-xl py-2 px-2.5 border transition ${
                        skin === s.id
                          ? "border-[var(--fg)] bg-[var(--paper)] text-[var(--fg)] font-bold shadow-sm"
                          : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--line-strong)]"
                      }`}
                    >
                      <i
                        className="h-2.5 w-2.5 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[11px] truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] py-2 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition"
                >
                  <Command className="h-3 w-3" />
                  <span>Cmds <kbd className="text-[10px] text-[var(--accent)]">⌘K</kbd></span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onToggleTerminal();
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] py-2 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition"
                >
                  <Terminal className="h-3 w-3" />
                  <span>CLI <kbd className="text-[10px] text-[var(--accent)]">~ `</kbd></span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
