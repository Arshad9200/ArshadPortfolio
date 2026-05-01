// ============================================================
// src/components/Navbar.jsx — NAVIGATION BAR
// ============================================================
// LOGO REDESIGN: replaced the old <A/> SVG bracket logo with a
// cleaner monogram-style mark.
//
// New design concept: "AA" stacked initials in a minimal square badge —
// inspired by how top-tier dev portfolios (Brittany Chiang, Josh Comeau)
// use a tight, geometric lettermark that reads instantly at small sizes.
//
// On hover: slides in full name + title, same as before.

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 48px",
    transition: "background 0.3s ease",
  },
  links: {
    display: "flex",
    gap: 36,
  },
  link: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "var(--muted)",
    cursor: "pointer",
    transition: "color 0.3s",
  },
};

// ── REDESIGNED LOGO MARK ──
// Clean "AA" monogram: two overlapping A-strokes forming a compact geometric badge.
// A thin accent-colored square border anchors it — no rounded corners,
// keeping it sharp and code-editor-like.
// On hover: slides in "Arshad Ali / Software Engineer" exactly as before.
function LogoMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0px); }
        }
        @keyframes logoGlow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(59,255,160,0.25)); }
          50%      { filter: drop-shadow(0 0 14px rgba(59,255,160,0.55)); }
        }
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", alignItems: "center", gap: 0, cursor: "pointer" }}
      >
        {/* ── MONOGRAM BADGE ── */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "logoGlow 3s ease-in-out infinite",
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          {/* Outer square border — accent-tinted */}
          <rect
            x="1.5"
            y="1.5"
            width="41"
            height="41"
            rx="4"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity={hovered ? 0.9 : 0.45}
            style={{ transition: "stroke-opacity 0.3s" }}
          />

          {/* Inner corner accent marks — top-left & bottom-right */}
          <path d="M1.5 10 L1.5 1.5 L10 1.5"   stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />
          <path d="M34 42.5 L42.5 42.5 L42.5 34" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />

          {/* First A — left, slightly offset */}
          <path d="M9 32 L16.5 12" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M16.5 12 L24 32" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M11.2 26 L21.8 26" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />

          {/* Second A — right, overlapping, slightly lighter so they layer nicely */}
          <path d="M20 32 L27.5 12" stroke="rgba(59,255,160,0.55)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M27.5 12 L35 32" stroke="rgba(59,255,160,0.55)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22.2 26 L32.8 26" stroke="rgba(59,255,160,0.55)" strokeWidth="2" strokeLinecap="round" />

          {/* Tiny dot at apex of first A — appears on hover */}
          {hovered && (
            <circle cx="16.5" cy="11" r="2" fill="var(--accent)" />
          )}
        </svg>

        {/* ── HOVER REVEAL: Arshad Ali · title ── */}
        <div style={{
          overflow: "hidden",
          maxWidth: hovered ? 220 : 0,
          opacity: hovered ? 1 : 0,
          transition: "max-width 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.25s ease",
          whiteSpace: "nowrap",
        }}>
          <div style={{
            paddingLeft: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: hovered ? "fadeSlideIn 0.3s ease both" : "none",
          }}>
            {/* Thin vertical divider */}
            <div style={{
              width: 1,
              height: 26,
              background: "linear-gradient(to bottom, transparent, rgba(59,255,160,0.5), transparent)",
              flexShrink: 0,
            }} />

            {/* Name + title stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: 0.2,
                lineHeight: 1,
              }}>
                Arshad Ali
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--muted)",
                letterSpacing: 1.8,
                textTransform: "uppercase",
                lineHeight: 1,
              }}>
                Software Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const navItems = [
  { label: "Skills",      to: "skills"     },
  { label: "Experience",  to: "experience" },
  { label: "Projects",    to: "projects"   },
  { label: "Contact",     to: "contact"    },
];

function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        ...styles.nav,
        background: scrolled
          ? "rgba(3,7,18,0.85)"
          : "linear-gradient(to bottom, rgba(3,7,18,0.8), transparent)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <LogoMark />

      <div style={styles.links}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth={true}
            duration={600}
            offset={-80}
            style={{
              ...styles.link,
              color: hoveredItem === item.to ? "var(--accent)" : "var(--muted)",
            }}
            onMouseEnter={() => setHoveredItem(item.to)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

export default Navbar;
