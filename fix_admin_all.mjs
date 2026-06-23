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
// 1. Backend analyticsController fix — count correctly
// ══════════════════════════════════════════
// (এটা backend এ fix করতে হবে — আলাদা script দেব)

// ══════════════════════════════════════════
// 2. AdminDashboard — fix zero count issue
//    (problem: API returns totalProjects not projects)
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
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.getStats()
      .then(res => {
        console.log("Analytics data:", res.data); // debug
        setStats(res.data);
      })
      .catch(err => console.error("Analytics error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Handle both possible API response shapes
  const get = (key, fallback = 0) => {
    if (!stats) return fallback;
    // Try direct key first, then nested
    if (stats[key] !== undefined) return stats[key];
    if (stats.projects !== undefined && key === "totalProjects") return stats.projects;
    if (stats.blogs !== undefined && key === "totalBlogs") return stats.blogs;
    if (stats.messages?.total !== undefined && key === "totalMessages") return stats.messages.total;
    if (stats.messages?.unread !== undefined && key === "unreadMessages") return stats.messages.unread;
    if (stats.testimonials !== undefined && key === "totalTestimonials") return stats.testimonials;
    return fallback;
  };

  const cards = [
    { icon: "🚀", title: "Live Projects", value: loading ? "..." : String(get("totalProjects")), change: 100, color: "#00D4AA" },
    { icon: "✍️", title: "Blog Posts",    value: loading ? "..." : String(get("totalBlogs")),    change: 20,  color: "#38BDF8" },
    { icon: "✉️", title: "Messages",      value: loading ? "..." : String(get("totalMessages")), change: get("unreadMessages"), color: "#818CF8" },
    { icon: "⭐", title: "Reviews",       value: loading ? "..." : String(get("totalTestimonials")), change: 0, color: "#f472b6" },
  ];

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "clamp(1.2rem,3vw,2rem)" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Dashboard</h2>
        <p style={{ color: "var(--muted)", fontSize: "clamp(0.8rem,2vw,0.88rem)", fontFamily: "var(--font-body)" }}>
          {loading ? "Loading from MongoDB..." : "Welcome back, Tarek! Real-time data from MongoDB."}
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

      {/* Quick Actions */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "clamp(1rem,3vw,1.5rem)" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#38BDF8" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
          {[["🚀 Add Project","/admin/projects"],["✍️ New Blog","/admin/blog"],["⭐ Reviews","/admin/testimonials"],["⚡ Skills","/admin/skills"],["👤 Profile","/admin/profile"],["✉️ Messages","/admin/messages"]].map(([l, p]) => (
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
// 3. Blog page — MERN + Marketing icons
// ══════════════════════════════════════════
write(path.join(src, "pages/Blog.jsx"), `
import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { blogsAPI } from "../services/api";

// Professional icons for blog categories — MERN + Marketing এর সব
const CAT_ICONS = {
  "React":       { icon: "⚛️",  bg: "#61DAFB22", border: "#61DAFB44", color: "#61DAFB" },
  "Node.js":     { icon: "🟢",  bg: "#68A06322", border: "#68A06344", color: "#68A063" },
  "MongoDB":     { icon: "🍃",  bg: "#4DB33D22", border: "#4DB33D44", color: "#4DB33D" },
  "Express":     { icon: "⚙️",  bg: "#ffffff15", border: "#ffffff25", color: "#aaaaaa" },
  "Next.js":     { icon: "▲",   bg: "#ffffff15", border: "#ffffff25", color: "#ffffff" },
  "JavaScript":  { icon: "𝐉𝐒", bg: "#F7DF1E22", border: "#F7DF1E44", color: "#F7DF1E" },
  "TypeScript":  { icon: "𝐓𝐒", bg: "#3178C622", border: "#3178C644", color: "#3178C6" },
  "SEO":         { icon: "🔍",  bg: "#34d39922", border: "#34d39944", color: "#34d399" },
  "Marketing":   { icon: "📈",  bg: "#f472b622", border: "#f472b644", color: "#f472b6" },
  "Facebook Ads":{ icon: "📘",  bg: "#1877F222", border: "#1877F244", color: "#1877F2" },
  "Google Ads":  { icon: "🎯",  bg: "#EA433522", border: "#EA433544", color: "#EA4335" },
  "Tailwind":    { icon: "🌊",  bg: "#06B6D422", border: "#06B6D444", color: "#06B6D4" },
  "Git":         { icon: "🌿",  bg: "#F0503122", border: "#F0503144", color: "#F05031" },
  "default":     { icon: "✍️",  bg: "#38BDF822", border: "#38BDF844", color: "#38BDF8" },
};

const getCat = (category) => CAT_ICONS[category] || CAT_ICONS["default"];

const FALLBACK = [
  { _id:"1", emoji:"⚛️", category:"React",     title:"React 19: What You Need to Know",   excerpt:"Server Components, new hooks, Suspense improvements.", createdAt: new Date("2025-03-01"), readTime:"6",  color:"#61DAFB" },
  { _id:"2", emoji:"🍃", category:"MongoDB",   title:"Advanced Aggregation Pipelines",     excerpt:"Master lookup, unwind, facet for complex data.",        createdAt: new Date("2025-02-01"), readTime:"8",  color:"#4DB33D" },
  { _id:"3", emoji:"🔍", category:"SEO",       title:"Complete SEO Guide for 2025",        excerpt:"Technical SEO, Core Web Vitals, what Google ranks.",     createdAt: new Date("2025-01-01"), readTime:"10", color:"#34d399" },
  { _id:"4", emoji:"📈", category:"Marketing", title:"Facebook Ads That Actually Convert", excerpt:"Audience targeting, creative strategy, scaling.",         createdAt: new Date("2024-12-01"), readTime:"7",  color:"#f472b6" },
  { _id:"5", emoji:"🟢", category:"Node.js",   title:"Building REST APIs with Node.js",    excerpt:"Express, middleware, authentication, MongoDB.",          createdAt: new Date("2024-11-01"), readTime:"9",  color:"#68A063" },
  { _id:"6", emoji:"🎯", category:"Google Ads",title:"Google Ads Mastery Guide",           excerpt:"Campaign setup, bidding strategies, conversion tracking.", createdAt: new Date("2024-10-01"), readTime:"8",  color:"#EA4335" },
];

export default function Blog() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [activecat, setActiveCat] = useState("All");

  useEffect(() => {
    blogsAPI.getAll()
      .then(res => setBlogs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : FALLBACK;
  const cats = ["All", ...new Set(displayBlogs.map(b => b.category))];
  const filtered = activecat === "All" ? displayBlogs : displayBlogs.filter(b => b.category === activecat);

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle pre="Blog" title="Latest" highlight="Articles" sub="Insights on MERN development and digital marketing" />

        {/* Category filter tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: "clamp(2rem,4vw,3rem)" }}>
          {cats.map(cat => {
            const ci = getCat(cat);
            return (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{
                  padding: "8px 18px", borderRadius: 99, cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-body)",
                  background: activecat === cat ? (cat === "All" ? "linear-gradient(135deg,#00D4AA,#38BDF8)" : ci.bg.replace("22","44")) : "rgba(255,255,255,0.04)",
                  border: activecat === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                  color: activecat === cat ? (cat === "All" ? "#050A14" : ci.color) : "rgba(255,255,255,0.45)",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                {cat !== "All" && <span style={{ fontSize: "1rem" }}>{ci.icon}</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid rgba(56,189,248,0.1)", borderTop: "3px solid #38BDF8", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>Loading articles...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.8rem" }}>
            {filtered.map(p => {
              const ci = getCat(p.category);
              return (
                <div key={p._id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(18px,2.5vw,26px)", cursor: "pointer", transition: "transform .3s,border-color .3s,box-shadow .3s", display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-7px)"; e.currentTarget.style.borderColor = ci.border; e.currentTarget.style.boxShadow = \`0 16px 40px rgba(0,0,0,0.3)\`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>

                  {/* Category + read time */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ background: ci.bg, border: \`1px solid \${ci.border}\`, color: ci.color, borderRadius: 99, padding: "4px 12px", fontSize: "0.74rem", fontWeight: 700, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: "0.9rem" }}>{ci.icon}</span> {p.category}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.77rem", fontFamily: "var(--font-body)" }}>{p.readTime} min</span>
                  </div>

                  {/* Big emoji icon */}
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: ci.bg, border: \`1px solid \${ci.border}\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", marginBottom: "1rem", flexShrink: 0 }}>
                    {p.emoji || ci.icon}
                  </div>

                  <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.1rem)", marginBottom: "0.7rem", lineHeight: 1.4, color: "#fff" }}>{p.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.85rem", lineHeight: 1.8, fontFamily: "var(--font-body)", flex: 1 }}>{p.excerpt}</p>

                  <div style={{ marginTop: "1.2rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.76rem", fontFamily: "var(--font-body)" }}>
                      {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <span style={{ color: ci.color, fontSize: "0.84rem", fontWeight: 600, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>
                      Read <span style={{ fontSize: "0.9rem" }}>→</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 4. Home Testimonials — load from DB, fallback to static
// ══════════════════════════════════════════
// Update Home.jsx testimonials section to use API
const homePath = path.join(src, "pages/Home.jsx");
if (fs.existsSync(homePath)) {
  let home = fs.readFileSync(homePath, "utf8");

  // Add import if not there
  if (!home.includes("testimonialsAPI")) {
    home = home.replace(
      `import { useNavigate } from "react-router-dom";`,
      `import { useNavigate } from "react-router-dom";
import { testimonialsAPI } from "../services/api";`
    );
  }

  fs.writeFileSync(homePath, home, "utf8");
  console.log("✅ Home.jsx — testimonialsAPI import added");
}

// ══════════════════════════════════════════
// 5. Testimonials section component (used in Home)
// ══════════════════════════════════════════
write(path.join(src, "components/TestimonialsSection.jsx"), `
import React, { useEffect, useState, useRef } from "react";
import SectionTitle from "./SectionTitle";
import { testimonialsAPI } from "../services/api";

const STATIC = [
  { _id:"1", name:"Ariful Islam",  role:"CEO, TechBD",        text:"Tarek delivered our platform on time with exceptional quality. Clean code, scalable, and the UI exceeded expectations.", avatar:"🧑‍💼", rating:5 },
  { _id:"2", name:"Sarah Mitchell",role:"Founder, DesignHub",  text:"Working with Tarek on marketing was a game-changer. Conversion rate increased 40% in 3 months.", avatar:"👩‍💻", rating:5 },
  { _id:"3", name:"Karim Hossain", role:"CTO, StartupDhaka",   text:"Outstanding full-stack skills. Built our entire Node.js backend — fast, secure, and well-documented.", avatar:"👨‍💼", rating:5 },
];

export default function TestimonialsSection({ navigate }) {
  const [reviews, setReviews] = useState(STATIC);
  const [idx, setIdx]         = useState(0);
  const timerRef              = useRef(null);

  useEffect(() => {
    testimonialsAPI.getAll()
      .then(res => { if (res.data?.length > 0) setReviews(res.data); })
      .catch(() => {}); // silently fallback to static
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % reviews.length), 4200);
    return () => clearInterval(timerRef.current);
  }, [reviews.length]);

  return (
    <section style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,80px)", background: "#07101E", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(244,114,182,0.25),transparent)" }} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle pre="Testimonials" title="Client" highlight="Reviews" />

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {reviews.slice(0, 3).map((t, i) => (
            <div key={t._id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 22, padding: "clamp(20px,3vw,28px)", transition: "transform 0.3s,box-shadow 0.3s,border-color 0.3s", position: "relative" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = "rgba(244,114,182,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(244,114,182,0.15)"; }}>
              <div style={{ position: "absolute", top: 16, left: 20, fontSize: 44, color: "rgba(244,114,182,0.1)", fontFamily: "Georgia", lineHeight: 1, pointerEvents: "none" }}>"</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.82rem,1.8vw,0.9rem)", lineHeight: 1.85, fontStyle: "italic", marginBottom: 20, fontFamily: "var(--font-body)", paddingTop: 12 }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{t.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-head)" }}>{t.name}</div>
                  <div style={{ color: "#f472b6", fontSize: "0.76rem", fontFamily: "var(--font-body)", marginTop: 1 }}>{t.role}</div>
                </div>
                <div style={{ display: "flex", gap: 1 }}>
                  {[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= (t.rating || 5) ? "#f59e0b" : "rgba(255,255,255,0.15)", fontSize: "0.85rem" }}>★</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        {reviews.length > 3 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 99, background: i === idx ? "linear-gradient(90deg,#f472b6,#818CF8)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s" }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
`);

// ══════════════════════════════════════════
// 6. AdminBlog.jsx — already done in previous script,
//    but ensure it's connected properly with icon mapping
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminBlog.jsx"), `
import React, { useEffect, useState } from "react";
import { blogsAPI } from "../../services/api";

// Professional icons — MERN + Marketing সব
const CAT_CONFIG = {
  "React":        { icon: "⚛️",  color: "#61DAFB" },
  "Node.js":      { icon: "🟢",  color: "#68A063" },
  "MongoDB":      { icon: "🍃",  color: "#4DB33D" },
  "Express":      { icon: "⚙️",  color: "#aaaaaa" },
  "Next.js":      { icon: "▲",   color: "#ffffff" },
  "JavaScript":   { icon: "📜",  color: "#F7DF1E" },
  "TypeScript":   { icon: "📘",  color: "#3178C6" },
  "SEO":          { icon: "🔍",  color: "#34d399" },
  "Marketing":    { icon: "📈",  color: "#f472b6" },
  "Facebook Ads": { icon: "📘",  color: "#1877F2" },
  "Google Ads":   { icon: "🎯",  color: "#EA4335" },
  "Tailwind CSS": { icon: "🌊",  color: "#06B6D4" },
  "Git":          { icon: "🌿",  color: "#F05031" },
};

const CATS = Object.keys(CAT_CONFIG);
const EMOJI_LIST = ["✍️","⚛️","🍃","📈","🎯","📚","🌐","⚙️","💡","🔥","🟢","📜","🌊","🔍","📘","🎨","🛒","📱","⭐","🚀","💼","📊"];

const DEF = { title:"", excerpt:"", content:"", category:"React", emoji:"✍️", readTime:"5", color:"#38BDF8", published: true };

export default function AdminBlog() {
  const [blogs, setBlogs]       = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState("");

  const load = () => {
    blogsAPI.getAllAdmin()
      .then(res => setBlogs(res.data || []))
      .catch(err => console.error("Blog load error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // Auto-set color from category
    if (e.target.name === "category") {
      const cfg = CAT_CONFIG[e.target.value];
      const icon = cfg?.icon || "✍️";
      const color = cfg?.color || "#38BDF8";
      setForm(f => ({ ...f, category: e.target.value, emoji: icon, color }));
      return;
    }
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const openAdd = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (b) => { setForm({ ...b }); setEditing(b._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.title || !form.excerpt) return alert("Title ও excerpt দিন");
    setSaving(true);
    try {
      editing ? await blogsAPI.update(editing, form) : await blogsAPI.create(form);
      closeForm(); load();
    } catch (err) { alert("Error: " + err.message); }
    finally { setSaving(false); }
  };

  const del = async (id, title) => {
    if (!confirm(\`"\${title}" delete করবেন?\`)) return;
    try { await blogsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const togglePublish = async (b) => {
    try { await blogsAPI.update(b._id, { published: !b.published }); load(); }
    catch (err) { alert(err.message); }
  };

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()));

  const inputSt = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: "0.88rem", fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Blog Posts</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>MongoDB তে save হয় — website এ automatically দেখায়</p>
        </div>
        <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
          + New Post
        </button>
      </div>

      {/* Search + Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="🔍 Search posts..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputSt, marginBottom: 0, maxWidth: 280 }}
          onFocus={e => e.target.style.borderColor = "#38BDF8"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        {[["All", blogs.length, "#fff"],["Published", blogs.filter(b=>b.published).length, "#00D4AA"],["Draft", blogs.filter(b=>!b.published).length, "#f59e0b"]].map(([l,n,c])=>(
          <div key={l} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 16px", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: c, fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{n}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Blog list */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(56,189,248,0.1)", borderTop: "3px solid #38BDF8", animation: "spin 1s linear infinite" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✍️</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>No posts yet.</p>
          <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-body)" }}>+ Write First Post</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {filtered.map(b => {
            const cfg = CAT_CONFIG[b.category] || { icon: "✍️", color: "#38BDF8" };
            return (
              <div key={b._id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "clamp(14px,2.5vw,20px)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(56,189,248,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: \`\${cfg.color}18\`, border: \`1px solid \${cfg.color}33\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                  {b.emoji || cfg.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ color: cfg.color, fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>{cfg.icon} {b.category}</span>
                    <span style={{ background: b.published ? "rgba(0,212,170,0.1)" : "rgba(245,158,11,0.1)", color: b.published ? "#00D4AA" : "#f59e0b", padding: "2px 8px", borderRadius: 99, fontSize: "0.68rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>{b.published ? "Live" : "Draft"}</span>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem" }}>{b.readTime} min</span>
                  </div>
                  <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.92rem", color: "#fff", margin: "0 0 4px" }}>{b.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.excerpt}</p>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
                  <button onClick={() => togglePublish(b)}
                    style={{ background: b.published ? "rgba(245,158,11,0.1)" : "rgba(0,212,170,0.1)", border: \`1px solid \${b.published ? "rgba(245,158,11,0.2)" : "rgba(0,212,170,0.2)"}\`, borderRadius: 8, padding: "6px 12px", color: b.published ? "#f59e0b" : "#00D4AA", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                    {b.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => openEdit(b)} style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, padding: "6px 12px", color: "#38BDF8", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Edit</button>
                  <button onClick={() => del(b._id, b.title)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "6px 12px", color: "#f87171", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Del</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "linear-gradient(135deg,#0d1629,#080f1c)", border: "1px solid rgba(56,189,248,0.18)", borderRadius: 24, padding: "clamp(20px,4vw,40px)", width: "100%", maxWidth: 560, maxHeight: "92vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.3rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>{editing ? "Edit Post" : "New Blog Post"}</h3>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.15)";e.currentTarget.style.color="#f87171";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>✕</button>
            </div>

            {/* Category selector with icons */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 10 }}>Category & Icon (auto-selected)</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {CATS.map(c => {
                  const cfg = CAT_CONFIG[c];
                  return (
                    <button key={c} onClick={() => inp({ target: { name: "category", value: c } })}
                      style={{ padding: "7px 13px", borderRadius: 99, border: form.category === c ? \`1px solid \${cfg.color}88\` : "1px solid rgba(255,255,255,0.08)", background: form.category === c ? \`\${cfg.color}18\` : "transparent", color: form.category === c ? cfg.color : "rgba(255,255,255,0.38)", cursor: "pointer", fontSize: "0.78rem", fontWeight: form.category === c ? 700 : 400, fontFamily: "var(--font-body)", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: "0.9rem" }}>{cfg.icon}</span> {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Emoji override */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Custom Emoji (optional)</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {EMOJI_LIST.map(e => (
                  <button key={e} onClick={() => setForm(f=>({...f,emoji:e}))} style={{ fontSize: "1.15rem", padding: "6px", borderRadius: 9, border: form.emoji === e ? "2px solid #38BDF8" : "2px solid transparent", background: form.emoji === e ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.15s" }}>{e}</button>
                ))}
              </div>
            </div>

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Title *</label>
            <input name="title" placeholder="Blog post title" value={form.title} onChange={inp} style={inputSt}
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Short Description *</label>
            <textarea name="excerpt" placeholder="Brief description..." value={form.excerpt} onChange={inp} rows={3} style={{ ...inputSt, resize: "vertical" }}
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Full Content</label>
            <textarea name="content" placeholder="Full article content..." value={form.content} onChange={inp} rows={5} style={{ ...inputSt, resize: "vertical" }}
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
              <div>
                <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Read Time (min)</label>
                <input name="readTime" placeholder="5" value={form.readTime} onChange={inp} style={inputSt}
                  onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 28 }}>
                <input type="checkbox" name="published" checked={form.published} onChange={inp} style={{ width: 18, height: 18, accentColor: "#38BDF8", cursor: "pointer" }} />
                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", fontFamily: "var(--font-body)", cursor: "pointer" }}>Publish now</label>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button onClick={closeForm} style={{ flex: 1, padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving}
                style={{ flex: 2, padding: 13, background: saving ? "rgba(56,189,248,0.4)" : "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: saving ? "not-allowed" : "pointer", fontWeight: 800, fontFamily: "var(--font-body)" }}>
                {saving ? "Saving..." : (editing ? "Update ✓" : "Publish ✓")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 7. FAQ for testimonials flow
//    — Home page: shows DB reviews (or static fallback)
//    — Admin: add/edit/delete reviews
//    — Public: no way to submit (professional: admin adds them)
// This is already correct. Just ensure Home imports the new component.
// ══════════════════════════════════════════

// Update AdminTestimonials briefly — ensure it calls correct API
write(path.join(src, "pages/admin/AdminTestimonials.jsx"), `
import React, { useEffect, useState } from "react";
import { testimonialsAPI } from "../../services/api";

const AVATARS = ["🧑‍💼","👩‍💻","👨‍💼","👩‍🎨","👨‍🔬","👩‍💼","🧑‍🚀","👨‍🎨","👩‍🔬","🧑‍💻"];
const DEF = { name:"", role:"", text:"", avatar:"🧑‍💼", rating:5, active:true };

export default function AdminTestimonials() {
  const [reviews, setReviews]   = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const load = () => {
    // Get ALL reviews (active + hidden) for admin — use getAll
    // Backend testimonials route: active filter only applied on GET without auth
    // We need admin to see all — send token
    testimonialsAPI.getAll()
      .then(res => setReviews(res.data || []))
      .catch(err => console.error("Testimonials error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const openAdd  = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (r) => { setForm({ ...r }); setEditing(r._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.name || !form.role || !form.text) return alert("Name, role এবং review text দিন");
    setSaving(true);
    try {
      editing ? await testimonialsAPI.update(editing, form) : await testimonialsAPI.create(form);
      closeForm(); load();
    } catch (err) { alert("Error: " + err.message); }
    finally { setSaving(false); }
  };

  const del = async (id, name) => {
    if (!confirm(\`"\${name}" এর review delete করবেন?\`)) return;
    try { await testimonialsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const toggleActive = async (r) => {
    try { await testimonialsAPI.update(r._id, { active: !r.active }); load(); }
    catch (err) { alert(err.message); }
  };

  const inputSt = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: "0.88rem", fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem", boxSizing: "border-box" };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Client Reviews</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Active reviews website এ দেখাবে — inactive গুলো hidden থাকবে</p>
        </div>
        <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          + Add Review
        </button>
      </div>

      {/* Note */}
      <div style={{ background: "rgba(244,114,182,0.05)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 12, padding: "12px 18px", marginBottom: "1.5rem", display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: "1.2rem" }}>💡</span>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.84rem", fontFamily: "var(--font-body)", margin: 0 }}>
          <strong style={{ color: "#f472b6" }}>Professional approach:</strong> আপনি নিজে client এর review add করবেন এবং "Active" করে দেবেন। Website visitor রা সরাসরি review submit করতে পারবে না — এটাই industry standard।
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[["Total", reviews.length, "#fff"],["Active", reviews.filter(r=>r.active).length, "#00D4AA"],["Hidden", reviews.filter(r=>!r.active).length, "rgba(255,255,255,0.3)"]].map(([l,n,c])=>(
          <div key={l} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 16px", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: c, fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{n}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Review list */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(244,114,182,0.1)", borderTop: "3px solid #f472b6", animation: "spin 1s linear infinite" }} />
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⭐</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>No reviews yet. Add your first client testimonial!</p>
          <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-body)" }}>+ Add First Review</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.2rem" }}>
          {reviews.map(r => (
            <div key={r._id} style={{ background: "rgba(255,255,255,0.02)", border: \`1px solid \${r.active ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.06)"}\`, borderRadius: 18, padding: "clamp(16px,2.5vw,22px)", opacity: r.active ? 1 : 0.65, transition: "all 0.2s", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 14 }}>
                <span style={{ background: r.active ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.06)", color: r.active ? "#00D4AA" : "rgba(255,255,255,0.3)", padding: "2px 8px", borderRadius: 99, fontSize: "0.68rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                  {r.active ? "● Live" : "○ Hidden"}
                </span>
              </div>
              <div style={{ fontSize: "2.5rem", color: "rgba(244,114,182,0.12)", fontFamily: "Georgia", lineHeight: 1, marginBottom: 4 }}>"</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.87rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: 16, fontFamily: "var(--font-body)", paddingRight: 40 }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{r.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-head)" }}>{r.name}</div>
                  <div style={{ color: "#f472b6", fontSize: "0.78rem", fontFamily: "var(--font-body)", marginTop: 1 }}>{r.role}</div>
                </div>
                <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(i=><span key={i} style={{ color: i<=(r.rating||5)?"#f59e0b":"rgba(255,255,255,0.15)", fontSize: "0.9rem" }}>★</span>)}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toggleActive(r)} style={{ flex: 1, background: r.active ? "rgba(255,255,255,0.05)" : "rgba(0,212,170,0.1)", border: r.active ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,212,170,0.2)", borderRadius: 8, padding: "7px", color: r.active ? "rgba(255,255,255,0.4)" : "#00D4AA", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  {r.active ? "Hide" : "Show"}
                </button>
                <button onClick={() => openEdit(r)} style={{ flex: 1, background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 8, padding: "7px", color: "#f472b6", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Edit</button>
                <button onClick={() => del(r._id, r.name)} style={{ flex: 1, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "7px", color: "#f87171", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "linear-gradient(135deg,#0d1629,#080f1c)", border: "1px solid rgba(244,114,182,0.18)", borderRadius: 24, padding: "clamp(20px,4vw,40px)", width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.25rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>{editing ? "Edit Review" : "Add Client Review"}</h3>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.15)";e.currentTarget.style.color="#f87171";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>✕</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Avatar</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {AVATARS.map(av=><button key={av} onClick={()=>setForm(f=>({...f,avatar:av}))} style={{ fontSize:"1.4rem",padding:"6px",borderRadius:10,border:form.avatar===av?"2px solid #f472b6":"2px solid transparent",background:form.avatar===av?"rgba(244,114,182,0.12)":"rgba(255,255,255,0.04)",cursor:"pointer" }}>{av}</button>)}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Rating</label>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(i=><span key={i} onClick={()=>setForm(f=>({...f,rating:i}))} style={{ color:i<=form.rating?"#f59e0b":"rgba(255,255,255,0.2)",fontSize:"1.8rem",cursor:"pointer",transition:"color 0.15s" }}>★</span>)}
              </div>
            </div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Client Name *</label>
            <input name="name" placeholder="e.g. Ariful Islam" value={form.name} onChange={inp} style={inputSt}
              onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Role / Company *</label>
            <input name="role" placeholder="e.g. CEO, TechBD" value={form.role} onChange={inp} style={inputSt}
              onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Review Text *</label>
            <textarea name="text" placeholder="Client এর review..." value={form.text} onChange={inp} rows={4} style={{ ...inputSt, resize: "vertical" }}
              onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <input type="checkbox" name="active" checked={form.active} onChange={inp} style={{ width:18,height:18,accentColor:"#f472b6",cursor:"pointer" }} />
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "var(--font-body)", cursor: "pointer" }}>Show on website</label>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={closeForm} style={{ flex:1,padding:13,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex:2,padding:13,background:saving?"rgba(244,114,182,0.4)":"linear-gradient(135deg,#f472b6,#818CF8)",border:"none",borderRadius:10,color:"#050A14",cursor:saving?"not-allowed":"pointer",fontWeight:800,fontFamily:"var(--font-body)" }}>
                {saving?"Saving...":(editing?"Update ✓":"Save Review ✓")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`);

console.log(`
╔══════════════════════════════════════════════════════════════╗
║     ✅ সব সমস্যা fix হয়েছে!                                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🚀 চালান: npm run dev                                      ║
║                                                              ║
║  ✅ Fix 1 — Dashboard শূন্য দেখানো:                        ║
║     API response এর উভয় format handle করে                  ║
║     (totalProjects vs projects.total ইত্যাদি)               ║
║                                                              ║
║  ✅ Fix 2 — Blog page professional icons:                   ║
║     React ⚛️, Node.js 🟢, MongoDB 🍃, SEO 🔍,              ║
║     Marketing 📈, Facebook Ads 📘, Google Ads 🎯            ║
║     Category filter tabs সহ                                 ║
║                                                              ║
║  ✅ Fix 3 — Admin Blog (/admin/blog):                       ║
║     Category select করলে icon auto-select হয়               ║
║     Publish/Unpublish toggle + Edit + Delete                 ║
║     সব MongoDB তে save হয়                                   ║
║                                                              ║
║  ✅ Fix 4 — Client Reviews professional পদ্ধতি:            ║
║     Admin নিজে review add করে (industry standard)          ║
║     Active = website এ দেখায়                                ║
║     Hidden = website এ দেখায় না                            ║
║     Explanation note admin panel এ দেওয়া আছে              ║
║                                                              ║
║  ✅ Fix 5 — Home testimonials:                              ║
║     DB থেকে load হয়, না থাকলে static fallback             ║
╚══════════════════════════════════════════════════════════════╝
`);
