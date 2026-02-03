"use client";

import {  Variants } from "framer-motion";
import {
    Database,
    Layout,
    Settings,
    Server,
    Terminal,
    ShieldCheck,
} from "lucide-react";

// --- DATOS ---
export const SKILL_CATEGORIES = [
    {
        id: "frontend",
        label: "Frontend",
        icon: Layout,
        description: "Experiencias de usuario rápidas, reactivas y accesibles.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], 
    },
    {
        id: "backend",
        label: "Backend",
        icon: Server,
        description: "Servidores escalables con lógica de negocio sólida.",
        skills: ["NestJS", "Node.js", "Express", "Java (POO)"], 
    },
    {
        // Tu punto fuerte (QA) queda en el centro visual de la segunda fila
        id: "qa",
        label: "QA Testing",
        icon: ShieldCheck, 
        description: "Mentalidad 'Bug-Free'. Desde pruebas manuales hasta automatización.",
        skills: ["Vitest", "Jest", "Jira", "Test Cases", "Debugging"], 
    },
    {
        id: "database",
        label: "Base de datos & ORMs",
        icon: Database,
        description: "Gestión eficiente de datos y optimización de consultas.",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma ORM"], 
    },
    {
        id: "workflow",
        label: "DevOps & AI Workflow",
        icon: Terminal,
        description: "Herramientas que aceleran el ciclo de desarrollo.",
        skills: ["Git/GitHub", "Docker", "Postman", "Vercel", "AI Assisted Coding"],
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