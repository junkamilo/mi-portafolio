"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Anillo orbital decorativo. Siempre animado (ignora prefers-reduced-motion).
// Cuando sale de pantalla deja de pedir frames, y los reanuda al volver a aparecer.
export function OrbitRing({
  size = 440,
  layer,
}: {
  size?: number;
  layer: "back" | "front";
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { amount: 0.05, margin: "100px" });
  const inViewRef = useRef(inView);
  inViewRef.current = inView;
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = size * dpr;
    c.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = window.innerWidth < 768 ? 180 : 320;
    const pts = Array.from({ length: n }, () => ({
      a: Math.random() * Math.PI * 2,
      // radio ligeramente irregular para dar profundidad
      r: 0.88 + Math.random() * 0.22,
      // velocidad visible: órbita completa ~8–18 s
      s: 0.008 + Math.random() * 0.012,
      cyan: Math.random() > 0.72,
      size: 1.4 + Math.random() * 1.6,
    }));

    const cx = size / 2;
    const cy = size / 2;
    const rx = size * 0.47;
    const ry = size * 0.16;
    const tilt = -0.35;
    let t = 0;
    let raf = 0;
    let looping = false;

    const draw = () => {
      // Fuera de pantalla no se pide otro frame: el loop se detiene y no gasta CPU
      if (!inViewRef.current) {
        looping = false;
        raf = 0;
        return;
      }

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);

      for (const p of pts) {
        p.a += p.s;
        const isFront = Math.sin(p.a) > 0;
        if ((layer === "front") !== isFront) continue;

        const x = Math.cos(p.a) * rx * p.r;
        const y = Math.sin(p.a) * ry * p.r;
        // Más opacas delante, más tenues detrás
        ctx.globalAlpha = isFront ? 0.95 : 0.35;
        ctx.fillStyle = p.cyan ? "#22d3ee" : "#a78bfa";
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Esfera brillante en órbita (más rápida y visible)
      const ba = t * 0.028;
      if ((layer === "front") === Math.sin(ba) > 0) {
        const bx = Math.cos(ba) * rx;
        const by = Math.sin(ba) * ry;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, 18);
        g.addColorStop(0, "#ffffff");
        g.addColorStop(0.25, "#ede9fe");
        g.addColorStop(0.55, "#a78bfa");
        g.addColorStop(1, "rgba(139,92,246,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      t++;

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (looping || !inViewRef.current) return;
      looping = true;
      raf = requestAnimationFrame(draw);
    };
    startRef.current = start;
    start();

    return () => {
      looping = false;
      cancelAnimationFrame(raf);
      startRef.current = null;
    };
  }, [size, layer]);

  // Al volver a estar en pantalla, reanuda la animación
  useEffect(() => {
    if (inView) startRef.current?.();
  }, [inView]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
        layer === "front" ? "z-20" : "z-0"
      }`}
    />
  );
}
