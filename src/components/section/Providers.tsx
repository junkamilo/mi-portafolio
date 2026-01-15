"use client"; // 👈 Esto es obligatorio aquí

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Creamos el cliente de Query una sola vez
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}