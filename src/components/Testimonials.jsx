import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import "./Testimonials.css";

// Placeholder quotes and names — swap for real parents (with their
// permission) before launch.
const TESTIMONIALS = [
  {
    quote:
      "My daughter used to hide behind me whenever visitors came to the house. Last term she stood up at assembly and read a poem, no paper, head high. I was crying at the back like a fool.",
    name: "Mrs. Abena Owusu",
    role: "Mother of a Primary 4 pupil",
  },
  {
    quote:
      "His teacher called me on a Tuesday evening just to say he had finally understood fractions. Who does that? He did well in his BECE, but that phone call is what I remember.",
    name: "Mr. Kwame Mensah",
    role: "Father of a JHS graduate",
  },
  {
    quote:
      "I have two children here. Mornings are calmer now, they know their teachers by name, and they come home telling me about their day without me asking.",
    name: "Mrs. Efua Asante",
    role: "Mother of two pupils",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(cardsRef.current, { trigger: sectionRef.current, y: 30 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [featured, ...others] = TESTIMONIALS;

  return (
    <section className="testimonials-section section" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-header" ref={headingRef}>
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-heading">
            What <span className="accent">Parents Say</span>
          </h2>
        </div>

        <div className="testimonials-layout">
          <figure className="testimonial-featured" ref={(el) => (cardsRef.current[0] = el)}>
            <span className="testimonial-bigmark" aria-hidden="true">
              &ldquo;
            </span>
            <Stars />
            <blockquote>{featured.quote}</blockquote>
            <figcaption className="testimonial-author">
              <div>
                <span className="testimonial-name">{featured.name}</span>
                <span className="testimonial-role">{featured.role}</span>
              </div>
            </figcaption>
          </figure>

          <div className="testimonials-side">
            {others.map((t, i) => (
              <figure className="testimonial-card" key={t.name} ref={(el) => (cardsRef.current[i + 1] = el)}>
                <Stars small />
                <blockquote>{t.quote}</blockquote>
                <figcaption className="testimonial-author">
                  <div>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ small }) {
  return (
    <span className={`testimonial-stars${small ? " is-small" : ""}`} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <svg key={n} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9L12 2.8Z" />
        </svg>
      ))}
    </span>
  );
}
