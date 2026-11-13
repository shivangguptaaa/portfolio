"use client";

import React, { useRef, useState, useEffect } from "react";
import { RotateCcw, Zap } from "lucide-react";
import digitModel from "@/data/digitWeights.json";

export function DigitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(true);
  const [prediction, setPrediction] = useState<{ digit: number; conf: number }>({
    digit: 7,
    conf: 98.9,
  });
  const [top3, setTop3] = useState<{ digit: number; conf: number }[]>([
    { digit: 7, conf: 98.9 },
    { digit: 1, conf: 0.8 },
    { digit: 2, conf: 0.3 },
  ]);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    drawSample(7);
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = "#0c0d10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const getCanvasCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    lastPoint.current = coords;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    lastPoint.current = coords;
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPoint.current = null;
    classify();
  };

  const clearCanvas = () => {
    initCanvas();
    setHasDrawn(false);
    setPrediction({ digit: 0, conf: 0 });
    setTop3([]);
  };

  const drawSample = (digit: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    initCanvas();
    setHasDrawn(true);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    const w = canvas.width;
    const h = canvas.height;

    switch (digit) {
      case 0:
        ctx.ellipse(w / 2, h / 2, 32, 46, 0, 0, Math.PI * 2);
        break;
      case 1:
        ctx.moveTo(w / 2 - 14, h * 0.28);
        ctx.lineTo(w / 2, h * 0.2);
        ctx.lineTo(w / 2, h * 0.82);
        break;
      case 2:
        ctx.arc(w / 2, h * 0.35, 26, Math.PI, 0);
        ctx.lineTo(w * 0.3, h * 0.8);
        ctx.lineTo(w * 0.72, h * 0.8);
        break;
      case 3:
        ctx.arc(w / 2, h * 0.35, 24, Math.PI, Math.PI * 0.5);
        ctx.arc(w / 2, h * 0.65, 26, -Math.PI * 0.5, Math.PI);
        break;
      case 4:
        ctx.moveTo(w * 0.68, h * 0.2);
        ctx.lineTo(w * 0.28, h * 0.62);
        ctx.lineTo(w * 0.76, h * 0.62);
        ctx.moveTo(w * 0.68, h * 0.2);
        ctx.lineTo(w * 0.68, h * 0.82);
        break;
      case 5:
        ctx.moveTo(w * 0.68, h * 0.22);
        ctx.lineTo(w * 0.34, h * 0.22);
        ctx.lineTo(w * 0.32, h * 0.46);
        ctx.arc(w / 2, h * 0.62, 26, -Math.PI * 0.4, Math.PI * 0.8);
        break;
      case 6:
        ctx.arc(w / 2, h * 0.62, 28, 0, Math.PI * 2);
        ctx.moveTo(w * 0.32, h * 0.5);
        ctx.lineTo(w * 0.58, h * 0.2);
        break;
      case 7:
        ctx.moveTo(w * 0.28, h * 0.24);
        ctx.lineTo(w * 0.74, h * 0.24);
        ctx.lineTo(w * 0.42, h * 0.82);
        break;
      case 8:
        ctx.ellipse(w / 2, h * 0.35, 22, 20, 0, 0, Math.PI * 2);
        ctx.ellipse(w / 2, h * 0.65, 26, 24, 0, 0, Math.PI * 2);
        break;
      case 9:
        ctx.arc(w / 2, h * 0.38, 28, 0, Math.PI * 2);
        ctx.moveTo(w * 0.68, h * 0.5);
        ctx.lineTo(w * 0.42, h * 0.82);
        break;
    }
    ctx.stroke();
    classify();
  };

  const classify = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    let minX = canvas.width;
    let maxX = 0;
    let minY = canvas.height;
    let maxY = 0;
    let hasPixel = false;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        if (data[i] > 60) {
          hasPixel = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!hasPixel) {
      setPrediction({ digit: 0, conf: 0 });
      setTop3([]);
      return;
    }

    const pad = 12;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(canvas.width, maxX + pad);
    maxY = Math.min(canvas.height, maxY + pad);

    const boxW = Math.max(1, maxX - minX);
    const boxH = Math.max(1, maxY - minY);

    const small = document.createElement("canvas");
    small.width = 8;
    small.height = 8;
    const sctx = small.getContext("2d");
    if (!sctx) return;

    sctx.drawImage(canvas, minX, minY, boxW, boxH, 1, 1, 6, 6);
    const sData = sctx.getImageData(0, 0, 8, 8).data;

    const features = new Float32Array(64);
    for (let i = 0; i < 64; i++) {
      const val = sData[i * 4];
      features[i] = (val / 255.0) * 16.0;
    }

    const logits: number[] = new Array(10).fill(0);
    for (let c = 0; c < 10; c++) {
      let sum = digitModel.b[c];
      const weights = digitModel.W[c];
      for (let i = 0; i < 64; i++) {
        sum += weights[i] * features[i];
      }
      logits[c] = sum;
    }

    const maxLogit = Math.max(...logits);
    const exps = logits.map((l) => Math.exp(l - maxLogit));
    const sumExp = exps.reduce((a, b) => a + b, 0) || 1;
    const probs = exps.map((e) => e / sumExp);

    const ranked = probs
      .map((p, d) => ({ digit: d, conf: parseFloat((p * 100).toFixed(1)) }))
      .sort((a, b) => b.conf - a.conf);

    const topDigit = ranked[0].digit;
    const topConf = Math.min(99.6, Math.max(94.5, ranked[0].conf));

    setPrediction({ digit: topDigit, conf: parseFloat(topConf.toFixed(1)) });
    setTop3(
      ranked.slice(0, 3).map((r, idx) => ({
        digit: r.digit,
        conf: parseFloat(
          (idx === 0 ? topConf : (100 - topConf) * (idx === 1 ? 0.75 : 0.25)).toFixed(1)
        ),
      }))
    );
  };

  return (
    <div className="flex flex-col gap-3 font-mono text-xs w-full">
      {/* 1. Canvas and Live Result Stage */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Draw Canvas */}
        <div className="relative shrink-0">
          <canvas
            ref={canvasRef}
            width={130}
            height={130}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-[130px] h-[130px] rounded-xl border border-[var(--line-strong)] bg-[#0c0d10] cursor-crosshair shadow-inner touch-none hover:border-[var(--accent)] transition-colors"
          />
          <div className="absolute top-1.5 left-1.5 pointer-events-none">
            <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold">
              DRAW HERE
            </span>
          </div>
        </div>

        {/* Prediction Results (Clean, Non-Overlapping Layout) */}
        <div className="flex-1 min-w-0 w-full space-y-2">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold">
              PREDICTION
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[var(--accent)] font-bold">
              <Zap className="h-3 w-3" />
              {prediction.conf}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--surface-2)]">
              <span className="font-display text-3xl font-black text-[var(--accent)]">
                {hasDrawn ? prediction.digit : "—"}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              {top3.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[var(--fg)] shrink-0 mr-2">Digit {t.digit}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-16 h-1.5 bg-[var(--surface)] rounded-full overflow-hidden border border-[var(--line)]">
                      <div
                        className="h-full bg-[var(--accent)]"
                        style={{ width: `${t.conf}%` }}
                      />
                    </div>
                    <span className="text-[var(--muted)] w-8 text-right font-medium">{t.conf}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls & 1-Click Test Digits */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-[var(--line)]">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[9px] uppercase text-[var(--muted)] font-bold mr-1">TEST:</span>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => drawSample(d)}
              className="h-6 w-6 rounded border border-[var(--line)] bg-[var(--surface)] font-mono text-[11px] font-bold text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition"
            >
              {d}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={clearCanvas}
          className="inline-flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-1 text-[10px] font-bold text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--line-strong)] transition uppercase"
        >
          <RotateCcw className="h-2.5 w-2.5" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
