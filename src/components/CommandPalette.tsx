"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { PROJECTS, PERSONAL_INFO } from "@/data/portfolioData";
import { Search, ExternalLink, Code2, Palette, ArrowRight, X, Command, FileText } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setSkin } = useSkin();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    // Page Navigation
    {
      category: "Pages",
      title: "Home (/)",
      subtitle: "Overview, thesis, limits, and live bento builds",
      action: () => {
        router.push("/");
        onClose();
      },
    },
    {
      category: "Pages",
      title: "Builds Catalog (/builds)",
      subtitle: "Catalog of 4 systems with filters, list/grid views",
      action: () => {
        router.push("/builds");
        onClose();
      },
    },
    {
      category: "Pages",
      title: "About Shivang (/about)",
      subtitle: "Narrative, 3 internships, education 9.22 CGPA, leadership",
      action: () => {
        router.push("/about");
        onClose();
      },
    },
    {
      category: "Pages",
      title: "Engineering Log (/log)",
      subtitle: "GitHub contributions heatmap, metrics, 4 repos",
      action: () => {
        router.push("/log");
        onClose();
      },
    },
    {
      category: "Pages",
      title: "Open An Issue (/contact)",
      subtitle: "Direct inbox transmission with simulated GitHub issues",
      action: () => {
        router.push("/contact");
        onClose();
      },
    },
    {
      category: "Pages",
      title: "VS Code IDE Mode (/ide)",
      subtitle: "Full-fidelity browser IDE code explorer",
      action: () => {
        router.push("/ide");
        onClose();
      },
    },
    // Projects
    ...PROJECTS.map((p) => ({
      category: "Builds",
      title: p.title,
      subtitle: `${p.domain} • ${p.badge}`,
      action: () => {
        if (p.liveUrl) {
          window.open(p.liveUrl, "_blank");
        } else {
          router.push(`/builds#${p.id}`);
        }
        onClose();
      },
    })),
    // Theme Skins
    {
      category: "Visual Skins",
      title: "Phosphor (Default Dark)",
      subtitle: "Amber CRT glow & deep charcoal background",
      action: () => {
        setSkin("phosphor");
        onClose();
      },
    },
    {
      category: "Visual Skins",
      title: "Ivory (Editorial Paper)",
      subtitle: "Vintage parchment cream & oxblood red",
      action: () => {
        setSkin("ivory");
        onClose();
      },
    },
    {
      category: "Visual Skins",
      title: "Riso (Risograph Print)",
      subtitle: "Newsprint white, cobalt blueprint & fluorescent magenta",
      action: () => {
        setSkin("riso");
        onClose();
      },
    },
    // Assets & Social
    {
      category: "Assets",
      title: "Official Résumé (PDF)",
      subtitle: "Shivang_Gupta_Resume.pdf",
      action: () => {
        window.open("/Shivang_Gupta_Resume.pdf", "_blank");
        onClose();
      },
    },
    {
      category: "Social",
      title: "GitHub Profile",
      subtitle: "github.com/shivangguptaaa",
      action: () => {
        window.open(PERSONAL_INFO.github, "_blank");
        onClose();
      },
    },
    {
      category: "Social",
      title: "LinkedIn Profile",
      subtitle: "linkedin.com/in/shivanggupta",
      action: () => {
        window.open(PERSONAL_INFO.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3.5">
          <Search className="h-4 w-4 text-[var(--muted)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page (e.g. Builds, Ivory, Aegis, Log)..."
            className="w-full bg-transparent font-mono text-xs sm:text-sm text-[var(--fg)] placeholder-[var(--muted)]/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[var(--muted)] hover:text-[var(--fg)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 font-mono text-xs">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[var(--muted)]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-[var(--surface-2)] group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">
                      [{item.category}]
                    </span>
                    <span className="font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-0.5">
                    {item.subtitle}
                  </div>
                </div>

                <ArrowRight className="h-3.5 w-3.5 text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all -translate-x-1 group-hover:translate-x-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-mono text-[10px] text-[var(--muted)]">
          <span>Navigate with arrows or mouse</span>
          <div className="flex items-center gap-2">
            <span>[Esc] to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
