import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { SocialLink } from "../components/SocialIcons";
import { messagesAPI } from "../services/api";

const FB_URL = "https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL";

const CONTACT_INFO = [
  { icon: "📧", label: "Email",    value: "tareq.islam.dev@gmail.com", href: "mailto:tareq.islam.dev@gmail.com" },
  { icon: "📱", label: "Phone",    value: "+880 1732-483149",           href: "tel:+8801732483149" },
  { icon: "📍", label: "Location", value: "Sylhet, Bangladesh",         href: null },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });
  const focus = e => e.target.style.borderColor = "#00D4AA";
  const blur  = e => e.target.style.borderColor = "rgba(255,255,255,0.09)";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await messagesAPI.send(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Message পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const inputSt = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: "0.92rem",
    fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="Contact Tarikul Islam Tarek | Hire MERN Developer" description="Get in touch with Tarikul Islam Tarek for MERN development and digital marketing projects." />
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="Get In Touch" title="Let's Work" highlight="Together" sub="Available for freelance projects and full-time opportunities" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(24px,4vw,60px)", alignItems: "start" }} className="contact-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {CONTACT_INFO.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 18px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 14, transition: "border-color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.25)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.1)"; e.currentTarget.style.transform = "none"; }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 3 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>{c.value}</a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>{c.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social Icons */}
            <div style={{ padding: "15px 18px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 14 }}>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 12 }}>Follow Me</div>
              <div style={{ display: "flex", gap: 10 }}>
                <SocialLink type="facebook"  url={FB_URL} size={42} />
                <SocialLink type="instagram" size={42} />
                <SocialLink type="linkedin"  size={42} />
                <SocialLink type="github"    size={42} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 12 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#00D4AA", animation: "pulse 1.8s infinite", flexShrink: 0 }} />
              <span style={{ color: "#00D4AA", fontSize: "0.84rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Available for hire — Response within 24h</span>
            </div>
          </div>

          <div>
            {sent ? (
              <div style={{ background: "rgba(0,212,170,0.06)", border: "2px solid rgba(0,212,170,0.25)", borderRadius: 24, padding: "3rem", textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem", color: "#00D4AA", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}>আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "transparent", color: "#00D4AA", border: "1.5px solid #00D4AA", borderRadius: 9, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, padding: "clamp(24px,3vw,40px)" }}>
                {error && (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: "1rem", color: "#f87171", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>
                    ⚠️ {error}
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }} className="form-grid">
                  <input name="name"  placeholder="Your Name *"     value={form.name}  onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                  <input name="email" type="email" placeholder="Email *" value={form.email} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                </div>
                <input name="subject" placeholder="Subject" value={form.subject} onChange={inp} style={inputSt} onFocus={focus} onBlur={blur} />
                <textarea name="message" placeholder="Your Message *" value={form.message} onChange={inp} required rows={5} style={{ ...inputSt, resize: "vertical" }} onFocus={focus} onBlur={blur} />
                <button type="submit" disabled={loading}
                  style={{ width: "100%", background: loading ? "rgba(0,212,170,0.5)" : "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", color: "#050A14", padding: 16, borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 800, fontSize: "1rem", fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
                  {loading ? "Sending..." : "Send Message 🚀"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}.form-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
  );
}
