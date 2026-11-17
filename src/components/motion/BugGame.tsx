"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bug as BugIcon, CheckCircle2, TerminalSquare, X } from "lucide-react";
import { burst } from "@/src/components/motion/ClickSpark";

// Mensajes que aparecen al corregir cada bicho (en orden, y luego se repiten)
const MESSAGES = [
  "404 Not Found",
  "TypeError: Cannot read properties of undefined (reading 'map')",
  "Hydration failed: el HTML del servidor no coincide",
  "CORS: No 'Access-Control-Allow-Origin' header",
  "500 Internal Server Error",
  "Unexpected token '<' in JSON at position 0",
  "ECONNREFUSED 127.0.0.1:5432",
  "Maximum call stack size exceeded",
  "Módulo no encontrado: 'lodash'",
  "NullPointerException en CarritoService.java:42",
  'Warning: Each child in a list should have a unique "key" prop',
  "Ticket QA-1042: el botón de pago no responde",
];

const COUNT_DESKTOP = 7;
const COUNT_MOBILE = 4;
const SQUISH_MS = 380;
const MARGIN = 28;

type BugSprite = {
  x: number;
  y: number;
  heading: number; // radianes
  speed: number; // px por segundo
  size: number; // tamaño base del cuerpo en px
  phase: number; // fase de las patas
  turnIn: number; // segundos hasta cambiar de rumbo
  deadAt: number; // 0 = vivo; si no, instante (ms) en que fue aplastado
  respawnAt: number; // instante (ms) en que vuelve a aparecer
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function placeBug(b: BugSprite, W: number, H: number) {
  b.x = rand(MARGIN, W - MARGIN);
  b.y = rand(MARGIN, H - MARGIN);
  b.heading = rand(0, Math.PI * 2);
  b.speed = rand(40, 85);
  b.size = rand(13, 17);
  b.phase = rand(0, Math.PI * 2);
  b.turnIn = rand(1.5, 4);
  b.deadAt = 0;
  b.respawnAt = 0;
}

function newBug(W: number, H: number): BugSprite {
  const b: BugSprite = {
    x: 0, y: 0, heading: 0, speed: 0, size: 0, phase: 0, turnIn: 0, deadAt: 0, respawnAt: 0,
  };
  placeBug(b, W, H);
  return b;
}

function step(b: BugSprite, dt: number, W: number, H: number, now: number) {
  if (b.deadAt) {
    if (now >= b.respawnAt) placeBug(b, W, H);
    return;
  }

  // Cambia de rumbo de vez en cuando
  b.turnIn -= dt;
  if (b.turnIn <= 0) {
    b.heading += rand(-0.9, 0.9);
    b.turnIn = rand(1.5, 4);
  }

  b.x += Math.cos(b.heading) * b.speed * dt;
  b.y += Math.sin(b.heading) * b.speed * dt;
  b.phase += dt * (7 + b.speed * 0.06);

  // Rebota en los bordes de la pantalla
  if (b.x < MARGIN) { b.x = MARGIN; b.heading = Math.PI - b.heading; }
  else if (b.x > W - MARGIN) { b.x = W - MARGIN; b.heading = Math.PI - b.heading; }
  if (b.y < MARGIN) { b.y = MARGIN; b.heading = -b.heading; }
  else if (b.y > H - MARGIN) { b.y = H - MARGIN; b.heading = -b.heading; }
}

function draw(ctx: CanvasRenderingContext2D, b: BugSprite, now: number) {
  // Al ser aplastado se achata y se desvanece
  const k = b.deadAt ? Math.max(0, 1 - (now - b.deadAt) / SQUISH_MS) : 1;
  if (k <= 0) return;
  const s = b.size;

  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.heading);
  ctx.scale(1, b.deadAt ? 0.2 + 0.8 * k : 1);
  ctx.globalAlpha = k;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Sombra suave bajo el bicho (profundidad)
  ctx.save();
  ctx.globalAlpha = 0.22 * k;
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.ellipse(s * 0.1, s * 0.15, s * 1.15, s * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Halo neón violeta (encaja con el glow del portafolio)
  ctx.save();
  ctx.globalAlpha = 0.35 * k;
  ctx.shadowColor = "#8b5cf6";
  ctx.shadowBlur = s * 1.8;
  ctx.fillStyle = "#8b5cf6";
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.95, s * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ——— Patas articuladas (2 segmentos) con glow cian ———
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < 3; i++) {
      const attachX = (i - 1) * 0.42 * s;
      const attachY = side * s * 0.42;
      const swing = b.deadAt
        ? 0
        : Math.sin(b.phase + i * 2.1 + (side > 0 ? Math.PI : 0));
      const midX = attachX + swing * 0.28 * s + side * 0.05 * s;
      const midY = attachY + side * s * 0.55;
      const tipX = attachX + swing * 0.55 * s;
      const tipY = attachY + side * s * 1.05;

      // Glow de la pata
      ctx.save();
      ctx.shadowColor = "#22d3ee";
      ctx.shadowBlur = 6;
      ctx.strokeStyle = "rgba(34, 211, 238, 0.85)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(attachX, attachY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      ctx.restore();

      // Núcleo más claro
      ctx.strokeStyle = "#a5f3fc";
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(attachX, attachY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Articulación
      ctx.fillStyle = "#22d3ee";
      ctx.beginPath();
      ctx.arc(midX, midY, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ——— Abdomen / élitros (cuerpo trasero) ———
  const abdomen = ctx.createRadialGradient(-s * 0.15, -s * 0.15, s * 0.1, 0, 0, s * 1.1);
  abdomen.addColorStop(0, "#c4b5fd");
  abdomen.addColorStop(0.45, "#8b5cf6");
  abdomen.addColorStop(1, "#5b21b6");
  ctx.fillStyle = abdomen;
  ctx.strokeStyle = "rgba(14, 12, 23, 0.9)";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.ellipse(-s * 0.18, 0, s * 0.95, s * 0.68, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Costura central de los élitros
  ctx.strokeStyle = "rgba(14, 12, 23, 0.75)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-s * 0.95, 0);
  ctx.lineTo(s * 0.55, 0);
  ctx.stroke();

  // Segmentos laterales (caparazón)
  ctx.strokeStyle = "rgba(196, 181, 253, 0.35)";
  ctx.lineWidth = 0.7;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(-s * 0.55, side * s * 0.18);
    ctx.quadraticCurveTo(-s * 0.1, side * s * 0.55, s * 0.35, side * s * 0.28);
    ctx.stroke();
  }

  // Brillo especular en el caparazón
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.beginPath();
  ctx.ellipse(-s * 0.35, -s * 0.28, s * 0.35, s * 0.16, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // ——— Tórax ———
  const thorax = ctx.createRadialGradient(s * 0.35, -s * 0.1, 1, s * 0.4, 0, s * 0.55);
  thorax.addColorStop(0, "#ddd6fe");
  thorax.addColorStop(0.5, "#a78bfa");
  thorax.addColorStop(1, "#7c3aed");
  ctx.fillStyle = thorax;
  ctx.strokeStyle = "rgba(14, 12, 23, 0.85)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(s * 0.42, 0, s * 0.48, s * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // ——— Cabeza ———
  const head = ctx.createRadialGradient(s * 1.05, -s * 0.08, 1, s * 1.05, 0, s * 0.45);
  head.addColorStop(0, "#ede9fe");
  head.addColorStop(0.55, "#a78bfa");
  head.addColorStop(1, "#6d28d9");
  ctx.fillStyle = head;
  ctx.beginPath();
  ctx.ellipse(s * 1.05, 0, s * 0.42, s * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Mandíbulas / hocico sutil
  ctx.fillStyle = "#5b21b6";
  ctx.beginPath();
  ctx.ellipse(s * 1.38, 0, s * 0.14, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  // ——— Ojos con glow cian ———
  for (const side of [-1, 1]) {
    const ex = s * 1.18;
    const ey = side * s * 0.18;

    ctx.save();
    ctx.shadowColor = "#22d3ee";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#0e0c17";
    ctx.beginPath();
    ctx.ellipse(ex, ey, s * 0.14, s * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Iris / brillo
    ctx.fillStyle = "#22d3ee";
    ctx.beginPath();
    ctx.arc(ex + s * 0.03, ey, s * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(ex + s * 0.01, ey - s * 0.04, s * 0.03, 0, Math.PI * 2);
    ctx.fill();
  }

  // ——— Antenas con punta neón ———
  for (const side of [-1, 1]) {
    const ax0 = s * 1.28;
    const ay0 = side * s * 0.1;
    const ax1 = s * 1.55;
    const ay1 = side * s * 0.55;
    const ax2 = s * 1.85;
    const ay2 = side * s * 0.72;
    const wave = b.deadAt ? 0 : Math.sin(b.phase * 0.8 + side) * s * 0.06;

    ctx.strokeStyle = "rgba(196, 181, 253, 0.9)";
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    ctx.moveTo(ax0, ay0);
    ctx.quadraticCurveTo(ax1, ay1 + wave, ax2, ay2);
    ctx.stroke();

    // Punta luminosa
    ctx.save();
    ctx.shadowColor = "#22d3ee";
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#22d3ee";
    ctx.beginPath();
    ctx.arc(ax2, ay2, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

export function BugGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const msgIdx = useRef(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const total = logs.length;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let bugs: BugSprite[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const want = W < 768 ? COUNT_MOBILE : COUNT_DESKTOP;
      while (bugs.length < want) bugs.push(newBug(W, H));
      bugs = bugs.slice(0, want);
      for (const b of bugs) {
        b.x = Math.min(Math.max(b.x, MARGIN), W - MARGIN);
        b.y = Math.min(Math.max(b.y, MARGIN), H - MARGIN);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, W, H);
      for (const b of bugs) {
        step(b, dt, W, H, now);
        draw(ctx, b, now);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onDown = (e: PointerEvent) => {
      // Los clics sobre la interfaz de bichos no cuentan
      if (e.target instanceof Element && e.target.closest("[data-bug-ui]")) return;

      const now = performance.now();
      const hit = bugs.find(
        (b) =>
          !b.deadAt &&
          Math.hypot(e.clientX - b.x, e.clientY - b.y) <= Math.max(b.size * 1.9, 22),
      );
      if (!hit) return;

      hit.deadAt = now;
      hit.respawnAt = now + rand(1200, 3000);
      burst(hit.x, hit.y, 24); // polvo, igual que el clic normal

      const msg = MESSAGES[msgIdx.current % MESSAGES.length];
      msgIdx.current += 1;
      setLogs((l) => [...l, msg]);
    };
    window.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[45] h-full w-full"
      />

      <div data-bug-ui className="fixed bottom-16 left-5 z-[60] flex flex-col items-start gap-3">
        <AnimatePresence>
          {open && total > 0 && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 16, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="border-glow w-[min(92vw,380px)] overflow-hidden rounded-2xl glass bg-ink-900/90 shadow-[0_0_40px_-8px_rgb(139_92_246/0.55)]"
            >
              {/* Header tipo terminal */}
              <div className="relative flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-400/80" />
                    <span className="size-2.5 rounded-full bg-live-500/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <TerminalSquare size={14} className="text-brand-300" />
                    <span className="font-mono text-xs font-medium text-white/80">
                      bugs.log
                    </span>
                    <span className="rounded-full bg-brand-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-300 ring-1 ring-brand-500/30">
                      {total} corregidos
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-1.5 text-white/45 transition hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white"
                >
                  <X size={14} />
                </button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-500/60 to-transparent" />
              </div>

              {/* Lista de bugs corregidos */}
              <ol className="custom-scrollbar max-h-72 space-y-2 overflow-y-auto p-3">
                {logs
                  .map((m, i) => ({ m, i }))
                  .reverse()
                  .map(({ m, i }, idx) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(idx * 0.04, 0.24), duration: 0.25 }}
                      className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-3 transition hover:border-brand-500/35 hover:bg-brand-500/5"
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-linear-to-b from-brand-400 via-fuchsia-500 to-neon-400 opacity-70" />
                      <div className="flex items-start gap-2.5 pl-1">
                        <span className="mt-0.5 shrink-0 rounded-md bg-live-500/15 p-1 text-live-500 ring-1 ring-live-500/25">
                          <CheckCircle2 size={13} />
                        </span>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                              #{i + 1}
                            </span>
                            <span className="text-[11px] font-semibold text-brand-300">
                              Bug corregido
                            </span>
                          </div>
                          <p className="font-mono text-[11px] leading-relaxed text-neon-400/90 break-words">
                            {m}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
              </ol>

              <div className="border-t border-white/8 bg-white/[0.02] px-4 py-2">
                <p className="font-mono text-[10px] text-white/35">
                  <span className="text-neon-400">❯</span> qa — mentalidad de tester en cada commit
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {total > 0 && (
            <motion.button
              key="fab"
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpen((o) => !o)}
              aria-label="Ver bugs corregidos"
              aria-expanded={open}
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-full glass border-glow bg-ink-900/90 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgb(139_92_246/0.7)]"
            >
              <span className="relative grid size-7 place-items-center rounded-full bg-brand-500/20 ring-1 ring-brand-500/40">
                <BugIcon size={15} className="text-brand-300 transition-transform duration-300 group-hover:rotate-12" />
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/25 motion-reduce:hidden" />
              </span>
              <span className="font-mono tabular-nums">{total}</span>
              <span className="hidden text-xs font-medium text-white/50 sm:inline">
                {open ? "ocultar" : "ver log"}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
