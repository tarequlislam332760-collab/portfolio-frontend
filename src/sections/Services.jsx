import { motion } from "framer-motion";

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description: "React, Next.js দিয়ে fast, responsive, এবং scalable web applications তৈরি করি। Modern UI/UX practices follow করি।",
    features: ["React / Next.js", "REST API Integration", "Responsive Design", "Performance Optimization"],
    color: "#6366f1",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description: "Node.js ও Express.js দিয়ে robust server-side solutions তৈরি করি। Secure API এবং database architecture design করি।",
    features: ["Node.js / Express", "MongoDB / SQL", "JWT Authentication", "RESTful APIs"],
    color: "#ec4899",
    featured: true,
  },
  {
    icon: "📱",
    title: "UI/UX Design",
    description: "Figma দিয়ে beautiful, user-centric designs তৈরি করি। Animation ও micro-interaction যোগ করে experience আরো ভালো করি।",
    features: ["Figma Design", "Framer Motion", "Design Systems", "Prototyping"],
    color: "#10b981",
  },
  {
    icon: "🚀",
    title: "Deployment & DevOps",
    description: "Vercel, Render, Railway তে application deploy করি। CI/CD pipeline setup করি এবং performance monitor করি।",
    features: ["Vercel / Render", "Docker Basics", "GitHub Actions", "Domain Setup"],
    color: "#f59e0b",
  },
  {
    icon: "🛒",
    title: "E-commerce Solutions",
    description: "Full-featured online stores তৈরি করি payment gateway integration সহ। Product management, cart, checkout সব কিছু।",
    features: ["Product Catalog", "Payment Gateway", "Order Management", "Admin Dashboard"],
    color: "#8b5cf6",
  },
  {
    icon: "🔒",
    title: "Auth & Security",
    description: "JWT, OAuth, bcrypt দিয়ে secure authentication system তৈরি করি। Role-based access control implement করি।",
    features: ["JWT / OAuth", "Role-based Access", "Data Encryption", "Security Audit"],
    color: "#06b6d4",
  },
];

const Services = () => {
  return (
    <section style={{
      background: "linear-gradient(180deg, #0a0a0f 0%, #080810 100%)",
      padding: "120px 0",
      position: "relative",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400&display=swap');`}</style>

      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

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
            <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>
              Services
            </span>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#fff", lineHeight: "1.1", marginBottom: "16px" }}>
            What I{" "}
            <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              offer
            </span>
          </h2>
          <p style={{ color: "#666688", fontSize: "16px", fontFamily: "'DM Sans', sans-serif", maxWidth: "500px", margin: "0 auto" }}>
            আপনার project এর জন্য best solution নিয়ে আসি। Quality এবং deadline এ কোনো compromise নেই।
          </p>
        </motion.div>

        {/* Services Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              style={{
                background: svc.featured
                  ? `linear-gradient(135deg, ${svc.color}18, ${svc.color}08)`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${svc.featured ? svc.color + "40" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "24px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {svc.featured && (
                <div style={{
                  position: "absolute", top: "20px", right: "20px",
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  color: "#fff", fontSize: "11px", fontWeight: "700",
                  padding: "4px 12px", borderRadius: "50px", letterSpacing: "1px",
                }}>
                  POPULAR
                </div>
              )}

              {/* Top accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)`,
              }} />

              {/* Icon */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "16px",
                background: `${svc.color}15`,
                border: `1px solid ${svc.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "26px", marginBottom: "24px",
              }}>
                {svc.icon}
              </div>

              <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
                {svc.title}
              </h3>

              <p style={{
                color: "#777799", fontSize: "14px", lineHeight: "1.7",
                fontFamily: "'DM Sans', sans-serif", marginBottom: "24px",
              }}>
                {svc.description}
              </p>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {svc.features.map((f, fi) => (
                  <li key={fi} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    color: "#9999bb", fontSize: "13px", marginBottom: "8px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <span style={{ color: svc.color, fontSize: "16px", lineHeight: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;