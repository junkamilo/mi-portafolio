"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { WORK_EXPERIENCE, EDUCATION } from "@/src/config/experience-data";
import { NeonTimeline } from "@/src/components/motion/NeonTimeline";
import { RevealTitle } from "@/src/components/motion/Reveal";
import { SectionTransition } from "@/src/components/motion/SectionTransition";
import { fadeSide, EASE } from "@/lib/motion";

const BORDER_BY_TYPE: Record<string, string> = {
  degree: "border-brand-500",
  certificate: "border-live-500",
  course: "border-amber-400",
};

const LABEL_BORDER: Record<string, string> = {
  Pregrado: "border-brand-500",
  Tecnología: "border-neon-400",
  Certificado: "border-live-500",
  Curso: "border-amber-400",
};

export default function Experience() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <SectionTransition id="experiencia" className="py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center text-center md:mb-24">
          <RevealTitle
            text="Experiencia y formación"
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
          />
          <p className="max-w-2xl text-lg leading-relaxed text-white/60">
            Mi experiencia en empresas, los proyectos que tengo en producción y la
            formación que los respalda.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-10 flex items-center gap-3">
              <div className="rounded-xl bg-brand-500/15 p-2.5 text-brand-300 ring-1 ring-brand-500/30">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Experiencia laboral</h3>
            </div>

            <NeonTimeline>
              {WORK_EXPERIENCE.map((job, i) => (
                <motion.div
                  key={job.id}
                  variants={fadeSide("left")}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i * 0.08}
                  className="group"
                >
                  <div className="rounded-2xl glass p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                    <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h4 className="mb-1 text-xl font-bold text-white transition-colors group-hover:text-brand-300">
                          {job.role}
                        </h4>
                        <p className="text-sm font-medium text-white/75">
                          {job.company}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
                        <Calendar size={12} />
                        {job.period}
                      </span>
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-white/60 md:text-base">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {job.skills.map((skill, j) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + j * 0.04, ease: EASE }}
                          className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/70"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </NeonTimeline>
          </div>

          <div className="lg:col-span-5">
            <h3 className="mb-8 text-2xl font-bold text-white">
              Educación y certificaciones
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((item, i) => {
                const open = openId === item.id;
                const border =
                  LABEL_BORDER[item.label] ||
                  BORDER_BY_TYPE[item.type] ||
                  "border-brand-500";
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeSide("right")}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i * 0.06}
                    layout
                    className={`glass rounded-xl border-l-2 p-4 ${border}`}
                  >
                    <button
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="flex w-full items-center justify-between gap-3 text-left"
                      aria-expanded={open}
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                          {item.label} · {item.period}
                        </p>
                        <p className="mt-1 font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-white/55">{item.institution}</p>
                      </div>
                      <motion.span
                        animate={{ rotate: open ? 90 : 0 }}
                        className="text-2xl text-white/50"
                      >
                        ›
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-3 border-t border-white/10 pt-3 text-sm text-white/60">
                            <p>
                              Formación que respalda mi perfil Full Stack y QA.
                              Revisa el detalle completo con habilidades y
                              proyectos relacionados.
                            </p>
                            <Link
                              href={`/experience/${item.slug}`}
                              className="inline-flex text-brand-300 hover:text-brand-400"
                            >
                              Ver detalle completo →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
