"use client";

import { useContactForm } from "@/src/hooks/use-contact-form";
import { motion, Variants } from "framer-motion";
import { ContactInfo } from "../contact/ContactInfo";
import { ContactForm } from "../contact/ContactForm";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
};

export default function Contact() {
  // 1. Usamos el Hook (Separation of Logic)
  const {
    formData,
    isSubmitting,
    hasCopied,
    handleChange,
    handleSubmit,
    copyEmail
  } = useContactForm();

  return (
    <section id="contacto" className="py-24 bg-background relative overflow-hidden">

      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/4" />

      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start"
        >

          {/* 2. Renderizamos los componentes "tontos" (Presentational Components) */}

          {/* Columna Izquierda */}
          <ContactInfo
            hasCopied={hasCopied}
            onCopy={copyEmail}
          />

          {/* Columna Derecha */}
          <motion.div variants={itemVariants}>
            <ContactForm
              formData={formData}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}