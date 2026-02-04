"use client";

import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants } from "@/src/config/hero-data";
import { PROJECTS } from "@/src/config/projects-data";
import { ProjectCard } from "./ProjectCard";

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-background relative overflow-hidden">

      {/* --- FONDO PERSONALIZADO --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        {/* Header de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Proyectos Destacados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones reales que demuestran arquitectura sólida, código limpio y visión de producto.
          </p>
        </motion.div>

        {/* Grid de Proyectos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 max-w-2xl mx-auto shadow-sm">
            <p className="text-gray-900 font-bold mb-4 text-lg">
              ¿Te interesa ver cómo escribo código?
            </p>
            <p className="text-gray-600 mb-6 text-sm">
              Explora mis repositorios para ver mis proyectos personales.
            </p>

            {/* CAMBIO CLAVE: Botón con colores explícitos (Negro sólido) */}
            <Button
              size="lg"
              className="gap-2 group shadow-md bg-black text-white hover:bg-gray-800 transition-all border-0"
              asChild
            >
              <a href="https://github.com/junkamilo" target="_blank" rel="noreferrer">
                <Github className="w-4 h-4" />
                Explorar GitHub
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}