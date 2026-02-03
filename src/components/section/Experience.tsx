"use client";

import { WORK_EXPERIENCE, EDUCATION } from "@/src/config/experience-data";
import { containerVariants, itemVariants } from "@/src/config/hero-data";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, MapPin, Calendar, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Experience() {
    return (
        <section id="experiencia" className="py-24 bg-background relative overflow-hidden">

            {/* --- 1. FONDO CONSISTENTE (Restaurado) --- */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">

                {/* --- 3. HEADER INNOVADOR CON BADGE Y ANIMACIÓN --- */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-24">

                    {/* --- 2. TÍTULO Y DESCRIPCIÓN --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2">
                            Trayectoria <span className="text-primary">Profesional</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                            Un recorrido a través de mi experiencia práctica en la industria y mi constante evolución académica para construir software de valor.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* --- COLUMNA IZQUIERDA (7/12): EXPERIENCIA LABORAL --- */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-10"
                        >
                            <div className="p-2.5 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20 shadow-lg shadow-primary/5">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold">Experiencia Laboral</h3>
                        </motion.div>

                        {/* Timeline Container */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative border-l-2 border-border/40 ml-3 md:ml-4 space-y-12 pb-4"
                        >
                            {WORK_EXPERIENCE.map((job) => (
                                <motion.div key={job.id} variants={itemVariants} className="relative pl-8 md:pl-12 group">

                                    {/* Timeline Dot Interactivo */}
                                    <span className="absolute -left-[9px] top-2 h-[18px] w-[18px] rounded-full border-[3px] border-background bg-muted-foreground/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 shadow-sm z-10"></span>

                                    {/* Card de Experiencia */}
                                    <div className="relative bg-card/40 backdrop-blur-sm border border-border/50 p-6 md:p-7 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group-hover:bg-card">

                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                    {job.role}
                                                </h4>
                                                <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                                                    <span className="flex items-center gap-1.5">
                                                        <Briefcase size={14} className="text-primary/70" />
                                                        {job.company}
                                                    </span>
                                                    <span className="text-muted-foreground">•</span>
                                                    <span className="text-muted-foreground">{job.location}</span>
                                                </div>
                                            </div>

                                            <div className="shrink-0">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                                    <Calendar size={12} />
                                                    {job.period}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                                            {job.description}
                                        </p>

                                        {/* Skills Tags */}
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                                            {job.skills.map((skill) => (
                                                <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground border border-border/40 hover:border-primary/30 transition-colors">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* --- COLUMNA DERECHA (5/12): EDUCACIÓN (Sticky & ScrollArea) --- */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-24">

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <div className="p-2.5 bg-green-500/10 rounded-xl text-green-600 ring-1 ring-green-500/20 dark:text-green-400 shadow-lg shadow-green-500/5">
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="text-2xl font-bold">Educación & Certificaciones</h3>
                            </motion.div>

                            {/* CONTENEDOR DECORATIVO DE LA LISTA */}
                            <div className="relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm overflow-hidden">

                                {/* Gradientes para indicar scroll (opcional, visualmente agradable) */}
                                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

                                {/* --- 2. USO DE SCROLLAREA DE SHADCN --- */}
                                <ScrollArea className="h-[600px] w-full px-4 py-4">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="space-y-3 pr-3 pb-2 pt-2"
                                    >
                                        {EDUCATION.map((edu) => (
                                            <motion.div
                                                key={edu.id}
                                                variants={itemVariants}
                                                className={`
                            group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5
                            ${edu.type === 'degree'
                                                        ? 'border-l-4 border-l-blue-500 border-y-border/50 border-r-border/50 bg-blue-50/5 dark:bg-blue-900/10'
                                                        : 'border-border/50 hover:border-green-500/30'}
                          `}
                                            >
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {edu.type === 'degree'
                                                                ? <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-sm">Grado</span>
                                                                : <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-sm">Certificado</span>
                                                            }
                                                            <span className="text-[11px] text-muted-foreground font-mono">{edu.period}</span>
                                                        </div>

                                                        <h4 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                                                            {edu.title}
                                                        </h4>

                                                        <p className="text-xs text-muted-foreground font-medium">
                                                            {edu.institution}
                                                        </p>
                                                    </div>

                                                    {/* Botón de acción */}
                                                    {edu.slug && (
                                                        <Link href={`/experience/${edu.slug}`} className="shrink-0 mt-1">
                                                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                                                                <ChevronRight size={16} />
                                                            </div>
                                                        </Link>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </ScrollArea>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
