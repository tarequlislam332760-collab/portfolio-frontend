import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "#6366f1",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 80 },
      { name: "Next.js", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "#ec4899",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "REST API", level: 90 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    color: "#10b981",
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "Figma", level: 70 },
      { name: "Docker", level: 60 },
      { name: "Vercel / Render", level: 85 },
    ],
  },
];

const SkillBar = ({ name, level, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ marginBottom: "18px" }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
      <span style={{ color: "#ccc", fontSize: "14px", fontWeight: "500" }}>{name}</span>
      <span style={{ color: color, fontSize: "13px", fontWeight: "700" }}>{level}%</span>
    </div>
    <div style={{
      height: "6px", background: "rgba(255,255,255,0.06)",
      borderRadius: "99px", overflow: "hidden",
    }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
        style={{
          height: "100%", borderRadius: "99px",
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          boxShadow: `0 0 10px ${color}55`,
        }}
      />
    </div>
  </motion.div>
);

const Skills = () => {
  return (
    <section style={{
      background: "#080810",
      padding: "120px 0",
      position: "relative",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400&display=swap');`}</style>

      {/* Top border line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

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
              My Skills
            </span>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
            Technologies I{" "}
            <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              work with
            </span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
              }} />

              {/* Category Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <div style={{
                  width: "46px", height: "46px", borderRadius: "12px",
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px",
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}>{cat.title}</h3>
              </div>

              {/* Skill Bars */}
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={si}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={ci * 0.15 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech Logos Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "60px",
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: "16px",
          }}
        >
          {["React", "Node.js", "MongoDB", "Express", "Tailwind", "Git", "Vite", "Figma"].map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05, borderColor: "rgba(99,102,241,0.5)" }}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50px",
                color: "#8888aa",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "default",
                transition: "all 0.2s",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;