import { useEffect } from "react";
import { ScrollTrigger } from "../animations/gsapSetup";
import ValuesSection from "./ValuesSection.jsx";
import AboutSection from "./AboutSection.jsx";
import Stats from "./Stats.jsx";
import AcademicPrograms from "./AcademicPrograms.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import SafetyCare from "./SafetyCare.jsx";
import AdmissionsCTA from "./AdmissionsCTA.jsx";
import AdmissionsTimeline from "./AdmissionsTimeline.jsx";
import StudentLife from "./StudentLife.jsx";
import Gallery from "./Gallery.jsx";
import ParentPartnership from "./ParentPartnership.jsx";
import Testimonials from "./Testimonials.jsx";
import FAQSection from "./FAQSection.jsx";
import ContactSection from "./ContactSection.jsx";
import FinalCTA from "./FinalCTA.jsx";

/* Everything under the hero. App loads this in a separate chunk after the
   hero has painted, so the first screen isn't waiting on the whole page. */
export default function BelowFold() {
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const target = window.location.hash && document.querySelector(window.location.hash);
      if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 96);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <ValuesSection />
      <AboutSection />
      <Stats />
      <AcademicPrograms />
      <WhyChooseUs />
      <SafetyCare />
      <AdmissionsCTA />
      <AdmissionsTimeline />
      <StudentLife />
      <Gallery />
      <ParentPartnership />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
