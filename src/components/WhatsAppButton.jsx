import { useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "../animations/gsapSetup";
import "./WhatsAppButton.css";

// Reuses the "Mobile / WhatsApp" number already placeholder'd in
// ContactSection.jsx (+233 24 000 0000) — see the TODO there. wa.me needs
// digits only, no "+".
const WHATSAPP_NUMBER = "233240000000";
const PREFILLED_MESSAGE = "Hello! I'd like to know more about Star of Bethlehem International School.";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 80%",
      end: "bottom top",
      onEnter: () => setVisible(true),
      onLeave: () => setVisible(false),
      onEnterBack: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => st.kill();
  }, []);

  return (
    <a
      href={href}
      className={`whatsapp-button${visible ? " is-visible" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.76.46 3.48 1.34 5L2 22l5.14-1.35a10 10 0 0 0 4.9 1.25h.01c5.5 0 10-4.5 10-10s-4.5-10-10.01-10Zm5.86 14.3c-.25.7-1.45 1.34-2 1.43-.5.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.63-2.96-1.28-4.9-4.26-5.04-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.46.76-2.17 1.04-2.47.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.43-.07.68.52.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.3.39-.44.52-.15.15-.3.3-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.78.84 2.08 1 .3.15.5.22.58.35.07.13.07.75-.18 1.45Z" />
      </svg>
      <span className="whatsapp-button-tooltip">Chat with us on WhatsApp</span>
    </a>
  );
}
