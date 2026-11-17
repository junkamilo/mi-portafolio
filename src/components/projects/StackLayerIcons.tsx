"use client";

import { TechIcon3D } from "@/src/components/motion/TechIcon3D";
import { parseTechItems } from "@/lib/tech-icons";
import type { ProjectStackLayer } from "@/src/config/projects-data";
import { cn } from "@/lib/utils";

/**
 * Muestra cada capa del stack con logos 3D (no texto plano).
 * Ej: Frontend → [Next.js] [React] [TypeScript] [Tailwind]
 */
export function StackLayerIcons({
  layers,
  accent = "brand",
}: {
  layers: ProjectStackLayer[];
  accent?: "brand" | "neon";
}) {
  return (
    <div className="space-y-3">
      {layers.map((layer) => {
        const techs = parseTechItems(layer.items);
        return (
          <div
            key={layer.layer}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 md:p-5"
          >
            <p
              className={cn(
                "mb-4 text-xs font-semibold uppercase tracking-wider",
                accent === "brand" ? "text-brand-300" : "text-neon-400",
              )}
            >
              {layer.layer}
            </p>

            {/* Aquí van los logos, no los nombres en texto */}
            <div className="flex flex-wrap items-start gap-x-2 gap-y-4">
              {techs.map((tech) => (
                <TechIcon3D
                  key={`${layer.layer}-${tech}`}
                  name={tech}
                  size={52}
                  showLabel
                  animate
                  variant={accent === "brand" ? "neon" : "glass"}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
