import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { animateCounter, staggerReveal } from "../animations/scrollAnimations";
import "./Stats.css";

const STATS = [
  { target: 500, suffix: "+", label: "Students Enrolled" },
  { target: 40, suffix: "+", label: "Qualified Teachers" },
  { target: 15, suffix: "+", label: "Years of Excellence" },
  { target: 100, suffix: "%", label: "JHS Graduate Placement" },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      staggerReveal(itemRefs.current, { trigger: sectionRef.current, y: 24 });

      STATS.forEach((stat, i) => {
        animateCounter(numberRefs.current[i], {
          target: stat.target,
          suffix: stat.suffix,
          start: "top 85%",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef} aria-label="School statistics">
      <div className="container stats-grid">
        {STATS.map((stat, i) => (
          <div className="stat-item" key={stat.label} ref={(el) => (itemRefs.current[i] = el)}>
            <span className="stat-number" ref={(el) => (numberRefs.current[i] = el)}>
              0{stat.suffix}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
