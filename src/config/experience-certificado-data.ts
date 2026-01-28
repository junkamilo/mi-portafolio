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
        slug: "desarrollador-software-practica",
        type: "work",
        title: "Desarrollador de Software - Práctica",
        organization: "Empresa XYZ",
        period: "2024",
        shortDescription:
            "Desarrollo de aplicaciones web con React y Node.js. Colaboración en equipo utilizando metodologías ágiles y control de versiones con Git.",
        fullDescription: `Mi etapa productiva como desarrollador de software me permitió aplicar todos los conocimientos adquiridos en un entorno laboral real.
Principales responsabilidades:
- Desarrollo de nuevas funcionalidades para aplicaciones web existentes
- Corrección de bugs y optimización de código
- Participación en reuniones diarias de Scrum
- Revisión de código de compañeros
- Documentación técnica de las funcionalidades desarrolladas
Durante este periodo, trabajé principalmente con React para el frontend y Node.js con Express para el backend. Utilicé PostgreSQL como base de datos y Docker para la containerización de las aplicaciones.
Esta experiencia me enseñó la importancia del trabajo en equipo, la comunicación efectiva y las buenas prácticas de desarrollo en un entorno profesional.`,
        certificateImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
        skills: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "Git", "Jira", "Scrum"],
        projects: [
            {
                title: "Módulo de Reportes",
                description: "Desarrollo de un módulo completo de generación de reportes con gráficos interactivos.",
                repoUrl: "https://github.com/usuario/modulo-reportes"
            }
        ]
    },
    {
        slug: "react-guia-completa",
        type: "course",
        title: "React - La Guía Completa",
        organization: "Udemy",
        period: "2023",
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
        certificateImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
        skills: ["React", "Redux", "Context API", "React Router", "Jest", "TypeScript"],
        projects: [
            {
                title: "E-commerce App",
                description: "Tienda online completa con carrito de compras, autenticación y pasarela de pagos.",
                repoUrl: "https://github.com/usuario/react-ecommerce",
                demoUrl: "https://react-ecommerce-demo.vercel.app"
            },
            {
                title: "Task Manager",
                description: "Aplicación de gestión de tareas con Redux para manejo de estado.",
                repoUrl: "https://github.com/usuario/react-tasks"
            }
        ],
        repoUrl: "https://github.com/usuario/react-course-exercises",
        certificateUrl: "https://udemy.com/certificate/123456"
    },
    {
        slug: "javascript-moderno",
        type: "course",
        title: "JavaScript Moderno",
        organization: "Platzi",
        period: "2023",
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
        certificateImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop",
        skills: ["JavaScript", "ES6+", "Async/Await", "Fetch API", "Patrones de Diseño"],
        projects: [
            {
                title: "API Consumer",
                description: "Aplicación que consume múltiples APIs públicas con manejo de errores y loading states.",
                repoUrl: "https://github.com/usuario/js-api-consumer",
                demoUrl: "https://js-api-consumer.netlify.app"
            },
            {
                title: "Mini Framework MVC",
                description: "Implementación de un mini framework siguiendo el patrón MVC.",
                repoUrl: "https://github.com/usuario/mini-mvc"
            }
        ],
        repoUrl: "https://github.com/usuario/platzi-js-exercises",
        certificateUrl: "https://platzi.com/p/usuario/curso/javascript-moderno/diploma/"
    },
    {
        slug: "bases-datos-postgresql",
        type: "course",
        title: "Bases de Datos con PostgreSQL",
        organization: "Coursera",
        period: "2022",
        shortDescription:
            "Diseño de bases de datos relacionales, SQL avanzado y optimización de consultas.",
        fullDescription: `Este curso especializado en PostgreSQL me proporcionó conocimientos profundos sobre diseño y administración de bases de datos relacionales.
Contenido principal:
- Fundamentos del modelo relacional
- Diseño de esquemas y normalización
- DDL: CREATE, ALTER, DROP
- DML: SELECT, INSERT, UPDATE, DELETE
- Consultas avanzadas (JOINs, subqueries, CTEs)
- Funciones y procedimientos almacenados
- Triggers y eventos
- Índices y optimización de consultas
- Transacciones y ACID
- Backup y recuperación
- Seguridad y roles de usuario
El curso incluyó un proyecto final donde diseñé e implementé una base de datos completa para un sistema de gestión empresarial.`,
        certificateImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
        skills: ["PostgreSQL", "SQL", "Diseño de BD", "Normalización", "Optimización"],
        projects: [
            {
                title: "Sistema de Inventario - BD",
                description: "Diseño completo de base de datos para sistema de inventario con triggers y procedimientos.",
                repoUrl: "https://github.com/usuario/inventario-db"
            },
            {
                title: "Ejercicios SQL Avanzado",
                description: "Colección de ejercicios resueltos de SQL avanzado con explicaciones.",
                repoUrl: "https://github.com/usuario/sql-exercises"
            }
        ],
        repoUrl: "https://github.com/usuario/postgresql-course",
        certificateUrl: "https://coursera.org/verify/123456"
    }
];