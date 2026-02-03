"use client";

import { motion } from "framer-motion";
import { ContactSection } from "../contact/ContactSection";
import { Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-background relative overflow-hidden">
      
      {/* --- 1. FONDO CONSISTENTE (Restaurado) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
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
           {/* Contenedor con efecto Glassmorphism para el formulario */}
           <div className="rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl p-6 md:p-10 shadow-2xl shadow-primary/5">
              <ContactSection />
           </div>
        </motion.div>

      </div>
    </section>
  );
}