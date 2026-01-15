"use client";

import { Variants } from "framer-motion";
import { Code2, Globe, Cpu, Zap } from "lucide-react";

// --- DATOS DEL CONTENIDO (Fácil de editar) ---
export const ABOUT_DATA = {
    title: "Sobre mí",
    subtitle: "Más allá del código",
    bio: [
        "Mi trayectoria comenzó en el SENA, donde construí bases sólidas en lógica de programación y POO. Allí pasé de la teoría a la práctica desarrollando aplicaciones de escritorio con Java Swing y arquitecturas web completas, creando APIs desde cero con Node.js y clientes dinámicos con Vanilla JS.",
        "Posteriormente, mi paso por Rappi transformó mi visión del desarrollo. Trabajando en QA manual y ciclos de pruebas, no solo aprendí a detectar y reportar bugs, sino que entendí la importancia de la calidad del código, la estructura de los endpoints y la colaboración entre equipos. Hoy, combino esa disciplina de testeo con un dominio avanzado del ecosistema moderno (React, Next.js, Nest.js), creando productos digitales que son tan robustos por dentro como intuitivos por fuera."
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