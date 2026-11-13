"use client";

import React, { useEffect, useRef } from "react";
import { useSkin } from "@/context/SkinContext";

interface InteractiveGlyphProps {
  text?: string;
  subtext?: string;
}

export function InteractiveGlyph({ text = "SHIVANG GUPTA", subtext }: InteractiveGlyphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { skin } = useSkin();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 960);
    let height = (canvas.height = 110);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 110;
      initPoints();
    };
    window.addEventListener("resize", handleResize);

    // Create an offscreen canvas to sample the text pixels
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    let points: {
      x: number;
      y: number;
      char: string;
      originalChar: string;
      originalX: number;
      originalY: number;
      highlight: number;
    }[] = [];

    const chars = ["0", "1", "•", "■", "▲", "x", "+", "/", "A", "I", "R", "G", "N", "E", "U"];

    const initPoints = () => {
      if (!offCtx) return;
      offscreen.width = width;
      offscreen.height = height;

      offCtx.fillStyle = "#ffffff";
      offCtx.font = "900 48px 'Archivo', -apple-system, sans-serif";
      offCtx.textAlign = "left";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, 12, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      points = [];

      const step = 8; // Grid resolution
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 80) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            points.push({
              x: x,
              y: y,
              char: char,
              originalChar: char,
              originalX: x,
              originalY: y,
              highlight: 0,
            });
          }
        }
      }
    };

    initPoints();

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

      const accentColor =
        skin === "ivory" ? "#8a2432" : skin === "riso" ? "#c81e74" : "#ffb547";
      const baseColor =
        skin === "ivory" ? "#665e52" : skin === "riso" ? "#535e9e" : "#807c74";

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < 70) {
          p.highlight = Math.min(1, p.highlight + 0.2);
          const angle = Math.atan2(dy, dx);
          const force = (70 - dist) * 0.15;
          p.x = p.originalX + Math.cos(angle) * force;
          p.y = p.originalY + Math.sin(angle) * force;

          if (Math.random() < 0.15) {
            p.char = chars[Math.floor(Math.random() * chars.length)];
          }
        } else {
          p.highlight = Math.max(0, p.highlight - 0.04);
          p.x += (p.originalX - p.x) * 0.1;
          p.y += (p.originalY - p.y) * 0.1;

          if (p.highlight <= 0.05) {
            p.char = p.originalChar;
          }
        }

        ctx.font = "bold 9px 'IBM Plex Mono', monospace";
        if (p.highlight > 0.05) {
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = 0.6 + p.highlight * 0.4;
        } else {
          ctx.fillStyle = baseColor;
          ctx.globalAlpha = 0.45;
        }

        ctx.fillText(p.char, p.x, p.y);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [skin, text]);

  return (
    <div className="w-full relative overflow-hidden select-none py-2 cursor-pointer">
      <canvas ref={canvasRef} className="w-full block h-[110px]" />
      {subtext && (
        <span className="font-mono text-[10px] text-[var(--muted)] tracking-wider block mt-1">
          {subtext}
        </span>
      )}
    </div>
  );
}
