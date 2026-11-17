"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const SCRIPT = [
  {
    cmd: "whoami",
    out: "Juan Beltrán — Desarrollador Full Stack & QA Automation Engineer",
  },
  {
    cmd: "cat stack.txt",
    out: "React · Next.js · NestJS · Spring Boot · PostgreSQL · Docker",
  },
  { cmd: "npm run test", out: "✓ Todas las pruebas pasaron" },
  {
    cmd: "echo $PROPUESTA_VALOR",
    out: "Frontend, backend y QA en un solo perfil. Escribo el código, lo pruebo y lo dejo listo para producción.",
  },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(SCRIPT.length);
      return;
    }
  }, [inView]);

  useEffect(() => {
    if (!inView || step >= SCRIPT.length) return;
    const cmd = SCRIPT[step].cmd;
    let t: ReturnType<typeof setTimeout>;
    if (chars < cmd.length) t = setTimeout(() => setChars((c) => c + 1), 45);
    else if (!showOut) t = setTimeout(() => setShowOut(true), 250);
    else
      t = setTimeout(() => {
        setStep((s) => s + 1);
        setChars(0);
        setShowOut(false);
      }, 550);
    return () => clearTimeout(t);
  }, [inView, step, chars, showOut]);

  const lines = [
    ...SCRIPT.slice(0, step),
    ...(step < SCRIPT.length && inView
      ? [
          {
            cmd: SCRIPT[step].cmd.slice(0, chars),
            out: showOut ? SCRIPT[step].out : undefined,
          },
        ]
      : step >= SCRIPT.length
        ? []
        : []),
  ];

  const displayLines =
    step >= SCRIPT.length
      ? SCRIPT.map((l) => ({ cmd: l.cmd, out: l.out }))
      : lines;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-black/60 font-mono text-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2">
        <span className="size-3 rounded-full bg-red-500/80" />
        <span className="size-3 rounded-full bg-yellow-500/80" />
        <span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-white/40">bash — juan@portafolio</span>
      </div>
      <div
        className="min-h-[190px] space-y-2 p-4"
        aria-label="Terminal con mi presentación"
      >
        {displayLines.map((l, i) => (
          <div key={i}>
            <p>
              <span className="text-neon-400">❯</span> {l.cmd}
            </p>
            {l.out && <p className="text-brand-300">{l.out}</p>}
          </div>
        ))}
        {step < SCRIPT.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-white/70 align-middle" />
        )}
      </div>
    </div>
  );
}
