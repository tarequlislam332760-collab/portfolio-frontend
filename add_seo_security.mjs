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

function replaceInFile(filePath, find, replace, label) {
  if (!fs.existsSync(filePath)) { console.log("⚠️  skip (not found):", filePath); return; }
  let c = fs.readFileSync(filePath, "utf8");
  const before = c;
  c = c.split(find).join(replace);
  if (c !== before) {
    fs.writeFileSync(filePath, c, "utf8");
    console.log("✅ updated Facebook link in", filePath.replace(base + "/", ""), label || "");
  } else {
    console.log("ℹ️  no match in", filePath.replace(base + "/", ""));
  }
}

// ══════════════════════════════════════════
// 1. Update Facebook URL everywhere
// ══════════════════════════════════════════
const OLD_FB = "https://www.facebook.com/share/1USufH1bxT/";
[
  "src/components/SocialIcons.jsx",
  "src/components/Footer.jsx",
  "src/pages/About.jsx",
  "src/pages/Contact.jsx",
].forEach(f => replaceInFile(path.join(base, f), OLD_FB, FB_URL));

// ══════════════════════════════════════════
// 2. index.html — Full SEO + Security + Performance
// ══════════════════════════════════════════
write(path.join(base, "index.html"), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/profile.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- ═══ PRIMARY SEO ═══ -->
    <title>Tarikul Islam Tarek | MERN Full Stack Developer & Digital Marketer</title>
    <meta name="description" content="Tarikul Islam Tarek - MERN Full Stack Developer & Digital Marketing Specialist from Sylhet, Bangladesh. 2+ live projects on Vercel. Available for freelance & full-time work." />
    <meta name="keywords" content="Tarikul Islam Tarek, MERN Developer, Full Stack Developer Bangladesh, React Developer, Node.js Developer, Digital Marketer, Sylhet Developer, Web Developer Bangladesh, MongoDB Express React Node" />
    <meta name="author" content="Tarikul Islam Tarek" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://tarek-portfolio.vercel.app/" />

    <!-- ═══ OPEN GRAPH (Social Signals — Facebook/LinkedIn share preview) ═══ -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Tarikul Islam Tarek | MERN Full Stack Developer & Digital Marketer" />
    <meta property="og:description" content="MERN Full Stack Developer & Digital Marketing Specialist from Bangladesh. 2+ live projects on Vercel." />
    <meta property="og:image" content="/profile.png" />
    <meta property="og:url" content="https://tarek-portfolio.vercel.app/" />
    <meta property="og:site_name" content="Tarek.dev Portfolio" />
    <meta property="og:locale" content="en_US" />

    <!-- ═══ TWITTER CARD ═══ -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Tarikul Islam Tarek | MERN Developer & Digital Marketer" />
    <meta name="twitter:description" content="MERN Full Stack Developer & Digital Marketing Specialist. 2+ live projects on Vercel." />
    <meta name="twitter:image" content="/profile.png" />

    <!-- ═══ THEME ═══ -->
    <meta name="theme-color" content="#050A14" />
    <meta name="color-scheme" content="dark" />

    <!-- ═══ SECURITY HEADERS (meta-level) ═══ -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

    <!-- ═══ PERFORMANCE — Preconnect & Preload (Core Web Vitals) ═══ -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="/profile.png" />

    <!-- ═══ STRUCTURED DATA — JSON-LD (Keyword Prominence / Rich Results) ═══ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Tarikul Islam Tarek",
      "jobTitle": "MERN Full Stack Developer & Digital Marketer",
      "url": "https://tarek-portfolio.vercel.app/",
      "image": "/profile.png",
      "email": "tareq.islam.dev@gmail.com",
      "telephone": "+880-1732-483149",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sylhet",
        "addressCountry": "Bangladesh"
      },
      "sameAs": [
        "${FB_URL}",
        "https://www.instagram.com/tareq23337/?hl=en",
        "https://github.com/tarequlislam332760-collab"
      ],
      "knowsAbout": ["MongoDB","Express.js","React.js","Node.js","Digital Marketing","SEO","JavaScript"]
    }
    </script>

    <style>
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      body{background:#050A14;color:#fff;-webkit-font-smoothing:antialiased;}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-track{background:#050A14;}
      ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00D4AA,#38BDF8);border-radius:99px;}
      ::selection{background:rgba(0,212,170,0.25);color:#fff;}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes spinR{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
      @keyframes pulseGlow{0%,100%{box-shadow:0 0 8px #00D4AA}50%{box-shadow:0 0 22px #00D4AA,0 0 40px rgba(0,212,170,0.3)}}
      @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @keyframes blobPulse{0%,100%{transform:scale(1);opacity:0.15}50%{transform:scale(1.2);opacity:0.28}}
      @keyframes blobPulse2{0%,100%{transform:scale(1);opacity:0.1}50%{transform:scale(1.15);opacity:0.2}}
      @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
      @keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
    </style>
  </head>
  <body>
    <noscript>
      <div style="padding:40px;text-align:center;font-family:sans-serif;color:#fff;background:#050A14;">
        <h1>Tarikul Islam Tarek</h1>
        <p>MERN Full Stack Developer & Digital Marketer. Please enable JavaScript to view this portfolio.</p>
      </div>
    </noscript>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);

// ══════════════════════════════════════════
// 3. robots.txt — crawler access (Network signal)
// ══════════════════════════════════════════
write(path.join(base, "public/robots.txt"), `User-agent: *
Allow: /

Sitemap: https://tarek-portfolio.vercel.app/sitemap.xml
`);

// ══════════════════════════════════════════
// 4. sitemap.xml — helps indexing (Relevant Content / Network)
// ══════════════════════════════════════════
const today = new Date().toISOString().split("T")[0];
write(path.join(base, "public/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://tarek-portfolio.vercel.app/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
  <url><loc>https://tarek-portfolio.vercel.app/about</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>
  <url><loc>https://tarek-portfolio.vercel.app/skills</loc><lastmod>${today}</lastmod><priority>0.7</priority></url>
  <url><loc>https://tarek-portfolio.vercel.app/projects</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>
  <url><loc>https://tarek-portfolio.vercel.app/services</loc><lastmod>${today}</lastmod><priority>0.7</priority></url>
  <url><loc>https://tarek-portfolio.vercel.app/blog</loc><lastmod>${today}</lastmod><priority>0.6</priority></url>
  <url><loc>https://tarek-portfolio.vercel.app/contact</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>
</urlset>
`);

// ══════════════════════════════════════════
// 5. vercel.json — Security headers + Caching (Page Speed + Security)
// ══════════════════════════════════════════
write(path.join(base, "vercel.json"), `{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/(.*).(js|css|png|jpg|jpeg|webp|svg|woff|woff2)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
`);

// ══════════════════════════════════════════
// 6. SEO component — per-page dynamic meta (React Helmet alternative, no deps)
// ══════════════════════════════════════════
write(path.join(src, "components/SEO.jsx"), `
import React, { useEffect } from "react";

/**
 * Lightweight SEO component — updates document title & meta description
 * per page without extra dependencies (good for Core Web Vitals).
 */
export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
}
`);

// ══════════════════════════════════════════
// 7. Add SEO tags to each page (title + description)
// ══════════════════════════════════════════
const pageMeta = {
  "src/pages/Home.jsx": {
    title: "Tarikul Islam Tarek | MERN Full Stack Developer & Digital Marketer",
    desc: "MERN Full Stack Developer & Digital Marketing Specialist from Sylhet, Bangladesh. 2+ live projects on Vercel. Available for hire.",
    import: 'import SEO from "../components/SEO";',
    insertAfter: "export default function Home() {",
    seoLine: `  return (\n    <main>\n      <SEO title="Tarikul Islam Tarek | MERN Full Stack Developer & Digital Marketer" description="MERN Full Stack Developer & Digital Marketing Specialist from Sylhet, Bangladesh. 2+ live projects on Vercel." />`,
    findReturn: "  return (\n    <main>",
  },
};

// Home.jsx — inject SEO
{
  const fp = path.join(base, "src/pages/Home.jsx");
  let c = fs.readFileSync(fp, "utf8");
  if (!c.includes('components/SEO')) {
    c = c.replace(/import SectionTitle from "..\/components\/SectionTitle";/, `import SectionTitle from "../components/SectionTitle";\nimport SEO from "../components/SEO";`);
    c = c.replace("  return (\n    <main>", `  return (\n    <main>\n      <SEO title="Tarikul Islam Tarek | MERN Full Stack Developer & Digital Marketer" description="MERN Full Stack Developer & Digital Marketing Specialist from Sylhet, Bangladesh. 2+ live projects on Vercel. Available for hire." />`);
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ SEO added to Home.jsx");
  }
}

// About.jsx
{
  const fp = path.join(base, "src/pages/About.jsx");
  let c = fs.readFileSync(fp, "utf8");
  if (!c.includes('components/SEO')) {
    c = c.replace(/import SocialLinks, \{ SocialLink \} from "..\/components\/SocialIcons";/, `import SocialLinks, { SocialLink } from "../components/SocialIcons";\nimport SEO from "../components/SEO";`);
    c = c.replace('<main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>\n      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>\n        <SectionTitle pre="Who I Am" title="About" highlight="Me" />',
      '<main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>\n      <SEO title="About Tarikul Islam Tarek | MERN Developer" description="Learn about Tarikul Islam Tarek - MERN Full Stack Developer and Digital Marketing Specialist based in Sylhet, Bangladesh." />\n      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>\n        <SectionTitle pre="Who I Am" title="About" highlight="Me" />');
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ SEO added to About.jsx");
  }
}

// Projects.jsx
{
  const fp = path.join(base, "src/pages/Projects.jsx");
  let c = fs.readFileSync(fp, "utf8");
  if (!c.includes('components/SEO')) {
    c = c.replace(/import SectionTitle from "..\/components\/SectionTitle";/, `import SectionTitle from "../components/SectionTitle";\nimport SEO from "../components/SEO";`);
    c = c.replace('<main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>\n      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>\n        <SectionTitle pre="My Work" title="Live" highlight="Projects"',
      '<main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>\n      <SEO title="Projects | Tarikul Islam Tarek" description="Live MERN stack projects by Tarikul Islam Tarek - ST Dental Frontend and Vinance Dashboard, deployed on Vercel." />\n      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>\n        <SectionTitle pre="My Work" title="Live" highlight="Projects"');
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ SEO added to Projects.jsx");
  }
}

// Contact.jsx
{
  const fp = path.join(base, "src/pages/Contact.jsx");
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, "utf8");
    if (!c.includes('components/SEO')) {
      c = c.replace(/import SectionTitle from "..\/components\/SectionTitle";/, `import SectionTitle from "../components/SectionTitle";\nimport SEO from "../components/SEO";`);
      c = c.replace(/<main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>\n      <div/, '<main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>\n      <SEO title="Contact Tarikul Islam Tarek | Hire MERN Developer" description="Get in touch with Tarikul Islam Tarek for MERN development and digital marketing projects. Available for freelance and full-time work." />\n      <div');
      fs.writeFileSync(fp, c, "utf8");
      console.log("✅ SEO added to Contact.jsx");
    }
  }
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║       ✅ SEO + SECURITY সম্পূর্ণ যোগ হয়েছে!            ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  ✅ আপনার তালিকা অনুযায়ী যা যোগ হলো:                  ║
║                                                          ║
║  1️⃣  High Quality Human Content                         ║
║      → প্রতিটি page এ unique title + description       ║
║                                                          ║
║  2️⃣  Relevant Content (Keyword Prominence)              ║
║      → meta keywords + JSON-LD structured data          ║
║      → "MERN Developer", "Sylhet" ইত্যাদি keywords      ║
║                                                          ║
║  3️⃣  Core Web Vitals / Page Speed                       ║
║      → font preconnect/preload                          ║
║      → image preload                                    ║
║      → cache headers (vercel.json)                      ║
║                                                          ║
║  4️⃣  Network of Website                                 ║
║      → sitemap.xml + robots.txt                         ║
║      → canonical URL                                    ║
║                                                          ║
║  5️⃣  Social Signals                                     ║
║      → Open Graph tags (FB share preview)               ║
║      → Twitter Card tags                                ║
║      → ✅ Real Facebook page link updated:              ║
║         facebook.com/profile.php?id=615850...           ║
║                                                          ║
║  6️⃣  Website Security 🔒                                ║
║      → X-Frame-Options, X-Content-Type-Options          ║
║      → HSTS, Referrer-Policy, Permissions-Policy        ║
║      → vercel.json security headers                     ║
║                                                          ║
║  ⚠️  NOTE: vercel.json deploy করলেই headers active হবে  ║
╚══════════════════════════════════════════════════════════╝
`);
