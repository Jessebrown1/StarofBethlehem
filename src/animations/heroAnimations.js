import { gsap, prefersReducedMotion } from "./gsapSetup";

/**
 * Cinematic page-load sequence for the hero. Expects an object of refs:
 * { nav, eyebrow, headingLines, description, buttons, imageWrapper, image, decor }
 */
export function playHeroTimeline(refs) {
  const reduced = prefersReducedMotion();
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (reduced) {
    tl.set(
      [
        refs.nav,
        refs.eyebrow,
        refs.headingLines,
        refs.description,
        refs.buttons,
        refs.imageWrapper,
        refs.decor,
      ].filter(Boolean),
      { opacity: 1, clearProps: "all" }
    );
    return tl;
  }

  if (refs.nav) {
    tl.from(refs.nav, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
  }

  if (refs.eyebrow) {
    tl.from(refs.eyebrow, { opacity: 0, y: 16, duration: 0.5 }, 0.35);
  }

  if (refs.headingLines?.length) {
    tl.from(
      refs.headingLines,
      { yPercent: 110, duration: 0.8, stagger: 0.14, ease: "expo.out" },
      0.5
    );
  }

  if (refs.description) {
    tl.from(refs.description, { opacity: 0, y: 24, duration: 0.6 }, 0.95);
  }

  if (refs.buttons?.length) {
    tl.from(refs.buttons, { opacity: 0, y: 18, duration: 0.5, stagger: 0.1 }, 1.15);
  }

  if (refs.imageWrapper) {
    const clipFrom = "inset(0 0 0 100%)";
    tl.fromTo(
      refs.imageWrapper,
      { clipPath: clipFrom, webkitClipPath: clipFrom },
      { clipPath: "inset(0 0 0 0%)", webkitClipPath: "inset(0 0 0 0%)", duration: 1.2, ease: "expo.out" },
      0.7
    );
  }

  if (refs.image) {
    tl.fromTo(refs.image, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.7);
  }

  if (refs.decor) {
    tl.from(refs.decor, { opacity: 0, y: 20, duration: 0.7 }, 1.5);
  }

  return tl;
}
