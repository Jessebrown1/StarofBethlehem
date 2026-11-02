import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealUp, staggerReveal, revealImageClip } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import "./SafetyCare.css";

// Placeholder wording — confirm each point matches the school's real policies
// (pick-up rules, first aid, class sizes, etc.) before launch.
const POINTS = [
  {
    title: "Safe Arrival & Pick-up",
    description: "Staff supervise every drop-off and collection, and children go home only with an authorised guardian.",
    icon: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </>
    ),
  },
  {
    title: "Caring, Attentive Teachers",
    description: "Teachers know every child by name, notice when something is wrong and keep parents informed.",
    icon: (
      <>
        <path d="M12 20.5s-8-4.7-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.1c0 5.7-8 10.4-8 10.4Z" />
      </>
    ),
  },
  {
    title: "Small Class Sizes",
    description: "Fewer children per teacher means every child is seen, heard and supervised properly.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9.5" r="2.4" />
        <path d="M3.5 19c0-3.2 2.4-5.5 5.5-5.5s5.5 2.3 5.5 5.5" />
        <path d="M15.5 14c2.6-.4 5 1.3 5 4.2" />
      </>
    ),
  },
  {
    title: "First Aid & Health",
    description: "First-aid ready staff are on hand, and parents are contacted straight away if a child is unwell.",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
  },
  {
    title: "Secure Campus",
    description: "Secured grounds with staff on duty throughout the school day, so children can learn and play freely.",
    icon: (
      <>
        <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />
        <path d="m9 12 2.2 2.2L15.2 10" />
      </>
    ),
  },
  {
    title: "Kind, Respectful Culture",
    description: "Clear expectations, zero tolerance for bullying and an open-door policy for any worry a child or parent has.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.5 14c.9 1.4 2 2 3.5 2s2.6-.6 3.5-2" />
        <path d="M9.2 9.6h.01M14.8 9.6h.01" />
      </>
    ),
  },
];

export default function SafetyCare() {
  const { openModal } = useApplicationModal();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const photoWrapRef = useRef(null);
  const photoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      revealImageClip(photoWrapRef.current, photoRef.current, { direction: "up" });
      const cards = cardsRef.current.filter(Boolean);
      staggerReveal(cards, { trigger: sectionRef.current, y: 34, stagger: 0.1 });

      // Icons draw themselves in as their card arrives.
      if (!prefersReducedMotion()) {
        cards.forEach((card, i) => {
          const shapes = card.querySelectorAll(".safety-icon svg > *");
          shapes.forEach((shape) => {
            const len = shape.getTotalLength ? Math.ceil(shape.getTotalLength()) + 1 : 0;
            if (len > 1) gsap.set(shape, { strokeDasharray: len, strokeDashoffset: len });
          });
          const clear = () => gsap.set(shapes, { clearProps: "strokeDasharray,strokeDashoffset" });
          gsap.to(shapes, {
            strokeDashoffset: 0,
            duration: 1.1,
            delay: 0.25 + i * 0.1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
              onEnter: () => setTimeout(clear, 3200),
            },
            onComplete: clear,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="safety-section section" id="safety" ref={sectionRef}>
      <div className="container safety-layout">
        <div className="safety-intro" ref={headingRef}>
          <span className="eyebrow">Safety & Care</span>
          <h2 className="section-heading">
            Where Your Child Is <span className="accent">Safe & Cared For</span>
          </h2>
          <p>
            Great learning starts with children who feel secure. Here is how we look after every child in our care,
            every day.
          </p>
          <div className="safety-actions">
            <button type="button" className="btn btn-primary" onClick={openModal}>
              Apply Now
            </button>
            <a href="#contact" className="safety-link">
              Visit us and see for yourself
            </a>
          </div>

          <div className="safety-photo" ref={photoWrapRef}>
            <img
              ref={photoRef}
              src={IMAGES.safetyCare}
              alt="Happy students together in a supervised classroom"
              loading="lazy"
            />
            <span className="safety-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />
                <path d="m9 12 2.2 2.2L15.2 10" />
              </svg>
              Every child, every day
            </span>
          </div>
        </div>

        <ul className="safety-grid">
          {POINTS.map((point, i) => (
            <li className="safety-card" key={point.title} ref={(el) => (cardsRef.current[i] = el)}>
              <span className="safety-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="safety-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {point.icon}
                </svg>
              </span>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
