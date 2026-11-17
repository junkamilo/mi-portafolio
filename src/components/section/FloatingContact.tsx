"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Linkedin, Mail, MessageCircle, Plus } from "lucide-react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/src/config/contact-data";

const ACTIONS = [
  { label: "Correo", href: `mailto:${CONTACT_EMAIL}`, Icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/573013183474", Icon: MessageCircle },
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.find((l) => l.name === "linkedin")?.href ?? "#",
    Icon: Linkedin,
  },
];

export function FloatingContact() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 500));

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 right-6 z-[60]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <AnimatePresence>
            {open &&
              ACTIONS.map(({ label, href, Icon }, i) => {
                const angle = (Math.PI / 2) * (i / (ACTIONS.length - 1));
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={label}
                    className="absolute bottom-1 right-1 grid size-11 place-items-center rounded-full glass bg-ink-900/90 text-white"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{
                      x: -Math.cos(angle) * 80,
                      y: -Math.sin(angle) * 80,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 20,
                      delay: i * 0.04,
                    }}
                  >
                    <Icon className="size-5" />
                  </motion.a>
                );
              })}
          </AnimatePresence>
          <motion.button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Contacto rápido"
            whileTap={{ scale: 0.9 }}
            className="relative grid size-13 place-items-center rounded-full bg-linear-to-br from-brand-500 to-fuchsia-500 text-white shadow-[0_0_30px_-4px_rgb(139_92_246/0.9)]"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40 motion-reduce:hidden" />
            <motion.span animate={{ rotate: open ? 45 : 0 }}>
              <Plus className="size-6" />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
