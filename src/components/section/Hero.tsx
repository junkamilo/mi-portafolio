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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 pb-10"
    >
      {/* --- FONDO --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* COLUMNA 1: TEXTO */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* --- INNOVACIÓN 1: BADGE COPIABLE --- */}
            <motion.div
              variants={itemVariants}
              className="mb-6 cursor-pointer group"
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${isCopied ? "border-green-500/50 bg-green-500/10 text-green-500" : "border-primary/20 bg-primary/5 text-primary group-hover:bg-primary/10"} text-xs font-medium backdrop-blur-sm`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCopied ? "bg-green-400" : "bg-green-400"}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isCopied ? "bg-green-500" : "bg-green-500"}`}></span>
                </span>
                {isCopied ? "¡Email Copiado!" : HERO_CONTENT.badge}
                {isCopied ? <Check size={12} /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
              </span>
            </motion.div>

            {/* --- INNOVACIÓN 2: TÍTULO ANIMADO (GRADIENT-X) --- */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
            >
              Hola, soy{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient-x">
                {HERO_CONTENT.name}
              </span>
              <br />
              <span className="text-foreground/80 text-2xl sm:text-4xl md:text-5xl block mt-2">
                {HERO_CONTENT.role}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* BOTONES */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* --- INNOVACIÓN 3: BOTÓN SHINY --- */}
              <Button
                size="lg"
                className="relative overflow-hidden group w-full sm:w-auto font-semibold shadow-lg shadow-primary/25"
                onClick={scrollToProjects}
              >
                <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-white/30 group-hover:animate-shine" />
                <span className="relative flex items-center">
                  Ver Proyectos <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              {/* --- INNOVACIÓN 4: ICONOS SOCIALES MAGNÉTICOS (Simulados) --- */}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
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

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {

  const isInternal = href.startsWith("#");

  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-11 w-11 border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors"
        asChild
      >
        <a
          href={href}
          // Si es interno usa "_self" (misma página), si no "_blank" (nueva pestaña)
          target={isInternal ? "_self" : "_blank"}
          // Solo añadimos seguridad rel para enlaces externos
          rel={isInternal ? undefined : "noopener noreferrer"}
          aria-label={label}
          onClick={(e) => {
            // Opcional: Forzar scroll suave si CSS no lo hace automáticamente
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