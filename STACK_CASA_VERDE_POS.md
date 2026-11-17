# Stack tecnológico — POS "Cloud" de Casa Verde

> **Qué es esto:** inventario del stack del POS, también llamado **cloud** (el repositorio en GitHub se llama `Pos-Cloud`): frontend, backend, base de datos, infraestructura y QA. Todo leído del código.
>
> **Repositorio analizado:** `D:\casa-verde-integral\pos-casa-verde`
> **Rama:** `pos-casa-verde-dev` (la más reciente, último commit el 2026-11-13). El árbol de trabajo estaba limpio.
> **Remoto:** `github.com/junkamilo/Pos-Cloud`, **privado**.
> **Componentes:** `pos-frontend-casa-verde/` (React) y `pos-backend-casa-verde/` (Spring Boot).
> **Fuera de alcance:** la tienda web (ver `STACK_CASA_VERDE_WEB.md`). Las otras copias del POS (`D:\pos-casa-verde`, `D:\Downloads\pos-backend-casa-verde` y `D:\Documentos_pos_casa_verde`) no se usaron como fuente.

---

## 1. Alertas prioritarias (leer primero)

1. **Respaldos con datos de clientes dentro de git.** La carpeta `backups/` no está en `.gitignore`. Git rastrea **8 archivos**: 7 volcados de base de datos (6 `.dump` y 1 `.sql.gz`) y `web-datos-del-pos.json`. Están en 3 commits, así que siguen en el historial aunque se borren. El repositorio es privado, pero conviene:
   - Excluir `backups/` en `.gitignore`.
   - Sacar esos archivos del índice con `git rm --cached`.
   - Valorar reescribir el historial antes de compartir o clonar el repositorio en otro equipo.

   No abrí esos archivos.
2. **"Commodo" no es este POS.** La suite de Cypress en `D:\qa_automatizacion\cloud_commodo` prueba otra aplicación. Ver §9.

---

## 2. Resumen

| Capa | Tecnología | Versión (según `package.json` / `pom.xml`) |
|---|---|---|
| Frontend | React + Vite + TypeScript | React 19.2.8 · Vite 8.3 · TypeScript ~6.0.2 |
| Routing del frontend | react-router | 8.3.1 |
| Backend | Spring Boot sobre Java | Spring Boot 4.1.1 · Java 25 · Spring Modulith 2.1.1 |
| Persistencia | Spring Data JPA y JDBC, Flyway | versiones gestionadas por Spring Boot |
| Base de datos | PostgreSQL | 16 (`postgres:16-alpine`) |
| Redis | Declarado en compose, **sin uso en el código** | `redis:7-alpine` |
| Autenticación | Spring Security + JWT en cookies | nimbus-jose-jwt 10.0.2 · BouncyCastle 1.80 |
| Pruebas frontend | Vitest, Testing Library, MSW, jest-axe, Playwright | Vitest 5 · Playwright 1.63 |
| Pruebas backend | JUnit 5, Testcontainers, ArchUnit, Spring Modulith | ArchUnit 1.4.1 |
| CI | GitHub Actions (**solo frontend**) | Node 22 |
| Contenedores | Docker Compose | `eclipse-temurin:25-jre-alpine`, `postgres:16-alpine`, `redis:7-alpine` |

---

## 3. Frontend (`pos-frontend-casa-verde`)

### 3.1 Núcleo y build
- React 19.2.8, TypeScript ~6.0.2, Vite 8.3 con `@vitejs/plugin-react` 6.1.1 y `@tailwindcss/vite`.
- Alias `@` apunta a `src`. Proxy de desarrollo: `/api` hacia `localhost:8080` (el backend).
- Bundle dividido a mano en: `vendor-react`, `vendor-query`, `vendor-charts`, `vendor-table`, `vendor-pdf` y `vendor-excel`.
- La versión de la app sale de `package.json` (`__APP_VERSION__`) y se muestra en el pie del menú lateral.
- Variables: `VITE_API_BASE_URL` y `VITE_API_TIMEOUT`.

### 3.2 Estado y datos
- TanStack Query 5.102.8 para el estado del servidor.
- Zustand 5.0.15 para el estado del cliente.
- Dexie 4.4.6 (IndexedDB) para almacenamiento en el navegador.
- Cliente de API tipado: `openapi-fetch` 0.17.0. Los tipos se generan con `openapi-typescript` 7.13.0 desde `openapi/openapi.yml`.
- TanStack Table 8.21.3 y TanStack Virtual 3.14.12 para tablas grandes.

### 3.3 Formularios y validación
- react-hook-form 7.88.0, zod 4.6.2 y `@hookform/resolvers` 5.9.1.

### 3.4 Interfaz
- Tailwind CSS 4.3.3 y `tw-animate-css` 1.4.0.
- Radix UI (`radix-ui` 1.6.7) y `@base-ui/react` 1.8.0. Componentes generados con la CLI de shadcn (`shadcn` 4.21, `@shadcn/react` 0.3.1).
- Paleta de comandos `cmdk` 1.1.1, paneles `vaul` 1.1.2, avisos `sonner` 2.0.8, selector de fechas `react-day-picker` 10.0.1, campos OTP `input-otp` 1.5.0, paneles redimensionables `react-resizable-panels` 4.12.4, carrusel `embla-carousel-react` 8.6.0, temas `next-themes` 0.4.6 e iconos `lucide-react` 1.46.0.
- Tipografía IBM Plex Sans y IBM Plex Mono (`@fontsource`, 5.3.0).
- Sistema de diseño propio en `src/design-system/` (`tokens.css` y README).
- Componentes organizados por niveles (por ejemplo `components/organisms/`).
- Utilidad de clases: el paquete `cn`, importado desde los componentes de `src/components/ui/`.

### 3.5 Gráficas, arrastre y exportación
- Gráficas: ApexCharts 7.6.1 con `react-apexcharts` 2.1.1.
- Arrastrar y soltar: `@dnd-kit/core` 6.3.1, `@dnd-kit/sortable` 10.0.0 y `@dnd-kit/utilities` 3.2.2.
- Excel: ExcelJS 4.4.0. PDF: `@react-pdf/renderer` 4.9.0. Descargas: file-saver 2.0.5.
- Fechas: date-fns 4.4.0.

### 3.6 Herramientas de calidad del código
- ESLint 10 (configuración plana) con jsx-a11y, react-hooks, react-refresh, `eslint-plugin-boundaries` (control de dependencias entre capas) y typescript-eslint 8.
- Prettier 3.9.6.

---

## 4. Backend (`pos-backend-casa-verde`)

### 4.1 Núcleo
- Java 25 (`java.version`), Spring Boot 4.1.1 como parent, Maven y Lombok.
- Spring Modulith 2.1.1 (monolito modular).
- Imagen de ejecución: `eclipse-temurin:25-jre-alpine`.

### 4.2 API
- Spring Web MVC, validación con Bean Validation (`spring-boot-starter-validation`) y Actuator.
- API pública para la tienda bajo `/api/public/…`. Verificado en el código: `PublicCatalogController` (catálogo de solo lectura) y `PublicOrderController` (pedidos).
- Documentación OpenAPI en `docs/api/openapi.yml` ("POS Casa Verde API", 1.0.0-alpha). El frontend mantiene su copia en `openapi/openapi.yml`.
- Autenticación de la integración con la web: encabezado `X-Api-Key`, validado por `ApiKeyAuthenticationFilter`. El POS guarda solo el hash de la clave (`WEB_API_KEY_HASHES`). El script `scripts/generar-clave-web.ps1` genera la clave y su hash.

### 4.3 Seguridad
- Spring Security con JWT (nimbus-jose-jwt 10.0.2). El secreto va en `JWT_SECRET`.
- Sesión en cookies, con `COOKIE_SECURE` para producción.
- Límite de intentos de login con bloqueo (`login-limit`), limitador de peticiones `FixedWindowRateLimiter` y permisos por rol en `PermissionRules`.
- CORS configurable con `CORS_ALLOWED_ORIGINS`.
- Criptografía: BouncyCastle `bcprov-jdk18on` 1.80.
- Administrador inicial configurable (`AUTH_BOOTSTRAP_*`).
- Webhooks firmados con `WebhookSigner` y el secreto `WEB_WEBHOOK_SECRET`.

### 4.4 Integración con la tienda web (módulo `storefront`)
- `WebhookNotifier` avisa a la web de los cambios (`WEB_WEBHOOK_URL`).
- `StockAvailabilityWatcher` vigila la disponibilidad de stock.
- `EventPublicationMaintenance` mantiene el registro de eventos de Spring Modulith.
- `WEB_MEDIA_BASE_URL` es la URL pública de las imágenes.

### 4.5 Arquitectura
- 22 módulos bajo `com.casaverde.pos`: `accounting`, `banners`, `catalog`, `config`, `costing`, `integration`, `inventory`, `media`, `payments`, `platform`, `popups`, `promotions`, `purchases`, `reporting`, `reviews`, `sales`, `shared`, `shipping`, `storefront`, `tax`, `themes` y `users`.
- Estilo hexagonal (`docs/architecture/hexagonal-design.md`): servicios de aplicación y adaptadores en `infrastructure/`.
- Verificación de límites entre módulos con `ModulithArchitectureTest` (Spring Modulith) y reglas ArchUnit (`@ArchTest`).

### 4.6 Persistencia
- Spring Data JPA y Spring Data JDBC, ambos en el `pom.xml`. Hay repositorios JDBC conviviendo con los de JPA (por ejemplo `JdbcPromotionRepository`).
- HikariCP como pool de conexiones. Hibernate con `ddl-auto` configurable.
- Flyway con `classpath:db/migration`: 154 archivos de migración, siendo `V1__baseline.sql` la base.
- Driver: PostgreSQL (`jdbc:postgresql`).
- Eventos de Spring Modulith persistidos en JPA (`spring-modulith-starter-jpa`), con republicación al reiniciar.

### 4.7 Archivos y medios
- Subida de archivos con límites configurables (multipart).
- `app.media.upload-dir` apunta a disco local. En Docker se guarda en el volumen `backend-uploads`.
- No hay almacenamiento en la nube: S3 y MinIO no aparecen en el código.

### 4.8 Observabilidad
- Actuator con detalles de salud, información y endpoints expuestos.
- Logs por paquete: `com.casaverde`, Spring Web, Spring Security y SQL de Hibernate.

### 4.9 Lo que no usa, aunque aparezca en la configuración
- **Redis:** está en `docker-compose.yml`, en `docker-compose.prod.yml` y en las variables `REDIS_PASSWORD` y `REDIS_PORT`, pero el código no lo usa.
- **Correo:** no hay starter de correo ni `JavaMailSender`. Los correos los envía la tienda web.
- **SSE, captcha, S3 y MinIO:** no aparecen en el código.

---

## 5. Base de datos

- **PostgreSQL 16:** `docker/postgres/Dockerfile` parte de `postgres:16-alpine` y agrega scripts de inicio.
- Scripts en `docker/postgres/init-scripts/`: `00-extensions-and-roles.sh` (extensiones y roles), `01-schema.sql` y `02-seed-data.sql`.
- **Tres roles con mínimo privilegio:**
  - `pos_app`: la aplicación.
  - `pos_migrator`: Flyway.
  - `pos_readonly`: solo lectura.
  - Variables: `DB_APP_USER`, `DB_MIGRATOR_USER`, `DB_READONLY_USER` y `SPRING_FLYWAY_USER`.
- Migraciones: 154 archivos en `pos-backend-casa-verde/src/main/resources/db/migration/`.
- Documentación del esquema en `pos-backend-casa-verde/docs/database/` (`schema-diagram.md` y `queries.md`).
- Pruebas: PostgreSQL efímero con Testcontainers.
- **Respaldos:** ver la alerta del §1.

---

## 6. Infraestructura y despliegue

- **`docker-compose.yml` (base):**
  - Servicios: `postgres` (construido desde `docker/postgres`), `backend` (construido desde `pos-backend-casa-verde/Dockerfile`, puerto 8080) y `redis` (`redis:7-alpine`).
  - Volúmenes: `postgres-data`, `redis-data`, `backend-uploads` y `pgadmin-data`.
  - Red: `pos-network`.
- **`docker-compose.override.yml` (solo desarrollo):** publica los puertos de postgres, backend y redis, y agrega **pgAdmin** (`dpage/pgadmin4:latest`).
- **`docker-compose.prod.yml` (producción):** se usa con `-f docker-compose.yml -f docker-compose.prod.yml`, sin el override.
  - La base, Redis y pgAdmin no quedan expuestos.
  - El backend escucha solo en `127.0.0.1:8080`.
  - Según el comentario del archivo, el proxy HTTPS (Caddy o Nginx) es lo único publicado en internet. **Ese proxy no está en el repositorio.**
  - Usa `SPRING_PROFILES_ACTIVE=prod` y `COOKIE_SECURE=true`. Las credenciales son obligatorias y no tienen valores por defecto.
- **Dockerfile del backend:** `eclipse-temurin:25-jre-alpine`, copia el JAR de `target/`, expone el 8080 y ejecuta `java $JAVA_OPTS -jar`. **No tiene `USER`, así que el proceso corre como root.**
- **Frontend:** no tiene Dockerfile ni configuración de servidor. Se compila como estático con `vite build`. **En el repositorio no está definido cómo se publica.**
- **`scripts/generar-clave-web.ps1`:** genera la clave de integración con la web y su hash para `WEB_API_KEY_HASHES`.

---

## 7. Herramientas de desarrollo

- Node 22 (en CI) y npm con `package-lock.json`.
- Maven (`pom.xml`) con el plugin de Flyway y el procesador de anotaciones de Lombok.
- Variables de entorno: el `.env.example` del POS (solo nombres) cubre la base, JWT, CORS, la integración con la web, el administrador inicial, pgAdmin y las `VITE_*` del frontend.
- Editor: carpeta `.vscode` en el frontend.
- Control de versiones: Git, con remoto en GitHub (`Pos-Cloud`, privado).

---

## 8. QA

### 8.1 Frontend
- **Pruebas unitarias y de integración:** Vitest 5.0 con entorno jsdom, globals y `src/test/setup.ts`. Cobertura con V8 y **umbral del 90 %** (líneas, funciones y sentencias) sobre `src/shared/lib/**`. Hay 146 archivos de prueba.
- **Testing Library:** `@testing-library/react` 16.3.3, `dom` 10.4.1, `user-event` 14.6.7 y `jest-dom` 7.0.1.
- **Mock de API:** MSW 2.15.0. **IndexedDB simulada:** fake-indexeddb 6.2.5.
- **Accesibilidad:** jest-axe 11.0.0 con el script `test:a11y`. Hay 9 archivos de prueba que usan axe.
- **Contrato de API:** `npm run api:check` regenera los tipos desde OpenAPI y falla si no coinciden.
- **Presupuesto de bundle:** `npm run bundlesize` (`scripts/check-bundlesize.mjs`).
- **E2E:** Playwright 1.63 con carpeta `e2e/` (2 archivos). Solo Chromium, base `127.0.0.1:5173`, arranca `npm run dev`, un reintento en CI y traza en el primer reintento.

### 8.2 Backend
- **JUnit 5** con los starters de prueba de Spring Boot: `data-jdbc-test`, `data-jpa-test`, `flyway-test`, `validation-test`, `webmvc-test` y `security-test`.
- **Testcontainers** con PostgreSQL, configurado en `src/test/java/com/casaverde/pos/support/TestContainersConfig.java`.
- **Verificación de arquitectura:** Spring Modulith (`ModulithArchitectureTest`) y ArchUnit 1.4.1 (`@ArchTest`).
- **Volumen:** 66 clases de prueba, 256 anotaciones `@Test`, 40 `@SpringBootTest`, 4 `@WebMvcTest` y 3 `@ArchTest`. Mockito aparece en 68 lugares.
- Perfil de pruebas: `src/test/resources/application-test.yml`.

### 8.3 CI (GitHub Actions)
- Archivo `.github/workflows/ci.yml`. Se ejecuta en push a `main`/`master` y en pull requests.
- Job `quality` en `ubuntu-latest` con Node 22: `npm ci --ignore-scripts`, `tsc -b`, lint, `api:check`, `test:coverage`, build, `bundlesize`, instalación de Chromium para Playwright y `test:e2e`.
- **No hay job de backend.** Las pruebas de Java, Testcontainers y ArchUnit no corren en ningún pipeline.

### 8.4 Pruebas de carga
- **No existen en el POS.** No hay k6, Gatling ni JMeter en el repositorio. La tienda sí tiene k6.

### 8.5 Automatización Cypress (`D:\qa_automatizacion\cloud_commodo`)
- **No corresponde a este POS.** Ver §9.
- Stack: Cypress ^16.0.0, TypeScript ^7.0.2 y dotenv 17.4.2.
- Pruebas:
  - Login: contrato de la API de autenticación, captcha, credenciales válidas e inválidas, intentos restantes.
  - Sidebar: accesibilidad por teclado, expandir y colapsar, cierre de sesión y navegación.
- Variables (solo nombres): `URL_APP_COMMODO`, `USERNAME_APP_COMMODO`, `PASSWORD_APP_COMMODO`, `USERNAME_APP_LIMITADO`, `PASSWORD_APP_LIMITADO`, `ACCESS_TOKEN`, `REFRESH_TOKEN` y `CAPTCHA_TOKEN`.

---

## 9. ¿Commodo es el POS?

No parece. La suite de Cypress apunta a una aplicación con este menú, que comparé con el POS:

| Ruta o módulo | En Commodo (QA) | En el POS |
|---|---|---|
| `/dashboard`, `/analytics`, `/reports`, `/store`, `/users` | Sí | Sí (rutas `dashboard`, `analyticsGroup: '/analytics'`, `reports`, `store` y usuarios) |
| `/invoiceElectronic` (Factura Electrónica) | Sí | No |
| `/managment-companies` (Gestión de Compañía) | Sí | No |
| `/credit-clients` (Gestión de flotas) | Sí | No |
| `/parametrization` (Parametrización) | Sí | No |
| Captcha en el login (`CAPTCHA_TOKEN`) | Sí | No. El backend no tiene captcha |

**Conclusión:** Commodo comparte la estructura de navegación con el POS, pero tiene módulos que el POS no tiene. Puede ser una versión anterior o una variante.

**Pregunta para ti:** ¿la suite `cloud_commodo` debería probar el POS (`Pos-Cloud`)? Si sí, hay que actualizar sus rutas, credenciales y captcha. Si no, el POS queda sin pruebas E2E propias.

---

## 10. Discrepancias y pendientes

1. **Datos de clientes en git:** 8 respaldos rastreados en `backups/` (ver §1).
2. **Commodo no corresponde al POS** (ver §9).
3. **Backend sin CI:** sus pruebas no corren en ningún pipeline.
4. **Redis sin uso:** está en compose, producción y variables, pero el código no lo usa.
5. **Backend como root:** el Dockerfile no tiene `USER`.
6. **Documento de arquitectura desactualizado:** `docs/ARQUITECTURA-DEFINITIVA-POS.md` lista `PublicAdminController`, que no existe en el código.
7. **Frontend sin Dockerfile ni plan de publicación** documentado.
8. **PostgreSQL:** versión 16 en el POS y 18 en la tienda (local). Conviene alinearlas si se comparten scripts o respaldos.
9. **Sin pruebas de carga** en el POS.
10. **Proxy HTTPS fuera del repositorio** (Caddy o Nginx, según el comentario de producción).

---

## 11. Archivos consultados

- Backend: `pom.xml`, `Dockerfile`, `src/main/resources/application*.yml`, `src/test/`, `docs/api/openapi.yml`, `src/main/resources/db/migration/`.
- Frontend: `package.json`, `vite.config.ts`, `playwright.config.ts`, `openapi/`, `src/app/navigation.ts`, `src/design-system/`.
- Infraestructura: `docker-compose.yml`, `docker-compose.override.yml`, `docker-compose.prod.yml`, `docker/postgres/Dockerfile` y `init-scripts/` (solo nombres).
- CI y scripts: `.github/workflows/ci.yml`, `.env.example` (solo nombres de variables) y `scripts/generar-clave-web.ps1`.
- QA externo: `D:\qa_automatizacion\cloud_commodo\` (`package.json`, `cypress.config.ts`, `cypress/`).

> **Seguridad:** este documento no incluye contraseñas, claves, valores de variables, URLs de base de datos ni el contenido de los respaldos. Los archivos de `backups/` no fueron abiertos.
