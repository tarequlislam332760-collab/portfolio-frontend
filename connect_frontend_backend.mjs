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
// 1. API Service — সব API call এক জায়গায়
// ══════════════════════════════════════════
write(path.join(src, "services/api.js"), `
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Token helpers
const getToken = () => sessionStorage.getItem("admin_token");
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: getToken() ? \`Bearer \${getToken()}\` : "",
});

// Generic fetch wrapper
async function api(endpoint, options = {}) {
  const res = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    headers: authHeaders(),
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}

// ── Auth ────────────────────────────────
export const authAPI = {
  login:    (email, password) => api("/auth/login",    { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name, email, password) => api("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  me:       () => api("/auth/me"),
};

// ── Projects ────────────────────────────
export const projectsAPI = {
  getAll:  ()       => api("/projects"),
  create:  (data)   => api("/projects",     { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data) => api(\`/projects/\${id}\`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)     => api(\`/projects/\${id}\`, { method: "DELETE" }),
};

// ── Blogs ───────────────────────────────
export const blogsAPI = {
  getAll:    ()       => api("/blogs"),
  getAllAdmin:()       => api("/blogs/all"),
  create:   (data)   => api("/blogs",     { method: "POST",   body: JSON.stringify(data) }),
  update:   (id, data) => api(\`/blogs/\${id}\`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:   (id)     => api(\`/blogs/\${id}\`, { method: "DELETE" }),
};

// ── Messages ────────────────────────────
export const messagesAPI = {
  send:    (data)  => api("/messages",          { method: "POST",   body: JSON.stringify(data) }),
  getAll:  ()      => api("/messages"),
  markRead:(id)    => api(\`/messages/\${id}/read\`, { method: "PUT" }),
  delete:  (id)    => api(\`/messages/\${id}\`,      { method: "DELETE" }),
};

// ── Testimonials ────────────────────────
export const testimonialsAPI = {
  getAll:  ()        => api("/testimonials"),
  create:  (data)    => api("/testimonials",       { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data) => api(\`/testimonials/\${id}\`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)      => api(\`/testimonials/\${id}\`,  { method: "DELETE" }),
};

// ── Skills ──────────────────────────────
export const skillsAPI = {
  getAll:  ()        => api("/skills"),
  create:  (data)    => api("/skills",          { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data) => api(\`/skills/\${id}\`,   { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)      => api(\`/skills/\${id}\`,    { method: "DELETE" }),
};

// ── Profile ─────────────────────────────
export const profileAPI = {
  get:    ()     => api("/profile"),
  update: (data) => api("/profile", { method: "PUT", body: JSON.stringify(data) }),
};

// ── Analytics ───────────────────────────
export const analyticsAPI = {
  getStats: () => api("/analytics"),
};

export default api;
`);

// ══════════════════════════════════════════
// 2. Contact.jsx — real API submit
// ══════════════════════════════════════════
write(path.join(src, "pages/Contact.jsx"), `
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { SocialLink } from "../components/SocialIcons";
import { messagesAPI } from "../services/api";

const FB_URL = "https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL";

const CONTACT_INFO = [
  { icon: "📧", label: "Email",    value: "tareq.islam.dev@gmail.com", href: "mailto:tareq.islam.dev@gmail.com" },
  { icon: "📱", label: "Phone",    value: "+880 1732-483149",           href: "tel:+8801732483149" },
  { icon: "📍", label: "Location", value: "Sylhet, Bangladesh",         href: null },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });
  const focus = e => e.target.style.borderColor = "#00D4AA";
  const blur  = e => e.target.style.borderColor = "rgba(255,255,255,0.09)";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await messagesAPI.send(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Message পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const inputSt = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: "0.92rem",
    fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="Contact Tarikul Islam Tarek | Hire MERN Developer" description="Get in touch with Tarikul Islam Tarek for MERN development and digital marketing projects." />
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="Get In Touch" title="Let's Work" highlight="Together" sub="Available for freelance projects and full-time opportunities" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(24px,4vw,60px)", alignItems: "start" }} className="contact-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {CONTACT_INFO.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 18px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 14, transition: "border-color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.25)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.1)"; e.currentTarget.style.transform = "none"; }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 3 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>{c.value}</a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>{c.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social Icons */}
            <div style={{ padding: "15px 18px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 14 }}>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 12 }}>Follow Me</div>
              <div style={{ display: "flex", gap: 10 }}>
                <SocialLink type="facebook"  url={FB_URL} size={42} />
                <SocialLink type="instagram" size={42} />
                <SocialLink type="linkedin"  size={42} />
                <SocialLink type="github"    size={42} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 12 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#00D4AA", animation: "pulse 1.8s infinite", flexShrink: 0 }} />
              <span style={{ color: "#00D4AA", fontSize: "0.84rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Available for hire — Response within 24h</span>
            </div>
          </div>

          <div>
            {sent ? (
              <div style={{ background: "rgba(0,212,170,0.06)", border: "2px solid rgba(0,212,170,0.25)", borderRadius: 24, padding: "3rem", textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem", color: "#00D4AA", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}>আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "transparent", color: "#00D4AA", border: "1.5px solid #00D4AA", borderRadius: 9, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, padding: "clamp(24px,3vw,40px)" }}>
                {error && (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: "1rem", color: "#f87171", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>
                    ⚠️ {error}
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }} className="form-grid">
                  <input name="name"  placeholder="Your Name *"     value={form.name}  onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                  <input name="email" type="email" placeholder="Email *" value={form.email} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                </div>
                <input name="subject" placeholder="Subject" value={form.subject} onChange={inp} style={inputSt} onFocus={focus} onBlur={blur} />
                <textarea name="message" placeholder="Your Message *" value={form.message} onChange={inp} required rows={5} style={{ ...inputSt, resize: "vertical" }} onFocus={focus} onBlur={blur} />
                <button type="submit" disabled={loading}
                  style={{ width: "100%", background: loading ? "rgba(0,212,170,0.5)" : "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", color: "#050A14", padding: 16, borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 800, fontSize: "1rem", fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
                  {loading ? "Sending..." : "Send Message 🚀"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}.form-grid{grid-template-columns:1fr!important}}\`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 3. Projects.jsx — API connected
// ══════════════════════════════════════════
write(path.join(src, "pages/Projects.jsx"), `
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
              <div style={{ height: 160, background: \`linear-gradient(135deg,\${p.color || "#00D4AA"}22,\${p.color || "#00D4AA"}07)\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
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
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "11px", background: \`linear-gradient(135deg,\${p.color || "#00D4AA"},#38BDF8)\`, borderRadius: 10, color: "#050A14", fontWeight: 800, fontSize: "0.86rem", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", display: "block" }}>🚀 Live Demo</a>}
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
`);

// ══════════════════════════════════════════
// 4. Blog.jsx — API connected
// ══════════════════════════════════════════
write(path.join(src, "pages/Blog.jsx"), `
import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { blogsAPI } from "../services/api";

const FALLBACK = [
  { _id:"1", emoji:"⚛️", category:"React", title:"React 19: What You Need to Know", excerpt:"Server Components, new hooks, Suspense improvements.", createdAt: new Date("2025-03-01"), readTime:"6", color:"#38BDF8" },
  { _id:"2", emoji:"🍃", category:"MongoDB", title:"Advanced Aggregation Pipelines", excerpt:"Master lookup, unwind, facet for complex data.", createdAt: new Date("2025-02-01"), readTime:"8", color:"#00D4AA" },
  { _id:"3", emoji:"📈", category:"SEO", title:"Complete SEO Guide for 2025", excerpt:"Technical SEO, Core Web Vitals, what Google ranks.", createdAt: new Date("2025-01-01"), readTime:"10", color:"#818CF8" },
];

export default function Blog() {
  const [blogs, setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getAll()
      .then(res => setBlogs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : FALLBACK;

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="My Thoughts" title="Latest" highlight="Blog Posts" sub="Insights on MERN development and digital marketing" />
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Loading posts...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
            {displayBlogs.map(p => (
              <div key={p._id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "2rem", cursor: "pointer", transition: "transform .3s,border-color .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = p.color || "#00D4AA"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1.2rem", alignItems: "center" }}>
                  <span style={{ background: "rgba(56,189,248,0.1)", color: p.color || "#38BDF8", borderRadius: 6, padding: "4px 12px", fontSize: "0.74rem", fontWeight: 600 }}>{p.category}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.77rem" }}>{p.readTime} min read</span>
                </div>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{p.emoji}</div>
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.7rem", lineHeight: 1.4, color: "#fff" }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.86rem", lineHeight: 1.8, marginBottom: "1.2rem", fontFamily: "var(--font-body)" }}>{p.excerpt}</p>
                <span style={{ color: "#38BDF8", fontSize: "0.84rem", fontWeight: 600 }}>Read More →</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 5. AdminMessages.jsx — real messages from DB
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminMessages.jsx"), `
import React, { useEffect, useState } from "react";
import { messagesAPI } from "../../services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [unread, setUnread]     = useState(0);

  const load = async () => {
    try {
      const res = await messagesAPI.getAll();
      setMessages(res.data || []);
      setUnread(res.unreadCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRead = async (id) => {
    try {
      await messagesAPI.markRead(id);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
      setUnread(prev => Math.max(0, prev - 1));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই message delete করবেন?")) return;
    try {
      await messagesAPI.delete(id);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Messages</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Contact form থেকে আসা messages</p>
        </div>
        {unread > 0 && (
          <div style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 99, padding: "6px 16px", color: "#00D4AA", fontSize: "0.82rem", fontWeight: 700, animation: "pulse 2s infinite" }}>
            {unread} unread
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.5rem" }}>No messages yet</h3>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>Contact form এ কেউ message পাঠালে এখানে দেখাবে।</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {messages.map(m => (
            <div key={m._id} style={{ background: m.read ? "rgba(255,255,255,0.02)" : "rgba(0,212,170,0.05)", border: m.read ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,212,170,0.2)", borderRadius: 14, padding: "clamp(14px,2.5vw,20px)", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  {!m.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite", flexShrink: 0 }} />}
                  <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{m.name}</span>
                  <a href={\`mailto:\${m.email}\`} style={{ color: "#38BDF8", fontSize: "0.82rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>{m.email}</a>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {!m.read && (
                    <button onClick={() => handleRead(m._id)} style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 7, padding: "5px 12px", color: "#00D4AA", cursor: "pointer", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                      Mark Read ✓
                    </button>
                  )}
                  <button onClick={() => handleDelete(m._id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 7, padding: "5px 12px", color: "#f87171", cursor: "pointer", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                    Delete
                  </button>
                </div>
              </div>
              {m.subject && <div style={{ color: "#818CF8", fontSize: "0.82rem", fontFamily: "var(--font-body)", marginBottom: 8, fontWeight: 600 }}>Subject: {m.subject}</div>}
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "var(--font-body)", margin: 0 }}>{m.message}</p>
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.74rem", fontFamily: "var(--font-body)", marginTop: 10 }}>
                {new Date(m.createdAt).toLocaleString("en-BD")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 6. AdminProjects.jsx — real CRUD with API
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminProjects.jsx"), `
import React, { useEffect, useState } from "react";
import { projectsAPI } from "../../services/api";

const DEF = { title: "", desc: "", emoji: "🚀", tech: "", live: "", github: "", color: "#00D4AA", status: "Live", cat: "Full Stack" };

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const load = () => {
    projectsAPI.getAll()
      .then(res => setProjects(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    setSaving(true);
    try {
      if (editing) {
        await projectsAPI.update(editing, form);
        setEditing(null);
      } else {
        await projectsAPI.create(form);
      }
      setForm(DEF);
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this project?")) return;
    try { await projectsAPI.delete(id); load(); }
    catch (err) { alert("Error: " + err.message); }
  };

  const inputSt = { width: "100%", background: "var(--surface)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: "0.87rem", fontFamily: "var(--font-body)", outline: "none", marginBottom: "0.8rem", boxSizing: "border-box" };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.5rem)", marginBottom: "0.3rem", color: "#fff" }}>Projects</h2>
      <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>MongoDB তে সরাসরি save হবে</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="ap-grid">
        {/* Form */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#00D4AA" }}>{editing ? "Edit" : "Add"} Project</h3>
          <input name="emoji"  placeholder="Emoji (🚀)" value={form.emoji}  onChange={inp} style={inputSt} />
          <input name="title"  placeholder="Title *"    value={form.title}  onChange={inp} style={inputSt} />
          <textarea name="desc" placeholder="Description *" value={form.desc} onChange={inp} rows={3} style={{ ...inputSt, resize: "vertical" }} />
          <input name="tech"   placeholder="Tech (React, Node, MongoDB)" value={form.tech}   onChange={inp} style={inputSt} />
          <input name="live"   placeholder="Live URL"   value={form.live}   onChange={inp} style={inputSt} />
          <input name="github" placeholder="GitHub URL" value={form.github} onChange={inp} style={inputSt} />
          <input name="color"  placeholder="Color (#00D4AA)" value={form.color} onChange={inp} style={{ ...inputSt, marginBottom: "1.2rem" }} />
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button onClick={save} disabled={saving}
              style={{ flex: 1, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 8, padding: "11px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving..." : (editing ? "Update" : "Add")}
            </button>
            {editing && <button onClick={() => { setEditing(null); setForm(DEF); }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "11px 14px", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Cancel</button>}
          </div>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {loading ? <p style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>Loading...</p> :
           projects.length === 0 ? <p style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>No projects yet. Add one!</p> :
           projects.map(p => (
            <div key={p._id} style={{ background: "var(--card)", borderRadius: 12, padding: "1.2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <div>
                  <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.92rem", color: "#fff" }}>{p.emoji} {p.title}</h4>
                  <div style={{ color: "#00D4AA", fontSize: "0.75rem", fontFamily: "var(--font-body)", marginTop: 2 }}>{p.status}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => { setForm({ ...p, tech: (p.tech || []).join(", ") }); setEditing(p._id); }} style={{ background: "rgba(56,189,248,0.1)", border: "none", borderRadius: 5, padding: "5px 10px", color: "#38BDF8", cursor: "pointer", fontSize: "0.78rem" }}>Edit</button>
                  <button onClick={() => del(p._id)} style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 5, padding: "5px 10px", color: "#f87171", cursor: "pointer", fontSize: "0.78rem" }}>Del</button>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: 0 }}>{p.desc?.slice(0, 80)}...</p>
            </div>
          ))}
        </div>
      </div>
      <style>{\`@media(max-width:700px){.ap-grid{grid-template-columns:1fr!important}}\`}</style>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 7. AdminSkills.jsx — real CRUD
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminSkills.jsx"), `
import React, { useEffect, useState } from "react";
import { skillsAPI } from "../../services/api";

const CATS = ["Frontend","Backend","Database","Marketing","Other"];
const DEF  = { name: "", level: 80, category: "Frontend", color: "#00D4AA" };

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm]     = useState(DEF);
  const [saving, setSaving] = useState(false);

  const load = () => skillsAPI.getAll().then(res => setSkills(res.data || [])).catch(console.error);

  useEffect(() => { load(); }, []);

  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async () => {
    setSaving(true);
    try {
      // Backend stores category-based skills — send as simple skill entry
      await skillsAPI.create({ ...form, level: Number(form.level) });
      setForm(DEF);
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete?")) return;
    try { await skillsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const inputSt = { background: "var(--surface)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: "0.87rem", fontFamily: "var(--font-body)", outline: "none" };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.5rem)", marginBottom: "0.3rem", color: "#fff" }}>Skills</h2>
      <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Skill add করুন — MongoDB তে save হবে</p>

      <div style={{ background: "var(--card)", borderRadius: 14, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#00D4AA" }}>Add Skill</h3>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <input name="name"     placeholder="Skill name *" value={form.name} onChange={inp} style={{ ...inputSt, flex: "1 1 140px" }} />
          <select name="category" value={form.category} onChange={inp} style={{ ...inputSt, flex: "1 1 120px" }}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 130px" }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.76rem" }}>Level: {form.level}%</label>
            <input type="range" name="level" min={10} max={100} value={form.level} onChange={inp} style={{ accentColor: "#00D4AA", width: "100%" }} />
          </div>
          <button onClick={add} disabled={saving || !form.name}
            style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 8, padding: "11px 22px", fontWeight: 700, cursor: saving || !form.name ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", flexShrink: 0, opacity: saving || !form.name ? 0.7 : 1 }}>
            {saving ? "..." : "Add"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "1rem" }}>
        {skills.map(s => (
          <div key={s._id} style={{ background: "var(--card)", borderRadius: 12, padding: "1.2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{s.name || s.category}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.73rem", fontFamily: "var(--font-body)" }}>{s.category}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: "#00D4AA", fontWeight: 700, fontSize: "0.87rem" }}>{s.level}%</span>
                <button onClick={() => del(s._id)} style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 5, padding: "4px 8px", color: "#f87171", cursor: "pointer", fontSize: "0.74rem" }}>✕</button>
              </div>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: s.level + "%", background: s.color || "#00D4AA", borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 8. AdminProfile.jsx — real save to DB
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminProfile.jsx"), `
import React, { useEffect, useState } from "react";
import { profileAPI } from "../../services/api";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Tarikul Islam Tarek", title: "MERN Full Stack Developer",
    subtitle: "Digital Marketing Specialist",
    bio: "", bio2: "", email: "", phone: "", location: "Sylhet, Bangladesh",
    available: true, github: "", linkedin: "", facebook: "", instagram: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    profileAPI.get()
      .then(res => { if (res.data) setProfile(res.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProfile({ ...profile, [e.target.name]: val });
  };

  const save = async () => {
    setSaving(true);
    try {
      await profileAPI.update(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputSt = { width: "100%", background: "var(--surface)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "11px 13px", color: "#fff", fontSize: "0.88rem", fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem", boxSizing: "border-box" };

  if (loading) return <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)" }}>Loading...</div>;

  const fields = [
    ["Full Name","name","text"],["Role / Title","title","text"],
    ["Subtitle","subtitle","text"],["Email","email","email"],
    ["Phone","phone","text"],["Location","location","text"],
    ["GitHub","github","url"],["LinkedIn","linkedin","url"],
    ["Facebook","facebook","url"],["Instagram","instagram","url"],
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.5rem)", marginBottom: "0.3rem", color: "#fff" }}>Profile</h2>
      <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>MongoDB তে আপনার profile update হবে</p>

      <div style={{ background: "var(--card)", borderRadius: 14, padding: "clamp(1.2rem,3vw,2rem)", border: "1px solid rgba(255,255,255,0.06)", maxWidth: 620 }}>
        {saved && <div style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 8, padding: "10px 16px", marginBottom: "1.2rem", color: "#00D4AA", fontSize: "0.88rem" }}>✅ Profile updated in MongoDB!</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }} className="pf-grid">
          {fields.slice(0, 6).map(([l, n, t]) => (
            <div key={n}><label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 5 }}>{l}</label><input name={n} type={t} value={profile[n] || ""} onChange={inp} style={inputSt} /></div>
          ))}
        </div>

        <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 5 }}>Bio</label>
        <textarea name="bio" value={profile.bio || ""} onChange={inp} rows={3} style={{ ...inputSt, resize: "vertical" }} />

        <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 5 }}>Bio 2</label>
        <textarea name="bio2" value={profile.bio2 || ""} onChange={inp} rows={2} style={{ ...inputSt, resize: "vertical" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }} className="pf-grid">
          {fields.slice(6).map(([l, n, t]) => (
            <div key={n}><label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 5 }}>{l}</label><input name={n} type={t} value={profile[n] || ""} onChange={inp} placeholder="https://..." style={inputSt} /></div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
          <input type="checkbox" name="available" checked={profile.available} onChange={inp} style={{ width: 18, height: 18, accentColor: "#00D4AA", cursor: "pointer" }} />
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "var(--font-body)", cursor: "pointer" }}>Available for hire</label>
        </div>

        <button onClick={save} disabled={saving}
          style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 9, padding: "13px 28px", fontWeight: 700, fontSize: "0.93rem", cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", opacity: saving ? 0.7 : 1 }}>
          {saving ? "Saving to MongoDB..." : "Save Profile ✓"}
        </button>
      </div>
      <style>{\`@media(max-width:600px){.pf-grid{grid-template-columns:1fr!important}}\`}</style>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 9. AdminDashboard.jsx — real stats from API
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminDashboard.jsx"), `
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyticsAPI } from "../../services/api";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import SEOChart from "../../components/admin/SEOChart";
import AdsChart from "../../components/admin/AdsChart";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.getStats()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { icon: "🚀", title: "Live Projects", value: String(stats.totalProjects ?? 0), change: 100, color: "#00D4AA" },
    { icon: "✍️", title: "Blog Posts",    value: String(stats.totalBlogs ?? 0),    change: 20,  color: "#38BDF8" },
    { icon: "✉️", title: "Messages",      value: String(stats.totalMessages ?? 0), change: stats.unreadMessages ?? 0, color: "#818CF8" },
    { icon: "⭐", title: "Reviews",       value: String(stats.totalTestimonials ?? 0), change: 0, color: "#f472b6" },
  ] : [
    { icon: "🚀", title: "Projects",  value: "...", change: 0, color: "#00D4AA" },
    { icon: "✍️", title: "Blogs",     value: "...", change: 0, color: "#38BDF8" },
    { icon: "✉️", title: "Messages",  value: "...", change: 0, color: "#818CF8" },
    { icon: "⭐", title: "Reviews",   value: "...", change: 0, color: "#f472b6" },
  ];

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "clamp(1.2rem,3vw,2rem)" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", marginBottom: "0.3rem", color: "#fff" }}>Dashboard</h2>
        <p style={{ color: "var(--muted)", fontSize: "clamp(0.8rem,2vw,0.88rem)", fontFamily: "var(--font-body)" }}>
          {loading ? "Loading stats from MongoDB..." : "Welcome back, Tarek! Real-time data from MongoDB."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "clamp(0.7rem,2vw,1.2rem)", marginBottom: "clamp(1.5rem,4vw,2.5rem)" }}>
        {cards.map((s, i) => <AnalyticsCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(0.9rem,2vw,1.5rem)", marginBottom: "clamp(1.2rem,3vw,2rem)" }}>
        <SEOChart />
        <AdsChart />
      </div>

      {/* Recent messages */}
      {stats?.recentMessages?.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "clamp(1rem,3vw,1.5rem)", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", color: "#38BDF8" }}>Recent Messages</h3>
          {stats.recentMessages.map(m => (
            <div key={m._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap", gap: 4 }}>
              <div>
                <span style={{ color: "#fff", fontSize: "0.88rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>{m.name}</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "var(--font-body)", marginLeft: 8 }}>{m.email}</span>
              </div>
              {!m.read && <span style={{ background: "rgba(0,212,170,0.1)", color: "#00D4AA", padding: "2px 8px", borderRadius: 99, fontSize: "0.7rem", fontWeight: 700 }}>NEW</span>}
            </div>
          ))}
          <button onClick={() => nav("/admin/messages")} style={{ marginTop: "1rem", background: "transparent", color: "#38BDF8", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "var(--font-body)" }}>
            View All Messages →
          </button>
        </div>
      )}

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "clamp(1rem,3vw,1.5rem)" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#38BDF8" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
          {[["🚀 Add Project","/admin/projects"],["✍️ New Blog","/admin/blogs"],["⚡ Skills","/admin/skills"],["👤 Profile","/admin/profile"],["✉️ Messages","/admin/messages"]].map(([l, p]) => (
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
// 10. AdminLogin — use real API login
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminLogin.jsx"), `
import React, { useState } from "react";
import { authAPI } from "../../services/api";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [password, setPwd]    = useState("");
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake]     = useState(false);
  const [show, setShow]       = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await authAPI.login(email, password);
      sessionStorage.setItem("admin_token", res.token);
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } catch (err) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050A14", padding: "20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "clamp(280px,50vw,500px)", height: "clamp(280px,50vw,500px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,0.12),transparent 70%)", filter: "blur(60px)", animation: "blobPulse 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: "clamp(280px,55vw,550px)", height: "clamp(280px,55vw,550px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.1),transparent 70%)", filter: "blur(70px)", animation: "blobPulse2 10s ease-in-out infinite 2s", pointerEvents: "none" }} />

      <form onSubmit={submit} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(28px,5vw,44px)", backdropFilter: "blur(20px)", animation: shake ? "shakeX 0.5s ease" : "fadeUp 0.6s ease both", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#050A14", boxShadow: "0 0 30px rgba(0,212,170,0.4)", animation: "floatY 4s ease-in-out infinite" }}>🔒</div>
          <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.4rem,4vw,1.8rem)", color: "#fff", marginBottom: 6, letterSpacing: "-0.5px" }}>
            Admin <span style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Login</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>Enter your credentials to access dashboard</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(false); }} placeholder="admin@email.com" required
            style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#fff", fontSize: "0.95rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
            onFocus={e => { if (!error) e.target.style.borderColor = "#00D4AA"; }}
            onBlur={e => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
          />
        </div>

        <div style={{ position: "relative", marginBottom: error ? 8 : 24 }}>
          <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>Password</label>
          <input type={show ? "text" : "password"} value={password} onChange={e => { setPwd(e.target.value); setError(false); }} placeholder="Your password" required
            style={{ width: "100%", padding: "14px 50px 14px 18px", background: "rgba(255,255,255,0.04)", border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#fff", fontSize: "0.95rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
            onFocus={e => { if (!error) e.target.style.borderColor = "#00D4AA"; }}
            onBlur={e => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
          />
          <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, bottom: 14, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", padding: 0 }}>
            {show ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p style={{ color: "#f87171", fontSize: "0.82rem", marginBottom: 18, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6 }}>⚠️ Invalid email or password</p>}

        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: 15, background: loading ? "rgba(0,212,170,0.5)" : "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 12, color: "#050A14", fontWeight: 800, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-body)" }}>
          {loading ? "Logging in..." : "Unlock Dashboard 🚀"}
        </button>

        <div style={{ textAlign: "center", marginTop: 22 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Back to Website</a>
        </div>
      </form>

      <style>{\`@keyframes shakeX{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-10px)}40%,80%{transform:translateX(10px)}}\`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 11. vite.config.js — add VITE_API_URL proxy
// ══════════════════════════════════════════
write(path.join(base, "vite.config.js"), `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
`);

console.log(`
╔══════════════════════════════════════════════════════════╗
║     ✅ Frontend → Backend সংযোগ সম্পূর্ণ!               ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালানোর পদ্ধতি:                                    ║
║                                                          ║
║  Terminal 1 (Backend):                                   ║
║    cd /c/portfolio-ecosystem/backend                     ║
║    node server.js                                        ║
║                                                          ║
║  Terminal 2 (Frontend):                                  ║
║    cd /c/portfolio-ecosystem/client                      ║
║    npm run dev                                           ║
║                                                          ║
║  ⚠️  প্রথমবার admin তৈরি করুন:                          ║
║    POST http://localhost:5000/api/auth/register          ║
║    { "name":"Tarek", "email":"tarek@admin.com",         ║
║      "password":"tareq@#49" }                            ║
║                                                          ║
║  এখন সব connected:                                      ║
║  ✅ Contact form → MongoDB Messages                      ║
║  ✅ Admin Messages → real messages দেখায়                ║
║  ✅ Admin Projects → MongoDB CRUD                        ║
║  ✅ Admin Skills → MongoDB CRUD                          ║
║  ✅ Admin Profile → MongoDB save                         ║
║  ✅ Admin Dashboard → real stats                         ║
║  ✅ Projects page → DB থেকে load                        ║
║  ✅ Blog page → DB থেকে load                            ║
║  ✅ Admin Login → JWT token auth                         ║
╚══════════════════════════════════════════════════════════╝
`);
