import { motion } from "framer-motion";
import { Mail, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/src/config/contact-data";
import { itemVariants } from "@/src/config/hero-data";

interface ContactInfoProps {
  hasCopied: boolean;
  onCopy: () => void;
}

export function ContactInfo({ hasCopied, onCopy }: ContactInfoProps) {
  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          ¿Hablamos?
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
          Estoy siempre abierto a discutir nuevos proyectos, ideas creativas u oportunidades.
        </p>
      </motion.div>

      {/* Email Card */}
      <motion.div variants={itemVariants}>
        <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2 text-primary font-medium">
            <Mail size={20} />
            <span>Envíame un correo</span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-background p-3 rounded-lg border border-border">
            <span className="text-foreground font-mono text-sm sm:text-base truncate">
              {CONTACT_EMAIL}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={onCopy}
              className="shrink-0 hover:bg-secondary"
            >
              {hasCopied ? (
                <CheckCircle2 size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div variants={itemVariants} className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Sígueme en
        </p>
        <div className="flex flex-wrap gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="p-2 bg-secondary rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <social.icon size={18} />
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {social.label}
              </span>
              <ArrowRight size={16} className="-ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}