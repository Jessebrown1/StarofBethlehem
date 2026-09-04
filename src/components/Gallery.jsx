import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealUp, staggerReveal } from "../animations/scrollAnimations";
import heroStudents from "../assets/images/hero-students.jpeg";
import campusAdminBlock from "../assets/images/campus-admin-block.jpeg";
import classroomCelebration from "../assets/images/classroom-celebration.jpeg";
import sportsDay from "../assets/images/sports-day.jpeg";
import museumTrip from "../assets/images/museum-trip.jpeg";
import potteryCraft from "../assets/images/pottery-craft.jpeg";
import graduation2025 from "../assets/images/graduation-2025.jpeg";
import competitionTrophy from "../assets/images/competition-trophy.jpeg";
import "./Gallery.css";

const PHOTOS = [
  { image: heroStudents, caption: "Students on Campus" },
  { image: campusAdminBlock, caption: "Campus Admin Block" },
  { image: classroomCelebration, caption: "Classroom Celebrations" },
  { image: sportsDay, caption: "Sports Day" },
  { image: museumTrip, caption: "Museum Field Trip" },
  { image: potteryCraft, caption: "Pottery & Craft" },
  { image: graduation2025, caption: "Graduation 2025" },
  { image: competitionTrophy, caption: "Competition Winners" },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const triggerRef = useRef(null);

  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  function open(index, e) {
    triggerRef.current = e?.currentTarget || null;
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
    if (triggerRef.current && document.body.contains(triggerRef.current)) {
      triggerRef.current.focus();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) closeLightbox();
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      staggerReveal(gsap.utils.toArray(".gallery-item"), {
        trigger: gridRef.current,
        y: 32,
        stagger: 0.06,
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
        gsap.set(dialogRef.current, { opacity: 1, scale: 1 });
        return;
      }
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(dialogRef.current, { opacity: 0, scale: 0.96 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(overlayRef.current, { opacity: 1, duration: 0.3 })
        .to(dialogRef.current, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.15");
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
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % PHOTOS.length);
      else if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
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

  const active = isOpen ? PHOTOS[activeIndex] : null;

  return (
    <section id="gallery" className="gallery-section section" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header" ref={headingRef}>
          <span className="eyebrow">Gallery</span>
          <h2 className="section-heading">
            Moments Worth <span className="accent">Remembering</span>
          </h2>
          <p className="section-lede">
            A glimpse into everyday life at Star of Bethlehem — the classroom, the campus, and the community.
          </p>
        </div>

        <div className="gallery-grid" ref={gridRef}>
          {PHOTOS.map((photo, i) => (
            <button
              type="button"
              className="gallery-item"
              key={photo.caption}
              onClick={(e) => open(i, e)}
              aria-label={`View larger image: ${photo.caption}`}
            >
              <img src={photo.image} alt={`${photo.caption} at Star of Bethlehem International School`} loading="lazy" />
              <span className="gallery-item-caption">{photo.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="gallery-lightbox-overlay" ref={overlayRef} onMouseDown={handleOverlayClick}>
          <div
            className="gallery-lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <button type="button" className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Close gallery">
              &times;
            </button>

            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-prev"
              onClick={() => setActiveIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)}
              aria-label="Previous image"
            >
              &#8249;
            </button>

            <img
              className="gallery-lightbox-image"
              src={active.image}
              alt={`${active.caption} at Star of Bethlehem International School`}
            />

            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-next"
              onClick={() => setActiveIndex((i) => (i + 1) % PHOTOS.length)}
              aria-label="Next image"
            >
              &#8250;
            </button>

            <span className="gallery-lightbox-caption">
              {active.caption}
              <span className="gallery-lightbox-count">
                {activeIndex + 1} / {PHOTOS.length}
              </span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
