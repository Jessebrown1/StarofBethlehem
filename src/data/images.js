/**
 * Central image registry — real Star of Bethlehem School photography
 * (src/assets/images/), supplied by the school. There are more image slots
 * across the site than distinct source photos, so some photos are reused
 * across thematically related sections (e.g. the sports day photo covers
 * Student Life > Sports and News > Sports).
 */

import campusAdminBlock from "../assets/images/campus-admin-block.webp";
import classroomCelebration from "../assets/images/classroom-celebration.webp";
import sportsDay from "../assets/images/sports-day.webp";
import museumTrip from "../assets/images/museum-trip.webp";
import potteryCraft from "../assets/images/pottery-craft.webp";
import graduation2025 from "../assets/images/graduation-2025.webp";
import competitionTrophy from "../assets/images/competition-trophy.webp";
import edu from "../assets/images/edu.webp";
import education from "../assets/images/education.webp"
import early from "../assets/images/early.webp"
import prim from "../assets/images/prim.webp"
import jhs from "../assets/images/jhs.webp"
import safe from "../assets/images/safe.webp"
import sport from "../assets/images/sport.webp"
import lead from "../assets/images/lead.webp";
import comp from "../assets/images/comp.webp"
import grad from "../assets/images/grad.webp"
import trip from "../assets/images/trip.webp"
// Lives in /public (fixed URL) so index.html can preload it for a faster
// first paint — see the <link rel="preload"> there.
const heroStudents = "/hero-students.webp";

export const IMAGES = {
  heroStudents,


  aboutCampus: education,
  aboutClassroom: edu,

  whyChooseMain: sportsDay,

  academicEarlyYears: early,
  academicPrimary: prim,
  academicJHS: jhs,


  safetyCare: safe,

  admissionsBg: campusAdminBlock,
  admissionsPhoto: graduation2025,

  studentLifeSports: sport,
  studentLifeClubs: potteryCraft,
  studentLifeLeadership: lead,
  studentLifeCulture: grad,
  studentLifeTrips: museumTrip,
  studentLifeCompetitions: comp,



  finalCTA: trip,
};
