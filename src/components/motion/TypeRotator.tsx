"use client";

import { useEffect, useState } from "react";

export function TypeRotator({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = words[i % words.length];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((v) => v + 1);
        } else {
          setText(
            deleting
              ? full.slice(0, text.length - 1)
              : full.slice(0, text.length + 1),
          );
        }
      },
      done ? 2200 : deleting ? 35 : 65,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-brand-400">
        &nbsp;
      </span>
    </span>
  );
}
