"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants, HERO_CONTENT, itemVariants } from "@/src/config/hero-data";
import { ProfileImage } from "./ProfileImage";

// --- SUB-COMPONENTE: FOTO DE PERFIL ---


export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 pb-10"
    >
      {/* --- FONDO --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      {/* --- CONTENIDO PRINCIPAL (GRID) --- */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          // Cambiamos a Grid: 1 columna en móvil, 2 en desktop grande
          className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* COLUMNA 1: TEXTO (Izquierda en Desktop / Abajo en Móvil) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            {/* Título */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
            >
              Hola, soy <span className="text-primary gradient-text">{HERO_CONTENT.name}</span>
              <br />
              <span className="text-foreground/80 text-2xl sm:text-4xl md:text-5xl block mt-2">
                {HERO_CONTENT.role}
              </span>
            </motion.h1>

            {/* Descripción */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* Botones */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/25" onClick={scrollToProjects}>
                Ver Proyectos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex gap-4 w-full sm:w-auto">
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none" asChild>
                  <a href="/cv.pdf" download>
                    <Download className="mr-2 h-4 w-4" /> CV
                  </a>
                </Button>
                <Button variant="ghost" size="lg" className="flex-1 sm:flex-none" asChild>
                  <a href="#contacto">
                    <Mail className="mr-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA 2: IMAGEN (Derecha en Desktop / Arriba en Móvil) */}
          <div className="flex justify-center order-1 lg:order-2">
            <ProfileImage />
          </div>

        </motion.div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block" // Oculto en móviles muy pequeños para no tapar contenido
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}