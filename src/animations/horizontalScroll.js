import { gsap, ScrollTrigger } from "./gsapSetup";

/**
 * Pins `sectionEl` and translates `trackEl` horizontally by exactly the
 * distance needed to reveal its full scrollWidth, computed live so it works
 * at any viewport size. Returns the ScrollTrigger instance for cleanup.
 */
export function createHorizontalScroll(sectionEl, trackEl, { scrub = 0.3 } = {}) {
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
    // Scrolling fast into a pin can otherwise produce a visible jump: by
    // the time the next scroll-driven recalculation runs, the page may
    // already be well past the pin's start point. anticipatePin engages
    // the pin a little early (in proportion to recent scroll velocity) so
    // it catches up smoothly instead of snapping.
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: tween,
  });

  return st;
}
