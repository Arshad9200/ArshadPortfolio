// ============================================================
// src/components/Footer.jsx — FOOTER
// ============================================================
// Simple component showing how to use template literals
// and import data from the data file.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animateScroll } from "react-scroll";
import { personalInfo, education } from "../data/portfolioData";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={() => animateScroll.scrollToTop({ duration: 500, smooth: true })}
          style={{
            position: "fixed", bottom: 28, left: 28, zIndex: 90,
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "rgba(13,17,23,0.9)",
            backdropFilter: "blur(10px)",
            color: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <>
    <BackToTop />
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        padding: "28px 48px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      {/* Template literal: `` backticks allow embedding variables with ${} */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        Built with{" "}
        <span style={{ color: "var(--accent3)" }}>♥</span> by{" "}
        <span style={{ color: "var(--accent)" }}>{personalInfo.name}</span>
      </p>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <span style={{ color: "var(--accent)" }}>{personalInfo.email}</span>
        {" · "}
        {personalInfo.phone}
      </p>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        BTech CS · BBDU ·{" "}
        <span style={{ color: "var(--accent)" }}>{education.score}</span>
      </p>
    </footer>
    </>
  );
}

export default Footer;
