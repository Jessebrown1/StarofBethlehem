import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealUp } from "../animations/scrollAnimations";
import { IMAGES } from "../data/images";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "Star of Bethlehem has transformed my daughter into a confident, articulate young leader. The teachers genuinely care about every child.",
    name: "Mrs. Abena Owusu",
    role: "Parent of a Primary 4 student",
    image: IMAGES.testimonial1,
  },
  {
    quote:
      "The academic standards here are exceptional. My son was thoroughly prepared for his BECE and left with real confidence.",
    name: "Mr. Kwame Mensah",
    role: "Parent of a JHS graduate",
    image: IMAGES.testimonial2,
  },
  {
    quote:
      "From the campus to the curriculum, everything feels premium. It's the best decision we made for our children's education.",
    name: "Mrs. Efua Asante",
    role: "Parent of two students",
    image: IMAGES.testimonial3,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const quoteRef = useRef(null);
  const [index, setIndex] = useState(0);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      revealUp(quoteRef.current, { trigger: sectionRef.current, delay: 0.15 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Skip on mount: the scroll-triggered `revealUp` above already owns the
    // element's initial reveal. Running this crossfade on mount too would
    // fade the quote to full opacity immediately, regardless of scroll
    // position, undercutting the "reveal on scroll into view" behavior
    // every other section has. The flag is reset on cleanup so that React
    // 18 StrictMode's dev-only double-invoke (mount → cleanup → mount)
    // still lands on "skip" both times, rather than animating on the
    // second simulated mount.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return () => {
        isFirstRender.current = true;
      };
    }
    if (!quoteRef.current) return undefined;
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [index]);

  const current = TESTIMONIALS[index];

  return (
    <section className="testimonials-section section" ref={sectionRef}>
      <div className="container testimonials-inner">
        <div className="testimonials-header" ref={headingRef}>
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-heading">
            What <span className="accent">Parents Say</span>
          </h2>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-content" ref={quoteRef}>
            <p className="testimonial-quote">&ldquo;{current.quote}&rdquo;</p>
            <div className="testimonial-author">
              <img src={current.image} alt="" aria-hidden="true" loading="lazy" />
              <div>
                <span className="testimonial-name">{current.name}</span>
                <span className="testimonial-role">{current.role}</span>
              </div>
            </div>
          </div>

          <div className="testimonial-dots" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial from ${t.name}`}
                className={i === index ? "is-active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
