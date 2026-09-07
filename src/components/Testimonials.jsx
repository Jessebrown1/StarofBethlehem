import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "Star of Bethlehem has transformed my daughter into a confident, articulate young leader. The teachers genuinely care about every child.",
    name: "Mrs. Abena Owusu",
    role: "Parent of a Primary 4 student",
    image: IMAGES.testimonial1,
  },
  {
    quote:
      "The academic standards here are exceptional. My son was thoroughly prepared for his BECE and left with real confidence.",
    name: "Mr. Kwame Mensah",
    role: "Parent of a JHS graduate",
    image: IMAGES.testimonial2,
  },
  {
    quote:
      "From the campus to the curriculum, everything feels premium. It's the best decision we made for our children's education.",
    name: "Mrs. Efua Asante",
    role: "Parent of two students",
    image: IMAGES.testimonial3,
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

  return (
    <section className="testimonials-section section" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-header" ref={headingRef}>
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-heading">
            What <span className="accent">Parents Say</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className="testimonial-card" key={t.name} ref={(el) => (cardsRef.current[i] = el)}>
              <span className="testimonial-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <figcaption className="testimonial-author">
                <img src={t.image} alt="" aria-hidden="true" loading="lazy" />
                <div>
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
