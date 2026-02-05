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
  payment?:string;
  current?: string;
  future?:string;
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

  demoNote?: string;
}

// --- DATOS DE PROYECTOS ---

export const PROJECTS: Project[] = [
  {
    slug: "music-streaming-platform",
    title: "Music Streaming & Publishing",
    shortDescription: "Plataforma de streaming y publicación de audio. Gestión de roles y arquitectura MVC con Vanilla JS.",

    fullDescription: `Una plataforma integral de distribución musical desarrollada inicialmente como proyecto de grado. El objetivo técnico fue implementar una arquitectura MVC robusta utilizando JavaScript puro (Vanilla), sin depender de frameworks frontend.
    
    El sistema permite a los usuarios consumir contenido, crear playlists y convertirse en 'Artistas' para subir sus propios álbumes. Actualmente, el proyecto se encuentra en una fase de refactorización y mejora continua, optimizando la persistencia de datos y la experiencia de usuario.`,

    category: "Full Stack / Vanilla JS",


    date: "En desarrollo continuo",
    role: "Full Stack Developer",
    duration: "En desarrollo continuo",

    technologies: ["Vanilla JS (MVC)", "Node.js", "Express", "MySQL", "CSS3", "Multer", "TiDB Cloud", "Render"],

    cardImage: "/portada_music.png",
    mainImage: "/Portada_Web_Music.png",

    features: [
      "Arquitectura MVC implementada manualmente en el Frontend",
      "Sistema de Roles (Usuario vs. Artista)",
      "Upload y streaming de archivos de audio",
      "Despliegue en la nube (Render + TiDB)"
    ],

    links: {
      github: "https://github.com/junkamilo/MusicApp.git",
      demo: "https://music-app-ecru-nine-86.vercel.app"
    },

    // CAMBIO IMPORTANTE: Agregamos este campo para la advertencia
    demoNote: "Nota de Infraestructura: El backend y la base de datos están alojados en planes gratuitos (Render / TiDB). Estos servicios entran en suspensión por inactividad (Cold Start). Si la demo no carga datos inmediatamente, por favor espera unos 30-60 segundos mientras el servidor se reactiva.",

    infrastructure: {
      database: "TiDB Cloud (MySQL Compatible)",
      backend: "Render (Node.js)",
      frontend: "Vercel (Static)"
    }
  },
  {
    slug: "variedades-lili-admin",
    title: "Variedades lili E-commerce Admin Dashboard", // Título profesional

    // Descripción corta: Directa al grano (Gestión + Arquitectura)
    shortDescription: "Panel administrativo integral para la gestión de inventario, pedidos y usuarios. Arquitectura en capas sin dependencia de frameworks frontend.",

    // Descripción larga: Vendemos la estructura MVC y la lógica de negocio
    fullDescription: `Una solución Full Stack personalizada para la administración operativa del e-commerce 'Variedades Lili'. Diseñada para que los administradores gestionen el ciclo de vida completo de los productos y pedidos.
    
    En el Frontend, implementé una arquitectura MVC con JavaScript Vanilla y Tailwind CSS para una UI rápida y responsiva. En el Backend, utilicé una arquitectura por capas (Rutas -> Controladores -> Servicios -> Modelos) para asegurar un código mantenible y escalable, manejando subida de imágenes con Multer y consultas complejas a MySQL.`,

    category: "Full Stack / Admin Tool",
    date: "En desarrollo continuo",
    role: "Full Stack Developer",

    // 🚀 TAGS CORREGIDOS: Muestran tu stack real pero con nombres técnicos
    technologies: ["Vanilla JS (MVC)", "Node.js", "Express", "Tailwind CSS", "MySQL", "Multer"],

    cardImage: "/portada_lili_Admin.png", // Verde = Negocio/Dinero
    mainImage: "/banner_lili_admin.jpg", // Imagen tipo Dashboard

    features: [
      "CRUD completo de productos con gestión de imágenes (Multer)",
      "Gestión de estados de pedidos (Enviados/Recibidos)",
      "Arquitectura Backend por Capas (Controller-Service-Model)",
      "Interfaz responsiva construida con Tailwind CSS y Vanilla JS"
    ],

    links: {
      github: "https://github.com/junkamilo/Proyectos/tree/main/variedadesLili",
      demo: "https://proyectos-5stx.vercel.app/"
    },

    demoNote: "Nota de Infraestructura: El backend y la base de datos están alojados en planes gratuitos (Render / TiDB). Estos servicios entran en suspensión por inactividad (Cold Start). Si la demo no carga datos inmediatamente, por favor espera unos 30-60 segundos mientras el servidor se reactiva.",

    infrastructure: {
      frontend: "Vercel",
      backend: "Render",
      database: "MySQL"
    }
  },
  {
    slug: "variedades-lili-frontend",
    title: "Variedades Lili: E-commerce Client", // Título claro y parejo al del Admin
    
    // Descripción corta: Destaca el Stack moderno y la UX
    shortDescription: "Experiencia de compra completa (SPA). Gestión de estado asíncrono con TanStack Query y carrito global persistente.",

    // Descripción larga: Aquí vendemos la complejidad de la lógica del lado del cliente
    fullDescription: `La interfaz pública del ecosistema 'Variedades Lili', diseñada para ofrecer una experiencia de compra fluida y segura. Desarrollada como una Single Page Application (SPA) utilizando React y TypeScript.
    
    El proyecto destaca por su gestión eficiente del estado: implementé **TanStack Query** para la sincronización de datos con el servidor (caching, revalidación de productos y pedidos) y **Zustand** para el manejo global del carrito de compras. Se integra con el mismo Backend monolítico del panel administrativo, permitiendo a los usuarios registrarse, gestionar su historial de pedidos y realizar compras en tiempo real.`,

    category: "Frontend / React SPA",
    date: "En desarrollo continuo",
    role: "Frontend Developer", // O "Full Stack Developer" si prefieres unificar

    // 🚀 TAGS TÉCNICOS:
    // "TanStack Query" es un gran plus para mostrar manejo de datos avanzado.
    technologies: ["React", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand", "React Router"],

    // Asegúrate de que esta imagen sea distinta a la del Admin (quizás una captura del Home o del Carrito)
    cardImage: "/portada_lili_Cliente.png", 
    mainImage: "/banner_lili_cliente.jpg",

    features: [
      "Ciclo completo de compra (Carrito -> Checkout -> Pedido)",
      "Gestión de Estado de Servidor (Server State) con TanStack Query",
      "Panel de Usuario: Historial de pedidos y gestión de perfil",
      "UI Componentizada y Tipado estricto con TypeScript"
    ],

    links: {
      github: "https://github.com/junkamilo/Proyectos/tree/main/VariedadesLiliCLientes/VariedadeLiliClientes_Frontend", // Asegúrate de que este link sea el correcto
      demo: "https://proyecto-variedades-lili-cliente.vercel.app"
    },

    // ⚠️ CRUCIAL: La misma nota, ya que consumen la misma API
    demoNote: "Nota de Infraestructura: Esta aplicación consume una API alojada en servicios gratuitos (Render). Si los productos o el inicio de sesión no cargan de inmediato, es debido al 'Cold Start' del servidor. Por favor espera 30-60 segundos a que la API despierte.",

    infrastructure: {
      frontend: "Vercel",
      backend: "Render (Shared API)",
      database: "MySQL (TiDB)"
    }
  },
  {
    slug: "app-restaurante",
    title: "Restaurant Management System", // Título sólido
    
    // Descripción corta: Mencionamos el origen (Java) y el destino (Web)
    shortDescription: "Sistema de gestión de comandas y roles (Cocina/Meseros). Prototipo Java Desktop en proceso de migración a arquitectura Web (React + Laravel).",

    // Descripción larga: Explicamos la lógica de negocio (que ya funciona) y el plan futuro
    fullDescription: `Un sistema integral para la gestión operativa de restaurantes, desarrollado inicialmente como proyecto de grado (SENA) en Java. La aplicación orquesta el flujo de trabajo en tiempo real entre distintos roles:
    
    1. **Meseros:** Toma de pedidos y envío digital a cocina.
    2. **Cocina:** Interfaz de visualización y despacho de comandas.
    3. **Admin:** Control financiero, inventarios y gestión de empleados.
    
    **Estado Actual (Refactorización):** Aunque el núcleo lógico funciona perfectamente en escritorio (Java Swing + MySQL), actualmente estoy liderando la **migración del sistema** hacia una arquitectura Web moderna (SPA) utilizando **React/Vite** en el frontend y **Laravel** en el backend, para permitir el uso desde tablets y móviles en el local.`,

    category: "Desktop / Migration", // Categoría honesta
    date: "En desarrollo continuo", // "Presente" porque sigues trabajando en la migración
    role: "System Architect", // Suena mejor porque estás rediseñando el sistema
    
    // 🚀 TAGS: Mezcla lo que hiciste (Java) con lo que estás haciendo (Migration)
    technologies: ["Java", "Swing", "MySQL", "JasperReports", "POO", "System Migration"],

    cardImage: "/portada_app_restaurante.png", // Asegúrate de tener una imagen (puede ser un screenshot del Java Swing)
    mainImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=675&fit=crop", // Foto genérica de restaurante elegante

    features: [
      "Sistema multi-rol (Admin, Cocinero, Mesero, Auxiliar)",
      "Sincronización de pedidos (Mesa ➔ Cocina ➔ Entrega)",
      "Reportes contables automáticos en PDF (JasperReports)",
      "En progreso: Migración a React + Laravel (Web)"
    ],

    links: {
      github: "https://github.com/junkamilo/RestauranteApp/tree/main/Restaurante_app",
      // ALERTA: No ponemos demo porque es local.
      // El código del botón "Ver Demo" no se renderizará si este campo no existe, así que perfecto.
    },

    infrastructure: {
      current: "Java Desktop (Local)",
      database: "MySQL (Local)",
      future: "Vite + Laravel (Cloud)" // Muestra tu visión
    }
  },
  {
    slug: "urban-shop-clothing",
    title: "Urban Shop | Full Stack E-commerce",
    
    // Descripción Corta: Directa y técnica
    shortDescription: "Plataforma de comercio electrónico con pasarela de pagos (PayPal) y panel de administración. Construida con Next.js, Prisma y PostgreSQL.",

    // Descripción Larga: Vendemos el flujo completo y la tecnología
    fullDescription: `Una tienda de ropa urbana moderna diseñada bajo una arquitectura Full Stack con Next.js. El proyecto abarca dos experiencias de usuario:
    
    1. **Cliente:** Navegación fluida, carrito de compras dinámico y checkout integrado con la API de PayPal (Entorno Sandbox) para simular transacciones reales.
    2. **Administrador:** Un dashboard protegido para la gestión de inventario (CRUD de productos), control de stock y visualización de pedidos pagados.
    
    El manejo de datos se realiza a través de **Prisma ORM** conectado a una base de datos en la nube. *Nota: Los recursos gráficos de la tienda fueron generados mediante IA (Gemini).*`,

    category: "E-commerce / Next.js",
    date: "En desarrollo continuo", // Muestra que el proyecto está vivo
    role: "Full Stack Developer",
    
    // 🚀 TAGS: "PayPal API" y "Prisma" son palabras clave fuertes
    technologies: ["Next.js", "TypeScript", "Prisma ORM", "PayPal API", "Tailwind CSS", "PostgreSQL"],

    cardImage: "/portada_ecommer.png", // Asegúrate de tener esta imagen
    mainImage: "/banner_commer_cloting.jpg",

    features: [
      "Pasarela de Pagos funcional (PayPal Developer Sandbox)",
      "Dashboard Administrativo para gestión de productos",
      "Persistencia de datos con Prisma y TiDB/Postgres",
      "Diseño UI/UX responsivo generado con Tailwind CSS"
    ],

    links: {
      github: "https://github.com/junkamilo/urban-shop-repo", // PON AQUÍ TU LINK REAL
      demo: "https://urban-shop-demo.vercel.app" // PON AQUÍ TU LINK REAL
    },

    // ⚠️ LA NOTA DE INFRAESTRUCTURA (Crucial por TiDB/Render)
    demoNote: "Nota de Infraestructura: La base de datos está alojada en un servicio gratuito (TiDB/Render). Si los productos tardan en cargar o el inicio de sesión es lento, es debido al 'Cold Start'. Por favor espera unos segundos.",

    infrastructure: {
      frontend: "Next.js (App Router)",
      backend: "Render (Node.js)",
      database: "TiDB(SQL)",
      payment: "PayPal Sandbox"
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