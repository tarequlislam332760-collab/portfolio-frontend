import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. SocialIcons.jsx — reliable solid SVGs incl. LinkedIn
// ══════════════════════════════════════════
write(path.join(src, "components/SocialIcons.jsx"), `
import React from "react";

const URLS = {
  facebook:  "https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/tareq23337/?hl=en",
  linkedin:  "https://www.linkedin.com/in/tareq-islam3149/",
  github:    "https://github.com/tarequlislam332760-collab",
};

function FacebookIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#1877F2" d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854V15.54H7.078v-3.467h3.047V9.41c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.49 0-1.955.925-1.955 1.874v2.252h3.328l-.532 3.467h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function InstagramIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#E1306C"/>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.3" fill="#fff"/>
    </svg>
  );
}
function LinkedinIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0A66C2"/>
      <path fill="#fff" d="M7.115 9h2.77v9.5h-2.77V9zM8.5 7.7c-.9 0-1.5-.6-1.5-1.35S7.6 5 8.5 5s1.5.6 1.5 1.35-.6 1.35-1.5 1.35zM11.5 9h2.65v1.3h.04c.37-.7 1.27-1.45 2.62-1.45 2.8 0 3.32 1.84 3.32 4.24V18.5h-2.77v-4.86c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57V18.5H11.5V9z"/>
    </svg>
  );
}
function GithubIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#ffffff" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.07 0 0 .98-.31 3.2 1.19a11 11 0 015.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.77.11 3.07.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

const ICONS = { facebook: FacebookIcon, instagram: InstagramIcon, linkedin: LinkedinIcon, github: GithubIcon };

const bgMap = {
  facebook:  ["rgba(24,119,242,0.08)",  "rgba(24,119,242,0.2)"],
  instagram: ["rgba(225,48,108,0.08)",  "rgba(225,48,108,0.2)"],
  linkedin:  ["rgba(10,102,194,0.08)",  "rgba(10,102,194,0.2)"],
  github:    ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.15)"],
};
const borderMap = {
  facebook:  ["rgba(24,119,242,0.2)",  "rgba(24,119,242,0.5)"],
  instagram: ["rgba(225,48,108,0.2)",  "rgba(225,48,108,0.5)"],
  linkedin:  ["rgba(10,102,194,0.2)",  "rgba(10,102,194,0.5)"],
  github:    ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)"],
};

export function SocialLink({ type, url, size = 40 }) {
  const [hovered, setHovered] = React.useState(false);
  const href = url || URLS[type];
  const Icon = ICONS[type];
  const iconSize = Math.round(size * 0.46);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: 12,
        background: bgMap[type][hovered ? 1 : 0],
        border: \`1px solid \${borderMap[type][hovered ? 1 : 0]}\`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none", flexShrink: 0,
        transform: hovered ? "translateY(-3px) scale(1.1)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 8px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.25s ease",
      }}>
      <Icon size={iconSize} />
    </a>
  );
}

export default function SocialLinks({ size = 40 }) {
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
// 2. Footer.jsx — complete rebuild using SocialLinks (SVG, with LinkedIn)
// ══════════════════════════════════════════
write(path.join(src, "components/Footer.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";
import SocialLinks from "./SocialIcons";

const NAV_LINKS  = ["Home","About","Skills","Projects","Services","Blog","Contact"];
const SERVICES   = ["MERN Development","React Frontend","Node.js Backend","REST API","Digital Marketing","SEO"];

export default function Footer() {
  const nav = useNavigate();
  return (
    <footer style={{ background: "#03070F", borderTop: "1px solid rgba(0,212,170,0.08)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,90vw)", height: 2, background: "linear-gradient(90deg,transparent,rgba(0,212,170,0.4),rgba(56,189,248,0.35),transparent)" }} />
      <div style={{ position: "absolute", top: "-180px", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(0,212,170,0.04),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,80px) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(24px,4vw,52px)", paddingBottom: "clamp(36px,4vw,52px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div onClick={() => nav("/")} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20, transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#050A14", fontFamily: "monospace", boxShadow: "0 0 24px rgba(0,212,170,0.3)", flexShrink: 0 }}>T</div>
              <span style={{ fontSize: "1.2rem", fontWeight: 900, background: "linear-gradient(90deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-head)" }}>Tarek.dev</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.86rem", lineHeight: 1.88, maxWidth: 270, marginBottom: 22, fontFamily: "var(--font-body)" }}>
              MERN Full Stack Developer & Digital Marketing Specialist. Building modern web apps deployed on Vercel.
            </p>

            {/* Real SVG Social Icons (Facebook, Instagram, LinkedIn, GitHub) */}
            <SocialLinks size={40} />

            {/* Contact */}
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 7 }}>
              <a href="mailto:tareq.islam.dev@gmail.com" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                <span>📧</span> tareq.islam.dev@gmail.com
              </a>
              <a href="tel:+8801732483149" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                <span>📱</span> +880 1732-483149
              </a>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 7 }}>
                <span>📍</span> Sylhet, Bangladesh
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Pages</h4>
            {NAV_LINKS.map((l, i) => (
              <div key={i} onClick={() => nav(l === "Home" ? "/" : "/" + l.toLowerCase())}
                style={{ color: "rgba(255,255,255,0.33)", fontSize: "0.87rem", marginBottom: 10, cursor: "pointer", fontFamily: "var(--font-body)", transition: "color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00D4AA"; e.currentTarget.style.transform = "translateX(5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.33)"; e.currentTarget.style.transform = "none"; }}>
                {l}
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Services</h4>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.33)", fontSize: "0.87rem", marginBottom: 10, fontFamily: "var(--font-body)" }}>{s}</div>
            ))}
          </div>

          {/* Hire Me */}
          <div>
            <h4 style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Hire Me</h4>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.84rem", lineHeight: 1.85, marginBottom: 18, fontFamily: "var(--font-body)" }}>Available for freelance & full-time opportunities.</p>
            <div onClick={() => nav("/contact")}
              style={{ display: "inline-block", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 18px rgba(0,212,170,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              Get In Touch 🚀
            </div>

            {/* Projects preview */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["🦷","ST Dental","https://st-dental-frontend.vercel.app/"],
                ["📈","Vinance","https://vinance-frontend-vjqa.vercel.app/"],
              ].map(([e, t, u]) => (
                <a key={t} href={u} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#00D4AA"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                  <span>{e}</span> {t} <span style={{ color: "rgba(0,212,170,0.5)", fontSize: "0.65rem" }}>▲ vercel</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "clamp(16px,2.5vw,24px) 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} Tarikul Islam Tarek. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {["⚛️ React","🍃 MongoDB","⚡ Vite","▲ Vercel"].map((t, i) => (
              <span key={i} style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{\`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:580px){.footer-grid{grid-template-columns:1fr!important}}
      \`}</style>
    </footer>
  );
}
`);

// ══════════════════════════════════════════
// 3. About.jsx — complete rebuild using SocialLink (SVG, with LinkedIn)
// ══════════════════════════════════════════
write(path.join(src, "pages/About.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import SocialLinks, { SocialLink } from "../components/SocialIcons";

export default function About() {
  const nav = useNavigate();
  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="About Tarikul Islam Tarek | MERN Developer" description="Learn about Tarikul Islam Tarek - MERN Full Stack Developer and Digital Marketing Specialist based in Sylhet, Bangladesh." />
      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "clamp(30px,5vw,60px)", alignItems: "center" }} className="about-inner">

          {/* Image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "clamp(220px,26vw,290px)" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: 24, background: "linear-gradient(135deg,#00D4AA,#38BDF8,#818CF8)", padding: 3 }}>
                <div style={{ borderRadius: 22, background: "#050A14", width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", background: "linear-gradient(135deg,#0d1829,#0a1220)" }}>
                <img src="/profile.png" alt="Tarikul Islam Tarek"
                  onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;font-family:var(--font-head);font-weight:900;background:linear-gradient(135deg,#00D4AA,#818CF8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">T</div>'; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,10,20,0.7),transparent 50%)" }} />
                {/* Social icons on image */}
                <div style={{ position: "absolute", bottom: 16, left: 14, right: 14, display: "flex", gap: 8, justifyContent: "center" }}>
                  <SocialLink type="facebook"  size={36} />
                  <SocialLink type="instagram" size={36} />
                  <SocialLink type="linkedin"  size={36} />
                  <SocialLink type="github"    size={36} />
                </div>
              </div>
              {/* Badge */}
              <div style={{ position: "absolute", bottom: -18, right: -18, background: "#0d1829", border: "2px solid #00D4AA", borderRadius: 14, padding: "12px 18px", textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", zIndex: 2 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.5rem", color: "#00D4AA" }}>2+</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Projects Live</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "0.4rem", color: "#fff" }}>Tarikul Islam Tarek</h3>
            <div style={{ color: "#00D4AA", fontWeight: 600, marginBottom: "1.3rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>MERN Full Stack Developer & Digital Marketer</div>

            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "1rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>
              আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.93rem", fontFamily: "var(--font-body)" }}>
              আমার ২টি MERN project বর্তমানে Vercel এ live আছে। সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।
            </p>

            {/* Info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2rem" }}>
              {[
                ["👤 Name","Tarikul Islam Tarek"],
                ["💼 Role","MERN Developer"],
                ["📍 Location","Sylhet, Bangladesh"],
                ["🌐 Work","Remote Worldwide"],
                ["📧 Email","tareq.islam.dev@gmail.com"],
                ["📱 Phone","+880 1732-483149"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,212,170,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div style={{ color: "#00D4AA", fontSize: "0.7rem", marginBottom: 3, fontWeight: 600, fontFamily: "var(--font-body)" }}>{k}</div>
                  <div style={{ fontSize: "0.83rem", fontWeight: 500, wordBreak: "break-all", color: "rgba(255,255,255,0.8)" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Action buttons + Social */}
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => nav("/contact")}
                style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 22px rgba(0,212,170,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Let's Talk 👋
              </button>
              <SocialLinks size={44} />
            </div>
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:3rem!important}}\`}</style>
    </main>
  );
}
`);

console.log(`
╔══════════════════════════════════════════════════════════╗
║       ✅ Footer ও About সম্পূর্ণ rebuild হয়েছে!         ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║  ⚠️  তারপর browser এ Hard Refresh করুন: Ctrl+Shift+R    ║
║                                                          ║
║  সমস্যা ছিল: Footer.jsx এ পুরনো emoji-based SOCIALS     ║
║  array ছিল (📘📸🐙), যা SocialIcons component          ║
║  ব্যবহার করছিল না। এখন সম্পূর্ণ rebuild করা হয়েছে।     ║
║                                                          ║
║  ✅ এখন Footer এ ৪টি real SVG icon:                     ║
║     📘 Facebook (নীল) → আসল page link                  ║
║     📸 Instagram (pink/magenta)                         ║
║     💼 LinkedIn (নীল "in") → tareq-islam3149           ║
║     🐙 GitHub (সাদা cat)                                ║
║                                                          ║
║  ✅ About page এ ছবির নিচে + button পাশে                ║
║     এই ৪টি icon দেখাবে                                  ║
╚══════════════════════════════════════════════════════════╝
`);
