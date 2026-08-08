// ============================================================
// src/components/About.jsx — REDESIGNED
// ============================================================
// Key changes:
//  • Photo is visible by default — hover intensifies the glow/border
//  • "Available" badge moved OUT of photo into name area as a clean pill
//  • GH / LI / ✉ replaced with proper SVG icons + tooltip labels
//  • Cleaner left column with glitch-style name reveal
//  • Removed confusing scan-line over hidden photo
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-scroll";
import { education, currentRole, experience, socialLinks } from "../data/portfolioData";
import { SectionTitle } from "./Skills";

// ── RESPONSIVE HOOK ──
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

// ── TRAITS ──
const traits = [
  { icon: "⚡", label: "Fast Learner",        desc: "Picked up Sanic, Iceberg & AWS S3 on the job"  },
  { icon: "🔍", label: "Root Cause Focused",  desc: "Debug deep, fix right, prevent recurrence"      },
  { icon: "🏗️",  label: "Clean Architecture", desc: "Service layers, modular design, readable code"  },
  { icon: "🚀", label: "Production Mindset",  desc: "Ships features that hold up under real load"    },
];

// ── SVG SOCIAL ICONS ──
// Using inline SVG so there's no icon-library dependency.
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
    <path d="M12.04 2C6.577 2 2.13 6.447 2.13 11.91c0 1.816.487 3.518 1.334 4.983L2 22l5.24-1.375a9.87 9.87 0 0 0 4.798 1.222h.004c5.462 0 9.909-4.447 9.909-9.91C21.951 6.475 17.503 2.001 12.04 2Zm5.83 15.744c-.248.7-1.451 1.375-1.987 1.457-.508.078-1.145.11-1.848-.117-.426-.137-.973-.318-1.674-.622-2.945-1.272-4.868-4.24-5.014-4.436-.147-.196-1.201-1.596-1.201-3.045 0-1.45.762-2.164 1.032-2.46.27-.297.588-.371.784-.371h.564c.18 0 .422-.068.66.503.246.588.837 2.03.911 2.177.074.148.123.32.024.517-.099.198-.148.32-.296.494-.148.173-.31.386-.443.519-.148.148-.302.31-.13.607.173.297.767 1.267 1.647 2.052 1.13 1.008 2.083 1.32 2.38 1.47.297.147.47.123.643-.075.173-.198.74-.865.938-1.163.198-.297.395-.247.667-.148.272.099 1.727.815 2.023.963.297.148.494.222.567.346.074.124.074.717-.174 1.417Z"/>
  </svg>
);
const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

// ── QUICK-NAV ICONS (Projects / Skills / Experience) ──
// Same 18x18 line-icon style as the social icons above, so the new
// row reads as part of the same design language, not a bolt-on.
const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h6l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
  </svg>
);
const ChipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="10" rx="1.5"/>
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <path d="M2 13h20"/>
  </svg>
);

// ── Jump-to-section shortcuts. Reuses the same section ids the
// Navbar already scrolls to, so behavior is identical/consistent. ──
const quickNavLinks = [
  { Icon: FolderIcon,    label: "View Projects",    to: "projects",   color: "var(--accent2)" },
  { Icon: ChipIcon,      label: "My Skills",        to: "skills",     color: "var(--accent)"  },
  { Icon: BriefcaseIcon, label: "My Experience",    to: "experience", color: "rgba(168,85,247,0.9)" },
];

// ── Pulled from the centralized socialLinks data (portfolioData.js) ──
const aboutSocialLinks = [
  { Icon: GithubIcon,   label: "GitHub",    href: socialLinks.github,    color: "var(--text)"    },
  // { Icon: LinkedInIcon, label: "LinkedIn",  href: socialLinks.linkedin,  color: "var(--accent2)" },
  // { Icon: WhatsAppIcon, label: "WhatsApp",  href: socialLinks.whatsapp,  color: "var(--accent)"  },
  // { Icon: RocketIcon,   label: "Wellfound", href: socialLinks.wellfound, color: "rgba(168,85,247,0.9)" },
  // { Icon: MailIcon,     label: "Email",     href: socialLinks.email,     color: "var(--accent)"  },
];

// ── PHOTO CARD — visible by default, hover intensifies the glow ──
function PhotoCard({ isMobile }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  // Photo is visible by default now — hover just intensifies the glow/
  // border rather than gating visibility. A hidden-by-default photo tests
  // well as a "delightful interaction" but costs trust on a job-hunting
  // portfolio, where most visitors skim in seconds and will never hover.
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const size = isMobile ? 200 : 260;

  const handleMouseEnter = () => !isMobile && setHovered(true);
  const handleMouseLeave = () => !isMobile && setHovered(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, flexShrink: 0 }}
    >

      {/* ── Photo frame ── */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: size,
          height: size,
          flexShrink: 0,
        }}
      >
        {/* Rotating accent ring */}
        <div style={{
          position: "absolute", inset: -6, borderRadius: 20,
          background: "linear-gradient(135deg, rgba(59,255,160,0.35), rgba(0,207,255,0.15), rgba(59,255,160,0.1))",
          animation: "ringRotate 6s linear infinite",
          zIndex: 0,
        }} />
        {/* Dark fill */}
        <div style={{
          position: "absolute", inset: -3, borderRadius: 17,
          background: "var(--bg)", zIndex: 1,
        }} />

        {/* Frame box */}
        <div style={{
          position: "relative", width: "100%", height: "100%",
          borderRadius: 14, overflow: "hidden",
          border: `1.5px solid ${hovered ? "rgba(59,255,160,0.6)" : "rgba(59,255,160,0.25)"}`,
          zIndex: 2,
          boxShadow: hovered
            ? "0 0 60px rgba(59,255,160,0.22), 0 20px 60px rgba(0,0,0,0.6)"
            : "0 0 20px rgba(59,255,160,0.06), 0 20px 60px rgba(0,0,0,0.6)",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}>

          {/* ── Actual photo — visible by default ── */}
          <motion.img
            src="/passpost_size_photo.jpeg"
            alt="Arshad Ali — Software Engineer"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center top",
              display: "block",
              filter: "brightness(0.97) contrast(1.05)",
            }}
          />

          {/* Subtle vignette at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
            background: "linear-gradient(to top, rgba(3,7,18,0.5), transparent)",
            pointerEvents: "none", zIndex: 11,
          }} />
        </div>

        {/* Corner accents */}
        <svg style={{ position:"absolute", top:-4, left:-4, zIndex:3 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 10 L0 0 L10 0" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg style={{ position:"absolute", bottom:-4, right:-4, zIndex:3 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 10 L20 20 L10 20" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg style={{ position:"absolute", top:-4, right:-4, zIndex:3 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0 L20 0 L20 10" stroke="rgba(0,207,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg style={{ position:"absolute", bottom:-4, left:-4, zIndex:3 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 20 L0 20 L0 10" stroke="rgba(0,207,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Name + role */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 800,
          color: "var(--text)", letterSpacing: 0.3, marginBottom: 4,
        }}>
          Arshad Ali
        </p>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2.5,
          textTransform: "uppercase", color: "var(--accent)", marginBottom: 12,
        }}>
          Software Engineer
        </p>

        {/* "Open to work" pill — moved here, out of the photo */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 100,
          background: "rgba(59,255,160,0.07)",
          border: "1px solid rgba(59,255,160,0.25)",
          fontFamily: "var(--font-mono)", fontSize: 9,
          letterSpacing: 1.5, textTransform: "uppercase",
          color: "var(--accent)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)", display: "inline-block",
            animation: "pulse 2s infinite", flexShrink: 0,
          }}/>
          Open to Work
        </div>

        {/* Career snapshot — current role + most recent professional experience.
            Full detail for each still lives in the Experience section; this is
            just enough context so a visitor isn't left thinking GitHub is the
            whole story. */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 9,
          marginTop: 12, textAlign: "left",
          padding: "12px 14px", borderRadius: 8,
          border: "1px solid var(--border)",
          background: "rgba(13,17,23,0.6)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", flexShrink: 0, marginTop: 5,
              background: "var(--accent)", boxShadow: "0 0 8px rgba(59,255,160,0.6)",
            }} />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", lineHeight: 1.6 }}>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Currently</span>
              {" — "}{currentRole.title} ({currentRole.program}) @ {currentRole.company}
            </p>
          </div>
          {experience[0] && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0, marginTop: 5,
                background: "var(--muted)",
              }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", lineHeight: 1.6 }}>
                <span style={{ color: "var(--accent2)", fontWeight: 700 }}>Previously</span>
                {" — "}{experience[0].title} @ {experience[0].company.split(" · ")[0]} ({experience[0].date})
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Social icon row — with tooltips ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ display: "flex", gap: 10 }}
      >
        {aboutSocialLinks.map(({ Icon, label, href, color }) => (
          <div key={label} style={{ position: "relative" }}>
            <a
              href={href}
              {...(/^https?:/i.test(href || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onMouseEnter={() => setTooltip(label)}
              onMouseLeave={() => setTooltip(null)}
              style={{
                width: 38, height: 38, borderRadius: 8,
                border: "1px solid var(--border)",
                background: "rgba(17,24,39,0.8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onFocus={(e) => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; }}
              onBlur={(e)  => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              // inline hover via CSS-in-JS isn't great but works without CSS modules
              // We attach mouse handlers for the hover effect
              onMouseOver={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.background = "rgba(59,255,160,0.05)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "rgba(17,24,39,0.8)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Icon />
            </a>

            {/* Tooltip */}
            <AnimatePresence>
              {tooltip === label && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute", bottom: "calc(100% + 8px)",
                    left: "50%", transform: "translateX(-50%)",
                    background: "rgba(3,7,18,0.95)",
                    border: "1px solid var(--border)",
                    borderRadius: 6, padding: "4px 10px",
                    fontFamily: "var(--font-mono)", fontSize: 9,
                    letterSpacing: 1, textTransform: "uppercase",
                    color: "var(--text)", whiteSpace: "nowrap",
                    pointerEvents: "none", zIndex: 100,
                  }}
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* GitHub scope clarifier — makes explicit that GitHub is personal/
          open-source work only, not a stand-in for professional experience. */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55, duration: 0.4 }}
        style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--muted)", textAlign: "center",
          maxWidth: 230, lineHeight: 1.7, marginTop: -6,
        }}
      >
        <span style={{ color: "var(--accent)" }}>↳</span> GitHub shows{" "}
        <span style={{ color: "var(--text)" }}>personal projects &amp; open source</span> only —
        professional/company work is confidential and showcased below.
      </motion.p>

      {/* Quick navigation — jump straight to Projects / Skills / Experience */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2.5,
          textTransform: "uppercase", color: "var(--muted)",
          textAlign: "center", marginBottom: 10,
        }}>
          Explore More
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {quickNavLinks.map(({ Icon, label, to, color }) => (
            <div key={to} style={{ position: "relative" }}>
              <Link
                to={to}
                smooth={true}
                duration={600}
                offset={-80}
                onMouseEnter={() => setTooltip(to)}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  width: 38, height: 38, borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "rgba(17,24,39,0.8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onFocus={(e) => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; }}
                onBlur={(e)  => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.background = "rgba(59,255,160,0.05)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "rgba(17,24,39,0.8)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon />
              </Link>

              {/* Tooltip — identical pattern to the social icons above */}
              <AnimatePresence>
                {tooltip === to && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute", bottom: "calc(100% + 8px)",
                      left: "50%", transform: "translateX(-50%)",
                      background: "rgba(3,7,18,0.95)",
                      border: "1px solid var(--border)",
                      borderRadius: 6, padding: "4px 10px",
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: 1, textTransform: "uppercase",
                      color: "var(--text)", whiteSpace: "nowrap",
                      pointerEvents: "none", zIndex: 100,
                    }}
                  >
                    {label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}

// ── TRAIT CARD ──
function TraitCard({ icon, label, desc, index }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "14px 16px", borderRadius: 10,
        border: `1px solid ${hovered ? "rgba(59,255,160,0.3)" : "var(--border)"}`,
        background: hovered ? "rgba(59,255,160,0.04)" : "rgba(17,24,39,0.5)",
        transition: "all 0.25s ease",
        transform: `translateX(${hovered ? 4 : 0}px)`,
        cursor: "default",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <p style={{
          fontSize: 12, fontWeight: 700,
          color: hovered ? "var(--accent)" : "var(--text)",
          marginBottom: 2, transition: "color 0.25s",
        }}>
          {label}
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", lineHeight: 1.5 }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── EDUCATION CARD ──
function EducationCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px 22px", borderRadius: 12,
        border: `1px solid ${hovered ? "rgba(0,207,255,0.4)" : "rgba(0,207,255,0.15)"}`,
        background: hovered ? "rgba(0,207,255,0.04)" : "rgba(13,17,23,0.8)",
        transition: "all 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, var(--accent2), transparent)",
        transform: `scaleX(${hovered ? 1 : 0.25})`,
        transformOrigin: "left",
        transition: "transform 0.4s ease",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8, flexShrink: 0,
          background: "rgba(0,207,255,0.1)", border: "1px solid rgba(0,207,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        }}>🎓</div>

        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: 3, textTransform: "uppercase",
            color: "var(--accent2)", marginBottom: 5,
          }}>Education</p>
          <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 3, lineHeight: 1.4 }}>
            {education.degree}
          </h4>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginBottom: 8 }}>
            {education.university} · {education.location}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[education.years, `${education.score} Score`].map((tag) => (
              <span key={tag} style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                padding: "3px 9px", borderRadius: 4,
                background: "rgba(0,207,255,0.08)",
                border: "1px solid rgba(0,207,255,0.2)",
                color: "var(--accent2)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN ABOUT SECTION ──
function About() {
  const width      = useWindowWidth();
  const isMobile   = width < 640;
  const isTablet   = width >= 640 && width < 1024;
  const isDesktop  = width >= 1024;

  const sectionPadding = isMobile ? "80px 20px" : isTablet ? "80px 32px" : "100px 48px";

  const outerLayout = isDesktop
    ? { display: "grid", gridTemplateColumns: "280px 1fr", gap: 60, alignItems: "start" }
    : { display: "flex", flexDirection: "column", gap: 48 };

  const traitsGrid = isMobile
    ? { display: "flex", flexDirection: "column", gap: 10 }
    : { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };

  return (
    <section
      id="about"
      style={{
        position: "relative", zIndex: 1,
        padding: sectionPadding,
        background: "linear-gradient(160deg, rgba(3,7,18,0.95) 0%, rgba(13,17,23,0.75) 50%, rgba(3,7,18,0.95) 100%)",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "15%", left: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,255,160,0.035) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(60px)",
      }} />

      <SectionTitle label="Who I Am" title="About" />

      <div style={outerLayout}>

        {/* LEFT / TOP: Photo card */}
        <div style={isMobile ? { display: "flex", justifyContent: "center" } : {}}>
          <PhotoCard isMobile={isMobile} />
        </div>

        {/* RIGHT / BOTTOM: Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--text)" }}>
              I'm a <span style={{ color: "var(--accent)", fontWeight: 700 }}>Software Engineer</span> based
              in Lucknow, India, with 1+ year of hands-on experience building production-grade REST APIs
              and full-stack web applications. My core stack is{" "}
              <span style={{ color: "var(--accent2)", fontWeight: 600 }}>Python (Sanic)</span> on the
              backend and <span style={{ color: "var(--accent2)", fontWeight: 600 }}>React.js</span> on
              the frontend, backed by PostgreSQL and AWS S3.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--muted)" }}>
              At <span style={{ color: "var(--text)", fontWeight: 600 }}>Atom Build</span>, I worked
              across the full lifecycle — designing APIs, processing large datasets from Apache Iceberg,
              diagnosing cross-stack production bugs, and integrating frontend data flows. I take ownership
              of what I ship, from the first commit to the last Postman test.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--muted)" }}>
              Outside of work, I'm actively leveling up in{" "}
              <span style={{ color: "rgba(168,85,247,0.9)", fontWeight: 600 }}>Generative AI</span> —
              experimenting with LangChain, LLMs, and AI agents. I believe the next wave of backend
              engineers will need to wire AI into real systems, and I want to be ready for that.
            </p>
          </motion.div>

          {/* Traits */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: 3, textTransform: "uppercase",
                color: "var(--accent)", marginBottom: 12,
              }}
            >
              <span style={{ opacity: 0.5 }}>//</span> What I Bring
            </motion.p>
            <div style={traitsGrid}>
              {traits.map((t, i) => <TraitCard key={t.label} {...t} index={i} />)}
            </div>
          </div>

          {/* Education */}
          <EducationCard />

          {/* Location / status badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          >
            {[
              { icon: "📍", text: "Lucknow, India",        border: "var(--border)",              bg: "rgba(13,17,23,0.8)",        color: "var(--muted)"   },
              { icon: "🌐", text: "Full Time",      border: "rgba(0,207,255,0.2)",         bg: "rgba(0,207,255,0.04)",      color: "var(--accent2)" },
            ].map(({ icon, text, border, bg, color }) => (
              <div key={text} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "7px 14px", borderRadius: 8,
                border: `1px solid ${border}`, background: bg,
                fontFamily: "var(--font-mono)", fontSize: 11,
                color, letterSpacing: 0.8,
              }}>
                <span style={{ fontSize: 12 }}>{icon}</span>
                {text}
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes pulse      { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes ringRotate { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}

export default About;
