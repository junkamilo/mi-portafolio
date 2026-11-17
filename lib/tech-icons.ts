import type { SimpleIcon } from "simple-icons";
import {
  siAuth0,
  siDocker,
  siExpress,
  siFlyway,
  siGoogle,
  siJest,
  siJunit5,
  siK6,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPrisma,
  siReact,
  siReactquery,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
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
  "next.js": { label: "Next.js", hex: siNextdotjs.hex, path: siNextdotjs.path },
  "next.js api routes": { label: "Next.js API", hex: siNextdotjs.hex, path: siNextdotjs.path },
  "server actions": { label: "Server Actions", hex: siNextdotjs.hex, path: siNextdotjs.path },
  react: { label: "React", hex: siReact.hex, path: siReact.path },
  typescript: { label: "TypeScript", hex: siTypescript.hex, path: siTypescript.path },
  "tailwind css": { label: "Tailwind CSS", hex: siTailwindcss.hex, path: siTailwindcss.path },
  prisma: { label: "Prisma", hex: "2D3748", path: siPrisma.path },
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
  express: { label: "Express", hex: siExpress.hex, path: siExpress.path },
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
