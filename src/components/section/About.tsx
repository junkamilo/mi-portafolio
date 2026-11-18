"use client";

import { motion } from "framer-motion";
import { ABOUT_DATA } from "@/src/config/about-data";
import { NeonTimeline } from "@/src/components/motion/NeonTimeline";
import { Terminal } from "@/src/components/motion/Terminal";
import { RevealTitle } from "@/src/components/motion/Reveal";
import { SectionTransition } from "@/src/components/motion/SectionTransition";
import { fadeUp } from "@/lib/motion";

export default function About() {
  return (
    <SectionTransition id="sobre-mi" className="py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="space-y-10">
          <div className="space-y-3">
            <RevealTitle
              text={ABOUT_DATA.title}
              className="text-3xl font-bold tracking-tight text-white md:text-5xl"
            />
            <p className="text-xl font-semibold text-brand-300">
              {ABOUT_DATA.subtitle}
            </p>
          </div>

          <NeonTimeline>
            {ABOUT_DATA.timeline.map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.08}
                className="relative group"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-white/60 transition group-hover:border-brand-500/40 group-hover:text-brand-300">
                    <item.icon size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-white md:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="pl-12 text-base leading-relaxed text-white/60">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </NeonTimeline>

          <Terminal />
        </div>
      </div>
    </SectionTransition>
  );
}
