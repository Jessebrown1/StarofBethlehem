import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealLines, revealUp, revealImageClip, splitLines } from "../animations/scrollAnimations";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import { IMAGES } from "../data/images";
import "./FinalCTA.css";

const WHATSAPP_URL = "https://wa.me/233240000000?text=" + encodeURIComponent("Hello! I'd like to know more about Star of Bethlehem International School.");

export default function FinalCTA() {
  const { openModal } = useApplicationModal();
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const stripRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealImageClip(imageWrapperRef.current, imageRef.current, { direction: "bottom", duration: 1.4 });
      const lines = splitLines(headingRef.current);
      revealLines(lines, { trigger: sectionRef.current, start: "top 70%" });
      revealUp(textRef.current, { trigger: sectionRef.current, delay: 0.2 });
      revealUp(buttonsRef.current, { trigger: sectionRef.current, delay: 0.35 });
      revealUp(stripRef.current, { trigger: sectionRef.current, delay: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta" ref={sectionRef}>
      <div className="final-cta-image" ref={imageWrapperRef}>
        <img ref={imageRef} src={IMAGES.finalCTA} alt="Graduating class of Star of Bethlehem International School" loading="lazy" decoding="async" />
      </div>

      <div className="container final-cta-content">
        <div className="final-cta-main">
          <span className="final-cta-kicker">Admissions Open</span>
          <h2 className="final-cta-heading" ref={headingRef}>
            {"Building the\nLeaders of Tomorrow."}
          </h2>
          <p ref={textRef}>
            Give your child the foundation for a purposeful future. Discover life at Star of
            Bethlehem International School.
          </p>
          <div className="final-cta-buttons" ref={buttonsRef}>
            <button type="button" className="final-cta-primary" onClick={openModal}>
              Apply Now
              <span aria-hidden="true">&rarr;</span>
            </button>
            <a href="#contact" className="final-cta-secondary">
              Contact Us
            </a>
          </div>
        </div>

        <ul className="final-cta-strip" ref={stripRef}>
          <li>
            <button type="button" onClick={openModal}>
              <span className="final-cta-strip-num">01</span>
              <strong>Apply online</strong>
              <span>Takes only a few minutes</span>
            </button>
          </li>
          <li>
            <a href="#contact">
              <span className="final-cta-strip-num">02</span>
              <strong>Visit the campus</strong>
              <span>Meet our teachers in person</span>
            </a>
          </li>
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span className="final-cta-strip-num">03</span>
              <strong>Chat on WhatsApp</strong>
              <span>Get answers right away</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
