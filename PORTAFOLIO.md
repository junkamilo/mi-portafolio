# Portafolio de Hoja de Vida — Juan Beltran

> Documento de referencia que describe cómo está conformado actualmente el portafolio (proyecto Next.js) y **todo el texto** que muestra cada sección.
> Los textos se transcriben tal cual aparecen en el código fuente. Fecha de corte: 2026-11-17.

---

## 1. Estructura técnica del proyecto

| Elemento | Detalle |
|---|---|
| Nombre del paquete | `hoja-vida-juan-camilo` (v0.1.0) |
| Framework | Next.js 16.1.1 (App Router) |
| UI | React 19.2.3, TypeScript, Tailwind CSS 4 |
| Componentes base | Radix UI / shadcn-style (`components/ui/*`) |
| Animaciones | Framer Motion 12 |
| Iconos | lucide-react |
| Temas | next-themes (modo claro / oscuro) |
| Notificaciones | sonner |
| Estado de servidor | @tanstack/react-query (instalado) |
| Fuente de datos | Archivos de configuración en `src/config/` (contenido editable sin tocar componentes) |

### Árbol relevante

```
src/
├── app/
│   ├── layout.tsx                  # Metadata global, Providers, ThemeProvider
│   ├── globals.css
│   ├── (general)/
│   │   ├── layout.tsx              # Header + Footer
│   │   └── page.tsx                # Página principal (una sola página con anclas)
│   ├── proyectos/[slug]/page.tsx   # Detalle de proyecto
│   └── experience/[slug]/page.tsx  # Detalle de formación / certificación
├── components/
│   ├── section/                    # Hero, About, Skills, Experience, Contact, Header, Footer, ProfileImage, Providers
│   ├── projects/                   # Projects, ProjectCard
│   ├── project-detail/             # Hero, Header, Description, Features, Challenges, Gallery, Sidebar
│   ├── experience-detail/          # Hero, Header, Content, Gallery, RelatedProjects, Sidebar
│   ├── contact/ContactSection.tsx  # Tarjeta de contacto
│   ├── modeToggle/                 # Botón claro/oscuro
│   └── themeProvider/
├── config/                         # CONTENIDO: hero, about, skills, experience, projects, contact, navigation
└── hooks/                          # use-contact-form, use-scroll
public/                             # Imágenes, certificados y cv-juan.pdf
```

### Estructura de la página principal (orden de aparición)

1. **Header** fijo (navegación + botón CV + botón "Hablemos" + modo oscuro + menú móvil)
2. **Hero** (`#inicio`) — portada con foto, nombre, rol y botones
3. **About** (`#sobre-mi`) — trayectoria en línea de tiempo + tarjetas de métricas + terminal
4. **Skills** (`#skills`) — "Arsenal Tecnológico" con 5 categorías
5. **Projects** (`#proyectos`) — "Proyectos Destacados" con 5 tarjetas
6. **Experience** (`#experiencia`) — experiencia laboral + educación y certificaciones
7. **Contact** (`#contacto`) — tarjeta de contacto con email y redes
8. **Footer**

### Páginas de detalle

- `/proyectos/[slug]` — muestra descripción completa, características, desafíos, galería, tecnologías, infraestructura y enlaces (GitHub / demo).
- `/experience/[slug]` — muestra detalle de formación o certificación, galería, proyectos relacionados, habilidades y enlaces.

---

## 2. Metadata global (`src/app/layout.tsx`)

- **Título:** `Dev Juan Beltran`
- **Descripción:** `Portafolio profesional de Desarrollo Full Stack`
- **Ícono / Apple / Shortcut:** `/fotoPerfilHojaVida.png`

---

## 3. Header (barra de navegación)

**Logo:** `D` + `DevJuan` (la palabra "Juan" va en gris)

**Enlaces de navegación:**
- Inicio
- Proyectos
- Sobre mí
- Experiencia

**Botones:**
- `CV` (descarga `/cv-juan.pdf` con nombre `Juan_Beltran_CV.pdf`). En pantallas grandes muestra el texto "CV"; en pantallas medianas solo el ícono.
- `Hablemos` (lleva a `#contacto`)
- Botón de modo claro / oscuro
- Menú móvil: Inicio, Proyectos, Sobre mí, Experiencia y **Descargar CV**

---

## 4. Hero (`#inicio`)

Fuente: `src/config/hero-data.ts`

- **Badge (copiable):** `Disponible para trabajar`
  - Al hacer clic copia el correo y muestra: `¡Email Copiado!`
- **Título:** `Hola, soy` **Juan Beltran** / *Software Developer & QA Engineer*
- **Descripción:**
  > Desarrollo software con mentalidad de tester. Construyo aplicaciones Full Stack con React, Next.js, TypeScript y Node.js, y garantizo su calidad con pruebas automatizadas (Cypress, Selenium, Jest). Mi experiencia en el equipo de QA de Rappi me enseñó a escribir código robusto, mantenible y probado desde el primer commit.

- **Botones:**
  - `Ver Proyectos` (desplaza a `#proyectos`)
  - Ícono de email (desplaza a `#contacto`), etiqueta "Email"
  - Ícono de LinkedIn → `https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/?trk=public-profile-join-page`
- **Indicador de scroll:** `Scroll`
- **Foto:** `/fotoPerfilHojaVida.png`

---

## 5. About — Trayectoria Profesional (`#sobre-mi`)

Fuente: `src/config/about-data.ts`

**Título:** Trayectoria Profesional
**Subtítulo:** De la Lógica al Producto Escalable

### Línea de tiempo

1. **Técnologo en Análisis y Desarrollo de Software (SENA)**
   > Fundamentos sólidos en Java (POO) y bases de datos. Transición al desarrollo web moderno creando APIs RESTful.

2. **QA & Testing en Rappi**
   > Inmersión en ciclos ágiles de alto nivel. Reporte de bugs críticos,testing y análisis de arquitectura de componentes de React en producción.

3. **Especialización Full Stack Moderno**
   > Dominio del stack Next.js/TypeScript y NestJS. Enfoque en Clean Architecture, Testing y Experiencia de Usuario.

### Tarjetas de métricas

| Etiqueta | Valor |
|---|---|
| Perfil Técnico | Full Stack |
| Proyectos | 3+ Apps |
| Enfoque | AI Driven |
| Stack | MERN+ |

### Terminal decorativa

- Título de ventana: `bash — developer`
- Comando: `echo $PROPUESTA_VALOR`
- Salida:
  > "Código limpio, lógica sólida y enfoque en calidad. Listo para aportar valor real desde el primer commit."

---

## 6. Skills — Arsenal Tecnológico (`#skills`)

Fuente: `src/config/skills-data.ts`

**Título:** Arsenal Tecnológico
**Subtítulo:** Priorizo herramientas que garantizan rendimiento, escalabilidad y código limpio.

| Categoría | Descripción | Habilidades |
|---|---|---|
| **Frontend** | Experiencias de usuario rápidas, reactivas y accesibles. | React, Next.js, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Servidores escalables con lógica de negocio sólida. | NestJS, Node.js, Express, Java (POO) |
| **QA Testing** | Mentalidad 'Bug-Free'. Desde pruebas manuales hasta automatización. | Vitest, Jest, Jira, Test Cases, Debugging |
| **Base de datos & ORMs** | Gestión eficiente de datos y optimización de consultas. | PostgreSQL, MySQL, MongoDB, Prisma ORM |
| **DevOps & AI Workflow** | Herramientas que aceleran el ciclo de desarrollo. | Git/GitHub, Docker, Postman, Vercel, AI Assisted Coding |

---

## 7. Proyectos Destacados (`#proyectos`)

Fuente: `src/config/projects-data.ts`

**Título:** Proyectos Destacados
**Subtítulo:** Soluciones reales que demuestran arquitectura sólida, código limpio y visión de producto.

**CTA final:**
- Pregunta: ¿Te interesa ver cómo escribo código?
- Texto: Explora mis repositorios para ver mis proyectos personales.
- Botón: `Explorar GitHub` → https://github.com/junkamilo

### 7.1 Music Streaming & Publishing

- **Slug:** `music-streaming-platform`
- **Categoría:** Full Stack / Vanilla JS
- **Rol:** Full Stack Developer · **Fecha:** En desarrollo continuo
- **Descripción corta:** Plataforma de streaming y publicación de audio. Gestión de roles y arquitectura MVC con Vanilla JS.
- **Descripción completa:**
  > Una plataforma integral de distribución musical desarrollada inicialmente como proyecto de grado. El objetivo técnico fue implementar una arquitectura MVC robusta utilizando JavaScript puro (Vanilla), sin depender de frameworks frontend.
  >
  > El sistema permite a los usuarios consumir contenido, crear playlists y convertirse en 'Artistas' para subir sus propios álbumes. Actualmente, el proyecto se encuentra en una fase de refactorización y mejora continua, optimizando la persistencia de datos y la experiencia de usuario.
- **Tecnologías:** Vanilla JS (MVC), Node.js, Express, MySQL, CSS3, Multer, TiDB Cloud, Render
- **Características:**
  - Arquitectura MVC implementada manualmente en el Frontend
  - Sistema de Roles (Usuario vs. Artista)
  - Upload y streaming de archivos de audio
  - Despliegue en la nube (Render + TiDB)
- **Infraestructura:** Base de datos TiDB Cloud (MySQL Compatible) · Backend Render (Node.js) · Frontend Vercel (Static)
- **Nota de demo:** Nota de Infraestructura: El backend y la base de datos están alojados en planes gratuitos (Render / TiDB). Estos servicios entran en suspensión por inactividad (Cold Start). Si la demo no carga datos inmediatamente, por favor espera unos 30-60 segundos mientras el servidor se reactiva.
- **Enlaces:** GitHub `MusicApp` · Demo `music-app-ecru-nine-86.vercel.app`

### 7.2 Variedades Lili E-commerce Admin Dashboard

- **Slug:** `variedades-lili-admin`
- **Categoría:** Full Stack / Admin Tool
- **Rol:** Full Stack Developer · **Fecha:** En desarrollo continuo
- **Descripción corta:** Panel administrativo integral para la gestión de inventario, pedidos y usuarios. Arquitectura en capas sin dependencia de frameworks frontend.
- **Descripción completa:**
  > Una solución Full Stack personalizada para la administración operativa del e-commerce 'Variedades Lili'. Diseñada para que los administradores gestionen el ciclo de vida completo de los productos y pedidos.
  >
  > En el Frontend, implementé una arquitectura MVC con JavaScript Vanilla y Tailwind CSS para una UI rápida y responsiva. En el Backend, utilicé una arquitectura por capas (Rutas -> Controladores -> Servicios -> Modelos) para asegurar un código mantenible y escalable, manejando subida de imágenes con Multer y consultas complejas a MySQL.
- **Tecnologías:** Vanilla JS (MVC), Node.js, Express, Tailwind CSS, MySQL, Multer
- **Características:**
  - CRUD completo de productos con gestión de imágenes (Multer)
  - Gestión de estados de pedidos (Enviados/Recibidos)
  - Arquitectura Backend por Capas (Controller-Service-Model)
  - Interfaz responsiva construida con Tailwind CSS y Vanilla JS
- **Infraestructura:** Frontend Vercel · Backend Render · Base de datos MySQL
- **Nota de demo:** (la misma nota de Cold Start que el proyecto 7.1)
- **Enlaces:** GitHub `Proyectos/variedadesLili` · Demo `proyectos-5stx.vercel.app`

### 7.3 Variedades Lili: E-commerce Client

- **Slug:** `variedades-lili-frontend`
- **Categoría:** Frontend / React SPA
- **Rol:** Frontend Developer · **Fecha:** En desarrollo continuo
- **Descripción corta:** Experiencia de compra completa (SPA). Gestión de estado asíncrono con TanStack Query y carrito global persistente.
- **Descripción completa:**
  > La interfaz pública del ecosistema 'Variedades Lili', diseñada para ofrecer una experiencia de compra fluida y segura. Desarrollada como una Single Page Application (SPA) utilizando React y TypeScript.
  >
  > El proyecto destaca por su gestión eficiente del estado: implementé **TanStack Query** para la sincronización de datos con el servidor (caching, revalidación de productos y pedidos) y **Zustand** para el manejo global del carrito de compras. Se integra con el mismo Backend monolítico del panel administrativo, permitiendo a los usuarios registrarse, gestionar su historial de pedidos y realizar compras en tiempo real.
- **Tecnologías:** React, TypeScript, Tailwind CSS, TanStack Query, Zustand, React Router
- **Características:**
  - Ciclo completo de compra (Carrito -> Checkout -> Pedido)
  - Gestión de Estado de Servidor (Server State) con TanStack Query
  - Panel de Usuario: Historial de pedidos y gestión de perfil
  - UI Componentizada y Tipado estricto con TypeScript
- **Infraestructura:** Frontend Vercel · Backend Render (API compartida) · Base de datos MySQL (TiDB)
- **Nota de demo:** Nota de Infraestructura: Esta aplicación consume una API alojada en servicios gratuitos (Render). Si los productos o el inicio de sesión no cargan de inmediato, es debido al 'Cold Start' del servidor. Por favor espera 30-60 segundos a que la API despierte.
- **Enlaces:** GitHub `VariedadesLiliCLientes/VariedadeLiliClientes_Frontend` · Demo `proyecto-variedades-lili-cliente.vercel.app`

### 7.4 Restaurant Management System

- **Slug:** `app-restaurante`
- **Categoría:** Desktop / Migration
- **Rol:** System Architect · **Fecha:** En desarrollo continuo
- **Descripción corta:** Sistema de gestión de comandas y roles (Cocina/Meseros). Prototipo Java Desktop en proceso de migración a arquitectura Web (React + Laravel).
- **Descripción completa:**
  > Un sistema integral para la gestión operativa de restaurantes, desarrollado inicialmente como proyecto de grado (SENA) en Java. La aplicación orquesta el flujo de trabajo en tiempo real entre distintos roles:
  >
  > 1. **Meseros:** Toma de pedidos y envío digital a cocina.
  > 2. **Cocina:** Interfaz de visualización y despacho de comandas.
  > 3. **Admin:** Control financiero, inventarios y gestión de empleados.
  >
  > **Estado Actual (Refactorización):** Aunque el núcleo lógico funciona perfectamente en escritorio (Java Swing + MySQL), actualmente estoy liderando la **migración del sistema** hacia una arquitectura Web moderna (SPA) utilizando **React/Vite** en el frontend y **Laravel** en el backend, para permitir el uso desde tablets y móviles en el local.
- **Tecnologías:** Java, Swing, MySQL, JasperReports, POO, System Migration
- **Características:**
  - Sistema multi-rol (Admin, Cocinero, Mesero, Auxiliar)
  - Sincronización de pedidos (Mesa ➔ Cocina ➔ Entrega)
  - Reportes contables automáticos en PDF (JasperReports)
  - En progreso: Migración a React + Laravel (Web)
- **Infraestructura:** Actual: Java Desktop (Local) · Base de datos: MySQL (Local) · Futuro: Vite + Laravel (Cloud)
- **Enlaces:** GitHub `RestauranteApp/Restaurante_app` (sin demo, es local)

### 7.5 Urban Shop | Full Stack E-commerce

- **Slug:** `urban-shop-clothing`
- **Categoría:** E-commerce / Next.js
- **Rol:** Full Stack Developer · **Fecha:** En desarrollo continuo
- **Descripción corta:** Plataforma de comercio electrónico con pasarela de pagos (PayPal) y panel de administración. Construida con Next.js, Prisma y PostgreSQL.
- **Descripción completa:**
  > Una tienda de ropa urbana moderna diseñada bajo una arquitectura Full Stack con Next.js. El proyecto abarca dos experiencias de usuario:
  >
  > 1. **Cliente:** Navegación fluida, carrito de compras dinámico y checkout integrado con la API de PayPal (Entorno Sandbox) para simular transacciones reales.
  > 2. **Administrador:** Un dashboard protegido para la gestión de inventario (CRUD de productos), control de stock y visualización de pedidos pagados.
  >
  > El manejo de datos se realiza a través de **Prisma ORM** conectado a una base de datos en la nube. *Nota: Los recursos gráficos de la tienda fueron generados mediante IA (Gemini).*
- **Tecnologías:** Next.js, TypeScript, Prisma ORM, PayPal API, Tailwind CSS, PostgreSQL
- **Características:**
  - Pasarela de Pagos funcional (PayPal Developer Sandbox)
  - Dashboard Administrativo para gestión de productos
  - Persistencia de datos con Prisma y TiDB/Postgres
  - Diseño UI/UX responsivo generado con Tailwind CSS
- **Infraestructura:** Frontend Next.js (App Router) · Backend Render (Node.js) · Base de datos TiDB (SQL) · Pagos PayPal Sandbox
- **Nota de demo:** Nota de Infraestructura: La base de datos está alojada en un servicio gratuito (TiDB/Render). Si los productos tardan en cargar o el inicio de sesión es lento, es debido al 'Cold Start'. Por favor espera unos segundos.
- **Enlaces:** GitHub `urban-shop-repo` · Demo `urban-shop-demo.vercel.app`

---

## 8. Experiencia Profesional y Educación (`#experiencia`)

Fuente: `src/config/experience-data.ts`

**Título:** Trayectoria **Profesional** (la palabra "Profesional" en color primario)
**Descripción:** Un recorrido a través de mi experiencia práctica en la industria y mi constante evolución académica para construir software de valor.

### 8.1 Experiencia Laboral

**Rappi — QA Analyst & Frontend Testing**
- Remoto · 2025 - 2026
- Descripción: Aseguramiento de calidad en flujos críticos de la vertical de Restaurantes. Colaboración directa con equipos de Ingeniería para la detección temprana de bugs en componentes React, reduciendo la deuda técnica y mejorando la estabilidad del release.
- Habilidades: Jira, React, Testing Manual, Scrum, Git Flow

**Proyectos Personales — Desarrollador Full Stack (Portafolio)**
- Remoto · 2024 - Presente
- Descripción: Diseño y desarrollo de aplicaciones web end-to-end simulando entornos de producción. Implementación de arquitecturas escalables, integración de APIs y optimización de rendimiento (SEO/Core Web Vitals).
- Habilidades: Next.js, TypeScript, Tailwind CSS

### 8.2 Educación & Certificaciones (listado de la sección)

| Tipo | Título | Institución | Periodo |
|---|---|---|---|
| Grado | Tecnólogo en Análisis y Desarrollo de Software | SENA | 2022 - 2024 |
| Certificado | React - La Guía Completa | Udemy | 2023 |
| Certificado | JavaScript Moderno | Udemy | 2023 |
| Certificado | Software Testing & Quality Assurance | Udemy | 2024 |
| Certificado | Next.js | Udemy | 2025 |

### 8.3 Detalle de formación (páginas `/experience/[slug]`)

**a) Tecnólogo en Análisis y Desarrollo de Software — SENA (2024 - 2026, tipo: educación)**
- Resumen: Formación integral en desarrollo de software, bases de datos, metodologías ágiles y buenas prácticas de programación.
- Descripción completa:
  > El programa de Tecnología en Análisis y Desarrollo de Software del SENA me proporcionó una formación completa y práctica en el desarrollo de aplicaciones.
  > Durante los dos años de formación, adquirí conocimientos sólidos en:
  > - Programación orientada a objetos
  > - Desarrollo web frontend y backend
  > - Bases de datos relacionales y NoSQL
  > - Metodologías ágiles (Scrum, Kanban)
  > - Control de versiones con Git
  > - Testing y aseguramiento de calidad
  >
  > El programa incluyó múltiples proyectos prácticos que me permitieron aplicar los conocimientos teóricos en situaciones reales, preparándome para enfrentar los desafíos del mundo laboral.
- Habilidades: Java, JavaScript, Python, PostgreSQL, MySQL, Git, Scrum, HTML/CSS
- Proyectos relacionados:
  - **Music Streaming App** — Plataforma de distribución de audio con arquitectura MVC. Gestión de roles (Artista/Oyente), creación de playlists y reproducción multimedia.
  - **Restaurant Management System** — Sistema integral de escritorio (Java Swing + MySQL) para el control de pedidos, despacho de comandas a cocina y facturación.

**b) Next.js: El Framework de React para Producción — Udemy (2025, curso)**
- Resumen: Especialización en desarrollo Full Stack moderno: App Router, Server Actions, SSR y conexión a bases de datos.
- Descripción completa:
  > Curso avanzado enfocado en la arquitectura de última generación de Next.js. Aprendí a construir aplicaciones robustas eliminando la necesidad de una API externa separada, utilizando las capacidades Full Stack del framework.
  >
  > Temas dominados:
  > - App Router & File-system Routing
  > - React Server Components (RSC) vs Client Components
  > - Server Actions (Mutaciones de datos sin API endpoints)
  > - Optimización de fuentes e imágenes (Next/Image)
  > - SEO y Metadatos dinámicos
  > - Autenticación (NextAuth.js / Auth.js)
  > - Manejo de base de datos con Prisma ORM
  > - Despliegue y CI/CD en Vercel
- Habilidades: Next.js 14, App Router, Server Actions, Prisma ORM, TypeScript, Tailwind CSS
- Proyectos: **First Steps** (fundamentos de App Router, rutas anidadas, Layouts y Server/Client Components) · **Dashboard UI** (panel modular con Data Fetching a la API de Pokemon)

**c) React - La Guía Completa — Udemy (2025, curso)**
- Resumen: Curso avanzado de React incluyendo Hooks, Context API, Redux y testing.
- Descripción completa:
  > Este curso intensivo de React me permitió profundizar en el ecosistema de esta biblioteca y dominar las técnicas modernas de desarrollo frontend.
  > Contenido del curso:
  > - Fundamentos de React y JSX
  > - Componentes funcionales y de clase
  > - Hooks (useState, useEffect, useContext, useReducer, useMemo, useCallback)
  > - Context API para manejo de estado global
  > - Redux y Redux Toolkit
  > - React Router para navegación
  > - Testing con Jest y React Testing Library
  > - Optimización de rendimiento
  > - Patrones de diseño en React
  >
  > El curso incluyó múltiples proyectos prácticos que me ayudaron a consolidar cada concepto aprendido.
- Habilidades: React, Redux, Context API, React Router, Jest, TypeScript
- Proyectos: **Artista App** (ejercicio de introducción, catálogo de artistas) · **React Calendar** (grilla de fechas, props y renderizado de listas)

**d) JavaScript Moderno — Udemy (2025, curso)**
- Resumen: Fundamentos avanzados de JavaScript ES6+, programación asíncrona y patrones de diseño.
- Descripción completa:
  > Este curso me proporcionó una base sólida en JavaScript moderno, cubriendo todas las características de ES6+ y las mejores prácticas de desarrollo.
  > Temas cubiertos:
  > - Variables y scope (let, const, var)
  > - Arrow functions y this
  > - Destructuring y spread operator
  > - Template literals
  > - Clases y herencia
  > - Módulos ES6
  > - Promesas y async/await
  > - Fetch API y manejo de APIs
  > - Manejo de errores
  > - Patrones de diseño (Module, Factory, Observer, etc.)
  > - Programación funcional
  >
  > Cada tema incluyó ejercicios prácticos y proyectos que me permitieron aplicar los conceptos inmediatamente.
- Habilidades: JavaScript, ES6+, Async/Await, Fetch API, Patrones de Diseño
- Proyectos: **Proverbios Gen** (generador de citas aleatorias, DOM y arrays) · **Vanilla JS CRUD** (ciclo CRUD con LocalStorage)

**e) Software Testing & Quality Assurance — Udemy (2025, curso)**
- Resumen: Dominio de metodologías de prueba (Manual/Automated), ciclo de vida del defecto y automatización con Cypress y Jest.
- Descripción completa:
  > Curso integral enfocado en garantizar la fiabilidad del software mediante estrategias de prueba modernas. Aprendí a diferenciar y aplicar distintos niveles de testing dentro del ciclo de desarrollo.
  >
  > Temas cubiertos:
  > - Fundamentos de QA (Caja Negra vs Caja Blanca)
  > - Ciclo de vida del Bug y Reporte de incidencias
  > - Diseño y ejecución de Casos de Prueba (Test Cases)
  > - Pruebas Unitarias (Unit Testing) con Jest
  > - Pruebas de Integración
  > - Automatización End-to-End (E2E) con Cypress
  > - Introducción a TDD (Test Driven Development)
  > - Validación de selectores y aserciones en el DOM
- Habilidades: QA Manual, Cypress, Jest, E2E Testing, Test Cases, Bug Tracking
- Proyectos: **QA Case Study: Rappi** — Plataforma web para documentar y visualizar estrategias de QA. Presentación interactiva de matrices de prueba y flujos de error basados en la lógica de negocio de Rappi.

---

## 9. Contacto (`#contacto`)

**Título:** ¿Buscas fortalecer tu equipo de desarrollo?

**Texto:**
> Estoy listo para integrarme de inmediato como **Frontend** o **Full Stack Developer**. Si necesitas código limpio, testing y alguien con una rápida curva de aprendizaje, aquí estoy.

- Correo mostrado: `juancamilo.campobarrios@gmail.com`
- Botón: `Copiar` → cambia a `Copiado` durante 2 segundos
- Botones sociales: **LinkedIn** y **GitHub** (`https://github.com/junkamilo`)

---

## 10. Footer

- **Logo:** `D` + `DevJuan`
- **Texto de marca:**
  > Construyendo experiencias digitales que combinan diseño elegante con arquitectura de software robusta. Enfocado en escalabilidad, rendimiento y accesibilidad.
- **Columna "Navegación":** Inicio · Proyectos · Experiencia · Sobre mí
- **Columna "Conecta":** íconos de LinkedIn y GitHub
- **Barra inferior:** `© {año actual} DevJuan. Hecho con ♥ y Next.js`
- **Botón:** `Subir`

---

## 11. Textos de interfaz repetidos

- Modo claro / oscuro (botón de tema)
- `Copiar` / `Copiado` / `¡Email Copiado!`
- `Ver Proyectos`, `Explorar GitHub`, `Hablemos`, `CV`, `Descargar CV`, `Subir`, `Scroll`
- Notas de infraestructura en demos (Cold Start de Render / TiDB), ver sección 7

---

## 12. Datos de contacto y enlaces

| Canal | Valor |
|---|---|
| Correo | juancamilo.campobarrios@gmail.com |
| LinkedIn | https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/ |
| GitHub | https://github.com/junkamilo |
| CV (PDF) | `/public/cv-juan.pdf` |

---

## 13. Observaciones detectadas al documentar (inconsistencias de contenido)

Estos puntos no son errores de ejecución, pero conviene revisarlos antes de compartir la hoja de vida:

1. **Nombre:** el Hero dice "Juan Beltran", el título del sitio dice "Dev Juan Beltran" y el footer "DevJuan".
2. **Fechas de SENA:** en la sección de Educación aparece `2022 - 2024`, mientras que en el detalle de formación (`experience-data.ts`) aparece `2024 - 2026`.
3. **Fechas de cursos:** en la lista de Educación Next.js aparece `2025`, React y JavaScript `2023`, mientras que en el detalle aparecen `2025`.
4. **Typo:** "Técnologo" (debería ser "Tecnólogo") en la línea de tiempo de About.
5. **Espaciado:** en About falta un espacio en "bugs críticos,testing".
6. **Rol en Rappi:** en About aparece como "QA & Testing en Rappi"; en Experiencia aparece como "QA Analyst & Frontend Testing".
7. **Restaurant Management System:** no tiene enlace de demo porque corre en local (así está indicado en el código).
8. **Urban Shop:** el código tiene comentarios `PON AQUÍ TU LINK REAL` junto a los enlaces de GitHub y demo; confirmar que sean los definitivos.
9. **Métrica "MERN+":** el stack de los proyectos principales usa Next.js, Express y Vanilla JS; revisar si el término MERN describe bien el portafolio.
