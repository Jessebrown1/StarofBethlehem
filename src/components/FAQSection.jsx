import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import "./FAQSection.css";

// Placeholder answers — confirm ages, bus routes, uniform rules and the
// admissions steps with the school before launch.
const FAQS = [
  {
    question: "What ages do you take?",
    answer:
      "From Creche right up to JHS 3. If there is space in the class, we can usually welcome your child at any point in the year, not just at the start of term.",
  },
  {
    question: "How does admission work?",
    answer:
      "You send in the application form, your child sits a short, friendly assessment where needed, and then we invite you in for a chat. If it feels right for both sides, we make an offer.",
  },
  {
    question: "Is there a school bus?",
    answer:
      "Yes, we run bus routes across the city. Tell us roughly where you live and the office will let you know if we pass near you.",
  },
  {
    question: "Do the children wear uniform?",
    answer:
      "They do. It keeps things simple and fair for everyone. We will tell you exactly where to buy the Star of Bethlehem uniform once your child is offered a place.",
  },
  {
    question: "What is there to do besides lessons?",
    answer:
      "Plenty: football and other sports, science and debate clubs, cultural groups, and leadership roles like the student council. Most children find something they love.",
  },
  {
    question: "Can I come and see the school first?",
    answer:
      "Please do. Message us or call the office and we will arrange a time to show you around, meet the teachers and answer anything on your mind.",
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
      <div className="container faq-layout">
        <div className="faq-intro" ref={headingRef}>
          <span className="faq-watermark" aria-hidden="true">
            ?
          </span>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-heading">
            Good Questions, <span className="accent">Straight Answers</span>
          </h2>
          <p>The things parents ask us most. Can&rsquo;t see yours? Just ask, we are happy to help.</p>
          <a href="#contact" className="faq-help">
            <span className="faq-help-title">Still wondering about something?</span>
            <span className="faq-help-link">
              Talk to our office <span aria-hidden="true">&rarr;</span>
            </span>
          </a>
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
                    <span className="faq-num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M5 12h14" />
                        <path className="faq-toggle-v" d="M12 5v14" />
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
