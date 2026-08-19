import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import "./MobileMenu.css";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Student Life", href: "#student-life" },
  { label: "News & Events", href: "#news" },
  { label: "Contact Us", href: "#contact" },
];

export default function MobileMenu({ isOpen, onClose }) {
  const { openModal } = useApplicationModal();
  const panelRef = useRef(null);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(panelRef.current, { opacity: 1, x: 0 });
        gsap.set(itemRefs.current, { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.5 }).fromTo(
        itemRefs.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
        "-=0.25"
      );
    });

    document.body.classList.add("no-scroll");
    return () => {
      ctx.revert();
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleLinkClick() {
    onClose();
  }

  function handleApply(e) {
    onClose();
    openModal(e);
  }

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-menu-panel" ref={panelRef}>
        <button type="button" className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
          &times;
        </button>

        <nav aria-label="Mobile primary">
          <ul>
            {LINKS.map((link, i) => (
              <li key={link.href} ref={(el) => (itemRefs.current[i] = el)}>
                <a href={link.href} onClick={handleLinkClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="btn btn-light mobile-menu-apply"
          ref={(el) => (itemRefs.current[LINKS.length] = el)}
          onClick={handleApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
