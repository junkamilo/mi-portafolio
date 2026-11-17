"use client";

import { useEffect } from "react";

const CYCLE_MS = 1400;

// Bicho más detallado: élitros, tórax, ojos cian y patas — alineado con BugGame
const BUG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <defs>
    <radialGradient id="body" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="55%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#5b21b6"/>
    </radialGradient>
    <radialGradient id="head" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ede9fe"/>
      <stop offset="60%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </radialGradient>
  </defs>
  <!-- Patas -->
  <g fill="none" stroke="#22d3ee" stroke-width="1.4" stroke-linecap="round">
    <path d="M11 12 L5 9 M11 16 L4 16 M11 20 L5.5 24"/>
    <path d="M21 12 L27 9 M21 16 L28 16 M21 20 L26.5 24"/>
  </g>
  <!-- Abdomen -->
  <ellipse cx="16" cy="19.5" rx="7.2" ry="8.5" fill="url(#body)" stroke="#0e0c17" stroke-width="1.1"/>
  <path d="M16 12.5 V28" fill="none" stroke="#0e0c17" stroke-width="0.85"/>
  <path d="M12.5 15 Q14 22 13 26.5" fill="none" stroke="#c4b5fd" stroke-opacity="0.4" stroke-width="0.7"/>
  <path d="M19.5 15 Q18 22 19 26.5" fill="none" stroke="#c4b5fd" stroke-opacity="0.4" stroke-width="0.7"/>
  <!-- Tórax -->
  <ellipse cx="16" cy="12.2" rx="4.6" ry="4.2" fill="url(#head)" stroke="#0e0c17" stroke-width="1"/>
  <!-- Cabeza -->
  <circle cx="16" cy="7.2" r="3.5" fill="url(#head)" stroke="#0e0c17" stroke-width="1"/>
  <!-- Ojos -->
  <circle cx="14.4" cy="6.6" r="1.15" fill="#0e0c17"/>
  <circle cx="17.6" cy="6.6" r="1.15" fill="#0e0c17"/>
  <circle cx="14.65" cy="6.5" r="0.45" fill="#22d3ee"/>
  <circle cx="17.85" cy="6.5" r="0.45" fill="#22d3ee"/>
  <!-- Antenas -->
  <g fill="none" stroke="#c4b5fd" stroke-width="1.1" stroke-linecap="round">
    <path d="M14.2 4.8 Q12 2.2 10.5 1.5"/>
    <path d="M17.8 4.8 Q20 2.2 21.5 1.5"/>
  </g>
  <circle cx="10.5" cy="1.5" r="1" fill="#22d3ee"/>
  <circle cx="21.5" cy="1.5" r="1" fill="#22d3ee"/>
</svg>`;

const codeSvg = (symbol: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
<text x="16" y="20.5" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="12" font-weight="700" fill="#fff" stroke="#000" stroke-width="2.4" paint-order="stroke">${symbol}</text>
</svg>`;

const toCursor = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, auto`;

const FRAMES = [
  BUG_SVG,
  codeSvg("&lt;/&gt;"),
  codeSvg("{ }"),
  codeSvg("=&gt;"),
  codeSvg("01"),
].map(toCursor);

export function BugCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    let i = 0;
    root.style.setProperty("--bug-cursor", FRAMES[i]);

    const id = window.setInterval(() => {
      i = (i + 1) % FRAMES.length;
      root.style.setProperty("--bug-cursor", FRAMES[i]);
    }, CYCLE_MS);

    return () => {
      window.clearInterval(id);
      root.style.removeProperty("--bug-cursor");
    };
  }, []);

  return null;
}
