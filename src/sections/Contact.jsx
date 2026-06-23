import { motion } from "framer-motion";
import { useState } from "react";

const contactInfo = [
  { icon: "📧", label: "Email", value: "your@email.com", color: "#6366f1" },
  { icon: "📱", label: "Phone", value: "+880 1XXX-XXXXXX", color: "#ec4899" },
  { icon: "📍", label: "Location", value: "Bangladesh", color: "#10b981" },
  { icon: "💼", label: "Freelance", value: "Available Now", color: "#f59e0b" },
];

const socials = [
  { icon: "🐙", label: "GitHub", url: "#" },
  { icon: "💼", label: "LinkedIn", url: "#" },
  { icon: "🐦", label: "Twitter", url: "#" },
  { icon: "🎨", label: "Dribbble", url: "#" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // TODO: connect to backend /api/contact
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "12px", color: "#fff",
    fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  return (
    <section style={{
      background: "linear-gradient(180deg, #0a0a0f 0%, #080810 100%)",
      padding: "120px 0 80px",
      position: "relative",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400&display=swap');
        .contact-input:focus { border-color: rgba(99,102,241,0.5) !important; background: rgba(99,102,241,0.05) !important; }
        ::placeholder { color: #555577; }
      `}</style>

      <div style={{
        position: "absolute", top: "20%", right: "10%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
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
            <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>Contact</span>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "800", color: "#fff", lineHeight: "1.1", marginBottom: "16px" }}>
            Let's Work{" "}
            <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Together
            </span>
          </h2>
          <p style={{ color: "#666688", fontSize: "16px", fontFamily: "'DM Sans', sans-serif", maxWidth: "480px", margin: "0 auto" }}>
            নতুন project, collaboration বা কোনো প্রশ্ন থাকলে আমার সাথে যোগাযোগ করুন।
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "start" }}>

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
              {contactInfo.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: "20px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{c.icon}</div>
                  <div style={{ color: "#666688", fontSize: "11px", marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>{c.label}</div>
                  <div style={{ color: c.color, fontSize: "13px", fontWeight: "600" }}>{c.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Availability Badge */}
            <div style={{
              padding: "20px 24px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: "16px", marginBottom: "32px",
              display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
                animation: "pulse 2s infinite",
              }} />
              <div>
                <div style={{ color: "#10b981", fontSize: "14px", fontWeight: "700" }}>Available for Work</div>
                <div style={{ color: "#556655", fontSize: "12px" }}>Response within 24 hours</div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <div style={{ color: "#555577", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Follow Me</div>
              <div style={{ display: "flex", gap: "12px" }}>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    title={s.label}
                    style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px", textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "24px",
              padding: "40px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, #6366f1, #ec4899, transparent)",
            }} />

            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: "center", padding: "40px" }}
              >
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
                <h3 style={{ color: "#10b981", fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>Message Sent!</h3>
                <p style={{ color: "#666688", fontFamily: "'DM Sans', sans-serif" }}>আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ color: "#8888aa", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>NAME</label>
                    <input
                      className="contact-input"
                      style={inputStyle}
                      type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="Your name" required
                    />
                  </div>
                  <div>
                    <label style={{ color: "#8888aa", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>EMAIL</label>
                    <input
                      className="contact-input"
                      style={inputStyle}
                      type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="your@email.com" required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: "#8888aa", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>SUBJECT</label>
                  <input
                    className="contact-input"
                    style={inputStyle}
                    type="text" name="subject" value={form.subject}
                    onChange={handleChange} placeholder="Project inquiry" required
                  />
                </div>

                <div>
                  <label style={{ color: "#8888aa", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>MESSAGE</label>
                  <textarea
                    className="contact-input"
                    style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
                    name="message" value={form.message}
                    onChange={handleChange} placeholder="আপনার project সম্পর্কে বলুন..." required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%", padding: "16px",
                    background: sending ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none", borderRadius: "12px",
                    color: "#fff", fontSize: "15px", fontWeight: "700",
                    cursor: sending ? "not-allowed" : "pointer",
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: "0 0 30px rgba(99,102,241,0.3)",
                    transition: "all 0.3s",
                  }}
                >
                  {sending ? "Sending..." : "Send Message →"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
};

export default Contact;