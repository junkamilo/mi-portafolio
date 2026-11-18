import { Linkedin, Github } from "lucide-react";

export const CONTACT_EMAIL = "juancamilo.campobarrios@gmail.com";

// CV: el archivo PDF debe estar en /public con este nombre exacto.
export const CV_FILENAME = "Hoja_Vida_Juan_Beltran_Campo.pdf";
export const CV_URL = `/${CV_FILENAME}`;

export const SOCIAL_LINKS = [
  {
    name: "linkedin", // ID único
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/",
    className: "hover:text-blue-600 hover:border-blue-600/50",
  },
  {
    name: "github",
    icon: Github,
    label: "GitHub",
    href: "https://github.com/junkamilo",
    className: "hover:text-foreground hover:border-foreground",
  },
];
