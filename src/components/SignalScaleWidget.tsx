"use client";

import React, { useState } from "react";
import { Gauge, Zap, TrendingUp, CheckCircle } from "lucide-react";

export function SignalScaleWidget() {
  const [visits, setVisits] = useState(14);
  const [emailsClicked, setEmailsClicked] = useState(3);
  const [attendedWebinar, setAttendedWebinar] = useState(true);

  // Calibrated scoring heuristic mirroring Gradient Boost output
  const rawScore = (visits * 2.8) + (emailsClicked * 12.5) + (attendedWebinar ? 35 : 0);
  const prob = Math.min(99, Math.max(5, Math.round(rawScore / 1.15)));

  const tier = prob >= 75 ? "HOT LEAD" : prob >= 40 ? "WARM LEAD" : "COLD LEAD";
  const tierColor = prob >= 75 ? "text-emerald-400" : prob >= 40 ? "text-amber-400" : "text-blue-400";
  const tierBg = prob >= 75 ? "bg-emerald-500/20" : prob >= 40 ? "bg-amber-500/20" : "bg-blue-500/20";

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Gauge className="h-4 w-4 text-[var(--accent)]" />
          <span className="font-bold text-[var(--fg)]">SignalScale Live Scoring Simulator</span>
        </div>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Latency: 11.4 ms
        </span>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-[10px] text-[var(--muted)] block mb-1">
            Site Visits: <strong className="text-[var(--fg)]">{visits}</strong>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={visits}
            onChange={(e) => setVisits(parseInt(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[10px] text-[var(--muted)] block mb-1">
            Emails Clicked: <strong className="text-[var(--fg)]">{emailsClicked}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={emailsClicked}
            onChange={(e) => setEmailsClicked(parseInt(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={() => setAttendedWebinar(!attendedWebinar)}
            className={`w-full py-1.5 rounded-lg border font-mono text-[11px] transition ${
              attendedWebinar
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]"
            }`}
          >
            {attendedWebinar ? "✓ Webinar Attended" : "+ Add Webinar"}
          </button>
        </div>
      </div>

      {/* Real-time Probability Gauge Card */}
      <div className="rounded-lg bg-[var(--paper)] p-3 border border-[var(--line)] flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">
            Conversion Propensity
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-[var(--fg)]">{prob}%</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tierBg} ${tierColor}`}>
              {tier}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[var(--muted)] block">Model Architecture</span>
          <span className="text-xs font-semibold text-[var(--fg)]">Gradient Boosting</span>
          <span className="text-[10px] text-[var(--accent)] block mt-0.5">Platt Calibrated</span>
        </div>
      </div>
    </div>
  );
}
