import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./WhyChooseUs.css";

const BENEFITS = [
  {
    title: "Experienced & Caring Teachers",
    description:
      "Our qualified faculty combine academic rigor with genuine mentorship, guiding every child to reach their potential.",
  },
  {
    title: "Modern Learning Environment",
    description:
      "Bright classrooms, science and ICT laboratories, and a resource-rich library support hands-on, engaged learning.",
  },
  {
    title: "Leadership Development",
    description:
      "Structured programs in public speaking, service, and student governance build confident, purposeful young leaders.",
  },
  {
    title: "Global-Ready Curriculum",
    description:
      "An internationally benchmarked curriculum prepares students for success in Ghana and on the world stage.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const mobileListRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 993px)", () => {
        // .why-pinned is CSS `position: sticky` (see WhyChooseUs.css) rather
        // than a ScrollTrigger `pin` — sticky stays perfectly in place
        // through native browser scrolling with no JS in the loop, so it
        // can't desync from trackpad momentum the way a JS-toggled pin can
        // on Safari. This ScrollTrigger only reads scroll progress through
        // the section to drive which benefit is highlighted.
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const idx = Math.min(BENEFITS.length - 1, Math.floor(self.progress * BENEFITS.length));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        });

        return () => st.kill();
      });

      mm.add("(max-width: 992px)", () => {
        revealUp(".why-mobile-image", { trigger: sectionRef.current });
        const items = gsap.utils.toArray(".why-benefit-mobile");
        staggerReveal(items, { trigger: mobileListRef.current });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" className="why-section" ref={sectionRef}>
      <div className="why-pinned">
        <div className="why-image-col">
          <img src={IMAGES.whyChooseMain} alt="Students engaged in learning at Star of Bethlehem International School" />
          <div className="why-image-overlay" />
        </div>

        <div className="why-content-col">
          <span className="eyebrow eyebrow--light">Why Families Choose Us</span>
          <h2 className="section-heading why-heading">
            Star of Bethlehem
            <br />
            International School
          </h2>

          <div className="why-benefits">
            {BENEFITS.map((benefit, i) => (
              <div key={benefit.title} className={`why-benefit${i === active ? " is-active" : ""}`}>
                <span className="why-benefit-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="why-progress" role="progressbar" aria-valuenow={active + 1} aria-valuemin={1} aria-valuemax={BENEFITS.length}>
            {BENEFITS.map((benefit, i) => (
              <span key={benefit.title} className={i === active ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </div>

      <div className="why-mobile">
        <div className="container">
          <div className="why-mobile-image">
            <img src={IMAGES.whyChooseMain} alt="Students engaged in learning at Star of Bethlehem International School" />
          </div>
          <span className="eyebrow">Why Families Choose Us</span>
          <h2 className="section-heading">
            Star of Bethlehem <span className="accent">International School</span>
          </h2>

          <div className="why-benefits-mobile" ref={mobileListRef}>
            {BENEFITS.map((benefit, i) => (
              <div className="why-benefit-mobile" key={benefit.title}>
                <span className="why-benefit-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
