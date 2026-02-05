"use client";

import { motion } from "framer-motion";
import { FileCheck, Github, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExperienceSidebarProps {
  experience: {
    certificateUrl?: string;
    repoUrl?: string;
    skills?: string[];
    period: string;
  };
}

export const ExperienceSidebar = ({ experience }: ExperienceSidebarProps) => {
  return (
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

        {/* Meta Info Adicional */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center italic">
            "Validado y completado en {experience.period}"
          </p>
        </div>

      </div>
    </div>
  );
};