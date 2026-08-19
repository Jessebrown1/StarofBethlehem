import { gsap, prefersReducedMotion } from "./gsapSetup";

/**
 * Handles smooth scrolling for in-page anchor links via GSAP instead of
 * native CSS `scroll-behavior: smooth`. The native property fights with
 * ScrollTrigger's pinned sections (competing scroll animations produce
 * stutter/jumpiness), so anchor navigation is handled here instead.
 */
export function initSmoothAnchorScroll() {
  function handleClick(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    if (prefersReducedMotion()) {
      target.scrollIntoView();
      return;
    }

    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: target, offsetY: 96 },
      ease: "power3.inOut",
    });
  }

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}
