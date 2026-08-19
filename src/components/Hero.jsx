import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { splitLines } from "../animations/scrollAnimations";
import { playHeroTimeline } from "../animations/heroAnimations";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import { IMAGES } from "../data/images";
import "./Hero.css";

export default function Hero() {
  const { openModal } = useApplicationModal();
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const decorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headingLines = splitLines(headingRef.current);
      const buttons = gsap.utils.toArray(buttonsRef.current.children);

      playHeroTimeline({
        eyebrow: eyebrowRef.current,
        headingLines,
        description: descriptionRef.current,
        buttons,
        imageWrapper: imageWrapperRef.current,
        image: imageRef.current,
        decor: decorRef.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow" ref={eyebrowRef}>
            Star of Bethlehem 
          </span>
          <h1 className="hero-heading" ref={headingRef}>
            {"Raising Purposeful\nLeaders Through\nQuality Education."}
          </h1>
          <p className="hero-description" ref={descriptionRef}>
            A premier international school in Ghana cultivating dynamic learning, holistic
            development, and academic excellence within a safe, inspiring campus.
          </p>
          <div className="hero-buttons" ref={buttonsRef}>
            <button type="button" className="btn btn-primary" onClick={openModal}>
              Apply Now
            </button>
            <a href="#about" className="btn btn-outline">
              Discover More
            </a>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-image-wrapper" ref={imageWrapperRef}>
            <img
              ref={imageRef}
              className="hero-image"
              src={IMAGES.heroStudents}
              alt="Students of Star of Bethlehem International School in their school uniform on campus"
            />
          </div>
          <div className="hero-decor glass" ref={decorRef}>
            <span className="hero-decor-stat">100%</span>
            <span className="hero-decor-copy">
              <span className="hero-decor-label">JHS Placement</span>
              <span className="hero-decor-eyebrow">Est. Excellence</span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
