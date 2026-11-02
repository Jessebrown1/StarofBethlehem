import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import "./ParentPartnership.css";

// Placeholder wording — confirm each point matches how the school really
// works with parents (report frequency, WhatsApp groups, PTA, etc.) before launch.
const STEPS = [
  {
    title: "Termly Progress Reports",
    description: "A clear report every term showing how your child is doing, with teacher comments and next steps.",
    icon: (
      <>
        <path d="M6 3.5h8l4 4V20.5H6Z" />
        <path d="M14 3.5v4h4" />
        <path d="M9 12.5h6M9 16h4" />
      </>
    ),
  },
  {
    title: "Class WhatsApp Groups",
    description: "Homework, notices and reminders shared quickly, so you are never the last to know.",
    icon: (
      <>
        <path d="M4 12a8 8 0 1 1 3.4 6.5L4 20l1.2-3.6A7.9 7.9 0 0 1 4 12Z" />
        <path d="M9 10c.4 2 2 3.6 4 4" />
      </>
    ),
  },
  {
    title: "An Open-Door Policy",
    description: "Have a worry or a question? Speak to your child's teacher or the Head by appointment, any school day.",
    icon: (
      <>
        <path d="M6 20.5V4.5h9l3 2.5v13.5" />
        <path d="M3.5 20.5h17" />
        <circle cx="12.5" cy="12.5" r=".6" />
      </>
    ),
  },
  {
    title: "PTA & Parent Events",
    description: "Open days, PTA meetings and school celebrations where families meet teachers and each other.",
    icon: (
      <>
        <circle cx="8.5" cy="8" r="2.8" />
        <circle cx="16.5" cy="8.8" r="2.3" />
        <path d="M3.5 19c0-3 2.3-5.2 5-5.2s5 2.2 5 5.2" />
        <path d="M15 14c2.5-.3 5 1.2 5 4.5" />
      </>
    ),
  },
];

export default function ParentPartnership() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stepsRef = useRef([]);
  const bannerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(stepsRef.current.filter(Boolean), { trigger: sectionRef.current, y: 36, stagger: 0.12 });
      revealUp(bannerRef.current, { trigger: bannerRef.current });

      if (!prefersReducedMotion()) {
        const line = sectionRef.current.querySelector(".partner-line-fill");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="partner-section section" id="parents" ref={sectionRef}>
      <div className="container">
        <div className="partner-header" ref={headingRef}>
          <span className="eyebrow">Parent Partnership</span>
          <h2 className="section-heading">
            Parents and Teachers, <span className="accent">Side by Side</span>
          </h2>
          <p className="section-lede">
            A child does best when home and school pull in the same direction. Here is how we keep you close to your
            child&rsquo;s learning.
          </p>
        </div>

        <div className="partner-track">
          <div className="partner-line" aria-hidden="true">
            <span className="partner-line-fill" />
          </div>
          <ol className="partner-grid">
            {STEPS.map((step, i) => (
              <li className="partner-step" key={step.title} ref={(el) => (stepsRef.current[i] = el)}>
                <span className="partner-node">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {step.icon}
                  </svg>
                </span>
                <div className="partner-card">
                  <span className="partner-num">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="partner-banner" ref={bannerRef}>
          <div>
            <h3>Have a question about your child&rsquo;s school life?</h3>
            <p>Our doors, and our phones, are always open to parents.</p>
          </div>
          <a href="#contact" className="btn btn-light">
            Talk to Us
          </a>
        </div>
      </div>
    </section>
  );
}
