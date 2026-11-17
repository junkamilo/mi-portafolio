"use client";

import { motion } from "framer-motion";
import {
  Server,
  Rocket,
  Github,
  Cpu,
  Globe,
  Database,
  User,
  Calendar,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectSidebarProps {
  project: any;
}

export const ProjectSidebar = ({ project }: ProjectSidebarProps) => {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-24 space-y-8">

        {/* Card de acciones (CTA) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-lg dark:shadow-none"
        >
          <div className="flex flex-col gap-4">
            {project.demoNote && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-700 dark:text-blue-300 leading-snug flex gap-2">
                <Server className="h-4 w-4 shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
                {project.demoNote}
              </div>
            )}

            {/* Botón Ver sitio */}
            {project.links?.demo && (
              <Button
                asChild
                size="lg"
                className="w-full font-semibold shadow-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all border-0"
              >
                <a href={project.links.demo} target="_blank" rel="noreferrer">
                  <Rocket className="mr-2 h-4 w-4" /> Ver sitio en vivo
                </a>
              </Button>
            )}

            {/* Botón Repo: Borde adaptable */}
            {project.links?.github && (
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
              >
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Ver repositorio
                </a>
              </Button>
            )}

            {/* Repositorio privado: se explica en lugar del botón */}
            {!project.links?.github && project.links?.repoNote && (
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-xs text-gray-600 dark:text-gray-300 leading-snug flex gap-2">
                <Lock className="h-4 w-4 shrink-0 mt-0.5 text-gray-500 dark:text-gray-400" />
                <span>
                  <strong className="text-gray-900 dark:text-white">Repositorio:</strong> {project.links.repoNote}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stack: por capa si existe, si no lista de tecnologías */}
        {project.stackByLayer ? (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Cpu className="h-4 w-4" /> Stack por capa
            </h4>
            <div className="space-y-3 pl-2">
              {project.stackByLayer.map((item: { layer: string; items: string }) => (
                <div key={item.layer} className="text-sm">
                  <span className="block text-xs uppercase tracking-wider text-gray-400 mb-0.5">
                    {item.layer}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item.items}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Cpu className="h-4 w-4" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-normal border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Infraestructura */}
        {project.infrastructure && (
          <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
            <h4 className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Server className="h-4 w-4" /> Infraestructura
            </h4>
            <div className="space-y-3 pl-2">
              {project.infrastructure.frontend && (
                <div className="flex items-center gap-3 text-sm group">
                  <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400">
                    <Globe size={14} />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Front: <strong className="text-gray-900 dark:text-white">{project.infrastructure.frontend}</strong>
                  </span>
                </div>
              )}
              {project.infrastructure.backend && (
                <div className="flex items-center gap-3 text-sm group">
                  <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400">
                    <Database size={14} />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Back: <strong className="text-gray-900 dark:text-white">{project.infrastructure.backend}</strong>
                  </span>
                </div>
              )}
              {project.infrastructure.database && (
                <div className="flex items-center gap-3 text-sm group">
                  <div className="p-1.5 rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400">
                    <Server size={14} />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    DB: <strong className="text-gray-900 dark:text-white">{project.infrastructure.database}</strong>
                  </span>
                </div>
              )}
              {project.infrastructure.qa && (
                <div className="flex items-center gap-3 text-sm group">
                  <div className="p-1.5 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    QA: <strong className="text-gray-900 dark:text-white">{project.infrastructure.qa}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Meta info */}
        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">
              Rol
            </span>
            <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
              <User size={14} className="text-purple-500 dark:text-purple-400" /> {project.role}
            </div>
          </div>
          <div>
            <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">
              Periodo
            </span>
            <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
              <Calendar size={14} className="text-purple-500 dark:text-purple-400" /> {project.date}
            </div>
          </div>
          {project.status && (
            <div className="col-span-2">
              <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">
                Estado
              </span>
              <div className="font-medium text-green-600 dark:text-green-400">{project.status}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
