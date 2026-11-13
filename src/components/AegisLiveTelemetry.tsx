"use client";

import React, { useState } from "react";
import { AlertTriangle, Radio, ShieldCheck, ExternalLink, ChevronRight, Activity } from "lucide-react";

interface HazardItem {
  id: string;
  type: string;
  location: string;
  severity: "Red" | "Orange" | "Green";
  telemetry: string;
}

const SAMPLE_HAZARDS: HazardItem[] = [
  { id: "h1", type: "EARTHQUAKE", location: "Hindu Kush Region", severity: "Orange", telemetry: "M 6.1 · Depth 180km · GDACS ID 109283" },
  { id: "h2", type: "CYCLONE", location: "Bay of Bengal", severity: "Red", telemetry: "Cat 2 · 130 km/h gusts · Barometric 984 hPa" },
  { id: "h3", type: "FLOOD", location: "Brahmaputra Basin", severity: "Orange", telemetry: "Water Level +1.4m above danger mark" },
];

const RAG_PRESETS = [
  {
    q: "Earthquake Evacuation Protocol?",
    a: "NDMA SOP #EQ-04: Drop, Cover, and Hold On. Avoid elevators. Disconnect central electrical panels. Evacuate to open assembly zones at minimum 1.5× building height radius."
  },
  {
    q: "Cyclone Warning Level Orange?",
    a: "NDMA SOP #CY-02: Issue campus-wide SMS broadcast within 30 min. Board exposed perimeter windows. Verify backup DG generators. Shelter all residential hostels."
  },
  {
    q: "Medical Emergency Grounding?",
    a: "NDMA SOP #MED-01: Direct triage protocol. Activate campus ambulance hotline. Refuses unverified pharmaceuticals; relies strictly on standard tourniquet and pressure dressings."
  }
];

export function AegisLiveTelemetry() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);

  return (
    <div className="space-y-4">
      {/* GDACS Satellite Stream Header */}
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5">
        <div className="flex items-center justify-between font-mono text-xs mb-2">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
            <span className="font-bold text-[var(--fg)]">GDACS Telemetry Feed</span>
          </div>
          <span className="rounded bg-rose-500/20 text-rose-400 px-2 py-0.5 text-[10px] font-bold">
            LIVE SATELLITE
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          {SAMPLE_HAZARDS.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between rounded-lg bg-[var(--surface)] px-2.5 py-1.5 border border-[var(--line)]"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    h.severity === "Red" ? "bg-rose-500 animate-ping" : "bg-amber-400"
                  }`}
                />
                <span className="font-bold text-[var(--fg)]">{h.type}:</span>
                <span className="text-[var(--muted)]">{h.location}</span>
              </div>
              <span className="text-[10px] text-[var(--muted)] hidden sm:inline">
                {h.telemetry}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Grounded NDMA RAG Simulator */}
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-bold text-[var(--fg)]">NDMA / FEMA RAG Engine</span>
          </div>
          <span className="text-[10px] text-[var(--muted)]">Gemini 2.5 Flash</span>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {RAG_PRESETS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPreset(idx)}
              className={`rounded-md px-2 py-1 text-[10px] transition ${
                selectedPreset === idx
                  ? "bg-[var(--accent)] text-[var(--on-accent)] font-bold"
                  : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--line)] hover:text-[var(--fg)]"
              }`}
            >
              {item.q}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className="rounded-lg bg-[var(--paper)] p-3 border border-[var(--line)] text-xs leading-relaxed">
          <div className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider mb-1">
            Grounded Response Protocol:
          </div>
          <p className="text-[var(--fg)]">
            {RAG_PRESETS[selectedPreset].a}
          </p>
        </div>
      </div>
    </div>
  );
}
