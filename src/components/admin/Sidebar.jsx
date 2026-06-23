import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { icon: "📊", label: "Dashboard",    path: "/admin" },
  { icon: "🚀", label: "Projects",     path: "/admin/projects" },
  { icon: "⚡", label: "Skills",       path: "/admin/skills" },
  { icon: "✍️", label: "Blog",         path: "/admin/blog" },
  { icon: "⭐", label: "Reviews",      path: "/admin/testimonials" },
  { icon: "✉️", label: "Messages",     path: "/admin/messages" },
  { icon: "🙋", label: "About Page",   path: "/admin/about" },
  { icon: "👤", label: "Profile",      path: "/admin/profile" },
];

export default function Sidebar({ collapsed, setCollapsed, onLogout }) {
  const nav = useNavigate();
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [loc.pathname]);

  const isActive = (path) => path === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(path);

  if (isMobile) {
    return (
      <>
        {/* Mobile top bar */}
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 90, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "#030710", borderBottom: "1px solid rgba(0,212,170,0.08)" }}>
          <button onClick={() => setMobileOpen(true)}
            style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 8, color: "#00D4AA", width: 38, height: 38, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            {LINKS.find(l => isActive(l.path))?.label || "Dashboard"}
          </span>
          <div style={{ width: 38 }} />
        </div>
        <div style={{ height: 52, flexShrink: 0, width: 0 }} />

        {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 199 }} />}

        <aside style={{ position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 200, width: "min(78vw,280px)", background: "#030710", borderRight: "1px solid rgba(0,212,170,0.08)", transform: mobileOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease", display: "flex", flexDirection: "column", paddingTop: 16 }}>
          <div style={{ padding: "0.4rem 1.2rem 1.2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1.05rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite" }}>Tarek.dev</div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Admin Panel</div>
            </div>
            <button onClick={() => setMobileOpen(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
          </div>

          <nav style={{ flex: 1, padding: "1rem 0.8rem", overflowY: "auto" }}>
            {LINKS.map(ln => (
              <div key={ln.path} onClick={() => nav(ln.path)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 12, cursor: "pointer", marginBottom: 4, background: isActive(ln.path) ? "rgba(0,212,170,0.1)" : "transparent", borderLeft: isActive(ln.path) ? "3px solid #00D4AA" : "3px solid transparent", color: isActive(ln.path) ? "#00D4AA" : "rgba(255,255,255,0.5)", fontSize: "0.92rem", fontWeight: isActive(ln.path) ? 600 : 400, fontFamily: "var(--font-body)" }}>
                <span style={{ fontSize: "1.15rem" }}>{ln.icon}</span>
                <span style={{ flex: 1 }}>{ln.label}</span>
                {isActive(ln.path) && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
              </div>
            ))}
          </nav>

          <div style={{ padding: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div onClick={() => nav("/")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.85rem" }}>
              <span>🌐</span><span>View Site</span>
            </div>
            <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.85rem" }}>
              <span>🔒</span><span>Logout</span>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop
  return (
    <aside style={{ width: collapsed ? 64 : 230, minHeight: "calc(100vh - 68px)", background: "#030710", borderRight: "1px solid rgba(0,212,170,0.08)", display: "flex", flexDirection: "column", position: "sticky", top: 68, transition: "width 0.3s ease", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ padding: "1.2rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: collapsed ? "center" : "space-between", alignItems: "center" }}>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite", whiteSpace: "nowrap" }}>Tarek.dev</div>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Admin Panel</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 7, color: "#00D4AA", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0, transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,170,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,212,170,0.08)"}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav style={{ flex: 1, padding: "1rem 0.6rem", overflowY: "auto" }}>
        {LINKS.map(ln => (
          <div key={ln.path} onClick={() => nav(ln.path)}
            style={{ display: "flex", alignItems: "center", gap: 11, padding: collapsed ? "12px" : "12px 14px", borderRadius: 12, cursor: "pointer", marginBottom: 3, background: isActive(ln.path) ? "rgba(0,212,170,0.1)" : "transparent", borderLeft: isActive(ln.path) ? "3px solid #00D4AA" : "3px solid transparent", color: isActive(ln.path) ? "#00D4AA" : "rgba(255,255,255,0.38)", fontSize: "0.88rem", fontWeight: isActive(ln.path) ? 600 : 400, fontFamily: "var(--font-body)", whiteSpace: "nowrap", transition: "all 0.2s", justifyContent: collapsed ? "center" : "flex-start" }}
            onMouseEnter={e => { if (!isActive(ln.path)) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
            onMouseLeave={e => { if (!isActive(ln.path)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; } }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{ln.icon}</span>
            {!collapsed && <span style={{ flex: 1 }}>{ln.label}</span>}
            {!collapsed && isActive(ln.path) && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
          </div>
        ))}
      </nav>

      <div style={{ padding: "0.8rem 0.6rem 1.2rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 6 }}>
        <div onClick={() => nav("/")} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(56,189,248,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(56,189,248,0.06)"}>
          <span style={{ flexShrink: 0 }}>🌐</span>
          {!collapsed && <span>View Site</span>}
        </div>
        <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}>
          <span style={{ flexShrink: 0 }}>🔒</span>
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}
