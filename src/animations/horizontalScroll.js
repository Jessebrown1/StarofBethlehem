import { gsap, ScrollTrigger } from "./gsapSetup";

/**
 * Pins `sectionEl` and translates `trackEl` horizontally by exactly the
 * distance needed to reveal its full scrollWidth, computed live so it works
 * at any viewport size. Returns the ScrollTrigger instance for cleanup.
 */
export function createHorizontalScroll(sectionEl, trackEl, { scrub = 1 } = {}) {
  if (!sectionEl || !trackEl) return null;

  const getDistance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

  const tween = gsap.to(trackEl, {
    x: () => -getDistance(),
    ease: "none",
  });

  const st = ScrollTrigger.create({
    trigger: sectionEl,
    start: "top top",
    end: () => `+=${getDistance()}`,
    pin: true,
    scrub,
    invalidateOnRefresh: true,
    animation: tween,
  });

  return st;
}
