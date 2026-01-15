"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- DATOS ---
export const PROJECTS = [
    {
        title: "Sistema de Gestión de Tareas",
        description: "Aplicación web full-stack con autenticación, tablero Kanban drag-and-drop y notificaciones en tiempo real vía WebSockets.",
        tags: ["React", "TypeScript", "Node.js", "Socket.io"],
        links: {
            demo: "https://demo.com",
            github: "https://github.com",
        },
        // Si no tienes imagen, usamos un gradiente. Si tienes, pon la ruta: "/proyectos/task.png"
        image: "from-blue-500/20 to-cyan-500/20",
    },
    {
        title: "E-Commerce Dashboard",
        description: "Panel administrativo con visualización de datos complejos, gestión de inventario y reportes de ventas exportables.",
        tags: ["Next.js", "Tailwind CSS", "Recharts", "MongoDB"],
        links: {
            github: "https://github.com",
        },
        image: "from-purple-500/20 to-pink-500/20",
    },
    {
        title: "API REST Financiera",
        description: "Backend robusto para transacciones bancarias. Incluye tests E2E, documentación Swagger y arquitectura hexagonal.",
        tags: ["NestJS", "PostgreSQL", "Docker", "Jest"],
        links: {
            github: "https://github.com",
        },
        image: "from-emerald-500/20 to-teal-500/20",
    },
    {
        title: "SaaS Landing Page",
        description: "Landing page de alta conversión optimizada para SEO y performance (Core Web Vitals) con animaciones avanzadas.",
        tags: ["Astro", "React", "Framer Motion", "Vercel"],
        links: {
            demo: "https://demo.com",
            github: "https://github.com",
        },
        image: "from-orange-500/20 to-amber-500/20",
    },
];

// --- ANIMACIONES ---
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};