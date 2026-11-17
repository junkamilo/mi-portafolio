"use client";

import { motion } from "framer-motion";
import { ABOUT_DATA } from "@/src/config/about-data";
import { NeonTimeline } from "@/src/components/motion/NeonTimeline";
import { Terminal } from "@/src/components/motion/Terminal";
import { CountUp } from "@/src/components/motion/CountUp";
import { TiltCard } from "@/src/components/motion/TiltCard";
import { RevealTitle } from "@/src/components/motion/Reveal";
import { SectionTransition } from "@/src/components/motion/SectionTransition";
import { fadeUp } from "@/lib/motion";

export default function About() {
  return (
    <SectionTransition id="sobre-mi" className="py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ABOUT_DATA.stats.map((stat, i) => (
              <TiltCard key={stat.label} className="p-6">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="space-y-3"
                >
                  <div
                    className={`inline-flex rounded-xl p-2.5 ${stat.bg} ${stat.color}`}
                  >
                    <stat.icon size={20} />
                  </div>
                  <p className="text-sm text-white/50">{stat.label}</p>
                  <p className="text-xl font-bold text-white">
                    {stat.label === "En producción" ? (
                      <>
                        <CountUp to={3} /> proyectos
                      </>
                    ) : (
                      stat.value
                    )}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
