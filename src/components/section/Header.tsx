"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useActiveSection } from "@/src/hooks/use-active-section";
import { scrollToId } from "@/lib/scroll";
import { Magnetic } from "@/src/components/motion/Magnetic";
import { EASE } from "@/lib/motion";
import { CV_FILENAME, CV_URL } from "@/src/config/contact-data";

const LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "skills", label: "Habilidades" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
] as const;

const IDS = LINKS.map((l) => l.id);

export default function Header() {
  const active = useActiveSection(IDS);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
  });

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-full glass px-3 py-2"
      >
        <button
          onClick={() => go("inicio")}
          className="flex items-center gap-2 rounded-full px-2 py-1"
          aria-label="Ir al inicio"
        >
          <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-brand-500 to-fuchsia-500 text-xs font-bold text-white">
            JB
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline">
            Juan Beltrán
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="relative rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CV_URL}
            download={CV_FILENAME}
            className="group hidden items-center gap-1.5 rounded-full glass px-3 py-1.5 text-sm text-white/80 transition-colors hover:text-white lg:flex"
          >
            <Download className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:animate-bounce" />
            Descargar CV
          </a>
          <Magnetic>
            <button
              onClick={() => go("contacto")}
              className="shine rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink-950"
            >
              Hablemos
            </button>
          </Magnetic>
          <button
            className="rounded-full p-2 text-white md:hidden"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </motion.header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-ink-950/80 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  className="absolute right-6 top-6 text-white"
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
                {LINKS.map((l, i) => (
                  <motion.button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.05 * i, ease: EASE }}
                  >
                    {l.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
