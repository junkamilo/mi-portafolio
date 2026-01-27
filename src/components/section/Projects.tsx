"use client"

import Link from "next/link"; // ✅ Import Link for navigation
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants } from "@/src/config/hero-data";
 // Ensure this path points to the unified file
import { cardVariants } from "@/src/config/skills-data";
import { PROJECTS } from "@/src/config/projects-data";

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6 mx-auto">

        {/* Header */}
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
              {/* 1. CARD IMAGE (Clickable Link) */}
              <Link 
                href={`/proyectos/${project.slug || '#'}`} 
                className="block cursor-pointer overflow-hidden"
              >
                {/* Note: changed 'project.image' to 'project.cardImage' based on new data structure */}
                <div className={`h-48 w-full bg-gradient-to-br ${project.cardImage} relative overflow-hidden`}>
                  {/* Overlay oscuro al hacer hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Icono decorativo flotante */}
                  <FolderGit2 className="absolute bottom-4 right-4 text-primary/20 w-24 h-24 rotate-12 transform translate-y-8 translate-x-8 group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-500" />
                </div>
              </Link>

              {/* 2. CONTENIDO */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  {/* Title Link */}
                  <Link href={`/proyectos/${project.slug || '#'}`} className="block">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                      {project.title}
                    </h3>
                  </Link>

                  {/* External Links (Github / Demo) - Independent */}
                  <div className="flex gap-2 z-10">
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        title="Ver Repositorio"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        title="Ver Demo en vivo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description Link */}
                {/* Note: changed 'project.description' to 'project.shortDescription' */}
                <Link href={`/proyectos/${project.slug || '#'}`} className="block mb-6">
                  <p className="text-muted-foreground line-clamp-3 cursor-pointer">
                    {project.shortDescription}
                  </p>
                </Link>

                {/* Technologies Tags */}
                {/* Note: changed 'project.tags' to 'project.technologies' */}
                <div className="mt-auto flex flex-wrap gap-2 pointer-events-none">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
                    >
                      {tech}
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
          <Button variant="outline" size="lg" className="gap-2" asChild>
             <a href="https://github.com/junkamilo" target="_blank" rel="noreferrer">
               <Github className="w-4 h-4" /> Ver repositorio completo
             </a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
