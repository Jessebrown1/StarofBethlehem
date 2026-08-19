import { useEffect } from "react";
import { ApplicationModalProvider } from "./context/ApplicationModalContext.jsx";
import { initSmoothAnchorScroll } from "./animations/smoothAnchorScroll";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ValuesSection from "./components/ValuesSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Stats from "./components/Stats.jsx";
import AcademicPrograms from "./components/AcademicPrograms.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Facilities from "./components/Facilities.jsx";
import AdmissionsCTA from "./components/AdmissionsCTA.jsx";
import StudentLife from "./components/StudentLife.jsx";
import NewsEvents from "./components/NewsEvents.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  useEffect(() => initSmoothAnchorScroll(), []);

  return (
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
        <StudentLife />
        <NewsEvents />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </ApplicationModalProvider>
  );
}

export default App;
