/**
 * Central image registry — real Star of Bethlehem School photography
 * (src/assets/images/), supplied by the school. There are more image slots
 * across the site than distinct source photos, so some photos are reused
 * across thematically related sections (e.g. the sports day photo covers
 * Student Life > Sports, Facilities > Sports, and News > Sports).
 *
 * Testimonial avatars are the one exception, kept as generic stock photos:
 * the testimonials are placeholder copy, not real named parents, so using
 * a real student's photo next to a fabricated quote would misrepresent
 * that specific child.
 */

import heroStudents from "../assets/images/hero-students.jpeg";
import campusAdminBlock from "../assets/images/campus-admin-block.jpeg";
import classroomCelebration from "../assets/images/classroom-celebration.jpeg";
import sportsDay from "../assets/images/sports-day.jpeg";
import museumTrip from "../assets/images/museum-trip.jpeg";
import potteryCraft from "../assets/images/pottery-craft.jpeg";
import graduation2025 from "../assets/images/graduation-2025.jpeg";
import competitionTrophy from "../assets/images/competition-trophy.jpeg";

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  heroStudents,

  aboutClassroom: classroomCelebration,
  aboutCampus: campusAdminBlock,

  whyChooseMain: sportsDay,

  academicEarlyYears: classroomCelebration,
  academicPrimary: campusAdminBlock,
  academicJHS: potteryCraft,
  academicSHS: competitionTrophy,

  facilityClassrooms: classroomCelebration,
  facilityScienceLab: classroomCelebration,
  facilityICTLab: campusAdminBlock,
  facilityLibrary: museumTrip,
  facilitySports: sportsDay,
  facilityAuditorium: graduation2025,

  admissionsBg: campusAdminBlock,

  studentLifeSports: sportsDay,
  studentLifeClubs: potteryCraft,
  studentLifeLeadership: competitionTrophy,
  studentLifeCulture: graduation2025,
  studentLifeTrips: museumTrip,
  studentLifeCompetitions: competitionTrophy,

  newsScienceFair: classroomCelebration,
  newsSports: sportsDay,
  newsLibrary: museumTrip,

  // Testimonials are placeholder copy (not real named parents) — kept as
  // generic stock photos rather than a real student's photo.
  testimonial1: unsplash("photo-1544005313-94ddf0286df2", 300),
  testimonial2: unsplash("photo-1500648767791-00dcc994a43e", 300),
  testimonial3: unsplash("photo-1580489944761-15a19d654956", 300),

  finalCTA: graduation2025,
};
