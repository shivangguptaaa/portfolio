"use client";

import React, { useEffect, useRef } from "react";
import { useSkin } from "@/context/SkinContext";

interface InteractiveGlyphProps {
  text?: string;
  subtext?: string;
  isHero?: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  char: string;
  originalChar: string;
  size: number;
  depth: number;
  active: number;
}

export function InteractiveGlyph({ text = "Shivang Gupta", subtext, isHero = false }: InteractiveGlyphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { skin } = useSkin();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const glyphChars = ["#", "■", "▲", "x", "+", "/", "0", "1", "S", "G", "A", "I", "R", "N", "E", "•", "░", "▒"];

    // Target dimensions
    let dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let displayWidth = container.clientWidth || 960;
    // Hero gets 220px on desktop, 170px on mobile; Subpages get 140px on desktop, 110px on mobile
    let displayHeight = isHero ? (displayWidth < 640 ? 170 : 230) : (displayWidth < 640 ? 110 : 140);

    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      displayWidth = container.clientWidth || 960;
      displayHeight = isHero ? (displayWidth < 640 ? 170 : 230) : (displayWidth < 640 ? 110 : 140);

      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      // Render text to offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = displayWidth;
      offscreen.height = displayHeight;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.clearRect(0, 0, displayWidth, displayHeight);
      offCtx.fillStyle = "#ffffff";
      offCtx.textBaseline = "middle";

      const isMobile = displayWidth < 640;

      if (isMobile && text.includes(" ")) {
        // Multi-line on small mobile screens
        const words = text.split(" ");
        const fontSize = Math.min(64, Math.max(34, Math.floor(displayWidth / 6.5)));
        offCtx.font = `900 ${fontSize}px Archivo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        offCtx.textAlign = "left";
        offCtx.fillText(words[0], 6, displayHeight * 0.32);
        offCtx.fillText(words.slice(1).join(" "), 6, displayHeight * 0.74);
      } else {
        // Single line
        const maxLen = text.length;
        const fontScale = isHero ? 0.72 : 0.65;
        const fontSize = Math.min(
          isHero ? 130 : 96,
          Math.max(38, Math.floor(displayWidth / (maxLen * fontScale)))
        );
        offCtx.font = `900 ${fontSize}px Archivo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        offCtx.textAlign = "left";
        // Place vertically centered with descender allowance
        offCtx.fillText(text, 6, displayHeight * 0.52);
      }

      const imgData = offCtx.getImageData(0, 0, displayWidth, displayHeight);
      const data = imgData.data;
      particles = [];

      // Grid sampling step
      const step = isMobile ? 6 : (isHero ? 7 : 6);

      for (let y = 0; y < displayHeight; y += step) {
        for (let x = 0; x < displayWidth; x += step) {
          const index = (y * displayWidth + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 45) {
            const char = glyphChars[Math.floor(Math.random() * glyphChars.length)];
            const depth = 0.6 + Math.random() * 0.8; // creates realistic 3D depth parallax
            particles.push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              char: char,
              originalChar: char,
              size: Math.random() > 0.85 ? 11 : 9.5,
              depth: depth,
              active: 0,
            });
          }
        }
      }
    };

    initGrid();

    // ResizeObserver for zero-lag responsiveness
    const resizeObserver = new ResizeObserver(() => {
      initGrid();
    });
    resizeObserver.observe(container);

    let mouseX = -10000;
    let mouseY = -10000;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const onMouseLeave = () => {
      mouseX = -10000;
      mouseY = -10000;
      isHovering = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Color definitions based on skin
    const getColors = () => {
      if (skin === "ivory") {
        return {
          base: "#665e52",
          dim: "#8d8475",
          accent: "#8a2432",
          glow: "rgba(138, 36, 50, 0.4)",
        };
      }
      if (skin === "riso") {
        return {
          base: "#1d2a8a",
          dim: "#535e9e",
          accent: "#c81e74",
          glow: "rgba(200, 30, 116, 0.45)",
        };
      }
      // phosphor
      return {
        base: "#dcd7cb",
        dim: "#88847b",
        accent: "#ffb547",
        glow: "rgba(255, 181, 71, 0.5)",
      };
    };

    const render = () => {
      const colors = getColors();

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Set base font once
      ctx.font = "bold 10px 'IBM Plex Mono', monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const radius = 95;
      const radiusSq = radius * radius;

      // Group 1: inactive particles
      // Group 2: active particles (drawn on top with accent color)
      const activeParticles: Particle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isHovering) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = (radius - dist) / radius;
            const angle = Math.atan2(dy, dx);

            // Smooth spring impulse
            p.vx += Math.cos(angle) * force * 1.8 * p.depth;
            p.vy += Math.sin(angle) * force * 1.8 * p.depth;
            p.active = Math.min(1, p.active + 0.35);

            if (Math.random() < 0.2) {
              p.char = glyphChars[Math.floor(Math.random() * glyphChars.length)];
            }
          }
        }

        // Spring back to origin with damping
        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx = (p.vx + ox * 0.12) * 0.76;
        p.vy = (p.vy + oy * 0.12) * 0.76;
        p.x += p.vx;
        p.y += p.vy;

        if (p.active > 0) {
          p.active = Math.max(0, p.active - 0.035);
          if (p.active <= 0.05) {
            p.char = p.originalChar;
          }
        }

        if (p.active > 0.08) {
          activeParticles.push(p);
        } else {
          // Draw standard particle
          ctx.fillStyle = colors.base;
          ctx.globalAlpha = 0.72;
          ctx.fillText(p.char, p.x, p.y);
        }
      }

      // Render active / hovered particles with glowing accent
      if (activeParticles.length > 0) {
        ctx.fillStyle = colors.accent;
        for (let j = 0; j < activeParticles.length; j++) {
          const p = activeParticles[j];
          ctx.globalAlpha = 0.85 + p.active * 0.15;
          ctx.fillText(p.char, p.x, p.y);
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [skin, text, isHero]);

  return (
    <div ref={containerRef} className="w-full relative select-none py-1 cursor-crosshair">
      <canvas ref={canvasRef} className="w-full block" />
      {subtext && (
        <span className="font-mono text-[11px] sm:text-xs text-[var(--muted)] tracking-wider block mt-1 uppercase font-semibold">
          {subtext}
        </span>
      )}
    </div>
  );
}
