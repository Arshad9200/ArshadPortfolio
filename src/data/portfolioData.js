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

export const skills = [
  {
    icon: "🐍",
    category: "Core Language",
    name: "Python",
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
    tags: [
      "Postman",
      "API Testing",
      "Manual Testing",
      "Debugging",
      "Root Cause Analysis",
    ],
  },
  {
    icon: "🛠️",
    category: "Tools & Workflow",
    name: "Development Tools",
    tags: ["Git", "GitHub", "JIRA", "Code Review", "Version Control"],
  },

  {
    icon: "🤖",
    category: "Leveling Up",
    name: "AI & Gen AI",
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

export const projects = [
  {
    title: "Atom Hub – Data Platform & Job Orchestration",
    stack: "Python · Sanic · PostgreSQL · React · JavaScript",
    isLive: true,
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
