import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Skills",   to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Blog",     to: "/blog" },
  { label: "Contact",  to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const lk = (active) => ({
    fontFamily: "var(--font-body)", fontWeight: active ? 700 : 400, fontSize: "0.87rem",
    color: active ? "#00D4AA" : "rgba(255,255,255,0.5)",
    position: "relative", padding: "8px 13px", background: "none", border: "none",
    cursor: "pointer", transition: "color 0.2s", letterSpacing: "0.2px",
    textTransform: "capitalize", textDecoration: "none", display: "inline-block",
  });

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px,4vw,60px)",
        background: scrolled ? "rgba(5,10,20,0.97)" : "rgba(5,10,20,0.5)",
        backdropFilter: "blur(28px)",
        borderBottom: scrolled ? "1px solid rgba(0,212,170,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.4s ease",
        transform: visible ? "translateY(0)" : "translateY(-80px)",
        opacity: visible ? 1 : 0,
      }}>
        {/* Logo */}
        <div onClick={() => nav("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#050A14", fontFamily: "monospace", boxShadow: "0 0 20px rgba(0,212,170,0.35)", flexShrink: 0 }}>T</div>
          <span style={{ fontSize: "1.05rem", fontWeight: 800, background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-head)", animation: "gradShift 5s ease infinite", whiteSpace: "nowrap" }}>
            Tarek.dev
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="desk-nav">
          {NAV.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              style={({ isActive }) => ({
                ...lk(isActive),
                borderBottom: isActive ? "2px solid #00D4AA" : "2px solid transparent",
                paddingBottom: 6,
              })}
              onMouseEnter={e => { if (e.currentTarget.style.color !== "rgb(0, 212, 170)") e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={e => { if (e.currentTarget.style.color !== "rgb(0, 212, 170)") e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >{l.label}</NavLink>
          ))}
        </div>

        {/* Right — Hire Me CTA (replaces Admin button) */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <button onClick={() => nav("/contact")} className="desk-btn"
            style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "9px 22px", cursor: "pointer", fontWeight: 800, fontSize: "0.82rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >Hire Me</button>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="burger"
            style={{ display: "none", width: 38, height: 38, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, cursor: "pointer", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, flexShrink: 0 }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
        background: "rgba(5,10,20,0.99)", backdropFilter: "blur(28px)",
        maxHeight: open ? "560px" : "0", overflow: "hidden",
        transition: "max-height 0.4s ease",
        borderBottom: open ? "1px solid rgba(0,212,170,0.1)" : "none",
      }}>
        <div style={{ padding: "0.8rem 0 1.2rem" }}>
          {NAV.map((l, i) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: 12,
                padding: "13px clamp(20px,5vw,52px)",
                background: isActive ? "rgba(0,212,170,0.07)" : "transparent",
                borderLeft: isActive ? "3px solid #00D4AA" : "3px solid transparent",
                color: isActive ? "#00D4AA" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)", fontWeight: isActive ? 700 : 400,
                fontSize: "0.95rem", textTransform: "capitalize", textDecoration: "none",
                transition: "all 0.2s", borderBottom: "1px solid rgba(255,255,255,0.03)",
                animationDelay: i * 0.04 + "s",
              })}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
              {l.label}
            </NavLink>
          ))}
          <div style={{ padding: "0.8rem clamp(20px,5vw,52px) 0" }}>
            <button onClick={() => { nav("/contact"); setOpen(false); }} style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.95rem", fontFamily: "var(--font-body)" }}>
              Hire Me 🚀
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .desk-nav{display:flex!important}
        .desk-btn{display:block!important}
        .burger{display:none!important}
        @media(max-width:900px){
          .desk-nav{display:none!important}
          .desk-btn{display:none!important}
          .burger{display:flex!important}
        }
        nav a:hover{color:rgba(255,255,255,0.9)!important}
      `}</style>
    </>
  );
}
