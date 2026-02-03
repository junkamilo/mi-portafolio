"use client";

import { Variants } from "framer-motion";
import { Code2, Globe, Cpu, Zap, BookOpen, Rocket, Bot } from "lucide-react";

export const ABOUT_DATA = {
    title: "Trayectoria Profesional",
    subtitle: "De la Lógica al Producto Escalable",
    timeline: [
        {
            id: 1,
            title: "Técnologo en Análisis y Desarrollo de Software (SENA)",
            description: "Fundamentos sólidos en Java (POO) y bases de datos. Transición al desarrollo web moderno creando APIs RESTful.",
            icon: BookOpen,
        },
        {
            id: 2,
            title: "QA & Testing en Rappi",
            description: "Inmersión en ciclos ágiles de alto nivel. Reporte de bugs críticos,testing y análisis de arquitectura de componentes de React en producción.",
            icon: Rocket,
        },
        {
            id: 3,
            title: "Especialización Full Stack Moderno",
            description: "Dominio del stack Next.js/TypeScript y NestJS. Enfoque en Clean Architecture, Testing y Experiencia de Usuario.",
            icon: Code2,
        },
    ],
    stats: [
        {
            label: "Perfil Técnico",
            value: "Full Stack",
            icon: Code2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/50"
        },
        {
            label: "Proyectos",
            value: "3 Apps",
            icon: Globe,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "group-hover:border-purple-500/50"
        },
        {
            label: "Enfoque",
            value: "AI Driven",
            icon: Bot,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "group-hover:border-pink-500/50"
        },
        {
            label: "Stack",
            value: "MERN+",
            icon: Cpu,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "group-hover:border-green-500/50"
        },
    ],
    conclusion: {
        cmd: "echo $PROPUESTA_VALOR",
        output: "Código limpio, lógica sólida y enfoque en calidad. Listo para aportar valor real desde el primer commit."
    }
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