"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./animations";

interface GalleryItem {
  url: string;
  caption?: string;
}

interface ExperienceGalleryProps {
  gallery?: GalleryItem[];
}

export const ExperienceGallery = ({ gallery }: ExperienceGalleryProps) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
      <h3 className="text-2xl font-bold mb-6">Evidencia Visual</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
            <img
              src={img.url}
              alt={img.caption || "Galería"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {img.caption && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                <span className="text-white text-xs font-medium">{img.caption}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};