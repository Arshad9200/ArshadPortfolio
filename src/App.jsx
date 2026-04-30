// ============================================================
// src/App.jsx — THE ROOT COMPONENT
// ============================================================
// App is the "parent" of all other components.
// It assembles them like Lego blocks.
//
// Component Tree (parent → children):
//   App
//   ├── Cursor          (custom mouse cursor)
//   ├── ParticleBackground (canvas animation)
//   ├── FloatingTech    (right sidebar)
//   ├── Navbar          (top navigation)
//   ├── Hero            (first section)
//   ├── Skills          (skills grid)
//   ├── Experience      (timeline + stats)
//   ├── Projects        (project cards)
//   ├── Contact         (contact cards)
//   └── Footer          (bottom bar)

import React from "react";

// Import all our components
import Cursor from "./components/Cursor";
import ParticleBackground from "./components/ParticleBackground";
import FloatingTech from "./components/FloatingTech";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  // JSX — looks like HTML but it's JavaScript
  // Every component is used like an HTML tag: <ComponentName />
  // Self-closing tag <Component /> same as <Component></Component>

  return (
    // The outer div wraps everything — React needs a single root element
    <div style={{ position: "relative" }}>

      {/* Fixed elements — always visible, not part of scroll flow */}
      <Cursor />
      <ParticleBackground />
      <FloatingTech />
      <Navbar />

      {/* Main content — scrollable sections */}
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

// export default = this is the "main export" of this file
// Other files can import it as: import App from './App'
export default App;
