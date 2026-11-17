"use client";

import { Variants } from "framer-motion";
import { Code2, Globe, Server, ShieldCheck, BookOpen, Briefcase } from "lucide-react";

export const ABOUT_DATA = {
    title: "Sobre mí",
    subtitle: "Desarrollo software y lo pruebo antes de entregarlo",
    timeline: [
        {
            id: 1,
            title: "Proyectos en producción · 2025 – actualidad",
            description: "Desarrollo y mantengo Casa Verde, DYL Store y Shamell Entertainment: tiendas en línea, sistemas de gestión en la nube y una plataforma de venta de boletas. Los despliego en servidores VPS con Docker y les monto ambientes de QA con pruebas automatizadas.",
            icon: Globe,
        },
        {
            id: 2,
            title: "Desarrollador Full Stack y QA Automation en Devitech · 2026",
            description: "Trabajé en GENEXIS, una plataforma web y un sistema POS para estaciones de combustible. Desarrollé interfaces en React y Next.js, apoyé el backend en NestJS y automaticé pruebas de regresión con Cypress y Selenium.",
            icon: Code2,
        },
        {
            id: 3,
            title: "Desarrollador Full Stack y QA en Rappi · 2025 – 2026",
            description: "Mis prácticas profesionales. Construí componentes en React y Next.js, escribí pruebas unitarias y E2E, revisé código y trabajé con el equipo de desarrollo para corregir defectos.",
            icon: ShieldCheck,
        },
        {
            id: 4,
            title: "Formación · 2023 – actualidad",
            description: "Tecnólogo en Análisis y Desarrollo de Software (SENA), certificado IBM Full Stack Software Developer y programa de QA & Test Automation (Coursera). Hoy estudio Ingeniería de Sistemas en la UNAD.",
            icon: BookOpen,
        },
    ],
    stats: [
        {
            label: "Experiencia",
            value: "Rappi · Devitech",
            icon: Briefcase,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/50"
        },
        {
            label: "En producción",
            value: "3 proyectos",
            icon: Globe,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "group-hover:border-purple-500/50"
        },
        {
            label: "Perfil",
            value: "Full Stack + QA",
            icon: Code2,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "group-hover:border-pink-500/50"
        },
        {
            label: "Despliegue",
            value: "Docker · VPS",
            icon: Server,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "group-hover:border-green-500/50"
        },
    ],
    conclusion: {
        cmd: "echo $PROPUESTA_VALOR",
        output: "Frontend, backend y QA en un solo perfil. Escribo el código, lo pruebo y lo dejo listo para producción."
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
