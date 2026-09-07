import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../animations/gsapSetup";
import "./BackToTopButton.css";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const iconRef = useRef(null);

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: window.innerHeight,
      end: 99999,
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => st.kill();
  }, []);

  function scrollToTop() {
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0);
      return;
    }

    // A little graduation-cap toss — thrown up and caught again — timed to
    // the moment the page starts scrolling up, so the icon's motion echoes
    // what the button just did.
    gsap
      .timeline()
      .to(iconRef.current, { y: -9, rotate: -22, scale: 1.12, duration: 0.26, ease: "power2.out" })
      .to(iconRef.current, { y: 0, rotate: 0, scale: 1, duration: 0.55, ease: "elastic.out(1, 0.55)" });

    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power3.inOut" });
  }

  return (
    <button
      type="button"
      className={`back-to-top-button${visible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <span className="back-to-top-icon">
        <svg
          ref={iconRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.4 9.6 12 5l9.6 4.6-9.6 4.6-9.6-4.6Z" />
          <path d="M6.4 11.6v4.2c0 1.5 2.5 3 5.6 3s5.6-1.5 5.6-3v-4.2" />
          <path d="M21.6 9.6v6" />
        </svg>
      </span>
    </button>
  );
}
