"use client"

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/src/config/hero-data";
import { ABOUT_DATA } from "@/src/config/about-data";

export default function About() {
  return (
    <section id="sobre-mi" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* --- COLUMNA IZQUIERDA: TEXTO NARRATIVO --- */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {ABOUT_DATA.title}
              </h2>
              <p className="text-xl text-primary font-medium">
                {ABOUT_DATA.subtitle}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              {ABOUT_DATA.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Decoración visual (opcional: firma o frase) */}
            <motion.div variants={itemVariants} className="pt-4 border-l-4 border-primary pl-4">
              <p className="italic text-foreground/80 font-medium">
                "El software es el arte de crear soluciones invisibles para problemas visibles."
              </p>
            </motion.div>
          </div>

          {/* --- COLUMNA DERECHA: BENTO GRID DE MÉTRICAS --- */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {ABOUT_DATA.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }} // Pequeño efecto hover
                className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center justify-center space-y-3 group"
              >
                {/* Icono con fondo de color dinámico */}
                <div className={`p-3 rounded-full ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} />
                </div>
                
                {/* Valor numérico grande */}
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </h3>
                
                {/* Etiqueta */}
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
