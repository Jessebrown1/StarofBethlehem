import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealUp } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./NewsEvents.css";

const NEWS = [
  {
    date: "March 14, 2026",
    category: "Academics",
    title: "Science Fair 2026",
    description: "Students showcase innovative projects at our annual whole-school science fair.",
    body: "Students from every grade level presented projects spanning renewable energy, simple robotics, and environmental science. Judges from our faculty and visiting professionals recognized the most original and best-executed projects, and the top entries will represent the school at the regional science fair later this term.",
    image: IMAGES.newsScienceFair,
  },
  {
    date: "February 28, 2026",
    category: "Sports",
    title: "Inter-House Sports",
    description: "Four houses compete in a spirited day of athletics, football, and team games.",
    body: "Our four houses faced off in track and field events, football, and a series of team relay games. Beyond the medals, the day is built around house spirit and sportsmanship, with points awarded for both athletic performance and teamwork. This year's overall house champion will be announced at the next school assembly.",
    image: IMAGES.newsSports,
  },
  {
    date: "January 20, 2026",
    category: "Campus",
    title: "New Library Opening",
    description: "Our expanded library and reading resource center officially opens to students.",
    body: "The newly expanded library adds a dedicated reading corner for younger students, additional research computers, and an updated collection spanning fiction, reference, and exam-prep materials. It's open to students throughout the school day and during select after-school hours.",
    image: IMAGES.newsLibrary,
  },
];

export default function NewsEvents() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const triggerRef = useRef(null);

  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  function openArticle(index, e) {
    triggerRef.current = e?.currentTarget || null;
    setActiveIndex(index);
  }

  function closeArticle() {
    setActiveIndex(null);
    if (triggerRef.current && document.body.contains(triggerRef.current)) {
      triggerRef.current.focus();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) closeArticle();
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });

      const reduced = prefersReducedMotion();
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: reduced ? 0 : 46,
          x: reduced ? 0 : i % 2 === 0 ? -12 : 12,
          duration: reduced ? 0.4 : 0.9,
          delay: reduced ? 0 : i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(dialogRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(dialogRef.current, { opacity: 0, y: 24 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(overlayRef.current, { opacity: 1, duration: 0.3 })
        .to(dialogRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    });

    document.body.classList.add("no-scroll");

    return () => {
      ctx.revert();
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(e) {
      if (e.key === "Escape") closeArticle();
      else if (e.key === "Tab") trapFocus(e);
    }

    function trapFocus(e) {
      const focusable = dialogRef.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (!focusable || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const active = isOpen ? NEWS[activeIndex] : null;

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
                <button type="button" className="news-card-link" onClick={(e) => openArticle(i, e)}>
                  Read More
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="news-article-overlay" ref={overlayRef} onMouseDown={handleOverlayClick}>
          <div
            className="news-article"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-article-title"
          >
            <button type="button" className="news-article-close" onClick={closeArticle} aria-label="Close article">
              &times;
            </button>

            <div className="news-article-image">
              <img src={active.image} alt={active.title} />
            </div>

            <div className="news-article-body">
              <span className="news-card-meta">
                {active.date} · {active.category}
              </span>
              <h2 id="news-article-title">{active.title}</h2>
              <p>{active.body}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
