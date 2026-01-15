"use client"

import { WORK_EXPERIENCE, EDUCATION } from "@/src/config/experience-data";
import { containerVariants, itemVariants } from "@/src/config/hero-data";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, MapPin } from "lucide-react";

export default function Experience() {
    return (
        <section id="experiencia" className="py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Trayectoria Profesional
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Mi camino en la industria tecnológica, combinando experiencia práctica con formación académica continua.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* COLUMNA IZQUIERDA (2/3): EXPERIENCIA LABORAL */}
                    <div className="lg:col-span-2">
                        <h3 className="flex items-center gap-2 text-2xl font-bold mb-8 text-foreground">
                            <Briefcase className="text-primary" /> Experiencia Laboral
                        </h3>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-8 relative border-l-2 border-border ml-3 pl-8 md:ml-4 md:pl-12"
                        >
                            {WORK_EXPERIENCE.map((job) => (
                                <motion.div key={job.id} variants={itemVariants} className="relative group">

                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] md:-left-[57px] top-0 h-6 w-6 rounded-full border-4 border-background bg-primary shadow-sm z-10 group-hover:scale-125 transition-transform duration-300" />

                                    {/* Tarjeta de Trabajo */}
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                        <h4 className="text-xl font-bold text-foreground">{job.role}</h4>
                                        <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full mt-2 sm:mt-0 w-fit">
                                            {job.period}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="font-semibold text-foreground/80 flex items-center gap-1">
                                            <Briefcase size={14} /> {job.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> {job.location}
                                        </span>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {job.description}
                                    </p>

                                    {/* Skills usadas en este trabajo (Muy importante para ATS) */}
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill) => (
                                            <span key={skill} className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded border border-border/50">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* COLUMNA DERECHA (1/3): EDUCACIÓN (Sticky) */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <h3 className="flex items-center gap-2 text-2xl font-bold mb-8 text-foreground">
                                <GraduationCap className="text-primary" /> Educación
                            </h3>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                {EDUCATION.map((edu) => (
                                    <motion.div
                                        key={edu.id}
                                        variants={itemVariants}
                                        className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className={`p-2 rounded-lg ${edu.type === 'degree' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                                                {edu.type === 'degree' ? <GraduationCap size={20} /> : <Award size={20} />}
                                            </div>
                                            <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-1 rounded">
                                                {edu.period}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-foreground mb-1">
                                            {edu.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {edu.institution}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
