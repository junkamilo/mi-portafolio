"use client";

import { Variants } from "framer-motion";

// --- DATOS: EXPERIENCIA (Lo más importante) ---
export const WORK_EXPERIENCE = [
  {
    id: 1,
    // 🏆 RAPPI PRIMERO: Tu carta de presentación más fuerte.
    role: "QA Analyst & Frontend Testing",
    company: "Rappi", // Unicornio Tech
    location: "Remoto",
    period: "2025 - 2026",
    // Descripción técnica enfocada en calidad y colaboración con Devs
    description: "Aseguramiento de calidad en flujos críticos de la vertical de Restaurantes. Colaboración directa con equipos de Ingeniería para la detección temprana de bugs en componentes React, reduciendo la deuda técnica y mejorando la estabilidad del release.",
    skills: ["Jira", "React", "Testing Manual", "Scrum", "Git Flow"],
  },
  {
    id: 2,
    // 💻 TUS PROYECTOS: Demuestran que sabes programar de principio a fin.
    // "Portafolio Profesional" es honesto y técnico.
    role: "Desarrollador Full Stack (Portafolio)",
    company: "Proyectos Personales", 
    location: "Remoto",
    period: "2024 - Presente",
    // Descripción enfocada en ARQUITECTURA y DESPLIEGUE (lo que no hiciste en Rappi)
    description: "Diseño y desarrollo de aplicaciones web end-to-end simulando entornos de producción. Implementación de arquitecturas escalables, integración de APIs y optimización de rendimiento (SEO/Core Web Vitals).",
    skills: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

// --- DATOS: EDUCACIÓN Y CURSOS (Soporte) ---
// In Experience.tsx

export const EDUCATION = [
  {
    id: 1,
    slug: "tecnologia-analisis-desarrollo-software",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA",
    period: "2022 - 2024",
    type: "degree", 
  },
  {
    id: 2,
    slug: "react-guia-completa",
    title: "React - La Guía Completa",
    institution: "Udemy",
    period: "2023",
    type: "certificate",
  },
  {
    id: 3,
    slug: "javascript-moderno", 
    title: "JavaScript Moderno",
    institution: "Udemy",
    period: "2023",
    type: "certificate",
  },
   {
    id: 4,
    slug: "qa-testing-fundamentals",
    title: "Software Testing & Quality Assurance", // Título internacional y profesional
    institution: "Udemy", // 👈 Edita esto con la plataforma real
    period: "2024",
    type: "certificate",
 },
 {
    id: 5,
    slug: "nextjs-fullstack-guide",
    title: "Next.js", // Título internacional y profesional
    institution: "Udemy", // 👈 Edita esto con la plataforma real
    period: "2025",
    type: "certificate",
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

export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
};