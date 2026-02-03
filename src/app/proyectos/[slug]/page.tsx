"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, Variants } from "framer-motion"; // Importamos Variants
import { 
  ArrowLeft, 
  Github, 
  Database, 
  Server, 
  Globe, 
  Rocket,
  Layers,
  CheckCircle2,
  Cpu,
  AlertTriangle,
  Calendar,
  User,
  CreditCard // Agregado si lo usas
} from "lucide-react";

import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/src/config/projects-data"; 

// Variantes tipadas correctamente para evitar errores de TS
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
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
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
             <AlertTriangle className="text-muted-foreground" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Proyecto no encontrado</h1>
          <p className="text-muted-foreground">Parece que este proyecto no existe o fue movido.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/#proyectos">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al portafolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 relative overflow-hidden">
      
      {/* --- 1. FONDO CONSISTENTE (Innovación Visual) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      
      {/* --- HEADER FLOTANTE --- */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-4 z-50 px-4 md:px-0 pointer-events-none"
      >
        <div className="container mx-auto">
          <Link
            href="/#proyectos"
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all text-sm font-medium text-foreground group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver
          </Link>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 pb-20 pt-8 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center gap-3 mb-6">
            <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 bg-primary/5 text-primary shadow-sm">
              {project.category}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm text-muted-foreground bg-background/50">
              {project.date}
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            {project.title}
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {project.shortDescription}
          </motion.p>
        </motion.div>

        {/* --- IMAGEN HERO (Mejorada con sombra y borde) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-24 group max-w-6xl mx-auto"
        >
          {/* Efecto Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
          
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-card ring-1 ring-white/10">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>


        {/* --- LAYOUT PRINCIPAL --- */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* COLUMNA IZQUIERDA: CONTENIDO (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Descripción Profunda */}
            <motion.section 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-border/40 pb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Layers size={20} /></div>
                Sobre el Proyecto
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-loose">
                {project.fullDescription.split('\n\n').map((p, i) => (
                  <p key={i} className="mb-4 last:mb-0">{p}</p>
                ))}
              </div>
            </motion.section>

            {/* Características */}
            {project.features && (
              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                   <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle2 size={20} /></div>
                   Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all">
                      <div className="mt-1 p-1 bg-primary/10 rounded-full text-primary shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-foreground/90 font-medium text-sm leading-snug">{feature}</span>
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
                className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8 shadow-sm relative overflow-hidden"
              >
                {/* Icono de fondo decorativo */}
                <AlertTriangle className="absolute -right-6 -top-6 text-orange-500/10 h-32 w-32 rotate-12" />
                
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 relative z-10">
                  <AlertTriangle size={20} /> Desafío Técnico
                </h3>
                <p className="text-muted-foreground leading-relaxed italic relative z-10">
                  "{project.challenges}"
                </p>
              </motion.section>
            )}

            {/* Galería */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-8">Interfaz y Detalles</h3>
                <div className="space-y-12">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
                      <img src={img.url} alt={img.caption} className="w-full h-auto" />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/50">
                          <p className="text-foreground text-sm font-medium text-center">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>


          {/* COLUMNA DERECHA: SIDEBAR FLOTANTE (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              
              {/* Card de Acciones (CTA) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  {project.demoNote && (
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 leading-snug flex gap-2">
                      <Server className="h-4 w-4 shrink-0 mt-0.5" />
                      {project.demoNote}
                    </div>
                  )}
                  
                  {project.links?.demo && (
                    <Button asChild size="lg" className="w-full font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all">
                      <a href={project.links.demo} target="_blank" rel="noreferrer">
                        <Rocket className="mr-2 h-4 w-4" /> Ver Demo en Vivo
                      </a>
                    </Button>
                  )}
                  
                  {project.links?.github && (
                    <Button variant="outline" size="lg" asChild className="w-full hover:bg-secondary">
                      <a href={project.links.github} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Ver Repositorio
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Stack Tecnológico */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-foreground/80">
                  <Cpu className="h-4 w-4" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm font-normal border border-border/50 bg-background hover:border-primary/40 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Infraestructura Visual */}
              {project.infrastructure && (
                <div className="space-y-4 pt-6 border-t border-border/50">
                  <h4 className="font-semibold flex items-center gap-2 text-foreground/80">
                    <Server className="h-4 w-4" /> Infraestructura
                  </h4>
                  <div className="space-y-3 pl-2">
                    {project.infrastructure.frontend && (
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Globe size={14} /></div>
                        <span className="text-muted-foreground">Front: <strong className="text-foreground">{project.infrastructure.frontend}</strong></span>
                      </div>
                    )}
                    {project.infrastructure.backend && (
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors"><Database size={14} /></div>
                        <span className="text-muted-foreground">Back: <strong className="text-foreground">{project.infrastructure.backend}</strong></span>
                      </div>
                    )}
                    {project.infrastructure.database && (
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="p-1.5 rounded-md bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Server size={14} /></div>
                        <span className="text-muted-foreground">DB: <strong className="text-foreground">{project.infrastructure.database}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Rol</span>
                  <div className="font-medium flex items-center gap-1.5"><User size={14} className="text-primary/70"/> {project.role}</div>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Año</span>
                  <div className="font-medium flex items-center gap-1.5"><Calendar size={14} className="text-primary/70"/> {project.date}</div>
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