"use client";

import React, { useState } from "react";
import { Terminal, Shield, Sparkles, CheckCircle2, AlertOctagon, CornerDownLeft, ArrowRight, Loader2 } from "lucide-react";
import { evaluateAgentQuery } from "@/lib/agentEvaluator";

interface QueryPreset {
  id: string;
  label: string;
  query: string;
  trace: {
    plan: string;
    call: string;
    result: string;
    answer: string;
    refused: boolean;
  };
}

const PRESETS: QueryPreset[] = [
  {
    id: "rust",
    label: "Does Shivang know Rust?",
    query: "Does Shivang know Rust or build production kernels with it?",
    trace: {
      plan: "Checking verified technical skills for language: 'Rust'.",
      call: "skills_boundary.check({ skill: 'Rust' })",
      result: "Not verified in projects. Matched stack: Python, C++, TypeScript, JavaScript, SQL.",
      answer: "No. Shivang works primarily with Python, C++, TypeScript, JavaScript, and SQL. He has not worked with Rust in his projects, and the agent refuses to claim skills outside his verified work.",
      refused: true
    }
  },
  {
    id: "sql",
    label: "Does he know SQL?",
    query: "Does Shivang know SQL and relational database design?",
    trace: {
      plan: "Checking verified project repositories and database schemas.",
      call: "skills_engine.evaluate({ query: 'SQL / Databases', sources: ['Aegis', 'FullStack', 'Coursework'] })",
      result: "Found: SQL (PostgreSQL, MySQL, schema design, relational queries) and NoSQL (MongoDB Atlas).",
      answer: "Yes, he knows SQL well and has worked with PostgreSQL and MySQL alongside MongoDB Atlas for his full-stack platforms and data pipelines.",
      refused: false
    }
  },
  {
    id: "aegis",
    label: "What won't Aegis do?",
    query: "Can Aegis prescribe emergency medications during an active earthquake?",
    trace: {
      plan: "Checking Aegis NDMA/FEMA emergency protocol safety guardrails.",
      call: "protocol_filter.check_permission({ action: 'prescribe_medication', domain: 'triage' })",
      result: "Policy Violation: NDMA SOP #MED-01 strictly forbids autonomous chemical/drug prescriptions.",
      answer: "Aegis strictly refuses to prescribe medical drugs or triage pharmaceuticals autonomously. It routes rescue coordinators strictly through official NDMA first-aid stabilization protocols.",
      refused: true
    }
  },
  {
    id: "cgpa",
    label: "Is Shivang's 9.16 CGPA real?",
    query: "Verify Shivang Gupta's academic credentials and JECRC Foundation performance.",
    trace: {
      plan: "Querying verified institutional transcripts and academic milestone records.",
      call: "academic_records.fetch({ student: 'Shivang Gupta', college: 'JECRC Foundation' })",
      result: "Verified: B.Tech Computer Science & Engineering, Cumulative Grade Point Average: 9.16 / 10.0.",
      answer: "Yes, verified. Shivang Gupta is in his final year of B.Tech CSE at JECRC Foundation, Jaipur, maintaining a cumulative CGPA of 9.16/10.0.",
      refused: false
    }
  }
];

export function AgentTraceSimulator() {
  const [activePreset, setActivePreset] = useState<QueryPreset>(PRESETS[0]);
  const [customInput, setCustomInput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSelectPreset = (p: QueryPreset) => {
    setActivePreset(p);
    setCustomInput("");
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = customInput.trim();
    if (!query) return;

    setIsRunning(true);
    try {
      // First try the dynamic agent API endpoint (which connects to Gemini if configured)
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const evaluation = await res.json();
        setActivePreset({
          id: "custom",
          label: "Custom Query",
          query,
          trace: {
            plan: evaluation.plan,
            call: evaluation.call,
            result: evaluation.result,
            answer: evaluation.answer,
            refused: evaluation.refused,
          },
        });
      } else {
        throw new Error("API call failed");
      }
    } catch {
      // Fallback seamlessly to local deterministic knowledge evaluator
      const evaluation = evaluateAgentQuery(query);
      setActivePreset({
        id: "custom",
        label: "Custom Query",
        query,
        trace: {
          plan: evaluation.plan,
          call: evaluation.call,
          result: evaluation.result,
          answer: evaluation.answer,
          refused: evaluation.refused,
        },
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section id="trace" className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-4 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
          <Sparkles className="h-4 w-4" />
          <span>Interactive Audit</span>
        </div>
        <h2 className="mt-1 font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg)]">
          Try To Make My Agent Lie
        </h2>
        <p className="mt-1 font-sans text-sm sm:text-base text-[var(--muted)]">
          Test live step-by-step reasoning traces against strict verification boundaries.
        </p>
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-xl">
        {/* Preset Prompt Pills */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block mb-2.5 font-bold">
            Select a probe:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition ${
                  activePreset.id === p.id
                    ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold shadow-md"
                    : "border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--line-strong)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <form onSubmit={handleCustomSubmit} className="mb-6">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2 focus-within:border-[var(--accent)] transition">
            <span className="font-mono text-xs text-[var(--accent)]">❯</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything about Shivang (e.g., 'Does he know SQL?', 'What projects has he built?')..."
              className="flex-1 bg-transparent font-mono text-xs text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isRunning || !customInput.trim()}
              className="rounded-lg bg-[var(--surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--fg)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition disabled:opacity-40 flex items-center gap-1 cursor-pointer font-semibold"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-[var(--accent)]" />
                  <span>Auditing...</span>
                </>
              ) : (
                <span>Run Trace</span>
              )}
            </button>
          </div>
        </form>

        {/* The Live Trace Box */}
        <div className="rounded-2xl border border-[var(--line)] bg-neutral-950 p-5 font-mono text-xs space-y-4">
          {/* Query Bar */}
          <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-bold">QUERY:</span>
              <span className="text-white font-semibold">{activePreset.query}</span>
            </div>
            {activePreset.trace.refused ? (
              <span className="shrink-0 rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <AlertOctagon className="h-3 w-3" />
                REFUSED TO LIE
              </span>
            ) : (
              <span className="shrink-0 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                VERIFIED FACT
              </span>
            )}
          </div>

          {/* Reasoning Steps */}
          <div className="space-y-2 text-[11px]">
            {/* Step 1: PLAN */}
            <div className="flex items-start gap-2.5 text-neutral-400">
              <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[9px] font-bold uppercase text-neutral-300">
                1. PLAN
              </span>
              <span className="leading-relaxed">{activePreset.trace.plan}</span>
            </div>

            {/* Step 2: CALL */}
            <div className="flex items-start gap-2.5 text-blue-300">
              <span className="rounded bg-blue-900/50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-blue-300">
                2. CALL
              </span>
              <span className="leading-relaxed font-mono">{activePreset.trace.call}</span>
            </div>

            {/* Step 3: RESULT */}
            <div className="flex items-start gap-2.5 text-neutral-300">
              <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[9px] font-bold uppercase text-neutral-300">
                3. RESULT
              </span>
              <span className="leading-relaxed">{activePreset.trace.result}</span>
            </div>
          </div>

          {/* Final Grounded Synthesis Answer */}
          <div className="mt-4 pt-3 border-t border-neutral-800">
            <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wider block mb-1">
              GROUNDED AGENT SYNTHESIS:
            </span>
            <p className="text-white text-xs sm:text-sm leading-relaxed">
              {activePreset.trace.answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
