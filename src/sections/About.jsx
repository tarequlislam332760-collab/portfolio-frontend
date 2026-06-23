import { motion } from "framer-motion";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "50+", label: "Projects Done" },
  { value: "30+", label: "Happy Clients" },
  { value: "10+", label: "Technologies" },
];

const About = () => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');`}</style>

      {/* Background Glow */}
      <div style={{
        position: "absolute", top: "10%", left: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "0", right: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "60px" }}
        >
          <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #6366f1, #ec4899)" }} />
          <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>
            About Me
          </span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative" }}
          >
            <div style={{
              width: "100%", aspectRatio: "4/5",
              background: "linear-gradient(135deg, #1a1a2e, #16213e)",
              borderRadius: "24px",
              border: "1px solid rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {/* Placeholder Avatar */}
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "48px",
              }}>👨‍💻</div>

              {/* Corner Accent */}
              <div style={{
                position: "absolute", top: "-1px", right: "-1px",
                width: "80px", height: "80px",
                borderTop: "2px solid #6366f1", borderRight: "2px solid #6366f1",
                borderRadius: "0 24px 0 0",
              }} />
              <div style={{
                position: "absolute", bottom: "-1px", left: "-1px",
                width: "80px", height: "80px",
                borderBottom: "2px solid #ec4899", borderLeft: "2px solid #ec4899",
                borderRadius: "0 0 0 24px",
              }} />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{
                position: "absolute", bottom: "40px", right: "-20px",
                background: "rgba(99,102,241,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "16px", padding: "16px 20px",
              }}
            >
              <div style={{ color: "#fff", fontSize: "22px", fontWeight: "800" }}>3+</div>
              <div style={{ color: "#a0a0b8", fontSize: "11px", marginTop: "2px" }}>Years Experience</div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 style={{
              fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#ffffff",
              lineHeight: "1.1", marginBottom: "24px",
            }}>
              Passionate about{" "}
              <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                crafting digital
              </span>{" "}
              experiences
            </h2>

            <p style={{ color: "#8888aa", fontSize: "16px", lineHeight: "1.8", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
              আমি একজন Full-Stack Developer যে modern web technologies দিয়ে beautiful, performant applications তৈরি করি। আমার লক্ষ্য হল প্রতিটি project এ exceptional user experience deliver করা।
            </p>
            <p style={{ color: "#8888aa", fontSize: "16px", lineHeight: "1.8", fontFamily: "'DM Sans', sans-serif", marginBottom: "40px" }}>
              React, Node.js, MongoDB এবং আরো অনেক technology নিয়ে কাজ করার অভিজ্ঞতা আছে। প্রতিটি challenge কে opportunity হিসেবে দেখি।
            </p>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    padding: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: "13px", color: "#6666aa", marginTop: "4px" }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/cv.pdf" download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                marginTop: "40px", padding: "14px 32px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", borderRadius: "50px", textDecoration: "none",
                fontWeight: "600", fontSize: "15px",
                boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              }}
            >
              Download CV
              <span>↓</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;