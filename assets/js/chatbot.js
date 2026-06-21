// ===== CV-grounded data =====
const CV = {
  name: "Loganathan Yathavan",
  location: "Colombo, Sri Lanka",
  email: "loganathanyathavan@gmail.com",
  phone: "+94 76 053 5227",
  github: "https://github.com/YathavanJD",
  linkedin: "https://www.linkedin.com/in/yathavanloganathan03",
  instagram: "https://www.instagram.com/jdyathu/",

  summary: "Final-year BSc (Hons) Computer Science undergraduate at SLIIT City University, focused on full-stack web development, database systems, and backend engineering with Java and Spring Boot. Comfortable across the SDLC, from coding to testing and debugging.",

  education: [
    "BSc (Hons) Computer Science — SLIIT City University, Sri Lanka (Expected graduation: September 2026)",
    "Diploma in English — completed March 2022 to January 2023"
  ],

  skills: {
    "Programming Languages": "Java, JavaScript, PHP, Python (basic)",
    "Web Development": "HTML5, CSS3, Bootstrap, AJAX, JSON, jQuery",
    "Databases": "MySQL, database design, query optimization",
    "Tools & Platforms": "Git, GitHub, VS Code, Android Studio",
    "Core Knowledge": "AI fundamentals, machine learning basics, data science concepts, REST APIs, software testing & QA, networking, debugging"
  },

  projects: [
    { name: "AI Music Recommendation System", desc: "Final year project — recommends songs based on listening behavior and preferences, using Python and ML concepts for preference analysis and recommendation workflows." },
    { name: "SK Metal Shop", desc: "Full-stack web app for product, inventory, and order management with live stock monitoring, authentication, cart, checkout, and an admin dashboard. Built with HTML, CSS, JS, PHP, MySQL." },
    { name: "Cabzo", desc: "Android car booking app with ride request management, mobile-optimized UI, and ride tracking. Built with Java and Android Studio." },
    { name: "Student Management System", desc: "Dynamic web app for managing student records in real time, using AJAX, JSON, and jQuery with a responsive UI." },
    { name: "Wrap It Up", desc: "Responsive cake shop website for product browsing and ordering, built with HTML, CSS, and JavaScript." },
    { name: "Car Wash Management System", desc: "Java application demonstrating OOP concepts — classes, objects, inheritance, encapsulation — for managing a car wash business." }
  ],

  experience: [
    "Security Assessment & Data Protection Solution — Vidma Engineering: conducted security assessments, identified vulnerabilities, evaluated policies, and designed data protection improvement plans as part of a Computer Security module.",
    "Software Testing & Test Case Development: designed and documented test cases, ran functional and system testing, identified defects, and validated fixes."
  ],

  softSkills: "Analytical thinking, problem solving, communication, team collaboration, adaptability, and time management.",

  languages: "English (professional working proficiency), Tamil (native).",

  references: [
    "Mr. Alfred Edwin Worthington — Senior Technical Consultant, Inivos Consulting Pvt Ltd. edwin.worthington@inivosglobal.com, +94 777 219 116",
    "Mr. Senduran Sureshinthiran — IT Systems Engineer, The Hello Team. senduran@gmail.com, +94 77 250 7872"
  ]
};

// ===== Intent matching =====
function findReply(raw) {
  const q = raw.toLowerCase().trim();

  if (/\b(hi|hello|hey|hai)\b/.test(q) && q.length < 20) {
    return `Hey! I'm an auto-reply assistant trained on ${CV.name}'s CV. Ask me about his skills, projects, education, or how to contact him.`;
  }

  if (/who (are|is)|about (you|him|yathavan)|introduce/.test(q)) {
    return CV.summary;
  }

  if (/skill|tech|stack|language|proficien/.test(q)) {
    const lines = Object.entries(CV.skills).map(([k, v]) => `<b>${k}:</b> ${v}`).join("<br>");
    return `Here's a breakdown of his skills:<br><br>${lines}`;
  }

  if (/project|portfolio|built|work(ed)? on|github repo/.test(q)) {
    const lines = CV.projects.map(p => `• <b>${p.name}</b> — ${p.desc}`).join("<br><br>");
    return `Some of his key projects:<br><br>${lines}<br><br>You can see the code on <a href="${CV.github}" target="_blank" rel="noopener">GitHub</a>.`;
  }

  if (/educat|university|degree|study|studying|sliit|graduat/.test(q)) {
    return CV.education.join("<br>");
  }

  if (/experience|internship|job history|worked at|security assessment|testing/.test(q)) {
    return CV.experience.join("<br><br>");
  }

  if (/soft skill|strength|personal(ity)?/.test(q)) {
    return CV.softSkills;
  }

  if (/language(s)? (he )?speak|english|tamil/.test(q)) {
    return CV.languages;
  }

  if (/contact|email|phone|number|reach|hire|call/.test(q)) {
    return `You can reach him at <a href="mailto:${CV.email}">${CV.email}</a> or call/WhatsApp <a href="tel:+94760535227">${CV.phone}</a>. He's based in ${CV.location} and open to relocation or remote work.`;
  }

  if (/linkedin/.test(q)) {
    return `Here's his LinkedIn: <a href="${CV.linkedin}" target="_blank" rel="noopener">${CV.linkedin}</a>`;
  }

  if (/github/.test(q)) {
    return `Here's his GitHub: <a href="${CV.github}" target="_blank" rel="noopener">${CV.github}</a>`;
  }

  if (/instagram|insta\b/.test(q)) {
    return `Here's his Instagram: <a href="${CV.instagram}" target="_blank" rel="noopener">${CV.instagram}</a>`;
  }

  if (/reference|referee|recommend/.test(q)) {
    return CV.references.join("<br><br>");
  }

  if (/location|where.*(live|based|from)|colombo|sri lanka/.test(q)) {
    return `He's based in ${CV.location}, and is open to relocation or remote opportunities.`;
  }

  if (/hire|available|open to work|looking for|job/.test(q)) {
    return `Yes — he's a final-year Computer Science student graduating in September 2026, actively seeking entry-level software engineering roles. Feel free to reach out at <a href="mailto:${CV.email}">${CV.email}</a>.`;
  }

  if (/thank/.test(q)) {
    return "You're welcome! Anything else you'd like to know — skills, projects, or how to get in touch?";
  }

  return `I'm not sure about that one — I can only answer from his CV. Try asking about his <b>skills</b>, <b>projects</b>, <b>education</b>, <b>experience</b>, or <b>contact details</b>.`;
}

// ===== UI wiring =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatQuick = document.getElementById('chatQuick');

const QUICK_REPLIES = ["Skills", "Projects", "Education", "Contact info"];

function addMessage(text, who) {
  const div = document.createElement('div');
  div.className = `msg ${who}`;
  div.innerHTML = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(userText) {
  setTimeout(() => {
    addMessage(findReply(userText), 'bot');
  }, 380);
}

function renderQuickReplies() {
  chatQuick.innerHTML = '';
  QUICK_REPLIES.forEach(label => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      addMessage(label, 'user');
      botReply(label);
    });
    chatQuick.appendChild(btn);
  });
}

let chatStarted = false;
function openChat() {
  chatWindow.classList.add('open');
  chatWindow.setAttribute('aria-hidden', 'false');
  if (!chatStarted) {
    chatStarted = true;
    addMessage(`Hi! I'm an auto-reply assistant that knows ${CV.name}'s CV inside out. Ask me anything — skills, projects, education, or how to reach him.`, 'bot');
    renderQuickReplies();
  }
  chatInput.focus();
}
function closeChat() {
  chatWindow.classList.remove('open');
  chatWindow.setAttribute('aria-hidden', 'true');
}

chatToggle.addEventListener('click', () => {
  chatWindow.classList.contains('open') ? closeChat() : openChat();
});
chatClose.addEventListener('click', closeChat);

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';
  botReply(text);
});

// keyboard shortcut: "/" opens chat when not typing elsewhere
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    openChat();
  }
  if (e.key === 'Escape') closeChat();
});
