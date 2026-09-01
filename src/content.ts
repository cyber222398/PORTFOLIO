/**
 * Every fact here comes from Ayoub Aznag's CV. Keep it that way — this file is the
 * single source of truth for the page's copy.
 */

export const profile = {
  name: "Ayoub Aznag",
  role: "Electrical Engineering / Embedded Systems",
  location: "Guelmim, Morocco",
  email: "ayoub.aznag.47@edu.uiz.ac.ma",
  phone: "+212 654 527 765",
  github: "https://github.com/cyber222398",
  year: "2026",
};

export const intro = [
  "I build and maintain the electrical systems that keep industrial plants running — machines, high-voltage installations, control cabinets.",
  "I hold a DUT in Electrical Engineering from EST Guelmim, and I earned it in the field: two internships at a working gold mine, studying an extraction machine and running preventive maintenance alongside engineers.",
  "Between the plant and the workbench sits the part I like most — embedded systems. Arduino, motion control, firmware that turns a wiring diagram into a machine that moves.",
];

export const capabilities = [
  "Electrical Maintenance",
  "Industrial Installations",
  "Electrical Machines",
  "Schematic Reading",
  "Fault Diagnosis",
  "High Voltage",
  "Arduino / C++",
  "CNC Control",
  "Embedded Systems",
  "Proteus",
  "Arduino IDE",
  "Mechanical Assembly",
];

export const credentials = [
  {
    title: "DUT — Génie Électrique",
    place: "EST Guelmim · Université Ibn Zohr",
    year: "2026",
  },
  {
    title: "Baccalauréat — Sciences et Techniques Électriques",
    place: "Lycée Technique d'Excellence Guelmim",
    year: "2024",
  },
];

export const projects = [
  {
    index: "01",
    name: "Mini CNC",
    year: "2026",
    role: "Design, build & firmware",
    context: "Academic project · EST Guelmim",
    description:
      "A working mini CNC prototype, built end to end. I wrote the Arduino firmware driving the axis motion, did the electrical wiring and mechanical assembly, then ran the functional tests. Driven through Process 3, a Java-based control interface.",
    stack: ["Arduino", "C/C++", "Process 3", "Mechanical assembly"],
  },
  {
    index: "02",
    name: "Extraction Machine Study",
    year: "2026",
    role: "Final-year study (SFE)",
    context: "Mine d'Ouansimi · AKKA Gold Mining, Groupe Managem",
    description:
      "I studied the mine's extraction machine and proposed integrating a measurement centre to monitor it. Alongside the study I joined the electrical maintenance crew on live industrial installations, troubleshooting equipment with the engineers and technicians on site.",
    stack: ["Electrical machines", "Instrumentation", "Industrial maintenance"],
  },
  {
    index: "03",
    name: "This Portfolio",
    year: "2026",
    role: "Design & build",
    context: "Personal project",
    description:
      "Built from scratch as a way to learn modern front-end properly: React and TypeScript for structure, GSAP and Lenis for the scroll-linked motion, and a prerendered build so the page arrives fast and readable before a single script runs.",
    stack: ["React", "TypeScript", "GSAP", "Lenis"],
  },
];

export const trajectory = [
  {
    index: "01",
    title: "Stage de Fin d'Études — Génie Électrique",
    org: "Mine d'Ouansimi · AKKA Gold Mining, Groupe Managem",
    period: "Apr — May 2026",
    detail:
      "Studied the extraction machine and proposed integrating a measurement centre. Carried out electrical maintenance on industrial installations and worked with engineers and technicians to troubleshoot equipment, following plant maintenance and safety procedures throughout.",
  },
  {
    index: "02",
    title: "Stage d'Initiation — Génie Électrique",
    org: "Mine d'Ouansimi · AKKA Gold Mining, Groupe Managem",
    period: "Aug — Sep 2025",
    detail:
      "First time inside a working mine. Assisted on preventive and corrective maintenance of electrical installations, took part in day-to-day industrial operations, and got my first exposure to high-voltage installations under strict safety procedure.",
  },
  {
    index: "03",
    title: "DUT — Génie Électrique",
    org: "EST Guelmim · Université Ibn Zohr",
    period: "2024 — 2026",
    detail:
      "Two years on electrical machines, industrial installations and automation, with the mini CNC as the project that tied the electrical, mechanical and firmware sides together.",
  },
  {
    index: "04",
    title: "Next — Engineering cycle",
    org: "Génie Électrique",
    period: "Ongoing",
    detail:
      "Looking to continue into an engineering cycle to go deeper on electrical machines, automation and industrial installations — the theory behind what I have already had my hands on.",
  },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Professional" },
  { name: "English", level: "Intermediate" },
];

export const marqueeItems = [
  "Electrical Engineering",
  "Embedded Systems",
  "Industrial Maintenance",
  "Arduino & CNC",
  "Automation",
];
