"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  Calendar, 
  User, 
  Tag,
  Database, 
  Server, 
  Globe, 
  Rocket,
  Layers,
  CheckCircle2,
  Cpu
} from "lucide-react";

import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/src/config/projects-data"; 

// Variantes de animación para consistencia
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const ProjectDetail = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : params?.slug?.[0];
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Proyecto no encontrado</h1>
          <p className="text-muted-foreground">Parece que este proyecto no existe o fue movido.</p>
          <Button asChild variant="outline">
            <Link href="/#proyectos">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al portafolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      
      {/* --- HEADER FLOTANTE MINIMALISTA --- */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-4 z-50 px-4 md:px-0 pointer-events-none"
      >
        <div className="container mx-auto">
          <Link
            href="/#proyectos"
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all text-sm font-medium text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 pb-20 pt-8">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center gap-3 mb-6">
            <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 bg-primary/5 text-primary">
              {project.category}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm text-muted-foreground">
              {project.date}
            </Badge>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            {project.title}
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {project.shortDescription}
          </motion.p>
        </motion.div>

        {/* --- IMAGEN HERO "CINEMÁTICA" --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mb-20 group"
        >
          {/* Efecto Glow detrás de la imagen */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-card">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>


        {/* --- LAYOUT "STICKY SPLIT" --- */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* COLUMNA IZQUIERDA: CONTENIDO NARRATIVO (8 columnas) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Descripción Profunda */}
            <motion.section 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Layers className="text-primary" /> Sobre el Proyecto
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                {project.fullDescription.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.section>

            {/* Características (Grid Bento) */}
            {project.features && (
              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                      <div className="mt-1 p-1 bg-primary/10 rounded-full text-primary">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-foreground/90 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Retos Técnicos */}
            {project.challenges && (
              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-500">
                  ⚠️ El mayor desafío
                </h3>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{project.challenges}"
                </p>
              </motion.section>
            )}

            {/* Galería Estilo Masonry/Grid */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-6">Interfaz y Detalles</h3>
                <div className="grid gap-6">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden border border-border">
                      <img src={img.url} alt={img.caption} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-sm font-medium">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>


          {/* COLUMNA DERECHA: SIDEBAR FLOTANTE (4 columnas) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              
              {/* Card de Acciones (CTA) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-card border border-border rounded-2xl shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  {project.links?.demo && (
                    <Button asChild size="lg" className="w-full font-semibold shadow-md shadow-primary/20">
                      <a href={project.links.demo} target="_blank" rel="noreferrer">
                        <Rocket className="mr-2 h-4 w-4" /> Ver Demo en Vivo
                      </a>
                    </Button>
                  )}
                  {project.links?.github && (
                    <Button variant="outline" size="lg" asChild className="w-full">
                      <a href={project.links.github} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Ver Repositorio
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Stack Tecnológico */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Cpu className="h-4 w-4" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Infraestructura (Visual Vertical) */}
              {project.infrastructure && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Server className="h-4 w-4" /> Infraestructura
                  </h4>
                  <div className="space-y-3">
                    {project.infrastructure.frontend && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span>Front: <strong className="text-foreground">{project.infrastructure.frontend}</strong></span>
                      </div>
                    )}
                    {project.infrastructure.backend && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Database className="h-4 w-4 text-purple-500" />
                        <span>Back: <strong className="text-foreground">{project.infrastructure.backend}</strong></span>
                      </div>
                    )}
                    {project.infrastructure.database && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Server className="h-4 w-4 text-orange-500" />
                        <span>DB: <strong className="text-foreground">{project.infrastructure.database}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">Rol</span>
                  <span className="font-medium">{project.role}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider">Año</span>
                  <span className="font-medium">{project.date}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;