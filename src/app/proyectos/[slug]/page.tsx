"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
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
} from "lucide-react";

import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/src/config/projects-data"; 

// Variantes de animación
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <AlertTriangle className="text-gray-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Proyecto no encontrado</h1>
          <p className="text-gray-500">Parece que este proyecto no existe o fue movido.</p>
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
    <div className="min-h-screen bg-white selection:bg-gray-100 relative overflow-hidden">
      
      {/* Fondo Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      
      {/* HEADER FLOTANTE */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-4 z-50 px-4 md:px-0 pointer-events-none"
      >
        <div className="container mx-auto">
          <Link
            href="/#proyectos"
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-sm font-medium text-gray-700 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver
          </Link>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 pb-20 pt-8 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center gap-3 mb-6">
            <Badge variant="outline" className="px-3 py-1 text-sm border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
              {project.category}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm text-gray-500 border-gray-200 bg-white">
              {project.date}
            </Badge>
          </motion.div>
          
          {/* CAMBIO 1: TÍTULO SÓLIDO (Sin gradientes cortados) */}
          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight pb-2" // pb-2 extra para asegurar que no se corte abajo
          >
            {project.title}
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {project.shortDescription}
          </motion.p>
        </motion.div>

        {/* IMAGEN HERO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-24 group max-w-6xl mx-auto"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-50">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>


        {/* LAYOUT PRINCIPAL */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* COLUMNA IZQUIERDA: CONTENIDO */}
          <div className="lg:col-span-8 space-y-16">
            
            <motion.section 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-gray-100 pb-2 text-gray-900">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Layers size={20} /></div>
                Sobre el Proyecto
              </h3>
              <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
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
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                   <div className="p-2 bg-green-50 rounded-lg text-green-600"><CheckCircle2 size={20} /></div>
                   Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-purple-200 transition-all">
                      <div className="mt-1 p-1 bg-purple-50 rounded-full text-purple-600 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-gray-700 font-medium text-sm leading-snug">{feature}</span>
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
                className="bg-orange-50 border border-orange-100 rounded-2xl p-8 shadow-sm relative overflow-hidden"
              >
                <AlertTriangle className="absolute -right-6 -top-6 text-orange-100 h-32 w-32 rotate-12" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-700 relative z-10">
                  <AlertTriangle size={20} /> Desafío Técnico
                </h3>
                <p className="text-orange-800/80 leading-relaxed italic relative z-10">
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
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Interfaz y Detalles</h3>
                <div className="space-y-12">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
                      <img src={img.url} alt={img.caption} className="w-full h-auto" />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100">
                          <p className="text-gray-800 text-sm font-medium text-center">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>


          {/* COLUMNA DERECHA: SIDEBAR FLOTANTE */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              
              {/* Card de Acciones (CTA) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  {project.demoNote && (
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700 leading-snug flex gap-2">
                      <Server className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                      {project.demoNote}
                    </div>
                  )}
                  
                  {/* CAMBIO 2: Botón Ver Demo NEGRO SÓLIDO */}
                  {project.links?.demo && (
                    <Button asChild size="lg" className="w-full font-semibold shadow-md bg-black text-white hover:bg-gray-800 transition-all border-0">
                      <a href={project.links.demo} target="_blank" rel="noreferrer">
                        <Rocket className="mr-2 h-4 w-4" /> Ver Demo en Vivo
                      </a>
                    </Button>
                  )}
                  
                  {/* CAMBIO 3: Botón Repo BLANCO CON BORDE */}
                  {project.links?.github && (
                    <Button variant="outline" size="lg" asChild className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black">
                      <a href={project.links.github} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Ver Repositorio
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Stack Tecnológico */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-gray-700">
                  <Cpu className="h-4 w-4" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm font-normal border border-gray-200 bg-gray-50 text-gray-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Infraestructura Visual */}
              {project.infrastructure && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold flex items-center gap-2 text-gray-700">
                    <Server className="h-4 w-4" /> Infraestructura
                  </h4>
                  <div className="space-y-3 pl-2">
                    {project.infrastructure.frontend && (
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="p-1.5 rounded-md bg-blue-50 text-blue-500"><Globe size={14} /></div>
                        <span className="text-gray-500">Front: <strong className="text-gray-900">{project.infrastructure.frontend}</strong></span>
                      </div>
                    )}
                    {project.infrastructure.backend && (
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="p-1.5 rounded-md bg-purple-50 text-purple-500"><Database size={14} /></div>
                        <span className="text-gray-500">Back: <strong className="text-gray-900">{project.infrastructure.backend}</strong></span>
                      </div>
                    )}
                    {project.infrastructure.database && (
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="p-1.5 rounded-md bg-orange-50 text-orange-500"><Server size={14} /></div>
                        <span className="text-gray-500">DB: <strong className="text-gray-900">{project.infrastructure.database}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">Rol</span>
                  <div className="font-medium text-gray-900 flex items-center gap-1.5"><User size={14} className="text-purple-500"/> {project.role}</div>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">Año</span>
                  <div className="font-medium text-gray-900 flex items-center gap-1.5"><Calendar size={14} className="text-purple-500"/> {project.date}</div>
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