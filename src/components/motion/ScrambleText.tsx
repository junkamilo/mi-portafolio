"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEF0123456789#<>/_{}";

export function ScrambleText({
  text,
  className,
  delay = 300,
  speed = 3,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let raf = 0;
    let start: number | undefined;

    const tick = (now: number) => {
      start ??= now;
      if (now - start < delay) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const revealed = Math.floor(frame / speed);
      setOut(
        text
          .split("")
          .map((ch, i) =>
            i < revealed || ch === " "
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="font-[inherit] tabular-nums">
        {out}
      </span>
    </span>
  );
}
