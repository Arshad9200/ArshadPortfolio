// ============================================================
// src/components/ParticleBackground.jsx — CANVAS ANIMATION
// ============================================================
// We use the HTML <canvas> element to draw animated particles.
// Canvas lets us draw shapes, lines, and images with JavaScript.
// useRef gives us direct access to a DOM element (the canvas).
// useEffect runs our animation loop after the component mounts.

import React, { useRef, useEffect } from "react";

function ParticleBackground() {
  // useRef = a "reference" to a real DOM element
  // After the component renders, canvasRef.current points to the <canvas>
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; // The actual <canvas> DOM element
    const ctx = canvas.getContext("2d"); // 2D drawing context (the drawing tool)

    // Make canvas fill the whole screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create 80 particles with random positions and velocities
    // Array.from({ length: 80 }, ...) creates an array of 80 items
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, // velocity x (-0.2 to +0.2)
      vy: (Math.random() - 0.5) * 0.4, // velocity y
      size: Math.random() * 1.5 + 0.5, // size (0.5 to 2)
      opacity: Math.random() * 0.4 + 0.1,
    }));

    // Animation ID — we need this to STOP the animation on cleanup
    let animId;

    // The animation loop — runs ~60 times per second
    const animate = () => {
      // Clear the canvas before each frame (like erasing a whiteboard)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particle by its velocity
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges (pac-man style)
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw the particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); // circle
        ctx.fillStyle = `rgba(59,255,160,${p.opacity})`;
        ctx.fill();
      });

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem

          if (dist < 120) {
            // Only connect if close enough
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,255,160,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // requestAnimationFrame = browser's built-in animation loop
      // It calls animate again before the next screen repaint (~60fps)
      animId = requestAnimationFrame(animate);
    };

    animate(); // Start the loop

    // Cleanup: cancel animation and remove listener when component unmounts
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []); // [] = run only once when component first appears

  return (
    <canvas
      ref={canvasRef} // Connect this canvas to our canvasRef
      style={{
        position: "fixed",
        inset: 0, // top:0, right:0, bottom:0, left:0
        zIndex: 0,
        pointerEvents: "none", // Canvas doesn't block mouse clicks
      }}
    />
  );
}

export default ParticleBackground;
