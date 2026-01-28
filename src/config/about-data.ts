"use client";

import { Variants } from "framer-motion";
import { Code2, Globe, Cpu, Zap, BookOpen, Rocket } from "lucide-react";

// --- DATOS DEL CONTENIDO (Fácil de editar) ---
export const ABOUT_DATA = {
    title: "Sobre mí",
    subtitle: "Más allá del código",
    timeline: [
    {
      id: 1,
      title: "Los Inicios (SENA)",
      description: "Construí mis bases en lógica y POO. Pasé de la teoría a la práctica creando aplicaciones de escritorio con Java y mis primeras APIs con Node.js.",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "La Escuela de Calidad (Rappi)",
      description: "Mi paso por QA transformó mi visión. Aprendí que el código no solo debe funcionar, debe ser robusto. Entendí la importancia de detectar bugs antes de que nazcan.",
      icon: Rocket,
    },
    {
      id: 3,
      title: "El Desarrollador Hoy",
      description: "Combino esa disciplina de testeo con el dominio del ecosistema moderno (Next.js, NestJS), creando productos digitales sólidos y escalables.",
      icon: Code2,
    },
  ],
    // Estas son las "Bento Cards" que aman los reclutadores
    stats: [
        {
            label: "Años de Experiencia",
            value: "2+",
            icon: Globe,
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            label: "Proyectos Completados",
            value: "4+",
            icon: Code2,
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            label: "Tecnologías Dominadas",
            value: "6+",
            icon: Cpu,
            color: "bg-green-500/10 text-green-500",
        },
        {
            label: "Commitment",
            value: "100%",
            icon: Zap,
            color: "bg-amber-500/10 text-amber-500",
        },
    ],
};

// --- ANIMACIONES (Variants para Framer Motion) ---
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Efecto dominó entre tarjetas
        },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};