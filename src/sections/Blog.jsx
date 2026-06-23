import { motion } from "framer-motion";

const posts = [
  {
    title: "React 19 এর নতুন Features — যা জানা দরকার",
    excerpt: "React 19 এ Actions, useOptimistic, use() hook সহ অনেক exciting feature এসেছে। এই গুলো কীভাবে কাজ করে এবং আপনার project এ কীভাবে ব্যবহার করবেন তা নিয়ে আলোচনা।",
    category: "React",
    readTime: "5 min read",
    date: "Mar 12, 2025",
    emoji: "⚛️",
    color: "#6366f1",
  },
  {
    title: "MongoDB Aggregation Pipeline — Advanced Guide",
    excerpt: "Complex data queries কে simple করতে MongoDB aggregation pipeline এর powerful stages ব্যবহার করুন। Real-world examples সহ step-by-step breakdown।",
    category: "Backend",
    readTime: "8 min read",
    date: "Feb 28, 2025",
    emoji: "🍃",
    color: "#10b981",
  },
  {
    title: "Framer Motion দিয়ে Professional Animations",
    excerpt: "Website কে life দিতে Framer Motion এর advanced features — layout animations, shared layout, gesture, scroll-linked animations নিয়ে complete guide।",
    category: "Animation",
    readTime: "6 min read",
    date: "Feb 10, 2025",
    emoji: "✨",
    color: "#ec4899",
  },
  {
    title: "JWT Authentication — Best Practices 2025",
    excerpt: "Secure authentication system তৈরি করুন। Access token, refresh token rotation, httpOnly cookies এবং common security pitfalls avoid করার উপায়।",
    category: "Security",
    readTime: "7 min read",
    date: "Jan 25, 2025",
    emoji: "🔐",
    color: "#f59e0b",
  },
  {
    title: "Vite vs Webpack — Which One to Choose?",
    excerpt: "Modern build tools এর তুলনামূলক বিশ্লেষণ। Performance, ecosystem, configuration এবং কোন project এ কোনটি ব্যবহার করা উচিত সে সম্পর্কে।",
    category: "Tools",
    readTime: "4 min read",
    date: "Jan 08, 2025",
    emoji: "⚡",
    color: "#8b5cf6",
  },
  {
    title: "Tailwind CSS v4 — Complete Overview",
    excerpt: "Tailwind CSS v4 এর সাথে আসা revolutionary changes — oxide engine, zero-config setup, CSS-first configuration এবং performance improvements নিয়ে।",
    category: "CSS",
    readTime: "5 min read",
    date: "Dec 20, 2024",
    emoji: "🎨",
    color: "#06b6d4",
  },
];

const Blog = ({ navigate }) => {
  return (
    <section style={{
      background: "#0a0a0f",
      padding: "120px 0",
      position: "relative",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400&display=swap');`}</style>

      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, transparent, #6366f1)" }} />
              <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>Blog</span>
            </div>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
              Latest{" "}
              <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Articles
              </span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate && navigate("blog")}
            style={{
              padding: "12px 28px",
              background: "transparent",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: "50px",
              color: "#8888bb",
              fontSize: "14px", fontWeight: "600",
              cursor: "pointer", fontFamily: "'Syne', sans-serif",
              transition: "all 0.3s",
            }}
          >
            View All →
          </motion.button>
        </motion.div>

        {/* Blog Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.3s",
              }}
            >
              {/* Top Banner */}
              <div style={{
                height: "120px",
                background: `linear-gradient(135deg, ${post.color}20, ${post.color}08)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "48px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
              }}>
                {post.emoji}
                <span style={{
                  position: "absolute", top: "12px", left: "16px",
                  background: `${post.color}20`, border: `1px solid ${post.color}35`,
                  color: post.color, fontSize: "10px", fontWeight: "700",
                  padding: "3px 10px", borderRadius: "50px", letterSpacing: "1px",
                  textTransform: "uppercase",
                }}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: "12px",
                }}>
                  <span style={{ color: "#555577", fontSize: "12px" }}>{post.date}</span>
                  <span style={{ color: "#555577", fontSize: "12px" }}>{post.readTime}</span>
                </div>

                <h3 style={{
                  color: "#fff", fontSize: "16px", fontWeight: "700",
                  lineHeight: "1.4", marginBottom: "12px",
                }}>
                  {post.title}
                </h3>

                <p style={{
                  color: "#666688", fontSize: "13px", lineHeight: "1.6",
                  fontFamily: "'DM Sans', sans-serif", marginBottom: "20px",
                  display: "-webkit-box", WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  color: post.color, fontSize: "13px", fontWeight: "600",
                  display: "flex", alignItems: "center", gap: "6px",
                }}>
                  Read More <span>→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;