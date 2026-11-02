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
  const buttonsRef = useRef(null);
  const visualRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current, delay: 0.1 });
      revealUp(textRef.current, { trigger: sectionRef.current, delay: 0.25 });
      staggerReveal(benefitsRef.current, { trigger: sectionRef.current, y: 20 });
      revealUp(buttonsRef.current, { trigger: sectionRef.current, delay: 0.5 });
      revealUp(visualRef.current, { trigger: sectionRef.current, y: 60, delay: 0.2, duration: 1.2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="admissions" className="admissions-cta section" ref={sectionRef}>
      <img className="admissions-bg" src={IMAGES.admissionsBg} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="admissions-overlay" />

      <div className="container admissions-layout">
        <div className="admissions-content">
          <span className="admissions-pill">
            <span className="admissions-pulse" aria-hidden="true" />
            Admissions Open
          </span>
          <h2 className="section-heading" ref={headingRef}>
            Begin Your Child&rsquo;s Journey to <span className="admissions-accent">Excellence</span>
          </h2>
          <p ref={textRef}>
            Join a community dedicated to raising purposeful leaders. Our admissions team is ready
            to guide your family through every step of the process.
          </p>

          <ul className="admissions-benefits">
            {BENEFITS.map((benefit, i) => (
              <li key={benefit} ref={(el) => (benefitsRef.current[i] = el)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="admissions-buttons" ref={buttonsRef}>
            <button type="button" className="btn btn-light" onClick={openModal}>
              Apply Now
            </button>
            <a href="#contact" className="admissions-link">
              Have a question? Talk to us
            </a>
          </div>
        </div>

        <div className="admissions-visual" ref={visualRef}>
          <div className="admissions-arch">
            <img src={IMAGES.admissionsPhoto} alt="Proud graduates with their families and teachers" loading="lazy" decoding="async" />
          </div>

          <svg className="admissions-seal" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="admissions-seal-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
            </defs>
            <circle cx="60" cy="60" r="58" className="admissions-seal-bg" />
            <text className="admissions-seal-text">
              <textPath href="#admissions-seal-circle">NOW ENROLLING • NOW ENROLLING • </textPath>
            </text>
            <g transform="translate(36 36) scale(2)" className="admissions-seal-cap">
              <path d="M2.4 9.6 12 5l9.6 4.6-9.6 4.6-9.6-4.6Z" />
              <path d="M6.4 11.6v4.2c0 1.5 2.5 3 5.6 3s5.6-1.5 5.6-3v-4.2" />
              <path d="M21.6 9.6v6" />
            </g>
          </svg>

          <a href="#contact" className="admissions-card">
            <span>
              <strong>Start with a simple online form</strong>
              We&rsquo;ll guide you through the rest.
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
