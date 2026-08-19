import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealUp } from "../animations/scrollAnimations";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Student Life", href: "#student-life" },
  { label: "News & Events", href: "#news" },
];

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealUp(footerRef.current, { trigger: footerRef.current, y: 24, start: "top 92%" });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="footer" ref={footerRef}>
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <span aria-hidden="true">✦</span> Star of Bethlehem
          </span>
          <p className="footer-tagline">Raising Purposeful Leaders Through Quality Education.</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <address>
            Star of Bethlehem International School
            <br />
            Accra, Ghana
            <br />
            <a href="tel:+233000000000">+233 00 000 0000</a>
            <br />
            <a href="mailto:info@starofbethlehem.edu.gh">info@starofbethlehem.edu.gh</a>
          </address>
        </div>

        <div className="footer-col">
          <h3>Office Hours</h3>
          <p>Monday – Friday</p>
          <p>7:30 AM – 4:30 PM</p>
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
