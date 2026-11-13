"use client";

import React, { useEffect, useRef } from "react";
import { useSkin } from "@/context/SkinContext";

interface InteractiveGlyphProps {
  text?: string;
  words?: string[];
  subtext?: string;
  isHero?: boolean;
  className?: string;
  idle?: boolean;
  id?: string;
}

const TOKEN_STRING =
  "agent·token·context·PyTorch·FastAPI·Next.js·React·prompt·pipeline·EEG·Python·MongoDB·Aegis·redact·snapshot·forecast·JWT·Node·schema·vector·MCP·NDMA·diff·XGBoost·Supabase·Groq·";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/{}[]$@";
const ATLAS_CHARS = Array.from(new Set((TOKEN_STRING + SCRAMBLE_CHARS + " ").split("")));
const CHAR_MAP: Record<string, number> = {};
ATLAS_CHARS.forEach((char, idx) => {
  CHAR_MAP[char] = idx;
});

class GlyphRenderer {
  host: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  words: string[];
  idle: boolean;
  pointer: { x: number; y: number } | null = null;
  waves: { x: number; y: number; r: number; power: number; max: number }[] = [];
  running = false;
  visible = true;
  dead = false;
  t0: number;
  awakeUntil = 0;
  w = 0;
  h = 0;
  n = 0;
  dpr = 1;
  cw = 0;
  ch = 0;
  fs = 0;

  hx = new Float32Array(0);
  hy = new Float32Array(0);
  x = new Float32Array(0);
  y = new Float32Array(0);
  vx = new Float32Array(0);
  vy = new Float32Array(0);
  kind = new Uint8Array(0);
  fin = new Uint16Array(0);
  cur = new Uint16Array(0);
  flick = new Uint8Array(0);
  heat = new Float32Array(0);
  lock = new Float32Array(0);
  bright: number[] = [];
  atlas: HTMLCanvasElement | null = null;
  cellTint = "#000";
  cleanups: (() => void)[] = [];

  constructor(host: HTMLElement, wordsList: string[], isIdle: boolean = false) {
    this.host = host;
    this.words = wordsList.length > 0 ? wordsList : ["SHIVANG", "GUPTA"];
    this.idle = isIdle;
    this.canvas = host.querySelector("canvas") as HTMLCanvasElement;
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
      host.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d")!;
    this.t0 = this.idle ? performance.now() - 5000 : performance.now();

    const getPos = (e: MouseEvent | PointerEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const wake = (duration: number) => {
      this.awakeUntil = duration === Infinity ? Infinity : performance.now() + duration;
      this.sync();
    };

    const addEvt = (
      el: EventTarget,
      evt: string,
      fn: (e: any) => void,
      opts?: boolean | AddEventListenerOptions
    ) => {
      el.addEventListener(evt, fn, opts);
      this.cleanups.push(() => el.removeEventListener(evt, fn, opts));
    };

    addEvt(host, "pointerenter", () => wake(Infinity));
    addEvt(host, "pointermove", (e: PointerEvent) => {
      this.pointer = getPos(e);
      if (this.awakeUntil !== Infinity) wake(Infinity);
    });
    addEvt(host, "pointerleave", () => {
      this.pointer = null;
      wake(1600);
    });
    addEvt(host, "pointerup", (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        this.pointer = null;
        wake(1600);
      }
    });
    addEvt(host, "click", (e: MouseEvent) => {
      const p = getPos(e);
      this.pulse(p.x, p.y);
      wake(2200);
    });

    addEvt(window, "resize", () => this.layout());
    addEvt(document, "visibilitychange", () => this.sync());

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => this.layout());
      ro.observe(host);
      this.cleanups.push(() => ro.disconnect());
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
        if (this.visible && !this.n) this.layout();
        this.sync();
      });
      io.observe(host);
      this.cleanups.push(() => io.disconnect());
    }

    this.layout();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!this.dead) this.layout();
      });
    }
  }

  destroy() {
    this.dead = true;
    this.running = false;
    this.cleanups.forEach((fn) => fn());
  }

  layout() {
    if (this.dead || !this.host) return;
    const rect = this.host.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    if (width < 8 || height < 8) {
      this.n = 0;
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = width;
    this.h = height;
    this.dpr = dpr;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const r = width < 520 ? 7 : width < 1000 ? 8 : 9;
    const c = Math.round(1.65 * r);
    this.cw = r;
    this.ch = c;
    this.fs = Math.round(0.8 * c);

    const cols = Math.floor(width / r);
    const rows = Math.floor(height / c);
    const offsetX = (width - cols * r) / 2 + r / 2;
    const offsetY = (height - rows * c) / 2 + c / 2;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    const fontDisplay =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display") ||
      "Archivo, -apple-system, sans-serif";

    offCtx.font = "900 100px " + fontDisplay;
    const fontMetricHeight = (offCtx.measureText("H").actualBoundingBoxAscent || 72) / 100;

    const arrangements: string[][] = [[this.words.join(" ")]];
    if (this.words.length > 1) {
      arrangements.push(this.words);
    }

    let chosenArrangement = arrangements[0];
    let maxFontSize = 0;

    arrangements.forEach((lines) => {
      let maxLineWidth = 0;
      lines.forEach((line) => {
        maxLineWidth = Math.max(maxLineWidth, offCtx.measureText(line).width);
      });
      const candidateSize = Math.min(
        ((0.86 * width) / maxLineWidth) * 100,
        (0.86 * height) / (lines.length * fontMetricHeight + (lines.length - 1) * 0.15)
      );
      if (candidateSize > maxFontSize) {
        maxFontSize = candidateSize;
        chosenArrangement = lines;
      }
    });

    offCtx.font = `900 ${maxFontSize}px ${fontDisplay}`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "alphabetic";
    offCtx.fillStyle = "#000";

    const lineHeight = fontMetricHeight * maxFontSize;
    let textY =
      (height -
        (chosenArrangement.length * lineHeight +
          (chosenArrangement.length - 1) * 0.17 * maxFontSize)) /
        2 +
      lineHeight;

    chosenArrangement.forEach((line) => {
      offCtx.fillText(line, width / 2, textY);
      textY += lineHeight + 0.17 * maxFontSize;
    });

    const imgData = offCtx.getImageData(0, 0, width, height).data;
    const posX: number[] = [];
    const posY: number[] = [];
    const isLetter: number[] = [];
    const charIndices: number[] = [];
    let tokenIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const px = offsetX + col * r;
        const py = offsetY + row * c;
        const alpha = imgData[((0 | py) * width + (0 | px)) * 4 + 3];

        if (alpha > 70) {
          posX.push(px);
          posY.push(py);
          isLetter.push(1);
          const char = TOKEN_STRING.charAt(tokenIndex++ % TOKEN_STRING.length);
          charIndices.push(CHAR_MAP[char] ?? 0);
        } else if (row % 3 === 0) {
          // Sparse background text every 3rd row only
          const bgChar = TOKEN_STRING.charAt((col + 13 * row) % TOKEN_STRING.length);
          if (bgChar !== "·") {
            posX.push(px);
            posY.push(py);
            isLetter.push(0);
            charIndices.push(CHAR_MAP[bgChar] ?? 0);
          }
        }
      }
    }

    const total = posX.length;
    this.n = total;
    this.hx = new Float32Array(posX);
    this.hy = new Float32Array(posY);
    this.x = new Float32Array(posX);
    this.y = new Float32Array(posY);
    this.vx = new Float32Array(total);
    this.vy = new Float32Array(total);
    this.kind = new Uint8Array(isLetter);
    this.fin = new Uint16Array(charIndices);
    this.cur = new Uint16Array(charIndices);
    this.flick = new Uint8Array(total);
    this.heat = new Float32Array(total);
    this.lock = new Float32Array(total);
    this.bright = [];

    for (let i = 0; i < total; i++) {
      if (isLetter[i]) this.bright.push(i);
      this.lock[i] = 120 + (posX[i] / width) * 900 + 220 * Math.random();
    }

    this.buildAtlas();
    this.draw();
    this.host.classList.add("ready");
    this.sync();
  }

  buildAtlas() {
    if (!this.cw) return;
    const { dpr, cw, ch, fs } = this;
    const atlas = document.createElement("canvas");
    atlas.width = Math.ceil(ATLAS_CHARS.length * cw * dpr);
    atlas.height = Math.ceil(3 * ch * dpr);
    const actx = atlas.getContext("2d");
    if (!actx) return;

    actx.scale(dpr, dpr);
    const fontMono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace";

    actx.textAlign = "center";
    actx.textBaseline = "middle";

    const mutedColor =
      getComputedStyle(document.documentElement).getPropertyValue("--muted") || "#9b978d";
    const fgColor =
      getComputedStyle(document.documentElement).getPropertyValue("--fg") || "#ece8df";
    const accentColor =
      getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#ffb547";

    [mutedColor, fgColor, accentColor].forEach((color, rowIdx) => {
      actx.font = (rowIdx ? "800 " : "400 ") + fs + "px " + fontMono;
      actx.fillStyle = color;
      ATLAS_CHARS.forEach((char, charIdx) => {
        actx.fillText(char, charIdx * cw + cw / 2, rowIdx * ch + ch / 2 + 0.5);
      });
    });

    this.atlas = atlas;
    this.cellTint = fgColor;
  }

  pulse(px: number, py: number) {
    this.waves.push({
      x: px,
      y: py,
      r: 0,
      power: 6.5,
      max: Math.hypot(this.w, this.h),
    });
    if (this.waves.length > 3) this.waves.shift();
    this.sync();
  }

  replay() {
    this.t0 = performance.now();
    this.pulse(this.w / 2, this.h / 2);
  }

  sync() {
    if (this.dead) return;
    const isAwake = !this.idle || performance.now() < this.awakeUntil;
    const canRun = this.n > 0 && this.visible && !document.hidden && isAwake;

    if (canRun && !this.running) {
      this.running = true;
      const loop = (timestamp: number) => {
        if (this.running) {
          if (this.idle && timestamp > this.awakeUntil) {
            this.running = false;
            this.settle();
            this.draw();
            return;
          }
          this.step(timestamp);
          this.draw();
          requestAnimationFrame(loop);
        }
      };
      requestAnimationFrame(loop);
    } else if (!canRun) {
      this.running = false;
      if (this.n) {
        this.settle();
        this.draw();
      }
    }
  }

  settle() {
    for (let i = 0; i < this.n; i++) {
      this.x[i] = this.hx[i];
      this.y[i] = this.hy[i];
      this.vx[i] = 0;
      this.vy[i] = 0;
      this.heat[i] = 0;
      this.flick[i] = 0;
      this.cur[i] = this.fin[i];
    }
  }

  step(timestamp: number) {
    const total = this.n;
    const ptr = this.pointer;
    const repelRadius = this.w < 600 ? 70 : 120;
    const repelRadiusSq = repelRadius * repelRadius;

    for (const wave of this.waves) {
      wave.r += 9;
    }
    this.waves = this.waves.filter((wave) => wave.r < wave.max);

    const elapsed = timestamp - this.t0;
    const cycle = elapsed % 7000;
    // Moving scanline sweep beam:
    const scanlineY =
      !this.idle && cycle < 1500 && elapsed > 1600
        ? (cycle / 1500) * (this.h + 60) - 30
        : -1e9;
    const scrambleLen = SCRAMBLE_CHARS.length;

    for (let i = 0; i < total; i++) {
      const curX = this.x[i];
      const curY = this.y[i];
      let forceX = (this.hx[i] - curX) * 0.05;
      let forceY = (this.hy[i] - curY) * 0.05;
      let hVal = 0.93 * this.heat[i];

      // Mouse pointer interaction
      if (ptr) {
        const dx = curX - ptr.x;
        const dy = curY - ptr.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < repelRadiusSq) {
          const dist = Math.sqrt(distSq) || 1;
          const factor = 1 - dist / repelRadius;
          forceX += (dx / dist) * factor * factor * 2.4;
          forceY += (dy / dist) * factor * factor * 2.4;
          if (factor > hVal) hVal = factor;
        }
      }

      // Wave pulses
      for (const wave of this.waves) {
        const dx = curX - wave.x;
        const dy = curY - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const diff = Math.abs(dist - wave.r);
        if (diff < 28) {
          const intensity = (1 - diff / 28) * wave.power;
          forceX += (dx / dist) * intensity;
          forceY += (dy / dist) * intensity;
          if (intensity / wave.power > hVal) hVal = 0.95 * (intensity / wave.power);
          if (this.kind[i]) this.flick[i] = 6;
        }
      }

      // Scanline sweep
      if (scanlineY > -1e8) {
        const distToScanline = Math.abs(this.hy[i] - scanlineY);
        if (distToScanline < 12) {
          const scanIntensity = 0.6 * (1 - distToScanline / 12);
          if (scanIntensity > hVal) hVal = scanIntensity;
        }
      }

      const velX = (this.vx[i] + forceX) * 0.82;
      const velY = (this.vy[i] + forceY) * 0.82;
      this.vx[i] = velX;
      this.vy[i] = velY;
      this.x[i] = curX + velX;
      this.y[i] = curY + velY;
      this.heat[i] = hVal;

      if (this.kind[i]) {
        if (elapsed < this.lock[i]) {
          this.cur[i] = CHAR_MAP[SCRAMBLE_CHARS.charAt((Math.random() * scrambleLen) | 0)] ?? 0;
          continue;
        }
        if (this.flick[i] > 0) {
          this.flick[i]--;
          this.cur[i] = this.flick[i]
            ? CHAR_MAP[SCRAMBLE_CHARS.charAt((Math.random() * scrambleLen) | 0)] ?? 0
            : this.fin[i];
        }
      }
    }

    // Occasional subtle letter sparkle
    const brightLetters = this.bright;
    const sparkleCount = Math.max(1, (0.006 * brightLetters.length) | 0);
    for (let s = 0; s < sparkleCount; s++) {
      const idx = brightLetters[(Math.random() * brightLetters.length) | 0];
      if (!this.flick[idx]) {
        this.flick[idx] = 3 + ((6 * Math.random()) | 0);
      }
    }
  }

  draw() {
    if (!this.atlas || !this.n) return;
    const { ctx, cw, ch, dpr, atlas } = this;
    const atlasW = cw * dpr;
    const atlasH = ch * dpr;

    ctx.clearRect(0, 0, this.w, this.h);

    // Subtle cell tint for letter shapes
    ctx.fillStyle = this.cellTint;
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < this.n; i++) {
      if (this.kind[i]) {
        ctx.fillRect(this.x[i] - cw / 2, this.y[i] - ch / 2, cw, ch);
      }
    }

    // Draw characters from atlas
    for (let i = 0; i < this.n; i++) {
      const hVal = this.heat[i];
      const isLet = this.kind[i];
      // Row 2 is accent glow, Row 1 is bright letter, Row 0 is muted
      const atlasRow = hVal > 0.14 ? 2 : isLet ? 1 : 0;
      let alpha = isLet ? 1.0 : 0.18; // background words are faint and sparse
      if (hVal > 0.14) {
        alpha = Math.min(1.0, 0.45 + 0.7 * hVal);
      }
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        atlas,
        this.cur[i] * atlasW,
        atlasRow * atlasH,
        atlasW,
        atlasH,
        this.x[i] - cw / 2,
        this.y[i] - ch / 2,
        cw,
        ch
      );
    }
    ctx.globalAlpha = 1;
  }
}

export function InteractiveGlyph({
  text = "SHIVANG GUPTA",
  words,
  subtext,
  isHero = false,
  className = "",
  idle = false,
  id,
}: InteractiveGlyphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<GlyphRenderer | null>(null);
  const { skin } = useSkin();

  // Words array - e.g. ["SHIVANG", "GUPTA"] for 2 stacked lines
  const wordsList = words || (text ? text.toUpperCase().trim().split(/\s+/) : ["SHIVANG", "GUPTA"]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderer = new GlyphRenderer(el, wordsList, idle);
    engineRef.current = renderer;

    return () => {
      renderer.destroy();
      engineRef.current = null;
    };
  }, [text, words?.join(" "), idle]);

  // Rebuild atlas when skin/theme changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.buildAtlas();
      engineRef.current.draw();
    }
  }, [skin]);

  const glyphClass = isHero
    ? "hero-glyph"
    : wordsList.includes("HELLO")
    ? "contact-glyph"
    : "page-glyph";

  return (
    <div
      ref={containerRef}
      id={id || (isHero ? "hero-glyph" : undefined)}
      className={`glyph ${glyphClass} ${className}`}
      data-words={wordsList.join(" ")}
      data-mode={idle ? "idle" : undefined}
      aria-hidden="true"
    >
      <canvas className="block w-full h-full" />
      <div className="fallback sr-only">
        {wordsList.map((word, idx) => (
          <span key={idx}>{word}</span>
        ))}
      </div>
    </div>
  );
}