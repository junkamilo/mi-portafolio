"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperienceHeaderProps {
  title: string;
}

export const ExperienceHeader = ({ title }: ExperienceHeaderProps) => {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-20, 0]);

  return (
    <motion.header
      style={{ opacity: headerOpacity, y: headerY }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto flex items-center gap-3 p-1.5 pr-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-full shadow-lg shadow-black/5 transition-all hover:shadow-xl">
        
        {/* Botón Volver */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 pl-2 pr-3 h-9"
        >
          <Link href="/#experiencia" className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-zinc-800 p-1 rounded-full group-hover:bg-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="font-medium">Volver</span>
          </Link>
        </Button>

        {/* Separador */}
        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

        {/* Título Truncado */}
        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[150px] sm:max-w-xs cursor-default">
          {title}
        </span>
      </div>
    </motion.header>
  );
};