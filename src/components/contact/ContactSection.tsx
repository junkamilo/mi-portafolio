"use client"

import { useState } from "react";
import { Mail, Copy, Check, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, CV_FILENAME, CV_URL, SOCIAL_LINKS } from "@/src/config/contact-data";

export function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    // Fondo blanco explícito y borde gris para la tarjeta principal
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 relative overflow-hidden text-center">

      {/* Background decorativo sutil */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¿Buscas un desarrollador que también cuide la calidad?
          </h2>
          <p className="text-gray-600 text-lg">
            Puedo sumarme a tu equipo como <span className="text-black font-semibold">Desarrollador Full Stack</span>, <span className="text-black font-semibold">Frontend</span>, <span className="text-black font-semibold">Backend</span> o <span className="text-black font-semibold">QA Automation</span>.
            Trabajo de forma remota o presencial en Barranquilla y Bucaramanga. Escríbeme y te respondo pronto.
          </p>
        </div>

        {/* --- TARJETA DE CORREO --- */}
        <div className="bg-gray-50 p-2 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto hover:border-gray-400 transition-colors">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full overflow-hidden">
            {/* Icono de Mail en círculo gris */}
            <div className="p-2 bg-gray-200 rounded-full text-gray-700 shrink-0">
              <Mail size={20} />
            </div>

            <span className="text-gray-900 font-medium font-mono truncate text-sm md:text-base">
              {CONTACT_EMAIL}
            </span>
          </div>

          {/* Botón Copiar: negro sólido */}
          <Button
            onClick={handleCopy}
            size="sm"
            className={`w-full sm:w-auto font-semibold transition-all duration-300 shadow-sm border-0 ${
              isCopied
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-black hover:bg-gray-800 text-white"
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

        {/* --- BOTONES: REDES Y CV --- */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none"
            >
              <Button
                variant="outline"
                size="lg"
                className="gap-2 transition-all duration-300 group border-gray-300 text-gray-700 bg-white hover:bg-black hover:text-white hover:border-black"
              >
                <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                {social.label}
              </Button>
            </a>
          ))}

          <Button
            variant="outline"
            size="lg"
            asChild
            className="gap-2 transition-all duration-300 group border-gray-300 text-gray-700 bg-white hover:bg-black hover:text-white hover:border-black"
          >
            <a href={CV_URL} download={CV_FILENAME}>
              <FileDown size={20} className="group-hover:scale-110 transition-transform" />
              Descargar CV
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
}
