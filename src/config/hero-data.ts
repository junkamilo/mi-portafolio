import { Variants } from "framer-motion";

// Configuración del contenido (Fácil de editar en el futuro)
export const HERO_CONTENT = {
  badge: "Disponible para trabajar",
  name: "Juan Beltran",
  role: "Software Developer | Frontend & QA Testing",
  description: "Desarrollador de Software especializado en el ecosistema JavaScript (React, TypeScript, Node.js). Combino el desarrollo de interfaces modernas con arquitecturas backend sólidas, aplicando estrategias de testing y código limpio para entregar soluciones escalables y fiables.",
  social: {
    github: "https://github.com/junkamilo",
    linkedin: "https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/?trk=public-profile-join-page",
    email: "mailto:juancamilo.campobarrios@gmail.com",
  },
  image: "/fotoPerfilHojaVida.png"
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