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
      { name: "Node.js" },
      { name: "Express", match: ["Express.js"] },
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
      { name: "Docker", note: "Used to run Learn_Forged (Docker Compose)." },
      { name: "VS Code", note: "Everyday editor, listed in the original toolkit." },
      { name: "Android Studio" },
      { name: "SDLC", note: "Software development lifecycle — coursework and practice." },
      { name: "Networking", note: "Applied coursework module." },
    ],
  },
];

export type ProjectGroup = "Web" | "Android" | "AI / ML" | "Java" | "Security";

export type ProjectDetails = {
  /** "readme" = taken from the repo's own README; "summary" = only restates the portfolio description. */
  source: "readme" | "summary";
  overview: string[];
  context?: string;
  features?: { title: string; text?: string }[];
  flow?: string[];
  architecture?: string[];
  stackByLayer?: { layer: string; tech: string }[];
  usage?: string[];
  metrics?: { label: string; value: string }[];
  purpose?: string[];
  run?: string[];
  future?: string[];
  notes?: string[];
};

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
  details: ProjectDetails;
};

const PROFILE_REPO = "https://github.com/YathavanJD";
const NO_README =
  "A detailed README isn't published for this project yet, so this page only restates what's on record. The source on GitHub is the best reference.";

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
    details: {
      source: "readme",
      overview: [
        "MoodAware detects a user's emotion in real time — from a webcam image or from text they type — and then recommends music and offers mental-wellness guidance to match.",
        "The problem it explores: platforms like Spotify and Apple Music offer mood playlists, but they rely on listening history rather than detecting the user's real-time emotional state. MoodAware tries to close that gap and adds a mood-tracking dashboard so users can see their emotional patterns over time.",
      ],
      context:
        "Developed as a Final Year Undergraduate Thesis for BSc (Hons) Computer Science at SLIIT City University / University of Bedfordshire, academic year 2025–2026.",
      features: [
        { title: "Face emotion detection", text: "Real-time facial expression recognition through the webcam, using a CNN based on EfficientNetB0." },
        { title: "Text emotion analysis", text: "Sentiment classification of typed text using TF-IDF features and Logistic Regression." },
        { title: "Music recommendations", text: "Spotify and YouTube playlists mapped to the detected emotion." },
        { title: "Recovery pathway", text: "A guided progression from negative towards more positive emotional states." },
        { title: "Mood history dashboard", text: "Charts showing emotional patterns over time." },
        { title: "User authentication", text: "Registration and login with Flask-Login, with passwords hashed using Bcrypt." },
        { title: "Admin dashboard", text: "A control hub with user management and emotion analytics." },
      ],
      flow: [
        "User input — a webcam image or typed text (the app offers “VibeScribe” for text and “EmotionCam” for the camera).",
        "Preprocessing — OpenCV face detection, or NLP tokenisation for text.",
        "Emotion detection — the CNN face model or the Logistic Regression text model.",
        "Result fusion — a weighted combination of the scores.",
        "Recommendation engine — maps the mood to music categories.",
        "Output — the detected mood plus Spotify/YouTube suggestions, with the mood saved to the database.",
      ],
      architecture: [
        "Client side — HTML, CSS and JavaScript with Bootstrap for a responsive UI.",
        "Backend (Python / Flask) — user, authentication, emotion-controller, recommendation-engine and recovery-pathway modules.",
        "Data — MongoDB Atlas for users, mood history and sessions.",
        "AI processing — the face model (CNN) and the text model (TF-IDF + Logistic Regression).",
      ],
      stackByLayer: [
        { layer: "Backend", tech: "Python 3.10, Flask, PyMongo, Flask-Login, Bcrypt" },
        { layer: "AI / ML", tech: "TensorFlow / Keras (EfficientNetB0 transfer learning), scikit-learn, OpenCV" },
        { layer: "Frontend", tech: "HTML5, CSS3, JavaScript, Bootstrap" },
        { layer: "Database", tech: "MongoDB Atlas" },
      ],
      usage: [
        "Sign up with a valid email and a strong password, then log in.",
        "Choose a way to detect mood: type how you feel (VibeScribe) or scan with the camera (EmotionCam).",
        "See the detected emotion, a confidence score and recommended playlists.",
        "Open the mood history page to review trends over time.",
      ],
      metrics: [
        { label: "Text model — overall accuracy", value: "87.25%" },
        { label: "Text model — macro F1-score", value: "0.88" },
        { label: "Face model — overall accuracy", value: "56%" },
        { label: "Face model — macro F1-score", value: "0.47" },
      ],
      run: [
        "Needs Python 3.10+ and a MongoDB Atlas account (or a local MongoDB).",
        "Create a virtual environment and run pip install -r requirements.txt.",
        "Add a .env file with MONGO_URI and SECRET_KEY (never commit it).",
        "Run python app.py and open http://localhost:5000.",
      ],
      future: ["Larger, more diverse face-emotion datasets, since the face model is affected by lighting conditions and image quality."],
      notes: [
        "An experimental recommendation application — not a clinically validated mental-health or diagnostic tool.",
        "All figures above are quoted from the project's README, not measured independently.",
      ],
    },
  },
  {
    id: "learnforged",
    index: "02",
    category: "Full Stack · LMS",
    group: "Web",
    title: "Learn_Forged — Learning Management System",
    description:
      "A full-stack LMS enabling course management, user authentication, student enrollment, and progress tracking with role-based access and a clean dashboard UI.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB", "Docker"],
    href: "https://github.com/YathavanJD/Learn_Forged",
    highlights: ["Course management", "Role-based access", "Enrolment and progress tracking"],
    details: {
      source: "readme",
      overview: [
        "LearnForge LMS is a Learning Management System that lets educational institutions, instructors and students manage online learning in one place: course creation, enrolment, content delivery and progress monitoring.",
      ],
      features: [
        { title: "Student", text: "Registration and login, browse and enrol in courses, view course content, track learning progress, manage a profile." },
        { title: "Instructor / admin", text: "Dashboard, course management, student management, uploading learning materials, monitoring student progress, managing users." },
        { title: "Authentication", text: "Secure login, session management, password encryption and role-based access control." },
        { title: "Security measures", text: "Password hashing, protected routes, session handling and input validation." },
      ],
      architecture: [
        "A Node.js / Express server with separate routes, controllers, models and middleware folders.",
        "MongoDB as the database, with static front-end pages served from the server's public folder.",
        "Docker and Docker Compose files for running the whole app in containers.",
      ],
      stackByLayer: [
        { layer: "Frontend", tech: "HTML5, CSS3, JavaScript (ES6)" },
        { layer: "Backend", tech: "Node.js, Express.js" },
        { layer: "Database", tech: "MongoDB" },
        { layer: "Tooling", tech: "Docker, Docker Compose, npm" },
      ],
      run: [
        "Install dependencies with npm install and create a .env file (port, MongoDB connection string, session secret).",
        "Start with npm start — or run docker-compose up --build to use Docker.",
      ],
      future: [
        "Online exams and assignment submission",
        "Certificate generation",
        "Video lectures, live classes and a discussion forum",
        "Notifications and email verification",
        "Payment integration and a mobile application",
      ],
      notes: ["This detail page follows the repository's README, which lists Node.js / Express / MongoDB. Earlier versions of this portfolio listed a PHP / MySQL stack for this project."],
    },
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
    details: {
      source: "summary",
      overview: [
        "A product, inventory and order management platform for a metal shop, covering both the customer-facing shopping experience and the back-office tools.",
      ],
      features: [
        { title: "Live stock monitoring", text: "Inventory levels are tracked so stock status stays visible." },
        { title: "Customer authentication", text: "Customers can sign in to their accounts." },
        { title: "Shopping cart and checkout", text: "Customers add products to a cart and complete an order." },
        { title: "Order and product management", text: "Products, inventory and orders are managed from the platform." },
        { title: "Admin dashboard", text: "A back-office view for running the shop." },
      ],
      stackByLayer: [
        { layer: "Frontend", tech: "HTML, CSS, JavaScript" },
        { layer: "Backend", tech: "PHP" },
        { layer: "Database", tech: "MySQL" },
      ],
      notes: [NO_README],
    },
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
    details: {
      source: "summary",
      overview: ["Cabzo is a ride-booking Android application: passengers request rides and the app manages those requests, with live ride tracking."],
      features: [
        { title: "Ride request management", text: "Creating and handling ride requests." },
        { title: "Live ride tracking", text: "Following a ride's progress." },
        { title: "Mobile-optimised UI", text: "Screens designed for phones." },
      ],
      stackByLayer: [
        { layer: "Platform", tech: "Android" },
        { layer: "Language", tech: "Java" },
        { layer: "UI", tech: "XML layouts" },
        { layer: "IDE", tech: "Android Studio" },
      ],
      notes: [NO_README],
    },
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
    details: {
      source: "summary",
      overview: ["A student management web application where records are created, read, updated and deleted without full page reloads."],
      features: [
        { title: "Real-time updates", text: "Data refreshes through AJAX calls, so pages don't reload." },
        { title: "CRUD record handling", text: "Create, read, update and delete student records." },
        { title: "Responsive UI", text: "A layout that adapts to different screen sizes." },
      ],
      stackByLayer: [
        { layer: "Frontend", tech: "jQuery, AJAX, JSON" },
        { layer: "Backend", tech: "PHP" },
        { layer: "Database", tech: "MySQL" },
      ],
      notes: [NO_README, "Only a GitHub profile link is on record for this project, not a dedicated repository URL."],
    },
  },
  {
    id: "vertex",
    index: "06",
    category: "Multi-Page Website",
    group: "Web",
    title: "Vertex Digital Solutions",
    description:
      "A responsive 4-page marketing website for a fictional software and cloud consultancy, built as a coursework structural example — with consistent design tokens, accessible navigation, and a validated contact form. No build tools required.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Vertex_Degital",
    highlights: ["Responsive 4-page site", "Consistent design tokens", "Validated contact form"],
    details: {
      source: "readme",
      overview: [
        "A responsive four-page marketing site for a fictional software / cloud consultancy, built as a clean structural example for a coursework task. It needs no build step — open index.html in a browser.",
      ],
      features: [
        { title: "Home", text: "Hero, stats, service overview, featured work and a call to action." },
        { title: "About", text: "Company story, timeline, values and leadership team." },
        { title: "Services", text: "Service list, process, pricing tiers and an FAQ." },
        { title: "Contact", text: "Contact details, a map placeholder and a validated form." },
        { title: "Responsive design", text: "Fluid type, CSS Grid / Flexbox, and a hamburger navigation below about 880px; tested down to about 360px." },
        { title: "Consistent UI", text: "One stylesheet of design tokens (colour, type, spacing, radius, shadow) drives every page." },
        { title: "Accessible details", text: "Visible focus states, semantic landmarks, aria-labels on icon links, and a reduced-motion override for the hero animation." },
      ],
      architecture: [
        "Four HTML pages sharing the same header and footer markup, with aria-current on the active link.",
        "css/style.css for the design tokens and all styles; js/script.js for the nav toggle, FAQ accordion and form validation.",
      ],
      stackByLayer: [
        { layer: "Markup", tech: "HTML5 (semantic landmarks)" },
        { layer: "Styling", tech: "CSS custom properties, Grid, Flexbox" },
        { layer: "Behaviour", tech: "Vanilla JavaScript" },
      ],
      run: ["Open index.html directly, or serve the folder with any static server (for example python3 -m http.server 8080)."],
      notes: ["The contact form is client-side only: it validates and shows a confirmation, but sends no data anywhere. The README explains how to connect it to a real endpoint."],
    },
  },
  {
    id: "heartquist",
    index: "07",
    category: "Web · Game",
    group: "Web",
    title: "HeartQuest — Web Quiz Game",
    description:
      "A browser-based quiz platform with multiple-choice gameplay, real-time scoring, a leaderboard, user accounts and game history.",
    stack: ["JavaScript", "HTML", "CSS", "Node.js", "PHP"],
    href: "https://github.com/YathavanJD/heart-quist",
    details: {
      source: "readme",
      overview: [
        "HeartQuest is a web-based quiz application that challenges players with multiple-choice questions, tracks scores in real time and ranks players on a leaderboard. With pages for login, signup, profile and game history, it goes beyond a single-screen quiz.",
      ],
      features: [
        { title: "Multiple-choice gameplay", text: "Instant right / wrong feedback on each question." },
        { title: "Real-time score tracking", text: "The score updates as you play." },
        { title: "Leaderboard", text: "See how you rank against other players." },
        { title: "User accounts", text: "Sign up, log in and manage a profile." },
        { title: "Game history and result summary", text: "Review past sessions and a breakdown after every game." },
        { title: "Browser-based and responsive", text: "Runs in a modern browser with a styled, responsive interface." },
      ],
      architecture: [
        "A multi-page front end (landing, login, signup, game, result, leaderboard, profile and about pages).",
        "A Node.js server (server.js) plus a small PHP leaderboard API (leaderboard_api.php).",
        "JSON files for users, leaderboard and game-history storage.",
      ],
      stackByLayer: [
        { layer: "Structure / styling", tech: "HTML5, CSS3" },
        { layer: "Logic", tech: "Vanilla JavaScript" },
        { layer: "Backend / API", tech: "Node.js, PHP" },
        { layer: "Data storage", tech: "JSON files" },
      ],
      usage: [
        "Sign up or log in, then press Start Quiz.",
        "Answer each multiple-choice question and get instant feedback.",
        "View the result summary, then check the leaderboard.",
        "Open your profile to revisit your game history.",
      ],
      purpose: [
        "Multi-page web-app architecture with consistent navigation",
        "A user authentication flow (sign up, login, sessions)",
        "DOM manipulation and event-driven JavaScript",
        "JSON-based data persistence and backend integration",
      ],
      run: ["Install dependencies with npm install and start the backend with node server.js. To explore only the front end, open index.html in a browser."],
    },
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
    details: {
      source: "readme",
      overview: [
        "KnowledgeKnockout is an interactive Android quiz app that challenges players with multiple-choice questions across a variety of topics, with a smooth, intuitive interface.",
      ],
      features: [
        { title: "Multiple-choice gameplay", text: "Four options per question with instant feedback." },
        { title: "Score tracking", text: "A live score throughout the quiz." },
        { title: "Result display", text: "A final score summary at the end of each round." },
        { title: "Smooth navigation", text: "Seamless transitions between questions." },
        { title: "User-friendly UI", text: "A clean interface built with XML layouts." },
      ],
      architecture: ["Activity-based Android app with event-driven logic: Java classes for activities and logic, XML layouts and resources for the UI."],
      stackByLayer: [
        { layer: "Language", tech: "Java / Kotlin (as listed in the README)" },
        { layer: "UI", tech: "XML layouts" },
        { layer: "IDE", tech: "Android Studio" },
      ],
      usage: [
        "Launch the app and tap Start Quiz.",
        "Pick one of four answers for each question.",
        "Watch your score update, then see the final summary.",
      ],
      purpose: [
        "UI design with XML layouts, views and styling",
        "Activity lifecycle management and navigation",
        "Event-driven programming with click listeners and state handling",
        "Score logic and data flow between activities",
      ],
      run: ["Open the project in Android Studio, let Gradle sync, then run it on an emulator or a physical device (Android SDK API 21+)."],
    },
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
    details: {
      source: "summary",
      overview: ["A responsive product-browsing and ordering website for a small cake business."],
      features: [
        { title: "Product browsing", text: "Responsive pages for looking through the cakes on offer." },
        { title: "Ordering and checkout", text: "A smooth checkout flow." },
        { title: "Mobile-friendly layout", text: "Works comfortably on phones." },
      ],
      stackByLayer: [{ layer: "Front end", tech: "HTML, CSS, JavaScript" }],
      notes: [NO_README],
    },
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
    details: {
      source: "summary",
      overview: ["A Java application that manages bookings and billing for a car wash business, built to practise core object-oriented programming."],
      features: [
        { title: "Bookings", text: "Managing car wash bookings." },
        { title: "Billing", text: "Handling billing for the services." },
      ],
      purpose: ["Applying core OOP concepts: classes, inheritance and encapsulation."],
      stackByLayer: [{ layer: "Language", tech: "Java (object-oriented design)" }],
      notes: [NO_README],
    },
  },
  {
    id: "portfolio",
    index: "11",
    category: "Portfolio",
    group: "Web",
    title: "Yathavan_Portfolio — This Portfolio",
    description:
      "The source code of this website: a motion-driven portfolio built with React, TypeScript, Tailwind CSS and GSAP, with a rule-based assistant, honest contact options and reduced-motion support.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
    href: "https://github.com/YathavanJD/Yathavan_Portfolio",
    details: {
      source: "readme",
      overview: [
        "The portfolio you're looking at. It presents projects, skills and contact options through scroll-driven motion, while keeping every claim traceable to a central data file.",
      ],
      features: [
        { title: "Scroll-driven hero and project showcase", text: "Pinned scenes on desktop; simpler layouts on mobile." },
        { title: "Filterable project archive", text: "GSAP Flip layout transitions between categories." },
        { title: "MotoBot", text: "A rule-based assistant that answers only from the portfolio's own data and says so." },
        { title: "Honest contact", text: "WhatsApp and email links, and a form that never claims delivery it can't confirm." },
        { title: "Accessibility and reduced motion", text: "Keyboard navigation, focus states, and a no-motion mode that keeps every section." },
      ],
      stackByLayer: [
        { layer: "Framework", tech: "React 19, TypeScript, Vite" },
        { layer: "Styling", tech: "Tailwind CSS v4" },
        { layer: "Motion", tech: "GSAP with ScrollTrigger, Flip and ScrollTo via @gsap/react" },
      ],
      run: ["npm install, then npm run dev for development, or npm run build and npm run preview for the production build."],
    },
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
    details: {
      source: "summary",
      overview: ["A structured CRUD application with database integration, built with OOP design patterns and clean architecture principles."],
      features: [
        { title: "CRUD operations", text: "Create, read, update and delete records." },
        { title: "Database integration", text: "Java talks to a MySQL database through JDBC." },
        { title: "Clean structure", text: "OOP design patterns and clean architecture principles." },
      ],
      stackByLayer: [
        { layer: "Language", tech: "Java" },
        { layer: "Data access", tech: "JDBC" },
        { layer: "Database", tech: "MySQL" },
      ],
      notes: [NO_README, "Only a GitHub profile link is on record for this project, not a dedicated repository URL."],
    },
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
    details: {
      source: "summary",
      overview: ["A Computer Security module project: a security assessment and data-protection improvement plan for Vidma Engineering."],
      features: [
        { title: "Security assessment", text: "Assessed the organisation's systems." },
        { title: "Vulnerability identification", text: "Identified system vulnerabilities." },
        { title: "Policy evaluation", text: "Evaluated the existing security policies." },
        { title: "Improvement plan", text: "Designed a data-protection improvement plan." },
      ],
      metrics: [
        { label: "Deliverable", value: "Full vulnerability report" },
        { label: "Deliverable", value: "Recommended policy framework" },
      ],
      notes: [NO_README, "Coursework — there is no code repository for this project; the GitHub link goes to the profile."],
    },
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
