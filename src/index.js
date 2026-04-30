// ============================================================
// src/index.js  — THE ENTRY POINT OF EVERY REACT APP
// ============================================================
// This is the FIRST file React reads.
// It finds the <div id="root"> in public/index.html
// and "mounts" (injects) our entire App component inside it.

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";   // Global styles (reset, fonts, variables)
import App from "./App"; // Our main App component

// React 18 way to mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* StrictMode helps find bugs during development */}
    <App />
  </React.StrictMode>
);
