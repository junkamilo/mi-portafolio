import { Variants } from "framer-motion";

// --- INTERFACES ---

export interface ProjectImage {
  url: string;
  caption?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  // Texto que se muestra cuando el repositorio es privado (en lugar del botón de GitHub)
  repoNote?: string;
}

export interface ProjectInfrastructure {
  database?: string;
  backend?: string;
  frontend?: string;
  payment?: string;
  qa?: string;
  current?: string;
  future?: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface ProjectStackLayer {
  layer: string;
  items: string;
}

export type ProjectTag = "fullstack" | "qa" | "ecommerce" | "cloud";

/** Parte de un sistema (Web / Cloud / Frontend / Backend) */
export interface ProjectSystemPart {
  id: "web" | "cloud" | "frontend" | "backend";
  label: string;
  subtitle: string;
  stack: string[];
  /** Descripción detallada al seleccionar esta parte en el modal */
  description: string;
  /** Capas técnicas propias de esta parte */
  layers?: ProjectStackLayer[];
  /** Características propias de esta parte */
  features?: string[];
  /** URL demo específica (ej. solo la tienda web) */
  demoUrl?: string;
  /** Repo específico de esta parte */
  repoUrl?: string;
  /** Banner de la card / modal (Web / Cloud) */
  bannerImage?: string;
}

/**
 * Arquitectura visible en la card.
 * - dual: Web ↔ Cloud (Casa Verde, DYL Store)
 * - single: un solo producto (Shamell)
 */
export interface ProjectArchitecture {
  kind: "dual" | "single";
  parts: ProjectSystemPart[];
  /** Texto corto de la flecha / vínculo (ej. "Pedidos sincronizados") */
  linkLabel?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  date: string;
  role: string;
  status?: string; // Ej: "En producción"
  duration?: string;
  technologies: string[];
  stackByLayer?: ProjectStackLayer[];
  features?: string[];
  challenges?: ProjectChallenge[];
  tags: ProjectTag[];
  architecture?: ProjectArchitecture;

  // Imágenes
  cardImage: string;
  mainImage: string;
  /** Alias visual para tarjetas / modal del rediseño */
  image: string;
  gallery?: ProjectImage[];

  // Enlaces e Infraestructura
  links: ProjectLinks;
  infrastructure?: ProjectInfrastructure;

  demoNote?: string;
}

export interface TrainingLink {
  label: string;
  url: string;
}

// Proyectos de formación: tarjetas pequeñas, sin página de detalle
export interface TrainingProject {
  title: string;
  shortDescription: string;
  technologies: string[];
  links: TrainingLink[];
  note?: string;
}

// --- DATOS COMPARTIDOS ---

const CASA_VERDE_TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "Jest",
];

const CASA_VERDE_LAYERS: ProjectStackLayer[] = [
  { layer: "Web", items: "Next.js, React, Tailwind CSS (frontend) · Next.js API, Prisma (backend)" },
  { layer: "Cloud", items: "React, TypeScript, Tailwind CSS (frontend) · Java, Spring Boot (backend)" },
  { layer: "Base de datos", items: "PostgreSQL" },
  { layer: "QA", items: "Jest, pruebas automatizadas" },
];

const CASA_VERDE_INFRA: ProjectInfrastructure = {
  frontend: "Next.js (web) · VPS + Docker",
  backend: "Spring Boot (cloud) · VPS + Docker",
  database: "PostgreSQL",
  qa: "Ambiente de QA",
};

const PRIVATE_REPO_NOTE = "Privado (proyecto de cliente). Disponible para revisión en entrevista.";

const COLD_START_NOTE = "La demo usa servidores gratuitos. Si tarda en cargar, espera entre 30 y 60 segundos mientras el servidor se activa.";

// --- PROYECTOS DESTACADOS (los que están en producción y aparecen en el CV) ---

export const PROJECTS: Project[] = [
  {
    slug: "casa-verde",
    title: "Casa Verde",
    shortDescription: "Tienda en línea y sistema de gestión en la nube para una marca de ropa. Web en Next.js, cloud en Spring Boot y despliegue en VPS con Docker.",

    fullDescription: `Casa Verde tiene dos partes que trabajan juntas. La **web** es la tienda en línea, donde los clientes navegan el catálogo, arman su carrito y pagan con Bold o Addi. La **cloud** es el sistema de gestión del negocio, donde se registran ventas, gastos, costos e inventario. Reemplazó las hojas de Excel con las que el negocio trabajaba antes.

    Conecté las dos partes para que cada pedido de la tienda quede registrado automáticamente en el sistema de gestión. Ambos sistemas corren en un servidor VPS con Docker y tienen un ambiente de QA con pruebas unitarias y automatizadas antes de pasar a producción.`,

    category: "Full Stack · E-commerce + Cloud",
    date: "2025 – actualidad",
    role: "Desarrollador Full Stack",
    status: "En producción",

    technologies: CASA_VERDE_TECH,
    stackByLayer: CASA_VERDE_LAYERS,

    features: [
      "Catálogo, carrito de compras y pagos en línea con Bold y Addi",
      "Inicio de sesión con Google o con correo y contraseña",
      "Gestión de ventas, gastos, costos e inventario por referencia, talla y color",
      "Sincronización automática de pedidos entre la tienda y el sistema de gestión",
      "Ambiente de QA con pruebas unitarias y automatizadas",
    ],

    challenges: [
      {
        title: "Pasar de Excel a un sistema",
        description: "Entender cómo funcionaba el negocio en sus hojas de cálculo y convertir esos procesos en módulos claros.",
      },
      {
        title: "Que ningún pedido se registre dos veces",
        description: "La sincronización entre la tienda y el sistema de gestión detecta los pedidos repetidos y los ignora.",
      },
      {
        title: "Dos sistemas en un solo servidor",
        description: "Organizar la web, la cloud y la base de datos en contenedores Docker dentro del mismo VPS, con un ambiente de QA separado.",
      },
    ],

    tags: ["fullstack", "ecommerce", "cloud"],
    architecture: {
      kind: "dual",
      linkLabel: "Pedidos sincronizados",
      parts: [
        {
          id: "web",
          label: "Casa Verde Web",
          subtitle: "Tienda en línea · catálogo, carrito y pagos",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
          bannerImage: "/banner_casa_verde_web.png",
          description:
            "La tienda en línea donde los clientes navegan el catálogo, arman el carrito y pagan con Bold o Addi. Incluye inicio de sesión con Google o correo, y cada pedido se envía automáticamente a la Cloud.",
          layers: [
            { layer: "Frontend", items: "Next.js, React, TypeScript, Tailwind CSS" },
            { layer: "Backend", items: "Next.js API Routes, Server Actions, Prisma" },
            { layer: "Base de datos", items: "PostgreSQL" },
            { layer: "Auth", items: "Auth.js (NextAuth), Google OAuth" },
            { layer: "Pagos", items: "Bold, Addi" },
            { layer: "Infra", items: "Docker, VPS" },
            { layer: "QA", items: "Jest, Testing Library, k6" },
          ],
          features: [
            "Catálogo, carrito de compras y checkout",
            "Pagos en línea con Bold y Addi",
            "Inicio de sesión con Google o correo y contraseña",
            "Sincronización de pedidos hacia Casa Verde Cloud",
          ],
          demoUrl: "https://casaverdeoficial.com/",
          repoUrl: "https://github.com/junkamilo/casa-ver-ecommerce",
        },
        {
          id: "cloud",
          label: "Casa Verde Cloud",
          subtitle: "Gestión del negocio · ventas, inventario y costos",
          stack: ["React", "Vite", "Java", "Spring Boot", "PostgreSQL", "Docker"],
          bannerImage: "/banner_cloud_casa_verde.png",
          description:
            "El POS / cloud del negocio: ventas, gastos, costos e inventario. Frontend en React + Vite y backend en Spring Boot (Java), con API pública hacia la tienda web y despliegue en Docker.",
          layers: [
            { layer: "Frontend", items: "React, Vite, TypeScript, Tailwind CSS" },
            { layer: "Estado / datos", items: "TanStack Query, Zustand" },
            { layer: "Backend", items: "Java, Spring Boot, Spring Modulith" },
            { layer: "Persistencia", items: "Spring Data JPA, Flyway, PostgreSQL" },
            { layer: "Auth", items: "Spring Security, JWT" },
            { layer: "Infra", items: "Docker, Docker Compose, VPS" },
            { layer: "QA", items: "Vitest, Testing Library, Playwright, JUnit, Testcontainers" },
          ],
          features: [
            "Gestión de ventas, gastos y costos",
            "Inventario por referencia, talla y color",
            "API pública e integración con la tienda web",
            "Despliegue en Docker con ambiente de QA",
          ],
        },
      ],
    },
    cardImage: "/casa-verde-card.png",
    mainImage: "/casa-verde-main.png",
    image: "/casa-verde-main.png",

    links: {
      demo: "https://casaverdeoficial.com/",
      github: "https://github.com/junkamilo/casa-ver-ecommerce",
    },

    infrastructure: CASA_VERDE_INFRA,
  },
  {
    slug: "dyl-store",
    title: "DYL Store",
    shortDescription: "Tienda en línea y sistema de gestión en la nube, construidos sobre la base de Casa Verde y adaptados a un nuevo negocio. Despliegue en VPS con Docker.",

    fullDescription: `DYL Store nace de Casa Verde. En lugar de empezar de cero, reutilicé la base que ya funcionaba en producción (tienda web y sistema de gestión) y la adapté a un nuevo negocio: ajusté los módulos existentes y creé los que este cliente necesitaba.

    Usa el mismo stack que Casa Verde: Next.js en la web, Spring Boot en la cloud y PostgreSQL como base de datos. Corre en un servidor VPS con Docker y tiene su propio ambiente de QA con pruebas unitarias y automatizadas.`,

    category: "Full Stack · E-commerce + Cloud",
    date: "2025 – actualidad",
    role: "Desarrollador Full Stack",
    status: "En producción",

    technologies: CASA_VERDE_TECH,
    stackByLayer: CASA_VERDE_LAYERS,

    features: [
      "Tienda en línea con catálogo, carrito y pagos",
      "Sistema de gestión en la nube adaptado al nuevo negocio",
      "Módulos ajustados y módulos nuevos sobre una base ya probada",
      "Ambiente de QA con pruebas unitarias y automatizadas",
    ],

    challenges: [
      {
        title: "Reutilizar sin romper",
        description: "Separar lo común de lo que es propio de cada negocio para que un cambio en DYL Store no afecte a Casa Verde.",
      },
      {
        title: "Despliegue independiente",
        description: "Configurar su propio entorno en VPS con Docker, con base de datos y ambiente de QA separados.",
      },
    ],

    tags: ["fullstack", "ecommerce", "cloud"],
    architecture: {
      kind: "dual",
      linkLabel: "Misma base, nuevo negocio",
      parts: [
        {
          id: "web",
          label: "DYL Store Web",
          subtitle: "Tienda en línea · catálogo, carrito y pagos",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
          description:
            "Tienda en línea basada en la arquitectura de Casa Verde Web, adaptada al catálogo, carrito y flujo de pagos de DYL Store. Mismo stack: Next.js, Prisma y PostgreSQL.",
          layers: [
            { layer: "Frontend", items: "Next.js, React, TypeScript, Tailwind CSS" },
            { layer: "Backend", items: "Next.js API Routes, Server Actions, Prisma" },
            { layer: "Base de datos", items: "PostgreSQL" },
            { layer: "Auth", items: "Auth.js (NextAuth), Google OAuth" },
            { layer: "Pagos", items: "Bold, Addi" },
            { layer: "Infra", items: "Docker, VPS" },
            { layer: "QA", items: "Jest, Testing Library, k6" },
          ],
          features: [
            "Catálogo, carrito y pagos en línea",
            "Base reutilizada de Casa Verde Web",
            "Sincronización de pedidos hacia DYL Store Cloud",
          ],
        },
        {
          id: "cloud",
          label: "DYL Store Cloud",
          subtitle: "Gestión en la nube · módulos adaptados al negocio",
          stack: ["React", "Vite", "Java", "Spring Boot", "PostgreSQL", "Docker"],
          description:
            "Sistema de gestión en la nube sobre la base de Casa Verde Cloud: módulos ajustados y módulos nuevos según las necesidades de este negocio. Mismo stack React + Spring Boot.",
          layers: [
            { layer: "Frontend", items: "React, Vite, TypeScript, Tailwind CSS" },
            { layer: "Estado / datos", items: "TanStack Query, Zustand" },
            { layer: "Backend", items: "Java, Spring Boot, Spring Modulith" },
            { layer: "Persistencia", items: "Spring Data JPA, Flyway, PostgreSQL" },
            { layer: "Auth", items: "Spring Security, JWT" },
            { layer: "Infra", items: "Docker, Docker Compose, VPS" },
            { layer: "QA", items: "Vitest, Testing Library, Playwright, JUnit, Testcontainers" },
          ],
          features: [
            "Gestión adaptada al nuevo negocio",
            "Módulos reutilizados y módulos nuevos",
            "Despliegue independiente con QA propio",
          ],
        },
      ],
    },
    cardImage: "/dyl-store-card.png",
    mainImage: "/dyl-store-main.png",
    image: "/dyl-store-main.png",

    links: {
      // Pendiente: agregar la URL en vivo de DYL Store en `demo`
      repoNote: PRIVATE_REPO_NOTE,
    },

    infrastructure: CASA_VERDE_INFRA,
  },
  {
    slug: "shamell-entertainment",
    title: "Shamell Entertainment",
    shortDescription: "Plataforma para publicar eventos, vender boletas, reservar puestos y pagar en línea. Frontend en Next.js, backend en NestJS y pruebas en todas las capas.",

    fullDescription: `Shamell Entertainment es una plataforma de eventos y venta de boletas. Los usuarios ven los eventos, eligen su boleta o su puesto y pagan en línea. Los administradores gestionan los eventos y las ventas desde un panel.

    Además de desarrollar las funciones, me encargué de la calidad. Escribí pruebas unitarias en el frontend y en el backend, y pruebas de extremo a extremo para los flujos más delicados: compra, reservas y pagos. También reorganicé el backend en módulos más pequeños para que fuera más fácil de mantener y de probar.`,

    category: "Full Stack · QA · Plataforma de eventos",
    date: "2025 – actualidad",
    role: "Desarrollador Full Stack & QA",
    status: "En producción",

    technologies: ["Next.js", "React", "TypeScript", "NestJS", "Node.js", "PostgreSQL", "Jest", "Vitest", "Testing Library", "Playwright"],
    stackByLayer: [
      { layer: "Frontend", items: "Next.js, React, TypeScript" },
      { layer: "Backend", items: "Node.js, NestJS" },
      { layer: "Base de datos", items: "PostgreSQL" },
      { layer: "QA", items: "Jest, Vitest, Testing Library, Playwright" },
    ],

    features: [
      "Publicación de eventos y venta de boletas",
      "Reserva de puestos y pagos en línea",
      "Panel de administración",
      "Pruebas unitarias y E2E en los flujos de compra, reservas y pagos",
    ],

    challenges: [
      {
        title: "Probar los pagos con seguridad",
        description: "Cubrir con pruebas los flujos de compra y de retorno del pago para detectar errores antes de producción.",
      },
      {
        title: "Un backend difícil de mantener",
        description: "Dividir un servicio muy grande en módulos con responsabilidades claras.",
      },
      {
        title: "Ampliar la cobertura de pruebas",
        description: "Subirla en el frontend y en el backend sin frenar el desarrollo.",
      },
    ],

    tags: ["fullstack", "qa"],
    architecture: {
      kind: "single",
      linkLabel: "Frontend · Backend · QA",
      parts: [
        {
          id: "frontend",
          label: "Frontend",
          subtitle: "Eventos, boletas y reservas",
          stack: ["Next.js", "React", "TypeScript"],
          description:
            "Interfaz de Shamell: publicación de eventos, venta de boletas, reserva de puestos y panel de administración.",
          layers: [
            { layer: "Frontend", items: "Next.js, React, TypeScript" },
            { layer: "QA Frontend", items: "Jest, Vitest, Testing Library" },
          ],
          features: [
            "Publicación de eventos y venta de boletas",
            "Reserva de puestos",
            "Panel de administración",
          ],
          demoUrl: "https://www.shamellentertainment.com/",
        },
        {
          id: "backend",
          label: "Backend + QA",
          subtitle: "APIs NestJS y pruebas E2E",
          stack: ["NestJS", "PostgreSQL", "Playwright"],
          description:
            "APIs en NestJS, base PostgreSQL y cobertura de pruebas unitarias y E2E en los flujos de compra, reservas y pagos.",
          layers: [
            { layer: "Backend", items: "Node.js, NestJS" },
            { layer: "Base de datos", items: "PostgreSQL" },
            { layer: "QA", items: "Jest, Playwright, CI/CD" },
          ],
          features: [
            "APIs REST para eventos, boletas y pagos",
            "Pruebas E2E en compra, reservas y pagos",
            "Backend modularizado para mantenimiento",
          ],
        },
      ],
    },
    cardImage: "/shamell-card.png",
    mainImage: "/shamell-main.png",
    image: "/shamell-main.png",

    links: {
      demo: "https://www.shamellentertainment.com/",
      repoNote: "Privado. Disponible para revisión en entrevista.",
    },

    infrastructure: {
      frontend: "Next.js",
      backend: "NestJS",
      database: "PostgreSQL",
      qa: "Pruebas en CI/CD",
    },
  },
];

/** Alias usado por el rediseño animado */
export const featuredProjects = PROJECTS;

// --- PROYECTOS DE FORMACIÓN (sección secundaria) ---

export const TRAINING_PROJECTS: TrainingProject[] = [
  {
    title: "Variedades Lili",
    shortDescription: "E-commerce con dos aplicaciones: una tienda para clientes en React y TypeScript, y un panel de administración para productos, inventario y pedidos. Backend en Node.js y Express con arquitectura por capas.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand", "Node.js", "Express", "MySQL"],
    links: [
      { label: "Demo tienda", url: "https://proyecto-variedades-lili-cliente.vercel.app" },
      { label: "Demo admin", url: "https://proyectos-5stx.vercel.app/" },
      { label: "Repo tienda", url: "https://github.com/junkamilo/Proyectos/tree/main/VariedadesLiliCLientes/VariedadeLiliClientes_Frontend" },
      { label: "Repo admin", url: "https://github.com/junkamilo/Proyectos/tree/main/variedadesLili" },
    ],
    note: COLD_START_NOTE,
  },
  {
    title: "Music Streaming App",
    shortDescription: "Plataforma de música hecha como proyecto de grado: los usuarios escuchan y crean playlists, y los artistas suben sus álbumes. JavaScript sin frameworks con arquitectura MVC, Node.js, Express y MySQL.",
    technologies: ["JavaScript (MVC)", "Node.js", "Express", "MySQL", "Multer"],
    links: [
      { label: "Demo", url: "https://music-app-ecru-nine-86.vercel.app" },
      { label: "Repositorio", url: "https://github.com/junkamilo/MusicApp.git" },
    ],
    note: COLD_START_NOTE,
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
