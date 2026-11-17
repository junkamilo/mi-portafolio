import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/section/Providers";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../components/themeProvider/theme-provider";
import { BugCursor } from "../components/motion/BugCursor";

export const metadata: Metadata = {
  title: "Juan Beltrán | Desarrollador Full Stack & QA Automation Engineer",
  description:
    "Desarrollador Full Stack y QA Automation Engineer en Colombia. React, Next.js, TypeScript, Node.js, NestJS, Java y Spring Boot. Pruebas automatizadas con Cypress, Playwright y Jest. Disponible para remoto, Barranquilla y Bucaramanga.",
  keywords: [
    "Desarrollador Full Stack",
    "QA Automation Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Cypress",
    "Playwright",
    "Jest",
    "Docker",
    "Colombia",
  ],
  authors: [{ name: "Juan Camilo Beltrán Campo" }],
  openGraph: {
    title: "Juan Beltrán | Desarrollador Full Stack & QA Automation Engineer",
    description:
      "Construyo aplicaciones web completas y las pruebo antes de entregarlas. Mira mis proyectos en producción.",
    images: ["/og-image.png"], // 1200x630: foto + nombre + rol (pendiente de crear)
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/fotoPerfilHojaVida.png",
    apple: "/fotoPerfilHojaVida.png",
    shortcut: "/fotoPerfilHojaVida.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 👇 CAMBIO IMPORTANTE: Agrega suppressHydrationWarning aquí
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            {/* Aquí solo renderizamos children (el contenido de la página) */}
            {children}

            {/* El Toaster sí debe ir aquí para que funcione en todas partes */}
            <Toaster />
            {/* Cursor que cambia: bicho → código → ... */}
            <BugCursor />
          </Providers>

        </ThemeProvider>

      </body>
    </html>
  );
}
