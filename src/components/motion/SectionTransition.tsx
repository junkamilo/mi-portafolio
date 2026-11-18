"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SectionTransition({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  // Solo transform y opacidad, que la GPU resuelve sin repintar la sección.
  // (Antes se animaba un blur sobre toda la sección en cada frame del scroll.)
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ scale, opacity, willChange: "transform" }}
      className={`relative scroll-mt-24 ${className ?? ""}`}
    >
      {children}
    </motion.section>
  );
}
