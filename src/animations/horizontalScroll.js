import { gsap, ScrollTrigger } from "./gsapSetup";

/**
 * Horizontal-scroll-via-vertical-scroll, built on a sticky viewport instead
 * of ScrollTrigger's `pin`. `pin` works by toggling `position: fixed` (and
 * inserting/removing a spacer) in direct response to scroll events; on
 * Safari that can race with trackpad momentum scrolling — the browser's
 * own momentum delivers scroll deltas after the pin has already changed
 * the layout underneath them, and the two disagree about where the page
 * actually is, which can make scrolling stop responding until the
 * discrepancy clears. `position: sticky` produces the same "stays in
 * place while its tall parent scrolls past" effect natively, with zero JS
 * involved in positioning — Safari can't desync from its own scroll
 * engine. GSAP is left with exactly one job here: translate the track
 * horizontally in proportion to scroll progress through the wrapper.
 *
 * `wrapperEl` must be the tall ancestor (its height is set here to 100vh
 * plus however far the track needs to travel); `viewportEl` is the sticky
 * `position: sticky; top: 0; height: 100vh; overflow: hidden` element
 * inside it; `trackEl` is the flex row that gets translated.
 */
export function createHorizontalScroll(wrapperEl, viewportEl, trackEl, { scrub = 0.3 } = {}) {
  if (!wrapperEl || !viewportEl || !trackEl) return null;

  const getDistance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

  function setWrapperHeight() {
    wrapperEl.style.height = `calc(100vh + ${getDistance()}px)`;
  }
  setWrapperHeight();

  const tween = gsap.to(trackEl, {
    x: () => -getDistance(),
    ease: "none",
  });

  const st = ScrollTrigger.create({
    trigger: wrapperEl,
    start: "top top",
    end: () => `+=${getDistance()}`,
    scrub,
    invalidateOnRefresh: true,
    animation: tween,
    // Runs before ScrollTrigger measures positions on refresh, so the
    // wrapper's real height already matches getDistance() by the time it
    // calculates start/end — otherwise the two could briefly disagree
    // right after a resize or image-load-triggered refresh.
    onRefreshInit: setWrapperHeight,
  });

  return st;
}
