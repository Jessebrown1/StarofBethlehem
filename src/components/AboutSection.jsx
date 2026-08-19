import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, revealImageClip, parallaxImage } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./AboutSection.css";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const listRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const secondaryWrapperRef = useRef(null);
  const secondaryImageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(eyebrowRef.current, { trigger: sectionRef.current });
      revealUp(headingRef.current, { trigger: sectionRef.current, delay: 0.1 });
      revealUp(paraRef.current, { trigger: sectionRef.current, delay: 0.2 });
      revealUp(listRef.current, { trigger: sectionRef.current, delay: 0.3 });

      revealImageClip(imageWrapperRef.current, imageRef.current, { direction: "left" });
      revealImageClip(secondaryWrapperRef.current, secondaryImageRef.current, {
        direction: "bottom",
        start: "top 85%",
      });
      parallaxImage(imageRef.current, { distance: 30, trigger: sectionRef.current });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section section" ref={sectionRef}>
      <div className="container about-inner">
        <div className="about-copy">
          <span className="eyebrow" ref={eyebrowRef}>
            About Us
          </span>
          <h2 className="section-heading" ref={headingRef}>
            Excellence in Education.
            <br />
            <span className="accent">Values for Life.</span>
          </h2>
          <p className="section-lede" ref={paraRef}>
            For over a decade, Star of Bethlehem International School has provided a nurturing,
            academically rigorous environment where students grow into confident, principled
            leaders. Our approach blends a globally-minded curriculum with strong Ghanaian
            values.
          </p>
          <ul className="about-list" ref={listRef}>
            <li>Internationally benchmarked curriculum</li>
            <li>Experienced, dedicated faculty</li>
            <li>Modern classrooms and laboratories</li>
            <li>A vibrant, values-driven community</li>
          </ul>
        </div>

        <div className="about-media">
          <div className="about-image-primary" ref={imageWrapperRef}>
            <img
              ref={imageRef}
              src={IMAGES.aboutClassroom}
              alt="Teacher guiding students in a modern classroom at Star of Bethlehem International School"
              loading="lazy"
            />
          </div>
          <div className="about-image-secondary" ref={secondaryWrapperRef}>
            <img
              ref={secondaryImageRef}
              src={IMAGES.aboutCampus}
              alt="Green landscaped campus grounds of Star of Bethlehem International School"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
