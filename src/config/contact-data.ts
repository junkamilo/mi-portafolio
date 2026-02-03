import { Linkedin, Github } from "lucide-react";

export const SOCIAL_LINKS = [
  {
    name: "linkedin", // ID único
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-camilo-beltr%C3%A1n-campo-4aa1b3202/?trk=public-profile-join-page",
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

export const CONTACT_EMAIL = "juancamilo.campobarrios@gmail.com";