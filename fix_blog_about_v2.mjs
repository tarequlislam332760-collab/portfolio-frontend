import fs from "fs";

// ══════════════════════════════════════════════════
// FIX 1: About.jsx — remove social icons from image overlay
// ══════════════════════════════════════════════════
const aboutPath = "src/pages/About.jsx";
let about = fs.readFileSync(aboutPath, "utf8");

const socialOnImageRegex = /\s*\{\/\*\s*Social icons on image\s*\*\/\}\s*<div style=\{\{ position: "absolute", bottom: 16, left: 14, right: 14[\s\S]*?<\/div>\s*\n/;

if (socialOnImageRegex.test(about)) {
  about = about.replace(socialOnImageRegex, "\n");
  fs.writeFileSync(aboutPath, about, "utf8");
  console.log("✅ About.jsx — ছবির উপর থেকে social icons remove হয়েছে।");
} else {
  console.log("⚠️  About.jsx এ social-icons-on-image block খুঁজে পাওয়া যায়নি। Manual check করতে হবে:");
  console.log("    sed -n '25,40p' src/pages/About.jsx");
}

// ══════════════════════════════════════════════════
// FIX 2: Blog.jsx — add click-to-open detail modal
// ══════════════════════════════════════════════════
const blogPath = "src/pages/Blog.jsx";
let blog = fs.readFileSync(blogPath, "utf8");

// 2a. Ensure useState import has what we need (assume useState already imported since search/filter exist)
// 2b. Add a `selected` state near other useState calls (insert after first useState line)
if (!blog.includes("const [selectedPost, setSelectedPost]")) {
  blog = blog.replace(
    /(const \[search, setSearch\] = useState\([^)]*\);)/,
    `$1\n  const [selectedPost, setSelectedPost] = useState(null);`
  );
  // fallback if that exact line isn't found
  if (!blog.includes("const [selectedPost, setSelectedPost]")) {
    blog = blog.replace(
      /(export default function Blog[^{]*\{\s*\n)/,
      `$1  const [selectedPost, setSelectedPost] = useState(null);\n`
    );
  }
}

// 2c. Add onClick to the card div to open the modal
const cardOpenRegex = /(<div key=\{p\._id\}\s*\n\s*style=\{\{ background: "rgba\(255,255,255,0\.02\)", border: "1px solid rgba\(255,255,255,0\.07\)", borderRadius: 20, padding: "clamp\(16px,2\.5vw,24px\)", cursor: "pointer",)/;

if (cardOpenRegex.test(blog)) {
  blog = blog.replace(
    cardOpenRegex,
    `<div key={p._id}\n                  onClick={() => setSelectedPost(p)}\n                  $1`
  );
  console.log("✅ Blog.jsx — card click এ setSelectedPost যুক্ত হয়েছে।");
} else {
  console.log("⚠️  Blog.jsx card div regex mismatch। Manual check করতে হবে:");
  console.log("    sed -n '124,128p' src/pages/Blog.jsx");
}

// 2d. Insert the detail modal JSX right before the final closing of the component
// We insert just before the last `</div>\n  );\n}` pattern (end of component return)
const modalJSX = `
      {/* Blog Detail Modal */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(5,10,20,0.85)", backdropFilter: "blur(8px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,3vw,40px)", animation: "fadeIn 0.25s ease" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#0a0f1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, maxWidth: 720, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: "clamp(24px,4vw,40px)", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 }}
            >
              ×
            </button>
            <div style={{ fontSize: "clamp(2.2rem,5vw,3rem)", marginBottom: 16 }}>{selectedPost.emoji || "📝"}</div>
            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,3vw,1.8rem)", color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>
              {selectedPost.title}
            </h2>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
              <span style={{ color: "#38BDF8", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>{selectedPost.category}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>•</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>{selectedPost.readTime} min read</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>•</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
                {new Date(selectedPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.9, fontFamily: "var(--font-body)", whiteSpace: "pre-line" }}>
              {selectedPost.content || selectedPost.excerpt}
            </p>
          </div>
        </div>
      )}
`;

// Insert before the very last occurrence of "  );\n}" at end of file (component's final return close)
const lastReturnCloseRegex = /(\n\s*<\/div>\s*\n\s*\);\s*\n\}\s*$)/;

if (lastReturnCloseRegex.test(blog)) {
  blog = blog.replace(lastReturnCloseRegex, `\n${modalJSX}    </div>\n  );\n}`);
  console.log("✅ Blog.jsx — Detail modal JSX যুক্ত হয়েছে।");
} else {
  console.log("⚠️  Blog.jsx এর component এর শেষ closing tag খুঁজে পাওয়া যায়নি। Manual insert প্রয়োজন।");
}

fs.writeFileSync(blogPath, blog, "utf8");

console.log(`
╔══════════════════════════════════════════════════════════╗
║  ✅ Done!                                                  ║
║  npm run dev চালু থাকলে browser refresh করুন।           ║
║  Blog card এ click করলে এখন একটা modal খুলবে পুরো        ║
║  article দেখানোর জন্য।                                    ║
╚══════════════════════════════════════════════════════════╝
`);
