"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { containerVariants } from "@/src/config/hero-data";
import { SKILL_CATEGORIES } from "@/src/config/skills-data";
import { cn } from "@/lib/utils";

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-background relative overflow-hidden">

      {/* Fondo Tecnológico (Malla) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        {/* --- INNOVACIÓN TÍTULO: Badge Animado + Texto Staggered --- */}
        <div className="text-center mb-20 flex flex-col items-center">

          {/* Título Principal CORREGIDO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            // CAMBIOS AQUÍ: Agregué 'pb-2' y ajusté el gradiente para que se lea mejor
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80 pb-2"
          >
            Arsenal Tecnológico
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Priorizo herramientas que garantizan rendimiento, escalabilidad y código limpio.
          </motion.p>
        </div>

        {/* --- GRID DE CARDS CON TILT 3D --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <TiltCard
              key={category.id}
              className="h-full"
            >
              <div className="relative z-10 p-8 space-y-6 h-full flex flex-col">

                {/* Icono (Sin número) */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                  <category.icon size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Badges de Skills */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-secondary/50 text-secondary-foreground border border-border/50 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)] cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENTE: TILT CARD (INNOVACIÓN 3D) ---
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Valores de movimiento del mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformaciones para el efecto Tilt (Inclinación)
  // Mouse X -> Rota en eje Y
  // Mouse Y -> Rota en eje X
  const rotateX = useTransform(y, [0, 400], [5, -5]); // Rango de inclinación sutil
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  // Suavizado del movimiento (Spring physics) para que no sea rígido
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculamos la posición relativa del mouse dentro de la card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    // Al salir, reseteamos la posición para que la card vuelva a estar plana
    x.set(0);
    y.set(0);
    // Nota: como usamos spring, volverá suavemente al centro, no de golpe.
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000, // Necesario para el efecto 3D
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={cn("relative group", className)}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d", // Mantiene la profundidad 3D
        }}
        className="relative h-full rounded-2xl border border-border/50 bg-card p-[1px] overflow-hidden transition-colors hover:border-primary/30"
      >
        {/* --- 1. Spotlight (Luz de fondo) --- */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${x}px ${y}px,
                rgba(var(--primary-rgb), 0.1),
                transparent 80%
              )
            `,
          }}
        />

        {/* --- 2. Contenido --- */}
        <div className="relative z-10 h-full bg-card/50 backdrop-blur-sm rounded-xl">
          {children}
        </div>

      </motion.div>
    </motion.div>
  );
}