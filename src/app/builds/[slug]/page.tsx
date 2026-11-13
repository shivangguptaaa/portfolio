import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildNotesToc } from "@/components/BuildNotesToc";
import { BUILD_NOTES } from "@/data/buildNotesData";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Activity,
  Zap,
  Sparkles,
  Cpu,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(BUILD_NOTES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = BUILD_NOTES[slug];
  if (!note) return {};

  return {
    title: `${note.title} · Build notes · Shivang Gupta`,
    description: note.summary,
    openGraph: {
      title: `${note.title} · Build notes · Shivang Gupta`,
      description: note.summary,
    },
  };
}

export default async function BuildDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const note = BUILD_NOTES[slug];

  if (!note) {
    notFound();
  }

  const nextNote = BUILD_NOTES[note.nextProject.id];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors">
      <Navbar />

      <main className="flex-1 mx-auto max-w-[1360px] w-full px-4 py-8 sm:px-6">
        <article className="w-full">
          {/* 1. Top Bar: Breadcrumb, Progress & Next Navigation */}
          <nav className="case-bar" aria-label="Build notes navigation">
            <Link href="/builds" className="hover:text-[var(--accent)]" prefetch={true}>
              <ArrowLeft className="h-4 w-4" />
              <span>All builds</span>
            </Link>
            <span className="label">
              Build notes {note.index} of {note.total}
            </span>
            <Link href={`/builds/${note.nextProject.id}`} className="hover:text-[var(--accent)] font-semibold" prefetch={true}>
              <span>Next: {note.nextProject.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          {/* 2. Case Header */}
          <header className="case-head">
            <div className="left">
              <div className="meta-line">
                <span>Build notes</span>
                <span>{note.domain}</span>
                <span>{note.year}</span>
              </div>
              <h1>{note.title}</h1>
              <p className="sum">{note.summary}</p>

              <div className="stamp">
                <b>{note.wontStamp.prefix}</b>
                <span>{note.wontStamp.text}</span>
              </div>

              <div className="ctas">
                {note.datasheet.liveUrl && (
                  <a
                    className="btn solid"
                    href={note.datasheet.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live site</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  className="btn"
                  href={note.datasheet.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>

            {/* Datasheet Metadata Column */}
            <dl className="datasheet">
              <div>
                <dt>Role</dt>
                <dd>{note.datasheet.role}</dd>
              </div>
              <div>
                <dt>When</dt>
                <dd>{note.datasheet.when}</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>
                  <div className="chips">
                    {note.datasheet.builtWith.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt>Links</dt>
                <dd>
                  <div className="plinks">
                    {note.datasheet.liveUrl && (
                      <a href={note.datasheet.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live site ↗
                      </a>
                    )}
                    <a href={note.datasheet.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
          </header>

          {/* 3. Hero Visual Frame */}
          <div className="case-hero">
            <figure className="frame">
              <div className="frame-bar">
                <i />
                <i />
                <i />
                <span>{note.datasheet.hostname}</span>
              </div>

              {/* Graphic Preview Container */}
              <div className="p-6 sm:p-10 bg-[var(--surface)] border-t border-[var(--line)]">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {note.id === "aegis" && <Activity className="h-5 w-5 text-emerald-400 animate-pulse" />}
                        {note.id === "signalscale" && <Zap className="h-5 w-5 text-amber-400" />}
                        {note.id === "digit-recognition" && <Sparkles className="h-5 w-5 text-cyan-400" />}
                        {note.id === "focus-jumper" && <Cpu className="h-5 w-5 text-blue-400" />}
                        <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                          {note.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[var(--fg)]">
                        {note.title}
                      </h3>
                      <p className="font-mono text-xs text-[var(--muted)] max-w-xl">
                        {note.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                      {note.byTheNumbers.slice(0, 3).map((num, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2 font-mono text-right"
                        >
                          <span className="text-[10px] uppercase text-[var(--muted)] block font-semibold">
                            {num.label}
                          </span>
                          <span className="text-base font-bold text-[var(--fg)] block">
                            {num.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>

          {/* 4. Two-Column Layout with Sticky TOC & Content */}
          <div className="case-layout">
            {/* Sticky Table of Contents */}
            <BuildNotesToc hasWhatsNext={note.whatsNext.length > 0} />

            {/* Main Article Content */}
            <div className="cs-main space-y-12">
              {/* Section: Why it exists */}
              <section id="cs-why" className="cs-sec">
                <h2>Why it exists</h2>
                <div className="space-y-4">
                  {note.whyItExists.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section: What it does */}
              <section id="cs-what" className="cs-sec">
                <h2>What it does</h2>
                {note.whatItDoes.overview && <p>{note.whatItDoes.overview}</p>}

                <ul className="blist">
                  {note.whatItDoes.features.map((feat, i) => (
                    <li key={i}>
                      <span>
                        <strong>{feat.name}:</strong> {feat.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section: What it won't do */}
              <section id="cs-limits" className="cs-sec">
                <h2>What it won’t do</h2>
                {note.whatItWontDo.overview && <p>{note.whatItWontDo.overview}</p>}

                <ul className="blist wont-list">
                  {note.whatItWontDo.limits.map((lim, i) => (
                    <li key={i}>
                      <span>
                        <strong>{lim.rule}:</strong> {lim.reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section: How it works */}
              <section id="cs-how" className="cs-sec">
                <h2>How it works</h2>
                <p>{note.howItWorks.overview}</p>

                {/* Architecture components grid - Balanced 2x2 layout */}
                <div className="eco">
                  {note.howItWorks.architecture.map((arch, i) => (
                    <div key={i}>
                      <b>
                        {arch.component} <span className="opacity-70 font-mono text-xs">({arch.tech})</span>
                      </b>
                      <span>{arch.role}</span>
                    </div>
                  ))}
                </div>

                {/* Deep dive prose */}
                <div className="space-y-4 mt-2">
                  {note.howItWorks.deepDive.map((dive, i) => (
                    <p key={i}>{dive}</p>
                  ))}
                </div>
              </section>

              {/* Section: By the numbers */}
              <section id="cs-measured" className="cs-sec">
                <h2>By the numbers</h2>
                <div className="metrics">
                  {note.byTheNumbers.map((num, i) => (
                    <div key={i}>
                      <b>{num.value}</b>
                      <span>{num.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: What's next */}
              {note.whatsNext.length > 0 && (
                <section id="cs-next" className="cs-sec">
                  <h2>What’s next</h2>
                  <ul className="blist">
                    {note.whatsNext.map((item, i) => (
                      <li key={i}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* 5. Bottom Connected Project Card (Vansh Style) */}
          <Link href={`/builds/${note.nextProject.id}`} prefetch={true} className="next-card group">
            <div>
              <span className="label">Next build notes</span>
              <b>{note.nextProject.title}</b>
              <p>{note.nextProject.subtitle}</p>
            </div>
            <div className="tile-media">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                {note.nextProject.id === "aegis" && (
                  <Activity className="h-10 w-10 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                )}
                {note.nextProject.id === "signalscale" && (
                  <Zap className="h-10 w-10 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                )}
                {note.nextProject.id === "digit-recognition" && (
                  <Sparkles className="h-10 w-10 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                )}
                {note.nextProject.id === "focus-jumper" && (
                  <Cpu className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                )}
                <span className="font-mono text-xs font-bold text-[var(--fg)]">
                  {note.nextProject.domain}
                </span>
                <span className="font-mono text-[10px] text-[var(--accent)] mt-1 font-semibold flex items-center gap-1">
                  <span>Read build notes</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </article>
      </main>

      <Footer />
    </div>
  );
}
