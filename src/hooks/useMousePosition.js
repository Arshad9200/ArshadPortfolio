// ============================================================
// src/hooks/useMousePosition.js — CUSTOM HOOK
// ============================================================
// A "Hook" is a special React function that starts with "use".
// It lets you REUSE logic across multiple components.
//
// This hook tracks where the mouse is on screen.
// Any component that needs mouse position can call this hook
// instead of copy-pasting the same code everywhere.

import { useState, useEffect } from "react";

// Convention: custom hooks start with "use"
function useMousePosition() {
  // useState gives us a variable + a function to update it
  // When the state changes, React re-renders the component
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect runs AFTER the component renders
  // We use it for "side effects" — things outside React's control
  // like adding event listeners, timers, API calls, etc.
  useEffect(() => {
    // This function runs whenever the mouse moves
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX, // X position from left edge of screen
        y: event.clientY, // Y position from top edge of screen
      });
    };

    // Attach the listener to the whole window
    window.addEventListener("mousemove", handleMouseMove);

    // CLEANUP FUNCTION — very important!
    // React calls this when the component is removed from screen.
    // Without cleanup, we'd have memory leaks (old listeners piling up).
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty array [] = run useEffect only ONCE (on mount)

  return position; // Return the coordinates so components can use them
}

export default useMousePosition;
