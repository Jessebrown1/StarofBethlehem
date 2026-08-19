import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./AcademicPrograms.css";

const PROGRAMS = [
  {
    title: "Early Years",
    range: "Creche – Kindergarten",
    description: "A warm, play-based foundation building curiosity, language, and social skills.",
    image: IMAGES.academicEarlyYears,
  },
  {
    title: "Primary School",
    range: "Primary 1 – 6",
    description: "Core literacy and numeracy paired with creative and inquiry-based learning.",
    image: IMAGES.academicPrimary,
  },
  {
    title: "JHS / Middle School",
    range: "JHS 1 – 3",
    description: "Rigorous preparation for BECE success and the transition into senior high.",
    image: IMAGES.academicJHS,
  },
  {
    title: "SHS / High School",
    range: "SHS 1 – 3",
    description: "Advanced academics and mentorship preparing students for global universities.",
    image: IMAGES.academicSHS,
  },
];

export default function AcademicPrograms() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(cardsRef.current, { trigger: sectionRef.current, y: 50 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="academics" className="academics-section section" ref={sectionRef}>
      <div className="container">
        <div className="academics-header" ref={headingRef}>
          <span className="eyebrow">Academic Programs</span>
          <h2 className="section-heading">
            A Pathway for <span className="accent">Every Learner</span>
          </h2>
        </div>

        <div className="academics-grid">
          {PROGRAMS.map((program, i) => (
            <article className="academic-card" key={program.title} ref={(el) => (cardsRef.current[i] = el)}>
              <div className="academic-card-image">
                <img src={program.image} alt={`${program.title} students at Star of Bethlehem International School`} loading="lazy" />
              </div>
              <div className="academic-card-body">
                <span className="academic-card-range">{program.range}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <a href="#admissions" className="academic-card-link">
                  Learn More
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
