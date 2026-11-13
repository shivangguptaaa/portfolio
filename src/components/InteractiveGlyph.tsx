"use client";

import React, { useEffect, useRef } from "react";
import { useSkin } from "@/context/SkinContext";

interface InteractiveGlyphProps {
  text?: string;
}

export function InteractiveGlyph({ text = "SHIVANG GUPTA" }: InteractiveGlyphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { skin } = useSkin();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = 80);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 80;
    };
    window.addEventListener("resize", handleResize);

    // Matrix tokens
    const tokens = ["AI", "RAG", "EEG", "DSP", "PLV", "TBR", "9.22", "CNN", "SIH", "MNE", "01", "10", "FAST", "NODE", "BCI"];
    const charCols = Math.floor(width / 32);
    const charRows = 4;
    const grid: { char: string; x: number; y: number; originalChar: string; highlight: number }[] = [];

    for (let r = 0; r < charRows; r++) {
      for (let c = 0; c < charCols; c++) {
        const token = tokens[(r * charCols + c) % tokens.length];
        grid.push({
          char: token,
          originalChar: token,
          x: c * 34 + 10,
          y: r * 18 + 20,
          highlight: 0
        });
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Accent color based on skin
      const accent =
        skin === "ivory" ? "#8a2432" : skin === "riso" ? "#c81e74" : "#ffb547";
      const muted =
        skin === "ivory" ? "#665e52" : skin === "riso" ? "#535e9e" : "#9b978d";

      grid.forEach((pt) => {
        const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
        if (dist < 60) {
          pt.highlight = Math.min(1, pt.highlight + 0.15);
          if (Math.random() < 0.1) {
            pt.char = tokens[Math.floor(Math.random() * tokens.length)];
          }
        } else {
          pt.highlight = Math.max(0, pt.highlight - 0.05);
          if (pt.highlight <= 0.05) pt.char = pt.originalChar;
        }

        ctx.font = "600 10px 'IBM Plex Mono', monospace";
        if (pt.highlight > 0.1) {
          ctx.fillStyle = accent;
          ctx.globalAlpha = 0.5 + pt.highlight * 0.5;
        } else {
          ctx.fillStyle = muted;
          ctx.globalAlpha = 0.35;
        }

        ctx.fillText(pt.char, pt.x, pt.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [skin, text]);

  return (
    <div className="w-full relative overflow-hidden select-none py-1">
      <canvas ref={canvasRef} className="w-full block h-20" />
    </div>
  );
}
