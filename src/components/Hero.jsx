import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import HeroCanvas from "./HeroCanvas";
import { personalInfo } from "../data/portfolioData";

// ── RESUME DOWNLOAD ──
// Your PDF must be named exactly: Arshad_Ali_Resume.pdf
// and placed inside the public/ folder of your project.
// public/Arshad_Ali_Resume.pdf → accessible at /Arshad_Ali_Resume.pdf
const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Arshad_Ali_Resume.pdf";        // matches exact filename in public/
  link.download = "Arshad_Ali_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Hero() {
  const typeSequence = personalInfo.roles.flatMap((role) => ["> " + role, 2000]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        zIndex: 1,
        // Use 100dvh for true full-screen on all devices
        minHeight: "100dvh",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        // Top padding = navbar height. Bottom padding keeps buttons visible
        padding: "80px 48px 80px",
        overflow: "hidden",
        gap: 40,
        boxSizing: "border-box",
      }}
    >
      {/* LEFT: All text content */}
      <div style={{
        maxWidth: 580,
        flex: 1,
        minWidth: 0,
        // Flex column with defined gaps — no margin hacks
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>

        {/* 1. Available badge */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid var(--border)", background: "rgba(59,255,160,0.05)",
            padding: "6px 18px", borderRadius: 100, fontSize: 10,
            letterSpacing: 3, textTransform: "uppercase", color: "var(--accent)",
            fontFamily: "var(--font-mono)", alignSelf: "flex-start",
          }}
        >
          <span style={{ width:6, height:6, background:"var(--accent)", borderRadius:"50%", display:"inline-block", animation:"pulse 2s infinite" }} />
          Available for Opportunities
        </motion.div>

        {/* 2. Name */}
        <motion.h1
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(60px, 8vw, 120px)",
            lineHeight: 0.88,
            letterSpacing: -2,
            margin: 0,
          }}
        >
          Arshad
          <span style={{ color:"var(--accent)", display:"block" }}>Ali</span>
        </motion.h1>

        {/* 3. Typing role */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily:"var(--font-mono)", fontSize:15, color:"var(--accent2)" }}
        >
          <TypeAnimation sequence={typeSequence} speed={60} repeat={Infinity} />
        </motion.div>

        {/* 4. Summary */}
        <motion.p
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize:14, lineHeight:1.8, color:"var(--muted)", maxWidth:500, margin:0 }}
        >
          {personalInfo.summary}
        </motion.p>

        {/* 5. CTA Buttons — all 3 on one row, full original width */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display:"flex", flexDirection:"row", gap:14, alignItems:"center" }}
        >
          <ActionButton
            href={"tel:" + personalInfo.phone}
            color="var(--accent2)"
            borderColor="var(--accent2)"
            glowColor="rgba(0,207,255,0.2)"
            label="📞 Call Now"
          />
          <ActionButton
            href={"mailto:" + personalInfo.email}
            color="var(--accent3)"
            borderColor="var(--accent3)"
            glowColor="rgba(255,96,96,0.2)"
            label="✉️ Email Me"
          />
          <button
            onClick={downloadResume}
            style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"13px 28px",
              borderRadius:4, fontFamily:"var(--font-body)", fontSize:13,
              fontWeight:700, letterSpacing:1, textTransform:"uppercase",
              cursor:"pointer", background:"var(--accent)", color:"#030712",
              border:"none", boxShadow:"0 0 28px rgba(59,255,160,0.3)",
              transition:"all 0.3s", whiteSpace:"nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow="0 0 44px rgba(59,255,160,0.5)"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow="0 0 28px rgba(59,255,160,0.3)"; e.currentTarget.style.transform="translateY(0)"; }}
          >
            ⬇ Download Resume
          </button>
        </motion.div>

      </div>

      {/* RIGHT: 3D Globe */}
      <motion.div
        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
        transition={{ duration:1, delay:0.5 }}
        style={{ width:400, height:400, flexShrink:0 }}
      >
        <HeroCanvas />
      </motion.div>

      {/* Scroll indicator at very bottom */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        style={{
          position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:8,
          fontFamily:"var(--font-mono)", fontSize:10, color:"var(--muted)",
          letterSpacing:3, textTransform:"uppercase",
        }}
      >
        <span>Scroll</span>
        <div style={{ width:1, height:44, background:"linear-gradient(to bottom, var(--accent), transparent)", animation:"scrollPulse 2s ease-in-out infinite" }} />
      </motion.div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes scrollPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}

function ActionButton({ href, color, borderColor, glowColor, label }) {
  return (
    <a
      href={href}
      style={{
        display:"inline-flex", alignItems:"center", gap:8,
        padding:"13px 28px",
        borderRadius:4, fontFamily:"var(--font-body)", fontSize:13,
        fontWeight:700, letterSpacing:1, textTransform:"uppercase",
        background:"transparent", color:color,
        border:"1.5px solid " + borderColor,
        transition:"all 0.3s", cursor:"pointer", whiteSpace:"nowrap",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow="0 0 28px " + glowColor; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
    >
      {label}
    </a>
  );
}

export default Hero;
