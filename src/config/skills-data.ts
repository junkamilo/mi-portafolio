"use client";

import {  Variants } from "framer-motion";
import {
    Database,
    Layout,
    Settings,
    Server,
} from "lucide-react";

// --- DATOS ---
export const SKILL_CATEGORIES = [
    {
        id: "frontend",
        label: "Frontend Development",
        icon: Layout,
        description: "Creando interfaces pixel-perfect y experiencias interactivas.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"],
    },
    {
        id: "backend",
        label: "Backend & APIs",
        icon: Server,
        description: "Arquitectura robusta y escalable del lado del servidor.",
        skills: ["Node.js", "Express", "Python", "Java", "REST APIs", "GraphQL"],
    },
    {
        id: "database",
        label: "Base de Datos",
        icon: Database,
        description: "Diseño de esquemas y optimización de consultas.",
        skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Supabase"],
    },
    {
        id: "tools",
        label: "DevOps & Herramientas",
        icon: Settings,
        description: "Flujos de trabajo, control de versiones y despliegue.",
        skills: ["Git", "GitHub", "Docker", "VS Code", "Vercel", "CI/CD"],
    },
];

// --- ANIMACIONES ---
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};