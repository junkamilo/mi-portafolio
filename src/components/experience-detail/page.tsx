"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { experienceData } from "@/src/config/experience-certificado-data";
import { ExperienceContent } from "./ExperienceContent";
import { ExperienceGallery } from "./ExperienceGallery";
import { ExperienceHeader } from "./ExperienceHeader";
import { ExperienceHero } from "./ExperienceHero";
import { ExperienceRelatedProjects } from "./ExperienceRelatedProjects";
import { ExperienceSidebar } from "./ExperienceSidebar";

const ExperienceDetail = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : params?.slug?.[0];
  const experience = experienceData.find((exp) => exp.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!experience) {
    return (
      // CAMBIO: Fondo y textos adaptables para la pantalla de error
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experiencia no encontrada</h1>
          <p className="text-gray-500 dark:text-gray-400">Parece que esta entrada no existe.</p>
          <Button asChild variant="outline" className="dark:border-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-800">
            <Link href="/#experiencia">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Experiencia
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      // CAMBIO 1: Fondo principal adaptable (Blanco vs Zinc-950)
      className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-primary/20 pb-20 relative overflow-hidden transition-colors duration-300"
    >
      
      {/* CAMBIO 2: Fondo Sutil (Grid adaptable) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      
      <ExperienceHeader title={experience.title} />

      {/* Importante: relative z-10 para que el contenido quede SOBRE las líneas de fondo */}
      <main className="container mx-auto px-4 pt-12 md:pt-20 relative z-10">
        
        <ExperienceHero experience={experience} />

        {/* LAYOUT PRINCIPAL */}
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* COLUMNA IZQUIERDA (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            <ExperienceContent 
              shortDescription={experience.shortDescription}
              fullDescription={experience.fullDescription}
              certificateImage={experience.certificateImage}
              title={experience.title}
            />

            <ExperienceRelatedProjects projects={experience.projects} />

            <ExperienceGallery gallery={experience.gallery} />

          </div>

          {/* COLUMNA DERECHA (4 cols) */}
          <ExperienceSidebar experience={experience} />

        </div>

      </main>
    </div>
  );
};

export default ExperienceDetail;