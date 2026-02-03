"use client"

import { useState } from "react"; // CORREGIDO: Import correcto
import { Mail, Copy, Check, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/src/config/contact-data";


export function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden text-center">
      {/* Background Decorativo sutil */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ¿Buscas fortalecer tu equipo de desarrollo?
          </h2>
          <p className="text-muted-foreground text-lg">
            Estoy listo para integrarme de inmediato como <span className="text-foreground font-medium">Frontend</span> o <span className="text-foreground font-medium">Full Stack Developer</span>. 
            Si necesitas código limpio, testing y alguien con una rápida curva de aprendizaje, aquí estoy.
          </p>
        </div>

        {/* --- COPY EMAIL CARD --- */}
        <div className="bg-background/50 p-2 rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto hover:border-primary/50 transition-colors">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full overflow-hidden">
            <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
              <Mail size={20} />
            </div>
            {/* 'truncate' evita que el correo rompa el diseño en móviles pequeños */}
            <span className="text-foreground font-medium font-mono truncate text-sm md:text-base">
              {CONTACT_EMAIL}
            </span>
          </div>

          <Button
            onClick={handleCopy}
            size="sm"
            className={`w-full sm:w-auto font-semibold transition-all duration-300 shadow-sm ${isCopied ? "bg-green-600 hover:bg-green-700 text-white" : ""
              }`}
          >
            {isCopied ? (
              <>
                <Check size={16} className="mr-2" /> Copiado
              </>
            ) : (
              <>
                <Copy size={16} className="mr-2" /> Copiar
              </>
            )}
          </Button>
        </div>

        {/* Botones Sociales */}
        {/* Botones Sociales Generados Dinámicamente */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none" // Accesibilidad
            >
              <Button
                variant="outline"
                size="lg"
                className={`gap-2 transition-all duration-300 group ${social.className}`}
              >
                {/* El icono hereda el color del texto */}
                <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                {social.label}
              </Button>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}