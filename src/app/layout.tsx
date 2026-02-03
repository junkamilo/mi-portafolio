import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/section/Providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dev Juan Beltran",
  description: "Portafolio profesional de Desarrollo Full Stack",
  // 👇 AQUÍ AGREGAS LOS ICONOS
  icons: {
    icon: "/fotoPerfilHojaVida.png",        // Favicon estándar (navegadores)
    apple: "/fotoPerfilHojaVida.png",       // Icono para iPhone/iPad (Apple Touch Icon)
    shortcut: "/fotoPerfilHojaVida.png",    // Acceso directo (opcional)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Aquí solo renderizamos children (el contenido de la página) */}
          {children}

          {/* El Toaster sí debe ir aquí para que funcione en todas partes */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
