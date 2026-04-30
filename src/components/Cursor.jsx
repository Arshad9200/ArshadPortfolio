// ============================================================
// src/components/Cursor.jsx — CUSTOM CURSOR COMPONENT (FIXED)
// ============================================================
// WHY THE OLD VERSION DIDN'T WORK:
// The old version used React STATE (useState) to track mouse position.
// Every mouse move → setState → React re-renders the whole component.
// This causes lag/no-movement because React's re-render cycle is slow
// compared to how fast the mouse moves.
//
// THE FIX: useRef + direct DOM style manipulation.
// useRef gives us a direct handle to the real DOM element.
// We update element.style.transform directly — this BYPASSES React
// entirely and is INSTANT (updates same frame as the mouse move).
//
// KEY LESSON: For high-frequency updates (mouse, scroll, animations)
// NEVER use useState. Always use useRef + direct DOM updates.

import React, { useRef, useEffect } from "react";

function Cursor() {
  // useRef creates a reference to a real DOM element
  // dotRef.current = the actual <div> node in the browser
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    // Plain JS variables — NOT state, so no re-renders
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let animId;

    // ── MOUSE MOVE: update dot INSTANTLY ──
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Directly set the DOM style — no React involved, zero lag
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    // ── ANIMATION LOOP: ring smoothly chases the dot ──
    const loop = () => {
      // Lerp (Linear Interpolation): move 12% closer each frame
      // Creates the smooth "trailing" effect
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      animId = requestAnimationFrame(loop);
    };

    // Hide cursor elements at 0,0 before user moves mouse
    const onFirstMove = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
      window.removeEventListener("mousemove", onFirstMove);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousemove", onFirstMove);
    loop(); // Start the ring animation loop

    // Cleanup: remove listeners + stop animation when component unmounts
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onFirstMove);
      cancelAnimationFrame(animId);
    };
  }, []); // Empty [] = run this effect only once on mount

  return (
    <>
      {/* DOT — small filled circle, sits exactly on the cursor tip */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 10, height: 10,
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          pointerEvents: "none",   // Don't block clicks
          zIndex: 9999,
          opacity: 0,              // Hidden until first mouse move
          willChange: "transform", // Hint browser to GPU-accelerate this
        }}
      />

      {/* RING — larger circle that lags behind the dot (lerp effect) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(59,255,160,0.6)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
        }}
      />
    </>
  );
}

export default Cursor;
