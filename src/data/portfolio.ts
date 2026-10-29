/**
 * Central content module. Everything displayed on the site (and everything MotoBot
 * is allowed to say) comes from this file + src/config/site.ts.
 *
 * Verification notes
 *  - Original fields (titles, descriptions, links, timeline) are preserved from the previous site.
 *  - MoodAware details (stack, features, metrics, academic context) are taken from the project's own
 *    public README on GitHub.
 *  - `highlights` are short restatements of each project's existing description — nothing new is claimed.
 *  - No live-demo URLs exist in the source data, so none are shown. Add `live: "https://…"` to a project
 *    and a "Live demo" button appears automatically.
 *  - No screenshots exist in the source data. Add `screenshot: "/projects/<file>.webp"` (file in /public)
 *    and it replaces the generated schematic plate automatically.
 */

export const profile = {
  name: "Loganathan Yathavan",
  shortName: "Yathavan",
  role: "Software Engineer",
  descriptor: "Computer Science undergraduate",
  tagline:
    "Final-year Computer Science undergraduate building full-stack web and mobile applications — with a growing focus on backend engineering and Java/Spring Boot.",
  subline: "I ship things end to end, then go find out why they broke.",
  location: "Colombo, Sri Lanka",
  status: "Open to work",
  openTo: "Open to entry-level software roles",
  photo: "https://yathavanjd.github.io/Yathavan_Portfolio/assets/image/profile.jpeg",
};

export const education = {
  degree: "BSc (Hons) Computer Science",
  institution: "SLIIT City University",
  partner: "University of Bedfordshire",
  expected: "Expected Sep 2026",
};

export const about = {
  heading:
    "I like systems that are simple to explain and hard to break — and I'm still learning how to build those consistently.",
  paragraphs: [
    "I'm a final-year BSc (Hons) Computer Science student at SLIIT City University, with hands-on experience across Java, JavaScript, and PHP — building everything from Android ride-booking apps to AI-powered emotion-detection platforms.",
    "I care about the unglamorous parts: clean database design, test cases that actually catch bugs, and code a teammate can read at 11pm before a deadline.",
    "Right now I'm deepening my backend skills with Spring Boot and getting comfortable with the DevOps tooling that turns a student project into something deployable.",
  ],
  /** Stated interests (not skill claims). */
  interests: [
    "Full-stack web & Android apps",
    "Backend engineering",
    "AI & machine learning",
    "Cybersecurity",
    "UI / UX",
    "Software testing",
  ],
};

export type SkillLevel = "core" | "working" | "learning";

export type Skill = {
  name: string;
  /** Only set where the original portfolio stated a level. */
  level?: SkillLevel;
  /** Extra strings that count as "this skill appears in a project's stack". */
  match?: string[];
  /** Shown as evidence when the skill isn't in a project's stack (e.g. tooling, coursework). */
  note?: string;
};

export type SkillCategory = {
  id: string;
  code: string;
  label: string;
  note: string;
  items: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    code: "LANG",
    label: "Languages",
    note: "What I write most.",
    items: [
      { name: "Java", level: "core" },
      { name: "JavaScript", level: "core", match: ["JS"] },
      { name: "PHP", level: "core" },
      { name: "Python", level: "learning" },
      { name: "TypeScript", note: "Used to build this portfolio site." },
      { name: "SQL", match: ["MySQL"] },
    ],
  },
  {
    id: "frontend",
    code: "FRONT",
    label: "Frontend",
    note: "Interfaces that stay readable.",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "React", note: "Used to build this portfolio site." },
      { name: "Tailwind CSS", note: "Used to style this portfolio site." },
      { name: "GSAP", note: "Powers the motion on this portfolio site (ScrollTrigger, Flip)." },
      { name: "Bootstrap" },
      { name: "jQuery" },
      { name: "AJAX" },
    ],
  },
  {
    id: "backend",
    code: "BACK",
    label: "Backend & APIs",
    note: "Where the logic lives.",
    items: [
      { name: "REST APIs", level: "working" },
      { name: "Flask" },
      { name: "JDBC" },
      { name: "JSON" },
      { name: "Spring Boot", level: "learning" },
    ],
  },
  {
    id: "data",
    code: "DATA",
    label: "Databases",
    note: "Schema first.",
    items: [{ name: "MySQL" }, { name: "MongoDB" }],
  },
  {
    id: "ai",
    code: "AI/ML",
    label: "AI & Computer Vision",
    note: "Used in MoodAware.",
    items: [
      { name: "TensorFlow / Keras", match: ["TensorFlow"] },
      { name: "scikit-learn" },
      { name: "OpenCV" },
      { name: "Facial Recognition", note: "The face-emotion model in MoodAware." },
    ],
  },
  {
    id: "mobile",
    code: "MOBILE",
    label: "Android",
    note: "Native apps in Java.",
    items: [
      { name: "Android / Java", level: "working", match: ["Android Studio"] },
      { name: "XML" },
    ],
  },
  {
    id: "security",
    code: "SEC/QA",
    label: "Security & Testing",
    note: "Coursework and practice.",
    items: [
      { name: "Vulnerability Assessment" },
      { name: "Security Policy Design", match: ["Policy Design"] },
      { name: "Test-case design", note: "Ongoing practice — see Experience." },
      { name: "Functional & system testing", note: "Ongoing practice — see Experience." },
    ],
  },
  {
    id: "tools",
    code: "TOOLS",
    label: "Tools & Practice",
    note: "How the work gets done.",
    items: [
      { name: "Git", note: "Every project is version-controlled." },
      { name: "GitHub", note: "All 13 projects are hosted on GitHub." },
      { name: "VS Code", note: "Everyday editor, listed in the original toolkit." },
      { name: "Android Studio" },
      { name: "SDLC", note: "Software development lifecycle — coursework and practice." },
      { name: "Networking", note: "Applied coursework module." },
    ],
  },
];

export type ProjectGroup = "Web" | "Android" | "AI / ML" | "Java" | "Security";

export type Project = {
  id: string;
  index: string;
  category: string;
  group: ProjectGroup;
  title: string;
  description: string;
  stack: string[];
  /** GitHub URL. */
  href: string;
  /** True when `href` only points at the GitHub profile (no dedicated repo URL on record). */
  repoIsProfile?: boolean;
  live?: string;
  screenshot?: string;
  role?: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
  results?: string[];
  caveat?: string;
};

const PROFILE_REPO = "https://github.com/YathavanJD";

export const projects: Project[] = [
  {
    id: "moodaware",
    index: "01",
    category: "Final Year Project",
    group: "AI / ML",
    title: "MoodAware — Emotion-Based Music & Wellness Recommender",
    description:
      "An AI-powered web application that detects user emotions in real time through facial expression recognition and recommends personalised music and mental wellness content. Covers computer vision, ML pipelines, and a full-stack web interface.",
    stack: ["Python", "Flask", "TensorFlow / Keras", "scikit-learn", "OpenCV", "MongoDB"],
    href: "https://github.com/YathavanJD/Mood_Aware_Final-_Year_Project",
    role: "Author · final-year undergraduate thesis project",
    problem:
      "Mood-based playlists usually lean on listening history, not on how a person feels right now.",
    solution:
      "Detects emotion from webcam facial expressions and typed text, maps it to music and wellness content, and logs moods to a history dashboard.",
    highlights: [
      "Face model: EfficientNetB0 transfer learning",
      "Text model: TF-IDF + Logistic Regression",
      "Authentication, mood history and admin dashboards",
    ],
    results: [
      "Text emotion model: 87.25% accuracy",
      "Face emotion model: 56% accuracy — sensitive to lighting and image quality",
    ],
    caveat:
      "Figures are from the project README. An experimental academic project, not a clinical or diagnostic tool.",
  },
  {
    id: "learnforged",
    index: "02",
    category: "Full Stack · LMS",
    group: "Web",
    title: "Learn_Forged — Learning Management System",
    description:
      "A full-stack LMS enabling course management, user authentication, student enrollment, and progress tracking with role-based access and a clean dashboard UI.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    href: "https://github.com/YathavanJD/Learn_Forged",
    highlights: ["Course management", "Role-based access", "Enrolment and progress tracking"],
  },
  {
    id: "skmetal",
    index: "03",
    category: "Full Stack · E-commerce",
    group: "Web",
    title: "SK Metal Shop",
    description:
      "Product, inventory, and order management platform with live stock monitoring, customer authentication, shopping cart, checkout, and an admin dashboard.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    href: "https://github.com/YathavanJD/SK_Metal-shop",
    highlights: ["Live stock monitoring", "Cart and checkout", "Admin dashboard"],
  },
  {
    id: "cabzo",
    index: "04",
    category: "Android",
    group: "Android",
    title: "Cabzo — Car Booking App",
    description:
      "A ride-booking Android application with ride request management, a mobile-optimised UI, and live ride tracking functionality built entirely in Android Studio.",
    stack: ["Java", "Android Studio", "XML"],
    href: "https://github.com/YathavanJD/Cabzo",
    highlights: ["Ride request management", "Live ride tracking", "Built entirely in Android Studio"],
  },
  {
    id: "studentmgmt",
    index: "05",
    category: "Web App",
    group: "Web",
    title: "Student Management System",
    description:
      "A dynamic student management application with real-time data updates via AJAX, responsive UI, and efficient CRUD record handling — no page reloads required.",
    stack: ["AJAX", "JSON", "jQuery", "PHP", "MySQL"],
    href: PROFILE_REPO,
    repoIsProfile: true,
  },
  {
    id: "vertex",
    index: "06",
    category: "Multi-Page Website",
    group: "Web",
    title: "Vertex Digital Solutions",
    description:
      "A responsive 4-page marketing website for a software and cloud consultancy, featuring consistent design tokens, accessible navigation, and a validated contact form — no build tools required.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Vertex_Degital",
    highlights: ["Responsive 4-page site", "Consistent design tokens", "Validated contact form"],
  },
  {
    id: "heartquist",
    index: "07",
    category: "Web · Game",
    group: "Web",
    title: "HeartQuist — Web Quiz Game",
    description:
      "Interactive browser-based quiz with dynamic scoring and a fun, visually appealing experience across multiple question rounds.",
    stack: ["JavaScript", "HTML", "CSS"],
    href: "https://github.com/YathavanJD/heart-quist",
  },
  {
    id: "knowledgeknockout",
    index: "08",
    category: "Android · Game",
    group: "Android",
    title: "KnowledgeKnockout — Android Quiz",
    description:
      "Interactive Android quiz game with multi-topic questions, score tracking, and competitive UX built in Android Studio.",
    stack: ["Java", "Android Studio", "XML"],
    href: "https://github.com/YathavanJD/Knowledge-knockout",
  },
  {
    id: "wrapitup",
    index: "09",
    category: "E-commerce",
    group: "Web",
    title: "Wrap It Up — Cake Shop",
    description:
      "Responsive product browsing and ordering site for a small cake business with mobile-friendly layout and smooth checkout flow.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Cake_web",
    highlights: ["Responsive product browsing", "Ordering and checkout flow", "Mobile-friendly layout"],
  },
  {
    id: "carwash",
    index: "10",
    category: "OOP · Java",
    group: "Java",
    title: "Car Wash Management System",
    description:
      "Java application built around core OOP concepts — classes, inheritance, encapsulation — to manage bookings and billing for a car wash business.",
    stack: ["Java", "OOP"],
    href: "https://github.com/YathavanJD/Car_wash_managenent_system",
  },
  {
    id: "portfolio",
    index: "11",
    category: "Portfolio",
    group: "Web",
    title: "Yathavan_Portfolio — Previous Site",
    description:
      "The previous personal portfolio website showcasing skills, projects, and experience — built with HTML, CSS and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Yathavan_Portfolio",
  },
  {
    id: "managementsystem",
    index: "12",
    category: "Full Stack",
    group: "Java",
    title: "Management System",
    description:
      "A structured CRUD application with database integration — developed applying OOP design patterns and clean architecture principles.",
    stack: ["Java", "MySQL", "JDBC"],
    href: PROFILE_REPO,
    repoIsProfile: true,
  },
  {
    id: "vidma",
    index: "13",
    category: "Security · Coursework",
    group: "Security",
    title: "Security Assessment & Data Protection — Vidma Engineering",
    description:
      "Conducted security assessments, identified system vulnerabilities, evaluated existing security policies, and designed a data protection improvement plan as part of the Computer Security module. Deliverables included a full vulnerability report and a recommended policy framework.",
    stack: ["Security Analysis", "Vulnerability Assessment", "Policy Design", "Documentation"],
    href: PROFILE_REPO,
    repoIsProfile: true,
  },
];

/** Featured subset driving the pinned showcase. */
export const featuredProjectIds = [
  "moodaware",
  "learnforged",
  "skmetal",
  "cabzo",
  "vertex",
  "wrapitup",
];

export const projectGroups: ("All" | ProjectGroup)[] = [
  "All",
  "Web",
  "Android",
  "AI / ML",
  "Java",
  "Security",
];

export type TimelineEntry = {
  date: string;
  tag: string;
  title: string;
  body: string;
};

export const timeline: TimelineEntry[] = [
  {
    date: "Expected Sep 2026",
    tag: "final year",
    title: "BSc (Hons) Computer Science — SLIIT City University",
    body: "Software engineering, full-stack development, and database systems coursework, with applied modules in AI fundamentals, networking, and software testing.",
  },
  {
    date: "March 2022 – Jan 2023",
    tag: "coursework",
    title: "Diploma in English",
    body: "Completed alongside undergraduate studies, building communication skills used daily across team collaboration and documentation.",
  },
  {
    date: "Coursework",
    tag: "security",
    title: "Security Assessment & Data Protection — Vidma Engineering",
    body: "Conducted security assessments, identified vulnerabilities, evaluated existing security policies, and designed data protection improvement plans for a Computer Security module.",
  },
  {
    date: "Ongoing practice",
    tag: "QA",
    title: "Software Testing & Test Case Development",
    body: "Designed and documented test cases, ran functional and system testing, identified defects, and validated fixes to improve software reliability.",
  },
];

/** Hero scroll narrative. Every line restates something already on record. */
export const heroStages = [
  {
    id: "discover",
    n: "01",
    label: "DISCOVER",
    line: "Final-year BSc (Hons) Computer Science at SLIIT City University.",
  },
  {
    id: "design",
    n: "02",
    label: "DESIGN",
    line: "Clean database design, REST APIs, and code a teammate can read.",
  },
  {
    id: "build",
    n: "03",
    label: "BUILD",
    line: "Java, JavaScript, PHP / MySQL — plus Android and Python ML.",
  },
  {
    id: "ship",
    n: "04",
    label: "SHIP",
    line: `${projects.length} projects on GitHub, and test cases that catch what broke.`,
  },
] as const;

/** Section navigation, in page order. */
export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
