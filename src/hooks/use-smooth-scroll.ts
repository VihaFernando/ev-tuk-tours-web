import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const headerH =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
    const lenis = new Lenis({ lerp: 0.11, autoRaf: true, anchors: { offset: -headerH } });
    return () => lenis.destroy();
  }, []);
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/** Reduced-motion preference that stays false until mount, so SSR and hydration markup match. */
export function useReduceMotion() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
