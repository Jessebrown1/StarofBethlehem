import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import "./MobileMenu.css";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Student Life", href: "#student-life" },
  { label: "News & Events", href: "#news" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

export default function MobileMenu({ isOpen, onClose }) {
  const { openModal } = useApplicationModal();
  const panelRef = useRef(null);
  const itemRefs = useRef([]);
  const closeButtonRef = useRef(null);

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
    closeButtonRef.current?.focus();

    return () => {
      ctx.revert();
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab") {
        trapFocus(e);
      }
    }

    function trapFocus(e) {
      const focusable = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
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
  }, [isOpen, onClose]);

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
        <div className="mobile-menu-top">
          <ThemeToggle className="mobile-menu-theme-toggle" />

          <button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
            ref={closeButtonRef}
          >
            &times;
          </button>
        </div>

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
