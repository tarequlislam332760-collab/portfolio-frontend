import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Vinance",
    category: "Full-Stack",
    description: "Crypto trading platform with real-time charts, wallet management, admin panel, and Cloudinary integration.",
    tech: ["React", "Node.js", "MongoDB", "Cloudinary"],
    color: "#6366f1",
    emoji: "📈",
    live: "#",
    github: "#",
  },
  {
    title: "E-Commerce Store",
    category: "Full-Stack",
    description: "Full-featured online shop with Stripe payment, product filters, cart system, and order tracking.",
    tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    color: "#ec4899",
    emoji: "🛍️",
    live: "#",
    github: "#",
  },
  {
    title: "Portfolio Ecosystem",
    category: "Frontend",
    description: "Modern developer portfolio with animated sections, blog, dark theme, and smooth page transitions.",
    tech: ["React", "Framer Motion", "Vite", "CSS"],
    color: "#10b981",
    emoji: "🎨",
    live: "#",
    github: "#",
  },
  {
    title: "Task Manager",
    category: "Full-Stack",
    description: "Collaborative task management app with drag-and-drop, real-time updates, and team features.",
    tech: ["React", "Socket.io", "Express", "MongoDB"],
    color: "#f59e0b",
    emoji: "✅",
    live: "#",
    github: "#",
  },
  {
    title: "Weather App",
    category: "Frontend",
    description: "Beautiful weather dashboard with 7-day forecast, location search, and animated weather icons.",
    tech: ["React", "OpenWeather API", "Chart.js"],
    color: "#06b6d4",
    emoji: "🌤️",
    live: "#",
    github: "#",
  },
  {
    title: "Blog CMS",
    category: "Full-Stack",
    description: "Headless CMS with markdown editor, image upload, category management, and SEO optimization.",
    tech: ["Next.js", "MongoDB", "Cloudinary", "MDX"],
    color: "#8b5cf6",
    emoji: "✍️",
    live: "#",
    github: "#",
  },
];

const filters = ["All", "Full-Stack", "Frontend"];

const Projects = ({ navigate }) => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <section style={{
      background: "#080810",
      padding: "120px 0",
      position: "relative",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400&display=swap');`}</style>

      <div style={{
        position: "absolute", top: "20%", right: "5%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, transparent, #6366f1)" }} />
            <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>Portfolio</span>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#fff", lineHeight: "1.1", marginBottom: "16px" }}>
            Featured{" "}
            <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "60px" }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: "10px 24px",
                borderRadius: "50px",
                border: active === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                background: active === f ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                color: active === f ? "#fff" : "#8888aa",
                fontSize: "14px", fontWeight: "600",
                cursor: "pointer", fontFamily: "'Syne', sans-serif",
                transition: "all 0.3s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Project Thumbnail */}
              <div style={{
                height: "180px",
                background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "64px", position: "relative",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                {p.emoji}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                }} />
                <span style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: `${p.color}20`, border: `1px solid ${p.color}40`,
                  color: p.color, fontSize: "11px", fontWeight: "600",
                  padding: "4px 10px", borderRadius: "50px", letterSpacing: "1px",
                }}>
                  {p.category}
                </span>
              </div>

              {/* Project Info */}
              <div style={{ padding: "28px" }}>
                <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ color: "#777799", fontSize: "13px", lineHeight: "1.6", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
                  {p.description}
                </p>

                {/* Tech Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {p.tech.map((t, ti) => (
                    <span key={ti} style={{
                      padding: "4px 12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "50px", color: "#9999bb", fontSize: "11px",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <a href={p.live} style={{
                    flex: 1, padding: "10px", textAlign: "center",
                    background: `linear-gradient(135deg, ${p.color}, ${p.color}99)`,
                    color: "#fff", borderRadius: "10px", textDecoration: "none",
                    fontSize: "13px", fontWeight: "600",
                  }}>
                    Live Demo ↗
                  </a>
                  <a href={p.github} style={{
                    flex: 1, padding: "10px", textAlign: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#aaaacc", borderRadius: "10px", textDecoration: "none",
                    fontSize: "13px", fontWeight: "600",
                  }}>
                    GitHub →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;