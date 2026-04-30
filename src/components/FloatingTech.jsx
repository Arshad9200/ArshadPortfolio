// ============================================================
// src/components/FloatingTech.jsx — FLOATING SIDEBAR CHIPS
// ============================================================
// A decorative element that floats on the right side.
// Demonstrates: array.map(), hover state, CSS writing-mode

import React, { useState } from "react";
import { motion } from "framer-motion";
import { floatingTech } from "../data/portfolioData";

function FloatingTech() {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      style={{
        position: "fixed",
        right: 16,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {floatingTech.map((tech, i) => (
        <div
          key={tech}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            // writing-mode: vertical text — rotated 90 degrees
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            // Conditional color based on hovered state
            color: hovered === i ? "var(--accent)" : "var(--muted)",
            padding: "10px 7px",
            border: `1px solid ${hovered === i ? "rgba(59,255,160,0.3)" : "var(--border)"}`,
            borderRadius: 4,
            background: "rgba(13,17,23,0.8)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            cursor: "default",
          pointerEvents: "auto",
          }}
        >
          {tech}
        </div>
      ))}
    </motion.div>
  );
}

export default FloatingTech;
