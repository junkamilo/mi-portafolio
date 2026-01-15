"use client";

import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react"; // Importamos icono para CV
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button"; // Asumiendo que usas shadcn/ui, si no, usa un <button> normal con clases
import { useScroll } from "@/src/hooks/use-scroll";

// Datos estáticos fuera del componente
const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#skills", label: "Skills" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
];

export default function Header() {
  // 1. Usamos nuestro Hook personalizado (Lógica separada)
  const isScrolled = useScroll(20);
  
  // 2. Estado local solo para UI (Menú móvil)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      // Animación inicial del header al cargar la página
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md border-b border-border/40 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          
          {/* LOGO: Diseño limpio y moderno */}
          <a
            href="#inicio"
            className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-1 group"
          >
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              Dev
            </span>
            JuanKa
          </a>

          {/* DESKTOP NAVIGATION: Oculto en móviles */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  {/* Pequeña línea animada al hacer hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* ACCIONES: Botón de contacto/CV y Menú Hamburgesa */}
          <div className="flex items-center gap-4">
            
            {/* Botón CTA (Visible siempre o solo desktop según prefieras) */}
            <a href="#contacto" className="hidden sm:block">
              <Button variant="default" size="sm" className="font-semibold shadow-lg shadow-primary/20">
                Hablemos
              </Button>
            </a>

            {/* Botón Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-accent rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* MOBILE NAVIGATION: Animación profesional */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border mt-2 rounded-b-2xl shadow-2xl"
            >
              <ul className="flex flex-col p-6 space-y-4 items-center">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }} // Efecto cascada
                    className="w-full"
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-3 text-lg font-medium text-foreground hover:bg-accent hover:text-primary rounded-xl transition-all"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                
                {/* Botón extra en móvil por si se ocultó arriba */}
                <motion.li 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="w-full pt-4"
                >
                  <a href="/tu-cv.pdf" target="_blank" className="w-full flex justify-center">
                    <Button variant="outline" className="w-full gap-2">
                      <FileDown size={18} /> Descargar CV
                    </Button>
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
