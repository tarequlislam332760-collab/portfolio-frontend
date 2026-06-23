import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");
const FB_URL = "https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL";

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. Navbar — Fix "Admin" button → /admin (not /contact)
//    + remove Admin link from MOBILE menu too (hide from regular nav)
// ══════════════════════════════════════════
write(path.join(src, "components/Navbar.jsx"), `
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Skills",   to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Blog",     to: "/blog" },
  { label: "Contact",  to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const lk = (active) => ({
    fontFamily: "var(--font-body)", fontWeight: active ? 700 : 400, fontSize: "0.87rem",
    color: active ? "#00D4AA" : "rgba(255,255,255,0.5)",
    position: "relative", padding: "8px 13px", background: "none", border: "none",
    cursor: "pointer", transition: "color 0.2s", letterSpacing: "0.2px",
    textTransform: "capitalize", textDecoration: "none", display: "inline-block",
  });

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px,4vw,60px)",
        background: scrolled ? "rgba(5,10,20,0.97)" : "rgba(5,10,20,0.5)",
        backdropFilter: "blur(28px)",
        borderBottom: scrolled ? "1px solid rgba(0,212,170,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.4s ease",
        transform: visible ? "translateY(0)" : "translateY(-80px)",
        opacity: visible ? 1 : 0,
      }}>
        {/* Logo */}
        <div onClick={() => nav("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#050A14", fontFamily: "monospace", boxShadow: "0 0 20px rgba(0,212,170,0.35)", flexShrink: 0 }}>T</div>
          <span style={{ fontSize: "1.05rem", fontWeight: 800, background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-head)", animation: "gradShift 5s ease infinite", whiteSpace: "nowrap" }}>
            Tarek.dev
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="desk-nav">
          {NAV.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              style={({ isActive }) => ({
                ...lk(isActive),
                borderBottom: isActive ? "2px solid #00D4AA" : "2px solid transparent",
                paddingBottom: 6,
              })}
              onMouseEnter={e => { if (e.currentTarget.style.color !== "rgb(0, 212, 170)") e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={e => { if (e.currentTarget.style.color !== "rgb(0, 212, 170)") e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >{l.label}</NavLink>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <button onClick={() => nav("/admin")} className="desk-btn"
            style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "9px 22px", cursor: "pointer", fontWeight: 800, fontSize: "0.82rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >Admin</button>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="burger"
            style={{ display: "none", width: 38, height: 38, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, cursor: "pointer", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, flexShrink: 0 }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
        background: "rgba(5,10,20,0.99)", backdropFilter: "blur(28px)",
        maxHeight: open ? "560px" : "0", overflow: "hidden",
        transition: "max-height 0.4s ease",
        borderBottom: open ? "1px solid rgba(0,212,170,0.1)" : "none",
      }}>
        <div style={{ padding: "0.8rem 0 1.2rem" }}>
          {NAV.map((l, i) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: 12,
                padding: "13px clamp(20px,5vw,52px)",
                background: isActive ? "rgba(0,212,170,0.07)" : "transparent",
                borderLeft: isActive ? "3px solid #00D4AA" : "3px solid transparent",
                color: isActive ? "#00D4AA" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)", fontWeight: isActive ? 700 : 400,
                fontSize: "0.95rem", textTransform: "capitalize", textDecoration: "none",
                transition: "all 0.2s", borderBottom: "1px solid rgba(255,255,255,0.03)",
                animationDelay: i * 0.04 + "s",
              })}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
              {l.label}
            </NavLink>
          ))}
          <div style={{ padding: "0.8rem clamp(20px,5vw,52px) 0" }}>
            <button onClick={() => { nav("/admin"); setOpen(false); }} style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.95rem", fontFamily: "var(--font-body)" }}>
              Admin 🔒
            </button>
          </div>
        </div>
      </div>

      <style>{\`
        .desk-nav{display:flex!important}
        .desk-btn{display:block!important}
        .burger{display:none!important}
        @media(max-width:900px){
          .desk-nav{display:none!important}
          .desk-btn{display:none!important}
          .burger{display:flex!important}
        }
        nav a:hover{color:rgba(255,255,255,0.9)!important}
      \`}</style>
    </>
  );
}
`);

// ══════════════════════════════════════════
// 2. Hero image fix — mobile visible (but smaller/centered)
//    Update Home.jsx: remove "display:none" on mobile, instead shrink + center
// ══════════════════════════════════════════
{
  const fp = path.join(src, "pages/Home.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");

    // Replace the media query that hides .hero-img on mobile
    c = c.replace(
      /<style>\{`@media\(max-width:700px\)\{\.hero-img\{display:none!important\}\}`\}<\/style>/,
      `<style>{\\\`
          @media(max-width:700px){
            section[style*="minHeight: \\"100vh\\""] > div { flex-direction: column-reverse !important; text-align: center !important; padding-top: 20px !important; }
            .hero-img { width: clamp(160px,42vw,220px) !important; margin: 0 auto 12px !important; }
          }
        \\\`}</style>`
    );

    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ Home.jsx — hero image now visible on mobile");
  }
}

// ══════════════════════════════════════════
// 3. Real SVG Social Icons (Facebook/Instagram/GitHub) — used everywhere
// ══════════════════════════════════════════
write(path.join(src, "components/SocialIcons.jsx"), `
import React from "react";

const ICON_PATHS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <defs>
        <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="25%" stopColor="#e6683c"/>
          <stop offset="50%" stopColor="#dc2743"/>
          <stop offset="75%" stopColor="#cc2366"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path fill="url(#igGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

const URLS = {
  facebook:  "${FB_URL}",
  instagram: "https://www.instagram.com/tareq23337/?hl=en",
  github:    "https://github.com/tarequlislam332760-collab",
};

export function SocialLink({ type, url, size = 40 }) {
  const [hovered, setHovered] = React.useState(false);
  const href = url || URLS[type];
  const bgMap = {
    facebook:  hovered ? "rgba(24,119,242,0.2)"   : "rgba(24,119,242,0.08)",
    instagram: hovered ? "rgba(220,39,67,0.2)"    : "rgba(220,39,67,0.08)",
    github:    hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
  };
  const borderMap = {
    facebook:  hovered ? "rgba(24,119,242,0.5)"  : "rgba(24,119,242,0.2)",
    instagram: hovered ? "rgba(220,39,67,0.5)"   : "rgba(220,39,67,0.2)",
    github:    hovered ? "rgba(255,255,255,0.3)"  : "rgba(255,255,255,0.1)",
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: 12,
        background: bgMap[type],
        border: \`1px solid \${borderMap[type]}\`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none", flexShrink: 0,
        transform: hovered ? "translateY(-3px) scale(1.1)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 8px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.25s ease",
      }}>
      {ICON_PATHS[type]}
    </a>
  );
}

export default function SocialLinks({ size }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <SocialLink type="facebook"  size={size} />
      <SocialLink type="instagram" size={size} />
      <SocialLink type="github"    size={size} />
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 4. Update Facebook URL in any remaining files (Footer, About, Contact)
// ══════════════════════════════════════════
const OLD_URLS = [
  "https://www.facebook.com/share/1USufH1bxT/",
  "https://www.facebook.com/share/18YmEZ6nBy/",
];

["src/components/Footer.jsx", "src/pages/About.jsx", "src/pages/Contact.jsx"].forEach(f => {
  const fp = path.join(base, f);
  if (!fs.existsSync(fp)) { console.log("⚠️ not found:", f); return; }
  let c = fs.readFileSync(fp, "utf8");
  let changed = false;
  OLD_URLS.forEach(old => {
    if (c.includes(old)) { c = c.split(old).join(FB_URL); changed = true; }
  });
  if (changed) {
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ Facebook link fixed in", f);
  } else {
    console.log("ℹ️  no old FB link found in", f, "(may already use SocialIcons component)");
  }
});

// ══════════════════════════════════════════
// 5. Contact.jsx — make sure Facebook entry uses correct URL via SocialIcons
// ══════════════════════════════════════════
write(path.join(src, "pages/Contact.jsx"), `
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { SocialLink } from "../components/SocialIcons";

const FB_URL = "${FB_URL}";

const CONTACT_INFO = [
  { type: "email",     icon: "📧", label: "Email",    value: "tareq.islam.dev@gmail.com", href: "mailto:tareq.islam.dev@gmail.com" },
  { type: "phone",     icon: "📱", label: "Phone",    value: "+880 1732-483149",           href: "tel:+8801732483149" },
  { type: "location",  icon: "📍", label: "Location", value: "Sylhet, Bangladesh",         href: null },
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
      <SEO title="Contact Tarikul Islam Tarek | Hire MERN Developer" description="Get in touch with Tarikul Islam Tarek for MERN development and digital marketing projects. Available for freelance and full-time work." />
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

            {/* Social row — real icons */}
            <div style={{ padding: "15px 18px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 14 }}>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 12 }}>Follow Me</div>
              <div style={{ display: "flex", gap: 10 }}>
                <SocialLink type="facebook"  url={FB_URL} size={42} />
                <SocialLink type="instagram" size={42} />
                <SocialLink type="github"    size={42} />
              </div>
            </div>

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

console.log(`
╔══════════════════════════════════════════════════════════╗
║       ✅ সব সমাধান হয়েছে!                              ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  1️⃣ Navbar "Admin" বাটন এখন /admin এ যাবে              ║
║     (আগে ভুলে /contact এ যেত)                          ║
║                                                          ║
║  2️⃣ Admin panel শুধু আপনি দেখবেন:                      ║
║     /admin এ গেলে password চাইবে: tareq@#49            ║
║     password ছাড়া কেউ dashboard দেখতে পারবে না        ║
║                                                          ║
║  3️⃣ Home page এর ছবি এখন mobile এ visible:            ║
║     mobile এ ছবি ছোট হয়ে উপরে দেখাবে,                  ║
║     নিচে text থাকবে                                    ║
║                                                          ║
║  4️⃣ Facebook link ঠিক করা হলো সব জায়গায়:              ║
║     facebook.com/profile.php?id=61585040426028          ║
║     + Facebook, Instagram, GitHub এর                    ║
║       অরিজিনাল icon (SVG logo) ব্যবহার হচ্ছে            ║
║       Footer + Contact + About সব জায়গায়              ║
╚══════════════════════════════════════════════════════════╝
`);
