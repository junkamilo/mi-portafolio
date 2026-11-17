import { Variants } from "framer-motion";

// --- DATOS: EXPERIENCIA LABORAL (más reciente primero) ---
// Si location está vacío, la sección no muestra la ubicación.
export const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Desarrollador Full Stack y QA Automation",
    company: "Devitech",
    location: "",
    period: "feb. 2026 – nov. 2026",
    description: "Trabajé en GENEXIS, una plataforma web en la nube y un sistema POS para estaciones de combustible. Desarrollé interfaces con React, Next.js, TypeScript y Tailwind CSS, apoyé el desarrollo y la depuración de servicios en NestJS, y automaticé pruebas E2E y de regresión con Cypress y Selenium dentro del flujo de CI/CD. También diseñé casos de prueba, validé datos con SQL y di seguimiento a los defectos hasta su cierre.",
    skills: ["React", "Next.js", "NestJS", "Cypress", "Selenium", "Postman", "SQL", "CI/CD", "ClickUp", "Scrum"],
  },
  {
    id: 2,
    role: "Desarrollador Full Stack y QA (Prácticas profesionales)",
    company: "Rappi",
    location: "Remoto",
    period: "ago. 2025 – feb. 2026",
    description: "Construí componentes de interfaz con React y Next.js conectados a APIs REST. Escribí pruebas unitarias y de integración con Jest y Vitest, y pruebas E2E con Cypress. Revisé código en React y NestJS, probé APIs con Postman y trabajé con el equipo de desarrollo para encontrar y corregir defectos.",
    skills: ["React", "Next.js", "Jest", "Vitest", "Cypress", "Postman", "Jira", "Git", "Scrum"],
  },
  {
    id: 3,
    role: "Desarrollador Full Stack",
    company: "Proyectos independientes",
    location: "",
    period: "2025 – actualidad",
    description: "Desarrollo y mantengo Casa Verde, DYL Store y Shamell Entertainment, tres aplicaciones en producción. Me encargo de todo el ciclo: frontend, backend, base de datos, despliegue en VPS con Docker y pruebas automatizadas.",
    skills: ["Next.js", "Spring Boot", "NestJS", "PostgreSQL", "Docker", "Playwright", "Jest"],
  },
];

// --- DATOS: EDUCACIÓN Y CERTIFICACIONES (lista de la sección) ---
// El slug enlaza a la página de detalle en /experience/[slug] (ver experience-certificado-data.ts).
// label es el texto del badge; type define el color (degree = resaltado azul).
export const EDUCATION = [
  {
    id: 1,
    slug: "ingenieria-sistemas-unad",
    title: "Ingeniería de Sistemas (en curso)",
    institution: "UNAD",
    period: "2026 – actualidad",
    type: "degree",
    label: "Pregrado",
  },
  {
    id: 2,
    slug: "tecnologia-analisis-desarrollo-software",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA",
    period: "2023 – 2026",
    type: "degree",
    label: "Tecnología",
  },
  {
    id: 3,
    slug: "ibm-full-stack-software-developer",
    title: "IBM Full Stack Software Developer (Professional Certificate)",
    institution: "IBM",
    period: "oct. 2026",
    type: "certificate",
    label: "Certificado",
  },
  {
    id: 4,
    slug: "coursera-qa-test-automation",
    title: "Software QA & Test Automation Engineering",
    institution: "Coursera",
    period: "⟨Año⟩", // Pendiente: año del certificado de Coursera
    type: "certificate",
    label: "Certificado",
  },
  {
    id: 5,
    slug: "nextjs-fullstack-guide",
    title: "Next.js: El Framework de React para Producción",
    institution: "Udemy",
    period: "2026",
    type: "certificate",
    label: "Curso",
  },
  {
    id: 6,
    slug: "react-guia-completa",
    title: "React - La Guía Completa",
    institution: "Udemy",
    period: "2025",
    type: "certificate",
    label: "Curso",
  },
  {
    id: 7,
    slug: "qa-testing-fundamentals",
    title: "Software Testing & Quality Assurance",
    institution: "Udemy",
    period: "2026",
    type: "certificate",
    label: "Curso",
  },
  {
    id: 8,
    slug: "javascript-moderno",
    title: "JavaScript Moderno",
    institution: "Udemy",
    period: "2025",
    type: "certificate",
    label: "Curso",
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
