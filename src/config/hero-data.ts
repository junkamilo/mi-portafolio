import { Variants } from "framer-motion";

// Configuración del contenido (Fácil de editar en el futuro)
export const HERO_CONTENT = {
  badge: "Disponible para nueva chamba",
  name: "Juan Beltran",
  role: "Junior Full Stack Developer",
  description: "Ingeniero de Software Junior con mentalidad orientada a la calidad. Combino el desarrollo de interfaces modernas con arquitecturas backend sólidas, aplicando buenas prácticas de testing para entregar código fiable y mantenible.",
  social: {
    github: "https://github.com/junkamilo",
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