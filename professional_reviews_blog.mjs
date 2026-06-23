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
// 1. TestimonialsSection — Professional auto-scroll carousel
// ══════════════════════════════════════════
write(path.join(src, "components/TestimonialsSection.jsx"), `
import React, { useEffect, useState, useRef } from "react";
import { testimonialsAPI } from "../services/api";

const STATIC = [
  { _id:"1", name:"Ariful Islam",   role:"CEO, TechBD",        text:"Tarek delivered our platform on time with exceptional quality. Clean code, scalable, and the UI exceeded all expectations.", avatar:"🧑‍💼", rating:5 },
  { _id:"2", name:"Sarah Mitchell", role:"Founder, DesignHub",  text:"Working with Tarek on our marketing strategy was a game-changer. Our conversion rate increased 40% in just 3 months.", avatar:"👩‍💻", rating:5 },
  { _id:"3", name:"Karim Hossain",  role:"CTO, StartupDhaka",   text:"Outstanding full-stack skills. Built our entire Node.js backend — fast, secure, and well-documented.", avatar:"👨‍💼", rating:5 },
  { _id:"4", name:"Nadia Rahman",   role:"CEO, ShopBD",         text:"The e-commerce platform Tarek built exceeded our expectations. Clean, fast, and exactly what our customers needed.", avatar:"👩‍🎨", rating:5 },
  { _id:"5", name:"James Wilson",   role:"Director, PixelForce", text:"Tarek's SEO work helped us rank on page 1 for our main keywords within 60 days. Highly recommended!", avatar:"👨‍🔬", rating:5 },
];

function StarRating({ n }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= n ? "#f59e0b" : "rgba(255,255,255,0.15)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ navigate }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    testimonialsAPI.getAll()
      .then(res => setReviews(res.data?.length > 0 ? res.data : STATIC))
      .catch(() => setReviews(STATIC))
      .finally(() => setLoading(false));
  }, []);

  // Auto advance
  useEffect(() => {
    if (reviews.length === 0 || isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % reviews.length);
    }, 3800);
    return () => clearInterval(timerRef.current);
  }, [reviews.length, isPaused]);

  const displayReviews = reviews.length > 0 ? reviews : STATIC;

  return (
    <section style={{ padding: "clamp(60px,8vw,100px) 0", background: "#07101E", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(244,114,182,0.3),transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(244,114,182,0.05),transparent 65%)", pointerEvents: "none" }} />

      {/* Section title */}
      <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)", padding: "0 clamp(20px,5vw,80px)" }}>
        <div style={{ display: "inline-block", background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.22)", borderRadius: 99, padding: "5px 16px", fontSize: "0.72rem", color: "#f472b6", marginBottom: "1rem", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Testimonials
        </div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", letterSpacing: "-0.5px" }}>
          Client <span style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reviews</span>
        </h2>
        <div style={{ width: 56, height: 4, background: "linear-gradient(90deg,#f472b6,#818CF8)", borderRadius: 2, margin: "1rem auto 0" }} />
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(244,114,182,0.1)", borderTop: "3px solid #f472b6", animation: "spin 1s linear infinite" }} />
        </div>
      ) : (
        <>
          {/* ── FEATURED REVIEW (large) ── */}
          <div style={{ maxWidth: 800, margin: "0 auto clamp(2rem,4vw,3rem)", padding: "0 clamp(20px,5vw,80px)" }}>
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 28, padding: "clamp(24px,4vw,44px)", position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", transition: "border-color 0.3s" }}>
              {/* Decoration */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#f472b6,#818CF8,#38BDF8)" }} />
              <div style={{ position: "absolute", top: 20, left: 24, fontSize: "5rem", color: "rgba(244,114,182,0.07)", fontFamily: "Georgia", lineHeight: 1, pointerEvents: "none" }}>"</div>
              <div style={{ position: "absolute", bottom: 16, right: 24, fontSize: "3.5rem", color: "rgba(129,140,248,0.06)", fontFamily: "Georgia", lineHeight: 1, pointerEvents: "none", transform: "rotate(180deg)" }}>"</div>

              {/* Stars */}
              <div style={{ marginBottom: 20, display: "flex", gap: 3 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.5))" }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem,2.2vw,1.2rem)", lineHeight: 1.85, fontStyle: "italic", marginBottom: 28, fontFamily: "var(--font-body)", position: "relative", zIndex: 1 }}>
                "{displayReviews[activeIdx]?.text}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,rgba(244,114,182,0.2),rgba(129,140,248,0.2))", border: "2px solid rgba(244,114,182,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, boxShadow: "0 0 20px rgba(244,114,182,0.2)" }}>
                  {displayReviews[activeIdx]?.avatar}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{displayReviews[activeIdx]?.name}</div>
                  <div style={{ color: "#f472b6", fontSize: "0.82rem", fontFamily: "var(--font-body)", marginTop: 2 }}>{displayReviews[activeIdx]?.role}</div>
                </div>
                <div style={{ marginLeft: "auto", background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                  <div style={{ color: "#f472b6", fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-head)" }}>{displayReviews[activeIdx]?.rating || 5}.0</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontFamily: "var(--font-body)" }}>Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── THUMBNAIL CARDS (smaller, horizontal scroll) ── */}
          <div style={{ padding: "0 clamp(20px,5vw,80px)", overflowX: "auto", scrollbarWidth: "none" }}>
            <div ref={trackRef} style={{ display: "flex", gap: "clamp(10px,2vw,16px)", width: "max-content", margin: "0 auto", paddingBottom: 4 }}>
              {displayReviews.map((r, i) => (
                <div key={r._id || i}
                  onClick={() => { setActiveIdx(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                  style={{
                    width: "clamp(200px,22vw,260px)", flexShrink: 0,
                    background: i === activeIdx ? "rgba(244,114,182,0.08)" : "rgba(255,255,255,0.02)",
                    border: i === activeIdx ? "1px solid rgba(244,114,182,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: "clamp(14px,2vw,18px)", cursor: "pointer",
                    transition: "all 0.35s ease",
                    transform: i === activeIdx ? "scale(1.02)" : "scale(1)",
                    boxShadow: i === activeIdx ? "0 8px 24px rgba(244,114,182,0.15)" : "none",
                  }}>
                  <p style={{ color: i === activeIdx ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)", fontSize: "0.8rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: 12, fontFamily: "var(--font-body)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    "{r.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: i === activeIdx ? "rgba(244,114,182,0.15)" : "rgba(255,255,255,0.06)", border: \`1px solid \${i === activeIdx ? "rgba(244,114,182,0.3)" : "rgba(255,255,255,0.1)"}\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{r.avatar}</div>
                    <div>
                      <div style={{ color: i === activeIdx ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.78rem", fontFamily: "var(--font-head)" }}>{r.name}</div>
                      <div style={{ color: i === activeIdx ? "#f472b6" : "rgba(255,255,255,0.25)", fontSize: "0.7rem", fontFamily: "var(--font-body)", marginTop: 1 }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Progress dots ── */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: "clamp(1.5rem,3vw,2rem)" }}>
            {displayReviews.map((_, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                style={{ width: i === activeIdx ? 32 : 8, height: 8, borderRadius: 99, background: i === activeIdx ? "linear-gradient(90deg,#f472b6,#818CF8)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s ease", boxShadow: i === activeIdx ? "0 0 8px rgba(244,114,182,0.5)" : "none" }} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
`);

// ══════════════════════════════════════════
// 2. Blog.jsx — fully responsive with all icons
// ══════════════════════════════════════════
write(path.join(src, "pages/Blog.jsx"), `
import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { blogsAPI } from "../services/api";

const CAT_CONFIG = {
  "React":        { icon: "⚛️",  color: "#61DAFB", bg: "rgba(97,218,251,0.08)",  border: "rgba(97,218,251,0.2)" },
  "Node.js":      { icon: "🟢",  color: "#68A063", bg: "rgba(104,160,99,0.08)",  border: "rgba(104,160,99,0.2)" },
  "MongoDB":      { icon: "🍃",  color: "#4DB33D", bg: "rgba(77,179,61,0.08)",   border: "rgba(77,179,61,0.2)" },
  "Express":      { icon: "⚙️",  color: "#cccccc", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)" },
  "Next.js":      { icon: "▲",   color: "#ffffff", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)" },
  "JavaScript":   { icon: "📜",  color: "#F7DF1E", bg: "rgba(247,223,30,0.08)",  border: "rgba(247,223,30,0.2)" },
  "TypeScript":   { icon: "📘",  color: "#3178C6", bg: "rgba(49,120,198,0.08)",  border: "rgba(49,120,198,0.2)" },
  "SEO":          { icon: "🔍",  color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)" },
  "Marketing":    { icon: "📈",  color: "#f472b6", bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.2)" },
  "Facebook Ads": { icon: "📘",  color: "#1877F2", bg: "rgba(24,119,242,0.08)",  border: "rgba(24,119,242,0.2)" },
  "Google Ads":   { icon: "🎯",  color: "#EA4335", bg: "rgba(234,67,53,0.08)",   border: "rgba(234,67,53,0.2)" },
  "Tailwind CSS": { icon: "🌊",  color: "#06B6D4", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.2)" },
  "Git":          { icon: "🌿",  color: "#F05031", bg: "rgba(240,80,49,0.08)",   border: "rgba(240,80,49,0.2)" },
  "default":      { icon: "✍️",  color: "#38BDF8", bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.2)" },
};

const getCfg = (cat) => CAT_CONFIG[cat] || CAT_CONFIG["default"];

const FALLBACK = [
  { _id:"1", emoji:"⚛️", category:"React",     title:"React 19: What You Need to Know",         excerpt:"Server Components, new hooks, Suspense improvements and more.",    readTime:"6",  color:"#61DAFB", createdAt:"2025-03-01" },
  { _id:"2", emoji:"🍃", category:"MongoDB",   title:"Advanced Aggregation Pipelines",           excerpt:"Master lookup, unwind, facet for complex query operations.",        readTime:"8",  color:"#4DB33D", createdAt:"2025-02-01" },
  { _id:"3", emoji:"🔍", category:"SEO",       title:"Complete SEO Guide for 2025",              excerpt:"Technical SEO, Core Web Vitals, keyword strategy that ranks.",      readTime:"10", color:"#34d399", createdAt:"2025-01-01" },
  { _id:"4", emoji:"📈", category:"Marketing", title:"Facebook Ads That Actually Convert",       excerpt:"Audience targeting, creative strategy, and scaling profitable ads.",  readTime:"7",  color:"#f472b6", createdAt:"2024-12-01" },
  { _id:"5", emoji:"🟢", category:"Node.js",   title:"Building REST APIs with Node.js",          excerpt:"Express, middleware, JWT authentication, MongoDB integration.",       readTime:"9",  color:"#68A063", createdAt:"2024-11-01" },
  { _id:"6", emoji:"🎯", category:"Google Ads",title:"Google Ads Mastery Guide",                 excerpt:"Campaign setup, bidding strategies, conversion tracking 2025.",      readTime:"8",  color:"#EA4335", createdAt:"2024-10-01" },
];

export default function Blog() {
  const [blogs, setBlogs]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch]       = useState("");

  useEffect(() => {
    blogsAPI.getAll()
      .then(res => setBlogs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : FALLBACK;
  const cats = ["All", ...new Set(displayBlogs.map(b => b.category).filter(Boolean))];

  const filtered = displayBlogs.filter(b => {
    const matchCat = activeCat === "All" || b.category === activeCat;
    const matchSearch = !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="Blog | Tarikul Islam Tarek — MERN & Marketing" description="Read articles on MERN stack development, SEO, digital marketing by Tarikul Islam Tarek." />

      <div style={{ padding: "clamp(40px,7vw,80px) clamp(16px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle pre="Blog" title="Latest" highlight="Articles" sub="Insights on MERN development and digital marketing" />

        {/* Search + Filter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,2vw,20px)", alignItems: "center", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>

          {/* Search bar */}
          <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
            <input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", paddingLeft: 44, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 99, color: "#fff", fontSize: "0.88rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "#38BDF8"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
          </div>

          {/* Category tabs — horizontal scroll on mobile */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", maxWidth: "100%", overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
            {cats.map(cat => {
              const cfg = getCfg(cat);
              const active = activeCat === cat;
              return (
                <button key={cat} onClick={() => setActiveCat(cat)}
                  style={{
                    padding: "8px clamp(12px,2vw,18px)", borderRadius: 99, cursor: "pointer",
                    fontSize: "clamp(0.74rem,1.8vw,0.82rem)", fontWeight: active ? 700 : 500, fontFamily: "var(--font-body)",
                    background: active ? (cat === "All" ? "linear-gradient(135deg,#00D4AA,#38BDF8)" : cfg.bg.replace("0.08","0.18")) : "rgba(255,255,255,0.03)",
                    border: active ? "none" : "1px solid rgba(255,255,255,0.07)",
                    color: active ? (cat === "All" ? "#050A14" : cfg.color) : "rgba(255,255,255,0.45)",
                    display: "inline-flex", alignItems: "center", gap: 5,
                    transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                  {cat !== "All" && <span style={{ fontSize: "0.88rem" }}>{cfg.icon}</span>}
                  {cat}
                  {cat !== "All" && (
                    <span style={{ background: active ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)", borderRadius: 99, padding: "1px 6px", fontSize: "0.68rem" }}>
                      {displayBlogs.filter(b => b.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid rgba(56,189,248,0.1)", borderTop: "3px solid #38BDF8", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>Loading articles...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>No articles found for "{search || activeCat}"</p>
            <button onClick={() => { setSearch(""); setActiveCat("All"); }}
              style={{ marginTop: 16, background: "transparent", color: "#38BDF8", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontFamily: "var(--font-body)" }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(260px,28vw,320px),1fr))", gap: "clamp(14px,2.5vw,24px)" }}>
            {filtered.map((p, idx) => {
              const cfg = getCfg(p.category);
              return (
                <div key={p._id}
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(16px,2.5vw,24px)", cursor: "pointer", transition: "transform .3s,border-color .3s,box-shadow .3s", display: "flex", flexDirection: "column", animation: \`fadeUp 0.5s ease \${idx * 0.06}s both\` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.borderColor = cfg.border; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>

                  {/* Top bar */}
                  <div style={{ height: 3, background: \`linear-gradient(90deg,\${cfg.color},transparent)\`, borderRadius: "3px 3px 0 0", margin: "-clamp(16px,2.5vw,24px) -clamp(16px,2.5vw,24px) clamp(16px,2.5vw,20px)", padding: 0 }} />

                  {/* Category + read time */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(12px,2vw,16px)" }}>
                    <span style={{ background: cfg.bg, border: \`1px solid \${cfg.border}\`, color: cfg.color, borderRadius: 99, padding: "4px clamp(8px,1.5vw,12px)", fontSize: "clamp(0.68rem,1.5vw,0.74rem)", fontWeight: 700, fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span>{cfg.icon}</span> {p.category}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.74rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>
                      ⏱ {p.readTime} min
                    </span>
                  </div>

                  {/* Icon box */}
                  <div style={{ width: "clamp(48px,8vw,60px)", height: "clamp(48px,8vw,60px)", borderRadius: "clamp(12px,2vw,16px)", background: cfg.bg, border: \`1px solid \${cfg.border}\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(1.4rem,3.5vw,1.8rem)", marginBottom: "clamp(12px,2vw,16px)", flexShrink: 0 }}>
                    {p.emoji || cfg.icon}
                  </div>

                  <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(0.92rem,2vw,1.05rem)", marginBottom: "clamp(6px,1vw,10px)", lineHeight: 1.4, color: "#fff" }}>{p.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "clamp(0.78rem,1.6vw,0.85rem)", lineHeight: 1.8, fontFamily: "var(--font-body)", flex: 1 }}>{p.excerpt}</p>

                  <div style={{ marginTop: "clamp(12px,2vw,16px)", paddingTop: "clamp(10px,1.5vw,14px)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.74rem", fontFamily: "var(--font-body)" }}>
                      {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <span style={{ color: cfg.color, fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4, transition: "gap 0.2s" }}>
                      Read →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Result count */}
        {!loading && (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", fontFamily: "var(--font-body)", marginTop: "2rem" }}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} {activeCat !== "All" ? \`in "\${activeCat}"\` : ""} {search ? \`matching "\${search}"\` : ""}
          </p>
        )}
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 3. AdminBlog responsive fix
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminBlog.jsx"), `
import React, { useEffect, useState } from "react";
import { blogsAPI } from "../../services/api";

const CAT_CONFIG = {
  "React":        { icon:"⚛️",  color:"#61DAFB" },
  "Node.js":      { icon:"🟢",  color:"#68A063" },
  "MongoDB":      { icon:"🍃",  color:"#4DB33D" },
  "Express":      { icon:"⚙️",  color:"#cccccc" },
  "Next.js":      { icon:"▲",   color:"#ffffff" },
  "JavaScript":   { icon:"📜",  color:"#F7DF1E" },
  "TypeScript":   { icon:"📘",  color:"#3178C6" },
  "SEO":          { icon:"🔍",  color:"#34d399" },
  "Marketing":    { icon:"📈",  color:"#f472b6" },
  "Facebook Ads": { icon:"📘",  color:"#1877F2" },
  "Google Ads":   { icon:"🎯",  color:"#EA4335" },
  "Tailwind CSS": { icon:"🌊",  color:"#06B6D4" },
  "Git":          { icon:"🌿",  color:"#F05031" },
};
const CATS   = Object.keys(CAT_CONFIG);
const EMOJIS = ["✍️","⚛️","🍃","📈","🎯","📚","🌐","⚙️","💡","🔥","🟢","📜","🌊","🔍","📘","🎨","🛒","📱","⭐","🚀","💼","📊"];
const DEF = { title:"", excerpt:"", content:"", category:"React", emoji:"✍️", readTime:"5", color:"#38BDF8", published:true };

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
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const setCat = (cat) => {
    const cfg = CAT_CONFIG[cat];
    setForm(f => ({ ...f, category: cat, emoji: cfg?.icon || "✍️", color: cfg?.color || "#38BDF8" }));
  };

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.name === "category") { setCat(val); return; }
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const openAdd  = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (b) => { setForm({...b}); setEditing(b._id); setShowForm(true); };
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

  const filtered = blogs.filter(b =>
    !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase())
  );

  const inputSt = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:10, padding:"12px 14px", color:"#fff", fontSize:"0.88rem",
    fontFamily:"var(--font-body)", outline:"none", marginBottom:"1rem",
    boxSizing:"border-box", transition:"border-color 0.2s",
  };

  return (
    <div style={{ animation:"fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"clamp(1rem,3vw,1.8rem)", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", marginBottom:"0.2rem" }}>Blog Posts</h2>
          <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)" }}>MongoDB তে save — website এ automatically দেখায়</p>
        </div>
        <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#38BDF8,#818CF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:800, fontSize:"0.85rem", cursor:"pointer", fontFamily:"var(--font-body)", whiteSpace:"nowrap" }}>
          + New Post
        </button>
      </div>

      {/* Search + stats */}
      <div style={{ display:"flex", gap:10, marginBottom:"1.2rem", flexWrap:"wrap", alignItems:"center" }}>
        <input placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{ ...inputSt, marginBottom:0, flex:"1 1 200px", maxWidth:260 }}
          onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
        {[["All",blogs.length,"#fff"],["Live",blogs.filter(b=>b.published).length,"#00D4AA"],["Draft",blogs.filter(b=>!b.published).length,"#f59e0b"]].map(([l,n,c])=>(
          <div key={l} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:9, padding:"7px 14px", display:"flex", gap:7, alignItems:"center", flexShrink:0 }}>
            <span style={{ color:c, fontWeight:700, fontFamily:"var(--font-head)" }}>{n}</span>
            <span style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", fontFamily:"var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
          <div style={{ width:40, height:40, borderRadius:"50%", border:"3px solid rgba(56,189,248,0.1)", borderTop:"3px solid #38BDF8", animation:"spin 1s linear infinite" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.09)", borderRadius:14, padding:"3rem", textAlign:"center" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.8rem" }}>✍️</div>
          <p style={{ color:"rgba(255,255,255,0.35)", fontFamily:"var(--font-body)", marginBottom:"1rem", fontSize:"0.9rem" }}>No posts yet.</p>
          <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#38BDF8,#818CF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:800, cursor:"pointer", fontFamily:"var(--font-body)" }}>Write First Post</button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          {filtered.map(b => {
            const cfg = CAT_CONFIG[b.category] || { icon:"✍️", color:"#38BDF8" };
            return (
              <div key={b._id} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"clamp(12px,2vw,18px)", display:"flex", alignItems:"center", gap:"clamp(10px,2vw,14px)", flexWrap:"wrap", transition:"border-color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(56,189,248,0.2)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                <div style={{ width:44, height:44, borderRadius:11, background:\`\${cfg.color}15\`, border:\`1px solid \${cfg.color}30\`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.35rem", flexShrink:0 }}>
                  {b.emoji || cfg.icon}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:3 }}>
                    <span style={{ color:cfg.color, fontSize:"0.7rem", fontWeight:700, fontFamily:"var(--font-body)" }}>{cfg.icon} {b.category}</span>
                    <span style={{ background:b.published?"rgba(0,212,170,0.1)":"rgba(245,158,11,0.1)", color:b.published?"#00D4AA":"#f59e0b", padding:"1px 7px", borderRadius:99, fontSize:"0.68rem", fontWeight:700, fontFamily:"var(--font-body)" }}>{b.published?"Live":"Draft"}</span>
                    <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.7rem" }}>{b.readTime}m</span>
                  </div>
                  <h4 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"clamp(0.85rem,2vw,0.92rem)", color:"#fff", margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.title}</h4>
                  <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.78rem", fontFamily:"var(--font-body)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.excerpt}</p>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0, flexWrap:"wrap" }}>
                  <button onClick={()=>togglePublish(b)} style={{ background:b.published?"rgba(245,158,11,0.1)":"rgba(0,212,170,0.1)", border:\`1px solid \${b.published?"rgba(245,158,11,0.2)":"rgba(0,212,170,0.2)"}\`, borderRadius:8, padding:"5px 10px", color:b.published?"#f59e0b":"#00D4AA", cursor:"pointer", fontSize:"0.72rem", fontWeight:600, fontFamily:"var(--font-body)" }}>
                    {b.published?"Unpublish":"Publish"}
                  </button>
                  <button onClick={()=>openEdit(b)} style={{ background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.2)", borderRadius:8, padding:"5px 10px", color:"#38BDF8", cursor:"pointer", fontSize:"0.72rem", fontWeight:600, fontFamily:"var(--font-body)" }}>Edit</button>
                  <button onClick={()=>del(b._id,b.title)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, padding:"5px 10px", color:"#f87171", cursor:"pointer", fontSize:"0.72rem", fontWeight:600, fontFamily:"var(--font-body)" }}>Del</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.9)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"clamp(10px,3vw,20px)", backdropFilter:"blur(16px)" }}>
          <div style={{ background:"linear-gradient(135deg,#0d1629,#080f1c)", border:"1px solid rgba(56,189,248,0.18)", borderRadius:24, padding:"clamp(18px,4vw,36px)", width:"100%", maxWidth:560, maxHeight:"95vh", overflowY:"auto", animation:"scaleIn 0.3s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ color:"#fff", fontSize:"clamp(1rem,3vw,1.25rem)", fontWeight:800, margin:0, fontFamily:"var(--font-head)" }}>{editing?"Edit Post":"New Blog Post"}</h3>
              <button onClick={closeForm} style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.5)", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:"1.2rem" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.15)";e.currentTarget.style.color="#f87171";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>✕</button>
            </div>

            {/* Category */}
            <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:8 }}>Category (icon auto-selects)</label>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
              {CATS.map(c=>{
                const cfg=CAT_CONFIG[c];
                return(
                  <button key={c} onClick={()=>setCat(c)}
                    style={{ padding:"6px 12px", borderRadius:99, border:form.category===c?\`1px solid \${cfg.color}66\`:"1px solid rgba(255,255,255,0.07)", background:form.category===c?\`\${cfg.color}15\`:"transparent", color:form.category===c?cfg.color:"rgba(255,255,255,0.35)", cursor:"pointer", fontSize:"0.76rem", fontWeight:form.category===c?700:400, fontFamily:"var(--font-body)", display:"inline-flex", alignItems:"center", gap:4, transition:"all 0.15s" }}>
                    <span>{cfg.icon}</span>{c}
                  </button>
                );
              })}
            </div>

            {/* Emoji */}
            <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:7 }}>Custom Emoji</label>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>
              {EMOJIS.map(e=><button key={e} onClick={()=>setForm(f=>({...f,emoji:e}))} style={{ fontSize:"1.1rem", padding:"6px", borderRadius:8, border:form.emoji===e?"2px solid #38BDF8":"2px solid transparent", background:form.emoji===e?"rgba(56,189,248,0.12)":"rgba(255,255,255,0.04)", cursor:"pointer" }}>{e}</button>)}
            </div>

            <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:5 }}>Title *</label>
            <input name="title" placeholder="Blog post title" value={form.title} onChange={inp} style={inputSt} onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />

            <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:5 }}>Short Description *</label>
            <textarea name="excerpt" placeholder="Brief description shown on blog page" value={form.excerpt} onChange={inp} rows={3} style={{ ...inputSt, resize:"vertical" }} onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />

            <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:5 }}>Full Content</label>
            <textarea name="content" placeholder="Full article content (optional)" value={form.content} onChange={inp} rows={5} style={{ ...inputSt, resize:"vertical" }} onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />

            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:"1.2rem", flexWrap:"wrap" }}>
              <div style={{ flex:1, minWidth:120 }}>
                <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:5 }}>Read Time (min)</label>
                <input name="readTime" placeholder="5" value={form.readTime} onChange={inp} style={{ ...inputSt, marginBottom:0 }} onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:9, paddingTop:20, flexShrink:0 }}>
                <input type="checkbox" name="published" checked={form.published} onChange={inp} style={{ width:18, height:18, accentColor:"#38BDF8", cursor:"pointer" }} />
                <label style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.88rem", fontFamily:"var(--font-body)", cursor:"pointer", whiteSpace:"nowrap" }}>Publish immediately</label>
              </div>
            </div>

            <div style={{ display:"flex", gap:10, marginTop:4 }}>
              <button onClick={closeForm} style={{ flex:1, padding:13, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"rgba(255,255,255,0.45)", cursor:"pointer", fontFamily:"var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex:2, padding:13, background:saving?"rgba(56,189,248,0.4)":"linear-gradient(135deg,#38BDF8,#818CF8)", border:"none", borderRadius:10, color:"#050A14", cursor:saving?"not-allowed":"pointer", fontWeight:800, fontFamily:"var(--font-body)" }}>
                {saving?"Saving...":(editing?"Update ✓":"Publish ✓")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{\`@media(max-width:768px){}\`}</style>
    </div>
  );
}
`);

console.log(`
╔══════════════════════════════════════════════════════════╗
║     ✅ সব update সম্পূর্ণ হয়েছে!                        ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  ✅ 1. Testimonials — Professional carousel:            ║
║     • বড় featured review উপরে                         ║
║     • ছোট thumbnail cards নিচে (click করে select)     ║
║     • Auto-advance every 3.8 seconds                   ║
║     • Hover করলে থেমে যায়                             ║
║     • Progress dots                                     ║
║     • DB থেকে load, fallback static                    ║
║                                                          ║
║  ✅ 2. Blog page — Responsive:                         ║
║     • Category filter tabs (scroll on mobile)           ║
║     • Search bar                                        ║
║     • Result count                                      ║
║     • Card size clamp() দিয়ে responsive               ║
║     • All MERN + Marketing icons                        ║
║                                                          ║
║  ✅ 3. Admin Blog — Responsive:                        ║
║     • Mobile এ compact layout                           ║
║     • Category icon auto-select                         ║
║     • Search + stats bar                                ║
║     • Publish/Edit/Delete সব কাজ করে                   ║
╚══════════════════════════════════════════════════════════╝
`);
