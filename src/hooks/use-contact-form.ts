"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CONTACT_EMAIL } from "../config/contact-data";


interface FormData {
  name: string;
  email: string;
  message: string;
}

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Lógica de Copiar Email
  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setHasCopied(true);
    toast.success("Email copiado al portapapeles");
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Lógica de Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lógica de Envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulación de API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("¡Mensaje enviado con éxito!", {
        description: "Gracias por escribirme. Te responderé a la brevedad.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Hubo un error al enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    hasCopied,
    handleChange,
    handleSubmit,
    copyEmail,
  };
}