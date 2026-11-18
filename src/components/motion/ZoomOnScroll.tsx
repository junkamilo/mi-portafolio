"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ZoomOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // Solo transform y opacidad (sin blur animado, que repintaba todo el bloque)
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <div ref={ref} className="relative [perspective:1000px]">
      <motion.div style={{ scale, opacity, rotateX, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
