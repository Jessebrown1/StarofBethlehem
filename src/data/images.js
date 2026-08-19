/**
 * Central image registry.
 * Replace these Unsplash placeholder URLs with the school's own photography
 * (African students in uniform, the real campus, labs, library, etc).
 * Every consumer imports from here, so swapping assets later only requires
 * editing this one file.
 */

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  heroStudents: unsplash("photo-1523240795612-9a054b0db644", 1800),
  heroDecorativeCampus: unsplash("photo-1580582932707-520aed937b7b", 900),

  aboutClassroom: unsplash("photo-1580582932707-520aed937b7b", 1400),
  aboutCampus: unsplash("photo-1497633762265-9d179a990aa6", 1400),

  whyChooseMain: unsplash("photo-1509062522246-3755977927d7", 1600),

  academicEarlyYears: unsplash("photo-1587616211892-b3c1de44b8c1", 1200),
  academicPrimary: unsplash("photo-1546410531-bb4caa6b424d", 1200),
  academicJHS: unsplash("photo-1580582932707-520aed937b7b", 1200),
  academicSHS: unsplash("photo-1523240795612-9a054b0db644", 1200),

  facilityClassrooms: unsplash("photo-1580582932707-520aed937b7b", 1200),
  facilityScienceLab: unsplash("photo-1532094349884-543bc11b234d", 1200),
  facilityICTLab: unsplash("photo-1518779578993-ec3579fee39f", 1200),
  facilityLibrary: unsplash("photo-1521587760476-6c12a4b040da", 1200),
  facilitySports: unsplash("photo-1526676037777-05a232554f77", 1200),
  facilityAuditorium: unsplash("photo-1475721027785-f74eccf877e2", 1200),

  admissionsBg: unsplash("photo-1523050854058-8df90110c9f1", 1800),

  studentLifeSports: unsplash("photo-1526676037777-05a232554f77", 1200),
  studentLifeClubs: unsplash("photo-1529390079861-591de354faf5", 1200),
  studentLifeLeadership: unsplash("photo-1531482615713-2afd69097998", 1200),
  studentLifeCulture: unsplash("photo-1543269865-cbf427effbad", 1200),
  studentLifeTrips: unsplash("photo-1523050854058-8df90110c9f1", 1200),
  studentLifeCompetitions: unsplash("photo-1571260899304-425eee4c7efc", 1200),

  newsScienceFair: unsplash("photo-1532094349884-543bc11b234d", 900),
  newsSports: unsplash("photo-1526676037777-05a232554f77", 900),
  newsLibrary: unsplash("photo-1521587760476-6c12a4b040da", 900),

  testimonial1: unsplash("photo-1544005313-94ddf0286df2", 300),
  testimonial2: unsplash("photo-1500648767791-00dcc994a43e", 300),
  testimonial3: unsplash("photo-1580489944761-15a19d654956", 300),

  finalCTA: unsplash("photo-1523240795612-9a054b0db644", 1800),
};
