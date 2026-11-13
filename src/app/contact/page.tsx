"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { AsciiIssueBanner } from "@/components/AsciiBanners";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail, Copy, Check, Send, Clock, MapPin, ExternalLink, Phone, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("hiring");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `[${selectedTag.toUpperCase()}] ${title || "Inquiry from Portfolio"}`
    )}&body=${encodeURIComponent(
      `From: ${senderName} (${senderEmail})\n\n${description}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-12 sm:px-6">
        {/* Header ASCII */}
        <div className="border-b border-[var(--line)] pb-6 mb-8">
          <AsciiIssueBanner />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
                OPEN AN ISSUE
              </h1>
              <p className="mt-1 font-mono text-sm text-[var(--muted)]">
                Direct transmission. Fill in the parameters below and it routes straight to my inbox.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent)] font-bold">
              RESPONSE TIME &lt; 24H
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left 2 Cols: GitHub Issue Form Simulator */}
          <div className="lg:col-span-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden shadow-xl">
            {/* Header mimicking GitHub repository issue creator */}
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--paper)] px-5 py-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--fg)]">{PERSONAL_INFO.handle}</span>
                <span className="text-[var(--muted)]">/</span>
                <span className="text-[var(--muted)]">hello</span>
              </div>
              <span className="rounded bg-[var(--accent)] px-2 py-0.5 font-bold text-[var(--on-accent)] text-[10px]">
                New issue
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Issue Title */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Engineering Role / Aegis Discussion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 font-mono text-xs text-[var(--fg)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition"
                />
              </div>

              {/* Tag Picker (Radio Pills) */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-2 font-semibold">
                  Label
                </label>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {[
                    { id: "hiring", label: "hiring" },
                    { id: "freelance", label: "freelance" },
                    { id: "collaboration", label: "collaboration" },
                    { id: "just-saying-hi", label: "just saying hi" },
                  ].map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setSelectedTag(tag.id)}
                      className={`rounded-full px-3 py-1 text-xs transition ${
                        selectedTag === tag.id
                          ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold shadow-sm"
                          : "border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--fg)]"
                      }`}
                    >
                      #{tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5 font-semibold">
                  Description
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What you're building, what you need, or how I can help..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 font-mono text-xs text-[var(--fg)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition"
                />
              </div>

              {/* Sender Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 font-mono text-xs text-[var(--fg)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5 font-semibold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ada@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 font-mono text-xs text-[var(--fg)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-[var(--accent)] px-6 py-3 font-mono text-xs font-bold text-[var(--on-accent)] shadow transition hover:opacity-90 active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>SUBMIT NEW ISSUE</span>
                </button>
              </div>

              {submitted && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 font-mono text-xs text-emerald-400">
                  Issue dispatched! Your email client has been prepared with the formatted payload.
                </div>
              )}
            </form>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Clock & Location Card */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                <span className="font-bold text-[var(--fg)]">COORDINATES</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <Clock className="h-4 w-4 text-[var(--accent)]" />
                  <span>{timeStr || "17:00:00"} IST (UTC+5:30)</span>
                </div>

                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>

                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <Phone className="h-4 w-4 text-[var(--accent)]" />
                  <span>(+91) 7610993308</span>
                </div>
              </div>
            </div>

            {/* Direct Email Copier */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 font-mono text-xs">
              <span className="font-bold text-[var(--fg)] block mb-2">DIRECT INBOX</span>
              <p className="text-[var(--muted)] text-[11px] mb-3 leading-relaxed">
                Prefer direct communication over the issue tracker?
              </p>

              <div className="flex items-center justify-between rounded-xl bg-[var(--paper)] p-3 border border-[var(--line)]">
                <span className="truncate text-[var(--fg)] text-[11px]">{PERSONAL_INFO.email}</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1 text-[var(--accent)] hover:underline ml-2"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 font-mono text-xs space-y-2.5">
              <span className="font-bold text-[var(--fg)] block mb-1">PROFILES & ASSETS</span>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </div>
                <ExternalLink className="h-3 w-3 text-[var(--muted)]" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="h-3 w-3 text-[var(--muted)]" />
              </a>

              <a
                href="/Shivang_Gupta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--fg)] hover:border-[var(--accent)] transition"
              >
                <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
                  <Mail className="h-4 w-4" />
                  <span>Official Résumé (PDF)</span>
                </div>
                <ExternalLink className="h-3 w-3 text-[var(--accent)]" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
