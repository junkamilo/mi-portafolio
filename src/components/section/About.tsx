"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { containerVariants, itemVariants } from "@/src/config/hero-data";
import { ABOUT_DATA } from "@/src/config/about-data";

export default function About() {
  const targetRef = useRef(null);
  
  // Hook para animar la línea de tiempo
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="sobre-mi" className="py-24 relative overflow-hidden bg-white">
      {/* Fondo sutil (Gris muy suave) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
                {ABOUT_DATA.title}
              </h2>
              {/* CAMBIO 1: Color sólido Morado Oscuro para lectura perfecta */}
              <p className="text-xl font-semibold text-purple-700">
                {ABOUT_DATA.subtitle}
              </p>
            </motion.div>

            {/* Timeline Vertical Animado */}
            <div className="relative pl-8 md:pl-10 space-y-12">
              
              {/* Línea Guía Gris */}
              <div className="absolute left-[9px] top-2 bottom-0 w-[2px] bg-gray-200" />
              
              {/* Línea de Color Animada */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[9px] top-2 w-[2px] bg-purple-600 origin-top"
              />

              {ABOUT_DATA.timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Icono Flotante (Fondo blanco y borde visible) */}
                  <div className="absolute -left-[49px] md:-left-[51px] top-0 bg-white p-1.5 rounded-full border border-gray-300 z-10 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-300">
                      <item.icon size={16} />
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal (Colores sólidos oscuros) */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-xl overflow-hidden border border-gray-800 bg-[#1a1b26] shadow-2xl"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1b26] border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-400 font-mono">bash — developer</span>
              </div>
              
              <div className="p-5 font-mono text-sm md:text-base space-y-3">
                <div className="flex gap-2 text-green-400">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span>{ABOUT_DATA.conclusion.cmd}</span>
                </div>
                <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-purple-500/50">
                  {`"${ABOUT_DATA.conclusion.output}"`}
                </div>
              </div>
            </motion.div>

          </div>

          {/* --- COLUMNA DERECHA: Cards Solidas --- */}
          <div className="relative">
             
             <motion.div
               variants={containerVariants}
               className="grid grid-cols-2 gap-5"
             >
               {ABOUT_DATA.stats.map((stat, index) => (
                 <motion.div
                   key={index}
                   variants={itemVariants}
                   whileHover={{ y: -5 }}
                   // CAMBIO 2: Cards con Borde Gris Sólido, Fondo Blanco y Sombra
                   className={`
                      group relative p-6 rounded-2xl 
                      bg-white border border-gray-200 shadow-sm
                      hover:shadow-md hover:border-purple-300 
                      transition-all duration-300 overflow-hidden
                   `}
                 >
                   <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                     {/* Icono en caja gris clara */}
                     <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                       <stat.icon size={28} strokeWidth={1.5} />
                     </div>
                     
                     <div>
                       <h4 className="text-3xl font-bold tracking-tight text-gray-900">
                         {stat.value}
                       </h4>
                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">
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
