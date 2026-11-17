"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/src/components/motion/TiltCard";
import type { TrainingProject } from "@/src/config/projects-data";

export function TrainingCarousel({ items }: { items: TrainingProject[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setMax(Math.max(0, el.scrollWidth - el.offsetWidth)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={track}
      className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -max, right: 0 }}
        dragElastic={0.12}
        className="flex w-max cursor-grab gap-5 px-6 py-4 active:cursor-grabbing"
      >
        {items.map((p, i) => (
          <motion.div
            key={p.title}
            className="w-[280px] shrink-0 md:w-[340px]"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <TiltCard className="h-full p-5">
              <h4 className="font-semibold text-white">{p.title}</h4>
              <p className="mt-2 text-sm text-white/60">{p.shortDescription}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.technologies.slice(0, 5).map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-wide text-white/70"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {p.links[0] && (
                <a
                  href={p.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-brand-300 hover:text-brand-400"
                >
                  {p.links[0].label} ↗
                </a>
              )}
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-2 text-center text-xs text-white/40">
        ← Arrastra para ver más →
      </p>
    </div>
  );
}
