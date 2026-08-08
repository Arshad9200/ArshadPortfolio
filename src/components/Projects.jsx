// ============================================================
// src/components/Projects.jsx — PROJECTS SECTION
// ============================================================
// Demonstrates:
// - CSS pseudo-elements via inline animation hack
// - Hover state management with useState
// - Conditional class rendering

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "../data/portfolioData";
import { SectionTitle } from "./Skills";

// 640px = phones only — tablet/desktop keep the exact current layout.
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

// ── PROJECT THUMBNAIL ──
// No real screenshots exist yet, so this renders a stylized "browser
// window" mockup (traffic-light dots + gradient body + big initial) as a
// placeholder. Swap the body background for an <img src={project.image}>
// later without touching the frame markup.
function ProjectThumbnail({ title, image, gradientFrom, gradientTo }) {
  const initial = title.trim().charAt(0).toUpperCase();
  return (
    <div style={{
      borderRadius: 10,
      overflow: "hidden",
      border: "1px solid var(--border)",
      marginBottom: 22,
    }}>
      {/* Fake browser chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 10px",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
      </div>
      {/* "Screen" area — real screenshot if provided, gradient placeholder otherwise */}
      <div style={{
        height: 140,
        background: image ? "var(--card)" : `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {image ? (
          <img
            src={image}
            alt={`${title} screenshot`}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 56,
            color: "rgba(255,255,255,0.15)",
          }}>
            {initial}
          </span>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ title, stack, techChips, isLive, points, link, github, image, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const isMobile = useIsMobile();

  const COLLAPSE_AT = 3;
  const shouldCollapse = isMobile && !expanded && points.length > COLLAPSE_AT;
  const visiblePoints = shouldCollapse ? points.slice(0, COLLAPSE_AT) : points;

  // Alternate two gradient pairs so cards don't all look identical.
  const gradients = [
    ["rgba(59,255,160,0.35)", "rgba(0,207,255,0.35)"],
    ["rgba(0,207,255,0.35)", "rgba(168,85,247,0.35)"],
  ];
  const [gradientFrom, gradientTo] = gradients[index % gradients.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.92 }}
      layout
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${isHovered ? "rgba(59,255,160,0.25)" : "var(--border)"}`,
        borderRadius: 16,
        padding: isMobile ? 16 : 24,
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
        zIndex: 2,
      }} />

      <ProjectThumbnail title={title} image={image} gradientFrom={gradientFrom} gradientTo={gradientTo} />

      {/* Inner padding wrapper for everything below the thumbnail */}
      <div style={{ padding: "0 12px 12px" }}>

      {/* Top row: Live badge + Visit link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        {isLive && (
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:2, color:"var(--accent)", textTransform:"uppercase" }}>
            <span style={{ width:6, height:6, background:"var(--accent)", borderRadius:"50%", display:"inline-block", animation:"pulse 1.5s infinite" }} />
            Live Project
          </div>
        )}

        {/* Clickable Visit + Code buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.5,
                textTransform: "uppercase", color: "var(--text)",
                border: "1px solid var(--border)", padding: "4px 12px",
                borderRadius: 4, textDecoration: "none",
                transition: "all 0.3s",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {"</>"} Code
            </a>
          )}
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

      {techChips && techChips.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {techChips.map((chip) => (
            <span key={chip.name} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5,
              color: "var(--accent2)",
              border: "1px solid rgba(0,207,255,0.25)",
              background: "rgba(0,207,255,0.05)",
              padding: "3px 9px", borderRadius: 100,
            }}>
              <span>{chip.icon}</span>{chip.name}
            </span>
          ))}
        </div>
      ) : (
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
      )}

      <ul>
        {visiblePoints.map((point, i) => (
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

      </div>

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
  const [filter, setFilter] = useState("all");
  const isMobile = useIsMobile();
  const filtered = filter === "all" ? projects : projects.filter((p) => p.isLive);

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        zIndex: 1,
        padding: isMobile ? "60px 20px" : "100px 48px",
        background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(13,17,23,0.5))",
      }}
    >
      <SectionTitle label="What I've Built" title="Projects" />

      <div style={{ display: "flex", gap: 10, marginBottom: 36, marginTop: -30 }}>
        {["all", "live"].map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                letterSpacing: 1.5, textTransform: "uppercase",
                padding: "8px 16px", borderRadius: 100,
                border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                background: isActive ? "rgba(59,255,160,0.1)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {f === "all" ? "All Projects" : "Live Only"}
            </button>
          );
        })}
      </div>

      {/* Grid minimum column width was 340px — on a 375px-wide phone,
          after 48px section padding, that's ~279px of usable width, well
          under the 340px minimum, which forced horizontal overflow.
          Reduced to 280px on mobile only; desktop/tablet untouched. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? 280 : 340}px, 1fr))`,
          gap: isMobile ? 16 : 24,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects;
