"use client"

import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants } from "@/src/config/hero-data";
import { PROJECTS } from "@/src/config/projects-data";
import { cardVariants } from "@/src/config/skills-data";



export default function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6 mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Proyectos Destacados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una colección de soluciones que demuestran mi capacidad para resolver problemas complejos.
          </p>
        </motion.div>

        {/* Grid de Proyectos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {PROJECTS.map((project, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
            >
              {/* 1. MOCKUP DE IMAGEN (O Gradiente) */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.image} relative overflow-hidden`}>
                {/* Overlay oscuro al hacer hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Icono decorativo flotante */}
                <FolderGit2 className="absolute bottom-4 right-4 text-primary/20 w-24 h-24 rotate-12 transform translate-y-8 translate-x-8 group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-500" />
              </div>

              {/* 2. CONTENIDO */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Links (Github / Demo) */}
                  <div className="flex gap-2">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1">
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags de Tecnologías (Al final de la tarjeta) */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Botón "Ver más" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" size="lg" className="gap-2">
            <Github className="w-4 h-4" /> Ver repositorio completo
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
