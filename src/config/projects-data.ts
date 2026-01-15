"use client";

import { Variants } from "framer-motion";

// --- DATOS ---
export const PROJECTS = [
    {
        title: "JunkyMusic",
        description: "Aplicación web full-stack con autenticación, tablero Kanban drag-and-drop y notificaciones en tiempo real vía WebSockets.",
        tags: ["Html", "Css", "Node.js", "Js" , "MySql"],
        links: {
            demo: "https://demo.com",
            github: "https://github.com",
        },
        // Si no tienes imagen, usamos un gradiente. Si tienes, pon la ruta: "/proyectos/task.png"
        image: "from-blue-500/20 to-cyan-500/20",
    },
    {
        title: "App Restaurante",
        description: "Panel administrativo con visualización de datos complejos, gestión de inventario y reportes de ventas exportables.",
        tags: ["Java"],
        links: {
            github: "https://github.com",
        },
        image: "from-purple-500/20 to-pink-500/20",
    },
    {
        title: "VariedadesLili",
        description: "Backend robusto para transacciones bancarias. Incluye tests E2E, documentación Swagger y arquitectura hexagonal.",
        tags: ["Html", "Css", "Js", "MySql" , "Node.js" , "Express"],
        links: {
            github: "https://github.com",
        },
        image: "from-emerald-500/20 to-teal-500/20",
    },
    {
        title: "VariedadesLili Frontend",
        description: "Landing page de alta conversión optimizada para SEO y performance (Core Web Vitals) con animaciones avanzadas.",
        tags: ["React", "Tailwind CSS", "Ts"],
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