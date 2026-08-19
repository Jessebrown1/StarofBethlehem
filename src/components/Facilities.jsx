import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealUp, staggerReveal, parallaxImage } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./Facilities.css";

const FACILITIES = [
  { title: "Classrooms", image: IMAGES.facilityClassrooms, size: "lg" },
  { title: "Science Laboratory", image: IMAGES.facilityScienceLab, size: "sm" },
  { title: "ICT Laboratory", image: IMAGES.facilityICTLab, size: "sm" },
  { title: "Library", image: IMAGES.facilityLibrary, size: "md" },
  { title: "Sports Facilities", image: IMAGES.facilitySports, size: "md" },
  { title: "Auditorium", image: IMAGES.facilityAuditorium, size: "sm" },
];

export default function Facilities() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });

      const items = imageRefs.current
        .filter(Boolean)
        .map((img) => img.closest(".facility-item"));
      staggerReveal(items, { trigger: sectionRef.current, y: 40, stagger: 0.08 });

      // Parallax is continuous (scrub) scroll-linked work — desktop only.
      // Six of these running at once is real cost on mobile hardware, and
      // it's exactly the kind of per-scroll-frame recalculation that makes
      // touch scrolling feel like it's fighting the page.
      if (!prefersReducedMotion()) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 993px)", () => {
          imageRefs.current.forEach((img) => {
            if (img) parallaxImage(img, { distance: 36 });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="facilities-section section" ref={sectionRef}>
      <div className="container">
        <div className="facilities-header" ref={headingRef}>
          <span className="eyebrow">Our Facilities</span>
          <h2 className="section-heading">
            Spaces Built for <span className="accent">Discovery</span>
          </h2>
        </div>

        <div className="facilities-grid">
          {FACILITIES.map((facility, i) => (
            <div className={`facility-item facility-item--${facility.size}`} key={facility.title}>
              <div className="facility-media">
                <img
                  ref={(el) => (imageRefs.current[i] = el)}
                  src={facility.image}
                  alt={`${facility.title} at Star of Bethlehem International School`}
                  loading="lazy"
                />
              </div>
              <span className="facility-label">{facility.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
