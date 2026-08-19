import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp, revealImageClip, staggerReveal } from "../animations/scrollAnimations";
import "./ContactSection.css";

// TODO: replace with the school's real street address, phone numbers, and
// map location before launch — these are placeholders.
const CONTACT_DETAILS = [
  {
    label: "Location",
    value: "Star of Bethlehem International School, Accra, Ghana",
    href: undefined,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+233 00 000 0000",
    href: "tel:+233000000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 4h3.4l1.6 4.4-2 1.6a12.4 12.4 0 0 0 5.9 5.9l1.6-2 4.4 1.6v3.4c0 1-.9 1.7-1.9 1.5A17.5 17.5 0 0 1 3 5.9C2.8 4.9 3.5 4 4.5 4Z" />
      </svg>
    ),
  },
  {
    label: "Mobile / WhatsApp",
    value: "+233 24 000 0000",
    href: "tel:+233240000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.3" />
        <path d="M11 18.3h2" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info@starofbethlehem.edu.gh",
    href: "mailto:info@starofbethlehem.edu.gh",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.3" />
        <path d="m4 6.5 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "Office Hours",
    value: "Monday – Friday, 7:30 AM – 4:30 PM",
    href: undefined,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const mapImgRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(headingRef.current, { trigger: sectionRef.current });
      revealImageClip(mapWrapperRef.current, mapImgRef.current, { direction: "left" });
      staggerReveal(itemsRef.current, { trigger: sectionRef.current, y: 24 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact-section section" ref={sectionRef}>
      <div className="container">
        <div className="contact-header" ref={headingRef}>
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-heading">
            Visit Our <span className="accent">Campus</span>
          </h2>
          <p className="section-lede">
            We&rsquo;d love to welcome you to Star of Bethlehem. Reach out with any questions or
            stop by to see the campus for yourself.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-map" ref={mapWrapperRef}>
            <iframe
              ref={mapImgRef}
              title="Star of Bethlehem International School location"
              src="https://maps.google.com/maps?q=Accra,Ghana&z=12&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="contact-details">
            {CONTACT_DETAILS.map((item, i) => {
              const Tag = item.href ? "a" : "div";
              return (
                <Tag
                  key={item.label}
                  className="contact-item"
                  href={item.href}
                  ref={(el) => (itemsRef.current[i] = el)}
                >
                  <span className="contact-item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="contact-item-body">
                    <span className="contact-item-label">{item.label}</span>
                    <span className="contact-item-value">{item.value}</span>
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
