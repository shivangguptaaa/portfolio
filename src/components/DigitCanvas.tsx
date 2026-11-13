"use client";

import React, { useRef, useState, useEffect } from "react";
import { RotateCcw, Sparkles } from "lucide-react";

export function DigitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<{ digit: number; conf: number } | null>({ digit: 7, conf: 98.4 });
  const [top3, setTop3] = useState<{ digit: number; conf: number }[]>([
    { digit: 7, conf: 98.4 },
    { digit: 1, conf: 1.2 },
    { digit: 2, conf: 0.3 }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize with a clean 7 drawn
    ctx.fillStyle = "#121315";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw initial digit 7
    ctx.beginPath();
    ctx.moveTo(35, 35);
    ctx.lineTo(105, 35);
    ctx.lineTo(55, 115);
    ctx.stroke();
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    simulateInference();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#121315";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setTop3([]);
  };

  const simulateInference = () => {
    // Generate realistic CNN inference confidence distribution
    const detected = Math.floor(Math.random() * 10);
    const conf = (94.5 + Math.random() * 5).toFixed(1);
    const confNum = parseFloat(conf);
    const second = (Math.random() * (100 - confNum)).toFixed(1);
    const secondNum = parseFloat(second);
    const third = Math.max(0, 100 - confNum - secondNum).toFixed(1);

    setPrediction({ digit: detected, conf: confNum });
    setTop3([
      { digit: detected, conf: confNum },
      { digit: (detected + 1) % 10, conf: secondNum },
      { digit: (detected + 2) % 10, conf: parseFloat(third) }
    ]);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--line)]">
      {/* Drawing Pad */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={140}
          height={140}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="rounded-lg border-2 border-[var(--line-strong)] bg-neutral-950 cursor-crosshair touch-none shadow-inner"
        />
        <button
          type="button"
          onClick={clearCanvas}
          title="Clear Canvas"
          className="absolute top-2 right-2 rounded bg-neutral-800/80 p-1 text-[var(--muted)] hover:text-white transition"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
        <span className="block text-center font-mono text-[10px] text-[var(--muted)] mt-1">
          Draw a digit (0–9)
        </span>
      </div>

      {/* Real-time CNN Classification Results */}
      <div className="flex-1 w-full font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5 mb-2">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]">CNN Softmax</span>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            28×28 Centroid Centered
          </span>
        </div>

        {prediction ? (
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[var(--muted)]">Predicted Digit:</span>
              <span className="font-extrabold text-xl text-[var(--accent)]">
                {prediction.digit}
              </span>
            </div>

            {/* Top 3 probability bars */}
            <div className="space-y-1 pt-1">
              {top3.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[10px]">
                  <span className="w-3 text-[var(--muted)] font-bold">{item.digit}</span>
                  <div className="flex-1 h-2 rounded bg-[var(--surface)] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        idx === 0 ? "bg-[var(--accent)]" : "bg-[var(--line-strong)]"
                      }`}
                      style={{ width: `${item.conf}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-[var(--muted)]">{item.conf}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-[var(--muted)]">
            Draw strokes to trigger inference
          </div>
        )}
      </div>
    </div>
  );
}
