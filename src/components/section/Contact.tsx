"use client";

import { motion } from "framer-motion";
import { ContactSection } from "../contact/ContactSection";
import { Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <section 
      id="contacto" 
      // CAMBIO 1: Fondo adaptable (Blanco día / Zinc Negro noche)
      className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300"
    >
      
      {/* --- 1. FONDO CONSISTENTE --- */}
      {/* CAMBIO 2: Grid adaptable (Gris en día / Blanco sutil en noche) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glow inferior centrado */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* --- 3. SOLO CONTACT SECTION (Centrado) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl mx-auto"
        >
           {/* Contenedor Glassmorphism Adaptable */}
           {/* CAMBIO 3: Fondo blanco translúcido en día / Oscuro translúcido en noche */}
           <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-6 md:p-10 shadow-2xl shadow-primary/5">
              <ContactSection />
           </div>
        </motion.div>

      </div>
    </section>
  );
}