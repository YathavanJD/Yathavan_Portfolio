export const profile = {
  name: "Loganathan Yathavan",
  role: "Software Engineer",
  tagline:
    "Final-year Computer Science undergraduate building full-stack web and mobile applications — with a growing focus on backend engineering and Java/Spring Boot.",
  subline: "I ship things end to end, then go find out why they broke.",
  location: "Colombo, Sri Lanka",
  status: "Open to work",
  email: "loganathanyathavan@gmail.com",
  phone: "+94 76 053 5227",
  github: "https://github.com/YathavanJD",
  linkedin: "https://www.linkedin.com/in/yathavan-loganathan03/",
  instagram: "https://www.instagram.com/jdyathu/",
  photo:"/Yathavn.jpeg",
  stats: [
    { value: "13", label: "repos shipped" },
    { value: "10+", label: "full-stack projects" },
    { value: "2026", label: "graduating Sep" },
  ],
};

export const about = {
  heading:
    "I like systems that are simple to explain and hard to break — and I'm still learning how to build those consistently.",
  body: "I'm a final-year BSc (Hons) Computer Science student at SLIIT City University, with hands-on experience across Java, JavaScript, and PHP — building everything from Android ride-booking apps to AI-powered emotion-detection platforms. I care about the unglamorous parts: clean database design, test cases that actually catch bugs, and code a teammate can read at 11pm before a deadline. Right now I'm deepening my backend skills with Spring Boot and getting comfortable with the DevOps tooling that turns a student project into something deployable.",
};

export const skillGroups = [
  {
    label: "Core",
    level: "core",
    skills: ["Java", "JavaScript", "PHP / MySQL"],
  },
  {
    label: "Working",
    level: "working",
    skills: ["REST APIs", "Android / Java"],
  },
  {
    label: "Growing",
    level: "growing",
    skills: ["Python (ML / AI)"],
  },
];

export const toolkit = [
  "Git",
  "GitHub",
  "VS Code",
  "Android Studio",
  "AJAX",
  "jQuery",
  "Bootstrap",
  "JSON",
  "SDLC",
  "QA Testing",
  "Networking",
  "Spring Boot",
  "OpenCV",
];

export type Project = {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  icon: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: "moodaware",
    index: "01",
    category: "Final Year Project",
    title: "MoodAware — Emotion-Based Music & Wellness Recommender",
    description:
      "An AI-powered web application that detects user emotions in real time through facial expression recognition and recommends personalised music and mental wellness content. Covers computer vision, ML pipelines, and a full-stack web interface.",
    stack: ["Python", "OpenCV", "ML", "Flask", "Facial Recognition"],
    href: "https://github.com/YathavanJD/Mood_Aware_Final-_Year_Project",
    icon: "🎭",
    image: "https://images.pexels.com/photos/17483874/pexels-photo-17483874.png?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "learnforged",
    index: "02",
    category: "Full Stack · LMS",
    title: "Learn_Forged — Learning Management System",
    description:
      "A full-stack LMS enabling course management, user authentication, student enrollment, and progress tracking with role-based access and a clean dashboard UI.",
    stack: ["HTML", "CSS", "JS", "PHP", "MySQL"],
    href: "https://github.com/YathavanJD/Learn_Forged",
    icon: "📚",
    image: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "skmetal",
    index: "03",
    category: "Full Stack · E-commerce",
    title: "SK Metal Shop",
    description:
      "Product, inventory, and order management platform with live stock monitoring, customer authentication, shopping cart, checkout, and an admin dashboard.",
    stack: ["HTML", "CSS", "JS", "PHP", "MySQL"],
    href: "https://github.com/YathavanJD/SK_Metal-shop",
    icon: "⚙️",
    image: "https://images.pexels.com/photos/12771407/pexels-photo-12771407.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "cabzo",
    index: "04",
    category: "Android",
    title: "Cabzo — Car Booking App",
    description:
      "A ride-booking Android application with ride request management, a mobile-optimised UI, and live ride tracking functionality built entirely in Android Studio.",
    stack: ["Java", "Android Studio", "XML"],
    href: "https://github.com/YathavanJD/Cabzo",
    icon: "🚗",
    image: "https://images.pexels.com/photos/6772852/pexels-photo-6772852.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "studentmgmt",
    index: "05",
    category: "Web App",
    title: "Student Management System",
    description:
      "A dynamic student management application with real-time data updates via AJAX, responsive UI, and efficient CRUD record handling — no page reloads required.",
    stack: ["AJAX", "JSON", "jQuery", "PHP", "MySQL"],
    href: "https://github.com/YathavanJD",
    icon: "📋",
    image: "https://images.pexels.com/photos/92905/pexels-photo-92905.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "vertex",
    index: "06",
    category: "Multi-Page Website",
    title: "Vertex Digital Solutions",
    description:
      "A responsive 4-page marketing website for a software and cloud consultancy, featuring consistent design tokens, accessible navigation, and a validated contact form — no build tools required.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Vertex_Degital",
    icon: "◈",
    image: "https://images.pexels.com/photos/34804003/pexels-photo-34804003.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "heartquist",
    index: "07",
    category: "Web · Game",
    title: "HeartQuist — Web Quiz Game",
    description:
      "Interactive browser-based quiz with dynamic scoring and a fun, visually appealing experience across multiple question rounds.",
    stack: ["JavaScript", "HTML", "CSS"],
    href: "https://github.com/YathavanJD/heart-quist",
    icon: "❤️",
    image: "https://images.pexels.com/photos/17485707/pexels-photo-17485707.png?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "knowledgeknockout",
    index: "08",
    category: "Android · Game",
    title: "KnowledgeKnockout — Android Quiz",
    description:
      "Interactive Android quiz game with multi-topic questions, score tracking, and competitive UX built in Android Studio.",
    stack: ["Java", "Android Studio", "XML"],
    href: "https://github.com/YathavanJD/Knowledge-knockout",
    icon: "🧠",
    image: "https://images.pexels.com/photos/18069814/pexels-photo-18069814.png?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "wrapitup",
    index: "09",
    category: "E-commerce",
    title: "Wrap It Up — Cake Shop",
    description:
      "Responsive product browsing and ordering site for a small cake business with mobile-friendly layout and smooth checkout flow.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Cake_web",
    icon: "🎂",
    image: "https://images.pexels.com/photos/10577125/pexels-photo-10577125.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "carwash",
    index: "10",
    category: "OOP · Java",
    title: "Car Wash Management System",
    description:
      "Java application built around core OOP concepts — classes, inheritance, encapsulation — to manage bookings and billing for a car wash business.",
    stack: ["Java", "OOP"],
    href: "https://github.com/YathavanJD/Car_wash_managenent_system",
    icon: "🧼",
    image: "https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "portfolio",
    index: "11",
    category: "Portfolio",
    title: "Yathavan_Portfolio — Previous Site",
    description:
      "The previous personal portfolio website showcasing skills, projects, and experience — built with HTML, CSS and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/YathavanJD/Yathavan_Portfolio",
    icon: "🖥️",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "managementsystem",
    index: "12",
    category: "Full Stack",
    title: "Management System",
    description:
      "A structured CRUD application with database integration — developed applying OOP design patterns and clean architecture principles.",
    stack: ["Java", "MySQL", "JDBC"],
    href: "https://github.com/YathavanJD",
    icon: "🗂️",
    image: "https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "vidma",
    index: "13",
    category: "Security · Coursework",
    title: "Security Assessment & Data Protection — Vidma Engineering",
    description:
      "Conducted security assessments, identified system vulnerabilities, evaluated existing security policies, and designed a data protection improvement plan as part of the Computer Security module. Deliverables included a full vulnerability report and a recommended policy framework.",
    stack: ["Security Analysis", "Vulnerability Assessment", "Policy Design", "Documentation"],
    href: "https://github.com/YathavanJD",
    icon: "🔐",
    image: "https://images.pexels.com/photos/11391947/pexels-photo-11391947.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

// Featured subset driving the autoplay showcase carousel
export const featuredProjectIds = [
  "moodaware",
  "learnforged",
  "skmetal",
  "cabzo",
  "vertex",
  "wrapitup",
];

export const timeline = [
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

export const references = [
  {
    name: "Mr. Alfred Edwin Worthington",
    role: "Senior Technical Consultant, Inivos Consulting Pvt Ltd",
    email: "edwin.worthington@inivosglobal.com",
    phone: "+94 777 219 116",
  },
  {
    name: "Mr. Senduran Sureshinthiran",
    role: "IT Systems Engineer, The Hello Team",
    email: "senduran@gmail.com",
    phone: "+94 77 250 7872",
  },
];

// Scroll-driven hero scenes — each maps to a stage in how Yathavan actually works
export const heroScenes = [
  {
    id: "boot",
    tag: "[BOOT]",
    heading: "I ship things end to end,",
    sub: "Final-year Computer Science undergraduate · SLIIT City University",
  },
  {
    id: "build",
    tag: "[BUILD]",
    heading: "then go find out why they broke.",
    sub: "Java · Spring Boot · JavaScript · PHP / MySQL",
  },
  {
    id: "test",
    tag: "[TEST]",
    heading: "Test it, break it, fix it, ship it again.",
    sub: "13 repos shipped · 10+ full-stack projects",
  },
];
