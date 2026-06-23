import fs from "fs";
import path from "path";

const file = path.join("src", "pages", "Home.jsx");

if (!fs.existsSync(file)) {
  console.error("❌ src/pages/Home.jsx পাওয়া যায়নি। client ফোল্ডারে গিয়ে চালান।");
  process.exit(1);
}

let code = fs.readFileSync(file, "utf8");
const original = code;

// ── 1. Import API services ──────────────────────────────────────────
if (!code.includes('from "../services/api"') && !code.includes("from '../services/api'")) {
  code = code.replace(
    "import { useState, useEffect } from 'react';",
    "import { useState, useEffect } from 'react';\nimport { skillsAPI, blogsAPI } from '../services/api';"
  );
}

// ── 2. Remove static SKILLS_DATA array ──────────────────────────────
code = code.replace(
  /const SKILLS_DATA = \[[\s\S]*?\];\n\n/,
  ""
);

// ── 3. Remove static BLOG_POSTS array ───────────────────────────────
code = code.replace(
  /const BLOG_POSTS = \[[\s\S]*?\];\n\n/,
  ""
);

// ── 4. Add state + fetch logic right after the role-rotator useEffect ──
const oldEffectBlock = `  const [ri, setRi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);`;

const newEffectBlock = `  const [ri, setRi] = useState(0);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
    ]).then(([skillsRes, blogsRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
    }).finally(() => setDataLoading(false));
  }, []);`;

if (code.includes(oldEffectBlock)) {
  code = code.replace(oldEffectBlock, newEffectBlock);
} else {
  console.warn("⚠️ useEffect block hubahu match korenni — manual check korte hobe.");
}

// ── 5. Replace Skills grid: SKILLS_DATA.map(...) → skills.map(...) ──
// Skills category objects from backend look like: { category, icon, color, items: [{name, percent}] }
const oldSkillsMap = `            {SKILLS_DATA.map((g, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.07 }} whileHover={{ y: -5 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,' + g.color + ',transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, margin: 0, fontFamily: '"Syne",sans-serif' }}>{g.cat}</h3>
                </div>
                {g.items.slice(0, 3).map(([nm, pct], i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '12px', fontFamily: '"DM Sans",sans-serif' }}>{nm}</span>
                      <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px', fontFamily: '"DM Sans",sans-serif' }}>{pct}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: pct + '%' }} viewport={{ once: true }} transition={{ duration: 0.9, delay: gi * 0.06 + i * 0.05 }}
                        style={{ height: '100%', borderRadius: '99px', background: g.color }} />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}`;

const newSkillsMap = `            {dataLoading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Loading skills...</p>
            )}
            {!dataLoading && skills.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Skills coming soon.</p>
            )}
            {skills.map((g, gi) => (
              <motion.div key={g._id || gi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.07 }} whileHover={{ y: -5 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,' + (g.color || '#38BDF8') + ',transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, margin: 0, fontFamily: '"Syne",sans-serif' }}>{g.icon ? g.icon + ' ' : ''}{g.category}</h3>
                </div>
                {(g.items || []).slice(0, 3).map((it, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '12px', fontFamily: '"DM Sans",sans-serif' }}>{it.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px', fontFamily: '"DM Sans",sans-serif' }}>{it.percent}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: (it.percent || 0) + '%' }} viewport={{ once: true }} transition={{ duration: 0.9, delay: gi * 0.06 + i * 0.05 }}
                        style={{ height: '100%', borderRadius: '99px', background: g.color || '#38BDF8' }} />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}`;

if (code.includes(oldSkillsMap)) {
  code = code.replace(oldSkillsMap, newSkillsMap);
} else {
  console.warn("⚠️ Skills map block hubahu match korenni — manual check korte hobe.");
}

// ── 6. Replace Blog grid: BLOG_POSTS.map(...) → blogs.map(...) ──
const oldBlogMap = `            {BLOG_POSTS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '22px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.18)', borderRadius: '99px', padding: '2px 10px', color: p.color, fontSize: '10px', fontWeight: 700, fontFamily: '"DM Sans",sans-serif' }}>{p.cat}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{p.read}</span>
                </div>
                <div style={{ fontSize: '38px', marginBottom: '12px' }}>{p.emoji}</div>
                <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, lineHeight: '1.42', marginBottom: '8px', fontFamily: '"Syne",sans-serif' }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: '1.68', fontFamily: '"DM Sans",sans-serif', margin: 0 }}>{p.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{p.date}</span>
                  <motion.span whileHover={{ x: 3 }} style={{ color: '#38BDF8', fontSize: '11px', fontWeight: 600, fontFamily: '"DM Sans",sans-serif' }}>Read →</motion.span>
                </div>
              </motion.div>
            ))}`;

const newBlogMap = `            {dataLoading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Loading articles...</p>
            )}
            {!dataLoading && blogs.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>No blog posts yet. Check back soon!</p>
            )}
            {blogs.slice(0, 4).map((p, i) => (
              <motion.div key={p._id || i} onClick={() => go('blog/' + p._id)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '22px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.18)', borderRadius: '99px', padding: '2px 10px', color: '#38BDF8', fontSize: '10px', fontWeight: 700, fontFamily: '"DM Sans",sans-serif' }}>{p.category}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{p.readTime ? p.readTime + ' min' : ''}</span>
                </div>
                <div style={{ fontSize: '38px', marginBottom: '12px' }}>{p.emoji || '✍️'}</div>
                <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, lineHeight: '1.42', marginBottom: '8px', fontFamily: '"Syne",sans-serif' }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: '1.68', fontFamily: '"DM Sans",sans-serif', margin: 0 }}>{p.excerpt}</p>
                <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US',{month:'short',year:'numeric'}) : ''}</span>
                  <motion.span whileHover={{ x: 3 }} style={{ color: '#38BDF8', fontSize: '11px', fontWeight: 600, fontFamily: '"DM Sans",sans-serif' }}>Read →</motion.span>
                </div>
              </motion.div>
            ))}`;

if (code.includes(oldBlogMap)) {
  code = code.replace(oldBlogMap, newBlogMap);
} else {
  console.warn("⚠️ Blog map block hubahu match korenni — manual check korte hobe.");
}

if (code === original) {
  console.error("❌ কোনো পরিবর্তনই হয়নি — ফাইলের content আশানুরূপ ছিল না।");
  process.exit(1);
}

fs.writeFileSync(file, code, "utf8");
console.log("✅ Home.jsx আপডেট হয়েছে — Skills ও Blog section এখন real database থেকে data আনবে।");
