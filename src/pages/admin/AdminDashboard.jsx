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
        setStats(res.data?.data || res.data);
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
    if (stats.skills !== undefined && key === "totalSkills") return stats.skills;
    return fallback;
  };

  const cards = [
    { icon: "🚀", title: "Live Projects", value: loading ? "..." : String(get("totalProjects")), change: 100, color: "#00D4AA" },
    { icon: "✍️", title: "Blog Posts",    value: loading ? "..." : String(get("totalBlogs")),    change: 20,  color: "#38BDF8" },
    { icon: "✉️", title: "Messages",      value: loading ? "..." : String(get("totalMessages")), change: get("unreadMessages"), color: "#818CF8" },
    { icon: "⭐", title: "Reviews",       value: loading ? "..." : String(get("totalTestimonials")), change: 0, color: "#f472b6" },
    { icon: "⚡", title: "Skills",        value: loading ? "..." : String(get("totalSkills")), change: 0, color: "#f59e0b" },
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
