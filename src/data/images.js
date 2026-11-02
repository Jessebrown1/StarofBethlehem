/**
 * Central image registry — real Star of Bethlehem School photography
 * (src/assets/images/), supplied by the school. There are more image slots
 * across the site than distinct source photos, so some photos are reused
 * across thematically related sections (e.g. the sports day photo covers
 * Student Life > Sports and News > Sports).
 */

import heroStudents from "../assets/images/hero-students.jpeg";
import campusAdminBlock from "../assets/images/campus-admin-block.jpeg";
import classroomCelebration from "../assets/images/classroom-celebration.jpeg";
import sportsDay from "../assets/images/sports-day.jpeg";
import museumTrip from "../assets/images/museum-trip.jpeg";
import potteryCraft from "../assets/images/pottery-craft.jpeg";
import graduation2025 from "../assets/images/graduation-2025.jpeg";
import competitionTrophy from "../assets/images/competition-trophy.jpeg";
import edu from "../assets/images/edu.jpg";
import education from "../assets/images/education.jpeg"
import early from "../assets/images/early.jpg"
import prim from "../assets/images/prim.jpg"
import jhs from "../assets/images/jhs.jpg"
import safe from "../assets/images/safe.jpg"
import sport from "../assets/images/sport.jpg"
import lead from "../assets/images/lead.jpg"
import comp from "../assets/images/comp.jpg"
import grad from "../assets/images/grad.jpg"

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



  finalCTA: graduation2025,
};
