import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { staggerReveal } from "../animations/scrollAnimations";
import "./ValuesSection.css";

const VALUES = [
  {
    icon: "◆",
    title: "Dynamic Learning",
    description: "An engaging, modern curriculum that nurtures curiosity and critical thinking.",
  },
  {
    icon: "✦",
    title: "Holistic Development",
    description: "Nurturing mind, character, and talent through academics, sports, and the arts.",
  },
  {
    icon: "◈",
    title: "Safe & Secure Campus",
    description: "A protected, nurturing environment where every child can thrive with confidence.",
  },
  {
    icon: "❖",
    title: "Excellence Driven",
    description: "A relentless pursuit of academic and personal excellence in everything we do.",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      staggerReveal(cardsRef.current, { trigger: sectionRef.current });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="values-section section" ref={sectionRef} aria-label="Our core values">
      <div className="container">
        <div className="values-grid">
          {VALUES.map((value, i) => (
            <div className="value-card" key={value.title} ref={(el) => (cardsRef.current[i] = el)}>
              <span className="value-icon" aria-hidden="true">
                {value.icon}
              </span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
