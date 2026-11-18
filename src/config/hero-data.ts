import { Variants } from "framer-motion";

// Configuración del contenido (Fácil de editar en el futuro)
export const HERO_CONTENT = {
  badge: "Disponible para trabajar",
  name: "Juan Beltrán",
  role: "Desarrollador Full Stack & QA Automation Engineer",
  description: "Desarrollo aplicaciones web completas con React, Next.js, TypeScript, Node.js, NestJS y Java con Spring Boot, y me aseguro de que funcionen con pruebas automatizadas en Cypress, Playwright y Jest. En Rappi y Devitech trabajé entre desarrollo y QA. Hoy tengo tres proyectos en producción, desplegados con Docker en servidores VPS.",
  social: {
    github: "https://github.com/junkamilo",
    linkedin: "https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/",
    email: "mailto:juancamilo.campobarrios@gmail.com",
  },
  image: "/fotoPerfilHojaVida.webp",
  imageAlt: "Foto de Juan Beltrán, desarrollador Full Stack y QA",
};

// Configuración de Animaciones (Variants)
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as const
    }
  },
};
