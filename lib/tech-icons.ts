import type { SimpleIcon } from "simple-icons";
import {
  siAuth0,
  siClaude,
  siCloudinary,
  siCypress,
  siDocker,
  siExpress,
  siFlyway,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGoogle,
  siGooglegemini,
  siJavascript,
  siJest,
  siJira,
  siJunit5,
  siK6,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPrisma,
  siRadixui,
  siReact,
  siReactquery,
  siRedis,
  siRender,
  siSelenium,
  siShadcnui,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siStripe,
  siSwagger,
  siTailwindcss,
  siTestinglibrary,
  siThreedotjs,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
} from "simple-icons";

export type TechIconDef = {
  label: string;
  /** Hex sin # (como simple-icons) o color custom */
  hex: string;
  path?: string;
  /** Iniciales si no hay SVG de marca */
  fallback?: string;
};

/** Alias de nombres del portafolio → icono simple-icons / fallback */
const ALIASES: Record<string, TechIconDef> = {
  // Next/Vercel/GitHub/Express vienen en negro en simple-icons → blanco para fondo oscuro
  "next.js": { label: "Next.js", hex: "FFFFFF", path: siNextdotjs.path },
  "next.js api routes": { label: "Next.js API", hex: "FFFFFF", path: siNextdotjs.path },
  "server actions": { label: "Server Actions", hex: "FFFFFF", path: siNextdotjs.path },
  react: { label: "React", hex: siReact.hex, path: siReact.path },
  typescript: { label: "TypeScript", hex: siTypescript.hex, path: siTypescript.path },
  "tailwind css": { label: "Tailwind CSS", hex: siTailwindcss.hex, path: siTailwindcss.path },
  prisma: { label: "Prisma", hex: "FFFFFF", path: siPrisma.path },
  "prisma orm": { label: "Prisma", hex: "FFFFFF", path: siPrisma.path },
  postgresql: { label: "PostgreSQL", hex: siPostgresql.hex, path: siPostgresql.path },
  docker: { label: "Docker", hex: siDocker.hex, path: siDocker.path },
  "docker compose": { label: "Docker Compose", hex: siDocker.hex, path: siDocker.path },
  "auth.js (nextauth)": { label: "Auth.js", hex: "A78BFA", path: siAuth0.path },
  "auth.js": { label: "Auth.js", hex: "A78BFA", path: siAuth0.path },
  nextauth: { label: "Auth.js", hex: "A78BFA", path: siAuth0.path },
  "google oauth": { label: "Google OAuth", hex: siGoogle.hex, path: siGoogle.path },
  google: { label: "Google", hex: siGoogle.hex, path: siGoogle.path },
  bold: { label: "Bold", hex: "8B5CF6", fallback: "B" },
  addi: { label: "Addi", hex: "22D3EE", fallback: "A" },
  vps: { label: "VPS", hex: "A78BFA", fallback: "V" },
  jest: { label: "Jest", hex: siJest.hex, path: siJest.path },
  "testing library": { label: "Testing Library", hex: siTestinglibrary.hex, path: siTestinglibrary.path },
  k6: { label: "k6", hex: siK6.hex, path: siK6.path },
  java: { label: "Java", hex: siOpenjdk.hex, path: siOpenjdk.path },
  "spring boot": { label: "Spring Boot", hex: siSpringboot.hex, path: siSpringboot.path },
  "spring modulith": { label: "Spring Modulith", hex: siSpring.hex, path: siSpring.path },
  spring: { label: "Spring", hex: siSpring.hex, path: siSpring.path },
  "spring data jpa": { label: "Spring Data JPA", hex: siSpring.hex, path: siSpring.path },
  "spring security": {
    label: "Spring Security",
    hex: siSpringsecurity.hex,
    path: siSpringsecurity.path,
  },
  flyway: { label: "Flyway", hex: siFlyway.hex, path: siFlyway.path },
  jwt: { label: "JWT", hex: "22D3EE", fallback: "J" },
  vite: { label: "Vite", hex: siVite.hex, path: siVite.path },
  "tanstack query": { label: "TanStack Query", hex: siReactquery.hex, path: siReactquery.path },
  zustand: { label: "Zustand", hex: "443E38", fallback: "Z" },
  vitest: { label: "Vitest", hex: siVitest.hex, path: siVitest.path },
  playwright: { label: "Playwright", hex: "2EAD33", fallback: "P" },
  junit: { label: "JUnit", hex: siJunit5.hex, path: siJunit5.path },
  "junit 5": { label: "JUnit 5", hex: siJunit5.hex, path: siJunit5.path },
  testcontainers: { label: "Testcontainers", hex: siDocker.hex, path: siDocker.path },
  "node.js": { label: "Node.js", hex: siNodedotjs.hex, path: siNodedotjs.path },
  nestjs: { label: "NestJS", hex: siNestjs.hex, path: siNestjs.path },
  "nest.js": { label: "NestJS", hex: siNestjs.hex, path: siNestjs.path },
  nest: { label: "NestJS", hex: siNestjs.hex, path: siNestjs.path },
  express: { label: "Express", hex: "FFFFFF", path: siExpress.path },
  stripe: { label: "Stripe", hex: siStripe.hex, path: siStripe.path },
  "stripe.js": { label: "Stripe.js", hex: siStripe.hex, path: siStripe.path },
  "three.js": { label: "Three.js", hex: siThreedotjs.hex, path: siThreedotjs.path },
  three: { label: "Three.js", hex: siThreedotjs.hex, path: siThreedotjs.path },
  "react three fiber": {
    label: "React Three Fiber",
    hex: siThreedotjs.hex,
    path: siThreedotjs.path,
  },
  motion: { label: "Motion", hex: siFramer.hex, path: siFramer.path },
  framer: { label: "Framer", hex: siFramer.hex, path: siFramer.path },
  shadcn: { label: "shadcn/ui", hex: siShadcnui.hex, path: siShadcnui.path },
  "shadcn/ui": { label: "shadcn/ui", hex: siShadcnui.hex, path: siShadcnui.path },
  "base ui": { label: "Base UI", hex: "1E88E5", fallback: "B" },
  radix: { label: "Radix UI", hex: siRadixui.hex, path: siRadixui.path },
  "radix ui": { label: "Radix UI", hex: siRadixui.hex, path: siRadixui.path },
  vercel: { label: "Vercel", hex: "FFFFFF", path: siVercel.path },
  render: { label: "Render", hex: siRender.hex, path: siRender.path },
  cloudinary: { label: "Cloudinary", hex: siCloudinary.hex, path: siCloudinary.path },
  mailersend: { label: "MailerSend", hex: "0D9488", fallback: "M" },
  cypress: { label: "Cypress", hex: siCypress.hex, path: siCypress.path },
  msw: { label: "MSW", hex: "FF6A33", fallback: "M" },
  stryker: { label: "Stryker", hex: "E74C3C", fallback: "S" },
  supertest: { label: "Supertest", hex: siJest.hex, fallback: "ST" },
  swagger: { label: "Swagger", hex: siSwagger.hex, path: siSwagger.path },
  "github actions": {
    label: "GitHub Actions",
    hex: siGithubactions.hex,
    path: siGithubactions.path,
  },
  bcrypt: { label: "bcrypt", hex: "A78BFA", fallback: "bc" },
  "ci/cd": { label: "CI/CD", hex: siGithubactions.hex, path: siGithubactions.path },
  javascript: { label: "JavaScript", hex: siJavascript.hex, path: siJavascript.path },
  "javascript (es6+)": {
    label: "JavaScript",
    hex: siJavascript.hex,
    path: siJavascript.path,
  },
  "apis rest": { label: "APIs REST", hex: "22D3EE", fallback: "API" },
  "autenticación jwt": { label: "JWT", hex: "22D3EE", fallback: "J" },
  mysql: { label: "MySQL", hex: siMysql.hex, path: siMysql.path },
  redis: { label: "Redis", hex: siRedis.hex, path: siRedis.path },
  selenium: { label: "Selenium", hex: siSelenium.hex, path: siSelenium.path },
  postman: { label: "Postman", hex: siPostman.hex, path: siPostman.path },
  "casos de prueba": { label: "Casos de prueba", hex: "34D399", fallback: "CT" },
  "gestión de defectos": { label: "Defectos", hex: "F87171", fallback: "GD" },
  git: { label: "Git", hex: siGit.hex, path: siGit.path },
  github: { label: "GitHub", hex: "FFFFFF", path: siGithub.path },
  jira: { label: "Jira", hex: siJira.hex, path: siJira.path },
  clickup: { label: "ClickUp", hex: "7B68EE", fallback: "CU" },
  "framer motion": { label: "Framer Motion", hex: siFramer.hex, path: siFramer.path },
  claude: { label: "Claude", hex: siClaude.hex, path: siClaude.path },
  gemini: { label: "Gemini", hex: siGooglegemini.hex, path: siGooglegemini.path },
  "desarrollo asistido": { label: "Dev asistido", hex: "A78BFA", fallback: "AI" },
  "generación de casos de prueba": {
    label: "QA con IA",
    hex: "34D399",
    fallback: "QA",
  },
};

function normalize(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function resolveTechIcon(name: string): TechIconDef {
  const key = normalize(name);
  if (ALIASES[key]) return ALIASES[key];

  // Búsqueda parcial (ej. "Next.js API Routes, Server Actions, Prisma" ya se parte antes)
  const hit = Object.entries(ALIASES).find(
    ([alias]) => key.includes(alias) || alias.includes(key),
  );
  if (hit) return hit[1];

  return {
    label: name.trim(),
    hex: "8B5CF6",
    fallback: name.trim().slice(0, 1).toUpperCase() || "?",
  };
}

/** Parte items "A, B, C" o "A · B" en lista de nombres */
export function parseTechItems(items: string): string[] {
  return items
    .split(/,|·|\|/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function iconFromSimple(icon: SimpleIcon): TechIconDef {
  return { label: icon.title, hex: icon.hex, path: icon.path };
}
