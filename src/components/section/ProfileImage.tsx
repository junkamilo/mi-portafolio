import { HERO_CONTENT } from "@/src/config/hero-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { itemVariants } from "./Contact";

export const ProfileImage = () => {
    return (
        <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center"
        >
            <div className="absolute -top-4 -left-4 w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-primary/10 -z-10 animate-pulse" />

            {/* 2. Contenedor de la Imagen */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-secondary border-4 border-background shadow-2xl overflow-hidden flex items-center justify-center">
                <Image
                    src="/FotoPerfilJuanKamilo.png" // 👈 CAMBIA ESTO POR TU FOTO
                    alt={HERO_CONTENT.name}
                    fill
                    className="object-cover"
                    priority // Carga prioritaria para el Hero
                />
            </div>
        </motion.div>
    );
}
