"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { resolveTechIcon } from "@/lib/tech-icons";
import { useFinePointer } from "@/src/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Variant = "glass" | "neon" | "metal";

type Props = {
  name: string;
  size?: number;
  variant?: Variant;
  /** Animación de flotación / giro sutil */
  animate?: boolean;
  className?: string;
  /** Mostrar etiqueta debajo */
  showLabel?: boolean;
};

const VARIANT_STYLES: Record<Variant, string> = {
  glass:
    "bg-white/[0.06] border-white/15 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]",
  neon: "bg-brand-500/10 border-brand-400/35 shadow-[0_0_22px_-4px_rgb(139_92_246/0.65)]",
  metal:
    "bg-linear-to-br from-white/15 to-white/5 border-white/20 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)]",
};

/**
 * Icono tech con look 3D editable:
 * - material: glass | neon | metal
 * - tilt 3D al pasar el mouse
 * - flotación suave (solo mientras el icono está cerca de la pantalla)
 * - glow del color de marca
 *
 * Usa SVG de marca (simple-icons) o fallback tipográfico.
 * Sin WebGL por icono → rendimiento estable en el modal.
 */
export function TechIcon3D({
  name,
  size = 44,
  variant = "glass",
  animate = true,
  className,
  showLabel = true,
}: Props) {
  const icon = resolveTechIcon(name);
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  // La flotación infinita solo corre cuando el icono está cerca de la pantalla.
  // Con decenas de iconos en la página, animarlos todos a la vez costaba en cada frame.
  const inView = useInView(ref, { margin: "120px" });
  const floating = animate && inView;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 180,
    damping: 16,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 180,
    damping: 16,
  });

  const color = `#${icon.hex.replace("#", "")}`;
  const iconPx = Math.round(size * 0.48);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative flex flex-col items-center gap-1.5",
        showLabel && "w-[4.75rem]",
        className,
      )}
      style={{ perspective: 700 }}
      initial={animate ? { opacity: 0, y: 12, scale: 0.9 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.4 }}
      title={icon.label}
    >
      <motion.div
        className={cn(
          "relative grid place-items-center rounded-2xl border transition-colors",
          VARIANT_STYLES[variant],
        )}
        style={{
          width: size,
          height: size,
          rotateX: fine ? rotX : 0,
          rotateY: fine ? rotY : 0,
          transformStyle: "preserve-3d",
        }}
        animate={floating ? { y: [0, -4, 0], rotateZ: [0, 1.5, 0] } : undefined}
        transition={
          floating ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : undefined
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onPointerMove={(e) => {
          if (!fine) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {/* Glow de marca (capa 3D atrás), con gradiente radial en vez de blur */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-60 transition-opacity group-hover:opacity-90"
          style={{
            background: `radial-gradient(closest-side, ${color}, transparent)`,
            transform: "translateZ(-12px)",
          }}
        />

        {/* Cara superior brillante */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-full bg-linear-to-b from-white/35 to-transparent"
          style={{ transform: "translateZ(8px)" }}
        />

        {icon.path ? (
          <svg
            role="img"
            aria-label={icon.label}
            viewBox="0 0 24 24"
            width={iconPx}
            height={iconPx}
            className="relative"
            style={{ transform: "translateZ(16px)", fill: color }}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span
            aria-label={icon.label}
            className="relative grid place-items-center rounded-lg font-bold"
            style={{
              width: iconPx,
              height: iconPx,
              fontSize: iconPx * 0.55,
              color,
              transform: "translateZ(16px)",
              textShadow: `0 0 12px ${color}88`,
            }}
          >
            {icon.fallback}
          </span>
        )}
      </motion.div>

      {showLabel && (
        <span className="max-w-full truncate text-center text-[10px] font-medium text-white/55 transition-colors group-hover:text-white/85">
          {icon.label}
        </span>
      )}
    </motion.div>
  );
}
