import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

// Entrada con opacidad y desplazamiento. Sin `filter: blur`: animarlo en cada elemento
// de la página obligaba a repintar todo al entrar en pantalla.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

export const fadeSide = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -60 : 60 },
  show: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20, delay },
  }),
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
