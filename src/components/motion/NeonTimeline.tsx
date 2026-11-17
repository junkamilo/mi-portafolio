"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function NeonTimeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const dotTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-3 top-0 h-full w-px bg-white/10" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute left-3 top-0 h-full w-[2px] origin-top bg-linear-to-b from-brand-500 via-fuchsia-500 to-neon-400 shadow-[0_0_14px_rgb(139_92_246/0.9)]"
      />
      <motion.div
        style={{ top: dotTop }}
        className="absolute left-3 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-400 shadow-[0_0_18px_4px_rgb(34_211_238/0.7)]"
      />
      <div className="space-y-8">{children}</div>
    </div>
  );
}
