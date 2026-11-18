"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Cloud,
  Globe2,
  Layout,
  Server,
  ShieldCheck,
} from "lucide-react";
import { TiltCard } from "@/src/components/motion/TiltCard";
import type { Project, ProjectSystemPart } from "@/src/config/projects-data";
import { cn } from "@/lib/utils";

// Resplandores con gradiente radial (sin `blur`): igual de suaves, pero sin un filtro
// por frame cuando la tarjeta se mueve con el mouse o con el scroll.
const GLOW_BRAND = "radial-gradient(closest-side, rgba(139,92,246,0.35), transparent)";
const GLOW_NEON = "radial-gradient(closest-side, rgba(34,211,238,0.28), transparent)";
const HEAD_BRAND = "radial-gradient(closest-side, rgba(139,92,246,0.22), transparent)";
const HEAD_NEON = "radial-gradient(closest-side, rgba(34,211,238,0.15), transparent)";

const PART_META: Record<
  ProjectSystemPart["id"],
  { Icon: typeof Globe2; accent: string; chip: string; glow: string }
> = {
  web: {
    Icon: Globe2,
    accent: "from-brand-500/30 to-fuchsia-500/10",
    chip: "bg-brand-500/15 text-brand-300 ring-brand-500/30",
    glow: GLOW_BRAND,
  },
  cloud: {
    Icon: Cloud,
    accent: "from-neon-400/25 to-brand-500/10",
    chip: "bg-neon-400/15 text-neon-400 ring-neon-400/30",
    glow: GLOW_NEON,
  },
  frontend: {
    Icon: Layout,
    accent: "from-brand-500/30 to-fuchsia-500/10",
    chip: "bg-brand-500/15 text-brand-300 ring-brand-500/30",
    glow: GLOW_BRAND,
  },
  backend: {
    Icon: Server,
    accent: "from-neon-400/25 to-brand-500/10",
    chip: "bg-neon-400/15 text-neon-400 ring-neon-400/30",
    glow: GLOW_NEON,
  },
};

function partBadgeLabel(id: ProjectSystemPart["id"]) {
  if (id === "web" || id === "frontend") return "Web";
  if (id === "cloud") return "Cloud";
  if (id === "backend") return "Admin";
  return "API";
}

/** Nodo Web/Cloud: imagen completa + badge pequeño en esquina */
function SystemNode({ part }: { part: ProjectSystemPart }) {
  const meta = PART_META[part.id];
  const Icon = meta.Icon;
  const hasBanner = Boolean(part.bannerImage);

  return (
    <div
      className={cn(
        "relative flex-1 overflow-hidden rounded-xl border border-white/10",
        hasBanner
          ? "aspect-[4/3] bg-ink-950"
          : "min-h-[160px] bg-ink-950/60 p-3 bg-linear-to-br",
        !hasBanner && meta.accent,
      )}
    >
      {hasBanner ? (
        <Image
          src={part.bannerImage!}
          alt={part.label}
          fill
          sizes="(max-width: 768px) 50vw, 360px"
          className="object-contain object-center"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-4 size-16 rounded-full"
          style={{ background: meta.glow }}
        />
      )}

      <div className={cn("relative z-10 p-2.5", !hasBanner && "space-y-2")}>
        <span
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 shadow-sm",
            meta.chip,
            hasBanner && "bg-ink-950/75",
          )}
        >
          <Icon size={11} />
          {partBadgeLabel(part.id)}
        </span>
        {!hasBanner && (
          <p className="text-sm font-semibold leading-snug text-white">
            {part.label}
          </p>
        )}
      </div>
    </div>
  );
}

function ArchitectureDiagram({ project }: { project: Project }) {
  const arch = project.architecture;
  if (!arch || arch.parts.length < 2) return null;

  const [left, right] = arch.parts;
  const dual = arch.kind === "dual";

  return (
    <div className="relative px-5 pt-5">
      <div className="flex items-stretch gap-3">
        <SystemNode part={left} />

        <div className="flex w-11 shrink-0 flex-col items-center justify-center gap-1.5">
          <motion.div
            aria-hidden
            className="h-px w-full bg-linear-to-r from-brand-400 via-fuchsia-400 to-neon-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.div
            animate={{ x: dual ? [0, 3, 0] : 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid size-8 place-items-center rounded-full border border-white/15 bg-ink-900 text-brand-300 shadow-[0_0_16px_-2px_rgb(139_92_246/0.8)]"
          >
            <ArrowLeftRight size={14} />
          </motion.div>
          <motion.div
            aria-hidden
            className="h-px w-full bg-linear-to-r from-neon-400 via-fuchsia-400 to-brand-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        <SystemNode part={right} />
      </div>

      {arch.linkLabel && (
        <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wider text-white/40">
          {arch.linkLabel}
        </p>
      )}
    </div>
  );
}

export function FeaturedProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (e: React.MouseEvent) => void;
}) {
  const isDual = project.architecture?.kind === "dual";

  return (
    <motion.article
      layoutId={`card-${project.slug}`}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="cursor-pointer"
      onClick={onOpen}
    >
      <TiltCard
        className={cn(
          "h-full overflow-hidden transition-shadow duration-300",
          isDual && "hover:shadow-[0_0_40px_-10px_rgb(139_92_246/0.55)]",
        )}
      >
        <div className="relative overflow-hidden border-b border-white/8 bg-ink-950/40 pb-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-size-[24px_24px] opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-0 size-32 rounded-full"
            style={{ background: HEAD_BRAND }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 bottom-0 size-28 rounded-full"
            style={{ background: HEAD_NEON }}
          />

          <ArchitectureDiagram project={project} />

          <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 translate-y-6 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalle →
          </span>
        </div>

        {/* Mitad inferior: badges + título grande, todo centrado */}
        <div className="flex flex-col items-center justify-center gap-3.5 px-6 py-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {isDual ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-300 ring-1 ring-brand-500/30">
                Web + Cloud
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neon-400 ring-1 ring-neon-400/30">
                <ShieldCheck size={11} /> Full Stack + QA
              </span>
            )}
            {project.status && (
              <span className="inline-flex items-center gap-1.5 text-sm text-live-500">
                <span className="live-dot size-2 rounded-full bg-live-500" />
                {project.status}
              </span>
            )}
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h3>
        </div>
      </TiltCard>
    </motion.article>
  );
}
