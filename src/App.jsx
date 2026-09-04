import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ApplicationModalProvider } from "./context/ApplicationModalContext.jsx";
import { initSmoothAnchorScroll } from "./animations/smoothAnchorScroll";
import { initScrollTriggerRefresh } from "./animations/refreshScrollTrigger";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ValuesSection from "./components/ValuesSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Stats from "./components/Stats.jsx";
import AcademicPrograms from "./components/AcademicPrograms.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Facilities from "./components/Facilities.jsx";
import AdmissionsCTA from "./components/AdmissionsCTA.jsx";
import AdmissionsTimeline from "./components/AdmissionsTimeline.jsx";
import StudentLife from "./components/StudentLife.jsx";
import Gallery from "./components/Gallery.jsx";
import NewsEvents from "./components/NewsEvents.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQSection from "./components/FAQSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

function App() {
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
          <ValuesSection />
          <AboutSection />
          <Stats />
          <AcademicPrograms />
          <WhyChooseUs />
          <Facilities />
          <AdmissionsCTA />
          <AdmissionsTimeline />
          <StudentLife />
          <Gallery />
          <NewsEvents />
          <Testimonials />
          <FAQSection />
          <ContactSection />
          <FinalCTA />
        </main>
        <Footer />
        <WhatsAppButton />
      </ApplicationModalProvider>
    </ThemeProvider>
  );
}

export default App;
