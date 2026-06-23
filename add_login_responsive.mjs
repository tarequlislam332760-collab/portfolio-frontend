import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");
const ADMIN_PASSWORD = "tareq@#49";

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. AdminLogin page
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminLogin.jsx"), `
import React, { useState } from "react";

const ADMIN_PASSWORD = "${ADMIN_PASSWORD}";

export default function AdminLogin({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <main style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#050A14", padding: "20px", position: "relative", overflow: "hidden",
    }}>
      {/* Animated blobs */}
      <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "clamp(280px,50vw,500px)", height: "clamp(280px,50vw,500px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,0.12),transparent 70%)", filter: "blur(60px)", animation: "blobPulse 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: "clamp(280px,55vw,550px)", height: "clamp(280px,55vw,550px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.1),transparent 70%)", filter: "blur(70px)", animation: "blobPulse2 10s ease-in-out infinite 2s", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,170,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px", maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black,transparent)", pointerEvents: "none" }} />

      <form onSubmit={submit} style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 420,
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24, padding: "clamp(28px,5vw,44px)",
        backdropFilter: "blur(20px)",
        animation: shake ? "shakeX 0.5s ease" : "fadeUp 0.6s ease both",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px",
            background: "linear-gradient(135deg,#00D4AA,#38BDF8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 900, color: "#050A14", fontFamily: "monospace",
            boxShadow: "0 0 30px rgba(0,212,170,0.4)",
            animation: "floatY 4s ease-in-out infinite",
          }}>🔒</div>
          <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.4rem,4vw,1.8rem)", color: "#fff", marginBottom: 6, letterSpacing: "-0.5px" }}>
            Admin <span style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Login</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>Enter password to access dashboard</p>
        </div>

        {/* Password field */}
        <div style={{ position: "relative", marginBottom: error ? 8 : 24 }}>
          <input
            type={show ? "text" : "password"}
            value={pwd}
            onChange={e => { setPwd(e.target.value); setError(false); }}
            placeholder="Enter admin password"
            autoFocus
            style={{
              width: "100%", padding: "14px 50px 14px 18px",
              background: "rgba(255,255,255,0.04)",
              border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.09)",
              borderRadius: 12, color: "#fff", fontSize: "0.95rem",
              fontFamily: "var(--font-body)", outline: "none",
              boxSizing: "border-box", transition: "border-color 0.2s",
            }}
            onFocus={e => { if (!error) e.target.style.borderColor = "#00D4AA"; }}
            onBlur={e => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
          />
          <button type="button" onClick={() => setShow(!show)}
            style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", padding: 0,
            }}>
            {show ? "🙈" : "👁️"}
          </button>
        </div>

        {error && (
          <p style={{ color: "#f87171", fontSize: "0.82rem", marginBottom: 18, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6, animation: "fadeUp 0.3s ease" }}>
            ⚠️ Incorrect password. Please try again.
          </p>
        )}

        {/* Submit */}
        <button type="submit"
          style={{
            width: "100%", padding: 15,
            background: "linear-gradient(135deg,#00D4AA,#38BDF8)",
            border: "none", borderRadius: 12, color: "#050A14",
            fontWeight: 800, fontSize: "0.95rem", cursor: "pointer",
            fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,170,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
          Unlock Dashboard 🚀
        </button>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: 22 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
            ← Back to Website
          </a>
        </div>
      </form>

      <style>{\`
        @keyframes shakeX {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-10px); }
          40%,80% { transform: translateX(10px); }
        }
      \`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 2. Admin.jsx — wrap with login guard
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/Admin.jsx"), `
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminMessages from "./AdminMessages";
import AdminProfile from "./AdminProfile";

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "true");
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", paddingTop: 68, background: "var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onLogout={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }} />
      <div style={{ flex: 1, padding: "clamp(14px,3vw,32px)", overflow: "auto", minWidth: 0, width: "100%" }}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 3. Sidebar — responsive (mobile drawer) + logout
// ══════════════════════════════════════════
write(path.join(src, "components/admin/Sidebar.jsx"), `
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { icon: "📊", label: "Dashboard",  path: "/admin" },
  { icon: "🚀", label: "Projects",   path: "/admin/projects" },
  { icon: "⚡", label: "Skills",     path: "/admin/skills" },
  { icon: "✉️", label: "Messages",   path: "/admin/messages" },
  { icon: "👤", label: "Profile",    path: "/admin/profile" },
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

  const go = (p) => { nav(p); setMobileOpen(false); };

  // ── Mobile: top bar + slide-in drawer ──
  if (isMobile) {
    return (
      <>
        {/* Mobile top bar */}
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 90,
          height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", background: "#030710", borderBottom: "1px solid rgba(0,212,170,0.08)",
        }}>
          <button onClick={() => setMobileOpen(true)}
            style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 8, color: "#00D4AA", width: 38, height: 38, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ☰
          </button>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            {LINKS.find(l => l.path === loc.pathname || (l.path !== "/admin" && loc.pathname.startsWith(l.path)))?.label || "Dashboard"}
          </span>
          <div style={{ width: 38 }} />
        </div>

        {/* Spacer so content doesn't hide under top bar */}
        <div style={{ height: 52, flexShrink: 0, width: 0 }} />

        {/* Overlay */}
        {mobileOpen && (
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 199, animation: "fadeUp 0.2s ease" }} />
        )}

        {/* Drawer */}
        <aside style={{
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 200,
          width: "min(78vw,280px)", background: "#030710",
          borderRight: "1px solid rgba(0,212,170,0.08)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          display: "flex", flexDirection: "column",
          paddingTop: 16,
        }}>
          <div style={{ padding: "0.4rem 1.2rem 1.2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1.05rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite" }}>Tarek.dev</div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Admin Panel</div>
            </div>
            <button onClick={() => setMobileOpen(false)}
              style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
          </div>

          <nav style={{ flex: 1, padding: "1rem 0.8rem", overflowY: "auto" }}>
            {LINKS.map(ln => {
              const active = ln.path === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(ln.path);
              return (
                <div key={ln.path} onClick={() => go(ln.path)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
                    borderRadius: 12, cursor: "pointer", marginBottom: 4,
                    background: active ? "rgba(0,212,170,0.1)" : "transparent",
                    borderLeft: active ? "3px solid #00D4AA" : "3px solid transparent",
                    color: active ? "#00D4AA" : "rgba(255,255,255,0.5)",
                    fontSize: "0.92rem", fontWeight: active ? 600 : 400,
                    fontFamily: "var(--font-body)",
                  }}>
                  <span style={{ fontSize: "1.15rem" }}>{ln.icon}</span>
                  <span style={{ flex: 1 }}>{ln.label}</span>
                  {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
                </div>
              );
            })}
          </nav>

          <div style={{ padding: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div onClick={() => go("/")}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.85rem" }}>
              <span>🌐</span><span>View Site</span>
            </div>
            <div onClick={onLogout}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.85rem" }}>
              <span>🔒</span><span>Logout</span>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // ── Desktop sidebar ──
  return (
    <aside style={{
      width: collapsed ? 64 : 230, minHeight: "calc(100vh - 68px)",
      background: "#030710", borderRight: "1px solid rgba(0,212,170,0.08)",
      display: "flex", flexDirection: "column",
      position: "sticky", top: 68,
      transition: "width 0.3s ease", overflow: "hidden", flexShrink: 0,
      animation: "slideInLeft 0.5s ease both",
    }}>
      <div style={{ padding: "1.2rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: collapsed ? "center" : "space-between", alignItems: "center" }}>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite", whiteSpace: "nowrap" }}>
              Tarek.dev
            </div>
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

      <nav style={{ flex: 1, padding: "1rem 0.6rem" }}>
        {LINKS.map(ln => {
          const active = ln.path === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(ln.path);
          return (
            <div key={ln.path} onClick={() => nav(ln.path)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: collapsed ? "12px" : "12px 14px",
                borderRadius: 12, cursor: "pointer", marginBottom: 3,
                background: active ? "rgba(0,212,170,0.1)" : "transparent",
                borderLeft: active ? "3px solid #00D4AA" : "3px solid transparent",
                color: active ? "#00D4AA" : "rgba(255,255,255,0.38)",
                fontSize: "0.88rem", fontWeight: active ? 600 : 400,
                fontFamily: "var(--font-body)", whiteSpace: "nowrap",
                transition: "all 0.2s", justifyContent: collapsed ? "center" : "flex-start",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; } }}>
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{ln.icon}</span>
              {!collapsed && <span style={{ flex: 1 }}>{ln.label}</span>}
              {!collapsed && active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: "0.8rem 0.6rem 1.2rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 6 }}>
        <div onClick={() => nav("/")}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(56,189,248,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(56,189,248,0.06)"}>
          <span style={{ flexShrink: 0 }}>🌐</span>
          {!collapsed && <span>View Site</span>}
        </div>
        <div onClick={onLogout}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}>
          <span style={{ flexShrink: 0 }}>🔒</span>
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}
`);

// ══════════════════════════════════════════
// 4. AnalyticsCard — responsive
// ══════════════════════════════════════════
write(path.join(src, "components/admin/AnalyticsCard.jsx"), `
import React, { useState } from "react";

export default function AnalyticsCard({ title, value, change, icon, color }) {
  const [hovered, setHovered] = useState(false);
  const positive = change >= 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: hovered ? \`1px solid \${color}33\` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 18, padding: "clamp(14px,2.5vw,1.6rem)",
        position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s ease",
        cursor: "default", minWidth: 0,
        animation: "fadeUp 0.5s ease both",
      }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: \`radial-gradient(circle,\${color}18,transparent 70%)\`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: \`linear-gradient(90deg,\${color},transparent)\`, opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "clamp(10px,2vw,16px)", flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontSize: "clamp(1.4rem,4vw,1.8rem)" }}>{icon}</div>
        <span style={{
          background: positive ? "rgba(0,212,170,0.12)" : "rgba(239,68,68,0.12)",
          color: positive ? "#00D4AA" : "#f87171",
          padding: "3px 9px", borderRadius: 99, fontSize: "clamp(0.65rem,1.5vw,0.75rem)", fontWeight: 700,
          fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 3,
          animation: "pulse 3s ease-in-out infinite", whiteSpace: "nowrap",
        }}>
          {positive ? "↑" : "↓"} {Math.abs(change)}%
        </span>
      </div>

      <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.4rem,4.5vw,2rem)", color: "#fff", marginBottom: 4, letterSpacing: "-0.5px", wordBreak: "break-word" }}>{value}</div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(0.74rem,1.8vw,0.85rem)", fontFamily: "var(--font-body)" }}>{title}</div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 5. ProjectForm — responsive modal
// ══════════════════════════════════════════
write(path.join(src, "components/admin/ProjectForm.jsx"), `
import React, { useState } from "react";

const EMOJIS = ["🚀","📈","🛍️","📊","✍️","🎯","📚","🌐","⚙️","🎨","💡","🔥","⚛️","🍃","🛒","📱"];
const S = {
  width: "100%", padding: "13px 16px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#fff", fontSize: "0.9rem", outline: "none",
  marginBottom: 12, boxSizing: "border-box", fontFamily: "var(--font-body)",
  transition: "border-color 0.2s",
};

export default function ProjectForm({ onClose, onSave }) {
  const [f, setF] = useState({ title: "", desc: "", tech: "", live: "", github: "", emoji: "🚀" });
  const inp = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
      <div style={{
        background: "linear-gradient(135deg,#0d1629,#080f1c)",
        border: "1px solid rgba(0,212,170,0.14)", borderRadius: "clamp(16px,3vw,24px)",
        padding: "clamp(18px,4vw,40px)", width: "100%", maxWidth: 540,
        maxHeight: "92vh", overflowY: "auto",
        animation: "scaleIn 0.3s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(16px,3vw,26px)" }}>
          <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.25rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>Add New Project</h3>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, transition: "all 0.2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>Choose Icon</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setF(v => ({ ...v, emoji: e }))}
                style={{ fontSize: "1.25rem", padding: "7px", borderRadius: 10, border: f.emoji === e ? "2px solid #00D4AA" : "2px solid transparent", background: f.emoji === e ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {[["title","Project Title *"],["desc","Description *"],["tech","Technologies (comma separated)"],["live","Live Demo URL"],["github","GitHub URL"]].map(([k, p]) => (
          <input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#00D4AA"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
          <button onClick={onClose}
            style={{ flex: "1 1 100px", padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
            Cancel
          </button>
          <button onClick={() => onSave && onSave(f)}
            style={{ flex: "2 1 180px", padding: 13, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Save Project ✓
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 6. BlogForm — responsive modal
// ══════════════════════════════════════════
write(path.join(src, "components/admin/BlogForm.jsx"), `
import React, { useState } from "react";

const CATS = ["React","Node.js","MongoDB","Next.js","SEO","Marketing","JavaScript","Express"];
const S = {
  width: "100%", padding: "13px 16px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#fff", fontSize: "0.9rem", outline: "none",
  marginBottom: 12, boxSizing: "border-box", fontFamily: "var(--font-body)",
  transition: "border-color 0.2s",
};

export default function BlogForm({ onClose, onSave }) {
  const [f, setF] = useState({ title: "", excerpt: "", category: "React", readTime: "5", content: "" });
  const inp = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
      <div style={{
        background: "linear-gradient(135deg,#0d1629,#080f1c)",
        border: "1px solid rgba(56,189,248,0.14)", borderRadius: "clamp(16px,3vw,24px)",
        padding: "clamp(18px,4vw,40px)", width: "100%", maxWidth: 520,
        maxHeight: "92vh", overflowY: "auto",
        animation: "scaleIn 0.3s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(16px,3vw,26px)" }}>
          <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.25rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>New Blog Post</h3>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, transition: "all 0.2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>Category</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setF(v => ({ ...v, category: c }))}
                style={{
                  padding: "6px 13px", borderRadius: 99,
                  border: f.category === c ? "1px solid #38BDF8" : "1px solid rgba(255,255,255,0.08)",
                  background: f.category === c ? "rgba(56,189,248,0.12)" : "transparent",
                  color: f.category === c ? "#38BDF8" : "rgba(255,255,255,0.38)",
                  cursor: "pointer", fontSize: "0.78rem", fontWeight: f.category === c ? 700 : 400,
                  fontFamily: "var(--font-body)", transition: "all 0.2s",
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {[["title","Blog Title *"],["excerpt","Short Description *"]].map(([k, p]) => (
          <input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#38BDF8"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        ))}
        <textarea name="content" placeholder="Content (optional)" value={f.content} onChange={inp} rows={4}
          style={{ ...S, resize: "vertical" }}
          onFocus={e => e.target.style.borderColor = "#38BDF8"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }} className="bf-grid">
          <input name="readTime" placeholder="Read Time (min)" value={f.readTime} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#38BDF8"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
          <button onClick={onClose}
            style={{ flex: "1 1 100px", padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
            Cancel
          </button>
          <button onClick={() => onSave && onSave(f)}
            style={{ flex: "2 1 180px", padding: 13, background: "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(56,189,248,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Publish Post ✓
          </button>
        </div>
      </div>
      <style>{\`@media(max-width:420px){.bf-grid{grid-template-columns:1fr!important}}\`}</style>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 7. SEOChart — responsive
// ══════════════════════════════════════════
write(path.join(src, "components/admin/SEOChart.jsx"), `
import React, { useEffect, useRef, useState } from "react";

const DATA = [
  { m: "Jan", s: 45 }, { m: "Feb", s: 52 }, { m: "Mar", s: 48 },
  { m: "Apr", s: 61 }, { m: "May", s: 67 }, { m: "Jun", s: 74 },
];
const MAX = Math.max(...DATA.map(d => d.s));

export default function SEOChart() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "clamp(16px,3vw,28px)", minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(14px,3vw,24px)", flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ color: "#fff", fontSize: "clamp(0.85rem,2.2vw,0.95rem)", fontWeight: 700, margin: 0, fontFamily: "var(--font-head)" }}>SEO Score Trend</h3>
        <span style={{ background: "rgba(0,212,170,0.1)", color: "#00D4AA", padding: "3px 11px", borderRadius: 99, fontSize: "clamp(0.68rem,1.6vw,0.74rem)", fontWeight: 700, fontFamily: "var(--font-body)", animation: "pulse 3s infinite", whiteSpace: "nowrap" }}>
          +64% YTD
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(5px,1.5vw,10px)", height: "clamp(100px,22vw,130px)", marginBottom: 12 }}>
        {DATA.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end", minWidth: 0 }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(0.6rem,1.5vw,0.68rem)", fontFamily: "var(--font-body)" }}>{d.s}</span>
            <div style={{ width: "100%", background: "rgba(255,255,255,0.04)", borderRadius: "6px 6px 0 0", height: "100%", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
              <div style={{
                width: "100%",
                height: animated ? (d.s / MAX * 100) + "%" : "0%",
                background: "linear-gradient(180deg,#00D4AA,#38BDF8)",
                borderRadius: "5px 5px 0 0",
                transition: \`height 0.9s ease \${i * 0.1}s\`,
                minHeight: animated ? 4 : 0,
                cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.3)"}
                onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "clamp(0.6rem,1.5vw,0.68rem)", fontFamily: "var(--font-body)" }}>{d.m}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "clamp(8px,2vw,16px)", marginTop: 8, flexWrap: "wrap" }}>
        {[["#00D4AA","High (70+)"],["#38BDF8","Medium (50-70)"],["rgba(255,255,255,0.2)","Low (<50)"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "clamp(0.62rem,1.5vw,0.68rem)", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 8. AdsChart — responsive
// ══════════════════════════════════════════
write(path.join(src, "components/admin/AdsChart.jsx"), `
import React, { useEffect, useRef, useState } from "react";

const DATA = [
  { label: "Facebook",  value: 42, color: "#3b82f6" },
  { label: "Google",    value: 31, color: "#f59e0b" },
  { label: "Instagram", value: 18, color: "#ec4899" },
  { label: "Other",     value: 9,  color: "#6366f1" },
];
const SZ = 160;
const R  = 58;
const CIR = 2 * Math.PI * R;

export default function AdsChart() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setAnimated(true), 100); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  let offset = 0;
  const segments = DATA.map(d => {
    const dash    = CIR * (d.value / 100);
    const gap     = CIR - dash;
    const dashOff = -(offset / 100) * CIR;
    offset += d.value;
    return { ...d, dash, gap, dashOff };
  });

  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "clamp(16px,3vw,28px)", minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(14px,3vw,24px)", flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ color: "#fff", fontSize: "clamp(0.85rem,2.2vw,0.95rem)", fontWeight: 700, margin: 0, fontFamily: "var(--font-head)" }}>Ad Spend Breakdown</h3>
        <span style={{ background: "rgba(56,189,248,0.1)", color: "#38BDF8", padding: "3px 11px", borderRadius: 99, fontSize: "clamp(0.68rem,1.6vw,0.74rem)", fontWeight: 700, fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
          This Month
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px,3vw,24px)", flexWrap: "wrap", justifyContent: "center" }} className="ads-chart-row">
        <div style={{ position: "relative", flexShrink: 0, width: "min(160px,38vw)", height: "min(160px,38vw)" }}>
          <svg viewBox={\`0 0 \${SZ} \${SZ}\`} width="100%" height="100%" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={SZ/2} cy={SZ/2} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={18} />
            {segments.map((s, i) => (
              <circle key={i}
                cx={SZ/2} cy={SZ/2} r={R}
                fill="none" stroke={s.color} strokeWidth={18}
                strokeLinecap="round"
                strokeDasharray={animated ? \`\${s.dash} \${s.gap}\` : \`0 \${CIR}\`}
                strokeDashoffset={s.dashOff}
                style={{ transition: \`stroke-dasharray 1.1s ease \${i * 0.2}s\` }}
              />
            ))}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.1rem,3vw,1.3rem)", color: "#fff", lineHeight: 1 }}>100%</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "clamp(0.6rem,1.5vw,0.65rem)", fontFamily: "var(--font-body)" }}>Total</div>
          </div>
        </div>

        <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
          {DATA.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: animated ? 1 : 0, transform: animated ? "none" : "translateX(12px)", transition: \`all 0.5s ease \${i * 0.1 + 0.3}s\` }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.76rem,2vw,0.82rem)", flex: 1, fontFamily: "var(--font-body)" }}>{d.label}</span>
              <span style={{ color: "#fff", fontSize: "clamp(0.82rem,2vw,0.88rem)", fontWeight: 700, fontFamily: "var(--font-body)" }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(0.74rem,1.8vw,0.8rem)", fontFamily: "var(--font-body)" }}>Total Budget Used</span>
        <span style={{ color: "#00D4AA", fontWeight: 700, fontSize: "clamp(0.8rem,2vw,0.88rem)", fontFamily: "var(--font-body)" }}>$1,240 / $1,500</span>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 9. AdminDashboard — responsive grid
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminDashboard.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import SEOChart from "../../components/admin/SEOChart";
import AdsChart from "../../components/admin/AdsChart";

const STATS = [
  { icon: "🚀", title: "Live Projects",   value: "2",    change: 100,  color: "#00D4AA" },
  { icon: "⚡", title: "Skills Listed",   value: "14+",  change: 12,   color: "#38BDF8" },
  { icon: "✉️", title: "Messages",        value: "0",    change: 0,    color: "#818CF8" },
  { icon: "👁️", title: "Profile Views",   value: "—",    change: 0,    color: "#f472b6" },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "clamp(1.2rem,3vw,2rem)" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", marginBottom: "0.3rem", color: "#fff" }}>Dashboard</h2>
        <p style={{ color: "var(--muted)", fontSize: "clamp(0.8rem,2vw,0.88rem)", fontFamily: "var(--font-body)" }}>Welcome back, Tarek! Manage your portfolio from here.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "clamp(0.7rem,2vw,1.2rem)", marginBottom: "clamp(1.5rem,4vw,2.5rem)" }}>
        {STATS.map((s, i) => <AnalyticsCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(0.9rem,2vw,1.5rem)", marginBottom: "clamp(1.2rem,3vw,2rem)" }}>
        <SEOChart />
        <AdsChart />
      </div>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "clamp(1rem,3vw,1.5rem)" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(0.85rem,2.2vw,0.95rem)", marginBottom: "1.1rem", color: "#38BDF8" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
          {[["🚀 Add Project","/admin/projects"],["⚡ Update Skills","/admin/skills"],["👤 Edit Profile","/admin/profile"],["✉️ Messages","/admin/messages"]].map(([l, p]) => (
            <div key={l} onClick={() => nav(p)}
              style={{ background: "rgba(0,212,170,0.07)", border: "1px solid rgba(0,212,170,0.14)", borderRadius: 9, padding: "10px 16px", color: "#00D4AA", fontSize: "clamp(0.78rem,2vw,0.84rem)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,170,0.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,170,0.07)"; e.currentTarget.style.transform = "none"; }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 10. Navbar — change "Dashboard" → "Admin"
// ══════════════════════════════════════════
{
  const fp = path.join(src, "components/Navbar.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    c = c.split(">Dashboard</button>").join(">Admin</button>");
    c = c.split(">Dashboard</button>\n").join(">Admin</button>\n");
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ Navbar: 'Dashboard' → 'Admin'");
  }
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║       ✅ সম্পূর্ণ হয়েছে!                                ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  ✅ Navbar এ "Dashboard" → "Admin" করা হয়েছে            ║
║                                                          ║
║  ✅ Admin Login যুক্ত হয়েছে:                            ║
║     Password: tareq@#49                                  ║
║     URL: /admin                                          ║
║     (sessionStorage এ save থাকে, browser বন্ধ করলে      ║
║      আবার login করতে হবে)                               ║
║                                                          ║
║  ✅ সব Dashboard file responsive হয়েছে:                ║
║     • Sidebar → mobile এ top bar + slide drawer         ║
║     • AnalyticsCard → small screens এ ছোট হবে          ║
║     • ProjectForm/BlogForm → mobile এ full modal       ║
║     • SEOChart/AdsChart → চার্ট ছোট হয়ে adjust হবে    ║
║                                                          ║
║  Design অপরিবর্তিত — শুধু responsive + login যুক্ত হলো ║
╚══════════════════════════════════════════════════════════╝
`);
