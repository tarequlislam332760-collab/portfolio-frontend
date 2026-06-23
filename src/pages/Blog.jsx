import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Blog() {
  const navigate = useNavigate();
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

  const displayBlogs = blogs;
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
                  onClick={() => navigate('/blog/' + p._id)}
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(16px,2.5vw,24px)", cursor: "pointer", transition: "transform .3s,border-color .3s,box-shadow .3s", display: "flex", flexDirection: "column", animation: `fadeUp 0.5s ease ${idx * 0.06}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.borderColor = cfg.border; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>

                  {/* Top bar */}
                  <div style={{ height: 3, background: `linear-gradient(90deg,${cfg.color},transparent)`, borderRadius: "3px 3px 0 0", margin: "-clamp(16px,2.5vw,24px) -clamp(16px,2.5vw,24px) clamp(16px,2.5vw,20px)", padding: 0 }} />

                  {/* Category + read time */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(12px,2vw,16px)" }}>
                    <span style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, borderRadius: 99, padding: "4px clamp(8px,1.5vw,12px)", fontSize: "clamp(0.68rem,1.5vw,0.74rem)", fontWeight: 700, fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span>{cfg.icon}</span> {p.category}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.74rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>
                      ⏱ {p.readTime} min
                    </span>
                  </div>

                  {/* Icon box */}
                  <div style={{ width: "clamp(48px,8vw,60px)", height: "clamp(48px,8vw,60px)", borderRadius: "clamp(12px,2vw,16px)", background: cfg.bg, border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(1.4rem,3.5vw,1.8rem)", marginBottom: "clamp(12px,2vw,16px)", flexShrink: 0 }}>
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
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} {activeCat !== "All" ? `in "${activeCat}"` : ""} {search ? `matching "${search}"` : ""}
          </p>
        )}
      </div>
    </main>
  );
}
