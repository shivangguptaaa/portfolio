"use client";

import React, { useEffect, useRef, useState } from "react";
import { Brain, Play, RefreshCw, Zap, Sparkles, Activity, Layers, ExternalLink, GitBranch, Cpu } from "lucide-react";
import confetti from "canvas-confetti";

export function BciSimulatorCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mentalState, setMentalState] = useState<"rest" | "arithmetic">("arithmetic");
  const [focusFuel, setFocusFuel] = useState<number>(68);
  const [thetaBetaRatio, setThetaBetaRatio] = useState<number>(1.84);
  const [plvMetric, setPlvMetric] = useState<number>(0.72);
  const [score, setScore] = useState<number>(0);
  const [jumpMessage, setJumpMessage] = useState<string | null>(null);

  // Mini-game physics inside canvas
  const gameStateRef = useRef({
    playerY: 140,
    velocity: 0,
    isJumping: false,
    obstacleX: 420,
    score: 0,
  });

  // Animation frame loop for EEG Waveforms + Mini-game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      // Clear background
      ctx.fillStyle = "rgba(18, 19, 21, 0.95)";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 1. Draw 3 Multi-Channel EEG Traces: Fz (Frontal), Cz (Central), Pz (Parietal)
      const channels = [
        { name: "Fz (Frontal)", baseOffset: 35, color: "#ffb547", freq: mentalState === "arithmetic" ? 22 : 9, amp: mentalState === "arithmetic" ? 14 : 7 },
        { name: "Cz (Central)", baseOffset: 75, color: "#10b981", freq: mentalState === "arithmetic" ? 18 : 10, amp: mentalState === "arithmetic" ? 11 : 8 },
        { name: "Pz (Parietal)", baseOffset: 115, color: "#38bdf8", freq: mentalState === "arithmetic" ? 25 : 8, amp: mentalState === "arithmetic" ? 16 : 9 },
      ];

      channels.forEach((ch) => {
        // Channel Label
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "10px monospace";
        ctx.fillText(ch.name, 10, ch.baseOffset - 8);

        // Draw waveform
        ctx.beginPath();
        ctx.strokeStyle = ch.color;
        ctx.lineWidth = 1.5;

        for (let x = 80; x < width - 150; x++) {
          const t = time + x * 0.04;
          // Composite EEG oscillation: Primary carrier wave + harmonic + slight noise
          const wave1 = Math.sin(t * (ch.freq * 0.25)) * ch.amp;
          const wave2 = Math.cos(t * 1.8) * (ch.amp * 0.4);
          const noise = (Math.sin(x * 12.3 + time * 5) % 1) * 2;
          const y = ch.baseOffset + wave1 + wave2 + noise;

          if (x === 80) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // 2. Mini Runner Preview on the right side of the canvas
      const subX = width - 135;
      const groundY = 150;

      // Divider line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(subX - 10, 10);
      ctx.lineTo(subX - 10, height - 10);
      ctx.stroke();

      // Ground
      ctx.strokeStyle = "#3b3c42";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(subX, groundY);
      ctx.lineTo(width - 10, groundY);
      ctx.stroke();

      // Update Player Gravity
      const gs = gameStateRef.current;
      gs.velocity += 0.8;
      gs.playerY += gs.velocity;
      if (gs.playerY >= groundY - 18) {
        gs.playerY = groundY - 18;
        gs.velocity = 0;
        gs.isJumping = false;
      }

      // Move obstacle
      gs.obstacleX -= 2.2;
      if (gs.obstacleX < subX) {
        gs.obstacleX = width - 15;
        gs.score += 1;
        setScore(gs.score);
      }

      // Draw obstacle
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(gs.obstacleX, groundY - 16, 8, 16);

      // Draw Player Character (Focus Jumper avatar)
      ctx.fillStyle = focusFuel >= 35 ? "#10b981" : "#ef4444";
      ctx.beginPath();
      ctx.roundRect(subX + 20, gs.playerY - 16, 16, 16, [4]);
      ctx.fill();

      // Player eye
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(subX + 31, gs.playerY - 9, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Mini game label
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "9px monospace";
      ctx.fillText("NEURO-JUMPER", subX + 15, 20);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [mentalState, focusFuel]);

  // Handle Jump Action (Consumes Focus Fuel if >= 35)
  const handleJump = () => {
    const gs = gameStateRef.current;
    if (gs.isJumping) return;

    if (focusFuel >= 35) {
      gs.velocity = -10;
      gs.isJumping = true;
      setFocusFuel((prev) => Math.max(0, prev - 35));
      setJumpMessage("SUCCESSFUL NEURAL JUMP! (-35 Fuel)");
      setTimeout(() => setJumpMessage(null), 1800);
    } else {
      setJumpMessage("INSUFFICIENT FOCUS FUEL! Need ≥35%");
      setTimeout(() => setJumpMessage(null), 1800);
    }
  };

  // Switch state: Rest vs Arithmetic
  const toggleState = (newState: "rest" | "arithmetic") => {
    setMentalState(newState);
    if (newState === "arithmetic") {
      setThetaBetaRatio(1.84);
      setPlvMetric(0.78);
      setFocusFuel(85);
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
    } else {
      setThetaBetaRatio(0.48);
      setPlvMetric(0.31);
      setFocusFuel(20);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 transition-all hover:border-[var(--accent-border)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-xl font-bold tracking-tight text-[var(--fg)]">
                Focus Jumper / NeuralFocus BCI
              </h3>
              <span className="rounded-full bg-[var(--badge-bg)] px-2.5 py-0.5 text-xs font-mono font-semibold text-[var(--badge-text)]">
                DEEP-DIVE CASE STUDY
              </span>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Closed-loop neurofeedback arcade runner powered by clinical EEG spectral analysis
            </p>
          </div>
        </div>

        <a
          href="https://github.com/shivangguptaaa/bci-model"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <GitBranch className="h-3.5 w-3.5" />
          <span>Source Repo</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </div>

      {/* Interactive Simulation Area */}
      <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[var(--muted)]">Simulated Subject:</span>
            <div className="inline-flex rounded-md border border-[var(--line)] bg-[var(--surface)] p-0.5">
              <button
                type="button"
                onClick={() => toggleState("rest")}
                className={`rounded px-2.5 py-1 transition-colors ${
                  mentalState === "rest" ? "bg-[var(--accent)] text-[var(--on-accent)] font-semibold" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                Subject 01 (Rest State)
              </button>
              <button
                type="button"
                onClick={() => toggleState("arithmetic")}
                className={`rounded px-2.5 py-1 transition-colors ${
                  mentalState === "arithmetic" ? "bg-[var(--accent)] text-[var(--on-accent)] font-semibold" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                Subject 01 (Arithmetic Task)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleJump}
              className="flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 font-semibold text-[var(--on-accent)] shadow transition hover:opacity-90 active:scale-95"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>TEST JUMP (Space)</span>
            </button>
            <span className="text-[var(--muted)]">Score: <strong className="text-[var(--fg)]">{score}</strong></span>
          </div>
        </div>

        {/* Live Canvas Waveform Display */}
        <div className="relative mt-3 overflow-hidden rounded-lg border border-[var(--line)] bg-[#0d0e10]">
          <canvas
            ref={canvasRef}
            width={640}
            height={160}
            className="w-full h-[160px] block"
          />

          {jumpMessage && (
            <div
              className={`absolute top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-xs font-semibold shadow-lg backdrop-blur ${
                jumpMessage.includes("SUCCESSFUL")
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-red-500/20 text-red-400 border border-red-500/40"
              }`}
            >
              {jumpMessage}
            </div>
          )}
        </div>

        {/* Real-Time Telemetry Bar */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5">
            <span className="text-[var(--muted)] block">Cognitive State:</span>
            <span className={`font-bold ${mentalState === "arithmetic" ? "text-amber-400" : "text-sky-400"}`}>
              {mentalState === "arithmetic" ? "HIGH MENTAL STRAIN" : "RELAXED / BASELINE"}
            </span>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5">
            <span className="text-[var(--muted)] block">Theta/Beta (TBR):</span>
            <span className="font-bold text-[var(--fg)]">{thetaBetaRatio.toFixed(2)}x Power</span>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5">
            <span className="text-[var(--muted)] block">Alpha PLV Matrix:</span>
            <span className="font-bold text-[var(--fg)]">{plvMetric.toFixed(2)} Sync</span>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Focus Fuel:</span>
              <span className="font-bold text-[var(--accent)]">{focusFuel}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-300"
                style={{ width: `${focusFuel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Deep-Dive Architecture & Refusals */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--fg)] uppercase tracking-wider">
            <Cpu className="h-4 w-4 text-[var(--accent)]" />
            <span>Signal Processing Pipeline</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs text-[var(--muted)] leading-relaxed">
            <li>
              • <strong className="text-[var(--fg)]">Clinical Dataset:</strong> 36 human subjects recorded at 500 Hz across 19 scalp channels during rest vs mental arithmetic (PhysioNet).
            </li>
            <li>
              • <strong className="text-[var(--fg)]">Frequency Extraction:</strong> Welch’s Power Spectral Density extracts Theta ($\theta$: 4–8 Hz) and Beta ($\beta$: 13–30 Hz) power.
            </li>
            <li>
              • <strong className="text-[var(--fg)]">Functional Connectivity:</strong> Multi-channel Phase Locking Value (PLV) via Hilbert transform across frontal-parietal electrodes.
            </li>
            <li>
              • <strong className="text-[var(--fg)]">Closed-Loop Game:</strong> Pygame engine reads epoch sliding windows to accumulate "Focus Fuel" when user enters sustained attention.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--fg)] uppercase tracking-wider">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>Deterministic Guarantees & Refusals</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs text-[var(--muted)] leading-relaxed">
            <li>
              • <strong className="text-[var(--fg)]">No Synthetic Artifacts:</strong> Trained exclusively on real clinical EDF traces, never simulated random Gaussian noise.
            </li>
            <li>
              • <strong className="text-[var(--fg)]">Strict Bandpass:</strong> 1–40 Hz FIR filtering eliminates DC baseline drifts and 50 Hz powerline contamination before inference.
            </li>
            <li>
              • <strong className="text-[var(--fg)]">Zero Cloud Latency:</strong> Model inference executes under 2ms locally via joblib estimators without cloud egress.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
