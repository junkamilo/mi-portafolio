"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ChevronDown, Linkedin, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants, HERO_CONTENT, itemVariants } from "@/src/config/hero-data";
import { ProfileImage } from "./ProfileImage";

export default function Hero() {
  const [isCopied, setIsCopied] = useState(false);

  const scrollToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(HERO_CONTENT.social.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 pb-10"
    >
      {/* --- FONDO SIMPLE (Gris muy suave para dar textura sin romper nada) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* COLUMNA 1: TEXTO */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* --- BADGE COPIABLE (Sin efectos de transparencia complejos) --- */}
            <motion.div
              variants={itemVariants}
              className="mb-6 cursor-pointer group"
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${
                isCopied 
                  ? "border-green-200 bg-green-50 text-green-700" 
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400 hover:text-black"
              } text-xs font-medium`}>
                <span className="relative flex h-2 w-2">
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isCopied ? "bg-green-500" : "bg-green-500"}`}></span>
                </span>
                {isCopied ? "¡Email Copiado!" : HERO_CONTENT.badge}
                {isCopied ? <Check size={12} /> : <Copy size={12} className="opacity-50 group-hover:opacity-100" />}
              </span>
            </motion.div>

            {/* --- TÍTULO SÓLIDO (Sin gradientes que fallan) --- */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-black mb-6"
            >
              Hola, soy{" "}
              {/* Color morado sólido en lugar de gradiente clip */}
              <span className="text-purple-600">
                {HERO_CONTENT.name}
              </span>
              <br />
              <span className="text-gray-700 text-2xl sm:text-4xl md:text-5xl block mt-2 font-semibold">
                {HERO_CONTENT.role}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* BOTONES (Colores explícitos) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* --- BOTÓN VER PROYECTOS (Negro sólido) --- */}
              <Button
                size="lg"
                className="w-full sm:w-auto font-semibold bg-black text-white hover:bg-gray-800 shadow-md transition-all rounded-lg h-12 px-8"
                onClick={scrollToProjects}
              >
                <span className="flex items-center">
                  Ver Proyectos <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>

              {/* --- ICONOS SOCIALES (Bordes visibles) --- */}
              <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <SocialButton href="#contacto" icon={<Mail className="h-5 w-5" />} label="Email" />
                <SocialButton href={HERO_CONTENT.social.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              </div>
            </motion.div>
          </div>

          {/* COLUMNA 2: IMAGEN */}
          <div className="flex justify-center order-1 lg:order-2">
            <ProfileImage />
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block text-gray-400 hover:text-black transition-colors"
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const isInternal = href.startsWith("#");

  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
      {/* Botón con borde gris explícito y texto gris oscuro */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-11 w-11 border-gray-300 text-gray-700 hover:border-black hover:bg-black hover:text-white transition-all bg-white"
        asChild
      >
        <a
          href={href}
          target={isInternal ? "_self" : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          aria-label={label}
          onClick={(e) => {
            if (isInternal) {
              e.preventDefault();
              const element = document.querySelector(href);
              element?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {icon}
        </a>
      </Button>
    </motion.div>
  );
}