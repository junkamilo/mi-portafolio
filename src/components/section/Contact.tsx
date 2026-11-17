"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, FileDown, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  CONTACT_EMAIL,
  CV_FILENAME,
  CV_URL,
  SOCIAL_LINKS,
} from "@/src/config/contact-data";
import { RevealTitle } from "@/src/components/motion/Reveal";
import { SectionTransition } from "@/src/components/motion/SectionTransition";
import { Magnetic } from "@/src/components/motion/Magnetic";
import { burst } from "@/src/components/motion/ClickSpark";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 28);
    toast.success("¡Correo copiado!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionTransition id="contacto" className="py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="border-glow mx-auto max-w-3xl rounded-3xl glass bg-ink-900/60 p-6 md:p-10">
          <div className="mx-auto max-w-2xl space-y-8 text-center">
            <div className="space-y-4">
              <RevealTitle
                text="¿Buscas un desarrollador que también cuide la calidad?"
                className="text-3xl font-bold text-white md:text-4xl"
              />
              <p className="text-lg text-white/60">
                Puedo sumarme a tu equipo como{" "}
                <span className="font-semibold text-white">
                  Desarrollador Full Stack
                </span>
                ,{" "}
                <span className="font-semibold text-white">Frontend</span>,{" "}
                <span className="font-semibold text-white">Backend</span> o{" "}
                <span className="font-semibold text-white">QA Automation</span>.
                Trabajo de forma remota o presencial en Barranquilla y
                Bucaramanga. Escríbeme y te respondo pronto.
              </p>
            </div>

            <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 sm:flex-row">
              <div className="flex w-full flex-1 items-center gap-3 overflow-hidden px-4 py-2">
                <div className="shrink-0 rounded-full bg-brand-500/20 p-2 text-brand-300">
                  <Mail size={20} />
                </div>
                <span className="truncate font-mono text-sm text-white md:text-base">
                  {CONTACT_EMAIL}
                </span>
              </div>
              <button
                onClick={copy}
                className="shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ink-950 sm:w-auto"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copiar
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <Magnetic key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-white/80 transition hover:text-white focus-visible:text-white"
                  >
                    <social.icon
                      size={18}
                      className="transition-transform duration-300 hover:rotate-12"
                    />
                    {social.label}
                  </a>
                </Magnetic>
              ))}
              <Magnetic>
                <a
                  href={CV_URL}
                  download={CV_FILENAME}
                  className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-white/80 transition hover:text-white"
                >
                  <FileDown size={18} /> Descargar CV
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
