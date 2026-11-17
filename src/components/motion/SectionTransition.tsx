"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useFinePointer } from "@/src/hooks/use-media-query";

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
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [fine ? 6 : 0, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ scale, opacity, filter }}
      className={`relative scroll-mt-24 ${className ?? ""}`}
    >
      {children}
    </motion.section>
  );
}
