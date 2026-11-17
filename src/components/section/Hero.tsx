"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { HERO_CONTENT } from "@/src/config/hero-data";
import { CONTACT_EMAIL, CV_FILENAME, CV_URL } from "@/src/config/contact-data";
import { ScrambleText } from "@/src/components/motion/ScrambleText";
import { TypeRotator } from "@/src/components/motion/TypeRotator";
import { Magnetic } from "@/src/components/motion/Magnetic";
import { ShineButton } from "@/src/components/motion/ShineButton";
import { scaleIn } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";
import { burst } from "@/src/components/motion/ClickSpark";
import { useFinePointer } from "@/src/hooks/use-media-query";

const OrbitRing = dynamic(
  () =>
    import("@/src/components/motion/OrbitRing").then((m) => m.OrbitRing),
  { ssr: false },
);

const ROLE_WORDS = [
  "Desarrollador Full Stack",
  "QA Automation Engineer",
  "Frontend · Backend · QA",
];

function HeroPhoto() {
  const fine = useFinePointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 15,
  });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 15,
  });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const size = fine ? 440 : 300;

  return (
    <motion.div
      className="relative mx-auto aspect-square w-[300px] md:w-[440px]"
      style={{ y, scale }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.3 }}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <OrbitRing layer="back" size={size} />
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
        className="absolute left-1/2 top-1/2 z-10 size-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_0_80px_-10px_rgb(139_92_246/0.6)]"
      >
        <Image
          src={HERO_CONTENT.image}
          alt="Foto de Juan Beltrán, desarrollador Full Stack y QA"
          fill
          priority
          sizes="(max-width:768px) 180px, 260px"
          className="object-cover"
        />
      </motion.div>
      <OrbitRing layer="front" size={size} />
    </motion.div>
  );
}

export default function Hero() {
  const [isCopied, setIsCopied] = useState(false);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -60]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleCopyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 28);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-10 pt-28"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
          >
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleCopyEmail}
              className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-white/25"
            >
              <span className="live-dot size-2 rounded-full bg-live-500 text-live-500" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={isCopied ? "copied" : "badge"}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-1.5"
                >
                  {isCopied ? "¡Correo copiado!" : HERO_CONTENT.badge}
                  {isCopied ? <Check size={12} /> : <Copy size={12} className="opacity-60" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-2 text-lg text-white/60"
            >
              Hola, soy
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl"
            >
              <ScrambleText text={HERO_CONTENT.name} className="text-gradient" delay={300} />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6 text-xl font-semibold text-white/85 sm:text-2xl md:text-3xl"
            >
              <TypeRotator words={ROLE_WORDS} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mb-10 max-w-xl text-lg leading-relaxed text-white/60"
            >
              {HERO_CONTENT.description}
            </motion.p>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="show"
              custom={1}
              className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <Magnetic>
                <ShineButton onClick={() => scrollToId("proyectos")}>
                  Ver proyectos <ArrowRight className="size-4" />
                </ShineButton>
              </Magnetic>
              <Magnetic>
                <ShineButton href={CV_URL} download={CV_FILENAME} variant="glass">
                  <FileDown className="size-4" /> Descargar CV
                </ShineButton>
              </Magnetic>
              <div className="flex gap-3">
                <SocialIcon href="#contacto" label="Email" onClick={() => scrollToId("contacto")}>
                  <Mail className="size-5" />
                </SocialIcon>
                <SocialIcon href={HERO_CONTENT.social.linkedin} label="LinkedIn">
                  <Linkedin className="size-5" />
                </SocialIcon>
                <SocialIcon href={HERO_CONTENT.social.github} label="GitHub">
                  <Github className="size-5" />
                </SocialIcon>
              </div>
            </motion.div>
          </motion.div>

          <div className="order-1 flex justify-center lg:order-2">
            <HeroPhoto />
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-white/40 transition-colors hover:text-white md:flex"
        onClick={() => scrollToId("proyectos")}
        aria-label="Ir a proyectos"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="block size-1 rounded-full bg-white/70"
          />
        </div>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
  onClick,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isInternal = href.startsWith("#");
  return (
    <Magnetic strength={0.4}>
      <a
        href={href}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        aria-label={label}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className="grid size-11 place-items-center rounded-full glass text-white/70 transition hover:text-white focus-visible:text-white"
      >
        {children}
      </a>
    </Magnetic>
  );
}
