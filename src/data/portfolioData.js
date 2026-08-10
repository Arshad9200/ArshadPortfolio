// ============================================================
// src/data/portfolioData.js — ALL CONTENT IN ONE PLACE
// ============================================================
// Keeping data separate from UI is a BEST PRACTICE.
// If Arshad gets a new job, he only edits THIS file, not the components.
// This is called "Separation of Concerns".

export const personalInfo = {
  name: "Arshad Ali",
  phone: "+91 7479914419",
  email: "arshaddd0011@gmail.com",
  summary:
    "Software Engineer with 1+ year of experience designing, developing, and maintaining scalable web applications and REST APIs using Python, Sanic, and React.js. Strong in debugging, root cause analysis, and optimizing backend systems for performance and reliability.",
  roles: [
    "Software Engineer",
    "Backend Developer",
    "Python Developer",
    "Frontend Developer",
    "Full-Stack Developer",
  ],
};

export const stats = [
  { number: 1, label: "Year Experience", suffix: "+" },
  { number: 2, label: "Live Projects", suffix: "+" },
  { number: 10, label: "Tech Stack", suffix: "+" },
  { number: 100, label: "APIs Developed", suffix: "+" },
  { number: 9.15, label: "B.Tech CGPA", suffix: "/10" },
];

// `level` = proficiency out of 5, shown as a dot scale on the card.
// `group` = which filter tab this card appears under on the Skills section.
export const skillGroups = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "data", label: "Data" },
  { id: "tools", label: "Tools" },
  { id: "ai", label: "AI" },
];

export const skills = [
  {
    icon: "🐍",
    category: "Core Language",
    name: "Python",
    level: 5,
    group: "backend",
    tags: [
      "Async Programming",
      "OOP",
      "Modular Design",
      "Service Layer",
      "Data Structures",
    ],
  },
  {
    icon: "⚡",
    category: "Backend",
    name: "API Development",
    level: 5,
    group: "backend",
    tags: [
      "Sanic",
      "REST APIs",
      "API Integration",
      "Data Validation",
      "Error Handling",
    ],
  },
  {
    icon: "🗄️",
    category: "Databases",
    name: "Data & Storage",
    level: 4,
    group: "data",
    tags: [
      "PostgreSQL",
      "MySQL",
      "AWS S3",
      "Query Optimization",
      "Data Modeling",
      "Database Design",
    ],
  },
  {
    icon: "⚛️",
    category: "Frontend",
    name: "React",
    level: 4,
    group: "frontend",
    tags: [
      "React.js",
      "Redux Toolkit",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },

  {
    icon: "🧪",
    category: "Testing",
    name: "QA & Debugging",
    level: 4,
    group: "tools",
    tags: [
      "Postman",
      "API Testing",
      "Manual Testing",
      "Debugging",
      "Root Cause Analysis",
    ],
  },
  {
    icon: "🐍",
    category: "Python Libraries",
    name: "Data Processing & Visualization",
    level: 3,
    group: "data",
    tags: ["NumPy", "Pandas", "Matplotlib", "Jupyter Notebook"],
  },
  {
    icon: "🛠️",
    category: "Tools & Workflow",
    name: "Development Tools",
    level: 4,
    group: "tools",
    tags: ["Git", "GitHub", "JIRA", "Code Review", "Version Control"],
  },

  {
    icon: "🤖",
    category: "Leveling Up",
    name: "AI & Gen AI",
    level: 2,
    group: "ai",
    tags: [
      "Generative AI",
      "AI Agents",
      "LLMs",
      "Prompt Engineering",
      "LangChain",
      "OpenAI API",
    ],
    isLearning: true,
  },
];

export const experience = [
  {
    date: "Feb 2025 – Mar 2026",
    title: "Software Engineer",
    company: "Atom Build · Anant Atom Consultancy Private Limited",
    companyShort: "AB",
    logo: "/images/logos/atom-build.png",
    points: [
      "Designed and optimized scalable REST APIs using Python (Sanic), ensuring high performance, data validation, and robust error handling.",
      "Built and maintained backend workflows by processing data from PostgreSQL, AWS S3, and Apache Iceberg for data-driven features.",
      "Diagnosed and resolved cross-stack issues using root cause analysis, improving system stability and reducing production defects.",
      "Enhanced API performance by identifying bottlenecks and optimizing database queries and data flow..",
      "Built and integrated React components with backend APIs, ensuring efficient data flow, optimized API usage, and responsive UI behavior.",
      "Performed API and functional testing using Postman, ensuring data integrity and reliable system behavior.",
    ],
  },
];

// Short tech chips rendered as icon pills on each project card
// (separate from the longer `stack` string used elsewhere).
const TECH_ICON_MAP = {
  Python: "🐍",
  Sanic: "⚡",
  PostgreSQL: "🗄️",
  React: "⚛️",
  JavaScript: "🟨",
};

function toTechChips(stackString) {
  return stackString
    .split("·")
    .map((s) => s.trim())
    .map((name) => ({
      name,
      icon: TECH_ICON_MAP[name] || "▹",
    }));
}

export const projects = [
  {
    title: "Atom Hub – Data Platform & Job Orchestration",
    stack: "Python · Sanic · PostgreSQL · React · JavaScript",
    isLive: true,
    image: "/images/projects/atomhub.png",
    link: "https://devapp.atomhub.in/",
    points: [
      "Built and enhanced backend services and REST APIs using Python (Sanic) to support job orchestration and data processing workflows.",
      "Retrieved, validated, and processed data from PostgreSQL and external sources to ensure data accuracy, consistency, and integrity.",
      "Performed root cause analysis on API and data-related issues, improving system stability and reducing failure cases.",
      "Ensured system reliability by handling edge cases and validating end-to-end data workflows.",
      "Integrated frontend components using React and JavaScript for seamless API communication and dynamic data rendering.",
      "Performed API testing using Postman and conducted manual testing to validate workflows and ensure feature reliability.",
    ],
  },
  {
    title: "Broadcast India – Live Streaming Analytics",
    stack: "Python · Sanic · PostgreSQL · React · JavaScript",
    isLive: true,
    image: "/images/projects/broadcast-india.png",
    link: "https://brfe.atomhub.in/",
    points: [
      "Designed and implemented backend data models and REST APIs to handle video analytics and user interaction data.",
      "Optimized PostgreSQL queries to handle high-volume data efficiently, improving performance and ensuring reliable data retrieval.",
      "Diagnosed and resolved API and database issues impacting data accuracy and system performance.",
      "Integrated backend APIs with React frontend to enable real-time analytics visualization and user interaction tracking.",
      "Performed API and manual testing using Postman, ensuring reliable data tracking and system stability.",
      "Implemented data validation and error-handling mechanisms to improve data consistency and prevent runtime failures.",
    ],
  },
];

// Attach the icon-chip breakdown to every project without hand-typing it twice.
projects.forEach((p) => {
  p.techChips = toTechChips(p.stack);
});

export const education = {
  degree: "Bachelor of Technology in Computer Science",
  university: "Babu Banarasi Das University",
  location: "Lucknow, Uttar Pradesh",
  years: "2020 – 2024",
  score: "85.35%",
};

export const floatingTech = [
  "Python",
  "REST APIs",
  "Backend",
  "React",
  "AWS",
  "Debugging",
];

export const currentRole = {
  date: "June 2026 – Present",
  title: "Technical Support Executive",
  program: "NAPS",
  company: "Bluspring Enterprises Limited",
  companyShort: "BE",
  logo: "/images/logos/bluspring.png",
  points: [
    "Provide technical assistance and troubleshoot day-to-day system and user-related issues.",
    "Analyze reported issues, perform initial diagnosis, and coordinate with relevant teams for resolution.",
    "Maintain issue documentation and follow standard troubleshooting processes.",
  ],
  parallelNote:
    "Continuously upskilling in Python backend development, Machine Learning, LangChain, and AI agent workflows while preparing for AI/ML engineering opportunities.",
};

// untouched.
function withProtocol(url) {
  if (!url) return url;
  return /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
}

// ============================================================
// SOCIAL / PROFILE LINKS — single source of truth.
// ============================================================
const rawSocialLinks = {
  github: "https://github.com/Arshad9200",
  linkedin: "https://www.linkedin.com/in/arshadalideveloper",
  whatsapp: "https://wa.me/917479914419",
  wellfound: "https://wellfound.com/u/arshad-ali-103",
  email: `mailto:${personalInfo.email}`,
};

export const socialLinks = Object.fromEntries(
  Object.entries(rawSocialLinks).map(([key, url]) => [key, withProtocol(url)]),
);
