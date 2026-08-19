import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import { IMAGES } from "../data/images";
import "./AdmissionsCTA.css";

const BENEFITS = ["Rolling admissions year-round", "Flexible scholarship options", "Dedicated admissions counselors"];

export default function AdmissionsCTA() {
  const { openModal } = useApplicationModal();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const benefitsRef = useRef([]);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      revealUp(headingRef.current, { trigger: sectionRef.current, delay: 0.1 });
      revealUp(textRef.current, { trigger: sectionRef.current, delay: 0.25 });
      staggerReveal(benefitsRef.current, { trigger: sectionRef.current, y: 20 });
      revealUp(buttonRef.current, { trigger: sectionRef.current, delay: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="admissions" className="admissions-cta section" ref={sectionRef}>
      <img className="admissions-bg" src={IMAGES.admissionsBg} alt="" aria-hidden="true" loading="lazy" />
      <div className="admissions-overlay" />

      <div className="container admissions-content">
        <span className="eyebrow eyebrow--light">Admissions Open</span>
        <h2 className="section-heading" ref={headingRef}>
          Begin Your Child&rsquo;s Journey to Excellence
        </h2>
        <p ref={textRef}>
          Join a community dedicated to raising purposeful leaders. Our admissions team is ready
          to guide your family through every step of the process.
        </p>

        <ul className="admissions-benefits">
          {BENEFITS.map((benefit, i) => (
            <li key={benefit} ref={(el) => (benefitsRef.current[i] = el)}>
              {benefit}
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn-light" ref={buttonRef} onClick={openModal}>
          Apply Now
        </button>
      </div>
    </section>
  );
}
