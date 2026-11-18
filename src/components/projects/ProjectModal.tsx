"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Cloud,
  ExternalLink,
  Github,
  Globe2,
  Layout,
  Server,
  X,
} from "lucide-react";
import { lenisRef } from "@/lib/scroll";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { Project, ProjectSystemPart } from "@/src/config/projects-data";
import { StackLayerIcons } from "@/src/components/projects/StackLayerIcons";
import { cn } from "@/lib/utils";

const ICONS: Record<ProjectSystemPart["id"], typeof Globe2> = {
  web: Globe2,
  cloud: Cloud,
  frontend: Layout,
  backend: Server,
};

function ModalSystemPart({
  part,
  active,
  onSelect,
}: {
  part: ProjectSystemPart;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = ICONS[part.id];
  const isWeb = part.id === "web" || part.id === "frontend";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "min-w-0 flex-1 rounded-2xl border p-4 text-left transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60",
        active
          ? isWeb
            ? "border-brand-400 bg-brand-500/20 shadow-[0_0_28px_-6px_rgb(139_92_246/0.7)] ring-1 ring-brand-400/40"
            : "border-neon-400 bg-neon-400/15 shadow-[0_0_28px_-6px_rgb(34_211_238/0.55)] ring-1 ring-neon-400/40"
          : isWeb
            ? "border-brand-500/20 bg-brand-500/5 opacity-70 hover:opacity-100 hover:border-brand-500/40"
            : "border-neon-400/20 bg-neon-400/5 opacity-70 hover:opacity-100 hover:border-neon-400/40",
      )}
    >
      <span
        className={cn(
          "mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1",
          isWeb
            ? "bg-brand-500/20 text-brand-300 ring-brand-500/30"
            : "bg-neon-400/20 text-neon-400 ring-neon-400/30",
        )}
      >
        <Icon size={12} />
        {isWeb ? "Web" : part.id === "cloud" ? "Cloud" : "Admin"}
        {active && (
          <span className="ml-0.5 rounded-full bg-white/15 px-1.5 py-px text-[9px] normal-case tracking-normal text-white/80">
            activo
          </span>
        )}
      </span>
      <p className="font-semibold text-white">{part.label}</p>
      <p className="mt-1 text-sm text-white/55">{part.subtitle}</p>
    </button>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const arch = project.architecture;
  const parts = arch?.parts ?? [];
  const defaultId = parts[0]?.id ?? "web";
  const [activeId, setActiveId] = useState<ProjectSystemPart["id"]>(defaultId);

  useEffect(() => {
    setActiveId(parts[0]?.id ?? "web");
  }, [project.slug]); // reset al cambiar de proyecto

  useEffect(() => {
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const active = parts.find((p) => p.id === activeId) ?? parts[0];
  const isWebActive = active?.id === "web" || active?.id === "frontend";
  const pageHref = active?.demoUrl || project.links.demo;
  const repoHref = active?.repoUrl || project.links.github;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="absolute inset-0 bg-ink-950/92"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        layoutId={`card-${project.slug}`}
        className="border-glow relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl glass bg-ink-900/95"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-20 rounded-full glass p-2 text-white transition-transform hover:rotate-90"
        >
          <X className="size-4" />
        </button>

        <div
          className="custom-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto"
          data-lenis-prevent
        >
          {/* Selector Web / Cloud */}
          <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/50 px-5 pb-5 pt-12 md:px-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.22), transparent)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 bottom-0 size-36 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.15), transparent)" }}
            />

            {parts.length >= 2 && (
              <div className="relative flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <ModalSystemPart
                  part={parts[0]}
                  active={activeId === parts[0].id}
                  onSelect={() => setActiveId(parts[0].id)}
                />
                <div className="flex shrink-0 flex-col items-center justify-center gap-1 px-1">
                  <div className="hidden h-px w-8 bg-linear-to-r from-brand-400 to-neon-400 sm:block" />
                  <div className="grid size-9 place-items-center rounded-full border border-white/15 bg-ink-900 text-brand-300 shadow-[0_0_18px_-2px_rgb(139_92_246/0.85)]">
                    <ArrowLeftRight size={16} />
                  </div>
                  {arch?.linkLabel && (
                    <p className="max-w-[7rem] text-center text-[10px] font-medium uppercase tracking-wider text-white/40">
                      {arch.linkLabel}
                    </p>
                  )}
                  <div className="hidden h-px w-8 bg-linear-to-r from-neon-400 to-brand-400 sm:block" />
                </div>
                <ModalSystemPart
                  part={parts[1]}
                  active={activeId === parts[1].id}
                  onSelect={() => setActiveId(parts[1].id)}
                />
              </div>
            )}

            <p className="relative mt-3 text-center text-[11px] text-white/35">
              Haz clic en Web o Cloud para ver el detalle de cada sistema
            </p>
          </div>

          {/* Contenido según la parte activa */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                className="space-y-6 p-6 md:p-8"
                variants={staggerContainer(0.07, 0.08)}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 8 }}
              >
                <motion.div variants={fadeUp} className="space-y-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-2xl font-bold text-white">{active.label}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {pageHref && (
                        <a
                          href={pageHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
                            isWebActive
                              ? "text-brand-300 hover:text-brand-200"
                              : "text-neon-400 hover:text-neon-300",
                          )}
                        >
                          <ExternalLink size={14} />
                          Link de la página
                        </a>
                      )}
                      {repoHref && (
                        <a
                          href={repoHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
                        >
                          <Github size={14} />
                          Link del repositorio
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-white/70">{active.description}</p>
                </motion.div>

                {active.features && active.features.length > 0 && (
                  <motion.div variants={fadeUp} className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                      Características
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      {active.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span
                            className={cn(
                              "mt-1.5 size-1.5 shrink-0 rounded-full",
                              isWebActive ? "bg-brand-400" : "bg-neon-400",
                            )}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {active.bannerImage && (
                  <motion.div
                    variants={fadeUp}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-ink-950"
                  >
                    <Image
                      src={active.bannerImage}
                      alt={`Vista de ${active.label}`}
                      width={1600}
                      height={900}
                      className="h-auto w-full object-contain"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  </motion.div>
                )}

                {active.layers && active.layers.length > 0 && (
                  <motion.div variants={fadeUp} className="space-y-3">
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide",
                        isWebActive ? "text-brand-300" : "text-neon-400",
                      )}
                    >
                      Stack de {isWebActive ? "Web" : active.id === "cloud" ? "Cloud" : "esta capa"}
                    </p>
                    <StackLayerIcons
                      layers={active.layers}
                      accent={isWebActive ? "brand" : "neon"}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
