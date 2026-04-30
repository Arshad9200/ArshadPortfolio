// ============================================================
// src/components/Experience.jsx — EXPERIENCE + STATS
// ============================================================
// Demonstrates:
// - CountUp animation (numbers count up when in view)
// - Timeline layout with animated entries
// - useInView hook for scroll-triggered animations

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { experience, stats } from "../data/portfolioData";
import { SectionTitle } from "./Skills"; // Re-using component from Skills

// ── STAT CARD ──
// Shows a big animated number + label
function StatCard({ number, label, suffix }) {
  // useInView: when the card enters the viewport, inView becomes true
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} style={{ textAlign: "center", minWidth: 120 }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 64,
          lineHeight: 1,
          color: "var(--accent)",
          textShadow: "0 0 40px rgba(59,255,160,0.4)",
        }}
      >
        {/* CountUp only starts when inView is true */}
        {inView ? (
          <CountUp
            start={0}
            end={number}
            duration={2}       // 2 seconds to count up
            suffix={suffix}    // Add "+" or "%" after number
          />
        ) : (
          "0" // Before in view, show 0
        )}
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "var(--muted)",
          marginTop: 8,
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ── EXPERIENCE ITEM ──
// One job entry in the timeline
function ExperienceItem({ date, title, company, points, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }} // Slide in from left
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        position: "relative",
        marginBottom: 60,
        paddingLeft: 0,
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: -38,
          top: 8,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 20px rgba(59,255,160,0.6)",
        }}
      />

      {/* Date */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--accent)",
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        {date}
      </p>

      {/* Job Title */}
      <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
        {title}
      </h3>

      {/* Company */}
      <p
        style={{
          fontSize: 15,
          color: "var(--accent2)",
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        {company}
      </p>

      {/* Bullet points */}
      <ul>
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              padding: "8px 0",
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            {/* Arrow bullet */}
            <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
              →
            </span>
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 48px",
      }}
    >
      <SectionTitle label="Work History" title="Experience" />

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: 48,
          marginBottom: 72,
          flexWrap: "wrap",
        }}
      >
        {/* Map over stats array */}
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          paddingLeft: 32,
        }}
      >
        {/* Vertical line on left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />

        {/* Render each experience item */}
        {experience.map((exp, index) => (
          <ExperienceItem key={index} {...exp} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Experience;
