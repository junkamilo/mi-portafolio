<div align="center">

# Juan Beltrán
### Portafolio · Hoja de vida interactiva

**Desarrollador Full Stack & QA Automation Engineer**

`Disponible para trabajar`

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

[GitHub](https://github.com/junkamilo) · [LinkedIn](https://www.linkedin.com/in/juan-camilo-beltrán-campo-4aa1b3202/) · [Email](mailto:juancamilo.campobarrios@gmail.com) · [Descargar CV (PDF)](./public/Hoja_Vida_Juan_Beltran_Campo.pdf)

</div>

---

## Qué es este proyecto

Este repositorio es mi **hoja de vida en formato web**: un portafolio oscuro, animado y orientado a producción. No es solo una landing genérica; resume mi perfil profesional, experiencia, formación, habilidades y los proyectos que tengo **en producción**.

La misma información que está en mi CV en PDF (`Hoja_Vida_Juan_Beltran_Campo.pdf`) vive aquí de forma interactiva: puedes explorar el stack, abrir el detalle de cada sistema (Web ↔ Cloud / Admin) y descargar la hoja de vida desde cualquier botón **Descargar CV**.

| Formato | Archivo / sitio | Para qué sirve |
|---|---|---|
| **CV PDF** | [`public/Hoja_Vida_Juan_Beltran_Campo.pdf`](./public/Hoja_Vida_Juan_Beltran_Campo.pdf) | Entrevistas, postulaciones, ATS |
| **Portafolio web** | Este proyecto (Next.js) | Demo visual, casos reales, stack vivo |

---

## Perfil

- **Nombre:** Juan Beltrán (Juan Camilo Beltrán Campo)
- **Rol:** Desarrollador Full Stack & QA Automation Engineer
- **Enfoque:** aplicaciones web completas + calidad (unitarias, E2E, carga)
- **Experiencia reciente:** Rappi · Devitech (GENEXIS)
- **Proyectos propios en producción:** Casa Verde · DYL Store · Shamell Entertainment

Desarrollo con **React, Next.js, TypeScript, Node.js, NestJS y Java / Spring Boot**, y valido el producto con **Cypress, Playwright, Jest, Vitest y k6**. Despliegues reales con **Docker en VPS** (y Vercel / Render según el caso).

---

## Diseño de la web

La UI sigue un lenguaje **dark glass / neon**:

- Fondo ink oscuro, grillas sutiles y glows brand / neon
- Cards con glassmorphism, tilt 3D y motion (Framer Motion + Lenis)
- Iconos de tecnologías en estilo 3D (simple-icons)
- Detalle de proyectos con selector **Web ↔ Cloud** (o Web ↔ Admin)
- Banners reales de cada producto (tienda, cloud, admin)
- Easter eggs visuales (bugs) sin distraer del contenido profesional

La hoja de vida PDF y la web cuentan la **misma historia**: perfil Full Stack + QA, proyectos en producción y stack real.

---

## Secciones del portafolio

1. **Hero** — nombre, rol, badge *Disponible para trabajar*, CTAs (proyectos, CV, redes)
2. **Proyectos destacados** — Casa Verde, DYL Store, Shamell (modal con stack, features, links y banners)
3. **Experiencia y formación** — Devitech, Rappi, proyectos independientes + educación / certificados
4. **Habilidades técnicas** — Frontend, Backend, Bases de datos, QA, DevOps, IA aplicada (con logos)
5. **Sobre mí** — timeline profesional
6. **Contacto + Footer** — email, LinkedIn, GitHub, descarga de CV

---

## Proyectos en producción (resumen)

| Proyecto | Qué es | Stack principal | Links |
|---|---|---|---|
| **Casa Verde** | Tienda web + cloud / POS | Next.js · NestJS · Spring Boot · PostgreSQL · Docker | [Web](https://casaverdeoficial.com/) · [Cloud](https://pos.casaverdeoficial.com/login) |
| **DYL Store** | Misma base, nuevo negocio | Next.js · NestJS · Spring Boot · PostgreSQL · Docker | [Web](https://www.dylstore.com/) · [Cloud](https://cloud.dylstore.com/) |
| **Shamell Entertainment** | Eventos, boletas, admin + QA | Next.js · NestJS · Prisma · Stripe · Playwright | [Sitio](https://www.shamellentertainment.com/) |

Cada card abre un modal con descripción, características, banner, stack por capas y enlaces a página / repositorio cuando aplica.

---

## Hoja de vida (PDF)

El CV oficial está en:

```text
public/Hoja_Vida_Juan_Beltran_Campo.pdf
```

Se descarga desde:

- Header (`Descargar CV`)
- Hero
- Sección de contacto
- CTA de proyectos (“¿Quieres ver cómo escribo código?”)

Para actualizar la hoja de vida: reemplaza ese PDF en `/public` con el mismo nombre, o cambia `CV_FILENAME` en `src/config/contact-data.ts`.

---

## Stack técnico del portafolio

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Estilos | Tailwind CSS 4 · tokens ink / brand / neon |
| Motion | Framer Motion · Lenis (scroll suave) |
| UI | Lucide · Radix · glass / border-glow |
| Iconos tech | simple-icons + componente 3D propio |
| Temas | next-themes (dark por defecto) |

---

## Estructura útil

```text
src/
  components/     # Hero, Projects, Skills, Experience, About, Contact, Footer, motion
  config/         # Datos editables: hero, proyectos, skills, experiencia, contacto
  app/            # App Router
public/
  Hoja_Vida_Juan_Beltran_Campo.pdf
  banner_*.png    # Capturas de Casa Verde, DYL, Shamell
```

Los textos y stacks se editan sobre todo en `src/config/` (sin tocar el layout completo).

---

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run start   # servir build
npm run lint    # ESLint
```

---

## Contacto

- **Email:** [juancamilo.campobarrios@gmail.com](mailto:juancamilo.campobarrios@gmail.com)
- **GitHub:** [junkamilo](https://github.com/junkamilo)
- **LinkedIn:** [Juan Camilo Beltrán Campo](https://www.linkedin.com/in/juan-camilo-beltrán-campo-4aa1b3202/)
- **CV PDF:** [Hoja_Vida_Juan_Beltran_Campo.pdf](./public/Hoja_Vida_Juan_Beltran_Campo.pdf)

---

<div align="center">

**Full Stack · QA · Producción real**

Hecho con Next.js · TypeScript · Framer Motion

© 2026 Juan Beltrán

</div>
