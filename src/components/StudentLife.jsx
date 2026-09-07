import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { staggerReveal } from "../animations/scrollAnimations";
import { createHorizontalScroll } from "../animations/horizontalScroll";
import { IMAGES } from "../data/images";
import "./StudentLife.css";

const ITEMS = [
  { title: "Sports", description: "Football, athletics, and inter-house competitions build teamwork and grit.", image: IMAGES.studentLifeSports },
  { title: "Clubs", description: "Debate, science, and creative arts clubs let students pursue their passions.", image: IMAGES.studentLifeClubs },
  { title: "Leadership", description: "Student council and prefect programs cultivate confidence and responsibility.", image: IMAGES.studentLifeLeadership },
  { title: "Culture", description: "Cultural days celebrate Ghana's rich heritage and our diverse community.", image: IMAGES.studentLifeCulture },
  { title: "Trips", description: "Educational excursions bring classroom learning to life beyond campus.", image: IMAGES.studentLifeTrips },
  { title: "Competitions", description: "Inter-school academic and sporting competitions showcase student talent.", image: IMAGES.studentLifeCompetitions },
];

export default function StudentLife() {
  const wrapperRef = useRef(null);
  const desktopSectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const mobileSectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 993px)", () => {
        const st = createHorizontalScroll(desktopSectionRef.current, viewportRef.current, trackRef.current);
        return () => st?.kill();
      });

      mm.add("(max-width: 992px)", () => {
        const cards = gsap.utils.toArray(".student-life-card-mobile");
        staggerReveal(cards, { trigger: mobileSectionRef.current });
      });

      return () => mm.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="student-life" className="student-life-wrapper" ref={wrapperRef}>
      <div className="student-life-desktop" ref={desktopSectionRef}>
        <div className="student-life-viewport" ref={viewportRef}>
          <div className="student-life-track" ref={trackRef}>
            <div className="student-life-intro">
              <span className="eyebrow">Student Life</span>
              <h2 className="section-heading">
                Beyond the <span className="accent">Classroom</span>
              </h2>
              <p className="section-lede">A well-rounded school experience shaped by sport, culture, and leadership.</p>
            </div>

            {ITEMS.map((item) => (
              <article className="student-life-card" key={item.title}>
                <div className="student-life-card-image">
                  <img src={item.image} alt={`${item.title} at Star of Bethlehem International School`} loading="lazy" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="student-life-mobile" ref={mobileSectionRef}>
        <div className="container">
          <span className="eyebrow">Student Life</span>
          <h2 className="section-heading">
            Beyond the <span className="accent">Classroom</span>
          </h2>
        </div>

        <div className="student-life-carousel" role="region" aria-label="Student life highlights, swipe to browse">
          {ITEMS.map((item) => (
            <article className="student-life-card-mobile" key={item.title}>
              <div className="student-life-card-image">
                <img src={item.image} alt={`${item.title} at Star of Bethlehem International School`} loading="lazy" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
