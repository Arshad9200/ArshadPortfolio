// ============================================================
// src/components/AskAI.jsx — "ASK ABOUT ME" ASSISTANT
// ============================================================
// Deliberately backend-free: this is NOT calling a hosted LLM.
// It's a local keyword-matching engine over portfolioData.js —
// instant, free, works on any static host (Vercel/Netlify/GitHub
// Pages) with zero config and no exposed API key.
//
// Positioned as an "instant answers" tool in the UI copy rather
// than claiming to be GPT-powered — that's the honest framing.
// If you later want a *real* generative model, the natural next
// step is a serverless function (Vercel/Netlify) that proxies a
// call to the Anthropic/OpenAI API so the key never reaches the
// browser — swap `getAnswer()` below for a fetch() to that
// function and the rest of this UI stays the same.

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  personalInfo, skills, experience, currentRole,
  projects, education, socialLinks,
} from "../data/portfolioData";

// ── INTENT RULES ──
// Each rule: keywords to match against the visitor's message, a responder
// that builds the answer live from portfolioData, and a set of follow-up
// suggestion chips shown after this answer (so the conversation has a
// next step instead of dead-ending).
const rules = [
  {
    id: "skills",
    keywords: ["skill", "skills", "tech stack", "technologies", "familiar with", "expert in", "proficient"],
    respond: () => {
      const names = skills.map((s) => s.name).join(", ");
      return `Arshad works across: ${names}. Strongest areas are Python/Sanic backend development and REST API design — ask me about a specific one (e.g. "how good is his Python?") for proficiency detail.`;
    },
    followups: ["How good is his Python?", "What about React?", "Tell me about his experience"],
  },
  {
    id: "experience",
    keywords: ["experience", "work history", "job", "role", "company", "career", "background", "worked at"],
    respond: () => {
      const past = experience[0];
      return `Currently: ${currentRole.title} (${currentRole.program}) at ${currentRole.company}. Previously: ${past.title} at ${past.company.split(" · ")[0]} (${past.date}), building REST APIs and backend workflows in Python/Sanic. Full details are in the Experience section.`;
    },
    followups: ["What projects has he built?", "What are his skills?", "How can I contact him?"],
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "portfolio site", "app he made", "worked on"],
    respond: () => {
      const list = projects.map((p) => `"${p.title}" (${p.stack})`).join(" · ");
      return `A couple of live ones: ${list}. Both are production systems with real users — see the Projects section for details and links.`;
    },
    followups: ["What are his skills?", "Tell me about his experience", "How do I contact him?"],
  },
  {
    id: "education",
    keywords: ["education", "college", "degree", "university", "cgpa", "marks", "score", "gpa", "btech", "academic"],
    respond: () =>
      `${education.degree} from ${education.university} (${education.years}), scoring ${education.score}.`,
    followups: ["What are his skills?", "Tell me about his experience"],
  },
  {
    id: "contact",
    keywords: ["contact", "email him", "phone number", "reach him", "call him", "hire him", "available for", "get in touch"],
    respond: () =>
      `Best ways to reach Arshad: email at ${personalInfo.email}, or phone at ${personalInfo.phone}. There's also a direct Contact section below with one-tap call/email/resume options.`,
    followups: ["What are his skills?", "Show me his projects", "Is he open to remote roles?"],
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download resume"],
    respond: () =>
      `You can download the full resume from the Hero section at the top, or the Contact section — both have a "Download Resume" option.`,
    followups: ["What are his skills?", "Tell me about his experience"],
  },
  {
    id: "github",
    keywords: ["github", "open source", "repo", "repository"],
    respond: () =>
      `Arshad's GitHub (${socialLinks.github}) has personal projects and open-source work. Professional/company projects aren't public — those are covered in the Projects section instead.`,
    followups: ["Show me his professional projects", "What are his skills?"],
  },
  {
    id: "linkedin",
    keywords: ["linkedin"],
    respond: () => `Here's the LinkedIn: ${socialLinks.linkedin}`,
    followups: ["How do I contact him?", "Tell me about his experience"],
  },
  {
    id: "ai",
    keywords: ["machine learning", "artificial intelligence", "genai", "langchain", "llm", "prompt engineering", "ai agent"],
    respond: () =>
      `Arshad is actively upskilling in AI/ML — LangChain, LLMs, prompt engineering, and AI agent workflows — while working full-time as a backend engineer. This chat widget is actually a small example of that: a fully client-side assistant with no backend or API key.`,
    followups: ["What are his core skills?", "Tell me about his experience"],
  },
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "yo", "sup"],
    respond: () => `Hey! Ask me about Arshad's skills, experience, projects, or how to get in touch.`,
    followups: ["What are his skills?", "Tell me about his experience", "Show me his projects"],
  },
  {
    id: "remote",
    keywords: ["remote", "relocate", "location", "based in", "timezone"],
    respond: () => `Arshad is based in India (IST, UTC+5:30) and open to remote roles.`,
    followups: ["How do I contact him?", "Tell me about his experience"],
  },
];

const DEFAULT_SUGGESTIONS = ["What are his skills?", "Recent projects?", "How do I contact him?"];

// Word-boundary match — "know" no longer falsely matches inside unrelated
// sentences the way a plain .includes() substring check would.
function hasKeyword(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

// Build a flat lookup of every skill name + tag → parent skill, sorted
// longest-first so "PostgreSQL" is checked before a shorter overlapping
// term. This lets "how much python does he know" answer about Python
// specifically instead of falling through to the generic skills list.
const SKILL_LOOKUP = skills
  .flatMap((s) => [s.name, ...s.tags].map((term) => ({ term, skill: s })))
  .sort((a, b) => b.term.length - a.term.length);

const LEVEL_WORDS = ["", "Basic", "Familiar", "Comfortable", "Strong", "Expert"];

function matchSpecificSkill(text) {
  for (const { term, skill } of SKILL_LOOKUP) {
    if (hasKeyword(text, term)) return { term, skill };
  }
  return null;
}

function getAnswer(message) {
  const text = message.toLowerCase();

  // 1. Check for a specific named skill/tech first — most precise answer.
  const specific = matchSpecificSkill(text);
  if (specific) {
    const { term, skill } = specific;
    const levelWord = LEVEL_WORDS[skill.level] || "";
    const answer = `${term} falls under "${skill.name}" (${skill.category}) — proficiency ${skill.level}/5${levelWord ? ` (${levelWord})` : ""}. Related: ${skill.tags.join(", ")}.`;
    const others = skills.filter((s) => s.name !== skill.name).slice(0, 2).map((s) => `What about ${s.name}?`);
    return { answer, suggestions: [...others, "Tell me about his experience"] };
  }

  // 2. Fall back to general intent rules, scored by number of matched
  //    keyword phrases (word-boundary, not loose substring).
  let best = null;
  let bestScore = 0;
  for (const rule of rules) {
    const score = rule.keywords.reduce((acc, kw) => (hasKeyword(text, kw) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = rule;
    }
  }

  if (best) return { answer: best.respond(), suggestions: best.followups };
  return {
    answer: `I couldn't quite match that — try asking about Arshad's skills, experience, projects, education, or how to contact him.`,
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

// ── CHAT ICON ──
const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/>
  </svg>
);

function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: `Hi, I'm an instant local assistant for ${personalInfo.name}'s portfolio. Ask me anything about his skills, experience, or projects — no server round-trip, answers come straight from the site data.` },
  ]);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const { answer, suggestions: next } = getAnswer(trimmed);
    setMessages((m) => [...m, { from: "user", text: trimmed }, { from: "bot", text: answer }]);
    setSuggestions(next && next.length ? next : DEFAULT_SUGGESTIONS);
    setInput("");
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        aria-label={open ? "Close chat" : "Ask about Arshad"}
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 18 }}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 150,
          width: 56, height: 56, borderRadius: "50%",
          border: "1px solid rgba(59,255,160,0.4)",
          background: "linear-gradient(135deg, rgba(59,255,160,0.15), rgba(0,207,255,0.1))",
          backdropFilter: "blur(10px)",
          color: "var(--accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(59,255,160,0.25)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", bottom: 96, right: 28, zIndex: 149,
              width: "min(360px, calc(100vw - 40px))",
              height: "min(480px, calc(100vh - 160px))",
              display: "flex", flexDirection: "column",
              borderRadius: 16, overflow: "hidden",
              border: "1px solid var(--border)",
              background: "rgba(10,14,22,0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border)",
              background: "rgba(59,255,160,0.04)",
            }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                Ask about {personalInfo.name.split(" ")[0]}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1, color: "var(--muted)", margin: "3px 0 0" }}>
                <span style={{ color: "var(--accent)" }}>●</span> Instant local answers — no server required
              </p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "9px 13px",
                  borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.from === "user" ? "rgba(59,255,160,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${m.from === "user" ? "rgba(59,255,160,0.25)" : "var(--border)"}`,
                  fontSize: 12.5, lineHeight: 1.6, color: "var(--text)",
                }}>
                  {m.text}
                </div>
              ))}
            </div>

            {/* Suggestion chips — refresh after every answer to keep the conversation going */}
            {suggestions.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "0 16px 12px" }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      padding: "6px 10px", borderRadius: 100,
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--muted)", cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--border)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                style={{
                  flex: 1, background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)", borderRadius: 8,
                  padding: "9px 12px", color: "var(--text)", fontSize: 12.5,
                  fontFamily: "var(--font-body)", outline: "none",
                }}
              />
              <button
                type="submit"
                aria-label="Send"
                style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  border: "1px solid rgba(59,255,160,0.4)",
                  background: "rgba(59,255,160,0.1)", color: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AskAI;
