import { Variants } from "framer-motion";

// Configuración del contenido (Fácil de editar en el futuro)
export const HERO_CONTENT = {
    badge: "Disponible para nuevos proyectos",
    name: "Juan Pérez",
    role: "Ingeniero de Software Full Stack",
    description:
        "Especializado en crear experiencias digitales rápidas, accesibles y visualmente impactantes. Transformo requerimientos complejos en código limpio.",
    social: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
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