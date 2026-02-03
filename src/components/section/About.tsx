"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { containerVariants, itemVariants } from "@/src/config/hero-data";
import { ABOUT_DATA } from "@/src/config/about-data";
import { Terminal, CheckCircle2 } from "lucide-react";

export default function About() {
  const targetRef = useRef(null);
  
  // Hook para animar la línea de tiempo basada en el scroll de esta sección
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  // La altura de la línea crece de 0% a 100%
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="sobre-mi" className="py-24 relative overflow-hidden bg-background">
      {/* Fondo sutil de puntos (Dot Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          
          {/* --- COLUMNA IZQUIERDA: Timeline Narrativo --- */}
          <div className="space-y-10" ref={targetRef}>
            
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {ABOUT_DATA.title}
              </h2>
              <p className="text-xl text-primary font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                {ABOUT_DATA.subtitle}
              </p>
            </motion.div>

            {/* Timeline Vertical Animado */}
            <div className="relative pl-8 md:pl-10 space-y-12">
              
              {/* La Línea Gris de fondo (Guía) */}
              <div className="absolute left-[9px] top-2 bottom-0 w-[2px] bg-border/50" />
              
              {/* La Línea de Color que se dibuja al hacer Scroll */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[9px] top-2 w-[2px] bg-gradient-to-b from-primary via-purple-500 to-transparent origin-top"
              />

              {ABOUT_DATA.timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Icono Flotante */}
                  <div className="absolute -left-[49px] md:-left-[51px] top-0 bg-background p-1.5 rounded-full border border-border group-hover:border-primary/50 transition-colors z-10 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                      <item.icon size={16} />
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cierre tipo Terminal */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-xl overflow-hidden border border-border/60 bg-[#0f1117] shadow-2xl"
            >
              {/* Barra de título de terminal */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs text-muted-foreground font-mono">bash — developer</span>
              </div>
              
              {/* Contenido Terminal */}
              <div className="p-5 font-mono text-sm md:text-base space-y-3">
                <div className="flex gap-2 text-green-400">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span>{ABOUT_DATA.conclusion.cmd}</span>
                </div>
                <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-primary/30">
                  {`"${ABOUT_DATA.conclusion.output}"`}
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="w-2 h-5 bg-gray-500 animate-pulse block"></span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* --- COLUMNA DERECHA: Métricas Modernas --- */}
          <div className="relative">
             {/* Decoración de fondo */}
             <div className="absolute -right-10 -top-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] -z-10 opacity-60"></div>

             <motion.div
               variants={containerVariants}
               className="grid grid-cols-2 gap-5"
             >
               {ABOUT_DATA.stats.map((stat, index) => (
                 <motion.div
                   key={index}
                   variants={itemVariants}
                   whileHover={{ y: -5 }}
                   className={`
                      group relative p-6 rounded-2xl bg-card border border-border/50 
                      hover:border-opacity-100 transition-all duration-300 overflow-hidden
                      ${stat.border}
                   `}
                 >
                   {/* Fondo degradado sutil al hover */}
                   <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.bg} blur-xl`} />

                   <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      <div className={`p-3 rounded-xl bg-background border border-border shadow-sm group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                        <stat.icon size={28} strokeWidth={1.5} />
                      </div>
                      
                      <div>
                        <h4 className="text-3xl font-bold tracking-tight text-foreground">
                          {stat.value}
                        </h4>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">
                          {stat.label}
                        </p>
                      </div>
                   </div>
                 </motion.div>
               ))}
             </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
