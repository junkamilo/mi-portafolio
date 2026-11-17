# Portafolio web: textos optimizados y alineados con el CV

> **Base:** CV `Juan_Beltran_Campo_CV_FullStack_QA.pdf` (versión del 17 de noviembre de 2026).
> **Uso:** cada sección indica el archivo de `src/config/` donde va el texto. Los nombres de campo siguen el documento de tu portafolio. Si en tu código tienen otro nombre, conserva el tuyo y cambia solo el texto.
> **Regla de tono:** lenguaje natural y técnico, sin exageraciones. Todo lo que dice la web debe poder defenderse en una entrevista y coincidir con el PDF.

---

## 0. Decisiones clave (léelas antes de editar)

1. **Un solo nombre y un solo rol en todo el sitio.** El nombre es *Juan Beltrán* (con tilde) y el nombre completo, *Juan Camilo Beltrán Campo*, va en metadata y contacto. El rol es *Desarrollador Full Stack & QA Automation Engineer*, igual que en el CV.
2. **Falta Devitech.** Hoy la web solo muestra Rappi. Es tu experiencia más reciente y debe ir primero.
3. **Los proyectos principales cambian.** Los tres destacados pasan a ser **Casa Verde, DYL Store y Shamell Entertainment**, los mismos del CV y que están en producción. Los proyectos de formación bajan a una sección secundaria.
4. **El rol de Rappi debe coincidir con el CV.** La web dice "QA Analyst & Frontend Testing" y el CV dice "Desarrollador Full Stack y QA (Prácticas profesionales)". Usa el mismo título en ambos, el que figure en tu certificado laboral.
5. **Las fechas deben coincidir con el CV.** SENA va de 2023 a 2026 (la web hoy muestra 2022–2024 y 2024–2026).
6. **Quita las frases genéricas** ("AI Driven", "MERN+", "Bug-Free", "Dominio del stack"). Un reclutador técnico las lee como relleno. Cámbialas por datos concretos.

### Datos que debes completar (están marcados con `⟨ ⟩` en el documento)
- `⟨URL DYL Store⟩`: enlace en vivo de DYL Store.
- `⟨Año⟩` de los cursos de Udemy: la web tiene años distintos en la lista y en el detalle (2023 frente a 2025). Usa los del certificado.
- `⟨URL credencial⟩` de IBM y Coursera: el enlace de verificación del certificado.

---

## 1. Metadata global — `src/app/layout.tsx`

```ts
title: "Juan Beltrán | Desarrollador Full Stack & QA Automation Engineer"
description: "Desarrollador Full Stack y QA Automation Engineer en Colombia. React, Next.js, TypeScript, Node.js, NestJS, Java y Spring Boot. Pruebas automatizadas con Cypress, Playwright y Jest. Disponible para remoto, Barranquilla y Bucaramanga."
keywords: ["Desarrollador Full Stack", "QA Automation Engineer", "React", "Next.js", "TypeScript", "Node.js", "NestJS", "Java", "Spring Boot", "PostgreSQL", "Cypress", "Playwright", "Jest", "Docker", "Colombia"]
authors: [{ name: "Juan Camilo Beltrán Campo" }]
openGraph: {
  title: "Juan Beltrán | Desarrollador Full Stack & QA Automation Engineer",
  description: "Construyo aplicaciones web completas y las pruebo antes de entregarlas. Mira mis proyectos en producción.",
  images: ["/og-image.png"],   // 1200x630: foto + nombre + rol
  locale: "es_CO",
  type: "website",
}
```

En el `<html>` usa `lang="es"`.

---

## 2. Header — `src/config/navigation`

**Logo:** `JB` + `Juan Beltrán` (o deja `DevJuan`, pero que sea igual en el header y en el footer).

**Navegación (nuevo orden, el mismo de la página):**
1. Inicio
2. Proyectos
3. Experiencia
4. Habilidades
5. Sobre mí
6. Contacto

**Botones:**
- `Descargar CV`: archivo `/Juan_Beltran_Campo_CV_FullStack_QA.pdf`, que se descarga con ese mismo nombre.
- `Hablemos`: lleva a `#contacto`.
- Modo claro u oscuro (sin cambios).

**Menú móvil:** el mismo orden, con `Descargar CV` al final.

---

## 3. Hero — `src/config/hero-data.ts`

**Badge (copiable):**
```
Disponible para trabajar · Remoto, Barranquilla o Bucaramanga
```
Al copiar, muestra `¡Correo copiado!`.

**Título:**
```
Hola, soy Juan Beltrán
Desarrollador Full Stack & QA Automation Engineer
```

**Descripción:**
> Desarrollo aplicaciones web completas con React, Next.js, TypeScript, Node.js, NestJS y Java con Spring Boot, y me aseguro de que funcionen con pruebas automatizadas en Cypress, Playwright y Jest. En Rappi y Devitech trabajé entre desarrollo y QA. Hoy tengo tres proyectos en producción, desplegados con Docker en servidores VPS.

**Botones:**
- Principal: `Ver proyectos` (lleva a `#proyectos`)
- Secundario: `Descargar CV`
- Íconos: Correo, LinkedIn y **GitHub** (hoy falta en el hero)

**URL limpia de LinkedIn** (quítale el parámetro `?trk=...`):
```
https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/
```

**Alt de la foto:** `Foto de Juan Beltrán, desarrollador Full Stack y QA`

---

## 4. Sobre mí — `src/config/about-data.ts`

**Título:** Sobre mí
**Subtítulo:** Desarrollo software y lo pruebo antes de entregarlo

### Línea de tiempo (de la más reciente a la más antigua)

1. **Proyectos en producción · 2025 – actualidad**
   > Desarrollo y mantengo Casa Verde, DYL Store y Shamell Entertainment: tiendas en línea, sistemas de gestión en la nube y una plataforma de venta de boletas. Los despliego en servidores VPS con Docker y les monto ambientes de QA con pruebas automatizadas.

2. **Desarrollador Full Stack y QA Automation en Devitech · 2026**
   > Trabajé en GENEXIS, una plataforma web y un sistema POS para estaciones de combustible. Desarrollé interfaces en React y Next.js, apoyé el backend en NestJS y automaticé pruebas de regresión con Cypress y Selenium.

3. **Desarrollador Full Stack y QA en Rappi · 2025 – 2026**
   > Mis prácticas profesionales. Construí componentes en React y Next.js, escribí pruebas unitarias y E2E, revisé código y trabajé con el equipo de desarrollo para corregir defectos.

4. **Formación · 2023 – actualidad**
   > Tecnólogo en Análisis y Desarrollo de Software (SENA), certificado IBM Full Stack Software Developer y programa de QA & Test Automation (Coursera). Hoy estudio Ingeniería de Sistemas en la UNAD.

### Tarjetas de métricas

| Etiqueta | Valor |
|---|---|
| Experiencia | Rappi · Devitech |
| En producción | 3 proyectos |
| Perfil | Full Stack + QA |
| Despliegue | Docker · VPS |

### Terminal decorativa

- Título de ventana: `bash — juan@portafolio`
- Comando: `echo $PROPUESTA_VALOR`
- Salida:
  > "Frontend, backend y QA en un solo perfil. Escribo el código, lo pruebo y lo dejo listo para producción."

---

## 5. Habilidades — `src/config/skills-data.ts`

**Título:** Habilidades técnicas
**Subtítulo:** Las herramientas con las que trabajo a diario, en proyectos reales y en producción.

| Categoría | Descripción | Habilidades |
|---|---|---|
| **Frontend** | Interfaces rápidas, responsivas y fáciles de mantener. | React, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, TanStack Query, Zustand, Framer Motion |
| **Backend** | APIs y lógica de negocio para aplicaciones web. | Node.js, NestJS, Express, Java, Spring Boot, APIs REST, autenticación JWT |
| **Bases de datos** | Modelado de datos, consultas y migraciones. | PostgreSQL, MySQL, Prisma ORM, Flyway, Redis |
| **QA y testing** | Pruebas manuales y automatizadas, desde el componente hasta el flujo completo. | Cypress, Playwright, Selenium, Jest, Vitest, Testing Library, Postman, k6, casos de prueba, gestión de defectos |
| **DevOps y herramientas** | Del código al servidor, con control de versiones y despliegues. | Git, GitHub, Docker, VPS, CI/CD, Vercel, Jira, ClickUp |
| **IA aplicada** | Uso de IA para trabajar más rápido sin perder control del código. | Claude, Gemini, desarrollo asistido, generación de casos de prueba |

> **Nota:** quité **MongoDB** porque no aparece en tu CV. Si lo has usado en un proyecto, agrégalo en los dos lados (web y CV). Si no, déjalo fuera.

---

## 6. Proyectos — `src/config/projects-data.ts`

**Título:** Proyectos destacados
**Subtítulo:** Aplicaciones reales en producción: frontend, backend, base de datos, despliegue y pruebas.

### 6.1 Casa Verde

- **Slug:** `casa-verde`
- **Categoría:** Full Stack · E-commerce + Cloud
- **Rol:** Desarrollador Full Stack · **Estado:** En producción
- **Descripción corta:**
  > Tienda en línea y sistema de gestión en la nube para una marca de ropa. Web en Next.js, cloud en Spring Boot y despliegue en VPS con Docker.
- **Descripción completa:**
  > Casa Verde tiene dos partes que trabajan juntas. La **web** es la tienda en línea, donde los clientes navegan el catálogo, arman su carrito y pagan con Bold o Addi. La **cloud** es el sistema de gestión del negocio, donde se registran ventas, gastos, costos e inventario. Reemplazó las hojas de Excel con las que el negocio trabajaba antes.
  >
  > Conecté las dos partes para que cada pedido de la tienda quede registrado automáticamente en el sistema de gestión. Ambos sistemas corren en un servidor VPS con Docker y tienen un ambiente de QA con pruebas unitarias y automatizadas antes de pasar a producción.
- **Tecnologías:** Next.js, React, TypeScript, Tailwind CSS, Prisma, Java, Spring Boot, PostgreSQL, Docker, Jest
- **Stack por capa** (para el sidebar del detalle):
  - Web: Next.js, React, Tailwind CSS (frontend) · Next.js API, Prisma (backend)
  - Cloud: React, TypeScript, Tailwind CSS (frontend) · Java, Spring Boot (backend)
  - Base de datos: PostgreSQL
  - QA: Jest, pruebas automatizadas
- **Características:**
  - Catálogo, carrito de compras y pagos en línea con Bold y Addi
  - Inicio de sesión con Google o con correo y contraseña
  - Gestión de ventas, gastos, costos e inventario por referencia, talla y color
  - Sincronización automática de pedidos entre la tienda y el sistema de gestión
  - Ambiente de QA con pruebas unitarias y automatizadas
- **Desafíos:**
  - **Pasar de Excel a un sistema:** entender cómo funcionaba el negocio en sus hojas de cálculo y convertir esos procesos en módulos claros.
  - **Que ningún pedido se registre dos veces:** la sincronización entre la tienda y el sistema de gestión detecta los pedidos repetidos y los ignora.
  - **Dos sistemas en un solo servidor:** organizar la web, la cloud y la base de datos en contenedores Docker dentro del mismo VPS, con un ambiente de QA separado.
- **Infraestructura:** Web Next.js (VPS + Docker) · Cloud Spring Boot (VPS + Docker) · PostgreSQL · Ambiente de QA
- **Enlaces:** Sitio `https://casaverdeoficial.com/` · Repositorio: *Privado (proyecto de cliente). Disponible para revisión en entrevista.*

### 6.2 DYL Store

- **Slug:** `dyl-store`
- **Categoría:** Full Stack · E-commerce + Cloud
- **Rol:** Desarrollador Full Stack · **Estado:** En producción
- **Descripción corta:**
  > Tienda en línea y sistema de gestión en la nube, construidos sobre la base de Casa Verde y adaptados a un nuevo negocio. Despliegue en VPS con Docker.
- **Descripción completa:**
  > DYL Store nace de Casa Verde. En lugar de empezar de cero, reutilicé la base que ya funcionaba en producción (tienda web y sistema de gestión) y la adapté a un nuevo negocio: ajusté los módulos existentes y creé los que este cliente necesitaba.
  >
  > Usa el mismo stack que Casa Verde: Next.js en la web, Spring Boot en la cloud y PostgreSQL como base de datos. Corre en un servidor VPS con Docker y tiene su propio ambiente de QA con pruebas unitarias y automatizadas.
- **Tecnologías:** Next.js, React, TypeScript, Tailwind CSS, Prisma, Java, Spring Boot, PostgreSQL, Docker, Jest
- **Stack por capa:** igual que Casa Verde.
- **Características:**
  - Tienda en línea con catálogo, carrito y pagos
  - Sistema de gestión en la nube adaptado al nuevo negocio
  - Módulos ajustados y módulos nuevos sobre una base ya probada
  - Ambiente de QA con pruebas unitarias y automatizadas
- **Desafíos:**
  - **Reutilizar sin romper:** separar lo común de lo que es propio de cada negocio para que un cambio en DYL Store no afecte a Casa Verde.
  - **Despliegue independiente:** configurar su propio entorno en VPS con Docker, con base de datos y ambiente de QA separados.
- **Infraestructura:** Web Next.js (VPS + Docker) · Cloud Spring Boot (VPS + Docker) · PostgreSQL · Ambiente de QA
- **Enlaces:** Sitio `⟨URL DYL Store⟩` · Repositorio: *Privado (proyecto de cliente). Disponible para revisión en entrevista.*

### 6.3 Shamell Entertainment

- **Slug:** `shamell-entertainment`
- **Categoría:** Full Stack · QA · Plataforma de eventos
- **Rol:** Desarrollador Full Stack & QA · **Estado:** En producción
- **Descripción corta:**
  > Plataforma para publicar eventos, vender boletas, reservar puestos y pagar en línea. Frontend en Next.js, backend en NestJS y pruebas en todas las capas.
- **Descripción completa:**
  > Shamell Entertainment es una plataforma de eventos y venta de boletas. Los usuarios ven los eventos, eligen su boleta o su puesto y pagan en línea. Los administradores gestionan los eventos y las ventas desde un panel.
  >
  > Además de desarrollar las funciones, me encargué de la calidad. Escribí pruebas unitarias en el frontend y en el backend, y pruebas de extremo a extremo para los flujos más delicados: compra, reservas y pagos. También reorganicé el backend en módulos más pequeños para que fuera más fácil de mantener y de probar.
- **Tecnologías:** Next.js, React, TypeScript, NestJS, Node.js, PostgreSQL, Jest, Vitest, Testing Library, Playwright
- **Stack por capa:**
  - Frontend: Next.js, React, TypeScript
  - Backend: Node.js, NestJS
  - Base de datos: PostgreSQL
  - QA: Jest, Vitest, Testing Library, Playwright
- **Características:**
  - Publicación de eventos y venta de boletas
  - Reserva de puestos y pagos en línea
  - Panel de administración
  - Pruebas unitarias y E2E en los flujos de compra, reservas y pagos
- **Desafíos:**
  - **Probar los pagos con seguridad:** cubrir con pruebas los flujos de compra y de retorno del pago para detectar errores antes de producción.
  - **Un backend difícil de mantener:** dividir un servicio muy grande en módulos con responsabilidades claras.
  - **Ampliar la cobertura de pruebas:** subirla en el frontend y en el backend sin frenar el desarrollo.
- **Infraestructura:** Frontend Next.js · Backend NestJS · PostgreSQL · Pruebas en CI/CD
- **Enlaces:** Sitio `https://www.shamellentertainment.com/` · Repositorio: *Privado. Disponible para revisión en entrevista.*

---

### 6.4 Otros proyectos (sección secundaria)

**Título:** Proyectos de formación
**Subtítulo:** Proyectos con los que aprendí y practiqué. Muestran mi evolución técnica.

Usa tarjetas más pequeñas, sin el mismo peso visual que los destacados.

**a) Variedades Lili (une el admin y el cliente en una sola tarjeta)**
- **Slug:** `variedades-lili`
- **Descripción corta:**
  > E-commerce con dos aplicaciones: una tienda para clientes en React y TypeScript, y un panel de administración para productos, inventario y pedidos. Backend en Node.js y Express con arquitectura por capas.
- **Tecnologías:** React, TypeScript, Tailwind CSS, TanStack Query, Zustand, Node.js, Express, MySQL
- **Enlaces:** las dos demos y los dos repositorios actuales.

**b) Urban Shop**
- **Descripción corta:**
  > Tienda de ropa en Next.js con pagos de prueba en PayPal (sandbox) y panel de administración de productos e inventario.
- **Tecnologías:** Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS, PayPal API
- ⚠️ **No lo publiques hasta reemplazar los enlaces marcados con `PON AQUÍ TU LINK REAL`.** Si no tienes demo ni repositorio, oculta la tarjeta.

**c) Music Streaming App**
- **Descripción corta:**
  > Plataforma de música hecha como proyecto de grado: los usuarios escuchan y crean playlists, y los artistas suben sus álbumes. JavaScript sin frameworks con arquitectura MVC, Node.js, Express y MySQL.
- **Tecnologías:** JavaScript (MVC), Node.js, Express, MySQL, Multer

**d) Restaurant Management System**
- **Recomendación:** retírala del portafolio o déjala solo en GitHub. Es una app de escritorio (Java Swing) y la migración a Laravel que menciona no está en tu stack actual, así que un reclutador puede preguntarte por algo que no vas a poder mostrar.

**Nota de "cold start" (versión corta para las demos en Render o TiDB):**
> La demo usa servidores gratuitos. Si tarda en cargar, espera entre 30 y 60 segundos mientras el servidor se activa.

### CTA al final de proyectos
- **Pregunta:** ¿Quieres ver cómo escribo código?
- **Texto:** En GitHub están mis repositorios públicos. Los proyectos de clientes son privados, pero puedo mostrarlos en una entrevista.
- **Botones:** `Ver GitHub` → `https://github.com/junkamilo` · `Descargar CV`

---

## 7. Experiencia — `src/config/experience-data.ts`

**Título:** Experiencia y formación
**Descripción:** Mi experiencia en empresas, los proyectos que tengo en producción y la formación que los respalda.

### 7.1 Experiencia laboral

**Devitech — Desarrollador Full Stack y QA Automation**
- feb. 2026 – nov. 2026
- **Descripción:**
  > Trabajé en GENEXIS, una plataforma web en la nube y un sistema POS para estaciones de combustible. Desarrollé interfaces con React, Next.js, TypeScript y Tailwind CSS, apoyé el desarrollo y la depuración de servicios en NestJS, y automaticé pruebas E2E y de regresión con Cypress y Selenium dentro del flujo de CI/CD. También diseñé casos de prueba, validé datos con SQL y di seguimiento a los defectos hasta su cierre.
- **Habilidades:** React, Next.js, NestJS, Cypress, Selenium, Postman, SQL, CI/CD, ClickUp, Scrum

**Rappi — Desarrollador Full Stack y QA (Prácticas profesionales)**
- Remoto · ago. 2025 – feb. 2026
- **Descripción:**
  > Construí componentes de interfaz con React y Next.js conectados a APIs REST. Escribí pruebas unitarias y de integración con Jest y Vitest, y pruebas E2E con Cypress. Revisé código en React y NestJS, probé APIs con Postman y trabajé con el equipo de desarrollo para encontrar y corregir defectos.
- **Habilidades:** React, Next.js, Jest, Vitest, Cypress, Postman, Jira, Git, Scrum

**Proyectos independientes — Desarrollador Full Stack**
- 2025 – actualidad
- **Descripción:**
  > Desarrollo y mantengo Casa Verde, DYL Store y Shamell Entertainment, tres aplicaciones en producción. Me encargo de todo el ciclo: frontend, backend, base de datos, despliegue en VPS con Docker y pruebas automatizadas.
- **Habilidades:** Next.js, Spring Boot, NestJS, PostgreSQL, Docker, Playwright, Jest

> Reemplaza la tarjeta actual "Proyectos Personales — Desarrollador Full Stack (Portafolio) · 2024 – Presente". Esa tarjeta menciona "SEO/Core Web Vitals" y "entornos de producción simulados", y ahora tienes producción real.

### 7.2 Educación y certificaciones (lista)

| Tipo | Título | Institución | Periodo |
|---|---|---|---|
| Pregrado | Ingeniería de Sistemas (en curso) | UNAD | 2026 – actualidad |
| Tecnología | Tecnólogo en Análisis y Desarrollo de Software | SENA | 2023 – 2026 |
| Certificado | IBM Full Stack Software Developer (Professional Certificate) | IBM | oct. 2026 |
| Certificado | Software QA & Test Automation Engineering | Coursera | ⟨Año⟩ |
| Curso | Next.js: El Framework de React para Producción | Udemy | ⟨Año⟩ |
| Curso | React - La Guía Completa | Udemy | ⟨Año⟩ |
| Curso | Software Testing & Quality Assurance | Udemy | ⟨Año⟩ |
| Curso | JavaScript Moderno | Udemy | ⟨Año⟩ |

Las certificaciones de IBM y Coursera van antes que los cursos de Udemy porque pesan más. El año de cada curso debe ser el mismo en la lista y en su página de detalle.

### 7.3 Páginas de detalle (`/experience/[slug]`)

**Nueva — Ingeniería de Sistemas (UNAD)**
- **Resumen:** Pregrado en curso en la Universidad Nacional Abierta y a Distancia, con créditos homologados desde la tecnología del SENA.
- **Habilidades:** Ingeniería de software, bases de datos, redes, matemáticas aplicadas

**Nueva — IBM Full Stack Software Developer**
- **Resumen:** Certificado profesional de IBM en desarrollo Full Stack: frontend, backend, bases de datos, contenedores y despliegue en la nube.
- **Proyecto relacionado:** Biblioteca técnica (`https://dev-biblioteca-online.vercel.app/`), con 11 guías en PDF que documentan lo aprendido en el programa.
- **Enlace:** `⟨URL credencial IBM⟩`

**Nueva — Software QA & Test Automation Engineering (Coursera)**
- **Resumen:** Programa especializado en aseguramiento de calidad: tipos de pruebas, diseño de casos, automatización y su integración en el ciclo de desarrollo.
- **Enlace:** `⟨URL credencial Coursera⟩`

**Corrección — Tecnólogo en Análisis y Desarrollo de Software (SENA)**
- **Periodo:** 2023 – 2026 (antes decía 2024 – 2026)
- En la descripción, cambia "Durante los dos años de formación" por **"Durante la formación"**, para que no choque con las fechas.

**Corrección — cursos de Udemy**
- Cambia "Temas dominados" por **"Temas del curso"**. Haber visto un tema en un curso no es lo mismo que dominarlo, y un entrevistador lo puede probar.
- **QA Case Study: Rappi:** revisa que no muestre información interna de Rappi (flujos, datos o nombres de sistemas). Si tienes dudas, cámbiale el nombre a **"QA Case Study: app de domicilios"**.

---

## 8. Contacto — `src/components/contact/ContactSection.tsx`

**Título:** ¿Buscas un desarrollador que también cuide la calidad?

**Texto:**
> Puedo sumarme a tu equipo como **Desarrollador Full Stack**, **Frontend**, **Backend** o **QA Automation**. Trabajo de forma remota o presencial en Barranquilla y Bucaramanga. Escríbeme y te respondo pronto.

- **Correo:** `juancamilo.campobarrios@gmail.com`
- **Botón:** `Copiar` → `Copiado`
- **Botones sociales:** LinkedIn · GitHub · **Descargar CV** (nuevo)

---

## 9. Footer

- **Logo:** el mismo del header.
- **Texto de marca:**
  > Desarrollador Full Stack y QA Automation Engineer. Construyo aplicaciones web y me aseguro de que funcionen bien en producción.
- **Navegación:** Inicio · Proyectos · Experiencia · Habilidades · Sobre mí · Contacto
- **Conecta:** LinkedIn · GitHub
- **Barra inferior:** `© {año} Juan Beltrán. Hecho con Next.js.`
- **Botón:** `Subir`

---

## 10. Mejoras de estructura y conversión

### Reorganizar
| Antes | Después | Por qué |
|---|---|---|
| Hero → Sobre mí → Skills → Proyectos → Experiencia | **Hero → Proyectos → Experiencia → Habilidades → Sobre mí → Contacto** | El reclutador quiere ver primero qué has construido y dónde has trabajado. |
| 5 proyectos con el mismo peso | **3 destacados + "Proyectos de formación"** | Los proyectos en producción no se mezclan con los ejercicios de curso. |
| Variedades Lili en 2 tarjetas | **1 tarjeta** con las 2 demos | Menos repetición. |

### Agregar
- **Devitech** en experiencia y en la línea de tiempo.
- **Botón "Descargar CV" en el hero y en contacto**, no solo en el header.
- **GitHub en el hero.**
- **Badge "En producción"** en Casa Verde, DYL Store y Shamell.
- **Dos botones por tarjeta destacada:** `Ver sitio` y `Ver detalle`. Si el repositorio es privado, en lugar del botón de GitHub muestra el texto "Repositorio privado".
- **Capturas en la galería de cada proyecto:** tienda, panel de gestión, versión móvil.
- **Evidencia de QA, tu diferencial:** una captura del reporte de cobertura (Jest o Vitest) y otra del reporte de Playwright o Cypress en Shamell. Pocos portafolios lo muestran.
- **Enlace de verificación** en las certificaciones de IBM y Coursera.
- **Imagen Open Graph** (`/og-image.png`), para que al compartir el enlace en LinkedIn o WhatsApp se vea tu foto y tu rol.

### Quitar o cambiar
- Las métricas "3+ Apps", "AI Driven" y "MERN+": cámbialas por las de la sección 4.
- La frase "Mentalidad 'Bug-Free'": cámbiala por la descripción de QA de la sección 5.
- **Restaurant Management System**: retíralo o déjalo solo en GitHub.
- **Urban Shop**: ocúltalo hasta tener los enlaces reales.
- **MongoDB**: quítalo, salvo que también lo agregues al CV.
- El parámetro `?trk=public-profile-join-page` del enlace de LinkedIn.
- El archivo `cv-juan.pdf` viejo: reemplázalo por `Juan_Beltran_Campo_CV_FullStack_QA.pdf`.

### Opcional (si te sobra tiempo)
- Mueve las demos gratuitas de Render al VPS, así desaparece la espera del cold start.
- Agrega un `sitemap.xml` y un `robots.txt`, para que Google indexe el sitio.
- Antes de compartir el portafolio, pásalo por Lighthouse (rendimiento, accesibilidad y SEO). Para un perfil de QA, un puntaje alto también habla de ti.

---

## 11. Checklist de validación

### Coherencia con el CV
- [ ] Nombre: "Juan Beltrán" (con tilde) en el hero, el header, el footer y la metadata.
- [ ] Rol: "Desarrollador Full Stack & QA Automation Engineer" en todo el sitio.
- [ ] Devitech agregado con fechas feb. 2026 – nov. 2026.
- [ ] Título de Rappi igual en la web, el CV y el certificado laboral.
- [ ] SENA con fechas 2023 – 2026 en la lista y en el detalle.
- [ ] Años de los cursos de Udemy iguales en la lista y en el detalle.
- [ ] Certificaciones de IBM y Coursera agregadas.
- [ ] Las habilidades de la web y del CV coinciden (sin MongoDB, o con MongoDB en los dos).
- [ ] Casa Verde, DYL Store y Shamell como proyectos destacados, igual que en el CV.

### Contenido
- [ ] Hero con la nueva descripción y los botones `Ver proyectos`, `Descargar CV`, GitHub y LinkedIn.
- [ ] Sobre mí con la nueva línea de tiempo, las métricas y la terminal.
- [ ] Habilidades con las 6 categorías nuevas.
- [ ] Proyectos destacados con descripción, stack por capa, características, desafíos y enlaces.
- [ ] URL de DYL Store agregada.
- [ ] Proyectos de formación en una sección secundaria; Variedades Lili en una sola tarjeta.
- [ ] Urban Shop sin el texto `PON AQUÍ TU LINK REAL`, u oculto.
- [ ] Restaurant Management System retirado del sitio.
- [ ] Contacto con el nuevo texto y el botón de CV.
- [ ] Footer con el nuevo texto y el nombre correcto.
- [ ] Erratas corregidas: "Técnologo" y "bugs críticos,testing" ya no aparecen.

### Técnico y conversión
- [ ] `title`, `description`, `keywords` y `openGraph` actualizados en `layout.tsx`.
- [ ] `lang="es"` en `<html>`.
- [ ] `og-image.png` creada (1200x630).
- [ ] CV nuevo en `/public` con el nombre `Juan_Beltran_Campo_CV_FullStack_QA.pdf`.
- [ ] Enlace de LinkedIn sin `?trk=...`.
- [ ] Capturas en la galería de los 3 proyectos destacados.
- [ ] Capturas de los reportes de pruebas en Shamell.
- [ ] Todos los enlaces probados (demos, GitHub, LinkedIn, credenciales, descarga del CV).
- [ ] Revisión en celular y en modo oscuro.
- [ ] Lighthouse ejecutado (rendimiento, accesibilidad y SEO).
