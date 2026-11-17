"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export function ZoomOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
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
