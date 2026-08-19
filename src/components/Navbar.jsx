import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../animations/gsapSetup";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import MobileMenu from "./MobileMenu.jsx";
import "./Navbar.css";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Student Life", href: "#student-life" },
  { label: "News & Events", href: "#news" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar({ navRef }) {
  const { openModal } = useApplicationModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const localRef = useRef(null);
  const ref = navRef || localRef;

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 100,
      end: 99999,
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => st.kill();
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header ref={ref} className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="container navbar-inner">
          <a href="#home" className="navbar-logo" aria-label="Star of Bethlehem International School home">
            <span className="navbar-logo-mark" aria-hidden="true">
              ✦
            </span>
            <span className="navbar-logo-text">
              Star of Bethlehem
              <em>International School</em>
            </span>
          </a>

          <nav className="navbar-links" aria-label="Primary">
            <ul>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <button type="button" className="btn btn-primary navbar-apply-btn" onClick={openModal}>
              Apply Now
            </button>

            <button
              type="button"
              className="navbar-hamburger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
