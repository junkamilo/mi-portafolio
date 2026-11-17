"use client";

import { Variants } from "framer-motion";
import {
  Database,
  Layout,
  Server,
  Terminal,
  ShieldCheck,
  Bot,
} from "lucide-react";

export type SkillItem = {
  name: string;
  usedIn: string[];
};

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Layout,
    description: "Interfaces rápidas, responsivas y fáciles de mantener.",
    skills: [
      { name: "React", usedIn: ["Devitech", "Rappi", "Casa Verde", "DYL Store", "Shamell"] },
      { name: "Next.js", usedIn: ["Devitech", "Rappi", "Casa Verde", "DYL Store", "Shamell"] },
      { name: "TypeScript", usedIn: ["Devitech", "Rappi", "Casa Verde", "DYL Store", "Shamell"] },
      { name: "JavaScript (ES6+)", usedIn: ["Devitech", "Rappi", "Music Streaming App"] },
      { name: "Tailwind CSS", usedIn: ["Devitech", "Casa Verde", "DYL Store", "Shamell"] },
      { name: "TanStack Query", usedIn: ["Variedades Lili", "Casa Verde"] },
      { name: "Zustand", usedIn: ["Variedades Lili"] },
      { name: "Framer Motion", usedIn: ["Portafolio"] },
    ] as SkillItem[],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "APIs y lógica de negocio para aplicaciones web.",
    skills: [
      { name: "Node.js", usedIn: ["Devitech", "Shamell", "Variedades Lili"] },
      { name: "NestJS", usedIn: ["Devitech", "Rappi (revisión de código)", "Shamell"] },
      { name: "Express", usedIn: ["Variedades Lili", "Music Streaming App"] },
      { name: "Java", usedIn: ["Casa Verde (cloud)", "DYL Store (cloud)"] },
      { name: "Spring Boot", usedIn: ["Casa Verde (cloud)", "DYL Store (cloud)"] },
      { name: "APIs REST", usedIn: ["Devitech", "Rappi", "Casa Verde", "Shamell"] },
      { name: "autenticación JWT", usedIn: ["Casa Verde", "DYL Store", "Shamell"] },
    ] as SkillItem[],
  },
  {
    id: "database",
    label: "Bases de datos",
    icon: Database,
    description: "Modelado de datos, consultas y migraciones.",
    skills: [
      { name: "PostgreSQL", usedIn: ["Casa Verde", "DYL Store", "Shamell"] },
      { name: "MySQL", usedIn: ["Variedades Lili", "Music Streaming App"] },
      { name: "Prisma ORM", usedIn: ["Casa Verde", "DYL Store"] },
      { name: "Flyway", usedIn: ["Casa Verde (cloud)", "DYL Store (cloud)"] },
      { name: "Redis", usedIn: ["Devitech"] },
    ] as SkillItem[],
  },
  {
    id: "qa",
    label: "QA y testing",
    icon: ShieldCheck,
    description: "Pruebas manuales y automatizadas, desde el componente hasta el flujo completo.",
    skills: [
      { name: "Cypress", usedIn: ["Devitech", "Rappi"] },
      { name: "Playwright", usedIn: ["Shamell"] },
      { name: "Selenium", usedIn: ["Devitech"] },
      { name: "Jest", usedIn: ["Rappi", "Casa Verde", "Shamell"] },
      { name: "Vitest", usedIn: ["Rappi", "Shamell"] },
      { name: "Testing Library", usedIn: ["Shamell", "Rappi"] },
      { name: "Postman", usedIn: ["Devitech", "Rappi"] },
      { name: "k6", usedIn: ["Devitech"] },
      { name: "casos de prueba", usedIn: ["Devitech", "Rappi"] },
      { name: "gestión de defectos", usedIn: ["Devitech", "Rappi"] },
    ] as SkillItem[],
  },
  {
    id: "devops",
    label: "DevOps y herramientas",
    icon: Terminal,
    description: "Del código al servidor, con control de versiones y despliegues.",
    skills: [
      { name: "Git", usedIn: ["Devitech", "Rappi", "Casa Verde", "DYL Store", "Shamell"] },
      { name: "GitHub", usedIn: ["Proyectos personales", "Portafolio"] },
      { name: "Docker", usedIn: ["Casa Verde", "DYL Store"] },
      { name: "VPS", usedIn: ["Casa Verde", "DYL Store"] },
      { name: "CI/CD", usedIn: ["Devitech", "Shamell"] },
      { name: "Vercel", usedIn: ["Variedades Lili", "Music Streaming App", "Portafolio"] },
      { name: "Jira", usedIn: ["Rappi"] },
      { name: "ClickUp", usedIn: ["Devitech"] },
    ] as SkillItem[],
  },
  {
    id: "ai",
    label: "IA aplicada",
    icon: Bot,
    description: "Uso de IA para trabajar más rápido sin perder control del código.",
    skills: [
      { name: "Claude", usedIn: ["Desarrollo diario", "Portafolio"] },
      { name: "Gemini", usedIn: ["Desarrollo diario"] },
      { name: "desarrollo asistido", usedIn: ["Casa Verde", "DYL Store", "Shamell"] },
      { name: "generación de casos de prueba", usedIn: ["Devitech", "Shamell"] },
    ] as SkillItem[],
  },
];

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
