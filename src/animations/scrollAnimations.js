import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsapSetup";

/**
 * A "once" scroll-triggered reveal starts hidden (opacity: 0, offset) and
 * only becomes visible once GSAP's ticker interpolates it to completion. On
 * a stalled tab (heavily throttled/backgrounded, a very low-power device)
 * that interpolation can stop partway, leaving real content permanently
 * invisible instead of just delayed. Once the reveal has actually started
 * (onEnter fired), this forces it to its end state after a grace period if
 * it hasn't finished on its own — a safety net, not the primary path.
 */
function guardAgainstStall(tween, ms = 2200) {
  const id = setTimeout(() => {
    if (tween.progress() < 1) tween.progress(1);
  }, ms);
  tween.eventCallback("onComplete", () => clearTimeout(id));
}

/**
 * Fade + translateY reveal for a single element as it enters the viewport.
 */
export function revealUp(el, { trigger, y = 40, duration = 1, delay = 0, start = "top 80%" } = {}) {
  if (!el) return null;
  const reduced = prefersReducedMotion();

  const tween = gsap.from(el, {
    opacity: 0,
    y: reduced ? 0 : y,
    duration: reduced ? 0.4 : duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger || el,
      start,
      once: true,
      onEnter: () => guardAgainstStall(tween),
    },
  });
  return tween;
}

/**
 * Staggered reveal for a group of children (cards, list items, etc).
 */
export function staggerReveal(elements, { trigger, y = 36, duration = 0.9, stagger = 0.12, start = "top 80%" } = {}) {
  if (!elements || !elements.length) return null;
  const reduced = prefersReducedMotion();

  const tween = gsap.from(elements, {
    opacity: 0,
    y: reduced ? 0 : y,
    duration: reduced ? 0.4 : duration,
    stagger: reduced ? 0.04 : stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger || elements[0],
      start,
      once: true,
      onEnter: () => guardAgainstStall(tween),
    },
  });
  return tween;
}

/**
 * Line-by-line heading reveal. Expects the element's children to already be
 * split into line wrappers (see splitLines below).
 */
export function revealLines(lines, { trigger, start = "top 85%", stagger = 0.14 } = {}) {
  if (!lines || !lines.length) return null;
  const reduced = prefersReducedMotion();

  const tween = gsap.from(lines, {
    yPercent: reduced ? 0 : 110,
    opacity: reduced ? 0 : 1,
    duration: reduced ? 0.4 : 1,
    stagger,
    ease: "power4.out",
    scrollTrigger: {
      trigger: trigger || lines[0],
      start,
      once: true,
      onEnter: () => guardAgainstStall(tween),
    },
  });
  return tween;
}

/**
 * Clip-path image reveal, optionally paired with a subtle scale-down.
 */
export function revealImageClip(wrapper, img, { direction = "left", start = "top 80%", duration = 1.3 } = {}) {
  if (!wrapper) return null;
  const reduced = prefersReducedMotion();

  const clipFrom =
    direction === "left" ? "inset(0 100% 0 0)" : direction === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start,
      once: true,
      onEnter: () => guardAgainstStall(tl),
    },
  });

  if (reduced) {
    tl.from(wrapper, { opacity: 0, duration: 0.4 });
    return tl;
  }

  tl.fromTo(wrapper, { clipPath: clipFrom, webkitClipPath: clipFrom }, {
    clipPath: "inset(0 0% 0 0)",
    webkitClipPath: "inset(0 0% 0 0)",
    duration,
    ease: "expo.out",
  });

  if (img) {
    tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration, ease: "expo.out" }, "<");
  }

  return tl;
}

/**
 * Subtle vertical parallax for an image within an overflow-hidden wrapper.
 */
export function parallaxImage(el, { distance = 40, trigger } = {}) {
  if (!el || prefersReducedMotion()) return null;

  return gsap.fromTo(
    el,
    { yPercent: -distance / 4 },
    {
      yPercent: distance / 4,
      ease: "none",
      scrollTrigger: {
        trigger: trigger || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

/**
 * Animates a numeric counter from 0 to its target when it enters the viewport.
 */
export function animateCounter(el, { target, suffix = "", duration = 2, start = "top 85%" } = {}) {
  if (!el) return null;

  if (prefersReducedMotion()) {
    el.textContent = `${target}${suffix}`;
    return null;
  }

  const counter = { value: 0 };
  return gsap.to(counter, {
    value: target,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start,
      once: true,
    },
    onUpdate: () => {
      el.textContent = `${Math.round(counter.value)}${suffix}`;
    },
  });
}

/**
 * Splits an element's text into line-wrapped spans for line-reveal animation.
 * Returns the created line elements. Call inside gsap.context for cleanup.
 */
export function splitLines(el) {
  if (!el) return [];
  // Cache the pristine text on first run: React 18 StrictMode double-invokes
  // effects in dev, and a second split would otherwise read back the
  // already-mutated (concatenated) DOM instead of the original line breaks.
  if (el.dataset.originalText === undefined) {
    el.dataset.originalText = el.textContent;
  }
  const text = el.dataset.originalText;
  const parts = text.split("\n").map((s) => s.trim()).filter(Boolean);

  el.innerHTML = "";
  const lineEls = parts.map((part) => {
    const outer = document.createElement("span");
    outer.style.display = "block";
    outer.style.overflow = "hidden";

    const inner = document.createElement("span");
    inner.style.display = "block";
    inner.textContent = part;

    outer.appendChild(inner);
    el.appendChild(outer);
    return inner;
  });

  return lineEls;
}

export { ScrollTrigger };
