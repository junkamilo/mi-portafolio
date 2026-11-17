"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SOCIAL_LINKS } from "@/src/config/contact-data";
import { RevealGroup, RevealItem } from "@/src/components/motion/Reveal";
import { Magnetic } from "@/src/components/motion/Magnetic";
import { scrollToId, scrollToTop } from "@/lib/scroll";

const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "skills", label: "Habilidades" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [flying, setFlying] = useState(false);

  const handleTop = () => {
    setFlying(true);
    scrollToTop();
    setTimeout(() => setFlying(false), 700);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 pt-16 pb-8 text-white/55">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute right-0 bottom-0 size-[500px] rounded-full bg-brand-500/10 opacity-30 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <RevealGroup className="mb-12 grid gap-10 md:grid-cols-4">
          <RevealItem className="col-span-1 space-y-4 md:col-span-2">
            <button
              onClick={() => scrollToId("inicio")}
              className="group flex w-fit items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="grid size-8 place-items-center rounded-full bg-linear-to-br from-brand-500 to-fuchsia-500 text-xs font-bold text-white shadow-lg"
              >
                JB
              </motion.div>
              <span className="text-xl font-bold tracking-tight text-white">
                Juan Beltrán
              </span>
            </button>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              Desarrollador Full Stack y QA Automation Engineer. Construyo
              aplicaciones web y me aseguro de que funcionen bien en producción.
            </p>
          </RevealItem>

          <RevealItem>
            <h4 className="mb-6 font-semibold text-white">Navegación</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToId(link.id)}
                    className="group relative inline-flex text-sm text-white/45 transition hover:text-brand-300"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <h4 className="mb-6 font-semibold text-white">Conecta</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid size-10 place-items-center rounded-full glass text-white/60 transition hover:text-white"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </RevealItem>
        </RevealGroup>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/35">
            © {currentYear} Juan Beltrán. Todos los derechos reservados.
          </p>
          <Magnetic>
            <button
              onClick={handleTop}
              aria-label="Subir al inicio"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgb(139_92_246/0.9)]"
            >
              Subir
              <motion.span
                animate={flying ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <ArrowUp size={16} />
              </motion.span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
