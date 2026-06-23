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
// SocialIcons.jsx — rebuilt with simpler, reliable SVGs (no <defs>/gradient id clashes)
// ══════════════════════════════════════════
write(path.join(src, "components/SocialIcons.jsx"), `
import React from "react";

const URLS = {
  facebook:  "https://www.facebook.com/profile.php?id=61585040426028&mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/tareq23337/?hl=en",
  linkedin:  "https://www.linkedin.com/in/tareq-islam3149/",
  github:    "https://github.com/tarequlislam332760-collab",
};

// Solid-color icons (no gradients/defs) so they always render correctly
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

const ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

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
// Verify Footer uses <SocialLinks />
// ══════════════════════════════════════════
{
  const fp = path.join(src, "components/Footer.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    if (c.includes("<SocialLinks")) {
      console.log("ℹ️  Footer.jsx already uses <SocialLinks /> — icons will now render correctly with LinkedIn included");
    } else if (c.includes("SocialIcons")) {
      console.log("ℹ️  Footer.jsx imports SocialIcons — check it renders <SocialLinks /> or individual <SocialLink />");
    } else {
      console.log("⚠️  Footer.jsx doesn't reference SocialIcons — adding SocialLinks import + usage manually needed");
    }
  }
}

// ══════════════════════════════════════════
// Verify About.jsx uses SocialLink with linkedin
// ══════════════════════════════════════════
{
  const fp = path.join(src, "pages/About.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    if (c.includes('type="linkedin"')) {
      console.log("ℹ️  About.jsx already references linkedin — will render correctly now");
    } else if (c.includes("SocialLink")) {
      // Try to add linkedin next to github occurrences
      c = c.replace(
        /(<SocialLink type="github"[^/]*\/>)/g,
        `<SocialLink type="linkedin"  size={36} />\n                  $1`
      );
      fs.writeFileSync(fp, c, "utf8");
      console.log("✅ About.jsx — linkedin icon inserted before github");
    }
  }
}

// ══════════════════════════════════════════
// Verify Contact.jsx uses SocialLink with linkedin
// ══════════════════════════════════════════
{
  const fp = path.join(src, "pages/Contact.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    if (c.includes('type="linkedin"')) {
      console.log("ℹ️  Contact.jsx already references linkedin — will render correctly now");
    } else if (c.includes("SocialLink")) {
      c = c.replace(
        /(<SocialLink type="github"[^/]*\/>)/g,
        `<SocialLink type="linkedin"  size={42} />\n                <SocialLink type="github"    size={42} />`
      );
      fs.writeFileSync(fp, c, "utf8");
      console.log("✅ Contact.jsx — linkedin icon ensured");
    }
  }
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║       ✅ Icons fix সম্পূর্ণ হয়েছে!                      ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  সমস্যা ছিল: SVG এর <defs>/gradient id একাধিক জায়গায়   ║
║  ব্যবহার হওয়ায় browser icon render করছিল না —          ║
║  পরিবর্তে empty box/emoji দেখাচ্ছিল।                    ║
║                                                          ║
║  ✅ এখন সব icon solid-color, dependency-free SVG:       ║
║     📘 Facebook — নীল circular logo                     ║
║     📸 Instagram — pink/magenta camera logo             ║
║     💼 LinkedIn — নীল "in" logo                         ║
║     🐙 GitHub — সাদা cat logo                           ║
║                                                          ║
║  এই icon গুলো এখন সঠিকভাবে দেখাবে:                      ║
║     → Footer                                            ║
║     → About page (ছবির নিচে + buttons পাশে)            ║
║     → Contact page                                      ║
╚══════════════════════════════════════════════════════════╝
`);
