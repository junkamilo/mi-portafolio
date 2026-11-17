"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Github, FileDown } from "lucide-react";
import { burst } from "@/src/components/motion/ClickSpark";
import { ProjectModal } from "./ProjectModal";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ZoomOnScroll } from "@/src/components/motion/ZoomOnScroll";
import { RevealTitle } from "@/src/components/motion/Reveal";
import { SectionTransition } from "@/src/components/motion/SectionTransition";
import { Magnetic } from "@/src/components/motion/Magnetic";
import { ShineButton } from "@/src/components/motion/ShineButton";
import {
  featuredProjects,
  type Project,
  type ProjectTag,
} from "@/src/config/projects-data";
import { CV_FILENAME, CV_URL, SOCIAL_LINKS } from "@/src/config/contact-data";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack" },
  { id: "qa", label: "QA Automation" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "cloud", label: "Cloud / Docker" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const list =
    filter === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.tags.includes(filter as ProjectTag));

  const github = SOCIAL_LINKS.find((l) => l.name === "github")?.href ?? "#";

  return (
    <SectionTransition id="proyectos" className="py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 space-y-4 text-center">
          <RevealTitle
            text="Proyectos destacados"
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          />
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Aplicaciones reales en producción. En Casa Verde y DYL Store la{" "}
            <span className="text-brand-300">Web</span> y la{" "}
            <span className="text-neon-400">Cloud</span> trabajan conectadas;
            Shamell es una plataforma Full Stack con QA en todas las capas.
          </p>
        </div>

        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Filtrar proyectos"
            className="mx-auto mb-10 flex w-fit flex-wrap justify-center gap-1 rounded-full glass p-1"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className="relative rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors aria-selected:text-white"
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-brand-500 shadow-[0_0_24px_-4px_rgb(139_92_246/0.9)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <FeaturedProjectCard
                  key={p.slug}
                  project={p}
                  index={i}
                  onOpen={(e) => {
                    burst(e.clientX, e.clientY, 22);
                    setSelected(p);
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {selected && (
              <ProjectModal project={selected} onClose={() => setSelected(null)} />
            )}
          </AnimatePresence>
        </LayoutGroup>

        <div className="mt-20">
          <ZoomOnScroll>
            <div className="border-glow relative mx-auto max-w-2xl overflow-hidden rounded-3xl glass bg-ink-900/80 p-8 text-center shadow-[0_0_60px_-10px_rgb(139_92_246/0.55)] md:p-10">
              {/* Orbes de ambiente */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 -top-16 size-44 rounded-full bg-brand-500/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-12 size-48 rounded-full bg-neon-400/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
              />

              <div className="relative z-10">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-300">
                  <span className="live-dot size-1.5 rounded-full bg-neon-400 text-neon-400" />
                  Código en producción
                </span>

                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  ¿Quieres ver cómo{" "}
                  <span className="text-gradient">escribo código</span>?
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-white/60">
                  Revisa mis repositorios públicos o descarga mi CV con el detalle
                  de stack, experiencia y proyectos en producción.
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Magnetic>
                    <ShineButton href={github} className="group">
                      <Github className="size-4 transition-transform duration-500 group-hover:rotate-[360deg]" />
                      Ver GitHub
                    </ShineButton>
                  </Magnetic>
                  <Magnetic>
                    <ShineButton href={CV_URL} download={CV_FILENAME} variant="glass">
                      <FileDown className="size-4" /> Descargar CV
                    </ShineButton>
                  </Magnetic>
                </div>
              </div>
            </div>
          </ZoomOnScroll>
        </div>
      </div>
    </SectionTransition>
  );
}
