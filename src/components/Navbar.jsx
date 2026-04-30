// ============================================================
// src/components/Navbar.jsx — NAVIGATION BAR
// ============================================================
// Props = "properties" = data passed FROM parent TO child component.
// Like function parameters, but for components.
// <Navbar title="AA" /> — "title" is a prop.
//
// Here Navbar receives no props — it uses imported data directly.

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll"; // Smooth scroll to sections

// CSS-in-JS styles object
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
  logo: {
    fontFamily: "var(--font-display)",
    fontSize: 28,
    letterSpacing: 4,
    color: "var(--accent)",
    filter: "drop-shadow(0 0 20px rgba(59,255,160,0.4))",
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

// ── LOGO MARK COMPONENT ──
// Clean wordmark: stylised slash mark + name reveal on hover
// Reference: how Vercel, Framer, Linear do minimal but memorable logos
function LogoMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0px); }
        }
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          cursor: "pointer",
        }}
      >

        {/* ── LOGO: Clean <A/> — single letter, code brackets, no border box ── */}
        <svg
          width="52"
          height="36"
          viewBox="0 0 52 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* < bracket */}
          <path
            d="M6 10 L1 18 L6 26"
            stroke="rgba(59,255,160,0.4)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bold A — left leg */}
          <path d="M18 28 L26 8" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
          {/* Bold A — right leg */}
          <path d="M26 8 L34 28" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
          {/* Bold A — crossbar */}
          <path d="M20.5 22 L31.5 22" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />

          {/* /> bracket */}
          <path
            d="M46 10 L51 18 L46 26"
            stroke="rgba(59,255,160,0.4)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dot — appears on hover, accent on the peak */}
          {hovered && (
            <circle cx="26" cy="7.5" r="2.2" fill="var(--accent)" />
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

// Array of nav items — easy to add/remove items here
const navItems = [
  { label: "Skills", to: "skills" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];

function Navbar() {
  // useState: [currentValue, functionToUpdateValue]
  // scrolled = false initially, changes when user scrolls
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Track which link is hovered

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolled more than 50px, set scrolled to true
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);

  return (
    // motion.nav — framer-motion animated nav element
    // initial = starting state, animate = end state
    <motion.nav
      initial={{ y: -100, opacity: 0 }} // Start above screen
      animate={{ y: 0, opacity: 1 }} // Slide down to position
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        ...styles.nav,
        // Conditional styling — add blur background when scrolled
        background: scrolled
          ? "rgba(3,7,18,0.85)"
          : "linear-gradient(to bottom, rgba(3,7,18,0.8), transparent)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      {/* ── LOGO ── */}
      <LogoMark />

      <div style={styles.links}>
        {/* .map() loops over navItems array and creates a Link for each */}
        {navItems.map((item) => (
          // KEY PROP: React needs unique "key" when rendering lists
          // It helps React track which item changed/added/removed
          <Link
            key={item.to}
            to={item.to} // ID of the section to scroll to
            smooth={true} // Smooth scrolling animation
            duration={600} // 600ms scroll animation
            offset={-80} // Account for fixed navbar height
            style={{
              ...styles.link,
              // Ternary operator: condition ? valueIfTrue : valueIfFalse
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
