# Stack tecnológico — Tienda web Casa Verde (`casa-ver-ecommerce`)

> **Qué es esto:** inventario del stack real de la tienda web de Casa Verde (frontend, backend, base de datos, pagos, infraestructura y QA), leído directamente del código.
>
> **Repositorio analizado:** `D:\casa-verde-integral\casa-ver-ecommerce`
> **Rama:** `casa-verde-dev` (la más reciente: último commit el 2026-11-12). El repositorio estaba limpio, sin cambios sin commit.
> **Fuera de alcance:** el POS (`pos-casa-verde`, repositorio aparte) solo aparece como integración. Su stack no está documentado aquí.
>
> **Nota de ramas:** no existe una rama llamada `desarrollo-web`. Las ramas candidatas eran `casa-verde-dev` (nov 2026, la usada aquí), `main` (sep 2026) y `case-verde-desarrollo` (remota, jun 2026).

---

## 1. Resumen rápido

| Capa | Tecnología principal | Versión (según `package.json`) |
|---|---|---|
| Framework (frontend + backend) | Next.js (App Router) | 16.4.3 |
| UI | React | 19.2.3 |
| Lenguaje | TypeScript | ^5 |
| Estilos | Tailwind CSS | ^4 |
| Backend | Route Handlers + Server Actions de Next.js | (incluido en Next) |
| ORM | Prisma | ^5.22 |
| Base de datos | PostgreSQL | local: 18 · QA: 16 · producción: en transición (ver §4) |
| Autenticación | Auth.js / NextAuth (beta) | ^5.0.0-beta.30 |
| Pagos | Bold (con PSE) y Addi | integraciones activas |
| Correo | Nodemailer por SMTP | ^8.0.11 |
| Monitoreo | Sentry | @sentry/nextjs ^10.49.0 |
| Pruebas | Jest + Testing Library | Jest ^29.7.0 |
| Pruebas de carga | k6 | scripts en `k6/` |
| Contenedores | Docker (Node 22 Alpine) | `Dockerfile` + 3 `docker-compose` |
| Servidor de producción | VPS con Docker (migración desde Vercel en curso) | ver §10 |

---

## 2. Frontend

Ruta principal: `src/app/` (App Router), `src/components/`, `src/context/`.

- **Framework:** Next.js 16.4.3 con App Router. Desarrollo con Turbopack (`next dev`), con alternativa `dev:webpack`. La caché de compilación de Turbopack en desarrollo está activa.
- **React 19.2.3** con TypeScript 5. Hay 141 archivos marcados con `"use client"`.
- **Estilos:** Tailwind CSS 4 (`@tailwindcss/postcss`), `tailwindcss-animate`, `tailwind-merge`, `class-variance-authority` y `clsx`.
- **Componentes:** Radix UI (`@radix-ui/react-accordion`, `react-slot`), con la estructura de `components.json` (estilo shadcn/ui).
- **Iconos:** `lucide-react` 0.564.
- **Temas:** `next-themes`.
- **Notificaciones:** `sonner`.
- **Carrusel:** `embla-carousel-react` con `embla-carousel-autoplay`.
- **Efectos visuales:** `canvas-confetti` (2 usos).
- **Formularios y validación:** `react-hook-form` 7 + `@hookform/resolvers` + `zod` 4 (63 esquemas `z.object`).
- **Datos en el cliente:** `swr` 2 (16 usos).
- **reCAPTCHA** en formularios: `react-google-recaptcha`.
- **Imágenes:** `next/image` con formatos AVIF y WebP. Hosts remotos permitidos (`src/lib/image-hosts.ts`):
  - `media.casaverdeoficial.com` (fotos del POS)
  - `casa-verde-cdn.b-cdn.net` (Bunny CDN)
  - `images.unsplash.com`
  - `lh3.googleusercontent.com` y `lh3.google.com` (avatares de Google)

---

## 3. Backend

No hay un servidor backend separado. La lógica vive dentro de la aplicación Next.js.

- **Route Handlers:** `src/app/api/**/route.ts`. Primer nivel: `addi`, `auth`, `cart`, `categories`, `cron`, `geography`, `nav-categories`, `payments`, `pos-categories`, `pos-webhook`, `products`, `profile`, `promo-popups`, `queue`, `recent-sales`, `reviews`, `search`, `shipping-config`, `suggested-products`, `theme`, `webhooks`.
- **Server Actions:** 4 archivos con `"use server"`: `src/app/actions/checkout.ts`, `src/app/actions/coupons.ts`, `src/app/actions/geography.ts` y `src/app/product/[slug]/actions/index.ts`.
- **Arquitectura por módulos:** `src/modules/*` con subcarpetas `application/`, `domain/`, `contracts/` y `__tests__/`. Módulos principales: `catalog`, `checkout`, `payments` (con `addi` y `bold`), `orders`, `posIntegration`, `shipping`, `search`, `collections`, `geography`, `adminCatalog`.
- **Caché y revalidación:** `revalidatePath` (39 usos), `revalidateTag` (25), `unstable_cache` (18) y `revalidate` en `fetch` (15). No usa `cacheComponents` ni `'use cache'`.
- **Seguridad de cabeceras** (`next.config.ts`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (cámara, micrófono, geolocalización y pago bloqueados).
- **Orígenes permitidos para Server Actions:** `casaverdeoficial.com` y `www.casaverdeoficial.com` en producción. Los orígenes de QA se agregan con la variable `EXTRA_SERVER_ACTION_ORIGINS`.

### Cron jobs (endpoints `src/app/api/cron/`)

| Endpoint | Función (por nombre) |
|---|---|
| `bold-fallback` | Reconciliar pagos de Bold no confirmados |
| `abandoned-cart` | Carritos abandonados |
| `abandoned-checkout` | Checkouts abandonados |
| `payment-audit` | Auditoría de pagos (semanal, lunes) |
| `pos-sync` | Sincronizar catálogo desde el POS |
| `pos-orders` | Sincronizar pedidos con el POS |
| `retry-order-emails` | Reintentar correos de pedidos |
| `review-requests` | Solicitudes de reseña |

Se disparan desde el VPS con `deploy/cron/cv-cron.sh` (horarios en hora de Bogotá). `vercel.json` aún define seis de estos crons, pero ya no es la fuente activa (ver §10). **`retry-order-emails` no aparece en `vercel.json`**: revisar que esté en el crontab del VPS.

### Cola y límites de uso

- **Upstash QStash:** encola envíos de correo (`src/lib/email-queue.ts`). El endpoint `/api/queue/email` verifica la firma `upstash-signature`.
- **Upstash Redis + `@upstash/ratelimit`:** límite de peticiones con ventana deslizante (`src/lib/ratelimit.ts`).

### Aclaración sobre NestJS

**La web no usa NestJS.** No hay ninguna dependencia `@nestjs` en `package.json` ni importaciones en `src/`. El frontend y el backend de la tienda son Next.js. Si te referías al stack de otra parte del portafolio, Devitech o Shamell, eso no forma parte de esta tienda.

---

## 4. Base de datos

- **ORM:** Prisma 5.22 (`prisma-client-js`) sobre **PostgreSQL** (`provider = "postgresql"`). Usa `DATABASE_URL` y `DIRECT_URL`.
- **Migraciones:** 75 carpetas en `prisma/migrations/`. La última: `20261103000000_close_admin_web`.
- **Cliente generado:** `src/generated/prisma/`.

| Entorno | Base de datos | Dónde |
|---|---|---|
| Desarrollo local | `postgres:18-alpine` | `docker-compose.web-db.yml` (puerto 5434, según el comentario del schema) |
| QA | `postgres:16-alpine` | `docker-compose.web-qa.yml` |
| Producción | **En transición** | ver §10 |

**Producción:** el código dice que la base de la tienda "vive en Neon" (`src/auth.ts`), y el registro del VPS indica que Neon sigue activo y que falta decidir la fuente de datos de la web en el VPS.

---

## 5. Autenticación

Auth.js (NextAuth v5 beta) con `@auth/prisma-adapter` (`src/auth.ts`).

- **Google OAuth** con `prompt: select_account`.
- **Credenciales** (correo y contraseña) con `bcryptjs`. Reglas:
  - Si el usuario no tiene contraseña, debe entrar con Google.
  - Si el correo no está verificado, el acceso se bloquea.
- **Sesiones JWT** de 30 días.
- **Vinculación automática de cuentas:** `allowDangerousEmailAccountLinking: true`. Con Google es aceptable, pero conviene revisarlo si se agregan otros proveedores.
- Los usuarios del POS no entran a la web. La administración vive en el POS.

---

## 6. Pagos

| Medio | Integración | Detalle |
|---|---|---|
| **Bold** (pasarela principal) | Activa | Checkout con `BoldPaymentClient`; webhook `/api/webhooks/bold`; reconciliación `/api/cron/bold-fallback`; clave pública `NEXT_PUBLIC_BOLD_IDENTITY_KEY`. |
| **PSE** (vía Bold) | Activa | Lista de bancos mediante proxy en `/api/payments/bold/pse-banks` y `/api/payments/pse-banks`. |
| **Addi** (crédito "paga después") | Activa | Crear solicitud `/api/payments/addi`; callback `/api/addi/callback`; webhook `/api/webhooks/addi`; cancelación en `src/modules/payments/addi/`. |
| **Nequi** | Solo informativo | Logo en el carrusel de producto y datos de transferencia en `src/app/checkout/pending/constants/index.ts`. **No hay integración por API.** El número `300 123 4567` parece de ejemplo: verificar que sea el real. |
| **PayPal** | Solo logo | Aparece en `PaymentCarousel.tsx`. **No hay integración de cobro.** |
| **Mercado Pago** | No integrado | No hay código activo (aunque el historial de migraciones tiene `add_mercadopago_payment_method`). |

- **Cupones:** viven dentro del módulo `checkout` (`domain/coupon-scope.ts`, `domain/coupon.entity.ts`, `infrastructure/pos-coupon.ts`). Las promociones del POS llegan a la web (migración `add_pos_promotions` en el historial).
- **Verificación de pago:** `src/app/pago/resultado/` (con `usePaymentVerification`).
- **Túnel de desarrollo:** `ngrok` (`scripts/ngrok-tunnel.mjs`), necesario para recibir webhooks de Bold y Addi en local.

---

## 7. Correo y notificaciones

- **Transporte:** Nodemailer por SMTP (`src/services/email/smtp.ts`). Variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`, `SMTP_FROM_NAME`, `ADMIN_ORDER_EMAIL`.
- **Resend:** está en `dependencies` (`resend` ^6.9.3), pero **no se importa en ningún archivo de `src/`**. Es una dependencia sin uso aparente.
- **Cola:** QStash para encolar envíos (ver §3).
- **Local:** Mailpit (`axllent/mailpit`), SMTP en el puerto 1025 e interfaz web en el 8025.
- **Producción:** el VPS tiene Postfix y OpenDKIM, con registros SPF, DKIM y DMARC publicados (según el registro del VPS).

---

## 8. Imágenes, CDN y medios

- **Bunny CDN:** `casa-verde-cdn.b-cdn.net` (variable `NEXT_PUBLIC_BUNNY_CDN_URL`).
- **Fotos del POS:** `NEXT_PUBLIC_POS_MEDIA_BASE_URL`.
- **Optimización:** `next/image` con AVIF y WebP. En Docker local se desactiva con `IMAGES_UNOPTIMIZED=true`, porque el contenedor no puede descargar las fotos del POS.
- **Imágenes de marca** dentro del repo: `public/` y `src/assets/` (logos de Addi, Nequi, PayPal, PSE y banners).

---

## 9. Integración con el POS (`pos-casa-verde`, fuera de este repo)

- **Variables de entorno (solo nombres):** `POS_API_BASE_URL`, `POS_API_KEY`, `POS_WEBHOOK_SECRET`, `POS_WELCOME_PROMOTION_ID`, `NEXT_PUBLIC_POS_APP_URL`, `NEXT_PUBLIC_POS_MEDIA_BASE_URL`.
- **Webhook:** `src/app/api/pos-webhook/route.ts`. Las pruebas `verify-signature`, `receive-pos-webhook` y `reserve-pos-stock` cubren la verificación de firma y el manejo de eventos.
- **Catálogo:** la web sincroniza el catálogo desde el POS con los crons `pos-sync` y `pos-orders`. El documento `md/ARQUITECTURA-DEFINITIVA-WEB.md` propone leer el catálogo directamente del POS. No pude confirmar en el código actual si la copia completa sigue existiendo, así que queda como pendiente de verificar.

---

## 10. Infraestructura, despliegue y estado de migración

- **Imagen Docker** (`Dockerfile`, multi-etapa, base `node:22-alpine`):
  - Etapa `deps`: instalación con `npm ci`.
  - Etapa `build`: `prisma generate` y `next build`, con la URL de la base leída desde un secret de Docker.
  - Etapa `runtime`: ejecuta `entrypoint.sh` como usuario `node`.
  - El script `build` de `package.json` sí aplica migraciones, pero el Dockerfile no lo usa.
- **Compose:**
  - `docker-compose.web.yml`: servicios `web` (puerto 3000), `mailpit` y `webdb`.
  - `docker-compose.web-db.yml`: `postgres:18-alpine`.
  - `docker-compose.web-qa.yml`: `app` y `postgres:16-alpine`.
- **Dominio:** `casaverdeoficial.com` (`NEXT_PUBLIC_APP_URL`).
- **Hosting en transición:**
  - El código ya retiró Vercel Analytics y Speed Insights, y el adaptador de Neon.
  - `vercel.json` sigue en el repo con seis crons. El registro del VPS dice que ya no es la fuente activa.
  - Los crons se disparan desde el VPS con `deploy/cron/`.
  - **No está confirmado** dónde corre hoy la producción (Vercel o VPS). El registro del VPS deja pendiente decidir la fuente de datos.

---

## 11. Herramientas de desarrollo

- **TypeScript** 5, **ESLint** 9 con `eslint-config-next` 16.4.3.
- **Scripts principales** (`package.json`): `dev`, `dev:clean`, `dev:webpack`, `tunnel`, `build`, `start`, `lint`, `test`, `test:watch`, `test:coverage`, `email:test`, `bench:shop-listing`, `bench:shop-search`, `bench:shop-baseline`.
- **Scripts auxiliares** en `scripts/`: prueba de correo (`email-test.ts`), simulación de webhooks del POS (`send-test-pos-webhook.mjs`), verificación de corte (`verify-cutover.mjs`), reenvío de confirmaciones (`resend-order-confirmation.mjs`), reparación de pagos Bold (`fix-stuck-bold-order.mjs`) y otros.
- **Control de versiones:** Git.
- **CI:** no hay pipeline de integración continua en el repositorio (no hay `.github/` ni `Makefile`).

---

## 12. QA (pruebas y calidad)

### 12.1 Pruebas unitarias y de integración
- **Jest** ^29.7.0 con `jest-environment-jsdom` y `next/jest`. Cobertura con `coverageProvider: v8`.
- **Testing Library:** `@testing-library/react` 16, `@testing-library/jest-dom` 6 y `@testing-library/user-event` 14.
- **Archivos de prueba:** 35, en carpetas `__tests__/` dentro de los módulos. Cubren catálogo, checkout (cupones, reCAPTCHA y precios de línea del POS), pagos, órdenes, POS (webhook, firma, stock, categorías, promociones, reseñas, temas, popups), envíos, búsqueda, colecciones, geografía y perfil.
- **Polyfill:** `jest.setup.ts` agrega `crypto.randomUUID` para jsdom.
- **Ejecutar:** `npm test`, `npm run test:coverage`.

### 12.2 Pruebas de carga y rendimiento
- **k6** con tres escenarios en `k6/`: `shop-listing.js`, `shop-search.js` y `checkout.js`.
- **Línea base:** `k6/baselines/` con resultados del 27 de agosto de 2026.
- **Script Node:** `scripts/bench-shop-baseline.mjs`.

### 12.3 Pruebas end-to-end (proyecto aparte, no es de la tienda)
- **Ubicación:** `D:\qa_automatizacion\cloud_commodo`.
- **Stack:** Cypress 16, TypeScript ^7.0.2, dotenv.
- **Qué prueba:** el producto **"Commodo"** (panel administrativo), no la tienda web:
  - Login: contrato de la API de autenticación, inicio de sesión válido e inválido, intentos restantes.
  - Sidebar: accesibilidad por teclado y atributos, expandir y colapsar, cierre de sesión y navegación del menú.
- **Configuración:** la URL base sale de la variable `URL_APP_COMMODO`.
- **Patrón:** page objects (`LoginPage`, `HomePage`, `SidebarPage`) y comandos personalizados.

### 12.4 Entornos y datos de prueba
- **QA en contenedores:** `docker-compose.web-qa.yml` (app + Postgres 16). En el VPS hay una web de QA, con sus propias variables.
- **Correo en pruebas:** Mailpit en local.
- **Dominios de QA:** la variable `EXTRA_SERVER_ACTION_ORIGINS` permite los orígenes de QA en Server Actions.
- **Simulación de POS:** `scripts/send-test-pos-webhook.mjs`.

### 12.5 Lo que no hay en QA
- No hay Playwright ni Cypress en la tienda web.
- No hay pipeline de CI que ejecute las pruebas en cada cambio.

---

## 13. Discrepancias y pendientes detectados

1. **Documento de arquitectura desactualizado.** `md/ARQUITECTURA-DEFINITIVA-WEB.md` (20 oct 2026) habla de Next.js 16.1.6 y de Neon. El código actual usa Next.js 16.4.3 y ya no tiene el adaptador de Neon. Este documento sigue el código.
2. **Fuente de datos de producción sin decidir.** Neon sigue activo, y el VPS necesita una base propia (registro del VPS, sección 7).
3. **Versiones de PostgreSQL distintas:** 18 en desarrollo local y 16 en QA. Conviene alinearlas.
4. **Crons en dos lugares:** `vercel.json` (seis crons) y `deploy/cron/` (VPS). `retry-order-emails` existe en el código pero no está en `vercel.json`.
5. **Dependencia sin uso:** `resend` en `dependencies`, sin importaciones en `src/`.
6. **Número de Nequi de ejemplo:** `300 123 4567` en `src/app/checkout/pending/constants/index.ts`. Confirmar el número real antes de publicar.
7. **Vinculación automática de cuentas** (`allowDangerousEmailAccountLinking`): revisar si se agregan más proveedores de login.
8. **Cypress apunta a "Commodo"**, no a la tienda. Si se quiere QA E2E de la tienda, falta construirlo.
9. **Repositorio con binarios de Prisma para Windows** en `src/generated/prisma/` (`query_engine-windows.dll.node`). Conviene confirmar que no estén versionados en git.

---

## 14. Archivos consultados (principales)

- `package.json`, `next.config.ts`, `jest.config.ts`, `jest.setup.ts`, `Dockerfile`, `docker-compose.web.yml`, `docker-compose.web-db.yml`, `docker-compose.web-qa.yml`, `vercel.json`
- `prisma/schema.prisma` y `prisma/migrations/`
- `src/auth.ts`, `src/lib/email-queue.ts`, `src/lib/ratelimit.ts`, `src/lib/image-hosts.ts`, `src/services/email/smtp.ts`
- `src/app/api/` (rutas de pagos, webhooks, cron y POS), `src/app/actions/`, `src/modules/*/__tests__/`
- `deploy/VPS-REGISTRO-LOCAL.md`, `deploy/cron/README.md`
- `md/ARQUITECTURA-DEFINITIVA-WEB.md`
- `k6/`, `scripts/`
- `D:\qa_automatizacion\cloud_commodo\` (`package.json`, `cypress.config.ts`, `cypress/e2e/`)

> **Seguridad:** este documento no incluye valores de variables de entorno, contraseñas, URLs de base de datos ni direcciones IP. Solo menciona nombres de variables.
