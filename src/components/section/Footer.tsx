"use client"

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/src/config/contact-data";
import { NAV_LINKS } from "@/src/config/navigation-data";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-12 border-t border-border/10 relative overflow-hidden">

      {/* Decoración de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">

          {/* 1. BRAND & MISION */}
          <div className="col-span-1 md:col-span-2">
            <a href="#inicio" className="text-2xl font-bold mb-4 inline-block tracking-tight">
              <span className="text-primary">Dev</span>Portfolio
            </a>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm">
              Construyendo experiencias digitales que combinan diseño elegante con arquitectura de software robusta. Enfocado en escalabilidad y rendimiento.
            </p>
          </div>

          {/* 2. ENLACES RÁPIDOS */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Navegación</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Conecta</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            © {currentYear} Juan Pérez. Código libre bajo licencia MIT.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xs text-background/50">
              Hecho con Next.js & Tailwind
            </p>
            {/* Botón Scroll Top */}
            <Button
              onClick={scrollToTop}
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full bg-background/5 border-background/20 hover:bg-primary hover:text-foreground hover:border-primary transition-colors"
            >
              <ArrowUp size={14} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
