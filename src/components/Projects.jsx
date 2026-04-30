// ============================================================
// src/components/Projects.jsx — PROJECTS SECTION
// ============================================================
// Demonstrates:
// - CSS pseudo-elements via inline animation hack
// - Hover state management with useState
// - Conditional class rendering

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "../data/portfolioData";
import { SectionTitle } from "./Skills";

function ProjectCard({ title, stack, isLive, points, link, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${isHovered ? "rgba(59,255,160,0.25)" : "var(--border)"}`,
        borderRadius: 16,
        padding: 36,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: `translateY(${isHovered ? -8 : 0}px)`,
        boxShadow: isHovered ? "0 30px 80px rgba(0,0,0,0.5)" : "none",
        cursor: "default",
      }}
    >
      {/* Top gradient line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
        transform: `scaleX(${isHovered ? 1 : 0})`,
        transformOrigin: "left", transition: "transform 0.4s ease",
      }} />

      {/* Top row: Live badge + Visit link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        {isLive && (
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:2, color:"var(--accent)", textTransform:"uppercase" }}>
            <span style={{ width:6, height:6, background:"var(--accent)", borderRadius:"50%", display:"inline-block", animation:"pulse 1.5s infinite" }} />
            Live Project
          </div>
        )}

        {/* Clickable Visit button */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.5,
              textTransform: "uppercase", color: "var(--accent2)",
              border: "1px solid rgba(0,207,255,0.3)", padding: "4px 12px",
              borderRadius: 4, textDecoration: "none",
              transition: "all 0.3s",
              background: "rgba(0,207,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,207,255,0.12)";
              e.currentTarget.style.borderColor = "rgba(0,207,255,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,207,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(0,207,255,0.3)";
            }}
          >
            ↗ Visit Site
          </a>
        )}
      </div>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 10,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--accent2)",
          marginBottom: 20,
          letterSpacing: 1,
        }}
      >
        {stack}
      </p>

      <ul>
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "5px 0",
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.8,
            }}
          >
            {/* Diamond bullet */}
            <span
              style={{
                color: "var(--accent)",
                fontSize: 8,
                flexShrink: 0,
                marginTop: 5,
              }}
            >
              ◆
            </span>
            {point}
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.8); }
        }
      `}</style>
    </motion.div>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 48px",
        background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(13,17,23,0.5))",
      }}
    >
      <SectionTitle label="What I've Built" title="Projects" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 24,
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
