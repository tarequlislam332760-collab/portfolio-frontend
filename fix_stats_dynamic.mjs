import fs from "fs";
import path from "path";

// ── Fix 1: Profile model ──────────────────────────────────────────────
const profileModel = path.join("..", "backend", "models", "Profile.js");

if (fs.existsSync(profileModel)) {
  let code = fs.readFileSync(profileModel, "utf8");
  if (!code.includes("stat1n")) {
    code = code.replace(
      "  image:     { type: String, default: '' },",
      `  image:     { type: String, default: '' },
  stat1n:    { type: String, default: '2+' },
  stat1l:    { type: String, default: 'Projects Live' },
  stat2n:    { type: String, default: '3+' },
  stat2l:    { type: String, default: 'Years Exp' },
  stat3n:    { type: String, default: '20+' },
  stat3l:    { type: String, default: 'Clients' },
  stat4n:    { type: String, default: '15+' },
  stat4l:    { type: String, default: 'Technologies' },`
    );
    fs.writeFileSync(profileModel, code, "utf8");
    console.log("✅ Profile model এ stat fields যোগ হয়েছে।");
  } else {
    console.log("ℹ️ Profile model এ stat fields আগে থেকেই আছে।");
  }
} else {
  console.warn("⚠️ Profile.js পাওয়া যায়নি — path check করুন।");
}

// ── Fix 2: Home.jsx — replace STATS.map with profile-driven stats ─────
const homeFile = path.join("src", "pages", "Home.jsx");

if (!fs.existsSync(homeFile)) {
  console.error("❌ Home.jsx পাওয়া যায়নি।");
  process.exit(1);
}

let home = fs.readFileSync(homeFile, "utf8");

// Remove the STATS constant entirely
home = home.replace(/const STATS=\[[\s\S]*?\];\n?/, "");
home = home.replace(/const STATS = \[[\s\S]*?\];\n?/, "");

// Replace STATS.map(... with inline profile-driven array
if (home.includes("STATS.map(")) {
  home = home.replace(
    /\{STATS\.map\(\(s,\s*i\)\s*=>\s*\(/,
    `{[
                  [profile?.stat1n||'2+', profile?.stat1l||'Projects Live'],
                  [profile?.stat2n||'3+', profile?.stat2l||'Years Exp'],
                  [profile?.stat3n||'20+', profile?.stat3l||'Clients'],
                  [profile?.stat4n||'15+', profile?.stat4l||'Technologies'],
                ].map(([n,l], i) => (`
  );
  // Replace {s.n} and {s.l} with {n} and {l}
  home = home.replace(/\{s\.n\}/g, "{n}");
  home = home.replace(/\{s\.l\}/g, "{l}");
  fs.writeFileSync(homeFile, home, "utf8");
  console.log("✅ Home.jsx — Stats এখন profile থেকে dynamic হয়েছে।");
} else {
  console.warn("⚠️ STATS.map খুঁজে পাওয়া যায়নি — ইতিমধ্যে fix হয়ে গেছে অথবা manual check দরকার।");
}
