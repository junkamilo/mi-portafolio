"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export const ProjectHeader = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-6 z-50 pointer-events-none"
    >
      <div className="container mx-auto px-4">
        <Link
          href="/#proyectos"
          // CAMBIOS: Clases dark: agregadas para fondo, borde y texto
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md 
          border border-gray-200 dark:border-zinc-800 
          shadow-sm hover:shadow-md 
          hover:border-gray-300 dark:hover:border-zinc-700 
          transition-all text-sm font-medium 
          text-gray-700 dark:text-gray-200 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>
      </div>
    </motion.header>
  );
};