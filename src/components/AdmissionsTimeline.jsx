import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import "./AdmissionsTimeline.css";

const STEPS = [
  {
    title: "Submit Your Application",
    description: "Complete the online application form with your child's and guardian's details.",
  },
  {
    title: "Assessment & Interview",
    description: "The student and family meet with our admissions team for a short assessment.",
  },
  {
    title: "Offer of Admission",
    description: "Successful applicants receive an official offer and enrollment pack.",
  },
  {
    title: "Enrollment & Orientation",
    description: "Complete enrollment and join an orientation session before the term begins.",
  },
];

export default function AdmissionsTimeline() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stepsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(stepsRef.current, { trigger: sectionRef.current, y: 30 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="admissions-timeline section" ref={sectionRef}>
      <div className="container">
        <div className="admissions-timeline-header" ref={headingRef}>
          <span className="eyebrow">How It Works</span>
          <h2 className="section-heading">
            Your Path to <span className="accent">Enrollment</span>
          </h2>
        </div>

        <ol className="admissions-timeline-steps">
          {STEPS.map((step, i) => (
            <li key={step.title} ref={(el) => (stepsRef.current[i] = el)}>
              <span className="admissions-timeline-index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
