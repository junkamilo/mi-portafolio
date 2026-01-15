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
export const EDUCATION = [
  {
    id: 1,
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA",
    period: "2022 - 2024",
    type: "degree", // degree | certificate
  },
  {
    id: 2,
    title: "React: De cero a experto",
    institution: "Udemy / Fernando Herrera",
    period: "2023",
    type: "certificate",
  },
  {
    id: 3,
    title: "Backend con Node.js y Express",
    institution: "Platzi",
    period: "2023",
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