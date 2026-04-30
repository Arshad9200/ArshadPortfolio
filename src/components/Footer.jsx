// ============================================================
// src/components/Footer.jsx — FOOTER
// ============================================================
// Simple component showing how to use template literals
// and import data from the data file.

import React from "react";
import { personalInfo, education } from "../data/portfolioData";

function Footer() {
  return (
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
  );
}

export default Footer;
