"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSkin } from "@/context/SkinContext";
import { PROJECTS, PERSONAL_INFO } from "@/data/portfolioData";
import { Terminal as TerminalIcon, X, Minus, ChevronUp } from "lucide-react";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [history, setHistory] = useState<Array<{ text: string; isCommand?: boolean }>>([
    { text: "Shivang Gupta — Deterministic Systems CLI [Version 1.0.4]" },
    { text: "Type 'help' to inspect available system commands or 'projects' to review live engines." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { skin, setSkin } = useSkin();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    const newHistory = [...history, { text: `shivang@systems ~ % ${raw}`, isCommand: true }];

    switch (cmd) {
      case "help":
        newHistory.push(
          { text: "SYSTEM COMMANDS:" },
          { text: "  projects     - List all 4 flagship systems with live links" },
          { text: "  eeg          - Print EEG attention classification formulas" },
          { text: "  theme [name] - Switch visual skin (phosphor, ivory, riso)" },
          { text: "  about        - View Shivang's engineering biography" },
          { text: "  skills       - View full-stack & AI technology breakdown" },
          { text: "  time         - Print current Indian Standard Time (IST)" },
          { text: "  ide          - Open web VS Code IDE mode" },
          { text: "  clear        - Clear terminal stdout history" },
          { text: "  exit         - Close terminal drawer" }
        );
        break;

      case "projects":
        newHistory.push({ text: "FLAGSHIP PRODUCTION SYSTEMS:" });
        PROJECTS.forEach((p) => {
          newHistory.push({
            text: `• [${p.badge}] ${p.title} (${p.domain})\n  ${p.liveUrl ? `Live URL: ${p.liveUrl}` : "Simulator Card"}\n  Repo: ${p.githubUrl}`,
          });
        });
        break;

      case "eeg":
        newHistory.push(
          { text: "EEG COGNITIVE ATTENTION ARCHITECTURE:" },
          { text: "• Research Lab: Swaarogym Medical Devices (MIIC, MNIT Jaipur)" },
          { text: "• Bandpass Filter: 1.0 Hz - 40.0 Hz windowing" },
          { text: "• Frequency Metric: Theta/Beta Ratio (TBR) = Mean(PSD[4-8Hz]) / Mean(PSD[13-30Hz])" },
          { text: "• Classifiers: Random Forest (93% accuracy), SVM, Logistic Regression" },
          { text: "• Feedback Loop: Connected to interactive cognitive feedback game" }
        );
        break;

      case "theme":
        if (["phosphor", "ivory", "riso"].includes(arg)) {
          setSkin(arg as any);
          newHistory.push({ text: `Visual skin updated to: ${arg.toUpperCase()}` });
        } else {
          newHistory.push({ text: `Current theme: ${skin}. Usage: theme [phosphor | ivory | riso]` });
        }
        break;

      case "about":
        newHistory.push(
          { text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}` },
          { text: PERSONAL_INFO.bio },
          { text: `Contact: ${PERSONAL_INFO.email} | GitHub: ${PERSONAL_INFO.github}` }
        );
        break;

      case "skills":
        newHistory.push(
          { text: "SKILLS BREAKDOWN:" },
          { text: "• Languages: Python, TypeScript, JavaScript, SQL, C++, HTML5 Canvas" },
          { text: "• AI/ML: CNN, Scikit-Learn, Random Forest, Gradient Boost, Gemini RAG" },
          { text: "• Signal ML: Welch PSD, Feature Extraction, Filtering, Band Power" },
          { text: "• Full-Stack: Next.js 16, React 19, Node.js, Express, MongoDB Atlas, Render" }
        );
        break;

      case "time":
        newHistory.push({
          text: new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST (Jaipur/Delhi, UTC+5:30)",
        });
        break;

      case "ide":
        router.push("/ide");
        onClose();
        return;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        setInputVal("");
        return;

      default:
        newHistory.push({ text: `zsh: command not found: ${cmd}. Type 'help' for valid commands.` });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--line)] bg-[#0d0e11] text-[#ece8df] shadow-2xl animate-in slide-in-from-bottom duration-200">
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-[#2b2c31] px-4 py-2 font-mono text-xs text-neutral-400 bg-[#16171b]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span className="font-semibold text-neutral-200">shivang@systems: ~ (zsh)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 hover:bg-[#2b2c31] text-neutral-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1 bg-[#0d0e11]">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={line.isCommand ? "text-[var(--accent)] font-semibold" : "text-neutral-300 whitespace-pre-wrap"}
          >
            {line.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Prompt Input Form */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-[#2b2c31] bg-[#121316] px-4 py-2.5 font-mono text-xs">
        <span className="text-[var(--accent)] font-bold">shivang@systems ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'help', 'projects', 'eeg', 'theme riso'..."
          className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none"
        />
      </form>
    </div>
  );
}
