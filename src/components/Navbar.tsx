"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { Command, Terminal, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onToggleTerminal?: () => void;
}

export function Navbar({
  onOpenCommandPalette = () => {},
  onToggleTerminal = () => {},
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { skin, setSkin } = useSkin();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/builds", num: "01", label: "BUILDS", desc: "Flagship engines, architectures & limits" },
    { href: "/about", num: "02", label: "ABOUT", desc: "Background, timeline, leadership & stack" },
    { href: "/log", num: "03", label: "LOG", desc: "Verified GitHub commit pulse & public repos" },
    { href: "/contact", num: "04", label: "CONTACT", desc: "Open an issue directly in my inbox" },
  ];

  const skins = [
    { id: "phosphor", label: "PHOSPHOR", color: "#ffb547" },
    { id: "ivory", label: "IVORY", color: "#8a2432" },
    { id: "riso", label: "RISO", color: "#c81e74" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-md transition-colors duration-200">
      <div className="relative mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6">
        {/* Brand Pill */}
        <Link
          href="/"
          className="inline-flex items-center font-display text-[16px] sm:text-[18px] font-black uppercase tracking-tight text-[var(--fg)] border-[1.5px] border-[var(--fg)] rounded-[10px] px-3.5 py-1 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200"
        >
          SHIVANG GUPTA
        </Link>

        {/* 2-Bar Animated Burger Button matching Vansh Arora (.burger.x) */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] transition-colors focus:outline-none"
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

          {/* Compact 340px Floating Origami Dropdown Card (.fold) */}
          <div
            className={`absolute top-full right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-[var(--line-strong)] bg-[var(--paper)]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-right overflow-hidden z-50 ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            {/* Cascading Links List */}
            <div className="divide-y divide-[var(--line)] p-2">
              {navItems.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${idx * 40}ms` : "0ms",
                  }}
                  className="group flex flex-col py-3 px-3 hover:bg-[var(--surface)] rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Diamond Bullet (.fd) */}
                      <span className={`h-2 w-2 rotate-45 border transition-all duration-200 shrink-0 ${
                        pathname === item.href
                          ? "border-[var(--accent)] bg-[var(--accent)] shadow-sm"
                          : "border-[var(--line-strong)] bg-transparent group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]"
                      }`} />
                      <span className="font-mono text-xs font-bold text-[var(--accent)]">
                        {item.num}
                      </span>
                      <span className={`font-display text-2xl font-black uppercase transition-all duration-200 ${
                        pathname === item.href
                          ? "text-[var(--accent)] translate-x-1"
                          : "text-[var(--fg)] group-hover:text-[var(--accent)] group-hover:translate-x-1"
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <span className="font-mono text-[11px] text-[var(--muted)] pl-8 mt-0.5 block truncate">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>

            {/* Footer Bar: Themes & Tools */}
            <div className="border-t border-[var(--line)] bg-[var(--surface)] p-3 flex flex-col gap-3 font-mono text-xs">
              {/* Theme Swatches */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-black">
                  THEME
                </span>
                <div className="flex items-center gap-1.5">
                  {skins.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSkin(s.id as any)}
                      aria-label={`${s.label} theme`}
                      aria-pressed={skin === s.id}
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 border transition-all ${
                        skin === s.id
                          ? "border-[var(--fg)] bg-[var(--paper)] text-[var(--fg)] font-bold shadow-sm ring-1 ring-[var(--accent)]"
                          : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]"
                      }`}
                    >
                      <i
                        className="h-2 w-2 rounded-full inline-block shrink-0 shadow-sm"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[10px] uppercase font-bold">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
