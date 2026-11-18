"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/src/config/contact-data";
import { Magnetic } from "@/src/components/motion/Magnetic";
import { scrollToId, scrollToTop } from "@/lib/scroll";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [flying, setFlying] = useState(false);

  const handleTop = () => {
    setFlying(true);
    scrollToTop();
    setTimeout(() => setFlying(false), 700);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 text-white/55">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 size-[420px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.18), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-[380px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.12), transparent)" }}
      />

      <div className="container relative z-10 mx-auto px-4 py-14 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-5">
            <button
              type="button"
              onClick={() => scrollToId("inicio")}
              className="group flex w-fit items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-fuchsia-500 text-sm font-bold text-white shadow-[0_0_28px_-6px_rgb(139_92_246/0.85)]"
              >
                JB
              </motion.div>
              <div className="text-left">
                <span className="block text-xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-300">
                  Juan Beltrán
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Full Stack · QA Automation
                </span>
              </div>
            </button>

            <p className="text-sm leading-relaxed text-white/50 md:text-base">
              Construyo aplicaciones web en producción y las respaldo con
              pruebas automatizadas. Disponible para remoto.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-brand-300 transition hover:text-brand-200"
            >
              <Mail size={15} />
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Conecta
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <Magnetic key={link.name} strength={0.25}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-brand-400/40 hover:bg-brand-500/15 hover:text-white hover:shadow-[0_0_24px_-6px_rgb(139_92_246/0.7)]"
                  >
                    <link.icon size={20} />
                  </a>
                </Magnetic>
              ))}

              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={handleTop}
                  aria-label="Subir al inicio"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-brand-500 px-5 text-sm font-semibold text-white shadow-[0_0_28px_-4px_rgb(139_92_246/0.9)] transition hover:bg-brand-400"
                >
                  Subir
                  <motion.span
                    animate={flying ? { y: -18, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ArrowUp size={16} />
                  </motion.span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/35">
            © {currentYear} Juan Beltrán. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30">
            Hecho con Next.js · TypeScript · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
