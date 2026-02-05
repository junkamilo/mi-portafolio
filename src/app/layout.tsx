import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/section/Providers";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../components/themeProvider/theme-provider";

export const metadata: Metadata = {
  title: "Dev Juan Beltran",
  description: "Portafolio profesional de Desarrollo Full Stack",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/* Aquí solo renderizamos children (el contenido de la página) */}
            {children}

            {/* El Toaster sí debe ir aquí para que funcione en todas partes */}
            <Toaster />
          </Providers>

        </ThemeProvider>

      </body>
    </html>
  );
}
