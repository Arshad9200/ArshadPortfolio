// ============================================================
// src/components/Skills.jsx — SKILLS SECTION
// ============================================================
// Demonstrates:
// - useInView hook (trigger animation when element enters viewport)
// - Array.map() to render a list of cards from data
// - useState for hover state on each card
// - 3D tilt effect using onMouseMove

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/portfolioData";

// SectionTitle is a reusable component used across sections
function SectionTitle({ label, title }) {
  return (
    <>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ opacity: 0.5 }}>//</span> {label}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px, 7vw, 88px)",
          lineHeight: 1,
          marginBottom: 56,
        }}
      >
        {title}
      </h2>
    </>
  );
}

// ── SKILL CARD ──
function SkillCard({ icon, category, name, tags, index, isLearning }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotX, setSpotX] = useState("50%");
  const [spotY, setSpotY] = useState("50%");
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((y - rect.height / 2) / rect.height) * -8;
    const tiltY = ((x - rect.width / 2) / rect.width) * 8;
    setTilt({ x: tiltX, y: tiltY });
    setSpotX(`${(x / rect.width) * 100}%`);
    setSpotY(`${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // "Currently Learning" card gets a special purple/gold accent
  const learnAccent   = "rgba(168,85,247,1)";   // purple
  const learnGlow     = "rgba(168,85,247,0.25)";
  const learnBorder   = isHovered ? "rgba(168,85,247,0.55)" : "rgba(168,85,247,0.25)";
  const normalBorder  = isHovered ? "rgba(59,255,160,0.3)" : "var(--border)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: isLearning
          ? "linear-gradient(135deg, rgba(168,85,247,0.07), rgba(13,17,23,0.95))"
          : "var(--card)",
        border: `1px solid ${isLearning ? learnBorder : normalBorder}`,
        borderRadius: 12,
        padding: 28,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        perspective: 600,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: isHovered ? "none" : "all 0.4s ease",
        boxShadow: isHovered
          ? isLearning
            ? `0 20px 60px ${learnGlow}`
            : "0 20px 60px rgba(0,0,0,0.4)"
          : isLearning
            ? `0 0 24px ${learnGlow}`
            : "none",
      }}
    >
      {/* Spotlight effect */}
      <div style={{
        position: "absolute", inset: 0,
        background: isLearning
          ? `radial-gradient(circle at ${spotX} ${spotY}, rgba(168,85,247,0.1), transparent 60%)`
          : `radial-gradient(circle at ${spotX} ${spotY}, rgba(59,255,160,0.07), transparent 60%)`,
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* "Currently Learning" banner at top */}
      {isLearning && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 3,
          background: "linear-gradient(90deg, rgba(168,85,247,0.8), rgba(236,72,153,0.8))",
        }} />
      )}

      {/* Top row: icon + badge */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 32 }}>{icon}</div>
        {isLearning && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: 2, textTransform: "uppercase",
            color: learnAccent,
            border: `1px solid ${learnAccent}`,
            background: "rgba(168,85,247,0.1)",
            padding: "3px 8px", borderRadius: 4,
            animation: "learnPulse 2.5s ease-in-out infinite",
          }}>
            Learning
          </span>
        )}
      </div>

      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10,
        letterSpacing: 3, textTransform: "uppercase",
        color: isLearning ? learnAccent : "var(--accent)",
        marginBottom: 10,
      }}>
        {category}
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
        {name}
      </h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            padding: "3px 10px", borderRadius: 4,
            background: isLearning ? "rgba(168,85,247,0.08)" : "rgba(59,255,160,0.05)",
            border: isLearning ? "1px solid rgba(168,85,247,0.2)" : "1px solid rgba(59,255,160,0.15)",
            color: "var(--text)",
          }}>
            {tag}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes learnPulse {
          0%,100% { opacity:1; box-shadow: 0 0 8px rgba(168,85,247,0.3); }
          50% { opacity:0.7; box-shadow: 0 0 16px rgba(168,85,247,0.5); }
        }
      `}</style>
    </motion.div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 48px",
        background: "linear-gradient(135deg, rgba(13,17,23,0.8), rgba(3,7,18,0.8))",
      }}
    >
      <SectionTitle label="Technical Arsenal" title="Skills" />

      {/* CSS Grid — auto-fit makes it responsive automatically */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {/* Map over skills array from our data file */}
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name} // Unique key for React's reconciliation
            {...skill}        // Spread all skill properties as props
            index={index}     // Pass index for stagger animation
          />
        ))}
      </div>
    </section>
  );
}

// Export SectionTitle so other components can import and reuse it
export { SectionTitle };
export default Skills;
