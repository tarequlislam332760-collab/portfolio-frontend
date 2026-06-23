import fs from "fs";

// ══════════════════════════════════════════════════
// STEP 1: Clean up Blog.jsx — remove broken selectedPost state + modal,
//          add useNavigate, make card onClick navigate to /blog/:id
// ══════════════════════════════════════════════════
const blogPath = "src/pages/Blog.jsx";
let blog = fs.readFileSync(blogPath, "utf8");
const blogBefore = blog;

// 1a. Add useNavigate import (react-router-dom) if missing
if (!blog.includes("useNavigate")) {
  blog = blog.replace(
    /(import React, \{ useEffect, useState \} from "react";\n)/,
    `$1import { useNavigate } from "react-router-dom";\n`
  );
}

// 1b. Remove the broken `const [selectedPost, setSelectedPost] = useState(null);` line if present
blog = blog.replace(/\n\s*const \[selectedPost, setSelectedPost\] = useState\(null\);/g, "");

// 1c. Add `const navigate = useNavigate();` right after function declaration if missing
if (!blog.includes("const navigate = useNavigate();")) {
  blog = blog.replace(
    /(export default function Blog\([^)]*\)\s*\{\s*\n)/,
    `$1  const navigate = useNavigate();\n`
  );
}

// 1d. Fix the card onClick — remove any old setSelectedPost reference, ensure navigate works
blog = blog.replace(
  /onClick=\{\(\) => setSelectedPost\(p\)\}/g,
  `onClick={() => navigate('/blog/' + p._id)}`
);
blog = blog.replace(
  /onClick=\{\(\) => navigate\('blog\/' \+ p\._id\)\}/g,
  `onClick={() => navigate('/blog/' + p._id)}`
);

// 1e. If the card div doesn't have an onClick at all yet, add it (safety net)
if (!blog.includes("navigate('/blog/' + p._id)")) {
  blog = blog.replace(
    /(<div key=\{p\._id\}\s*\n\s*style=\{\{ background: "rgba\(255,255,255,0\.02\)")/,
    `<div key={p._id}\n                  onClick={() => navigate('/blog/' + p._id)}\n                  style={{ background: "rgba(255,255,255,0.02)"`
  );
}

// 1f. Remove any leftover broken "Blog Detail Modal" JSX block (from the earlier failed script)
blog = blog.replace(/\n\s*\{\/\* Blog Detail Modal \*\/\}[\s\S]*?\n\s*\)\}\n/m, "\n");

if (blog !== blogBefore) {
  fs.writeFileSync(blogPath, blog, "utf8");
  console.log("✅ Blog.jsx পরিষ্কার করে card click navigation যুক্ত হয়েছে।");
} else {
  console.log("⚠️  Blog.jsx এ কোনো পরিবর্তন হয়নি — হয়তো আগেই ঠিক ছিল।");
}

// ══════════════════════════════════════════════════
// STEP 2: Create BlogDetail.jsx — full SEO-friendly article page
// ══════════════════════════════════════════════════
const blogDetailPath = "src/pages/BlogDetail.jsx";
const blogDetailContent = `import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { blogsAPI } from "../services/api";

const CAT_CONFIG = {
  "React":        { icon: "⚛️",  color: "#61DAFB", bg: "rgba(97,218,251,0.08)",  border: "rgba(97,218,251,0.2)" },
  "Node.js":      { icon: "🟢",  color: "#68A063", bg: "rgba(104,160,99,0.08)",  border: "rgba(104,160,99,0.2)" },
  "MongoDB":      { icon: "🍃",  color: "#4DB33D", bg: "rgba(77,179,61,0.08)",   border: "rgba(77,179,61,0.2)" },
  "Express":      { icon: "⚙️",  color: "#cccccc", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)" },
  "Next.js":      { icon: "▲",   color: "#ffffff", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)" },
  "JavaScript":   { icon: "📜",  color: "#F7DF1E", bg: "rgba(247,223,30,0.08)",  border: "rgba(247,223,30,0.2)" },
  "TypeScript":   { icon: "📘",  color: "#3178C6", bg: "rgba(49,120,198,0.08)",  border: "rgba(49,120,198,0.2)" },
  "SEO":          { icon: "🔍",  color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)" },
  "Marketing":    { icon: "📈",  color: "#f472b6", bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.2)" },
  "Facebook Ads": { icon: "📘",  color: "#1877F2", bg: "rgba(24,119,242,0.08)",  border: "rgba(24,119,242,0.2)" },
  "Google Ads":   { icon: "🎯",  color: "#EA4335", bg: "rgba(234,67,53,0.08)",   border: "rgba(234,67,53,0.2)" },
  "Tailwind CSS": { icon: "🌊",  color: "#06B6D4", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.2)" },
  "Git":          { icon: "🌿",  color: "#F05031", bg: "rgba(240,80,49,0.08)",   border: "rgba(240,80,49,0.2)" },
  "default":      { icon: "✍️",  color: "#38BDF8", bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.2)" },
};
const getCfg = (cat) => CAT_CONFIG[cat] || CAT_CONFIG["default"];

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    blogsAPI.getAll()
      .then(res => {
        const all = res.data || [];
        const found = all.find(p => p._id === id);
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>Loading article...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
        <SEO title="Article Not Found | Tarikul Islam Tarek" description="The blog post you're looking for could not be found." />
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
        <h2 style={{ color: "#fff", fontFamily: "var(--font-head)", marginBottom: "0.5rem" }}>Article Not Found</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", marginBottom: "1.5rem" }}>This blog post doesn't exist or may have been removed.</p>
        <button onClick={() => navigate("/blog")}
          style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>
          ← Back to Blog
        </button>
      </div>
    );
  }

  const cfg = getCfg(post.category);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div style={{ minHeight: "100vh", padding: "clamp(80px,10vw,120px) clamp(16px,4vw,24px) clamp(60px,8vw,100px)" }}>
      <SEO
        title={\`\${post.title} | Tarikul Islam Tarek Blog\`}
        description={post.excerpt}
      />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Back link */}
        <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontSize: "0.88rem", textDecoration: "none", marginBottom: "clamp(20px,3vw,32px)" }}>
          ← Back to all articles
        </Link>

        {/* Category + meta */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: "clamp(16px,2vw,20px)", flexWrap: "wrap" }}>
          <span style={{ background: cfg.bg, border: \`1px solid \${cfg.border}\`, color: cfg.color, borderRadius: 99, padding: "5px 14px", fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span>{cfg.icon}</span> {post.category}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
            {post.readTime} min read
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: "clamp(2.4rem,6vw,3.4rem)", marginBottom: "clamp(16px,2vw,20px)" }}>{post.emoji || cfg.icon}</div>
        <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.6rem,4.5vw,2.6rem)", color: "#fff", lineHeight: 1.25, marginBottom: "clamp(20px,3vw,28px)" }}>
          {post.title}
        </h1>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, rgba(0,212,170,0.3), transparent)", marginBottom: "clamp(28px,4vw,36px)" }} />

        {/* Content */}
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.95rem,2vw,1.05rem)", lineHeight: 1.95, fontFamily: "var(--font-body)", whiteSpace: "pre-line" }}>
          {post.content || post.excerpt}
        </div>

        {/* Share / footer */}
        <div style={{ marginTop: "clamp(40px,6vw,56px)", paddingTop: "clamp(24px,3vw,32px)", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <button onClick={() => navigate("/blog")}
            style={{ background: "transparent", border: "1px solid rgba(56,189,248,0.25)", color: "#38BDF8", borderRadius: 10, padding: "10px 22px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            ← More Articles
          </button>
          <button
            onClick={() => { navigator.clipboard?.writeText(pageUrl); }}
            style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", color: "#00D4AA", borderRadius: 10, padding: "10px 22px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            🔗 Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(blogDetailPath, blogDetailContent, "utf8");
console.log("✅ src/pages/BlogDetail.jsx তৈরি হয়েছে।");

// ══════════════════════════════════════════════════
// STEP 3: Add /blog/:id route in App.jsx
// ══════════════════════════════════════════════════
const appPath = "src/App.jsx";
let app = fs.readFileSync(appPath, "utf8");
const appBefore = app;

if (!app.includes("BlogDetail")) {
  app = app.replace(
    /(import Blog from "\.\/pages\/Blog";\n)/,
    `$1import BlogDetail from "./pages/BlogDetail";\n`
  );
}

if (!app.includes('path="/blog/:id"')) {
  app = app.replace(
    /(<Route path="\/blog" element=\{<Blog \/>\} \/>\n)/,
    `$1          <Route path="/blog/:id" element={<BlogDetail />} />\n`
  );
}

if (app !== appBefore) {
  fs.writeFileSync(appPath, app, "utf8");
  console.log("✅ App.jsx এ /blog/:id route যুক্ত হয়েছে।");
} else {
  console.log("⚠️  App.jsx এ পরিবর্তন করা যায়নি — pattern mismatch।");
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║  ✅ সম্পূর্ণ হয়েছে!                                        ║
╠══════════════════════════════════════════════════════════╣
║  • Blog.jsx — card click করলে /blog/:id তে navigate করবে ║
║  • BlogDetail.jsx — নতুন SEO-friendly article page        ║
║  • App.jsx — নতুন route যুক্ত হয়েছে                       ║
║                                                            ║
║  Frontend dev server চলমান থাকলে browser hard refresh    ║
║  করুন (Ctrl+Shift+R)।                                     ║
╚══════════════════════════════════════════════════════════╝
`);
