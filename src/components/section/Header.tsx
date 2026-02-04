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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica de scroll simple
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "w-[95%] md:w-[85%] lg:w-[70%] bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-full px-6 py-2" // Fondo blanco explícito
            : "w-full container px-4 md:px-6 bg-transparent"
        }`}
      >

        {/* LOGO */}
        <a href="#inicio" className="flex items-center gap-2 group z-10">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white shadow-sm">
            <span className="font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-gray-900 tracking-tight">
            Dev<span className="text-gray-600">Juan</span>
          </span>
        </a>

        {/* DESKTOP NAV (Sin animaciones complejas, solo texto visible) */}
        <nav className="hidden md:block relative z-10">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACCIONES (Botones corregidos) */}
        <div className="flex items-center gap-3 z-10">
          
          {/* Botón CV: Cambiado de 'ghost' a 'outline' para que tenga borde visible */}
          <a
            href="/cv-juan-beltran.pdf"
            download="CV-Juan-Beltran.pdf"
            className="hidden sm:flex"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full gap-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              <FileDown size={16} /> 
              <span className="hidden lg:inline">CV</span>
            </Button>
          </a>

          {/* Botón Hablemos: Negro sólido siempre */}
          <a href="#contacto">
            <Button 
              size="sm" 
              className="rounded-full font-semibold bg-black text-white hover:bg-gray-800 shadow-sm border-0"
            >
              Hablemos
            </Button>
          </a>

          {/* Botón Mobile: Negro simple */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU (Fondo blanco sólido para asegurar lectura) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 p-4 bg-white border border-gray-200 rounded-2xl shadow-xl md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}