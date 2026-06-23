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

            {/* Real SVG Social Icons (Facebook, Instagram, LinkedIn, GitHub) */}
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

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:580px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
