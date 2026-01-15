"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Globe, Cpu, Zap } from "lucide-react";

// --- DATOS DEL CONTENIDO (Fácil de editar) ---
export const ABOUT_DATA = {
    title: "Sobre mí",
    subtitle: "Más allá del código",
    bio: [
        "Soy un desarrollador apasionado por la intersección entre diseño y funcionalidad. Mi objetivo no es solo escribir líneas de código, sino construir productos digitales que sean intuitivos y performantes.",
        "Con una sólida base en Computer Science y una mentalidad autodidacta, me adapto rápidamente a nuevos entornos tecnológicos. Me especializo en el ecosistema React/Next.js, pero siempre elijo la herramienta adecuada para el trabajo.",
    ],
    // Estas son las "Bento Cards" que aman los reclutadores
    stats: [
        {
            label: "Años de Experiencia",
            value: "3+",
            icon: Globe,
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            label: "Proyectos Completados",
            value: "15+",
            icon: Code2,
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            label: "Tecnologías Dominadas",
            value: "10+",
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