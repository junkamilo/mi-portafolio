import { Variants } from "framer-motion";

// --- INTERFACES ---

export interface ProjectImage {
  url: string;
  caption?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string; // Este será el enlace a la "Página Real"
}

// 👇 NUEVA INTERFAZ PARA LA INFRAESTRUCTURA
export interface ProjectInfrastructure {
  database?: string; // Ej: "TiDB Cloud"
  backend?: string;  // Ej: "Render Web Service"
  frontend?: string; // Ej: "Vercel"
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  date: string;
  role: string;
  duration?: string;
  technologies: string[];
  features?: string[];
  challenges?: string;

  // Imágenes
  cardImage: string;
  mainImage: string;
  gallery?: ProjectImage[];

  // Enlaces e Infraestructura
  links: ProjectLinks;
  infrastructure?: ProjectInfrastructure; // 👇 CAMPO NUEVO OPCIONAL
}

// --- DATOS DE PROYECTOS ---

export const PROJECTS: Project[] = [
  {
    slug: "junky-music",
    title: "JunkyMusic",
    shortDescription: "Aplicación web full-stack con autenticación, tablero Kanban drag-and-drop y notificaciones en tiempo real vía WebSockets.",
    fullDescription: `JunkyMusic es una plataforma integral diseñada para músicos y productores. Nació de la necesidad de gestionar proyectos musicales colaborativos de forma eficiente.
    
    El sistema permite a los usuarios gestionar sus tareas mediante un tablero interactivo, subir maquetas y recibir feedback instantáneo gracias a la integración de WebSockets. La arquitectura separa claramente el frontend del backend para asegurar escalabilidad.`,
    category: "Full Stack Web App",
    date: "Enero 2024",
    role: "Desarrollador Full Stack",
    duration: "3 meses",
    technologies: ["Html", "Css", "Node.js", "JavaScript", "MySql", "Socket.io"],
    cardImage: "from-blue-500/20 to-cyan-500/20",
    mainImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=675&fit=crop",
    features: [
      "Sistema de autenticación y roles de usuario",
      "Tablero Kanban con drag-and-drop nativo",
      "Notificaciones en tiempo real (Socket.io)",
      "Gestión de bases de datos relacionales con MySQL"
    ],
    challenges: "El mayor reto fue la implementación de WebSockets para las notificaciones en tiempo real sin saturar el servidor, además de asegurar la integridad de los datos al mover tarjetas en el Kanban.",

    // 👇 DATOS REALES DE TU DESPLIEGUE
    links: {
      github: "https://github.com/junkamilo/MusicApp.git",
      demo: "https://music-app-ecru-nine-86.vercel.app" // 👈 COLOCA AQUÍ TU LINK DE VERCEL
    },
    infrastructure: {
      database: "TiDB Cloud (MySQL Serverless)",
      backend: "Render (Node.js Web Service)",
      frontend: "Vercel (Vite SPA)"
    },
    gallery: [
      { url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", caption: "Panel Principal" },
      { url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", caption: "Editor de pistas" }
    ]
  },
  {
    slug: "app-restaurante",
    title: "App Restaurante",
    shortDescription: "Panel administrativo con visualización de datos complejos, gestión de inventario y reportes de ventas exportables.",
    fullDescription: `Una solución administrativa robusta para el sector gastronómico. Esta aplicación permite a los gerentes de restaurantes visualizar el flujo de caja, controlar el inventario de insumos y gestionar los pedidos en tiempo real.`,
    category: "Desktop / Web App",
    date: "Noviembre 2023",
    role: "Desarrollador Backend / Java",
    duration: "4 meses",
    technologies: ["Java", "Swing", "SQL", "JasperReports"],
    cardImage: "from-purple-500/20 to-pink-500/20",
    mainImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=675&fit=crop",
    features: [
      "Dashboard con métricas financieras",
      "Control de stock e inventario en tiempo real",
      "Exportación de reportes a PDF y Excel"
    ],
    links: {
      github: "https://github.com/junkamilo/RestauranteApp.git",
    },
    // Si es desktop, no necesita infrastructure web, o puedes poner "Local / On-Premise"
  },
  {
    slug: "variedades-lili-backend",
    title: "VariedadesLili (Backend)",
    shortDescription: "Backend robusto para transacciones bancarias. Incluye tests E2E, documentación Swagger y arquitectura hexagonal.",
    fullDescription: `El núcleo transaccional de VariedadesLili. Este backend fue diseñado siguiendo la arquitectura hexagonal.`,
    category: "Backend API",
    date: "Septiembre 2023",
    role: "Backend Developer",
    technologies: ["Node.js", "Express", "MySql", "Jest", "Swagger"],
    cardImage: "from-emerald-500/20 to-teal-500/20",
    mainImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop",
    links: {
      github: "https://github.com",
      demo: "https://proyectos-5stx.vercel.app"
    },
    infrastructure: {
      backend: "AWS EC2",
      database: "AWS RDS (PostgreSQL)"
    }
  },
  {
    slug: "variedades-lili-frontend",
    title: "VariedadesLili (Frontend)",
    shortDescription: "Landing page de alta conversión optimizada para SEO y performance.",
    fullDescription: `La cara visible de la plataforma VariedadesLili.`,
    category: "Frontend",
    date: "Agosto 2023",
    role: "Frontend Developer",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Vite"],
    cardImage: "from-orange-500/20 to-amber-500/20",
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
    links: {
      demo: "https://proyecto-variedades-lili-cliente.vercel.app",
      github: "https://github.com",
    },
    infrastructure: {
      frontend: "Netlify"
    }
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

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};