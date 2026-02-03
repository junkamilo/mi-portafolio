export interface ExperienceImage {
    url: string;
    caption?: string;
}
export interface ExperienceProject {
    title: string;
    description: string;
    repoUrl?: string;
    demoUrl?: string;
}
export interface ExperienceItem {
    slug?: string;
    type: "education" | "work" | "course";
    title: string;
    organization: string;
    period: string;
    shortDescription: string;
    fullDescription: string;
    certificateImage?: string;
    gallery?: ExperienceImage[];
    skills?: string[];
    projects?: ExperienceProject[];
    repoUrl?: string;
    certificateUrl?: string;
}
export const experienceData: ExperienceItem[] = [
    {
        slug: "tecnologia-analisis-desarrollo-software",
        type: "education",
        title: "Tecnólogo en Análisis y Desarrollo de Software",
        organization: "SENA",
        period: "2022 - 2024",
        shortDescription:
            "Formación integral en desarrollo de software, bases de datos, metodologías ágiles y buenas prácticas de programación.",
        fullDescription: `El programa de Tecnología en Análisis y Desarrollo de Software del SENA me proporcionó una formación completa y práctica en el desarrollo de aplicaciones.
Durante los dos años de formación, adquirí conocimientos sólidos en:
- Programación orientada a objetos
- Desarrollo web frontend y backend
- Bases de datos relacionales y NoSQL
- Metodologías ágiles (Scrum, Kanban)
- Control de versiones con Git
- Testing y aseguramiento de calidad
El programa incluyó múltiples proyectos prácticos que me permitieron aplicar los conocimientos teóricos en situaciones reales, preparándome para enfrentar los desafíos del mundo laboral.`,
        certificateImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        skills: ["Java", "JavaScript", "Python", "PostgreSQL", "MySQL", "Git", "Scrum", "HTML/CSS"],
        projects: [
            {
                title: "Sistema de Gestión Académica",
                description: "Aplicación web para gestionar estudiantes, cursos y calificaciones. Desarrollado como proyecto integrador.",
                repoUrl: "https://github.com/usuario/gestion-academica"
            },
            {
                title: "API REST de Biblioteca",
                description: "Backend completo para sistema de biblioteca con autenticación y CRUD de libros.",
                repoUrl: "https://github.com/usuario/biblioteca-api"
            }
        ],
        repoUrl: "https://github.com/usuario/sena-projects",
        certificateUrl: "https://certificados.sena.edu.co/verificar/123456"
    },
    {
        slug: "nextjs-fullstack-guide",
        type: "course", // 👈 Lo definimos como curso/certificación
        title: "Next.js: El Framework de React para Producción",
        organization: "Udemy", // O la plataforma que corresponda
        period: "2025",

        shortDescription:
            "Especialización en desarrollo Full Stack moderno: App Router, Server Actions, SSR y conexión a bases de datos.",

        fullDescription: `Curso avanzado enfocado en la arquitectura de última generación de Next.js. Aprendí a construir aplicaciones robustas eliminando la necesidad de una API externa separada, utilizando las capacidades Full Stack del framework.

Temas dominados:
- App Router & File-system Routing
- React Server Components (RSC) vs Client Components
- Server Actions (Mutaciones de datos sin API endpoints)
- Optimización de fuentes e imágenes (Next/Image)
- SEO y Metadatos dinámicos
- Autenticación (NextAuth.js / Auth.js)
- Manejo de base de datos con Prisma ORM
- Despliegue y CI/CD en Vercel`,

        certificateImage: "/certificado_Next_js.jpg",

        // Skills potentes para 2025
        skills: ["Next.js 14", "App Router", "Server Actions", "Prisma ORM", "TypeScript", "Tailwind CSS"],

        projects: [
            {
                title: "First Steps",
                // Enfocado en la estructura base: App Router y Layouts
                description: "Fundamentos de arquitectura. Implementación del App Router, manejo de rutas anidadas, Layouts persistentes y diferenciación entre Server/Client Components.",
                repoUrl: "https://github.com/junkamilo/Next.js/tree/main/Next/first-steps"
            },
            {
                title: "Dashboard UI",
                // Enfocado en datos y UI: Fetching y Componentes
                description: "Panel de administración modular. Práctica intensiva de Data Fetching con la API de Pokemon",
                repoUrl: "https://github.com/junkamilo/Next.js/tree/main/Next/my-dashboard"
            }
        ],

        repoUrl: "https://github.com/junkamilo/Next.js",
        certificateUrl: "https://onedrive.live.com/?viewid=fc565c85%2D4b41%2D411f%2D92b8%2D8ef7fd0499ee&id=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy%2Fcertificado%5FNext%5Fjs%2Ejpg&parent=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy"
    },
    {
        slug: "react-guia-completa",
        type: "course",
        title: "React - La Guía Completa",
        organization: "Udemy",
        period: "2025",
        shortDescription:
            "Curso avanzado de React incluyendo Hooks, Context API, Redux y testing.",
        fullDescription: `Este curso intensivo de React me permitió profundizar en el ecosistema de esta biblioteca y dominar las técnicas modernas de desarrollo frontend.
Contenido del curso:
- Fundamentos de React y JSX
- Componentes funcionales y de clase
- Hooks (useState, useEffect, useContext, useReducer, useMemo, useCallback)
- Context API para manejo de estado global
- Redux y Redux Toolkit
- React Router para navegación
- Testing con Jest y React Testing Library
- Optimización de rendimiento
- Patrones de diseño en React
El curso incluyó múltiples proyectos prácticos que me ayudaron a consolidar cada concepto aprendido.`,
        certificateImage: "/certificado_React.jpg",
        skills: ["React", "Redux", "Context API", "React Router", "Jest", "TypeScript"],
        projects: [
            {
                title: "Artista App",
                // "Ejercicio práctico" baja la expectativa de "Producto Real" pero mantiene el valor técnico.
                description: "Ejercicio de introducción a React. Interfaz sencilla para visualizar un catálogo de artistas, enfocada en la estructura de componentes.",
                repoUrl: "https://github.com/junkamilo/AprendiendoReact.js/tree/main/proyectosReact/ArtistasApp/ArtistaApp",
            },
            {
                title: "React Calendar",
                // "Lógica de renderizado" suena bien técnicamente, sin prometer un Google Calendar.
                description: "Práctica de lógica de programación. Implementación manual de una grilla de fechas para reforzar el manejo de props y renderizado de listas.",
                repoUrl: "https://github.com/junkamilo/AprendiendoReact.js/tree/main/proyectosReact/calendar/Calendar"
            }
        ],
        repoUrl: "https://github.com/junkamilo/AprendiendoReact.js",
        certificateUrl: "https://onedrive.live.com/?viewid=fc565c85%2D4b41%2D411f%2D92b8%2D8ef7fd0499ee&id=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy%2Fcertificado%20React%2Ejpg&parent=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy"
    },
    {
        slug: "javascript-moderno",
        type: "course",
        title: "JavaScript Moderno",
        organization: "Udemy",
        period: "2025",
        shortDescription:
            "Fundamentos avanzados de JavaScript ES6+, programación asíncrona y patrones de diseño.",
        fullDescription: `Este curso me proporcionó una base sólida en JavaScript moderno, cubriendo todas las características de ES6+ y las mejores prácticas de desarrollo.
Temas cubiertos:
- Variables y scope (let, const, var)
- Arrow functions y this
- Destructuring y spread operator
- Template literals
- Clases y herencia
- Módulos ES6
- Promesas y async/await
- Fetch API y manejo de APIs
- Manejo de errores
- Patrones de diseño (Module, Factory, Observer, etc.)
- Programación funcional
Cada tema incluyó ejercicios prácticos y proyectos que me permitieron aplicar los conceptos inmediatamente.`,
        certificateImage: "/javaScript.jpg",
        skills: ["JavaScript", "ES6+", "Async/Await", "Fetch API", "Patrones de Diseño"],
        projects: [
            {
                title: "Proverbios Gen", // Le agregué "Gen" para que suene a herramienta
                description: "Generador de citas aleatorias. Ejercicio básico de manipulación del DOM y manejo de arrays con JavaScript Vanilla.",
                repoUrl: "https://github.com/junkamilo/AprendiendoJs/tree/main/Proyectos/Proverbios",
            },
            {
                title: "Vanilla JS CRUD",
                // "Persistencia de datos" y "Ciclo CRUD" son los términos técnicos correctos.
                description: "Implementación del ciclo de vida de datos (Crear, Leer, Actualizar, Eliminar). Práctica enfocada en la persistencia con LocalStorage y lógica de estado en el cliente.",
                repoUrl: "https://github.com/junkamilo/AprendiendoJs/tree/main/NivelPro",
            },

        ],
        repoUrl: "https://github.com/junkamilo/AprendiendoJs",
        certificateUrl: "https://onedrive.live.com/?viewid=fc565c85%2D4b41%2D411f%2D92b8%2D8ef7fd0499ee&id=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy%2FjavaScript%2Ejpg&parent=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy"
    },
    {
        slug: "qa-testing-fundamentals",
        type: "course", // Mantiene consistencia con el de JS
        title: "Software Testing & Quality Assurance",
        organization: "Udemy",
        period: "2024",
        shortDescription:
            "Dominio de metodologías de prueba (Manual/Automated), ciclo de vida del defecto y automatización con Cypress y Jest.",
        fullDescription: `Curso integral enfocado en garantizar la fiabilidad del software mediante estrategias de prueba modernas. Aprendí a diferenciar y aplicar distintos niveles de testing dentro del ciclo de desarrollo.

Temas cubiertos:
- Fundamentos de QA (Caja Negra vs Caja Blanca)
- Ciclo de vida del Bug y Reporte de incidencias
- Diseño y ejecución de Casos de Prueba (Test Cases)
- Pruebas Unitarias (Unit Testing) con Jest
- Pruebas de Integración
- Automatización End-to-End (E2E) con Cypress
- Introducción a TDD (Test Driven Development)
- Validación de selectores y aserciones en el DOM`,

        certificateImage: "/testing.jpg",

        skills: ["QA Manual", "Cypress", "Jest", "E2E Testing", "Test Cases", "Bug Tracking"],

        projects: [
            {
                title: "QA Case Study: Rappi", // Suena mucho más analítico y profesional
                // Palabras clave: "Documentación visual", "Matrices de prueba", "Lógica de negocio"
                description: "Plataforma web desarrollada para documentar y visualizar estrategias de QA. Presentación interactiva de matrices de prueba y flujos de error basados en la lógica de negocio de Rappi.",
                repoUrl: "https://github.com/junkamilo/Proyectos/tree/main/CasosPruebasRappi/CasosPruebasRappi",
            },
        ],

        repoUrl: "https://github.com/junkamilo/Proyectos/tree/main/CasosPruebasRappi/CasosPruebasRappi",
        certificateUrl: "https://onedrive.live.com/?viewid=fc565c85%2D4b41%2D411f%2D92b8%2D8ef7fd0499ee&id=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy%2Ftesting%2Ejpg&parent=%2Fpersonal%2F35e72f33017a264d%2FDocuments%2FHoja%20De%20Vida%2FCertificaciones%20Cursos%20Udemy"
    },
];