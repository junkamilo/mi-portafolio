"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/src/config/projects-data";
import { ProjectHeader } from "@/src/components/project-detail/ProjectHeader";
import { ProjectHero } from "@/src/components/project-detail/ProjectHero";
import { ProjectDescription } from "@/src/components/project-detail/ProjectDescription";
import { ProjectFeatures } from "@/src/components/project-detail/ProjectFeatures";
import { ProjectChallenges } from "@/src/components/project-detail/ProjectChallenges";
import { ProjectGallery } from "@/src/components/project-detail/ProjectGallery";
import { ProjectSidebar } from "@/src/components/project-detail/ProjectSidebar";

const ProjectDetail = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : params?.slug?.[0];
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      // CAMBIO: Fondo y textos adaptables para la pantalla de error
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-gray-500 dark:text-gray-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Proyecto no encontrado</h1>
          <p className="text-gray-500 dark:text-gray-400">Parece que este proyecto no existe o fue movido.</p>
          <Button asChild variant="outline" className="mt-4 border-gray-200 dark:border-zinc-800">
            <Link href="/#proyectos">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al portafolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      // CAMBIO: Fondo principal adaptable
      className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-gray-100 dark:selection:bg-zinc-800 relative overflow-hidden transition-colors duration-300"
    >
      
      {/* Fondo Sutil (Grid adaptable) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <ProjectHeader />

      <main className="container mx-auto px-4 pb-20 pt-8 relative z-10">
        
        <ProjectHero project={project} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* COLUMNA IZQUIERDA: CONTENIDO */}
          <div className="lg:col-span-8 space-y-16">
            
            <ProjectDescription fullDescription={project.fullDescription} />

            <ProjectFeatures features={project.features} />

            <ProjectChallenges challenges={project.challenges} />

            <ProjectGallery gallery={project.gallery} />
            
          </div>

          {/* COLUMNA DERECHA: SIDEBAR */}
          <ProjectSidebar project={project} />

        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;