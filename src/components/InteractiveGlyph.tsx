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
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1024);
    let height = (canvas.height = Math.min(220, Math.max(140, Math.floor(width * 0.16))));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(220, Math.max(140, Math.floor(width * 0.16)));
      initPoints();
    };
    window.addEventListener("resize", handleResize);

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

    const chars = ["#", "0", "1", "■", "▲", "x", "+", "/", "A", "I", "R", "G", "N", "E", "U", "V", "O", "S", "H"];

    const initPoints = () => {
      if (!offCtx) return;
      offscreen.width = width;
      offscreen.height = height;

      // Draw text large enough to fill width
      const fontSize = Math.min(140, Math.max(64, Math.floor(width / (text.length * 0.65))));
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `900 ${fontSize}px 'Archivo', -apple-system, sans-serif`;
      offCtx.textAlign = "left";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, 10, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      points = [];

      const step = width < 640 ? 7 : 8;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 70) {
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
        skin === "ivory" ? "#4a4237" : skin === "riso" ? "#2d3a9e" : "#dedad2";

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < 90) {
          p.highlight = Math.min(1, p.highlight + 0.25);
          const angle = Math.atan2(dy, dx);
          const force = (90 - dist) * 0.25;
          p.x = p.originalX + Math.cos(angle) * force;
          p.y = p.originalY + Math.sin(angle) * force;

          if (Math.random() < 0.2) {
            p.char = chars[Math.floor(Math.random() * chars.length)];
          }
        } else {
          p.highlight = Math.max(0, p.highlight - 0.05);
          p.x += (p.originalX - p.x) * 0.12;
          p.y += (p.originalY - p.y) * 0.12;

          if (p.highlight <= 0.05) {
            p.char = p.originalChar;
          }
        }

        ctx.font = "900 11px 'IBM Plex Mono', monospace";
        if (p.highlight > 0.05) {
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = 0.8 + p.highlight * 0.2;
        } else {
          ctx.fillStyle = baseColor;
          ctx.globalAlpha = 0.75;
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
    <div className="w-full relative overflow-hidden select-none py-2 cursor-crosshair">
      <canvas ref={canvasRef} className="w-full block" />
      {subtext && (
        <span className="font-mono text-[11px] text-[var(--muted)] tracking-wider block mt-1 uppercase font-semibold">
          {subtext}
        </span>
      )}
    </div>
  );
}
