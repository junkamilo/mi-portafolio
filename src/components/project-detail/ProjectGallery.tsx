"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./animations";

interface GalleryItem {
  url: string;
  caption?: string;
}

interface ProjectGalleryProps {
  gallery?: GalleryItem[];
}

export const ProjectGallery = ({ gallery }: ProjectGalleryProps) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {/* Título adaptable */}
      <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Interfaz y Detalles
      </h3>
      
      <div className="space-y-12">
        {gallery.map((img, i) => (
          <div
            key={i}
            // Contenedor: Blanco/Zinc-900 con borde adaptable
            className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-lg bg-white dark:bg-zinc-900 transition-colors duration-300"
          >
            <img 
              src={img.url} 
              alt={img.caption || "Project screenshot"} 
              className="w-full h-auto" 
            />
            
            {img.caption && (
              // Barra de caption: Fondo translúcido adaptable (Blanco vs Negro)
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium text-center">
                  {img.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};