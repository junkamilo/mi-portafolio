"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, FolderGit2, ArrowRight } from "lucide-react";
import { cardVariants } from "@/src/config/skills-data";
import { Project } from "@/src/config/projects-data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const detailHref = `/proyectos/${project.slug}`;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* 1. IMAGEN DE PORTADA */}
      <Link
        href={detailHref}
        className="block cursor-pointer overflow-hidden relative group/image h-52 w-full bg-muted"
        aria-label={`Ver detalles del proyecto ${project.title}`}
      >
        <Image
          src={project.cardImage}
          alt={`Portada del proyecto ${project.title}`}
          fill
          className="object-cover opacity-90 transition-transform duration-700 group-hover/image:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none opacity-80" />

        <FolderGit2 className="absolute bottom-4 right-4 text-white/10 w-24 h-24 rotate-12 transform translate-y-8 translate-x-8 group-hover/image:translate-y-4 group-hover/image:translate-x-4 transition-transform duration-500 z-10" />

        {/* Badge de categoría */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 border border-border/50">
          {project.category}
        </div>
      </Link>

      {/* 2. CONTENIDO */}
      <div className="p-6 flex flex-col flex-grow relative">
        {project.status && (
          <span className="mb-2 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {project.status}
          </span>
        )}

        <Link href={detailHref} className="block group/title mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover/title:text-primary transition-colors flex items-center gap-2 line-clamp-1">
            {project.title}
            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300 text-primary" />
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-3 mb-5 text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tags de tecnologías */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md text-muted-foreground bg-transparent border border-dashed border-border/50">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Acciones: Ver sitio + Ver detalle (+ GitHub o nota de repositorio privado) */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-border/40">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
            >
              <ExternalLink size={14} /> Ver sitio
            </a>
          )}

          <Link
            href={detailHref}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800 transition-colors"
          >
            Ver detalle
          </Link>

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary p-2 rounded-md transition-all"
              title="Ver código en GitHub"
              aria-label="Ver código en GitHub"
            >
              <Github size={18} />
            </a>
          ) : (
            project.links.repoNote && (
              <span className="text-xs font-medium text-muted-foreground">Repositorio privado</span>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}
