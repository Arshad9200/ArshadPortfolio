// ============================================================
// src/App.jsx — THE ROOT COMPONENT
// ============================================================
// Component Tree (parent → children):
//   App
//   ├── Cursor
//   ├── ParticleBackground
//   ├── FloatingTech
//   ├── Navbar
//   ├── Hero
//   ├── About          ← NEW — sits between Hero and Skills
//   ├── Skills
//   ├── Experience
//   ├── Projects
//   ├── Contact
//   ├── Footer
//   └── AskAI          ← NEW — floating AI assistant (backend-free)

import React from "react";

import Cursor            from "./components/Cursor";
import ParticleBackground from "./components/ParticleBackground";
import FloatingTech      from "./components/FloatingTech";
import Navbar            from "./components/Navbar";
import Hero              from "./components/Hero";
import About             from "./components/About";   // ← NEW import
import Skills            from "./components/Skills";
import Experience        from "./components/Experience";
import Projects          from "./components/Projects";
import Contact           from "./components/Contact";
import Footer            from "./components/Footer";
import AskAI             from "./components/AskAI";   // ← NEW import — floating chat assistant

function App() {
  return (
    // overflowX:hidden here is a deliberate safety net: with this many
    // custom animations/transforms across the site (framer-motion
    // scale/slide-ins, 3D tilts, canvas globes), a single nested element
    // being a few px too wide on some device can make the whole page
    // horizontally scrollable/"bouncy". This guarantees the document
    // itself can never scroll sideways, regardless of the cause,
    // without changing how anything actually looks.
    <div style={{ position: "relative", overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>

      {/* Fixed elements */}
      <Cursor />
      <ParticleBackground />
      <FloatingTech />
      <Navbar />
      <AskAI />        {/* ← NEW — floating chat button, bottom-right, no backend */}

      {/* Scrollable sections */}
      <main>
        <Hero />
        <About />        {/* ← NEW — place right after Hero */}
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
