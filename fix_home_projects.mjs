import fs from "fs";
import path from "path";

const file = path.join("src", "pages", "Home.jsx");

if (!fs.existsSync(file)) {
  console.error("❌ src/pages/Home.jsx পাওয়া যায়নি। client ফোল্ডারে গিয়ে চালান।");
  process.exit(1);
}

let code = fs.readFileSync(file, "utf8");
const original = code;

// ── 1. Import projectsAPI alongside the existing skills/blogs imports ──
if (code.includes("import { skillsAPI, blogsAPI } from '../services/api';")) {
  code = code.replace(
    "import { skillsAPI, blogsAPI } from '../services/api';",
    "import { skillsAPI, blogsAPI, projectsAPI } from '../services/api';"
  );
} else if (!code.includes("projectsAPI")) {
  console.warn("⚠️ skillsAPI/blogsAPI import লাইন খুঁজে পাইনি — projectsAPI ম্যানুয়ালি import করতে হবে।");
}

// ── 2. Remove static PROJECTS array ──────────────────────────────────
code = code.replace(
  /const PROJECTS = \[[\s\S]*?\];\n\n/,
  ""
);

// ── 3. Add `projects` state + fetch inside the existing data useEffect ──
const oldFetchBlock = `  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
    ]).then(([skillsRes, blogsRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
    }).finally(() => setDataLoading(false));
  }, []);`;

const newFetchBlock = `  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
      projectsAPI.getAll().catch(() => ({ data: [] })),
    ]).then(([skillsRes, blogsRes, projectsRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
      setProjects(projectsRes.data || []);
    }).finally(() => setDataLoading(false));
  }, []);`;

if (code.includes(oldFetchBlock)) {
  code = code.replace(oldFetchBlock, newFetchBlock);
} else {
  console.warn("⚠️ data-fetch useEffect block hubahu match korenni — manual check korte hobe.");
}

// ── 4. Add `projects` useState right after the `blogs` useState ──────
const oldStateLine = `  const [blogs, setBlogs] = useState([]);`;
const newStateLine = `  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);`;

if (code.includes(oldStateLine)) {
  code = code.replace(oldStateLine, newStateLine);
} else {
  console.warn("⚠️ blogs useState লাইন খুঁজে পাইনি — manual check korte hobe.");
}

// ── 5. Replace Projects grid: PROJECTS.map(...) → projects.map(...) ──
const oldProjectsMap = `            {PROJECTS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '22px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: 'linear-gradient(135deg,' + p.color + '18,' + p.color + '07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', position: 'relative' }}>
                  {p.emoji}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', color: '#00D4AA', fontWeight: 700, fontFamily: '"DM Sans",sans-serif' }}>▲ LIVE</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: 800, marginBottom: '6px', fontFamily: '"Syne",sans-serif' }}>{p.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', lineHeight: '1.7', marginBottom: '14px', fontFamily: '"DM Sans",sans-serif' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {p.tech.map((t, j) => (<span key={j} style={{ padding: '2px 9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{t}</span>))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '9px', background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', borderRadius: '8px', color: '#050A14', fontWeight: 800, fontSize: '11px', textAlign: 'center', textDecoration: 'none', fontFamily: '"DM Sans",sans-serif', display: 'block' }}>Live Demo</a>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '11px', textAlign: 'center', textDecoration: 'none', fontFamily: '"DM Sans",sans-serif', display: 'block' }}>GitHub</a>
                  </div>
                </div>
              </motion.div>
            ))}`;

const newProjectsMap = `            {dataLoading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Loading projects...</p>
            )}
            {!dataLoading && projects.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Projects coming soon.</p>
            )}
            {projects.slice(0, 4).map((p, i) => (
              <motion.div key={p._id || i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '22px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: 'linear-gradient(135deg,' + (p.color || '#00D4AA') + '18,' + (p.color || '#00D4AA') + '07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', position: 'relative' }}>
                  {p.emoji || '🚀'}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', color: '#00D4AA', fontWeight: 700, fontFamily: '"DM Sans",sans-serif' }}>▲ {p.status || 'LIVE'}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: 800, marginBottom: '6px', fontFamily: '"Syne",sans-serif' }}>{p.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', lineHeight: '1.7', marginBottom: '14px', fontFamily: '"DM Sans",sans-serif' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {(p.tech || []).map((t, j) => (<span key={j} style={{ padding: '2px 9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{t}</span>))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '9px', background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', borderRadius: '8px', color: '#050A14', fontWeight: 800, fontSize: '11px', textAlign: 'center', textDecoration: 'none', fontFamily: '"DM Sans",sans-serif', display: 'block' }}>Live Demo</a>}
                    {p.github && p.github !== '#' && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '11px', textAlign: 'center', textDecoration: 'none', fontFamily: '"DM Sans",sans-serif', display: 'block' }}>GitHub</a>}
                  </div>
                </div>
              </motion.div>
            ))}`;

if (code.includes(oldProjectsMap)) {
  code = code.replace(oldProjectsMap, newProjectsMap);
} else {
  console.warn("⚠️ Projects map block hubahu match korenni — manual check korte hobe.");
}

if (code === original) {
  console.error("❌ কোনো পরিবর্তনই হয়নি — ফাইলের content আশানুরূপ ছিল না।");
  process.exit(1);
}

fs.writeFileSync(file, code, "utf8");
console.log("✅ Home.jsx আপডেট হয়েছে — Projects preview section এখন real database থেকে data আনবে।");
