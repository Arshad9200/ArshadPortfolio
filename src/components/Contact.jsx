// ============================================================
// src/components/Contact.jsx — CONTACT SECTION (REDESIGNED)
// ============================================================
// Changes from previous version:
//  • Split into two tiers: 3 primary action cards (Phone, Email,
//    Resume) + a compact row of secondary profile links
//    (LinkedIn, WhatsApp, Wellfound) — avoids the
//    7-equal-cards wall that read as cluttered.
//  • Replaced all emoji with consistent SVG line icons — emoji
//    render differently per OS and clashed with the site's
//    clean icon language elsewhere.
//  • Fixed email overflow with proper overflow-wrap handling.
//  • Collapsed the per-card rainbow of accent colors down to the
//    site's existing --accent / --accent2 palette.
//
// Make sure: public/Arshad_Ali_Resume.pdf exists in your project.

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo, socialLinks } from "../data/portfolioData";
import { SectionTitle } from "./Skills";

// ── SVG ICONS — consistent line-icon style, no emoji ──
const PhoneIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const FileIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M12 18v-6"/>
    <path d="m9 15 3 3 3-3"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.577 2 2.13 6.447 2.13 11.91c0 1.816.487 3.518 1.334 4.983L2 22l5.24-1.375a9.87 9.87 0 0 0 4.798 1.222h.004c5.462 0 9.909-4.447 9.909-9.91C21.951 6.475 17.503 2.001 12.04 2Zm5.83 15.744c-.248.7-1.451 1.375-1.987 1.457-.508.078-1.145.11-1.848-.117-.426-.137-.973-.318-1.674-.622-2.945-1.272-4.868-4.24-5.014-4.436-.147-.196-1.201-1.596-1.201-3.045 0-1.45.762-2.164 1.032-2.46.27-.297.588-.371.784-.371h.564c.18 0 .422-.068.66.503.246.588.837 2.03.911 2.177.074.148.123.32.024.517-.099.198-.148.32-.296.494-.148.173-.31.386-.443.519-.148.148-.302.31-.13.607.173.297.767 1.267 1.647 2.052 1.13 1.008 2.083 1.32 2.38 1.47.297.147.47.123.643-.075.173-.198.74-.865.938-1.163.198-.297.395-.247.667-.148.272.099 1.727.815 2.023.963.297.148.494.222.567.346.074.124.074.717-.174 1.417Z"/>
  </svg>
);
const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.29 9.28 7.86 10.78.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.53-3.87-1.53-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z"/>
  </svg>
);

// ── Download the actual PDF stored in /public ──
const downloadResume = (e) => {
  e.preventDefault();
  const link = document.createElement("a");
  link.href = "/Arshad_Ali_Resume.pdf";
  link.download = "Arshad_Ali_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ── PRIMARY CARDS — the 3 actions that matter most to a recruiter ──
const primaryCards = [
  {
    Icon: PhoneIcon,
    label: "Phone",
    value: personalInfo.phone,
    action: "Tap to call →",
    href: `tel:${personalInfo.phone}`,
    type: "link",
  },
  {
    Icon: MailIcon,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    type: "link",
    copyValue: personalInfo.email,
    preferred: true,
    dualAction: true, // shows separate "Copy" and "Open Mail App" buttons instead of one combined click
  },
  {
    Icon: FileIcon,
    label: "Resume",
    value: "Software developer CV",
    action: "Download PDF →",
    href: "/Arshad_Ali_Resume.pdf",
    type: "download",
  },
];

// ── SECONDARY LINKS — compact, quieter, same treatment as the About social row ──
const secondaryLinks = [
  { Icon: GitHubIcon,   label: "GitHub",   href: socialLinks.github },
  { Icon: LinkedInIcon, label: "LinkedIn",  href: socialLinks.linkedin },
  { Icon: WhatsAppIcon, label: "WhatsApp",  href: socialLinks.whatsapp },
  { Icon: CompassIcon,  label: "Wellfound", href: socialLinks.wellfound },
];

function PrimaryCard({ Icon, label, value, action, href, type, copyValue, preferred, dualAction, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Subtle magnetic pull — card nudges a few px toward the cursor within
  // its own bounds, matching the tilt/spotlight language already used on
  // the Skills cards elsewhere in the site.
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMagnet({ x, y });
  };

  const copyToClipboard = (e) => {
    e.preventDefault();
    if (copyValue && navigator.clipboard) {
      navigator.clipboard.writeText(copyValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  // Universal fallback for the "Open App" mailto: link — works in any
  // browser even when no local mail client is registered.
  const gmailHref = copyValue
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(copyValue)}`
    : null;

  const handleClick = (e) => {
    if (type === "download") downloadResume(e);
    // mailto:/tel: links depend on the visitor having a default handler
    // configured — many don't. Copying the value means the click still
    // does something useful even if the OS has nothing to open it with.
    if (copyValue && navigator.clipboard) {
      navigator.clipboard.writeText(copyValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: "32px 24px",
    position: "relative",
    background: isHovered ? "rgba(59,255,160,0.05)" : (preferred ? "rgba(59,255,160,0.03)" : "var(--card)"),
    border: `1px solid ${isHovered ? "rgba(59,255,160,0.4)" : (preferred ? "rgba(59,255,160,0.25)" : "var(--border)")}`,
    borderRadius: 12,
    color: "var(--text)",
    transition: isHovered ? "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease" : "all 0.3s ease",
    transform: `translate(${magnet.x}px, ${magnet.y - (isHovered ? 6 : 0)}px)`,
    boxShadow: isHovered ? "0 20px 60px rgba(59,255,160,0.15)" : "none",
    minWidth: 0, // allows child text to shrink/wrap instead of overflowing the grid cell
  };

  const PreferredTag = preferred && (
    <span style={{
      position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
      fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: 1.5,
      textTransform: "uppercase", color: "#030712",
      background: "var(--accent)", padding: "3px 10px", borderRadius: 100,
    }}>
      Preferred
    </span>
  );

  const HeaderBlock = (
    <>
      <span style={{ color: "var(--accent)" }}><Icon /></span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "var(--muted)" }}>
        {label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, textAlign: "center", overflowWrap: "anywhere", maxWidth: "100%" }}>
        {value}
      </span>
    </>
  );

  // ── DUAL-ACTION VARIANT (currently just Email) ──
  // Two separate, explicit controls instead of one click silently doing
  // two things (copy + redirect at once) — the visitor picks what they want.
  if (dualAction) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setIsHovered(false); setMagnet({ x: 0, y: 0 }); }}
        style={cardStyle}
      >
        {PreferredTag}
        {HeaderBlock}

        <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 2 }}>
          <button
            onClick={copyToClipboard}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "8px 10px", borderRadius: 8,
              border: `1px solid ${copied ? "rgba(59,255,160,0.5)" : "var(--border)"}`,
              background: copied ? "rgba(59,255,160,0.08)" : "rgba(255,255,255,0.03)",
              color: copied ? "var(--accent)" : "var(--muted)",
              fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1,
              textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
          <a
            href={href}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "8px 10px", borderRadius: 8,
              border: "1px solid rgba(59,255,160,0.3)",
              background: "rgba(59,255,160,0.06)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1,
              textTransform: "uppercase", textDecoration: "none", cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,255,160,0.14)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,255,160,0.06)"; }}
          >
            ✉️ Open App
          </a>
        </div>

        {/* mailto: only works if the visitor's browser/OS has a default mail
            client registered — many test setups and some browsers don't.
            This Gmail web-compose link is a universal fallback that works
            regardless of local mail-app configuration. */}
        {gmailHref && (
          <a
            href={gmailHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 9.5,
              color: "var(--muted)", textDecoration: "none",
              marginTop: 2,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
          >
            No mail app set up? Open in Gmail →
          </a>
        )}
      </motion.div>
    );
  }

  // ── SINGLE-ACTION VARIANT (Phone, Resume) — unchanged behavior ──
  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setIsHovered(false); setMagnet({ x: 0, y: 0 }); }}
      style={{ ...cardStyle, cursor: "pointer", textDecoration: "none" }}
    >
      {PreferredTag}
      {HeaderBlock}
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: copied ? "var(--accent)" : "var(--accent2)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {copied ? "✓ Copied to clipboard" : action}
      </span>
    </motion.a>
  );
}

function SecondaryLink({ Icon, label, href }) {
  const [hovered, setHovered] = useState(false);
  // mailto:/tel: links shouldn't open a new tab — there's no page to load,
  // so target="_blank" just leaves a blank tab behind.
  const isExternalPage = /^https?:/i.test(href || "");

  return (
    <div style={{ position: "relative" }}>
      <a
        href={href}
        {...(isExternalPage ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 10,
          border: `1px solid ${hovered ? "rgba(59,255,160,0.4)" : "var(--border)"}`,
          background: hovered ? "rgba(59,255,160,0.05)" : "rgba(17,24,39,0.8)",
          color: hovered ? "var(--accent)" : "var(--muted)",
          textDecoration: "none",
          transition: "all 0.25s ease",
          transform: `translateY(${hovered ? -3 : 0}px)`,
        }}
      >
        <Icon />
      </a>
      {/* Tooltip label on hover */}
      <div
        style={{
          position: "absolute",
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "var(--accent)",
          whiteSpace: "nowrap",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Contact() {
  // 640px = phones only — tablet/desktop keep the existing 48px padding.
  //
  // Lazy-initialized from window.innerWidth so the first render already
  // uses the correct padding, avoiding a flash of the wide desktop
  // layout before it snaps to mobile.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 640
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: isMobile ? "60px 20px" : "100px 48px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionTitle label="Get In Touch" title="Contact" />
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--muted)", marginTop: -36, marginBottom: 6,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)", display: "inline-block",
            animation: "respPulse 2s infinite",
          }} />
          Usually responds within a few hours
        </p>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--muted)", marginTop: 0, marginBottom: 40,
          opacity: 0.75,
        }}>
          📍 Based in India · IST (UTC+5:30) · Open to remote roles
        </p>
      </div>

      <style>{`
        @keyframes respPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      {/* Primary — the 3 actions that matter most */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        {primaryCards.map((card, index) => (
          <PrimaryCard key={card.label} {...card} index={index} />
        ))}
      </div>

      {/* Secondary — quieter, compact profile links */}
      <div style={{ marginTop: 48 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 18,
          }}
        >
          Also find me on
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          {secondaryLinks.map((link) => (
            <SecondaryLink key={link.label} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
