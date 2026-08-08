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
    <div style={{ position: "relative" }}>

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
