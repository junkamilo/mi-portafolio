"use client";

import { Variants } from "framer-motion";

// --- DATOS: EXPERIENCIA (Lo más importante) ---
export const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Desarrollador Full Stack Jr.",
    company: "Tech Solutions Inc.",
    location: "Remoto / Colombia",
    period: "2024 - Presente",
    description: "Desarrollo de interfaces de usuario dinámicas con React y Next.js. Optimización de endpoints en Node.js reduciendo el tiempo de respuesta en un 30%.",
    skills: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
  },
  {
    id: 2,
    role: "Desarrollador Frontend (Prácticas)",
    company: "Agencia Digital Creativa",
    location: "Bucaramanga, Santander",
    period: "2023 - 2024",
    description: "Colaboración en la maquetación de sitios web corporativos. Implementación de diseños pixel-perfect desde Figma y consumo de APIs REST.",
    skills: ["React", "CSS3", "Git", "Scrum"],
  },
];

// --- DATOS: EDUCACIÓN Y CURSOS (Soporte) ---
// In Experience.tsx

export const EDUCATION = [
  {
    id: 1,
    slug: "tecnologia-analisis-desarrollo-software", // Matches the first item in experienceData
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA",
    period: "2022 - 2024",
    type: "degree", 
  },
  {
    id: 2,
    slug: "react-guia-completa", // Matches the third item in experienceData
    title: "React - La Guía Completa",
    institution: "Udemy",
    period: "2023",
    type: "certificate",
  },
  {
    id: 3,
    slug: "javascript-moderno", // Matches the fourth item in experienceData
    title: "JavaScript Moderno",
    institution: "Platzi",
    period: "2023",
    type: "certificate",
  },
   {
    id: 4,
    slug: "bases-datos-postgresql", // Matches the fifth item in experienceData
    title: "Bases de Datos con PostgreSQL",
    institution: "Coursera",
    period: "2022",
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