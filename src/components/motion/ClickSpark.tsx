"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
  size: number;
};

let emit: ((x: number, y: number, count?: number) => void) | null = null;

/** Lanza una explosión de partículas en coordenadas de pantalla */
export const burst = (x: number, y: number, count = 28) => emit?.(x, y, count);

export function ClickSpark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let parts: Particle[] = [];
    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Avanzar primero y luego quitar las apagadas: así ninguna se dibuja
      // con vida negativa (el radio de arc() no puede ser negativo)
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.vx *= 0.97;
        p.life -= 0.022;
      }
      parts = parts.filter((p) => p.life > 0);

      for (const p of parts) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = `hsl(${p.hue} 90% 68%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = parts.length ? requestAnimationFrame(loop) : 0;
    };

    emit = (x, y, count = 14) => {
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const s = 2 + Math.random() * 3.5;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 1,
          hue: 250 + Math.random() * 90,
          size: 2 + Math.random() * 2.5,
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onDown = (e: PointerEvent) =>
      emit?.(e.clientX, e.clientY, e.pointerType === "touch" ? 10 : 14);
    window.addEventListener("pointerdown", onDown);

    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      emit = null;
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
    />
  );
}
