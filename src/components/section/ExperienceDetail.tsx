"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Building2,
  Award,
  GraduationCap,
  Briefcase,
  FileCheck,
  FolderGit2,
  CheckCircle2,
  MapPin,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { experienceData, ExperienceItem } from "@/src/config/experience-certificado-data";

// --- HELPERS ---
const getIcon = (type: ExperienceItem["type"]) => {
  switch (type) {
    case "education": return GraduationCap;
    case "work": return Briefcase;
    case "course": return Award;
    default: return Briefcase;
  }
};

const getTypeLabel = (type: ExperienceItem["type"]) => {
  switch (type) {
    case "education": return "Educación";
    case "work": return "Experiencia Laboral";
    case "course": return "Certificación";
    default: return "Experiencia";
  }
};

const getTypeColor = (type: ExperienceItem["type"]) => {
  switch (type) {
    case "education": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    case "work": return "text-green-500 bg-green-500/10 border-green-500/20";
    case "course": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
    default: return "text-primary bg-primary/10 border-primary/20";
  }
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const ExperienceDetail = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : params?.slug?.[0]; // Manejo seguro de slug
  const router = useRouter(); // Usamos router para navegación programática si es necesario
  const experience = experienceData.find((exp) => exp.slug === slug);

  // Scroll Progress para efectos visuales (Opcional pero cool)
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-20, 0]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Experiencia no encontrada</h1>
          <p className="text-muted-foreground">Parece que esta entrada no existe.</p>
          <Button asChild variant="outline">
            <Link href="/#experiencia">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Experiencia
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = getIcon(experience.type);
  const typeStyles = getTypeColor(experience.type);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 pb-20">
      
      {/* --- HEADER FLOTANTE (STICKY) --- */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-4 left-0 right-0 z-50 pointer-events-none px-4"
      >
        <div className="container mx-auto flex justify-between items-center">
            <div className="pointer-events-auto">
                <Button asChild variant="secondary" size="sm" className="rounded-full shadow-lg backdrop-blur-md bg-background/80 border border-border">
                    <Link href="/#experiencia">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Link>
                </Button>
            </div>
            {/* Opcional: Título pequeño al hacer scroll */}
            <div className="hidden md:block pointer-events-auto bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border shadow-lg text-sm font-medium">
                {experience.title}
            </div>
             <div className="w-20" /> {/* Spacer para equilibrar */}
        </div>
      </motion.header>


      <main className="container mx-auto px-4 pt-12 md:pt-20">

        {/* --- HERO SECTION --- */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-16"
        >
          {/* Breadcrumbs / Meta Info */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
            <Link href="/#experiencia" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${typeStyles}`}>
              <Icon size={16} />
              <span>{getTypeLabel(experience.type)}</span>
            </div>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar size={14} /> {experience.period}
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            {experience.title}
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-lg text-muted-foreground border-l-4 border-primary/20 pl-4">
             <div className="flex items-center gap-2">
                <Building2 className="text-primary h-5 w-5" />
                <span className="font-semibold text-foreground">{experience.organization}</span>
             </div>
          </motion.div>
        </motion.div>


        {/* --- LAYOUT ASIMÉTRICO (Sticky Sidebar) --- */}
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* COLUMNA IZQUIERDA: CONTENIDO PRINCIPAL (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
                
                {/* Short Description */}
                <motion.section 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                    className="text-xl leading-relaxed text-foreground/90 font-medium"
                >
                    {experience.shortDescription}
                </motion.section>

                 {/* Certificado (Imagen Principal) */}
                 {experience.certificateImage && (
                    <motion.section 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                        className="relative group rounded-2xl overflow-hidden border border-border shadow-lg"
                    >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                             <Button variant="secondary" size="sm" className="gap-2">
                                <ExternalLink size={16} /> Ver en tamaño completo
                             </Button>
                         </div>
                        <img 
                            src={experience.certificateImage} 
                            alt={`Certificado ${experience.title}`} 
                            className="w-full h-auto object-cover"
                        />
                    </motion.section>
                )}

                {/* Descripción Completa */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FileCheck className="text-primary" /> Detalles y Logros
                    </h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                        {experience.fullDescription.split('\n\n').map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </motion.section>

                 {/* Proyectos Relacionados */}
                 {experience.projects && experience.projects.length > 0 && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FolderGit2 className="text-primary" /> Proyectos Clave
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {experience.projects.map((project, i) => (
                                <Card key={i} className="group hover:border-primary/50 transition-colors h-full flex flex-col">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                            {project.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col">
                                        <CardDescription className="mb-4 flex-grow">
                                            {project.description}
                                        </CardDescription>
                                        <div className="flex gap-2 pt-2 mt-auto">
                                            {project.repoUrl && (
                                                <Button variant="outline" size="sm" asChild className="w-full">
                                                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                                                        <Github className="mr-2 h-3 w-3" /> Code
                                                    </a>
                                                </Button>
                                            )}
                                            {project.demoUrl && (
                                                <Button variant="secondary" size="sm" asChild className="w-full">
                                                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                                                        <ExternalLink className="mr-2 h-3 w-3" /> Demo
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Galería Adicional */}
                {experience.gallery && experience.gallery.length > 0 && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h3 className="text-2xl font-bold mb-6">Evidencia Visual</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {experience.gallery.map((img, i) => (
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
                )}

            </div>


            {/* COLUMNA DERECHA: SIDEBAR (4 cols) */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-24 space-y-8">
                    
                    {/* Card de Acciones */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 bg-card border border-border rounded-2xl shadow-sm"
                    >
                        <h4 className="font-semibold mb-4 text-foreground">Recursos</h4>
                        <div className="space-y-3">
                             {experience.certificateUrl && (
                                <Button className="w-full shadow-md" size="lg" asChild>
                                    <a href={experience.certificateUrl} target="_blank" rel="noreferrer">
                                        <FileCheck className="mr-2 h-4 w-4" /> Ver Certificado Oficial
                                    </a>
                                </Button>
                            )}
                            {experience.repoUrl && (
                                <Button variant="outline" className="w-full" size="lg" asChild>
                                    <a href={experience.repoUrl} target="_blank" rel="noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> Repositorio General
                                    </a>
                                </Button>
                            )}
                             {/* Botón de descarga (simulado o real si tienes el PDF) */}
                             {experience.certificateUrl && (
                                 <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" size="sm" asChild>
                                    <a href={experience.certificateUrl} download target="_blank" rel="noreferrer">
                                        <Download className="mr-2 h-4 w-4" /> Descargar Copia
                                    </a>
                                </Button>
                             )}
                        </div>
                    </motion.div>

                    {/* Skills Adquiridas */}
                    {experience.skills && experience.skills.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <Award className="h-4 w-4 text-primary" /> Habilidades Clave
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {experience.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="px-3 py-1.5">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Meta Info Adicional (Opcional) */}
                     <div className="pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center italic">
                            "Validado y completado en {experience.period}"
                        </p>
                    </div>

                </div>
            </div>

        </div>

      </main>
    </div>
  );
};

export default ExperienceDetail;