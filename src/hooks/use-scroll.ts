import { useState, useEffect } from "react";

export function useScroll(threshold = 50) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > threshold) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Agregamos el evento al montar
        window.addEventListener("scroll", handleScroll);

        // Limpiamos el evento al desmontar (Buena práctica)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return isScrolled;
}