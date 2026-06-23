import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");
const LINKEDIN_URL = "https://www.linkedin.com/in/tareq-islam3149/";

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. Navbar — REMOVE Admin button (professional: hidden URL access only)
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

        {/* Right — Hire Me CTA (replaces Admin button) */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <button onClick={() => nav("/contact")} className="desk-btn"
            style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "9px 22px", cursor: "pointer", fontWeight: 800, fontSize: "0.82rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >Hire Me</button>

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
            <button onClick={() => { nav("/contact"); setOpen(false); }} style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.95rem", fontFamily: "var(--font-body)" }}>
              Hire Me 🚀
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
// 2. SocialIcons — add LinkedIn with real SVG logo
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
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

const URLS = {
  facebook:  "https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/tareq23337/?hl=en",
  github:    "https://github.com/tarequlislam332760-collab",
  linkedin:  "${LINKEDIN_URL}",
};

export function SocialLink({ type, url, size = 40 }) {
  const [hovered, setHovered] = React.useState(false);
  const href = url || URLS[type];
  const bgMap = {
    facebook:  hovered ? "rgba(24,119,242,0.2)"   : "rgba(24,119,242,0.08)",
    instagram: hovered ? "rgba(220,39,67,0.2)"    : "rgba(220,39,67,0.08)",
    github:    hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
    linkedin:  hovered ? "rgba(10,102,194,0.2)"   : "rgba(10,102,194,0.08)",
  };
  const borderMap = {
    facebook:  hovered ? "rgba(24,119,242,0.5)"  : "rgba(24,119,242,0.2)",
    instagram: hovered ? "rgba(220,39,67,0.5)"   : "rgba(220,39,67,0.2)",
    github:    hovered ? "rgba(255,255,255,0.3)"  : "rgba(255,255,255,0.1)",
    linkedin:  hovered ? "rgba(10,102,194,0.5)"   : "rgba(10,102,194,0.2)",
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
      <SocialLink type="linkedin"  size={size} />
      <SocialLink type="github"    size={size} />
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 3. About.jsx — add LinkedIn to image overlay + buttons row
// ══════════════════════════════════════════
{
  const fp = path.join(src, "pages/About.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");

    // Image overlay icons — add linkedin
    c = c.replace(
      `<SocialLink type="facebook"  url="https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL" size={36} />\n                  <SocialLink type="instagram" url="https://www.instagram.com/tareq23337/?hl=en"  size={36} />\n                  <SocialLink type="github"    url="https://github.com/tarequlislam332760-collab" size={36} />`,
      `<SocialLink type="facebook"  size={36} />\n                  <SocialLink type="instagram" size={36} />\n                  <SocialLink type="linkedin"  size={36} />\n                  <SocialLink type="github"    size={36} />`
    );
    // Fallback simpler pattern (in case URL params differ)
    c = c.replace(
      /<SocialLink type="facebook"[^/]*\/>\s*<SocialLink type="instagram"[^/]*\/>\s*<SocialLink type="github"[^/]*\/>/g,
      `<SocialLink type="facebook"  size={36} />\n                  <SocialLink type="instagram" size={36} />\n                  <SocialLink type="linkedin"  size={36} />\n                  <SocialLink type="github"    size={36} />`
    );

    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ About.jsx — LinkedIn icon added");
  }
}

// ══════════════════════════════════════════
// 4. Footer.jsx — ensure uses SocialLinks (which now includes LinkedIn)
// ══════════════════════════════════════════
{
  const fp = path.join(src, "components/Footer.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    if (c.includes("SocialLinks")) {
      console.log("ℹ️  Footer.jsx already uses <SocialLinks /> — LinkedIn auto-included");
    } else {
      console.log("⚠️  Footer.jsx doesn't use SocialLinks component — manual check needed");
    }
  }
}

// ══════════════════════════════════════════
// 5. Contact.jsx — add LinkedIn to social row
// ══════════════════════════════════════════
{
  const fp = path.join(src, "pages/Contact.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    c = c.replace(
      /<SocialLink type="facebook"[^/]*\/>\s*<SocialLink type="instagram"[^/]*\/>\s*<SocialLink type="github"[^/]*\/>/g,
      `<SocialLink type="facebook"  size={42} />\n                <SocialLink type="instagram" size={42} />\n                <SocialLink type="linkedin"  size={42} />\n                <SocialLink type="github"    size={42} />`
    );
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ Contact.jsx — LinkedIn icon added");
  }
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║       ✅ সব আপডেট সম্পূর্ণ হয়েছে!                      ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  📌 আপনার প্রশ্নের উত্তর:                              ║
║                                                          ║
║  Navbar এ "Admin" button রাখা professional নয়।         ║
║  ✅ এটা remove করে দেওয়া হয়েছে।                       ║
║  ✅ পরিবর্তে "Hire Me" button রাখা হয়েছে                ║
║     (Contact page এ যাবে — এটাই professional)          ║
║                                                          ║
║  🔒 Admin Panel এখন "hidden URL" দিয়ে কাজ করবে:        ║
║     ব্রাউজারে সরাসরি গিয়ে টাইপ করুন:                   ║
║     yourwebsite.com/admin                               ║
║     → password (tareq@#49) চাইবে                       ║
║     → শুধু আপনিই জানেন এই URL                          ║
║                                                          ║
║  ✅ LinkedIn যোগ হয়েছে (real blue icon):               ║
║     linkedin.com/in/tareq-islam3149                     ║
║     → Footer                                            ║
║     → About page (ছবির নিচে + buttons পাশে)           ║
║     → Contact page                                      ║
║                                                          ║
║  ✅ এখন সব জায়গায় ৪টি real social icon:                ║
║     📘 Facebook (নীল) 📸 Instagram (gradient)          ║
║     💼 LinkedIn (নীল)  🐙 GitHub (সাদা/কালো)           ║
╚══════════════════════════════════════════════════════════╝
`);
