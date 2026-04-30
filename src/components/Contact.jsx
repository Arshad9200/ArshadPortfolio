// ============================================================
// src/components/Contact.jsx — CONTACT SECTION
// ============================================================
// Demonstrates:
// - "href" for tel: and mailto: (native mobile/desktop behavior)
// - On mobile: tel: opens the dialer, mailto: opens the email app
// - Download trigger via JavaScript Blob API

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "../data/portfolioData";
import { SectionTitle } from "./Skills";

const downloadResume = (e) => {
  e.preventDefault();
  const content = `ARSHAD ALI — SOFTWARE ENGINEER
Phone: ${personalInfo.phone}
Email: ${personalInfo.email}

${personalInfo.summary}

EXPERIENCE
Software Engineer | Atom Build (Feb 2025 – Mar 2026)
• Designed REST APIs with Python (Sanic)
• PostgreSQL, AWS S3, Apache Iceberg data processing
• Root cause analysis and production bug fixes
• React frontend + backend API integration

PROJECTS
1. Atom Hub – Data Platform & Job Orchestration
   Stack: Python, Sanic, PostgreSQL, React, JavaScript

2. Broadcast India – Live Streaming Analytics
   Stack: Python, Sanic, PostgreSQL, React, JavaScript

SKILLS
Python | Sanic | REST APIs | React.js | Redux Toolkit
PostgreSQL | MySQL | AWS S3 | Apache Iceberg
Postman | Git | GitHub | Tailwind CSS | HTML5/CSS3

EDUCATION
B.Tech Computer Science
Babu Banarasi Das University | 2020-2024 | 85.35%`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Arshad_Ali_Resume.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Contact cards data — each has different colors
const contactCards = [
  {
    icon: "📞",
    label: "Phone",
    value: personalInfo.phone,
    action: "Tap to Call →",
    href: `tel:${personalInfo.phone}`,
    accentColor: "var(--accent2)",
    glowColor: "rgba(0,207,255,0.2)",
    borderHover: "rgba(0,207,255,0.4)",
    bgHover: "rgba(0,207,255,0.05)",
    type: "link",
  },
  {
    icon: "✉️",
    label: "Email",
    value: personalInfo.email,
    action: "Tap to Email →",
    href: `mailto:${personalInfo.email}`,
    accentColor: "var(--accent3)",
    glowColor: "rgba(255,96,96,0.2)",
    borderHover: "rgba(255,96,96,0.4)",
    bgHover: "rgba(255,96,96,0.05)",
    type: "link",
  },
  {
    icon: "📄",
    label: "Resume",
    value: "Softwarwe Developer CV",
    action: "Download PDF →",
    href: "#",
    accentColor: "var(--accent)",
    glowColor: "rgba(59,255,160,0.2)",
    borderHover: "rgba(59,255,160,0.4)",
    bgHover: "rgba(59,255,160,0.05)",
    type: "download",
  },
];

function ContactCard({ icon, label, value, action, href, accentColor, glowColor, borderHover, bgHover, type, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const handleClick = (e) => {
    if (type === "download") downloadResume(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "32px 24px",
        background: isHovered ? bgHover : "var(--card)",
        border: `1px solid ${isHovered ? borderHover : "var(--border)"}`,
        borderRadius: 12,
        cursor: "pointer",
        textDecoration: "none",
        color: "var(--text)",
        transition: "all 0.3s ease",
        transform: `translateY(${isHovered ? -6 : 0}px)`,
        boxShadow: isHovered ? `0 20px 60px ${glowColor}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span style={{ fontSize: 36 }}>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, textAlign: "center" }}>
        {value}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: accentColor,
          fontFamily: "var(--font-mono)",
        }}
      >
        {action}
      </span>
    </motion.a>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 48px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionTitle label="Get In Touch" title="Contact" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        {contactCards.map((card, index) => (
          <ContactCard key={card.label} {...card} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Contact;
