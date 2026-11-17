import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToId(hash: string, offset = -90) {
  const target = hash.startsWith("#") ? hash : `#${hash}`;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = document.querySelector(target);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + offset,
        behavior: "smooth",
      });
    }
  }
}

export function scrollToTop() {
  if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
