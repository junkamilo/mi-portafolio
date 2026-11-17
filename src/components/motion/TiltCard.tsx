"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/src/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
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
      className={cn(
        "group relative rounded-2xl glass transition-[border-color] duration-300 hover:border-brand-500/50",
        className,
      )}
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
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
