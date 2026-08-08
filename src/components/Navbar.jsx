// ============================================================
// src/components/Navbar.jsx — NAVIGATION BAR
// ============================================================
// Updated: Added "About" nav item linking to the new About section.
// Logo: "AA" double-monogram badge (redesigned from previous session).

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <svg
          width="44" height="44" viewBox="0 0 44 44" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "logoGlow 3s ease-in-out infinite",
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          <rect x="1.5" y="1.5" width="41" height="41" rx="4"
            stroke="var(--accent)" strokeWidth="1.2"
            strokeOpacity={hovered ? 0.9 : 0.45}
            style={{ transition: "stroke-opacity 0.3s" }}
          />
          <path d="M1.5 10 L1.5 1.5 L10 1.5"    stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />
          <path d="M34 42.5 L42.5 42.5 L42.5 34" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />
          <path d="M9 32 L16.5 12"   stroke="var(--accent)"            strokeWidth="2.4" strokeLinecap="round" />
          <path d="M16.5 12 L24 32"  stroke="var(--accent)"            strokeWidth="2.4" strokeLinecap="round" />
          <path d="M11.2 26 L21.8 26" stroke="var(--accent)"           strokeWidth="2"   strokeLinecap="round" />
          <path d="M20 32 L27.5 12"  stroke="rgba(59,255,160,0.55)"   strokeWidth="2.4" strokeLinecap="round" />
          <path d="M27.5 12 L35 32"  stroke="rgba(59,255,160,0.55)"   strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22.2 26 L32.8 26" stroke="rgba(59,255,160,0.55)"  strokeWidth="2"   strokeLinecap="round" />
          {hovered && <circle cx="16.5" cy="11" r="2" fill="var(--accent)" />}
        </svg>

        <div style={{
          overflow: "hidden",
          maxWidth: hovered ? 220 : 0,
          opacity: hovered ? 1 : 0,
          transition: "max-width 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.25s ease",
          whiteSpace: "nowrap",
        }}>
          <div style={{
            paddingLeft: 12,
            display: "flex", alignItems: "center", gap: 10,
            animation: hovered ? "fadeSlideIn 0.3s ease both" : "none",
          }}>
            <div style={{
              width: 1, height: 26,
              background: "linear-gradient(to bottom, transparent, rgba(59,255,160,0.5), transparent)",
              flexShrink: 0,
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--text)", letterSpacing: 0.2, lineHeight: 1 }}>
                Arshad Ali
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1.8, textTransform: "uppercase", lineHeight: 1 }}>
                Software Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── About is now the first nav item after the logo ──
const navItems = [
  { label: "About",      to: "about"      },  // ← NEW
  { label: "Skills",     to: "skills"     },
  { label: "Experience", to: "experience" },
  { label: "Projects",   to: "projects"   },
  { label: "Contact",    to: "contact"    },
];

function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress]       = useState(0);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [isMobile, setIsMobile]       = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll progress bar: 0 → 100 across full page height
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

      // Scrollspy: whichever section's top has passed a fixed offset
      // "wins" — cheap and avoids pulling in an IntersectionObserver
      // per-item just for a nav highlight.
      const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 820);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

      {!isMobile && (
        <div style={styles.links}>
          {navItems.map((item) => {
            const isActive = activeSection === item.to;
            return (
              <div key={item.to} style={{ position: "relative", paddingBottom: 4 }}>
                <Link
                  to={item.to}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  style={{
                    ...styles.link,
                    color: isActive || hoveredItem === item.to ? "var(--accent)" : "var(--muted)",
                  }}
                  onMouseEnter={() => setHoveredItem(item.to)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.label}
                </Link>
                {/* Active-section underline */}
                <div style={{
                  position: "absolute", left: 0, right: 0, bottom: -2, height: 2,
                  background: "var(--accent)", borderRadius: 2,
                  transform: `scaleX(${isActive ? 1 : 0})`,
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                }} />
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            width: 40, height: 40, borderRadius: 8,
            border: "1px solid var(--border)",
            background: "rgba(13,17,23,0.8)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
            cursor: "pointer",
          }}
        >
          <span style={{
            width: 18, height: 1.6, background: "var(--accent)", borderRadius: 2,
            transition: "transform 0.25s ease",
            transform: menuOpen ? "translateY(5.6px) rotate(45deg)" : "none",
          }} />
          <span style={{
            width: 18, height: 1.6, background: "var(--accent)", borderRadius: 2,
            opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s ease",
          }} />
          <span style={{
            width: 18, height: 1.6, background: "var(--accent)", borderRadius: 2,
            transition: "transform 0.25s ease",
            transform: menuOpen ? "translateY(-5.6px) rotate(-45deg)" : "none",
          }} />
        </button>
      )}

      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2,
        background: "transparent", zIndex: 101,
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 99,
              background: "rgba(3,7,18,0.97)",
              backdropFilter: "blur(12px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 32,
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
              >
                <Link
                  to={item.to}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    color: activeSection === item.to ? "var(--accent)" : "var(--text)",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
