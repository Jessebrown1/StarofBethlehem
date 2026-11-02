import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp } from "../animations/scrollAnimations";
import { useApplicationModal } from "../context/ApplicationModalContext.jsx";
import schoolLogo from "../assets/images/school-logo-crest.webp";
import "./Footer.css";

const EXPLORE_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Student Life", href: "#student-life" },
];

const MORE_LINKS = [
  { label: "Gallery", href: "#gallery" },
  { label: "Parents", href: "#parents" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

export default function Footer() {
  const footerRef = useRef(null);
  const { openModal } = useApplicationModal();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(footerRef.current, { trigger: footerRef.current, y: 24, start: "top 92%" });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">
              <img src={schoolLogo} alt="" width="48" height="48" />
              <span>
                Star of Bethlehem
                <small>International School</small>
              </span>
            </span>
            <p className="footer-tagline">Raising Purposeful Leaders Through Quality Education.</p>
          </div>

          <div className="footer-cta">
            <p>Admissions are open. Give your child a place where they are known by name.</p>
            <button type="button" className="footer-apply" onClick={openModal}>
              Apply Now
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="footer-grid">
          <nav className="footer-col" aria-label="Explore">
            <h3>Explore</h3>
            <ul>
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="More">
            <h3>More</h3>
            <ul>
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-col--contact">
            <h3>Reach Us</h3>
            <address>
              <a href="#contact" className="footer-contact-row">
                {icon(
                  <>
                    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
                    <circle cx="12" cy="10" r="2.3" />
                  </>
                )}
                <span>Accra, Ghana</span>
              </a>
              <a href="tel:+233000000000" className="footer-contact-row">
                {icon(<path d="M5 4h3l1.6 4-2 1.3a11 11 0 0 0 5.1 5.1L14 12.4l4 1.6v3a2 2 0 0 1-2.2 2A14 14 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />)}
                <span>+233 00 000 0000</span>
              </a>
              <a href="mailto:info@starofbethlehem.edu.gh" className="footer-contact-row">
                {icon(
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <path d="m4 7.5 8 6 8-6" />
                  </>
                )}
                <span>info@starofbethlehem.edu.gh</span>
              </a>
              <span className="footer-contact-row">
                {icon(
                  <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                  </>
                )}
                <span>Mon – Fri, 7:30 AM – 4:30 PM</span>
              </span>
            </address>
          </div>
        </div>
      </div>


      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} Star of Bethlehem International School. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
