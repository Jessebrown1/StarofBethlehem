import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import "./ValuesSection.css";

const VALUES = [
  {
    title: "Dynamic Learning",
    description: "An engaging, modern curriculum that nurtures curiosity and critical thinking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.3C10.4 4.9 7.8 4.2 4 4.2v14.6c3.8 0 6.4.7 8 2.2 1.6-1.5 4.2-2.2 8-2.2V4.2c-3.8 0-6.4.7-8 2.1Z" />
        <path d="M12 6.3v14.7" />
      </svg>
    ),
  },
  {
    title: "Holistic Development",
    description: "Nurturing mind, character, and talent through academics, sports, and the arts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21v-9" />
        <path d="M12 12c0-4.6-3.1-7.3-7.7-7.3C4.3 9.3 7.4 12 12 12Z" />
        <path d="M12 12c0-4.6 3.1-7.3 7.7-7.3C19.7 9.3 16.6 12 12 12Z" />
      </svg>
    ),
  },
  {
    title: "Safe & Secure Campus",
    description: "A protected, nurturing environment where every child can thrive with confidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.2 4.8 6v6c0 4.8 3.1 8.6 7.2 9.8 4.1-1.2 7.2-5 7.2-9.8V6L12 3.2Z" />
        <path d="m8.7 12.2 2.2 2.2 4.4-4.4" />
      </svg>
    ),
  },
  {
    title: "Excellence Driven",
    description: "A relentless pursuit of academic and personal excellence in everything we do.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3Z" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(cardsRef.current, { trigger: sectionRef.current });
      staggerReveal(iconsRef.current, {
        trigger: sectionRef.current,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="values-section section" ref={sectionRef} aria-label="Our core values">
      <div className="container">
        <div className="values-header" ref={headingRef}>
          <span className="eyebrow">Our Core Values</span>
          <h2 className="section-heading">
            What We Stand <span className="accent">For</span>
          </h2>
        </div>

        <div className="values-grid">
          {VALUES.map((value, i) => (
            <div className="value-card" key={value.title} ref={(el) => (cardsRef.current[i] = el)}>
              <span className="value-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="value-card-header">
                <span className="value-icon" aria-hidden="true" ref={(el) => (iconsRef.current[i] = el)}>
                  {value.icon}
                </span>
                <h3>{value.title}</h3>
              </div>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
