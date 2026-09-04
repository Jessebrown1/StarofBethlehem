import { ScrollTrigger } from "./gsapSetup";

/**
 * Every <img> on this site is loading="lazy", and two sections (WhyChooseUs,
 * StudentLife) pin the viewport with ScrollTrigger. ScrollTrigger caches each
 * pin's start/end as absolute page-pixel offsets the first time it measures
 * the page; it only re-measures on window resize, not when a lazy image
 * finishes loading and shifts everything below it — so a pinned section's
 * trigger zone can drift out of sync with the real scroll position.
 *
 * The fix is ScrollTrigger.refresh(), but calling it mid-scroll is its own
 * problem: refresh recalculates every pin's spacer height, and doing that
 * while a scroll gesture is in flight visibly eats/stutters it. That's most
 * noticeable right after a cold page load — a whole burst of above-the-fold
 * images finish loading in the same moment the user makes their first
 * scroll. So this only schedules a refresh on image load, and keeps pushing
 * it back for as long as the page keeps scrolling, so it always lands in a
 * quiet moment instead of on top of the user's gesture.
 */
export function initScrollTriggerRefresh() {
  let timeoutId;
  let pending = false;

  function scheduleRefresh() {
    pending = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      pending = false;
      ScrollTrigger.refresh();
    }, 250);
  }

  function handleImageLoad(e) {
    const target = e.target;
    if (!target || target.tagName !== "IMG") return;
    scheduleRefresh();
  }

  function handleScroll() {
    if (pending) scheduleRefresh();
  }

  // "load" doesn't bubble, so this has to listen on the capture phase.
  document.addEventListener("load", handleImageLoad, true);
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    clearTimeout(timeoutId);
    document.removeEventListener("load", handleImageLoad, true);
    window.removeEventListener("scroll", handleScroll);
  };
}
