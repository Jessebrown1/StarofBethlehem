import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealLines, revealUp, revealImageClip, splitLines } from "../animations/scrollAnimations";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import { IMAGES } from "../data/images";
import "./FinalCTA.css";

export default function FinalCTA() {
  const { openModal } = useApplicationModal();
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealImageClip(imageWrapperRef.current, imageRef.current, { direction: "bottom", duration: 1.4 });
      const lines = splitLines(headingRef.current);
      revealLines(lines, { trigger: sectionRef.current, start: "top 70%" });
      revealUp(textRef.current, { trigger: sectionRef.current, delay: 0.2 });
      revealUp(buttonsRef.current, { trigger: sectionRef.current, delay: 0.35 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta" ref={sectionRef}>
      <div className="final-cta-image" ref={imageWrapperRef}>
        <img ref={imageRef} src={IMAGES.finalCTA} alt="Campus of Star of Bethlehem International School" loading="lazy" />
      </div>
      <div className="final-cta-overlay" />

      <div className="container final-cta-content">
        <h2 className="final-cta-heading" ref={headingRef}>
          {"Building the\nLeaders of Tomorrow."}
        </h2>
        <p ref={textRef}>
          Give your child the foundation for a purposeful future. Discover life at Star of
          Bethlehem International School.
        </p>
        <div className="final-cta-buttons" ref={buttonsRef}>
          <button type="button" className="btn btn-light" onClick={openModal}>
            Apply Now
          </button>
          <a href="#contact" className="btn btn-ghost-light">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
