# Rediseño animado del portafolio: guía de implementación

> **Proyecto:** `hoja-vida-juan-camilo` (Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, next-themes, sonner, lucide-react).
> **Base de contenido:** `Portafolio_Web_Textos_Optimizados.md`. Este documento **no cambia textos**, solo agrega diseño, animación e interacción.
> **Referencia visual:** el video `gemini_generated_video` (10 s): tema oscuro tecnológico, acento violeta y cian, cuadrícula de fondo, foto con órbita de partículas y tarjetas con brillo.

### Instrucciones para el agente o IDE que implemente esto
1. Sigue las fases de la sección 15 en orden. Termina y prueba cada fase antes de pasar a la siguiente.
2. Todos los componentes animados son **Client Components** (`"use client"`). Las páginas (`page.tsx`) y los layouts siguen siendo Server Components y solo importan estos componentes.
3. No cambies los textos de `src/config/*`. Solo agrega los campos nuevos indicados (`tags`, `usedIn`, `image`).
4. Toda animación debe respetar `prefers-reduced-motion` (sección 14).
5. Anima solo `transform` y `opacity` (y `filter` donde se indica). No animes `width`, `height`, `top` ni `margin` en elementos grandes.

---

## 0. Qué tomé del video y dónde va

| Elemento del video | Implementación | Sección |
|---|---|---|
| Fondo negro con cuadrícula tenue que se mueve | `AnimatedBackground` (cuadrícula CSS + orbes + íconos flotantes con parallax) | 4.3 |
| Barra de navegación en forma de píldora de cristal | `Header` con blur, píldora del enlace activo (`layoutId`) y ocultar/mostrar según el scroll | 5 |
| Badge verde "Disponible para trabajar" | Punto con pulso y destello al copiar el correo | 6 |
| Nombre que se "decodifica" (caracteres tipo hex antes de mostrar "Juan Beltrán") | `ScrambleText` | 6 |
| Foto circular con anillo de partículas en órbita y esfera brillante | `OrbitRing` (canvas, dos capas: detrás y delante de la foto) | 6 |
| Botón principal blanco y botón con brillo violeta | `Magnetic` + `ShineButton` | 4.6 |
| Filtros Todos / Full Stack / QA / E-commerce / Cloud con píldora violeta | Filtros con `layoutId` y reordenamiento animado (`layout`) | 7.1 |
| Tarjetas de proyecto con borde luminoso | `TiltCard` (inclinación 3D + reflejo que sigue el cursor) | 4.6, 7.1 |
| Clic en una tarjeta | La tarjeta se expande en un modal (*shared layout*) | 7.2 |
| Proyectos de formación en fila | Carrusel arrastrable (mouse y dedo) | 7.3 |
| Tarjeta blanca "¿Quieres ver cómo escribo código?" que crece con desenfoque | `ZoomOnScroll` | 7.4 |
| Línea de tiempo con neón violeta/cian y punto brillante | Línea que se llena con el scroll | 8 |
| Tarjetas de educación con borde de color y flecha | Acordeón animado al hacer clic | 8 |
| Pestañas de habilidades (Frontend, Backend…) y tarjetas | Pestañas con `layoutId` + chips que muestran "dónde lo usé" | 9 |
| Botón flotante redondo (abajo a la derecha) | `FloatingContact`: menú radial con correo, WhatsApp y LinkedIn | 11 |
| Footer con avatar "JB" con gradiente y botón "Subir" violeta | Footer con revelado y scroll suave hasta arriba | 12 |
| Desenfoque de movimiento entre secciones | `SectionTransition` (escala + blur ligado al scroll) | 4.5 |
| *(extra)* Partículas al hacer clic en cualquier parte | `ClickSpark` | 4.4 |
| *(extra)* Barra de progreso de lectura | `ScrollProgress` | 4.2 |
| *(extra)* Luz que sigue el cursor | `CursorGlow` (solo con mouse) | 4.3 |

---

## 1. Dependencias

```bash
npm i lenis
```

`framer-motion@12` ya está instalado. **No hace falta nada más**: las partículas, la órbita y los efectos de texto son componentes propios con canvas o CSS, sin librerías extra.

> Si tienes la clase `scroll-smooth` en `<html>` o `scroll-behavior: smooth` en el CSS, **quítala**. Choca con Lenis.

---

## 2. Estructura de archivos nuevos

```
src/
├── app/
│   └── (general)/
│       └── template.tsx                 # transición de entrada entre páginas
├── components/
│   ├── motion/
│   │   ├── SmoothScroll.tsx             # Lenis
│   │   ├── ScrollProgress.tsx
│   │   ├── AnimatedBackground.tsx       # cuadrícula + orbes + íconos + CursorGlow
│   │   ├── ClickSpark.tsx               # partículas al hacer clic + función burst()
│   │   ├── Reveal.tsx                   # Reveal, RevealGroup, RevealItem
│   │   ├── SectionTransition.tsx
│   │   ├── ScrambleText.tsx
│   │   ├── TypeRotator.tsx
│   │   ├── OrbitRing.tsx
│   │   ├── Magnetic.tsx
│   │   ├── TiltCard.tsx
│   │   ├── ShineButton.tsx
│   │   ├── CountUp.tsx
│   │   ├── ZoomOnScroll.tsx
│   │   └── Terminal.tsx
│   ├── projects/
│   │   ├── ProjectFilters.tsx
│   │   ├── ProjectModal.tsx
│   │   └── TrainingCarousel.tsx
│   └── section/
│       └── FloatingContact.tsx
├── hooks/
│   ├── use-media-query.ts
│   └── use-active-section.ts
└── lib/
    ├── motion.ts                        # variantes y curvas compartidas
    └── scroll.ts                        # referencia a Lenis + scrollToId()
```

---

## 3. Sistema de diseño

### 3.1 Tokens y utilidades — `src/app/globals.css`

Agrega esto debajo de `@import "tailwindcss";`:

```css
@theme {
  --color-ink-950: #07060d;      /* fondo */
  --color-ink-900: #0e0c17;      /* tarjetas */
  --color-brand-300: #c4b5fd;
  --color-brand-400: #a78bfa;
  --color-brand-500: #8b5cf6;    /* violeta principal */
  --color-brand-600: #7c3aed;
  --color-neon-400: #22d3ee;     /* cian de acento */
  --color-live-500: #22c55e;     /* "En producción" / disponible */
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
}

/* Cuadrícula animada del fondo */
.bg-grid {
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  animation: grid-move 24s linear infinite;
}
@keyframes grid-move { to { background-position: 56px 56px; } }

/* Tarjeta de cristal */
.glass {
  background: rgb(255 255 255 / 0.04);
  border: 1px solid rgb(255 255 255 / 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

/* Borde con luz que gira (contacto, tarjeta destacada) */
@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.border-glow { position: relative; isolation: isolate; }
.border-glow::before {
  content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px; z-index: -1;
  background: conic-gradient(from var(--angle), transparent 55%, #8b5cf6, #22d3ee, transparent 95%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: spin-angle 4s linear infinite;
}
@keyframes spin-angle { to { --angle: 360deg; } }

/* Pulso del punto verde */
.live-dot { position: relative; }
.live-dot::after {
  content: ""; position: absolute; inset: 0; border-radius: 9999px; background: currentColor;
  animation: ping-soft 1.8s var(--ease-out-expo) infinite;
}
@keyframes ping-soft { 0% { transform: scale(1); opacity: .7 } 100% { transform: scale(2.6); opacity: 0 } }

/* Texto con gradiente */
.text-gradient {
  background: linear-gradient(90deg, #c4b5fd, #8b5cf6 45%, #22d3ee);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* Brillo que cruza el botón */
.shine { position: relative; overflow: hidden; }
.shine::after {
  content: ""; position: absolute; inset: 0; transform: translateX(-120%);
  background: linear-gradient(110deg, transparent 30%, rgb(255 255 255 / .35) 50%, transparent 70%);
}
.shine:hover::after { transition: transform .8s var(--ease-out-expo); transform: translateX(120%); }

/* Movimiento reducido: apaga todo lo que se mueve por CSS */
@media (prefers-reduced-motion: reduce) {
  .bg-grid, .border-glow::before, .live-dot::after { animation: none; }
  .shine::after { display: none; }
}
```

### 3.2 Tema oscuro por defecto

En el `ThemeProvider` (`src/components/themeProvider`):

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
```

El diseño del video es oscuro. El modo claro puede seguir existiendo, pero el oscuro es la carta de presentación.

### 3.3 Curvas y variantes compartidas — `src/lib/motion.ts`

```ts
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (delay: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

export const fadeSide = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -60 : 60 },
  show: (delay: number = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay } }),
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (delay: number = 0) => ({ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 220, damping: 20, delay } }),
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
```

### 3.4 Scroll compartido — `src/lib/scroll.ts`

```ts
import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToId(hash: string, offset = -90) {
  const target = hash.startsWith("#") ? hash : `#${hash}`;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = document.querySelector(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
```

### 3.5 Hooks

**`src/hooks/use-media-query.ts`**
```ts
"use client";
import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** true solo con mouse o trackpad (no en celulares ni tablets táctiles) */
export const useFinePointer = () => useMediaQuery("(pointer: fine)");
```

**`src/hooks/use-active-section.ts`**
```ts
"use client";
import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
```
> Define el arreglo de ids **fuera** del componente (constante), para que el efecto no se reinicie en cada render.

---

## 4. Capa global (se ve en toda la página)

### 4.1 Scroll suave — `src/components/motion/SmoothScroll.tsx`

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { lenisRef } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true }); // en táctil usa el scroll nativo
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);
  return <>{children}</>;
}
```

### 4.2 Barra de progreso — `ScrollProgress.tsx`

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-brand-500 via-fuchsia-500 to-neon-400"
    />
  );
}
```

### 4.3 Fondo animado + luz del cursor — `AnimatedBackground.tsx`

```tsx
"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Braces, Bug, Database, FolderGit2, GitBranch, Server, TerminalSquare, TestTube2 } from "lucide-react";
import { useFinePointer } from "@/hooks/use-media-query";

const ICONS = [
  { Icon: FolderGit2, top: "12%", left: "6%", size: 64, dur: 9 },
  { Icon: Braces, top: "28%", left: "88%", size: 54, dur: 11 },
  { Icon: Database, top: "52%", left: "4%", size: 58, dur: 10 },
  { Icon: TestTube2, top: "68%", left: "90%", size: 50, dur: 12 },
  { Icon: Server, top: "84%", left: "12%", size: 56, dur: 9.5 },
  { Icon: Bug, top: "40%", left: "48%", size: 44, dur: 13 },
  { Icon: GitBranch, top: "92%", left: "70%", size: 52, dur: 10.5 },
  { Icon: TerminalSquare, top: "6%", left: "64%", size: 48, dur: 12.5 },
];

function CursorGlow() {
  const fine = useFinePointer();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 110, damping: 20 });
  const sy = useSpring(y, { stiffness: 110, damping: 20 });
  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [fine, x, y]);
  if (!fine) return null;
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="absolute left-0 top-0 -ml-[220px] -mt-[220px] size-[440px] rounded-full bg-brand-500/12 blur-3xl"
    />
  );
}

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const orbA = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const orbB = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const icons = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <motion.div style={{ y: orbA }} className="absolute -left-40 top-16 size-[520px] rounded-full bg-brand-600/25 blur-[130px]" />
      <motion.div style={{ y: orbB }} className="absolute -right-40 top-[45%] size-[480px] rounded-full bg-neon-400/12 blur-[130px]" />
      <motion.div style={{ y: icons }} className="absolute inset-0">
        {ICONS.map(({ Icon, top, left, size, dur }, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.05]"
            style={{ top, left }}
            animate={{ y: [0, -22, 0], rotate: [0, 8, 0] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={size} strokeWidth={1.2} />
          </motion.div>
        ))}
      </motion.div>
      <CursorGlow />
    </div>
  );
}
```

> El fondo es una capa `fixed` con parallax de dos velocidades: los orbes y los íconos se mueven a ritmos distintos al hacer scroll. Esa diferencia es la que da profundidad.

### 4.4 Partículas al hacer clic — `ClickSpark.tsx`

Cada clic o toque en cualquier parte del sitio suelta una pequeña explosión de partículas violetas y rosadas. La función `burst(x, y)` se exporta para usarla en momentos especiales (copiar el correo, abrir un proyecto).

```tsx
"use client";
import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; hue: number; size: number };
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
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.vx *= 0.97; p.life -= 0.022;
        ctx.globalAlpha = Math.max(p.life, 0);
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
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue: 250 + Math.random() * 90, size: 2 + Math.random() * 2.5 });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onDown = (e: PointerEvent) => emit?.(e.clientX, e.clientY, e.pointerType === "touch" ? 10 : 14);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      emit = null;
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[100] h-full w-full" />;
}
```

> El loop solo corre mientras hay partículas vivas. Sin clics, gasta 0 % de CPU.

### 4.5 Revelado al hacer scroll — `Reveal.tsx` y `SectionTransition.tsx`

**`Reveal.tsx`** (se usa en **todos** los títulos, párrafos, tarjetas y chips):

```tsx
"use client";
import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Props = { children: React.ReactNode; className?: string; variants?: Variants; delay?: number; amount?: number };

export function Reveal({ children, className, variants = fadeUp, delay = 0, amount = 0.3 }: Props) {
  return (
    <motion.div className={className} variants={variants} custom={delay}
      initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, className, stagger = 0.08, delay = 0 }:
  { children: React.ReactNode; className?: string; stagger?: number; delay?: number }) {
  return (
    <motion.div className={className} variants={staggerContainer(stagger, delay)}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, variants = fadeUp }:
  { children: React.ReactNode; className?: string; variants?: Variants }) {
  return <motion.div className={className} variants={variants}>{children}</motion.div>;
}
```

**Títulos de sección con letras escalonadas** (agrégalo en `Reveal.tsx`):

```tsx
export function RevealTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h2 className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}
      variants={staggerContainer(0.06)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span className="inline-block"
            variants={{ hidden: { y: "110%", rotate: 6 }, show: { y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
```

**`SectionTransition.tsx`** (envuelve cada sección: entra con escala y desenfoque, como en el video):

```tsx
"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useFinePointer } from "@/hooks/use-media-query";

export function SectionTransition({ children, id, className }: { children: React.ReactNode; id: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer(); // el blur por scroll solo en escritorio (en celular es costoso)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [fine ? 6 : 0, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.section ref={ref} id={id} style={{ scale, opacity, filter }} className={`relative scroll-mt-24 ${className ?? ""}`}>
      {children}
    </motion.section>
  );
}
```

> ⚠️ `filter` y `transform` crean un nuevo contexto para los elementos `position: fixed` que están dentro. Por eso **todo lo fijo** (modal, menú móvil, botón flotante) se renderiza con `createPortal` o fuera de las secciones.

### 4.6 Micro-interacciones reutilizables

**`Magnetic.tsx`** (el botón "se pega" al cursor):

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/use-media-query";

export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });
  return (
    <motion.div
      className="inline-block"
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
```

**`TiltCard.tsx`** (inclinación 3D + reflejo que sigue el cursor; en celular solo se encoge al tocar):

```tsx
"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className, max = 9 }: { children: React.ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgb(139 92 246 / 0.22), transparent 60%)`;

  return (
    <motion.div
      className={cn("group relative rounded-2xl glass transition-[border-color] duration-300 hover:border-brand-500/50", className)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
        mx.set(px * 100);
        my.set(py * 100);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      <motion.div aria-hidden style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
```

**`ShineButton.tsx`** (botón principal con brillo y halo violeta):

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ShineButton({ href, children, variant = "primary", download, onClick }:
  { href?: string; children: React.ReactNode; variant?: "primary" | "glass"; download?: string; onClick?: () => void }) {
  const cls = cn(
    "shine inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow duration-300",
    variant === "primary"
      ? "bg-white text-ink-950 hover:shadow-[0_0_40px_-6px_rgb(139_92_246/0.8)]"
      : "glass text-white hover:shadow-[0_0_30px_-8px_rgb(34_211_238/0.7)]",
  );
  if (href) return <Link href={href} download={download} className={cls} onClick={onClick}>{children}</Link>;
  return <button type="button" className={cls} onClick={onClick}>{children}</button>;
}
```

### 4.7 Montaje global

**`src/components/section/Providers.tsx`** (agrega `MotionConfig`, para que framer respete el movimiento reducido):

```tsx
"use client";
import { MotionConfig } from "framer-motion";
// ...tus providers actuales (QueryClient, Toaster, etc.)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* ...providers existentes... */}
      {children}
    </MotionConfig>
  );
}
```

**`src/app/(general)/layout.tsx`**

```tsx
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { AnimatedBackground } from "@/components/motion/AnimatedBackground";
import { ClickSpark } from "@/components/motion/ClickSpark";
import { FloatingContact } from "@/components/section/FloatingContact";
// Header y Footer existentes

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      <main className="relative">{children}</main>
      <Footer />
      <FloatingContact />
      <ClickSpark />
    </SmoothScroll>
  );
}
```

**`src/app/(general)/template.tsx`** (entrada suave al cambiar de página; queda dentro del layout, así el header fijo no se ve afectado):

```tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
```
> Haz lo mismo en `proyectos/[slug]` y `experience/[slug]` si no están bajo `(general)`.

---

## 5. Header

**Comportamiento:**
- Píldora de cristal flotante (`glass`, `rounded-full`, `max-w-5xl`, centrada, `top-4`).
- Al bajar se esconde y al subir reaparece.
- El enlace de la sección visible tiene una píldora que **se desliza** de un enlace a otro (`layoutId`).
- Al cargar, entra desde arriba y los enlaces aparecen escalonados.
- `Hablemos` con `Magnetic` y brillo. `Descargar CV` con un ícono que rebota al pasar el mouse.
- Menú móvil a pantalla completa con fondo desenfocado y enlaces que entran escalonados.

```tsx
"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { scrollToId } from "@/lib/scroll";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE } from "@/lib/motion";

const LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "skills", label: "Habilidades" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
] as const;
const IDS = LINKS.map((l) => l.id);

export function Header() {
  const active = useActiveSection(IDS);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
  });

  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-full glass px-3 py-2"
      >
        {/* logo JB con gradiente (como el footer) */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)}
              className="relative rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white">
              {active === l.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10">{l.label}</span>
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/Juan_Beltran_Campo_CV_FullStack_QA.pdf" download className="group hidden items-center gap-1.5 rounded-full glass px-3 py-1.5 text-sm lg:flex">
            <Download className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:animate-bounce" /> Descargar CV
          </a>
          <Magnetic>
            <button onClick={() => go("contacto")} className="shine rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink-950">Hablemos</button>
          </Magnetic>
          <button className="md:hidden" aria-label="Abrir menú" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </motion.header>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-ink-950/80 backdrop-blur-xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button className="absolute right-6 top-6" aria-label="Cerrar menú" onClick={() => setOpen(false)}><X /></button>
              {LINKS.map((l, i) => (
                <motion.button key={l.id} onClick={() => go(l.id)} className="text-3xl font-bold"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 * i, ease: EASE }}>
                  {l.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
```

---

## 6. Hero (`#inicio`)

**Secuencia al cargar (total ≈ 1,6 s):**
1. 0,0 s: entra el badge "Disponible…" con su punto verde pulsando.
2. 0,15 s: "Hola, soy" sube desde abajo.
3. 0,3 s: **"Juan Beltrán" se decodifica** con caracteres hex (`#A7`, `F3`…) hasta quedar en el nombre, con texto en gradiente.
4. 0,6 s: el rol se escribe y rota cada 3 s entre `Desarrollador Full Stack`, `QA Automation Engineer` y `Frontend · Backend · QA`.
5. 0,8 s: la descripción aparece con blur.
6. 1,0 s: los botones aparecen escalonados (`scaleIn`).
7. En paralelo, la foto entra con escala y el **anillo de partículas** empieza a girar.

**Interacción:**
- La foto se inclina un poco siguiendo el mouse (parallax 3D).
- Al hacer scroll, la foto sube más lento que el texto (parallax) y todo el hero se desvanece y se encoge un poco.
- **Clic en el badge:** copia el correo, `burst()` desde el badge y el texto cambia a "¡Correo copiado!" con un giro (`AnimatePresence` + `rotateX`).
- Indicador de scroll: un mouse dibujado con una ruedita que baja en loop.

### 6.1 `ScrambleText.tsx`

```tsx
"use client";
import { useEffect, useState } from "react";

const CHARS = "ABCDEF0123456789#<>/_{}";

export function ScrambleText({ text, className, delay = 300, speed = 3 }:
  { text: string; className?: string; delay?: number; speed?: number }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let raf = 0;
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      if (now - start < delay) { raf = requestAnimationFrame(tick); return; }
      frame++;
      const revealed = Math.floor(frame / speed);
      setOut(text.split("").map((ch, i) =>
        i < revealed || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="font-[inherit] tabular-nums">{out}</span>
    </span>
  );
}
```

Uso: `<h1>Hola, soy <ScrambleText text="Juan Beltrán" className="text-gradient" /></h1>`

### 6.2 `TypeRotator.tsx`

```tsx
"use client";
import { useEffect, useState } from "react";

export function TypeRotator({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = words[i % words.length];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) { setDeleting(false); setI((v) => v + 1); }
      else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, done ? 2200 : deleting ? 35 : 65);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className={className} aria-live="polite">
      {text}<span className="ml-0.5 inline-block w-[2px] animate-pulse bg-brand-400">&nbsp;</span>
    </span>
  );
}
```

### 6.3 `OrbitRing.tsx` (anillo de partículas del video)

Usa **dos capas**: `layer="back"` va detrás de la foto y `layer="front"` delante. Así las partículas parecen dar la vuelta alrededor de la cabeza.

```tsx
"use client";
import { useEffect, useRef } from "react";

export function OrbitRing({ size = 440, layer }: { size?: number; layer: "back" | "front" }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    c.width = size * dpr; c.height = size * dpr; ctx.scale(dpr, dpr);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = window.innerWidth < 768 ? 160 : 300;
    const pts = Array.from({ length: n }, () => ({
      a: Math.random() * Math.PI * 2, r: 0.9 + Math.random() * 0.2, s: 0.002 + Math.random() * 0.004, cyan: Math.random() > 0.75,
    }));
    const cx = size / 2, cy = size / 2, rx = size * 0.47, ry = size * 0.15, tilt = -0.32;
    let t = 0, raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt);
      for (const p of pts) {
        if (!reduce) p.a += p.s;
        const isFront = Math.sin(p.a) > 0;
        if ((layer === "front") !== isFront) continue;
        ctx.globalAlpha = isFront ? 0.95 : 0.4;
        ctx.fillStyle = p.cyan ? "#22d3ee" : "#a78bfa";
        ctx.fillRect(Math.cos(p.a) * rx * p.r, Math.sin(p.a) * ry * p.r, 1.7, 1.7);
      }
      // Esfera brillante que orbita
      const ba = t * 0.012;
      if ((layer === "front") === Math.sin(ba) > 0) {
        const bx = Math.cos(ba) * rx, by = Math.sin(ba) * ry;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, 16);
        g.addColorStop(0, "#ede9fe"); g.addColorStop(0.4, "#a78bfa"); g.addColorStop(1, "rgba(139,92,246,0)");
        ctx.globalAlpha = 1; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(bx, by, 16, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      t++;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, layer]);

  return (
    <canvas ref={ref} aria-hidden style={{ width: size, height: size }}
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${layer === "front" ? "z-20" : "z-0"}`} />
  );
}
```

> Para ahorrar batería, pausa el canvas cuando el hero sale de pantalla: envuélvelo en un `useInView` y no llames a `requestAnimationFrame` si no está visible.

### 6.4 Foto con parallax — dentro de `Hero.tsx` / `ProfileImage.tsx`

```tsx
"use client";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { OrbitRing } from "@/components/motion/OrbitRing";
import { useFinePointer } from "@/hooks/use-media-query";

export function HeroPhoto() {
  const fine = useFinePointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 15 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 15 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);      // sube más lento que el texto
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);

  return (
    <motion.div
      className="relative mx-auto aspect-square w-[300px] md:w-[440px]"
      style={{ y, scale }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.3 }}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <OrbitRing layer="back" size={fine ? 440 : 300} />
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
        className="absolute left-1/2 top-1/2 z-10 size-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_0_80px_-10px_rgb(139_92_246/0.6)]">
        <Image src="/fotoPerfilHojaVida.png" alt="Foto de Juan Beltrán, desarrollador Full Stack y QA" fill priority sizes="(max-width:768px) 180px, 260px" className="object-cover" />
      </motion.div>
      <OrbitRing layer="front" size={fine ? 440 : 300} />
    </motion.div>
  );
}
```

> El `size` del canvas se calcula con `useFinePointer`, que en el servidor devuelve `false`. Si ves un salto al hidratar, usa un tamaño fijo con CSS (`w-full h-full`) y mide el contenedor con `ResizeObserver`.

### 6.5 Salida del hero al hacer scroll

En el contenedor del texto del hero:

```tsx
const { scrollY } = useScroll();
const textY = useTransform(scrollY, [0, 500], [0, -60]);
const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
// <motion.div style={{ y: textY, opacity: textOpacity }}> ...texto y botones... </motion.div>
```

---

## 7. Proyectos (`#proyectos`)

### Datos nuevos en `src/config/projects-data.ts`

```ts
// Agregar a cada proyecto destacado:
tags: ("fullstack" | "qa" | "ecommerce" | "cloud")[];
image: string; // captura principal en /public/projects/<slug>.webp
// Casa Verde:  ["fullstack", "ecommerce", "cloud"]
// DYL Store:   ["fullstack", "ecommerce", "cloud"]
// Shamell:     ["fullstack", "qa"]
```

### 7.1 Filtros + grilla que se reordena

- Píldora violeta que **se desliza** al filtro elegido (`layoutId="filter-pill"`).
- Al filtrar, las tarjetas que salen se encogen y las que quedan **se reacomodan con animación** (`layout` + `AnimatePresence mode="popLayout"`).
- Cada tarjeta usa `TiltCard`. Al pasar el mouse, la imagen hace zoom lento (`group-hover:scale-105 duration-700`) y aparece un botón `Ver detalle →` desde abajo.
- El badge "En producción" tiene el punto verde con `live-dot`.
- Los chips de tecnología entran escalonados.

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { burst } from "@/components/motion/ClickSpark";
import { ProjectModal } from "./ProjectModal";
import { featuredProjects, type Project } from "@/config/projects-data";
import { EASE } from "@/lib/motion";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack" },
  { id: "qa", label: "QA Automation" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "cloud", label: "Cloud / Docker" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

export function FeaturedProjects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = filter === "all" ? featuredProjects : featuredProjects.filter((p) => p.tags.includes(filter));

  return (
    <LayoutGroup>
      <div role="tablist" aria-label="Filtrar proyectos" className="mx-auto mb-10 flex w-fit flex-wrap justify-center gap-1 rounded-full glass p-1">
        {FILTERS.map((f) => (
          <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
            className="relative rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors aria-selected:text-white">
            {filter === f.id && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand-500 shadow-[0_0_24px_-4px_rgb(139_92_246/0.9)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              layoutId={`card-${p.slug}`}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              className="cursor-pointer"
              onClick={(e) => { burst(e.clientX, e.clientY, 22); setSelected(p); }}
            >
              <TiltCard className="overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                  <Image src={p.image} alt={`Captura de ${p.title}`} fill sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-6 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Ver detalle →
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span className="inline-flex items-center gap-2 text-xs text-live-500">
                    <span className="live-dot size-2 rounded-full bg-live-500" /> En producción
                  </span>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 6).map((t, j) => (
                      <motion.li key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.05 }} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-wide text-white/70">
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </LayoutGroup>
  );
}
```

### 7.2 Modal del proyecto (el clic "wow")

La tarjeta **crece y se transforma** en un panel grande (*shared layout*, mismo `layoutId`). Dentro, el contenido entra escalonado: imagen, descripción, stack por capa, características y botones `Ver sitio` / `Ver caso completo`. Se cierra con `Esc`, clic afuera o el botón ✕, y la tarjeta vuelve a su lugar.

```tsx
"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { lenisRef } from "@/lib/scroll";
import { staggerContainer, fadeUp } from "@/lib/motion";
import type { Project } from "@/config/projects-data";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { lenisRef.current?.start(); document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div layoutId={`card-${project.slug}`} className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass border-glow bg-ink-900/95"
        data-lenis-prevent>
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-10 rounded-full glass p-2 transition-transform hover:rotate-90"><X className="size-4" /></button>
        <div className="relative aspect-[16/8]"><Image src={project.image} alt="" fill className="object-cover" /></div>
        <motion.div className="space-y-5 p-6 md:p-8" variants={staggerContainer(0.07, 0.25)} initial="hidden" animate="show">
          <motion.h3 variants={fadeUp} className="text-2xl font-bold">{project.title}</motion.h3>
          <motion.p variants={fadeUp} className="text-white/70">{project.shortDescription}</motion.p>
          {/* stack por capa, características: cada bloque como motion.div variants={fadeUp} */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="shine rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink-950">Ver sitio ↗</a>}
            <Link href={`/proyectos/${project.slug}`} className="rounded-full glass px-5 py-2 text-sm">Ver caso completo →</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>,
    document.body,
  );
}
```

> `data-lenis-prevent` deja que el modal haga scroll por dentro mientras Lenis está detenido.

### 7.3 Proyectos de formación: carrusel arrastrable

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/motion/TiltCard";

export function TrainingCarousel({ items }: { items: { slug: string; title: string; shortDescription: string; technologies: string[] }[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setMax(Math.max(0, el.scrollWidth - el.offsetWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={track} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <motion.div drag="x" dragConstraints={{ left: -max, right: 0 }} dragElastic={0.12}
        className="flex w-max cursor-grab gap-5 px-6 py-4 active:cursor-grabbing">
        {items.map((p, i) => (
          <motion.div key={p.slug} className="w-[280px] shrink-0 md:w-[340px]"
            initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}>
            <TiltCard className="h-full p-5">
              <h4 className="font-semibold">{p.title}</h4>
              <p className="mt-2 text-sm text-white/60">{p.shortDescription}</p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-2 text-center text-xs text-white/40">← Arrastra para ver más →</p>
    </div>
  );
}
```

### 7.4 CTA "¿Quieres ver cómo escribo código?" — `ZoomOnScroll.tsx`

La tarjeta blanca crece desde 70 % y pasa de desenfocada a nítida mientras haces scroll, igual que en el video.

```tsx
"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export function ZoomOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <div ref={ref} className="relative [perspective:1000px]">
      <motion.div style={{ scale, opacity, filter, rotateX }}>{children}</motion.div>
    </div>
  );
}
```

Dentro: una tarjeta blanca con el título, el texto y los botones `Ver GitHub` (`Magnetic` + `ShineButton`) y `Descargar CV`. Al pasar el mouse sobre `Ver GitHub`, el ícono gira 360°.

### 7.5 Página de detalle `/proyectos/[slug]`

- **Hero:** el título se revela palabra por palabra (`RevealTitle`) y la imagen principal entra con zoom lento (de `scale: 1.15` a `1` en 1,2 s).
- **Sidebar** de tecnologías: chips con `RevealGroup`. La barra lateral queda `sticky` con un indicador de progreso de lectura.
- **Galería:** grilla con `TiltCard`. Al hacer clic, se abre un lightbox con `layoutId` (mismo patrón del modal) y navegación con flechas y swipe (`drag="x"` + `onDragEnd`).
- **Desafíos:** cada desafío como tarjeta que entra desde los lados alternados (`fadeSide`).
- **Al final:** "Siguiente proyecto →" con una vista previa que se expande al pasar el mouse.

---

## 8. Experiencia y formación (`#experiencia`)

**Línea de tiempo con neón** (columna izquierda, como en el video):
- Línea gris de fondo y, encima, una línea con gradiente violeta → fucsia → cian que **se llena mientras haces scroll**.
- Un punto brillante cian que **viaja** por la línea.
- Cada tarjeta de experiencia entra desde la izquierda. Cuando la línea llega a su altura, su nodo se enciende (escala + glow).
- Al pasar el mouse, las tarjetas se elevan; los chips de habilidades entran escalonados.

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function NeonTimeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const dotTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-3 top-0 h-full w-px bg-white/10" />
      <motion.div style={{ scaleY: progress }}
        className="absolute left-3 top-0 h-full w-[2px] origin-top bg-linear-to-b from-brand-500 via-fuchsia-500 to-neon-400 shadow-[0_0_14px_rgb(139_92_246/0.9)]" />
      <motion.div style={{ top: dotTop }}
        className="absolute left-3 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-400 shadow-[0_0_18px_4px_rgb(34_211_238/0.7)]" />
      <div className="space-y-8">{children}</div>
    </div>
  );
}
```

**Educación y certificaciones** (columna derecha):
- Cada tarjeta tiene un borde izquierdo de color por tipo (pregrado: violeta, tecnología: cian, certificado: verde, curso: ámbar) y entra desde la derecha (`fadeSide("right")`).
- **Clic en la flecha →** la tarjeta se expande como acordeón (`AnimatePresence` + `height: "auto"` dentro de un `motion.div` con `layout`). Muestra el resumen, las habilidades y el enlace `Ver credencial ↗`. La flecha gira 90°.
- El enlace "Ver detalle completo" lleva a `/experience/[slug]`.

```tsx
// Patrón del acordeón
<motion.div layout className="glass rounded-xl border-l-2 border-brand-500 p-4">
  <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between" aria-expanded={open}>
    <span>{item.title}</span>
    <motion.span animate={{ rotate: open ? 90 : 0 }}>›</motion.span>
  </button>
  <AnimatePresence initial={false}>
    {open && (
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
        {/* resumen + chips + enlace */}
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

> Aquí `height` es una excepción aceptable: el bloque es pequeño y se anima una sola vez por clic.

---

## 9. Habilidades (`#skills`) — interactivo e informativo

**Comportamiento:**
- Pestañas `Frontend · Backend · Bases de datos · QA y testing · DevOps · IA` con la píldora violeta deslizante (`layoutId="skills-tab"`). En celular, la fila de pestañas se desliza con el dedo (`overflow-x-auto snap-x`).
- **Escritorio:** las tarjetas de categoría con `TiltCard`. Al cambiar de pestaña, la tarjeta activa se ilumina (`border-glow`) y las demás bajan su opacidad a 0,4.
- **Celular:** solo se muestra la tarjeta de la pestaña activa, con transición deslizante (`AnimatePresence mode="wait"`, `x: 40 → 0`).
- Los chips de cada tarjeta entran escalonados (`RevealGroup`, 0,04 s).
- **Clic en un chip → "¿Dónde lo usé?":** se despliega un mini panel con los proyectos y empresas donde usaste esa tecnología. Esto convierte la lista en información útil para el reclutador.

**Datos nuevos en `src/config/skills-data.ts`:**

```ts
// Cada habilidad pasa de string a objeto:
{ name: "React", usedIn: ["Devitech", "Rappi", "Casa Verde", "DYL Store", "Shamell"] }
{ name: "Spring Boot", usedIn: ["Casa Verde (cloud)", "DYL Store (cloud)"] }
{ name: "NestJS", usedIn: ["Devitech", "Rappi (revisión de código)", "Shamell"] }
{ name: "Cypress", usedIn: ["Devitech", "Rappi"] }
{ name: "Playwright", usedIn: ["Shamell"] }
{ name: "Selenium", usedIn: ["Devitech"] }
{ name: "Docker", usedIn: ["Casa Verde", "DYL Store"] }
{ name: "PostgreSQL", usedIn: ["Casa Verde", "DYL Store", "Shamell"] }
// Completa el resto solo con usos reales: así lo puedes sostener en entrevista.
```

**Chip con panel:**

```tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";

export function SkillChip({ skill, open, onToggle }:
  { skill: { name: string; usedIn: string[] }; open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <motion.button onClick={onToggle} whileHover={{ y: -2 }} whileTap={{ scale: 0.92 }} aria-expanded={open}
        className={`rounded-md px-2.5 py-1 text-xs uppercase tracking-wide transition-colors ${open ? "bg-brand-500 text-white" : "bg-white/5 text-white/75 hover:bg-white/10"}`}>
        {skill.name}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="absolute left-0 top-full z-30 mt-2 w-56 rounded-xl glass bg-ink-900/95 p-3 text-xs shadow-xl">
            <p className="mb-1.5 font-semibold text-brand-300">Dónde lo usé</p>
            <ul className="space-y-1 text-white/70">
              {skill.usedIn.map((u, i) => (
                <motion.li key={u} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>• {u}</motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```
> Guarda en el padre un solo `openSkill: string | null`, para que se abra un panel a la vez. Ciérralo con `Esc` o con un clic afuera.

---

## 10. Sobre mí (`#sobre-mi`)

- **Línea de tiempo:** usa el mismo `NeonTimeline` en versión compacta.
- **Tarjetas de métricas** con `TiltCard`. Los números **cuentan hacia arriba** al entrar en pantalla ("3" proyectos en producción, "2" empresas) y el texto restante aparece con blur.
- **Terminal que se escribe sola** al entrar en pantalla, comando por comando.

**`CountUp.tsx`**
```tsx
"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { node.textContent = `${Math.round(v)}${suffix}`; } });
    return () => c.stop();
  }, [inView, to, suffix, duration]);
  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}
```

**`Terminal.tsx`**
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const SCRIPT = [
  { cmd: "whoami", out: "Juan Beltrán — Desarrollador Full Stack & QA Automation Engineer" },
  { cmd: "cat stack.txt", out: "React · Next.js · NestJS · Spring Boot · PostgreSQL · Docker" },
  { cmd: "npm run test", out: "✓ Todas las pruebas pasaron" },
  { cmd: "echo $PROPUESTA_VALOR", out: "Frontend, backend y QA en un solo perfil. Escribo el código, lo pruebo y lo dejo listo para producción." },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);   // comando actual
  const [chars, setChars] = useState(0); // letras tecleadas del comando actual
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (!inView || step >= SCRIPT.length) return;
    const cmd = SCRIPT[step].cmd;
    let t: ReturnType<typeof setTimeout>;
    if (chars < cmd.length) t = setTimeout(() => setChars((c) => c + 1), 45);
    else if (!showOut) t = setTimeout(() => setShowOut(true), 250);
    else t = setTimeout(() => { setStep((s) => s + 1); setChars(0); setShowOut(false); }, 550);
    return () => clearTimeout(t);
  }, [inView, step, chars, showOut]);

  // Líneas terminadas + la que se está escribiendo
  const lines = [
    ...SCRIPT.slice(0, step),
    ...(step < SCRIPT.length && inView
      ? [{ cmd: SCRIPT[step].cmd.slice(0, chars), out: showOut ? SCRIPT[step].out : undefined }]
      : []),
  ];

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-white/10 bg-black/60 font-mono text-sm">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2">
        <span className="size-3 rounded-full bg-red-500/80" /><span className="size-3 rounded-full bg-yellow-500/80" /><span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-white/40">bash — juan@portafolio</span>
      </div>
      <div className="min-h-[190px] space-y-2 p-4" aria-label="Terminal con mi presentación">
        {lines.map((l, i) => (
          <div key={i}>
            <p><span className="text-neon-400">❯</span> {l.cmd}</p>
            {l.out && <p className="text-brand-300">{l.out}</p>}
          </div>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-white/70 align-middle" />
      </div>
    </div>
  );
}
```
> Con movimiento reducido, puedes mostrar directamente todas las líneas: `if (reduce) { setStep(SCRIPT.length) }`.

---

## 11. Contacto (`#contacto`) + botón flotante

**Sección de contacto:**
- Tarjeta con `border-glow` (la luz gira por el borde).
- El título se revela palabra por palabra.
- **Clic en `Copiar`:** copia el correo, `burst()` desde el botón (28 partículas), el ícono cambia de 📋 a ✓ con una rotación y aparece un toast de sonner `¡Correo copiado!`.
- Los íconos sociales con `Magnetic`; al pasar el mouse giran y toman su color de marca.

```tsx
const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
  await navigator.clipboard.writeText("juancamilo.campobarrios@gmail.com");
  const r = e.currentTarget.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 28);
  toast.success("¡Correo copiado!");
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
```

**`FloatingContact.tsx`** (el botón redondo del video, abajo a la derecha):
- Aparece cuando el hero sale de pantalla (`useScroll`, `scrollY > 500`).
- Tiene un anillo de pulso violeta.
- **Clic:** se abren 3 burbujas en abanico con resorte (Correo, WhatsApp, LinkedIn) y el ícono principal gira 45° hasta formar una ✕.

```tsx
"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Linkedin, Mail, MessageCircle, Plus } from "lucide-react";

const ACTIONS = [
  { label: "Correo", href: "mailto:juancamilo.campobarrios@gmail.com", Icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/573013183474", Icon: MessageCircle },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/", Icon: Linkedin },
];

export function FloatingContact() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 500));
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div className="fixed bottom-6 right-6 z-[60]" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
          <AnimatePresence>
            {open && ACTIONS.map(({ label, href, Icon }, i) => {
              const angle = (Math.PI / 2) * (i / (ACTIONS.length - 1)); // abanico de 90° hacia arriba-izquierda
              return (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="absolute bottom-1 right-1 grid size-11 place-items-center rounded-full glass bg-ink-900/90"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{ x: -Math.cos(angle) * 80, y: -Math.sin(angle) * 80, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20, delay: i * 0.04 }}>
                  <Icon className="size-5" />
                </motion.a>
              );
            })}
          </AnimatePresence>
          <motion.button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Contacto rápido" whileTap={{ scale: 0.9 }}
            className="relative grid size-13 place-items-center rounded-full bg-linear-to-br from-brand-500 to-fuchsia-500 shadow-[0_0_30px_-4px_rgb(139_92_246/0.9)]">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40 motion-reduce:hidden" />
            <motion.span animate={{ rotate: open ? 45 : 0 }}><Plus className="size-6" /></motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
```

---

## 12. Footer

- Todo el footer aparece con `RevealGroup`: el avatar `JB` (círculo con gradiente violeta que gira lento), el texto y las columnas.
- Los enlaces de navegación tienen una línea que crece de izquierda a derecha al pasar el mouse.
- **`Subir ↑`:** con `Magnetic`. Al hacer clic, la flecha sale disparada hacia arriba (`y: -20, opacity: 0`) y vuelve a aparecer, mientras `scrollToTop()` lleva al inicio con Lenis.

---

## 13. Celular frente a escritorio

| Efecto | Escritorio (mouse) | Celular / táctil |
|---|---|---|
| Scroll suave Lenis | Sí | Scroll nativo (más fluido en táctil) |
| Luz que sigue el cursor | Sí | No se renderiza |
| `TiltCard` 3D | Inclinación + reflejo | Solo escala al tocar (`whileTap`) |
| `Magnetic` | Sí | Solo `whileTap` |
| Partículas al clic | 14 por clic | 10 por toque |
| Anillo de órbita | 300 partículas, 440 px | 160 partículas, 300 px |
| Blur entre secciones | Sí | Solo escala y opacidad |
| Carrusel de formación | Arrastre con mouse | Swipe con el dedo |
| Habilidades | Todas las tarjetas visibles | Una tarjeta por pestaña con deslizamiento |
| Menú | Píldora con indicador | Pantalla completa con entrada escalonada |
| Botón flotante | Sí | Sí (pulgar a la derecha) |

**Revelados en celular:** usa `viewport={{ once: true, amount: 0.15 }}` para que las animaciones empiecen antes, y reduce `y: 40` a `y: 24`.

---

## 14. Rendimiento y accesibilidad (no negociable)

En un perfil de QA, el portafolio también se evalúa como producto. Un sitio lento o inaccesible juega en contra.

**Rendimiento**
- [ ] Anima solo `transform` y `opacity`. `filter: blur` solo en escritorio y en pocos elementos a la vez.
- [ ] Todas las animaciones de entrada con `once: true` (no se repiten al volver a subir).
- [ ] Los canvas (`OrbitRing`, `ClickSpark`) se pausan cuando no hay nada que dibujar o cuando salen de pantalla.
- [ ] Carga diferida de lo pesado. En un Client Component: `const OrbitRing = dynamic(() => import("@/components/motion/OrbitRing").then(m => m.OrbitRing), { ssr: false })`.
- [ ] Imágenes de proyectos en `.webp`, con `next/image` y `sizes` correctos. Solo la foto del hero lleva `priority`.
- [ ] Opcional: cambia `motion` por `m` + `LazyMotion features={domMax}` para reducir el bundle de framer-motion.
- [ ] Meta Lighthouse: **Rendimiento ≥ 90, Accesibilidad ≥ 95, SEO 100**, tanto en móvil como en escritorio.

**Accesibilidad**
- [ ] `MotionConfig reducedMotion="user"` + el bloque CSS `prefers-reduced-motion` + los canvas que respetan la preferencia. Con movimiento reducido, el sitio sigue completo pero quieto.
- [ ] Los textos animados (`ScrambleText`, `TypeRotator`, títulos por palabra) tienen el texto real en `sr-only` o `aria-label`.
- [ ] El modal: `role="dialog"`, `aria-modal`, se cierra con `Esc` y el foco vuelve a la tarjeta al cerrar.
- [ ] Botones de solo ícono con `aria-label`.
- [ ] Contraste del texto gris sobre negro ≥ 4.5:1 (`text-white/60` como mínimo para párrafos).
- [ ] Todo lo que tiene hover también funciona con teclado (`focus-visible:` con el mismo estilo que `hover:`).

---

## 15. Orden de implementación (fases)

| Fase | Qué incluye | Resultado visible |
|---|---|---|
| **1. Base** | `npm i lenis`, tokens CSS, `lib/motion.ts`, `lib/scroll.ts`, hooks, `MotionConfig`, tema oscuro | Paleta del video aplicada |
| **2. Capa global** | `SmoothScroll`, `AnimatedBackground` + `CursorGlow`, `ScrollProgress`, `ClickSpark`, `template.tsx` | Fondo vivo, scroll suave y partículas al hacer clic |
| **3. Header + Hero** | Header con píldora, `ScrambleText`, `TypeRotator`, `OrbitRing`, foto con parallax, botones | La primera pantalla ya se parece al video |
| **4. Revelados** | `Reveal`, `RevealTitle`, `SectionTransition` en **todas** las secciones | Todo aparece al hacer scroll |
| **5. Proyectos** | Filtros, `TiltCard`, modal compartido, carrusel, `ZoomOnScroll` | El clic "wow" |
| **6. Experiencia + Habilidades** | `NeonTimeline`, acordeón, pestañas, chips "Dónde lo usé" | Interacción informativa |
| **7. Sobre mí + Contacto + Footer** | `CountUp`, `Terminal`, `border-glow`, copiar con partículas, `FloatingContact`, `Subir` | Cierre completo |
| **8. Detalles** | Animaciones en `/proyectos/[slug]` y `/experience/[slug]`, lightbox | Páginas internas coherentes |
| **9. QA final** | Checklist de la sección 16 + Lighthouse | Listo para publicar |

---

## 16. Checklist de validación

### Visual (comparado con el video)
- [ ] Fondo negro con cuadrícula que se mueve lento, orbes violeta y cian, y documentos flotantes.
- [ ] Header de cristal flotante con píldora que se desliza entre enlaces.
- [ ] El nombre se decodifica con caracteres hex y queda en gradiente violeta.
- [ ] La foto tiene un anillo de partículas que pasa por detrás y por delante, con esfera brillante.
- [ ] Filtros de proyectos con píldora violeta y tarjetas que se reacomodan.
- [ ] La tarjeta "¿Quieres ver cómo escribo código?" crece y se enfoca con el scroll.
- [ ] La línea de tiempo neón se llena con el scroll y el punto cian viaja.
- [ ] Pestañas de habilidades con tarjetas 3D.
- [ ] Botón flotante redondo abajo a la derecha.
- [ ] Footer con avatar `JB` y botón `Subir` violeta.

### Interacción
- [ ] Clic en cualquier parte: partículas.
- [ ] Clic en una tarjeta de proyecto: se expande en modal. `Esc` y clic afuera la cierran.
- [ ] Clic en un chip de habilidad: muestra "Dónde lo usé".
- [ ] Clic en una certificación: se abre el acordeón.
- [ ] Copiar el correo (badge del hero y contacto): partículas + toast.
- [ ] Botón flotante: abanico de Correo, WhatsApp y LinkedIn.
- [ ] El carrusel de formación se arrastra con mouse y con el dedo.
- [ ] Los enlaces del header llevan con scroll suave a cada sección.

### Calidad
- [ ] Probado en Chrome, Firefox y Safari (escritorio), y en Android e iPhone.
- [ ] Con "Reducir movimiento" activado en el sistema, el sitio funciona sin animaciones de movimiento.
- [ ] Sin errores en consola ni advertencias de hidratación.
- [ ] Sin saltos de layout al cargar (CLS < 0,1).
- [ ] Lighthouse móvil: Rendimiento ≥ 90 · Accesibilidad ≥ 95 · SEO 100.
- [ ] 60 fps al hacer scroll (DevTools → Performance, sin tareas largas en rojo).
- [ ] Todo funciona solo con teclado (Tab, Enter, Esc).
