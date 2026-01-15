"use client"

import { containerVariants } from "@/src/config/hero-data";
import { SKILL_CATEGORIES, cardVariants } from "@/src/config/skills-data";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">

        {/* Encabezado de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Mi Stack Tecnológico
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un conjunto de herramientas modernas que utilizo para construir soluciones digitales robustas y escalables.
          </p>
        </motion.div>

        {/* Grid de Categorías */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -5 }} // Efecto de elevación al pasar el mouse
              className="group p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              {/* Encabezado de la Tarjeta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <category.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Lista de Skills (Badges) */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground border border-transparent hover:border-primary/30 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decoración de fondo sutil (Opcional) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 -z-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />

      </div>
    </section>
  );
}