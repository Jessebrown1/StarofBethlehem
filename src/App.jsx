import { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ApplicationModalProvider } from "./context/ApplicationModalContext.jsx";
import { initSmoothAnchorScroll } from "./animations/smoothAnchorScroll";
import { initScrollTriggerRefresh } from "./animations/refreshScrollTrigger";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
const BelowFold = lazy(() => import("./components/BelowFold.jsx"));
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";

function App() {
  // Hero first: the rest of the page mounts on the first scroll/tap/key or
  // after a couple of seconds, so the hero image and fonts get the
  // bandwidth and main thread while the visitor is looking at them. The
  // chunk is fetched straight away so mounting is instant. A deep link
  // (#contact) mounts everything immediately so the anchor exists.
  const [ready, setReady] = useState(() => Boolean(window.location.hash));

  useEffect(() => {
    if (ready) return;
    import("./components/BelowFold.jsx");

    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"];
    const timeoutId = setTimeout(mount, 2500);
    function mount() {
      clearTimeout(timeoutId);
      events.forEach((e) => window.removeEventListener(e, mount));
      setReady(true);
    }
    events.forEach((e) => window.addEventListener(e, mount, { passive: true, once: true }));

    return () => {
      clearTimeout(timeoutId);
      events.forEach((e) => window.removeEventListener(e, mount));
    };
  }, [ready]);

  useEffect(() => initSmoothAnchorScroll(), []);
  useEffect(() => initScrollTriggerRefresh(), []);

  return (
    <ThemeProvider>
      <ApplicationModalProvider>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          <Hero />
          {ready && (
            <Suspense fallback={<div style={{ minHeight: "100vh" }} aria-hidden="true" />}>
              <BelowFold />
            </Suspense>
          )}
        </main>
        {ready && <Footer />}
        <WhatsAppButton />
        <BackToTopButton />
      </ApplicationModalProvider>
    </ThemeProvider>
  );
}

export default App;
