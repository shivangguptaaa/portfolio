"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { InteractiveGlyph } from "@/components/InteractiveGlyph";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Check, Copy, ExternalLink } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors animate-page-enter">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main className="flex-1 mx-auto max-w-[1360px] w-full px-4 py-8 sm:px-6">
        {/* Iconic CONTACT Particle Glyph Header */}
        <div className="border-b border-[var(--line)] pb-4 mb-8">
          <InteractiveGlyph text="CONTACT" subtext="DIRECT TRANSMISSION · INBOX ROUTED VIA SECURE PROTOCOL" />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <p className="font-mono text-xs sm:text-sm text-[var(--muted)]">
                Direct transmission. Fill in the parameters below and it routes straight to my inbox.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent)] font-bold tracking-wider">
              RESPONSE TIME &lt; 24H
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left Column (7 cols): Message Form */}
          <div className="lg:col-span-7 issue">
            <div className="issue-head">
              <div>
                <b>{PERSONAL_INFO.handle}</b> <span style={{ color: "var(--muted)" }}>/ message</span>
              </div>
              <span>Direct message</span>
            </div>

            <form className="msg" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="issue-title">TITLE</label>
                <input
                  id="issue-title"
                  type="text"
                  required
                  placeholder="Internship role on our AI team"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <fieldset className="field pick">
                <legend className="label">LABEL</legend>
                {[
                  { id: "hiring", label: "hiring" },
                  { id: "freelance", label: "freelance" },
                  { id: "collaboration", label: "collaboration" },
                  { id: "just-saying-hi", label: "just saying hi" },
                ].map((tag) => (
                  <label key={tag.id}>
                    <input
                      type="radio"
                      name="issue-label"
                      value={tag.id}
                      checked={selectedTag === tag.id}
                      onChange={() => setSelectedTag(tag.id)}
                    />
                    <span>{tag.label}</span>
                  </label>
                ))}
              </fieldset>

              <div className="field">
                <label htmlFor="issue-desc">DESCRIPTION</label>
                <textarea
                  id="issue-desc"
                  required
                  placeholder="What you’re working on, and where I’d fit."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="two">
                <div className="field">
                  <label htmlFor="issue-name">YOUR NAME</label>
                  <input
                    id="issue-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="issue-email">YOUR EMAIL</label>
                  <input
                    id="issue-email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-foot">
                <div className={`form-note ${submitted ? "on" : ""}`}>
                  {submitted ? "Transmission dispatched! Email client opened." : ""}
                </div>
                <button type="submit" className="btn-submit-issue">
                  Submit message
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (5 cols): Side Info & Coordinates */}
          <div className="lg:col-span-5 space-y-8 font-mono text-xs pl-0 lg:pl-2">
            {/* Availability Timeline Block */}
            <div className="border-b border-[var(--line)] pb-6">
              <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                Current Availability Timeline
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                2026 – 2027 Roles
              </h3>
              <p className="mt-2 text-white/90 text-sm leading-relaxed font-sans">
                Open for full-time Software Engineer, AI/ML, and Full-Stack Developer opportunities. Available for immediate discussions and technical consultations.
              </p>

              <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Response time: &lt; 24 hours</span>
              </div>
            </div>

            {/* Prominent Local Time Card with Big Seconds Readout */}
            <div className="border-b border-[var(--line)] pb-6 space-y-4">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Coordinates &amp; Local Time
              </span>

              {/* Big Digital Clock Display */}
              <div className="rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] p-4 sm:p-5 shadow-lg">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block mb-1 font-semibold">
                  My Local Time · Asia/Kolkata
                </span>
                <div className="font-display font-black text-4xl sm:text-5xl text-[var(--accent)] tabular-nums tracking-tight leading-tight">
                  {timeStr || "23:38:53"}
                </div>
                <div className="text-xs text-[var(--muted)] mt-2 font-mono flex items-center justify-between pt-1 border-t border-[var(--line)]">
                  <span>India Standard Time (UTC+5:30)</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-white text-sm pt-1">
                <span className="text-[var(--muted)]">Location:</span>
                <span className="font-bold text-white">Jaipur, Rajasthan · India</span>
              </div>

              <div className="flex items-center justify-between text-white text-sm">
                <span className="text-[var(--muted)]">Direct Phone:</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="font-bold text-white hover:text-[var(--accent)] transition"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            {/* Direct Email Address with Copy */}
            <div className="border-b border-[var(--line)] pb-6">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">
                Direct Inbox
              </span>
              <div className="flex items-center justify-between rounded-xl bg-[var(--surface)] p-3.5 border border-[var(--line)]">
                <span className="truncate text-white font-bold text-xs select-all">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 text-[var(--accent)] hover:underline ml-3 font-bold cursor-pointer"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copied ? "Copied" : "Copy email"}</span>
                </button>
              </div>
            </div>

            {/* Verified Public Channels (Platform Label on Left, URL on Right) */}
            <div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-3">
                Verified Channels
              </span>
              <div className="flex flex-col">
                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[var(--line)] text-white hover:text-[var(--accent)] transition group"
                >
                  <span className="font-sans font-semibold text-sm text-[var(--fg)]">GitHub</span>
                  <span className="font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] flex items-center gap-1.5 transition">
                    <span>github.com/{PERSONAL_INFO.handle}</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition" />
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[var(--line)] text-white hover:text-[var(--accent)] transition group"
                >
                  <span className="font-sans font-semibold text-sm text-[var(--fg)]">LinkedIn</span>
                  <span className="font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] flex items-center gap-1.5 transition">
                    <span>linkedin.com/in/shivanggupta</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition" />
                  </span>
                </a>

                {/* Résumé */}
                <a
                  href="/Shivang_Gupta_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[var(--line)] text-white hover:text-[var(--accent)] transition group"
                >
                  <span className="font-sans font-semibold text-sm text-[var(--accent)]">Résumé</span>
                  <span className="font-mono text-xs text-[var(--accent)] group-hover:underline flex items-center gap-1.5 transition">
                    <span>Download Verified PDF</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition" />
                  </span>
                </a>
              </div>
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
