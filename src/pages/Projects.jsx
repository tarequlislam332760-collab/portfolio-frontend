import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { projectsAPI } from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    projectsAPI.getAll()
      .then(res => setProjects(res.data || []))
      .catch(() => setError("Projects load করতে সমস্যা হয়েছে"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 50, height: 50, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>Loading projects...</p>
      </div>
    </main>
  );

  // Fallback static projects if DB is empty
  const displayProjects = projects.length > 0 ? projects : [
    { _id: "1", emoji: "🦷", title: "ST Dental Frontend", desc: "Modern dental clinic website with appointment booking. Live on Vercel.", tech: ["React","Node.js","MongoDB","Express"], live: "https://st-dental-frontend.vercel.app/", github: "https://github.com/tarequlislam332760-collab", color: "#00D4AA", status: "Live" },
    { _id: "2", emoji: "📈", title: "Vinance Dashboard", desc: "Crypto/finance portfolio tracker with real-time analytics. Live on Vercel.", tech: ["React","Chart.js","MongoDB"], live: "https://vinance-frontend-vjqa.vercel.app/", github: "https://github.com/tarequlislam332760-collab", color: "#38BDF8", status: "Live" },
  ];

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="My Work" title="Live" highlight="Projects" sub="Full-stack MERN projects deployed on Vercel" />

        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: "2rem", color: "#f87171", fontSize: "0.88rem", fontFamily: "var(--font-body)", textAlign: "center" }}>⚠️ {error} — showing demo projects</div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {displayProjects.map(p => (
            <div key={p._id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", transition: "transform .3s,box-shadow .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ height: 160, background: `linear-gradient(135deg,${p.color || "#00D4AA"}22,${p.color || "#00D4AA"}07)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
                {p.emoji || "🚀"}
                <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 8, padding: "4px 12px", fontSize: "0.7rem", color: "#00D4AA", fontWeight: 700, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 1.8s infinite" }} /> ▲ LIVE
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ width: 50, height: 4, background: p.color || "#00D4AA", borderRadius: 3, marginBottom: 14 }} />
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.15rem", marginBottom: "0.6rem", color: "#fff" }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.87rem", lineHeight: 1.8, marginBottom: "1.2rem", fontFamily: "var(--font-body)" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
                  {(p.tech || []).map(t => <span key={t} style={{ padding: "3px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 99, color: "rgba(255,255,255,0.45)", fontSize: "0.74rem", fontFamily: "var(--font-body)" }}>{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "11px", background: `linear-gradient(135deg,${p.color || "#00D4AA"},#38BDF8)`, borderRadius: 10, color: "#050A14", fontWeight: 800, fontSize: "0.86rem", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", display: "block" }}>🚀 Live Demo</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: "0.86rem", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", display: "block" }}>GitHub</a>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Marketing Coming Soon */}
        <div style={{ background: "rgba(129,140,248,0.05)", border: "1px dashed rgba(129,140,248,0.25)", borderRadius: 20, padding: "clamp(24px,3vw,36px)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>📈</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "inline-block", background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.25)", borderRadius: 99, padding: "3px 12px", fontSize: "0.72rem", color: "#818CF8", fontWeight: 700, marginBottom: 8, fontFamily: "var(--font-body)" }}>🔜 Coming Soon</div>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>Digital Marketing Project</h3>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.88rem", lineHeight: 1.8, fontFamily: "var(--font-body)", margin: 0 }}>Digital Marketing project শীঘ্রই আসছে — SEO, Facebook Ads, Google Ads campaign management সহ।</p>
          </div>
        </div>
      </div>
    </main>
  );
}
