"use client";

import { motion } from "framer-motion";
import { FolderGit2, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp } from "./animations";

interface Project {
  title: string;
  description: string;
  repoUrl?: string;
  demoUrl?: string;
}

interface ExperienceRelatedProjectsProps {
  projects?: Project[];
}

export const ExperienceRelatedProjects = ({ projects }: ExperienceRelatedProjectsProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FolderGit2 className="text-primary" /> Proyectos Clave
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
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
  );
};