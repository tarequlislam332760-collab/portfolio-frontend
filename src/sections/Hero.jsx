import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const roles = ["Full-Stack Developer", "React Specialist", "Node.js Expert", "UI/UX Enthusiast"];

const Hero = ({ navigate }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #05050d 0%, #0a0a1a 50%, #05050d 100%)",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* Animated background orbs */}
      <div style={{
        position: "absolute", top: "15%", left: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "8%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
        animation: "float 10s ease-in-out infinite reverse",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Rotating ring */}
      <div style={{
        position: "absolute", top: "10%", right: "12%",
        width: "200px", height: "200px",
        border: "1px dashed rgba(99,102,241,0.15)",
        borderRadius: "50%",
        animation: "spin-slow 20s linear infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "8%",
        width: "120px", height: "120px",
        border: "1px dashed rgba(236,72,153,0.12)",
        borderRadius: "50%",
        animation: "spin-slow 15s linear infinite reverse",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 40px",
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1.1fr 1fr",
        gap: "60px", alignItems: "center",
        width: "100%",
      }}>

        {/* Left Content */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "8px 18px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "50px", marginBottom: "32px",
            }}
          >
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
              display: "inline-block",
              animation: "blink 2s infinite",
            }} />
            <span style={{ color: "#9999cc", fontSize: "13px", fontWeight: "500" }}>
              Available for freelance work
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "clamp(44px, 5.5vw, 72px)",
              fontWeight: "800", lineHeight: "1.05",
              color: "#ffffff", marginBottom: "20px",
            }}
          >
            Hi, I'm{" "}
            <span style={{
              background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Your Name
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "clamp(18px, 2.5vw, 26px)",
              fontWeight: "600", color: "#8888aa",
              marginBottom: "28px", minHeight: "36px",
              display: "flex", alignItems: "center", gap: "2px",
            }}
          >
            <span style={{ color: "#6366f1" }}>{"<"}</span>
            <span style={{ color: "#e2e2ff" }}>{displayed}</span>
            <span style={{
              display: "inline-block", width: "3px", height: "1.2em",
              background: "#6366f1", marginLeft: "2px",
              animation: "blink 1s infinite",
            }} />
            <span style={{ color: "#6366f1" }}>{"/>"}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              color: "#666688", fontSize: "16px", lineHeight: "1.8",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: "520px", marginBottom: "44px",
            }}
          >
            আমি beautiful, performant এবং scalable web applications তৈরি করি। React থেকে Node.js — full-stack development এ আমার passion আছে।
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "60px" }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate && navigate("contact")}
              style={{
                padding: "15px 36px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", borderRadius: "50px",
                color: "#fff", fontSize: "15px", fontWeight: "700",
                cursor: "pointer", fontFamily: "'Syne', sans-serif",
                boxShadow: "0 0 25px rgba(99,102,241,0.3)",
              }}
            >
              Hire Me →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate && navigate("projects")}
              style={{
                padding: "15px 36px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50px",
                color: "#aaaacc", fontSize: "15px", fontWeight: "700",
                cursor: "pointer", fontFamily: "'Syne', sans-serif",
                transition: "all 0.3s",
              }}
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: "40px" }}
          >
            {[
              { value: "3+", label: "Years Exp." },
              { value: "50+", label: "Projects" },
              { value: "30+", label: "Clients" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "#555577", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Avatar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", position: "relative" }}
        >
          {/* Main Card */}
          <div style={{
            width: "360px", height: "420px",
            background: "linear-gradient(135deg, #12122a, #1a1a35)",
            borderRadius: "32px",
            border: "1px solid rgba(99,102,241,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            boxShadow: "0 0 80px rgba(99,102,241,0.1)",
          }}>
            {/* Inner glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)",
            }} />

            {/* Avatar */}
            <div style={{ fontSize: "120px", position: "relative", zIndex: 1 }}>👨‍💻</div>

            {/* Corner accents */}
            <div style={{
              position: "absolute", top: "-1px", left: "-1px",
              width: "70px", height: "70px",
              borderTop: "2px solid #6366f1", borderLeft: "2px solid #6366f1",
              borderRadius: "32px 0 0 0",
            }} />
            <div style={{
              position: "absolute", bottom: "-1px", right: "-1px",
              width: "70px", height: "70px",
              borderBottom: "2px solid #ec4899", borderRight: "2px solid #ec4899",
              borderRadius: "0 0 32px 0",
            }} />
          </div>

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            style={{
              position: "absolute", top: "30px", right: "-20px",
              background: "rgba(99,102,241,0.12)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "16px", padding: "14px 18px",
            }}
          >
            <div style={{ color: "#fff", fontSize: "20px", fontWeight: "800" }}>React</div>
            <div style={{ color: "#6366f1", fontSize: "11px" }}>Frontend</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{
              position: "absolute", bottom: "60px", left: "-25px",
              background: "rgba(236,72,153,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(236,72,153,0.25)",
              borderRadius: "16px", padding: "14px 18px",
            }}
          >
            <div style={{ color: "#fff", fontSize: "20px", fontWeight: "800" }}>Node.js</div>
            <div style={{ color: "#ec4899", fontSize: "11px" }}>Backend</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            style={{
              position: "absolute", bottom: "20px", right: "-10px",
              background: "rgba(16,185,129,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: "16px", padding: "14px 18px",
            }}
          >
            <div style={{ color: "#fff", fontSize: "20px", fontWeight: "800" }}>MongoDB</div>
            <div style={{ color: "#10b981", fontSize: "11px" }}>Database</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span style={{ color: "#444466", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: "24px", height: "40px",
          border: "2px solid rgba(99,102,241,0.3)",
          borderRadius: "12px", display: "flex",
          alignItems: "flex-start", justifyContent: "center",
          padding: "6px",
        }}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              width: "4px", height: "8px",
              background: "#6366f1", borderRadius: "2px",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;