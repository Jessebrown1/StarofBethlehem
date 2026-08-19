import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./NewsEvents.css";

const NEWS = [
  {
    date: "March 14, 2026",
    category: "Academics",
    title: "Science Fair 2026",
    description: "Students showcase innovative projects at our annual whole-school science fair.",
    image: IMAGES.newsScienceFair,
  },
  {
    date: "February 28, 2026",
    category: "Sports",
    title: "Inter-House Sports",
    description: "Four houses compete in a spirited day of athletics, football, and team games.",
    image: IMAGES.newsSports,
  },
  {
    date: "January 20, 2026",
    category: "Campus",
    title: "New Library Opening",
    description: "Our expanded library and reading resource center officially opens to students.",
    image: IMAGES.newsLibrary,
  },
];

export default function NewsEvents() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 46,
          x: i % 2 === 0 ? -12 : 12,
          duration: 0.9,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="news" className="news-section section" ref={sectionRef}>
      <div className="container">
        <div className="news-header" ref={headingRef}>
          <span className="eyebrow">News &amp; Events</span>
          <h2 className="section-heading">
            What&rsquo;s Happening <span className="accent">On Campus</span>
          </h2>
        </div>

        <div className="news-grid">
          {NEWS.map((item, i) => (
            <article className="news-card" key={item.title} ref={(el) => (cardsRef.current[i] = el)}>
              <div className="news-card-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="news-card-body">
                <span className="news-card-meta">
                  {item.date} · {item.category}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#contact" className="news-card-link">
                  Read More
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
