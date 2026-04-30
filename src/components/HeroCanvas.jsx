// ============================================================
// src/components/HeroCanvas.jsx — 3D ROTATING GLOBE
// ============================================================
// Pure canvas animation using math:
// - Math.sin() and Math.cos() = trigonometry for circular positions
// - We draw latitude/longitude lines to simulate a 3D sphere
// - Tech words orbit the globe in an ellipse

import React, { useRef, useEffect } from "react";

// Words that orbit the globe
const TECH_WORDS = [
  "Python", "Sanic", "React", "PostgreSQL",
  "AWS S3", "REST API", "Postman", "Redux", "Git", "Async",
];

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 420;
    canvas.height = 420;

    let angle = 0; // Current rotation angle (increases each frame)
    let animId;

    const cx = 210; // Center X
    const cy = 210; // Center Y
    const r = 150;  // Radius of the sphere

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── LATITUDE LINES (horizontal rings) ──
      for (let lat = -80; lat <= 80; lat += 20) {
        // Convert latitude degrees to Y position and ring radius
        const y = cy + r * Math.sin((lat * Math.PI) / 180);
        const ringRadius = r * Math.cos((lat * Math.PI) / 180);

        ctx.beginPath();
        for (let lng = 0; lng <= 360; lng += 2) {
          // angle rotates the whole globe over time
          const a = ((lng + angle * 60) * Math.PI) / 180;
          const x = cx + ringRadius * Math.cos(a);
          if (lng === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Lines near equator are brighter
        const brightness = 0.04 + 0.04 * Math.cos((lat * Math.PI) / 90);
        ctx.strokeStyle = `rgba(59,255,160,${brightness})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── LONGITUDE LINES (vertical arcs) ──
      for (let lng = 0; lng < 360; lng += 20) {
        const a = ((lng + angle * 60) * Math.PI) / 180;
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 2) {
          const y2 = cy + r * Math.sin((lat * Math.PI) / 180);
          const rr = r * Math.cos((lat * Math.PI) / 180);
          const x = cx + rr * Math.cos(a);
          if (lat === -90) ctx.moveTo(x, y2);
          else ctx.lineTo(x, y2);
        }
        // Math.cos(a) > 0 means line is on the "front" face of globe
        const visibility = Math.cos(a);
        ctx.strokeStyle = `rgba(59,255,160,${visibility > 0 ? 0.08 * visibility : 0})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── GLOW EFFECT IN CENTER ──
      // createRadialGradient makes a circular gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(59,255,160,0.06)");
      grad.addColorStop(1, "rgba(59,255,160,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // ── ORBITING TECH WORDS ──
      TECH_WORDS.forEach((word, i) => {
        // Spread words evenly around a circle
        // (Math.PI * 2) = 360 degrees in radians
        const wordAngle = angle + (i * (Math.PI * 2)) / TECH_WORDS.length;
        const orbitRadius = 190;

        // x moves in full circle, y is flattened (*0.35) to look like an ellipse
        const x = cx + orbitRadius * Math.cos(wordAngle);
        const y = cy + orbitRadius * Math.sin(wordAngle) * 0.35;

        // Words on far side (sin < 0) appear smaller/dimmer = "depth" effect
        const depth = (Math.sin(wordAngle) + 1) / 2;

        ctx.save(); // Save current drawing state
        ctx.font = `${10 + depth * 4}px 'JetBrains Mono'`;
        ctx.fillStyle = `rgba(59,255,160,${0.2 + depth * 0.7})`;
        ctx.textAlign = "center";
        ctx.fillText(word, x, y);
        ctx.restore(); // Restore drawing state
      });

      // Increment angle slowly — this creates the rotation
      angle += 0.004;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId); // Stop on unmount
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default HeroCanvas;
