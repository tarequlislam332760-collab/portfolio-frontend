import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// Social Icons component — real SVG logos
// ══════════════════════════════════════════
write(path.join(src, "components/SocialIcons.jsx"), `
import React from "react";

const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="#1877F2" width="18" height="18">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="25%" stopColor="#e6683c"/>
          <stop offset="50%" stopColor="#dc2743"/>
          <stop offset="75%" stopColor="#cc2366"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

export function SocialLink({ type, url, size = 40 }) {
  const [hovered, setHovered] = React.useState(false);
  const bgMap = {
    facebook:  hovered ? "rgba(24,119,242,0.2)"  : "rgba(24,119,242,0.08)",
    instagram: hovered ? "rgba(220,39,67,0.2)"   : "rgba(220,39,67,0.08)",
    github:    hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
  };
  const borderMap = {
    facebook:  hovered ? "rgba(24,119,242,0.5)"  : "rgba(24,119,242,0.2)",
    instagram: hovered ? "rgba(220,39,67,0.5)"   : "rgba(220,39,67,0.2)",
    github:    hovered ? "rgba(255,255,255,0.3)"  : "rgba(255,255,255,0.1)",
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: 12,
        background: bgMap[type],
        border: \`1px solid \${borderMap[type]}\`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none", flexShrink: 0,
        transform: hovered ? "translateY(-3px) scale(1.1)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 8px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.25s ease",
      }}>
      {ICONS[type]}
    </a>
  );
}

export default function SocialLinks({ size }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <SocialLink type="facebook"  url="https://www.facebook.com/share/1USufH1bxT/" size={size} />
      <SocialLink type="instagram" url="https://www.instagram.com/tareq23337/?hl=en"  size={size} />
      <SocialLink type="github"    url="https://github.com/tarequlislam332760-collab" size={size} />
    </div>
  );
}
`);

// ══════════════════════════════════════════
// Projects Page — real Vercel links
// ══════════════════════════════════════════
write(path.join(src, "pages/Projects.jsx"), `
import React, { useRef, useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";

const PROJECTS = [
  {
    id: 1,
    emoji: "🦷",
    title: "ST Dental Frontend",
    desc: "A modern dental clinic website built with MERN stack. Features appointment booking, service listings, and a professional medical UI. Live on Vercel.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    live: "https://st-dental-frontend.vercel.app/",
    github: "https://github.com/tarequlislam332760-collab",
    color: "#00D4AA",
    cat: "Full Stack",
    status: "Live",
  },
  {
    id: 2,
    emoji: "📈",
    title: "Vinance Dashboard",
    desc: "A crypto/finance portfolio tracker with real-time data, analytics dashboard, wallet management, and P&L tracking. Live on Vercel.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    live: "https://vinance-frontend-vjqa.vercel.app/",
    github: "https://github.com/tarequlislam332760-collab",
    color: "#38BDF8",
    cat: "Full Stack",
    status: "Live",
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function ProjectCard({ p, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: \`all 0.7s ease \${delay}s\`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "rgba(255,255,255,0.02)",
          border: hovered ? \`1px solid \${p.color}44\` : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24, overflow: "hidden",
          transform: hovered ? "translateY(-10px)" : "translateY(0)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.45)" : "none",
          transition: "all 0.35s ease",
        }}>

        {/* Card top — emoji banner */}
        <div style={{
          height: 160,
          background: \`linear-gradient(135deg,\${p.color}22,\${p.color}08)\`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 72, position: "relative",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {p.emoji}
          {/* Live badge */}
          <div style={{
            position: "absolute", top: 12, right: 14,
            background: "rgba(0,212,170,0.12)", border: "1px solid rgba(0,212,170,0.3)",
            borderRadius: 8, padding: "4px 12px",
            fontSize: "0.7rem", color: "#00D4AA", fontWeight: 700,
            fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 1.8s infinite" }} />
            ▲ LIVE ON VERCEL
          </div>
          {/* Category */}
          <div style={{
            position: "absolute", top: 12, left: 14,
            background: \`rgba(255,255,255,0.06)\`, border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "4px 12px",
            fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontWeight: 600,
            fontFamily: "var(--font-body)",
          }}>{p.cat}</div>
          {/* Number */}
          <div style={{ position: "absolute", bottom: 10, right: 16, fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "3.5rem", color: p.color, opacity: 0.08, lineHeight: 1 }}>0{p.id}</div>
        </div>

        <div style={{ padding: "clamp(18px,2.5vw,28px)" }}>
          <div style={{ width: 50, height: 4, background: \`linear-gradient(90deg,\${p.color},transparent)\`, borderRadius: 3, marginBottom: 14 }} />
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.1rem,2.5vw,1.35rem)", marginBottom: 10, color: "#fff" }}>{p.title}</h3>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: 18, fontFamily: "var(--font-body)" }}>{p.desc}</p>

          {/* Tech tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
            {p.tech.map(t => (
              <span key={t} style={{
                padding: "4px 12px",
                background: \`\${p.color}10\`, border: \`1px solid \${p.color}25\`,
                borderRadius: 99, color: p.color, fontSize: "0.74rem",
                fontWeight: 600, fontFamily: "var(--font-body)",
              }}>{t}</span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, padding: "11px 10px",
                background: \`linear-gradient(135deg,\${p.color},#38BDF8)\`,
                borderRadius: 10, color: "#050A14", fontWeight: 800,
                fontSize: "0.86rem", textAlign: "center", textDecoration: "none",
                fontFamily: "var(--font-body)", display: "block",
                transition: "transform 0.2s,box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = \`0 0 20px \${p.color}55\`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              🚀 Live Demo
            </a>
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, padding: "11px 10px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 10, color: "rgba(255,255,255,0.55)", fontWeight: 600,
                fontSize: "0.86rem", textAlign: "center", textDecoration: "none",
                fontFamily: "var(--font-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
              {/* GitHub icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="My Work" title="Live" highlight="Projects" sub="2 full-stack MERN projects deployed on Vercel" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} delay={i * 0.12} />)}
        </div>

        {/* Digital Marketing coming soon */}
        <div style={{
          background: "rgba(129,140,248,0.05)", border: "1px dashed rgba(129,140,248,0.25)",
          borderRadius: 20, padding: "clamp(24px,3vw,36px)",
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>📈</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "inline-block", background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.25)", borderRadius: 99, padding: "3px 12px", fontSize: "0.72rem", color: "#818CF8", fontWeight: 700, marginBottom: 8, fontFamily: "var(--font-body)" }}>
              🔜 Coming Soon
            </div>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>Digital Marketing Project</h3>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.88rem", lineHeight: 1.8, fontFamily: "var(--font-body)", margin: 0 }}>
              Digital Marketing project এখনো তৈরি হয়নি। শীঘ্রই আসছে — SEO, Facebook Ads, Google Ads campaign management সহ।
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.2)", borderRadius: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#818CF8", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#818CF8", fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>In Progress</span>
          </div>
        </div>
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// Footer — real SVG social icons
// ══════════════════════════════════════════
write(path.join(src, "components/Footer.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";
import SocialLinks from "./SocialIcons";

const NAV_LINKS  = ["Home","About","Skills","Projects","Services","Blog","Contact"];
const SERVICES   = ["MERN Development","React Frontend","Node.js Backend","REST API","Digital Marketing","SEO"];

export default function Footer() {
  const nav = useNavigate();
  return (
    <footer style={{ background: "#03070F", borderTop: "1px solid rgba(0,212,170,0.08)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,90vw)", height: 2, background: "linear-gradient(90deg,transparent,rgba(0,212,170,0.4),rgba(56,189,248,0.35),transparent)" }} />
      <div style={{ position: "absolute", top: "-180px", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(0,212,170,0.04),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,80px) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(24px,4vw,52px)", paddingBottom: "clamp(36px,4vw,52px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div onClick={() => nav("/")} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20, transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#050A14", fontFamily: "monospace", boxShadow: "0 0 24px rgba(0,212,170,0.3)", flexShrink: 0 }}>T</div>
              <span style={{ fontSize: "1.2rem", fontWeight: 900, background: "linear-gradient(90deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-head)" }}>Tarek.dev</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.86rem", lineHeight: 1.88, maxWidth: 270, marginBottom: 22, fontFamily: "var(--font-body)" }}>
              MERN Full Stack Developer & Digital Marketing Specialist. Building modern web apps deployed on Vercel.
            </p>

            {/* Real Social Icons */}
            <SocialLinks size={40} />

            {/* Contact */}
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 7 }}>
              <a href="mailto:tareq.islam.dev@gmail.com" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                <span>📧</span> tareq.islam.dev@gmail.com
              </a>
              <a href="tel:+8801732483149" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                <span>📱</span> +880 1732-483149
              </a>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 7 }}>
                <span>📍</span> Sylhet, Bangladesh
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Pages</h4>
            {NAV_LINKS.map((l, i) => (
              <div key={i} onClick={() => nav(l === "Home" ? "/" : "/" + l.toLowerCase())}
                style={{ color: "rgba(255,255,255,0.33)", fontSize: "0.87rem", marginBottom: 10, cursor: "pointer", fontFamily: "var(--font-body)", transition: "color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00D4AA"; e.currentTarget.style.transform = "translateX(5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.33)"; e.currentTarget.style.transform = "none"; }}>
                {l}
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Services</h4>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.33)", fontSize: "0.87rem", marginBottom: 10, fontFamily: "var(--font-body)" }}>{s}</div>
            ))}
          </div>

          {/* Hire Me */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Hire Me</h4>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.84rem", lineHeight: 1.85, marginBottom: 18, fontFamily: "var(--font-body)" }}>Available for freelance & full-time opportunities.</p>
            <div onClick={() => nav("/contact")}
              style={{ display: "inline-block", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 18px rgba(0,212,170,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              Get In Touch 🚀
            </div>

            {/* Projects preview */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["🦷","ST Dental","https://st-dental-frontend.vercel.app/"],
                ["📈","Vinance","https://vinance-frontend-vjqa.vercel.app/"],
              ].map(([e, t, u]) => (
                <a key={t} href={u} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                  <span>{e}</span> {t} <span style={{ color: "rgba(0,212,170,0.5)", fontSize: "0.65rem" }}>▲ vercel</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "clamp(16px,2.5vw,24px) 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} Tarikul Islam Tarek. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {["⚛️ React","🍃 MongoDB","⚡ Vite","▲ Vercel"].map((t, i) => (
              <span key={i} style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{\`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:580px){.footer-grid{grid-template-columns:1fr!important}}
      \`}</style>
    </footer>
  );
}
`);

// ══════════════════════════════════════════
// Home — update projects preview with real links
// ══════════════════════════════════════════
const homePath = path.join(src, "pages/Home.jsx");
let homeContent = fs.readFileSync(homePath, "utf8");

// Replace old project data with real ones
homeContent = homeContent.replace(
  /const PROJECTS_PREVIEW = \[[\s\S]*?\];/,
  `const PROJECTS_PREVIEW = [
  {title:"ST Dental Frontend",desc:"Modern dental clinic website with appointment booking and medical UI. Live on Vercel.",tags:["React","Node","MongoDB"],c:"#00D4AA",emoji:"🦷",live:"https://st-dental-frontend.vercel.app/"},
  {title:"Vinance Dashboard",desc:"Crypto/finance portfolio tracker with real-time analytics and wallet management. Live on Vercel.",tags:["React","Chart.js","MongoDB"],c:"#38BDF8",emoji:"📈",live:"https://vinance-frontend-vjqa.vercel.app/"},
];`
);

fs.writeFileSync(homePath, homeContent, "utf8");
console.log("✅ src/pages/Home.jsx (projects updated)");

// ══════════════════════════════════════════
// About — add real social icons
// ══════════════════════════════════════════
write(path.join(src, "pages/About.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import SocialLinks, { SocialLink } from "../components/SocialIcons";

export default function About() {
  const nav = useNavigate();
  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "clamp(30px,5vw,60px)", alignItems: "center" }} className="about-inner">

          {/* Image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "clamp(220px,26vw,290px)" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: 24, background: "linear-gradient(135deg,#00D4AA,#38BDF8,#818CF8)", padding: 3 }}>
                <div style={{ borderRadius: 22, background: "#050A14", width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", background: "linear-gradient(135deg,#0d1829,#0a1220)" }}>
                <img src="/profile.png" alt="Tarikul Islam Tarek"
                  onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;font-family:var(--font-head);font-weight:900;background:linear-gradient(135deg,#00D4AA,#818CF8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">T</div>'; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,10,20,0.7),transparent 50%)" }} />
                {/* Social icons on image */}
                <div style={{ position: "absolute", bottom: 16, left: 14, right: 14, display: "flex", gap: 8, justifyContent: "center" }}>
                  <SocialLink type="facebook"  url="https://www.facebook.com/share/1USufH1bxT/" size={36} />
                  <SocialLink type="instagram" url="https://www.instagram.com/tareq23337/?hl=en"  size={36} />
                  <SocialLink type="github"    url="https://github.com/tarequlislam332760-collab" size={36} />
                </div>
              </div>
              {/* Badge */}
              <div style={{ position: "absolute", bottom: -18, right: -18, background: "#0d1829", border: "2px solid #00D4AA", borderRadius: 14, padding: "12px 18px", textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", zIndex: 2 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.5rem", color: "#00D4AA" }}>2+</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Projects Live</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "0.4rem", color: "#fff" }}>Tarikul Islam Tarek</h3>
            <div style={{ color: "#00D4AA", fontWeight: 600, marginBottom: "1.3rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>MERN Full Stack Developer & Digital Marketer</div>

            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "1rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>
              আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>
              আমার ২টি MERN project বর্তমানে Vercel এ live আছে। সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।
            </p>

            {/* Info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2rem" }}>
              {[
                ["👤 Name","Tarikul Islam Tarek"],
                ["💼 Role","MERN Developer"],
                ["📍 Location","Sylhet, Bangladesh"],
                ["🌐 Work","Remote Worldwide"],
                ["📧 Email","tareq.islam.dev@gmail.com"],
                ["📱 Phone","+880 1732-483149"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,212,170,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div style={{ color: "#00D4AA", fontSize: "0.7rem", marginBottom: 3, fontWeight: 600, fontFamily: "var(--font-body)" }}>{k}</div>
                  <div style={{ fontSize: "0.83rem", fontWeight: 500, wordBreak: "break-all", color: "rgba(255,255,255,0.8)" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Action buttons + Social */}
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => nav("/contact")}
                style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 22px rgba(0,212,170,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Let's Talk 👋
              </button>
              <SocialLinks size={44} />
            </div>
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:3rem!important}}\`}</style>
    </main>
  );
}
`);

console.log(`
╔══════════════════════════════════════════════════════════╗
║         ✅ সব update সম্পূর্ণ হয়েছে!                   ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  ✅ Real Social Icons (SVG):                            ║
║     📘 Facebook — official blue logo                    ║
║     📸 Instagram — gradient pink/orange logo            ║
║     🐙 GitHub — official black/white logo               ║
║                                                          ║
║  ✅ Real Projects:                                      ║
║     🦷 ST Dental Frontend                               ║
║        → st-dental-frontend.vercel.app                  ║
║     📈 Vinance Dashboard                                ║
║        → vinance-frontend-vjqa.vercel.app               ║
║     📈 Digital Marketing → Coming Soon badge            ║
║                                                          ║
║  ✅ Icons দেখাবে:                                       ║
║     → Hero section                                       ║
║     → About page (ছবির নিচে + buttons এর পাশে)        ║
║     → Footer                                             ║
║     → Contact page                                       ║
╚══════════════════════════════════════════════════════════╝
`);
