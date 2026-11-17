"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { fadeInUp } from "./animations";
import { ProjectChallenge } from "@/src/config/projects-data";

interface ProjectChallengesProps {
  challenges?: ProjectChallenge[];
}

export const ProjectChallenges = ({ challenges }: ProjectChallengesProps) => {
  if (!challenges || challenges.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      // Fondo y borde adaptables (Naranja oscuro translúcido en noche)
      className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 rounded-2xl p-8 shadow-sm relative overflow-hidden transition-colors duration-300"
    >
      {/* Icono de fondo: Muy sutil en ambos modos */}
      <AlertTriangle className="absolute -right-6 -top-6 text-orange-100 dark:text-orange-900/20 h-32 w-32 rotate-12" />

      {/* Título: Naranja fuerte en día, Naranja claro en noche */}
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-700 dark:text-orange-400 relative z-10">
        <AlertTriangle size={20} /> Desafíos
      </h3>

      <ul className="space-y-3 relative z-10 text-orange-800/80 dark:text-orange-200/90 leading-relaxed">
        {challenges.map((challenge) => (
          <li key={challenge.title}>
            <strong className="font-semibold text-orange-900 dark:text-orange-100">
              {challenge.title}:
            </strong>{" "}
            {challenge.description}
          </li>
        ))}
      </ul>
    </motion.section>
  );
};
