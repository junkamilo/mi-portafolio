"use client";

import { useState } from "react";
import { Menu, X, FileDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica simplificada: Solo detectamos si bajamos un poco para activar el modo "Cápsula"
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? "py-4" : "py-6"
        }`}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled
            ? "w-[90%] md:w-[85%] lg:w-[70%] bg-background/70 backdrop-blur-xl border border-white/10 shadow-lg rounded-full px-6 py-2" // Modo Cápsula
            : "w-full container px-4 md:px-6 bg-transparent border-transparent" // Modo Full
          }`}
      >

        {/* LOGO MEJORADO: Limpio y legible */}
        <a href="#inicio" className="flex items-center gap-2 group z-10">
          {/* Caja de la 'D' con gradiente y efecto hover sutil */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="font-bold text-sm">D</span>
          </div>
          <span className={`font-bold tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-foreground"}`}>
            Dev<span className="text-primary">Juan</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block relative z-10">
          <ul className="flex items-center gap-1">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACCIONES */}
        <div className="flex items-center gap-3 z-10">
          {/**Agregar PDF Hoja de vida */}
          <a
            href="/cv-juan-beltran.pdf" // 1. El nombre exacto de tu archivo en la carpeta public
            download="CV-Juan-Beltran.pdf" // 2. Esto fuerza la descarga y le pone nombre al archivo bajado
            className="hidden sm:flex"
          >
            <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
              <FileDown size={16} /> <span className="hidden lg:inline">CV</span>
            </Button>
          </a>

          <a href="#contacto">
            <Button size="sm" className={`rounded-full font-semibold shadow-md ${scrolled ? "" : "shadow-primary/20"}`}>
              Hablemos
            </Button>
          </a>

          {/* Botón Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 p-4 bg-background/90 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-accent group"
              >
                <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">{link.label}</span>
                {/* Aquí sí dejamos el Sparkle porque sirve como indicador de selección visual */}
                <Sparkles size={16} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}