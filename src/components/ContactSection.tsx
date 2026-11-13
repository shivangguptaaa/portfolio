"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail, Copy, Check, Send, MessageSquare, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("hiring");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-[var(--fg)]">
            04. Contact: Open An Issue
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Simulated GitHub issue interface — lands directly in Shivang's inbox
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Direct Links & Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <h3 className="font-mono text-base font-bold text-[var(--fg)]">
              Direct Transmission
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Prefer traditional email or social outreach? Reach out anytime.
            </p>

            {/* Email Copier */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
              <div className="truncate font-mono text-xs text-[var(--fg)]">
                {PERSONAL_INFO.email}
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-1 rounded-md bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)] transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-5 flex flex-col gap-2 font-mono text-xs">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2.5 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
              >
                <GithubIcon className="h-4 w-4" />
                <span>github.com/shivangguptaaa</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2.5 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>linkedin.com/in/shivanggupta</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              Turnaround Guarantees
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[var(--muted)]">
              <li>• Response within 24 hours</li>
              <li>• Open for full-time AI/ML, backend, or neurotech positions</li>
              <li>• Available for engineering consultations</li>
            </ul>
          </div>
        </div>

        {/* Right Column: GitHub Issue Simulation */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8"
          >
            {/* Simulated Issue Repo Header */}
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-4 font-mono text-xs text-[var(--muted)]">
              <GithubIcon className="h-4 w-4 text-[var(--fg)]" />
              <span>shivangguptaaa / hello</span>
              <span>•</span>
              <span className="font-semibold text-[var(--fg)]">New Issue</span>
            </div>

            {/* Title Input */}
            <div className="mt-6">
              <label className="block font-mono text-xs font-semibold text-[var(--fg)] uppercase tracking-wide">
                Issue Title:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI Systems Engineer position on our team"
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 font-mono text-sm text-[var(--fg)] placeholder-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none transition"
              />
            </div>

            {/* Tag Selection Radio Pills */}
            <div className="mt-5">
              <label className="block font-mono text-xs font-semibold text-[var(--fg)] uppercase tracking-wide">
                Issue Category:
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { id: "hiring", label: "hiring", color: "border-purple-500/40 text-purple-400" },
                  { id: "collaboration", label: "collaboration", color: "border-emerald-500/40 text-emerald-400" },
                  { id: "freelance", label: "freelance", color: "border-amber-500/40 text-amber-400" },
                  { id: "greeting", label: "just saying hi", color: "border-sky-500/40 text-sky-400" },
                ].map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => setSelectedTag(tag.id)}
                    className={`rounded-full border px-3 py-1 font-mono text-xs transition ${
                      selectedTag === tag.id
                        ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold border-transparent"
                        : `bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--fg)]`
                    }`}
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="mt-5">
              <label className="block font-mono text-xs font-semibold text-[var(--fg)] uppercase tracking-wide">
                Body / Proposal:
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell me what you are building, what the role entails, or what you'd like to collaborate on..."
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 font-mono text-sm text-[var(--fg)] placeholder-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none transition"
              />
            </div>

            {/* Sender Info Inputs */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-semibold text-[var(--fg)] uppercase tracking-wide">
                  Your Name:
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-mono text-sm text-[var(--fg)] placeholder-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-[var(--fg)] uppercase tracking-wide">
                  Your Email:
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-mono text-sm text-[var(--fg)] placeholder-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
              <span className="font-mono text-xs text-[var(--muted)]">
                Direct RFC 822 mail transmission
              </span>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 font-mono text-xs font-bold text-[var(--on-accent)] shadow transition hover:opacity-90 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>SUBMIT NEW ISSUE</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
