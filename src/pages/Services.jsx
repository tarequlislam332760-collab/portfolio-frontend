import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { servicesAPI } from "../services/api";

const FALLBACK = [
  { _id:"1", icon:"🌐", title:"MERN Full Stack Development", color:"#00D4AA", tag:"Most Popular",
    desc:"End-to-end web applications built with MongoDB, Express.js, React.js, and Node.js.",
    features:["Custom web app from scratch","RESTful API design","Authentication & authorization","MongoDB database design","Vercel deployment"] },
  { _id:"2", icon:"⚛️", title:"React Frontend Development", color:"#38BDF8", tag:"",
    desc:"Modern, fast, and responsive React applications with smooth animations and great UX.",
    features:["Component-based architecture","State management","Responsive mobile-first design","Performance optimization","API integration"] },
  { _id:"3", icon:"🔧", title:"Node.js Backend & REST API", color:"#818CF8", tag:"",
    desc:"Scalable and secure backend systems with Node.js and Express. JWT authentication and more.",
    features:["Express.js REST API","JWT authentication","Middleware & error handling","Database integration","API documentation"] },
  { _id:"4", icon:"📈", title:"Digital Marketing", color:"#f472b6", tag:"New",
    desc:"Comprehensive digital marketing strategy to grow your online presence.",
    features:["Social media strategy","Content marketing","Email campaigns","Analytics & reporting","Brand positioning"] },
  { _id:"5", icon:"🎯", title:"Facebook & Google Ads", color:"#fb923c", tag:"",
    desc:"Performance marketing campaigns that maximize your ROI.",
    features:["Facebook Ads setup","Google Ads campaigns","Audience targeting","A/B testing","ROI optimization"] },
  { _id:"6", icon:"🔍", title:"SEO Optimization", color:"#34d399", tag:"",
    desc:"Technical SEO and keyword strategy to rank higher on Google.",
    features:["Technical SEO audit","Keyword research","On-page optimization","Core Web Vitals","Google Search Console"] },
];

function ServiceCard({ s, index, onSelect, selected }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isSelected = selected === s._id;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}
      onClick={() => onSelect(isSelected ? null : s._id)}
      style={{
        background: isSelected ? s.color + "12" : "rgba(255,255,255,0.02)",
        border: "1px solid " + (isSelected ? s.color + "55" : "rgba(255,255,255,0.07)"),
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        transition: "all 0.4s ease",
        transform: visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: (index % 3) * 0.1 + "s",
        boxShadow: isSelected ? "0 20px 50px " + s.color + "22" : "none",
        position: "relative",
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = s.color + "44";
          e.currentTarget.style.boxShadow = "0 16px 40px " + s.color + "18";
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}>

      <div style={{ height: 3, background: "linear-gradient(90deg," + s.color + ",transparent)" }} />

      <div style={{ padding: "clamp(20px,3vw,28px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{
            width: "clamp(52px,8vw,64px)", height: "clamp(52px,8vw,64px)",
            borderRadius: 16, background: s.color + "18",
            border: "1px solid " + s.color + "33",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(1.6rem,3.5vw,2rem)", flexShrink: 0,
          }}>{s.icon}</div>
          {s.tag && (
            <span style={{
              background: s.color + "18", border: "1px solid " + s.color + "44",
              color: s.color, borderRadius: 99, padding: "4px 12px",
              fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}>{s.tag}</span>
          )}
        </div>

        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(1rem,2.2vw,1.15rem)", color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "clamp(0.82rem,1.6vw,0.88rem)", lineHeight: 1.8, fontFamily: "var(--font-body)", marginBottom: 16 }}>{s.desc}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 6, color: s.color, fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
          <span>Click to see features</span>
          <span style={{ transform: isSelected ? "rotate(180deg)" : "none", transition: "transform 0.3s", display: "inline-block" }}>↓</span>
        </div>

        <div style={{
          maxHeight: isSelected ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s ease",
        }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 16, paddingTop: 16 }}>
            {(s.features || []).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, opacity: isSelected ? 1 : 0, transform: isSelected ? "none" : "translateX(-10px)", transition: "all 0.3s ease " + (i * 0.06 + 0.1) + "s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.color + "22", border: "1px solid " + s.color + "44", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: s.color, fontSize: "0.65rem" }}>✓</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.8rem,1.5vw,0.86rem)", fontFamily: "var(--font-body)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const nav = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => setServices(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const display = services.length > 0 ? services : FALLBACK;

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="Services | Tarikul Islam Tarek — MERN & Marketing" description="Professional MERN development, digital marketing, SEO, and Facebook/Google Ads services by Tarikul Islam Tarek." />

      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="What I Offer" title="My" highlight="Services" sub="Click on any service to see what's included" />

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(260px,30vw,340px),1fr))", gap: "clamp(14px,2.5vw,22px)", marginBottom: "clamp(48px,7vw,80px)" }}>
            {display.map((s, i) => (
              <ServiceCard key={s._id} s={s} index={i} onSelect={setSelected} selected={selected} />
            ))}
          </div>
        )}

        <div style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.14)", borderRadius: 24, padding: "clamp(28px,5vw,52px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(0,212,170,0.06),transparent 70%)", pointerEvents: "none" }} />
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,3.5vw,1.9rem)", color: "#fff", marginBottom: 12, position: "relative" }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.88rem,1.8vw,1rem)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.8, fontFamily: "var(--font-body)", position: "relative" }}>
            Let's discuss your requirements and build something amazing together.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <button onClick={() => nav("/contact")}
              style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 12, padding: "13px 32px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,170,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              Get In Touch 🚀
            </button>
            <button onClick={() => nav("/projects")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "13px 32px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#38BDF8"; e.currentTarget.style.color = "#38BDF8"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              View Projects
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
