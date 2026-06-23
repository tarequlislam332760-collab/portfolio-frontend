import fs from "fs";
import path from "path";

const base = process.cwd();
const src = path.join(base, "src");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. Footer — Real social links
// ══════════════════════════════════════════
write(path.join(src, "components/Footer.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";

const SOCIALS = [
  { icon: "📘", label: "Facebook",  url: "https://www.facebook.com/share/1USufH1bxT/" },
  { icon: "📸", label: "Instagram", url: "https://www.instagram.com/tareq23337/?hl=en" },
  { icon: "🐙", label: "GitHub",    url: "https://github.com/tarequlislam332760-collab" },
];

const LINKS = ["Home","About","Skills","Projects","Services","Blog","Contact"];
const SERVICES_LIST = ["MERN Development","React Frontend","Node.js Backend","REST API","Digital Marketing","SEO Optimization"];

export default function Footer() {
  const nav = useNavigate();
  return (
    <footer style={{ background: "#03070F", borderTop: "1px solid rgba(0,212,170,0.08)", position: "relative", overflow: "hidden" }}>
      {/* Top gradient line */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,90vw)", height: 2, background: "linear-gradient(90deg,transparent,rgba(0,212,170,0.4),rgba(56,189,248,0.35),transparent)" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(0,212,170,0.04),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(44px,6vw,72px) clamp(20px,5vw,80px) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(24px,4vw,52px)", paddingBottom: "clamp(36px,4vw,52px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div onClick={() => nav("/")} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#050A14", fontFamily: "monospace", boxShadow: "0 0 24px rgba(0,212,170,0.3)", flexShrink: 0 }}>T</div>
              <span style={{ fontSize: "1.2rem", fontWeight: 900, background: "linear-gradient(90deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-head)", letterSpacing: "-0.3px" }}>Tarek.dev</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.87rem", lineHeight: 1.88, maxWidth: 280, marginBottom: 24, fontFamily: "var(--font-body)" }}>
              MERN Full Stack Developer & Digital Marketing Specialist. Building modern web apps deployed on Vercel.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, textDecoration: "none", transition: "transform 0.2s,box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,212,170,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="mailto:tareq.islam.dev@gmail.com" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                📧 tareq.islam.dev@gmail.com
              </a>
              <a href="tel:+8801732483149" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                📱 +880 1732-483149
              </a>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>📍 Sylhet, Bangladesh</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Pages</h4>
            {LINKS.map((l, i) => (
              <div key={i} onClick={() => nav(l === "Home" ? "/" : "/" + l.toLowerCase())}
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.87rem", marginBottom: 10, cursor: "pointer", fontFamily: "var(--font-body)", transition: "color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00D4AA"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.transform = "none"; }}>
                {l}
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Services</h4>
            {SERVICES_LIST.map((s, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.87rem", marginBottom: 10, fontFamily: "var(--font-body)" }}>{s}</div>
            ))}
          </div>

          {/* Contact CTA */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Hire Me</h4>
            <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.84rem", lineHeight: 1.85, marginBottom: 20, fontFamily: "var(--font-body)" }}>
              Available for freelance projects & full-time opportunities.
            </p>
            <div onClick={() => nav("/contact")}
              style={{ display: "inline-block", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 18px rgba(0,212,170,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              Get In Touch 🚀
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00D4AA", display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>Available for work</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.76rem", fontFamily: "var(--font-body)" }}>⚡ Response within 24h</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "clamp(16px,2.5vw,24px) 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: 0 }}>
            © {new Date().getFullYear()} Tarikul Islam Tarek. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["⚛️ React", "🍃 MongoDB", "⚡ Vite", "▲ Vercel"].map((t, i) => (
              <span key={i} style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{\`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:600px){.footer-grid{grid-template-columns:1fr!important}}
      \`}</style>
    </footer>
  );
}
`);

// ══════════════════════════════════════════
// 2. Contact Page — Real info
// ══════════════════════════════════════════
write(path.join(src, "pages/Contact.jsx"), `
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";

const CONTACT_INFO = [
  { icon: "📧", label: "Email",     value: "tareq.islam.dev@gmail.com", href: "mailto:tareq.islam.dev@gmail.com" },
  { icon: "📱", label: "Phone",     value: "+880 1732-483149",           href: "tel:+8801732483149" },
  { icon: "📍", label: "Location",  value: "Sylhet, Bangladesh",         href: null },
  { icon: "📘", label: "Facebook",  value: "facebook.com/tarek",         href: "https://www.facebook.com/share/1USufH1bxT/" },
  { icon: "📸", label: "Instagram", value: "@tareq23337",                href: "https://www.instagram.com/tareq23337/?hl=en" },
  { icon: "🐙", label: "GitHub",    value: "tarequlislam332760-collab",  href: "https://github.com/tarequlislam332760-collab" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });
  const focus = e => e.target.style.borderColor = "#00D4AA";
  const blur  = e => e.target.style.borderColor = "rgba(255,255,255,0.09)";
  const inputSt = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: "0.92rem",
    fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="Get In Touch" title="Let's Work" highlight="Together" sub="Available for freelance projects and full-time opportunities" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(24px,4vw,60px)", alignItems: "start" }} className="contact-grid">

          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {CONTACT_INFO.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 18px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 14, transition: "border-color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.25)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.1)"; e.currentTarget.style.transform = "none"; }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 3 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}>
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>{c.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 12 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#00D4AA", animation: "pulse 1.8s infinite", flexShrink: 0 }} />
              <span style={{ color: "#00D4AA", fontSize: "0.84rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Available for hire — Response within 24h</span>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ background: "rgba(0,212,170,0.06)", border: "2px solid rgba(0,212,170,0.25)", borderRadius: 24, padding: "3rem", textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem", animation: "scaleIn 0.4s ease" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem", color: "#00D4AA", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}>আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "transparent", color: "#00D4AA", border: "1.5px solid #00D4AA", borderRadius: 9, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, padding: "clamp(24px,3vw,40px)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }} className="form-grid">
                  <input name="name" placeholder="Your Name *" value={form.name} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                  <input name="email" type="email" placeholder="Email Address *" value={form.email} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                </div>
                <input name="subject" placeholder="Subject" value={form.subject} onChange={inp} style={inputSt} onFocus={focus} onBlur={blur} />
                <textarea name="message" placeholder="Your Message *" value={form.message} onChange={inp} required rows={5} style={{ ...inputSt, resize: "vertical" }} onFocus={focus} onBlur={blur} />
                <button type="submit"
                  style={{ width: "100%", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", color: "#050A14", padding: 16, borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: "1rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,170,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{\`
        @media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}.form-grid{grid-template-columns:1fr!important}}
      \`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 3. About Page — Real info
// ══════════════════════════════════════════
write(path.join(src, "pages/About.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";

const SOCIALS = [
  { icon: "📘", url: "https://www.facebook.com/share/1USufH1bxT/",          label: "Facebook" },
  { icon: "📸", url: "https://www.instagram.com/tareq23337/?hl=en",         label: "Instagram" },
  { icon: "🐙", url: "https://github.com/tarequlislam332760-collab",        label: "GitHub" },
];

export default function About() {
  const nav = useNavigate();
  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "clamp(30px,5vw,60px)", alignItems: "center" }} className="about-inner">
          {/* Image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "clamp(220px,28vw,300px)" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: 24, background: "linear-gradient(135deg,#00D4AA,#38BDF8,#818CF8)", padding: 3 }}>
                <div style={{ borderRadius: 22, background: "#050A14", width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", background: "linear-gradient(135deg,#0d1829,#0a1220)" }}>
                <img src="/profile.png" alt="Tarikul Islam Tarek"
                  onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;font-family:var(--font-head);font-weight:900;background:linear-gradient(135deg,#00D4AA,#818CF8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">T</div>'; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,10,20,0.6),transparent 55%)" }} />
                {/* Social icons overlay */}
                <div style={{ position: "absolute", bottom: 16, left: 14, right: 14, display: "flex", gap: 8, justifyContent: "center" }}>
                  {SOCIALS.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
                      style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(5,10,20,0.88)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,212,170,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, textDecoration: "none", transition: "transform 0.2s,box-shadow 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,212,170,0.3)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
              {/* Badge */}
              <div style={{ position: "absolute", bottom: -18, right: -18, background: "#0d1829", border: "2px solid #00D4AA", borderRadius: 14, padding: "12px 18px", textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", zIndex: 2 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.5rem", color: "#00D4AA" }}>2+</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Projects Live</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "0.4rem", color: "#fff" }}>Tarikul Islam Tarek</h3>
            <div style={{ color: "#00D4AA", fontWeight: 600, marginBottom: "1.2rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>MERN Full Stack Developer & Digital Marketer</div>
            <p style={{ color: "rgba(255,255,255,0.46)", lineHeight: 1.9, marginBottom: "1rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>
              আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।
            </p>
            <p style={{ color: "rgba(255,255,255,0.46)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>
              আমার ২টি MERN project বর্তমানে Vercel এ live আছে। আমি সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2rem" }}>
              {[
                ["👤 Name","Tarikul Islam Tarek"],
                ["💼 Role","MERN Developer"],
                ["📍 Location","Sylhet, Bangladesh"],
                ["🌐 Work","Remote Worldwide"],
                ["📧 Email","tareq.islam.dev@gmail.com"],
                ["📱 Phone","+880 1732-483149"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ color: "#00D4AA", fontSize: "0.7rem", marginBottom: 3, fontWeight: 600, fontFamily: "var(--font-body)" }}>{k}</div>
                  <div style={{ fontSize: "0.83rem", fontWeight: 500, wordBreak: "break-all" }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <button onClick={() => nav("/contact")}
                style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 22px rgba(0,212,170,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Let's Talk 👋
              </button>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "13px 18px", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.3)"; e.currentTarget.style.color = "#00D4AA"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:2.5rem!important}}\`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 4. Admin Sidebar
// ══════════════════════════════════════════
write(path.join(src, "components/admin/Sidebar.jsx"), `
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { icon: "📊", label: "Dashboard",  path: "/admin" },
  { icon: "🚀", label: "Projects",   path: "/admin/projects" },
  { icon: "⚡", label: "Skills",     path: "/admin/skills" },
  { icon: "✉️", label: "Messages",   path: "/admin/messages" },
  { icon: "👤", label: "Profile",    path: "/admin/profile" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <aside style={{
      width: collapsed ? 64 : 230, minHeight: "calc(100vh - 68px)",
      background: "#030710", borderRight: "1px solid rgba(0,212,170,0.08)",
      display: "flex", flexDirection: "column",
      position: "sticky", top: 68,
      transition: "width 0.3s ease", overflow: "hidden", flexShrink: 0,
      animation: "slideInLeft 0.5s ease both",
    }}>
      {/* Header */}
      <div style={{ padding: "1.2rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: collapsed ? "center" : "space-between", alignItems: "center" }}>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite", whiteSpace: "nowrap" }}>
              Tarek.dev
            </div>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Admin Panel</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 7, color: "#00D4AA", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0, transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,170,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,212,170,0.08)"}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Links */}
      <nav style={{ flex: 1, padding: "1rem 0.6rem" }}>
        {LINKS.map(ln => {
          const active = ln.path === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(ln.path);
          return (
            <div key={ln.path} onClick={() => nav(ln.path)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: collapsed ? "12px" : "12px 14px",
                borderRadius: 12, cursor: "pointer", marginBottom: 3,
                background: active ? "rgba(0,212,170,0.1)" : "transparent",
                borderLeft: active ? "3px solid #00D4AA" : "3px solid transparent",
                color: active ? "#00D4AA" : "rgba(255,255,255,0.38)",
                fontSize: "0.88rem", fontWeight: active ? 600 : 400,
                fontFamily: "var(--font-body)", whiteSpace: "nowrap",
                transition: "all 0.2s", justifyContent: collapsed ? "center" : "flex-start",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; } }}>
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{ln.icon}</span>
              {!collapsed && <span style={{ flex: 1 }}>{ln.label}</span>}
              {!collapsed && active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "0.8rem 0.6rem 1.2rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div onClick={() => nav("/")}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(56,189,248,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(56,189,248,0.06)"}>
          <span style={{ flexShrink: 0 }}>🌐</span>
          {!collapsed && <span>View Site</span>}
        </div>
      </div>
    </aside>
  );
}
`);

// ══════════════════════════════════════════
// 5. AnalyticsCard
// ══════════════════════════════════════════
write(path.join(src, "components/admin/AnalyticsCard.jsx"), `
import React, { useState } from "react";

export default function AnalyticsCard({ title, value, change, icon, color }) {
  const [hovered, setHovered] = useState(false);
  const positive = change >= 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: hovered ? \`1px solid \${color}33\` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20, padding: "1.6rem",
        position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? \`0 16px 40px rgba(0,0,0,0.3)\` : "none",
        transition: "all 0.3s ease",
        cursor: "default",
        animation: "fadeUp 0.5s ease both",
      }}>
      {/* Glow blob */}
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: \`radial-gradient(circle,\${color}18,transparent 70%)\`, pointerEvents: "none" }} />
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: \`linear-gradient(90deg,\${color},transparent)\`, opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ fontSize: "1.8rem" }}>{icon}</div>
        <span style={{
          background: positive ? "rgba(0,212,170,0.12)" : "rgba(239,68,68,0.12)",
          color: positive ? "#00D4AA" : "#f87171",
          padding: "3px 10px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700,
          fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 3,
          animation: "pulse 3s ease-in-out infinite",
        }}>
          {positive ? "↑" : "↓"} {Math.abs(change)}%
        </span>
      </div>

      <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "2rem", color: "#fff", marginBottom: 5, letterSpacing: "-0.5px" }}>{value}</div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>{title}</div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 6. ProjectForm
// ══════════════════════════════════════════
write(path.join(src, "components/admin/ProjectForm.jsx"), `
import React, { useState } from "react";

const EMOJIS = ["🚀","📈","🛍️","📊","✍️","🎯","📚","🌐","⚙️","🎨","💡","🔥","⚛️","🍃","🛒","📱"];
const S = {
  width: "100%", padding: "13px 16px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#fff", fontSize: "0.9rem", outline: "none",
  marginBottom: 12, boxSizing: "border-box", fontFamily: "var(--font-body)",
  transition: "border-color 0.2s",
};

export default function ProjectForm({ onClose, onSave }) {
  const [f, setF] = useState({ title: "", desc: "", tech: "", live: "", github: "", emoji: "🚀" });
  const inp = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20, backdropFilter: "blur(12px)" }}>
      <div style={{
        background: "linear-gradient(135deg,#0d1629,#080f1c)",
        border: "1px solid rgba(0,212,170,0.14)", borderRadius: 24,
        padding: "clamp(24px,3vw,40px)", width: "100%", maxWidth: 540,
        maxHeight: "90vh", overflowY: "auto",
        animation: "scaleIn 0.3s ease",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>Add New Project</h3>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
            ×
          </button>
        </div>

        {/* Emoji picker */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>Choose Icon</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setF(v => ({ ...v, emoji: e }))}
                style={{ fontSize: "1.3rem", padding: "8px", borderRadius: 10, border: f.emoji === e ? "2px solid #00D4AA" : "2px solid transparent", background: f.emoji === e ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        {[["title","Project Title *"],["desc","Description *"],["tech","Technologies (comma separated)"],["live","Live Demo URL"],["github","GitHub URL"]].map(([k, p]) => (
          <input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#00D4AA"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        ))}

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
            Cancel
          </button>
          <button onClick={() => onSave && onSave(f)}
            style={{ flex: 1, padding: 13, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Save Project ✓
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 7. BlogForm
// ══════════════════════════════════════════
write(path.join(src, "components/admin/BlogForm.jsx"), `
import React, { useState } from "react";

const CATS = ["React","Node.js","MongoDB","Next.js","SEO","Marketing","JavaScript","Express"];
const S = {
  width: "100%", padding: "13px 16px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#fff", fontSize: "0.9rem", outline: "none",
  marginBottom: 12, boxSizing: "border-box", fontFamily: "var(--font-body)",
  transition: "border-color 0.2s",
};

export default function BlogForm({ onClose, onSave }) {
  const [f, setF] = useState({ title: "", excerpt: "", category: "React", readTime: "5", content: "" });
  const inp = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20, backdropFilter: "blur(12px)" }}>
      <div style={{
        background: "linear-gradient(135deg,#0d1629,#080f1c)",
        border: "1px solid rgba(56,189,248,0.14)", borderRadius: 24,
        padding: "clamp(24px,3vw,40px)", width: "100%", maxWidth: 520,
        maxHeight: "90vh", overflowY: "auto",
        animation: "scaleIn 0.3s ease",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>New Blog Post</h3>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
            ×
          </button>
        </div>

        {/* Category selector */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>Category</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setF(v => ({ ...v, category: c }))}
                style={{
                  padding: "6px 14px", borderRadius: 99,
                  border: f.category === c ? "1px solid #38BDF8" : "1px solid rgba(255,255,255,0.08)",
                  background: f.category === c ? "rgba(56,189,248,0.12)" : "transparent",
                  color: f.category === c ? "#38BDF8" : "rgba(255,255,255,0.38)",
                  cursor: "pointer", fontSize: "0.8rem", fontWeight: f.category === c ? 700 : 400,
                  fontFamily: "var(--font-body)", transition: "all 0.2s",
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        {[["title","Blog Title *"],["excerpt","Short Description *"]].map(([k, p]) => (
          <input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#38BDF8"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        ))}
        <textarea name="content" placeholder="Content (optional)" value={f.content} onChange={inp} rows={4}
          style={{ ...S, resize: "vertical" }}
          onFocus={e => e.target.style.borderColor = "#38BDF8"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
          <input name="readTime" placeholder="Read Time (min)" value={f.readTime} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#38BDF8"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
            Cancel
          </button>
          <button onClick={() => onSave && onSave(f)}
            style={{ flex: 1, padding: 13, background: "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(56,189,248,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Publish Post ✓
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 8. SEOChart
// ══════════════════════════════════════════
write(path.join(src, "components/admin/SEOChart.jsx"), `
import React, { useEffect, useRef, useState } from "react";

const DATA = [
  { m: "Jan", s: 45 }, { m: "Feb", s: 52 }, { m: "Mar", s: 48 },
  { m: "Apr", s: 61 }, { m: "May", s: 67 }, { m: "Jun", s: 74 },
];
const MAX = Math.max(...DATA.map(d => d.s));

export default function SEOChart() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, margin: 0, fontFamily: "var(--font-head)" }}>SEO Score Trend</h3>
        <span style={{ background: "rgba(0,212,170,0.1)", color: "#00D4AA", padding: "3px 11px", borderRadius: 99, fontSize: "0.74rem", fontWeight: 700, fontFamily: "var(--font-body)", animation: "pulse 3s infinite" }}>
          +64% YTD
        </span>
      </div>

      {/* Bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130, marginBottom: 12 }}>
        {DATA.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontFamily: "var(--font-body)" }}>{d.s}</span>
            <div style={{ width: "100%", background: "rgba(255,255,255,0.04)", borderRadius: "6px 6px 0 0", height: "100%", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
              <div style={{
                width: "100%",
                height: animated ? (d.s / MAX * 100) + "%" : "0%",
                background: "linear-gradient(180deg,#00D4AA,#38BDF8)",
                borderRadius: "5px 5px 0 0",
                transition: \`height 0.9s ease \${i * 0.1}s\`,
                minHeight: animated ? 4 : 0,
                cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.3)"}
                onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", fontFamily: "var(--font-body)" }}>{d.m}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        {[["#00D4AA","High (70+)"],["#38BDF8","Medium (50-70)"],["rgba(255,255,255,0.2)","Low (<50)"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontFamily: "var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 9. AdsChart
// ══════════════════════════════════════════
write(path.join(src, "components/admin/AdsChart.jsx"), `
import React, { useEffect, useRef, useState } from "react";

const DATA = [
  { label: "Facebook",  value: 42, color: "#3b82f6" },
  { label: "Google",    value: 31, color: "#f59e0b" },
  { label: "Instagram", value: 18, color: "#ec4899" },
  { label: "Other",     value: 9,  color: "#6366f1" },
];
const SZ = 160;
const R  = 58;
const CIR = 2 * Math.PI * R;

export default function AdsChart() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setAnimated(true), 100); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  let offset = 0;
  const segments = DATA.map(d => {
    const dash    = CIR * (d.value / 100);
    const gap     = CIR - dash;
    const dashOff = -(offset / 100) * CIR;
    offset += d.value;
    return { ...d, dash, gap, dashOff };
  });

  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, margin: 0, fontFamily: "var(--font-head)" }}>Ad Spend Breakdown</h3>
        <span style={{ background: "rgba(56,189,248,0.1)", color: "#38BDF8", padding: "3px 11px", borderRadius: 99, fontSize: "0.74rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>
          This Month
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* Donut */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg width={SZ} height={SZ} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={SZ/2} cy={SZ/2} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={18} />
            {segments.map((s, i) => (
              <circle key={i}
                cx={SZ/2} cy={SZ/2} r={R}
                fill="none" stroke={s.color} strokeWidth={18}
                strokeLinecap="round"
                strokeDasharray={animated ? \`\${s.dash} \${s.gap}\` : \`0 \${CIR}\`}
                strokeDashoffset={s.dashOff}
                style={{ transition: \`stroke-dasharray 1.1s ease \${i * 0.2}s\` }}
              />
            ))}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1.3rem", color: "#fff", lineHeight: 1 }}>100%</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", fontFamily: "var(--font-body)" }}>Total</div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {DATA.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: animated ? 1 : 0, transform: animated ? "none" : "translateX(12px)", transition: \`all 0.5s ease \${i * 0.1 + 0.3}s\` }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", flex: 1, fontFamily: "var(--font-body)" }}>{d.label}</span>
              <span style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total spend indicator */}
      <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>Total Budget Used</span>
        <span style={{ color: "#00D4AA", fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>$1,240 / $1,500</span>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 10. Admin — update to use Sidebar component
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/Admin.jsx"), `
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminDashboard from "./AdminDashboard";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminMessages from "./AdminMessages";
import AdminProfile from "./AdminProfile";

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", paddingTop: 68, background: "var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ flex: 1, padding: "2rem", overflow: "auto", minWidth: 0 }}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 11. AdminDashboard — use AnalyticsCard + Charts
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminDashboard.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import SEOChart from "../../components/admin/SEOChart";
import AdsChart from "../../components/admin/AdsChart";

const STATS = [
  { icon: "🚀", title: "Live Projects",   value: "2",    change: 100,  color: "#00D4AA" },
  { icon: "⚡", title: "Skills Listed",   value: "14+",  change: 12,   color: "#38BDF8" },
  { icon: "✉️", title: "Messages",        value: "0",    change: 0,    color: "#818CF8" },
  { icon: "👁️", title: "Profile Views",   value: "—",    change: 0,    color: "#f472b6" },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.6rem", marginBottom: "0.3rem", color: "#fff" }}>Dashboard</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Welcome back, Tarek! Manage your portfolio from here.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {STATS.map((s, i) => <AnalyticsCard key={i} {...s} />)}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <SEOChart />
        <AdsChart />
      </div>

      {/* Quick Actions */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#38BDF8" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          {[["🚀 Add Project","/admin/projects"],["⚡ Update Skills","/admin/skills"],["👤 Edit Profile","/admin/profile"],["✉️ Messages","/admin/messages"]].map(([l, p]) => (
            <div key={l} onClick={() => nav(p)}
              style={{ background: "rgba(0,212,170,0.07)", border: "1px solid rgba(0,212,170,0.14)", borderRadius: 9, padding: "10px 18px", color: "#00D4AA", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
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
`);

console.log(`
╔══════════════════════════════════════════════════════╗
║       ✅ সব কিছু সম্পূর্ণ হয়েছে!                   ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  🚀 চালান: npm run dev                              ║
║                                                      ║
║  ✅ Real Info যোগ হয়েছে:                            ║
║     📘 Facebook: facebook.com/share/1USufH1bxT      ║
║     📸 Instagram: @tareq23337                       ║
║     🐙 GitHub: tarequlislam332760-collab            ║
║     📱 Phone: +880 1732-483149                      ║
║     📧 Email: tareq.islam.dev@gmail.com             ║
║                                                      ║
║  ✅ Dashboard Components:                           ║
║     • Sidebar (collapsible, animated)               ║
║     • AnalyticsCard (hover effects, pulse badge)    ║
║     • ProjectForm (emoji picker, spring modal)      ║
║     • BlogForm (category selector, animated)        ║
║     • SEOChart (animated bar chart)                 ║
║     • AdsChart (donut chart, SVG animation)         ║
╚══════════════════════════════════════════════════════╝
`);
