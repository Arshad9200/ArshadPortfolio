// ============================================================
// src/components/Experience.jsx — EXPERIENCE + STATS
// ============================================================
// Demonstrates:
// - CountUp animation (numbers count up when in view)
// - Timeline layout with animated entries
// - useInView hook for scroll-triggered animations

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { experience, stats, currentRole } from "../data/portfolioData";
import { SectionTitle } from "./Skills"; // Re-using component from Skills

// 640px = phones only — tablet/desktop are unaffected by every isMobile
// check in this file.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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

// ── COMPANY MONOGRAM CHIP ──
// Small square badge with the company's initials — adds a bit of visual
// weight next to the timeline dot without needing a real logo asset.
function CompanyChip({ short, logo, accent }) {
  if (!short && !logo) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 26, height: 26, borderRadius: 6,
      border: `1px solid ${accent}`,
      background: "rgba(255,255,255,0.03)",
      overflow: "hidden",
      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
      color: accent, marginRight: 10, flexShrink: 0,
    }}>
      {logo ? (
        <img src={logo} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        short
      )}
    </span>
  );
}

// ── EXPERIENCE ITEM ──
// One job entry in the timeline
function ExperienceItem({ date, title, company, companyShort, logo, points, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  // Desktop/tablet: always show every bullet (unchanged). Mobile only:
  // collapse to the first 3 by default so the section doesn't turn into
  // an enormous scroll — "Read more" reveals the rest on demand.
  const COLLAPSE_AT = 3;
  const shouldCollapse = isMobile && !expanded && points.length > COLLAPSE_AT;
  const visiblePoints = shouldCollapse ? points.slice(0, COLLAPSE_AT) : points;

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
      {/* Timeline dot — offset is calibrated to sit centered on the
          vertical line; must track the timeline's paddingLeft, which is
          reduced on mobile. */}
      <div
        style={{
          position: "absolute",
          left: isMobile ? -30 : -38,
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
      <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, marginBottom: 4 }}>
        {title}
      </h3>

      {/* Company */}
      <p
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 15,
          color: "var(--accent2)",
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        <CompanyChip short={companyShort} accent="var(--accent2)" />
        {company}
      </p>

      {/* Bullet points */}
      <ul>
        {visiblePoints.map((point, i) => (
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

      {/* Read more/less — mobile only, and only when there's actually
          more than COLLAPSE_AT points to hide. */}
      {isMobile && points.length > COLLAPSE_AT && (
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1,
            textTransform: "uppercase", color: "var(--accent)",
            background: "none", border: "none", padding: "6px 0 0",
            cursor: "pointer", textAlign: "left",
          }}
        >
          {expanded ? "− Show less" : `+ Read more (${points.length - COLLAPSE_AT} more)`}
        </button>
      )}
    </motion.div>
  );
}

// ── CURRENT ROLE CARD ──
// Deliberately smaller and muted compared to ExperienceItem —
// keeps this section honest about the present without competing
// visually with the engineering work above it.
function CurrentRoleCard({ date, title, program, company, companyShort, points, parallelNote }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        position: "relative",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: isMobile ? "18px 18px" : "20px 24px",
        maxWidth: isMobile ? "100%" : 640,
      }}
    >
      {/* Muted dot — deliberately not the glowing accent dot used for engineering roles */}
      <div
        style={{
          position: "absolute",
          left: isMobile ? -30 : -38,
          top: 26,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--muted)",
        }}
      />

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
          {title} <span style={{ color: "var(--muted)", fontWeight: 400 }}>· {program}</span>
        </h4>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>
          {date}
        </p>
      </div>

      <p style={{ display: "flex", alignItems: "center", fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>
        <CompanyChip short={companyShort} accent="var(--muted)" />
        {company}
      </p>

      <ul style={{ marginBottom: parallelNote ? 14 : 0 }}>
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "3px 0",
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--muted)", flexShrink: 0, marginTop: 2, opacity: 0.6 }}>
              →
            </span>
            {point}
          </li>
        ))}
      </ul>

      {parallelNote && (
        <p style={{
          fontSize: 12,
          color: "rgba(168,85,247,0.85)",
          borderTop: "1px solid var(--border)",
          paddingTop: 12,
          lineHeight: 1.6,
        }}>
          {parallelNote}
        </p>
      )}
    </motion.div>
  );
}

function Experience() {
  const isMobile = useIsMobile();

  // Scroll-linked timeline fill: an accent overlay line that grows to match
  // scroll progress through this section, so the static gradient line
  // actually feels like it's tracking your position instead of sitting there.
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      style={{
        position: "relative",
        zIndex: 1,
        padding: isMobile ? "60px 20px" : "100px 48px",
      }}
    >
      <SectionTitle label="Work History" title="Experience" />

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 48,
          marginBottom: isMobile ? 48 : 72,
          flexWrap: "wrap",
        }}
      >
        {/* Map over stats array */}
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} isMobile={isMobile} />
        ))}
      </div>

      {/* Timeline */}
      <div
        ref={timelineRef}
        style={{
          position: "relative",
          paddingLeft: isMobile ? 24 : 32,
        }}
      >
        {/* Base track — faint, always visible */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: "var(--border)",
          }}
        />
        {/* Accent fill — grows with scroll progress through the section */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1,
            height: fillHeight,
            background: "linear-gradient(to bottom, var(--accent), var(--accent2))",
            boxShadow: "0 0 8px rgba(59,255,160,0.5)",
          }}
        />

        {/* Subsection label — signals "this is the featured work" */}
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: 3, textTransform: "uppercase",
          color: "var(--accent)", marginBottom: 24,
        }}>
          <span style={{ opacity: 0.5 }}>//</span> Engineering
        </p>

        {/* Render each engineering experience item */}
        {experience.map((exp, index) => (
          <ExperienceItem key={index} {...exp} index={index} />
        ))}

        {/* Subsection label for current role — visually quieter */}
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: 3, textTransform: "uppercase",
          color: "var(--muted)", marginBottom: 20, marginTop: 16,
        }}>
          <span style={{ opacity: 0.5 }}>//</span> Currently
        </p>

        <CurrentRoleCard {...currentRole} />
      </div>
    </section>
  );
}

export default Experience;
