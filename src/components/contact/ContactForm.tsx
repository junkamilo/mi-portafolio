import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Definimos la interfaz de props para tipado estricto
interface ContactFormProps {
  formData: { name: string; email: string; message: string };
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({ formData, isSubmitting, onChange, onSubmit }: ContactFormProps) {
  return (
    <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      
      <form onSubmit={onSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Nombre</label>
            <Input
              id="name"
              name="name"
              placeholder="Juan Pérez"
              required
              value={formData.name}
              onChange={onChange}
              className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hola@ejemplo.com"
              required
              value={formData.email}
              onChange={onChange}
              className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">Mensaje</label>
          <Textarea
            id="message"
            name="message"
            placeholder="Cuéntame sobre tu proyecto..."
            required
            rows={6}
            value={formData.message}
            onChange={onChange}
            className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 resize-none transition-all"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Enviar mensaje <Send size={18} />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}