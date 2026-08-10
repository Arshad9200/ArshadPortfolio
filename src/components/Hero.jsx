import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import HeroCanvas from "./HeroCanvas";
import { personalInfo } from "../data/portfolioData";

// ── RESUME DOWNLOAD ──
// Your PDF must be named exactly: Arshad_Ali_Resume.pdf
// and placed inside the public/ folder of your project.
// public/Arshad_Ali_Resume.pdf → accessible at /Arshad_Ali_Resume.pdf
// (moved inside the Hero component below so it can trigger the toast)

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Small personal touch — visitors landing at different times see a
// slightly different opener instead of a static badge every time.
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Working late? Same";
}

function Hero() {
  const typeSequence = personalInfo.roles.flatMap((role) => ["> " + role, 2000]);
  const [emailCopied, setEmailCopied] = useState(false);
  const [resumeToast, setResumeToast] = useState(false);

  // 640px = phones only. Tablets (768px+) and desktop keep the exact
  // existing layout — nothing below changes anything at those widths.
  //
  // IMPORTANT: initialized lazily from window.innerWidth (not `false`)
  // so the very first render already has the correct value. Defaulting
  // to false and correcting via useEffect meant the page briefly
  // rendered the full desktop layout (400px globe, side-by-side row)
  // on phones, then snapped to mobile a frame later — that flash of an
  // oversized desktop layout was the actual cause of the "bouncy" /
  // extra-right-space symptom on real devices.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 640
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Arshad_Ali_Resume.pdf";
    link.download = "Arshad_Ali_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setResumeToast(true);
    setTimeout(() => setResumeToast(false), 2500);
  };

  // mailto: links only work if the visitor's browser/OS has a default mail
  // app configured — many don't (especially on work laptops). Copying the
  // address to the clipboard on click means the button still does
  // something useful even when mailto: silently fails.
  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email).then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        zIndex: 1,
        // Desktop/tablet: unchanged 100dvh hard-clip layout.
        // Mobile: content is allowed to be taller than one screen and
        // scroll naturally instead of being clipped — a phone screen
        // can't fit name+summary+buttons+globe in one viewport without
        // either shrinking everything illegibly or clipping content.
        minHeight: "100dvh",
        height: isMobile ? "auto" : "100dvh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: isMobile ? "flex-start" : "flex-start",
        padding: isMobile ? "96px 20px 60px" : "80px 48px 80px",
        overflow: isMobile ? "visible" : "hidden",
        gap: isMobile ? 28 : 40,
        boxSizing: "border-box",
      }}
    >
      {/* LEFT: All text content */}
      <div style={{
        maxWidth: isMobile ? "100%" : 580,
        flex: isMobile ? "none" : 1,
        minWidth: 0,
        // Flex column with defined gaps — no margin hacks
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 16 : 20,
      }}>

        {/* 1. Available badge — standalone status pill, shown first */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.05 }}
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

        {/* 0. Greeting — sits directly above the name so it reads as one sentence:
             "Good morning, I'm" → "Arshad Ali", with no badge breaking it up. */}
        <motion.p
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)", margin: 0 }}
        >
          {getGreeting()}, I'm
        </motion.p>

        {/* 2. Name */}
        <motion.h1
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(60px, 8vw, 120px)",
            lineHeight: 0.88,
            letterSpacing: -2,
            margin: "-8px 0 0",
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

        {/* 5. CTA Buttons — row on desktop/tablet (unchanged), stacked on mobile */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display:"flex",
            flexDirection: isMobile ? "column" : "row",
            gap:14,
            alignItems: isMobile ? "stretch" : "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <ActionButton
            href={"tel:" + personalInfo.phone}
            color="var(--accent2)"
            borderColor="var(--accent2)"
            glowColor="rgba(0,207,255,0.2)"
            label="📞 Call Now"
            fullWidth={isMobile}
          />
          <ActionButton
            href={"mailto:" + personalInfo.email}
            onClick={copyEmail}
            color="var(--accent3)"
            borderColor="var(--accent3)"
            glowColor="rgba(255,96,96,0.2)"
            label={emailCopied ? "✓ Email Copied" : "✉️ Email Me"}
            fullWidth={isMobile}
          />
          <button
            onClick={downloadResume}
            style={{
              display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
              padding:"13px 28px",
              borderRadius:4, fontFamily:"var(--font-body)", fontSize:13,
              fontWeight:700, letterSpacing:1, textTransform:"uppercase",
              cursor:"pointer", background:"var(--accent)", color:"#030712",
              border:"none", boxShadow:"0 0 28px rgba(59,255,160,0.3)",
              transition:"all 0.3s", whiteSpace:"nowrap",
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow="0 0 44px rgba(59,255,160,0.5)"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow="0 0 28px rgba(59,255,160,0.3)"; e.currentTarget.style.transform="translateY(0)"; }}
          >
            ⬇ Download Resume
          </button>
        </motion.div>

      </div>

      {/* RIGHT: 3D Globe — unchanged on desktop/tablet, shrunk + moved
          below the text (not removed) on mobile so it never forces
          horizontal overflow. */}
      <motion.div
        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
        transition={{ duration:1, delay:0.5 }}
        style={{
          width: isMobile ? 240 : 400,
          height: isMobile ? 240 : 400,
          flexShrink: 0,
          alignSelf: isMobile ? "center" : "auto",
          margin: isMobile ? "8px 0 0" : 0,
        }}
      >
        <HeroCanvas />
      </motion.div>

      {/* Scroll indicator — desktop/tablet only. On mobile the section
          height is no longer fixed to the viewport, so an absolutely
          positioned "scroll" hint at bottom:24 would float in the middle
          of the page instead of at the true bottom. */}
      {!isMobile && (
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
      )}

      {/* Resume download confirmation toast */}
      <AnimatePresence>
        {resumeToast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", bottom: 96, right: 28, zIndex: 200,
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 18px", borderRadius: 8,
              background: "rgba(13,17,23,0.95)",
              border: "1px solid rgba(59,255,160,0.35)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
              fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)",
            }}
          >
            <span style={{ color: "var(--accent)" }}>✓</span> Resume downloading...
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes scrollPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}

function ActionButton({ href, color, borderColor, glowColor, label, onClick, fullWidth }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        padding:"13px 28px",
        borderRadius:4, fontFamily:"var(--font-body)", fontSize:13,
        fontWeight:700, letterSpacing:1, textTransform:"uppercase",
        background:"transparent", color:color,
        border:"1.5px solid " + borderColor,
        transition:"all 0.3s", cursor:"pointer", whiteSpace:"nowrap",
        width: fullWidth ? "100%" : "auto",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow="0 0 28px " + glowColor; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
    >
      {label}
    </a>
  );
}

export default Hero;
