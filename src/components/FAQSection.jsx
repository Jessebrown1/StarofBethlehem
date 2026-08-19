import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import "./FAQSection.css";

const FAQS = [
  {
    question: "What ages do you accept for admission?",
    answer:
      "We welcome students from Creche/Nursery through JHS 3, with rolling admissions available at every level as space allows.",
  },
  {
    question: "What is the admissions process?",
    answer:
      "Families submit an application, the student completes an entrance assessment where applicable, and our admissions team schedules a follow-up meeting before an offer is made.",
  },
  {
    question: "Do you provide transportation for students?",
    answer:
      "Yes, we offer school bus services covering several routes across the city. Contact our admissions office to check availability for your area.",
  },
  {
    question: "Is a school uniform required?",
    answer:
      "Yes, all students are required to wear the official Star of Bethlehem uniform, available through our approved suppliers.",
  },
  {
    question: "What extracurricular activities do you offer?",
    answer:
      "Students can join sports teams, debate and science clubs, cultural groups, and leadership programs including the student council.",
  },
  {
    question: "How can I schedule a campus tour?",
    answer:
      "Reach out through our Contact section or call our admissions office directly — we're happy to arrange a personal tour of the campus.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(itemsRef.current, { trigger: sectionRef.current, y: 20 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section id="faq" className="faq-section section" ref={sectionRef}>
      <div className="container">
        <div className="faq-header" ref={headingRef}>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-heading">
            Frequently Asked <span className="accent">Questions</span>
          </h2>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                className={`faq-item${isOpen ? " is-open" : ""}`}
                key={faq.question}
                ref={(el) => (itemsRef.current[i] = el)}
              >
                <h3 className="faq-question">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    {faq.question}
                    <span className="faq-chevron" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-answer-wrapper"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
