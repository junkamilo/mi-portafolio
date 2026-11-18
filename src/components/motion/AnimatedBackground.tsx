"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Braces,
  Bug,
  Database,
  FolderGit2,
  GitBranch,
  Server,
  TerminalSquare,
  TestTube2,
} from "lucide-react";
import { useFinePointer } from "@/src/hooks/use-media-query";

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

// Resplandores con gradiente radial en vez de `blur`: se ven igual de suaves,
// pero un blur grande en un elemento que se mueve obliga a repintarlo en cada frame.
const ORB_BRAND = "radial-gradient(closest-side, rgba(124,58,237,0.30), transparent)";
const ORB_NEON = "radial-gradient(closest-side, rgba(34,211,238,0.14), transparent)";
const CURSOR_GLOW = "radial-gradient(closest-side, rgba(139,92,246,0.16), transparent)";

function CursorGlow() {
  const fine = useFinePointer();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 110, damping: 20 });
  const sy = useSpring(y, { stiffness: 110, damping: 20 });

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy, background: CURSOR_GLOW, willChange: "transform" }}
      className="absolute left-0 top-0 -ml-[220px] -mt-[220px] size-[440px] rounded-full"
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
      <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]">
        <div className="grid-drift bg-grid" />
      </div>
      <motion.div
        style={{ y: orbA, background: ORB_BRAND, willChange: "transform" }}
        className="absolute -left-40 top-16 size-[520px] rounded-full"
      />
      <motion.div
        style={{ y: orbB, background: ORB_NEON, willChange: "transform" }}
        className="absolute -right-40 top-[45%] size-[480px] rounded-full"
      />
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
