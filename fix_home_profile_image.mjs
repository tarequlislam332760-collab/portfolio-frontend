import fs from "fs";
import path from "path";

const file = path.join("src", "pages", "Home.jsx");

if (!fs.existsSync(file)) {
  console.error("❌ src/pages/Home.jsx পাওয়া যায়নি। client ফোল্ডারে গিয়ে চালান।");
  process.exit(1);
}

let code = fs.readFileSync(file, "utf8");
const original = code;

// ── 1. Import profileAPI alongside the existing imports ──────────────
if (code.includes("import { skillsAPI, blogsAPI, projectsAPI } from '../services/api';")) {
  code = code.replace(
    "import { skillsAPI, blogsAPI, projectsAPI } from '../services/api';",
    "import { skillsAPI, blogsAPI, projectsAPI, profileAPI } from '../services/api';"
  );
} else if (code.includes("import { skillsAPI, blogsAPI } from '../services/api';")) {
  code = code.replace(
    "import { skillsAPI, blogsAPI } from '../services/api';",
    "import { skillsAPI, blogsAPI, profileAPI } from '../services/api';"
  );
} else {
  console.warn("⚠️ services/api import লাইন খুঁজে পাইনি — profileAPI ম্যানুয়ালি import করতে হবে।");
}

// ── 2. Add `profile` state ────────────────────────────────────────────
const oldStateLine = `  const [projects, setProjects] = useState([]);`;
const newStateLine = `  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);`;

if (code.includes(oldStateLine)) {
  code = code.replace(oldStateLine, newStateLine);
} else {
  // fallback if projects state line not present (projects fix wasn't applied)
  const altOld = `  const [blogs, setBlogs] = useState([]);`;
  const altNew = `  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);`;
  if (code.includes(altOld)) {
    code = code.replace(altOld, altNew);
  } else {
    console.warn("⚠️ state useState লাইন খুঁজে পাইনি — profile state ম্যানুয়ালি যোগ করতে হবে।");
  }
}

// ── 3. Fetch profile inside the existing Promise.all data effect ─────
const oldFetchWithProjects = `  useEffect(() => {
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

const newFetchWithProjects = `  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
      projectsAPI.getAll().catch(() => ({ data: [] })),
      profileAPI.get().catch(() => ({ data: null })),
    ]).then(([skillsRes, blogsRes, projectsRes, profileRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
      setProjects(projectsRes.data || []);
      setProfile(profileRes.data || null);
    }).finally(() => setDataLoading(false));
  }, []);`;

const oldFetchNoProjects = `  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
    ]).then(([skillsRes, blogsRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
    }).finally(() => setDataLoading(false));
  }, []);`;

const newFetchNoProjects = `  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
      profileAPI.get().catch(() => ({ data: null })),
    ]).then(([skillsRes, blogsRes, profileRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
      setProfile(profileRes.data || null);
    }).finally(() => setDataLoading(false));
  }, []);`;

if (code.includes(oldFetchWithProjects)) {
  code = code.replace(oldFetchWithProjects, newFetchWithProjects);
} else if (code.includes(oldFetchNoProjects)) {
  code = code.replace(oldFetchNoProjects, newFetchNoProjects);
} else {
  console.warn("⚠️ data-fetch useEffect block hubahu match korenni — profileAPI fetch manually যোগ করতে হবে।");
}

// ── 4. Add a helper for resolving the image (profile.image if present, else static fallback) ──
// We insert this right after the PROFILE_IMG constant definition.
if (code.includes("const PROFILE_IMG = '/profile.png';")) {
  code = code.replace(
    "const PROFILE_IMG = '/profile.png';",
    "const PROFILE_IMG = '/profile.png'; // static fallback if no DB image yet"
  );
} else {
  console.warn("⚠️ PROFILE_IMG কনস্ট্যান্ট খুঁজে পাইনি।");
}

// Inside the component, add a derived display image right after profile state is declared usage point —
// simplest: replace every `src={PROFILE_IMG}` with a dynamic expression using `profile`.
const occurrencesBefore = (code.match(/src=\{PROFILE_IMG\}/g) || []).length;
code = code.replaceAll(
  "src={PROFILE_IMG}",
  "src={(profile && profile.image) ? profile.image : PROFILE_IMG}"
);

// ── 5. Replace hardcoded name/title text with dynamic profile fields where easy & safe ──
// Hero "Tarikul Islam Tarek" name badge under the About-preview image card:
code = code.replace(
  `<div style={{ color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: '"Syne",sans-serif' }}>Tarikul Islam Tarek</div>
                      <div style={{ color: '#00D4AA', fontSize: '11px', fontFamily: '"DM Sans",sans-serif', marginTop: '1px' }}>MERN Dev & Digital Marketer</div>`,
  `<div style={{ color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: '"Syne",sans-serif' }}>{profile?.name || 'Tarikul Islam Tarek'}</div>
                      <div style={{ color: '#00D4AA', fontSize: '11px', fontFamily: '"DM Sans",sans-serif', marginTop: '1px' }}>{profile?.title || 'MERN Dev & Digital Marketer'}</div>`
);

if (code === original) {
  console.error("❌ কোনো পরিবর্তনই হয়নি — ফাইলের content আশানুরূপ ছিল না।");
  process.exit(1);
}

fs.writeFileSync(file, code, "utf8");
console.log(`✅ Home.jsx আপডেট হয়েছে — ${occurrencesBefore}টা জায়গায় ছবি এখন profile API থেকে dynamic হবে (data না থাকলে static fallback দেখাবে), নাম/title-ও dynamic হয়েছে।`);
