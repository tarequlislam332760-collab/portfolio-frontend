import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Ariful Islam",
    role: "CEO, TechBD",
    avatar: "🧑‍💼",
    rating: 5,
    text: "অসাধারণ কাজ! সময়মতো deliver করেছে এবং quality একদম top-notch। আমাদের platform এর performance অনেক বেড়েছে। আবার কাজ করব ইনশাআল্লাহ।",
    color: "#6366f1",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, DesignHub",
    avatar: "👩‍🎨",
    rating: 5,
    text: "Excellent developer! The attention to detail and clean code quality impressed us greatly. Our e-commerce site conversion rate increased by 40% after the redesign.",
    color: "#ec4899",
  },
  {
    name: "Karim Hossain",
    role: "CTO, StartupDhaka",
    avatar: "👨‍💻",
    rating: 5,
    text: "React এবং Node.js এ দক্ষতা অসাধারণ। Backend API design করেছে যেটা অনেক scalable। Communication ও খুব ভালো ছিল পুরো project এ।",
    color: "#10b981",
  },
  {
    name: "Emma Johnson",
    role: "Product Manager, FinTech Co",
    avatar: "👩‍💼",
    rating: 5,
    text: "Delivered a complex fintech dashboard ahead of schedule. The real-time data visualization and security implementation were exactly what we needed. Highly recommended!",
    color: "#f59e0b",
  },
  {
    name: "Rahul Sharma",
    role: "Director, EduPlatform",
    avatar: "👨‍🏫",
    rating: 5,
    text: "Built our entire LMS from scratch. Video streaming, quiz system, payment integration — everything works perfectly. Very professional and responsive developer.",
    color: "#8b5cf6",
  },
];

const Stars = ({ count }) => (
  <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: "#fbbf24", fontSize: "16px" }}>★</span>
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current) % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg, #080810 0%, #0a0a0f 100%)",
      padding: "120px 0",
      position: "relative",
      fontFamily: "'Syne', sans-serif",
      overflow: "hidden",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');`}</style>

      {/* Decorative quote */}
      <div style={{
        position: "absolute", top: "60px", left: "50%", transform: "translateX(-50%)",
        fontSize: "300px", color: "rgba(99,102,241,0.03)", fontFamily: "serif",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>
        "
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, transparent, #6366f1)" }} />
            <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>Testimonials</span>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
            Client{" "}
            <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Reviews
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "48px" }}>
          {visible.map((t, i) => (
            <motion.div
              key={`${current}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: i === 1 ? `linear-gradient(135deg, ${t.color}18, ${t.color}08)` : "rgba(255,255,255,0.02)",
                border: `1px solid ${i === 1 ? t.color + "35" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "24px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {i === 1 && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                }} />
              )}

              <Stars count={t.rating} />

              <p style={{
                color: "#aaaacc", fontSize: "14px", lineHeight: "1.8",
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic", marginBottom: "28px",
              }}>
                "{t.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "46px", height: "46px", borderRadius: "50%",
                  background: `${t.color}20`,
                  border: `2px solid ${t.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px",
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}>{t.name}</div>
                  <div style={{ color: "#666688", fontSize: "13px" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <button onClick={prev} style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>←</button>

          <div style={{ display: "flex", gap: "8px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px", borderRadius: "50px",
                  background: i === current ? "#6366f1" : "rgba(255,255,255,0.15)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <button onClick={next} style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>→</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;