import fs from "fs";
import path from "path";

const file = path.join("src", "pages", "admin", "AdminProjects.jsx");

if (!fs.existsSync(file)) {
  console.error("❌ src/pages/admin/AdminProjects.jsx পাওয়া যায়নি। client ফোল্ডারে গিয়ে চালান।");
  process.exit(1);
}

let code = fs.readFileSync(file, "utf8");
const original = code;

// ── 1. Add a PROJECT_EMOJIS constant right after the DEF constant ──────
const oldDef = `const DEF = { title: "", desc: "", emoji: "🚀", tech: "", live: "", github: "", color: "#00D4AA", status: "Live", cat: "Full Stack" };`;

const newDefWithEmojis = `const DEF = { title: "", desc: "", emoji: "🚀", tech: "", live: "", github: "", color: "#00D4AA", status: "Live", cat: "Full Stack" };

// MERN stack + Marketing/Digital Marketing প্রাসঙ্গিক icon সেট
const PROJECT_EMOJIS = [
  "🚀","⚛️","🟢","🍃","⚙️","📦","🔗","💻","🖥️","🌐",
  "📱","🛒","💳","📊","📈","🎯","📣","📘","🔍","✉️",
  "💬","📅","🏥","🦷","💰","🔐","🗂️","☁️","🧩","🎨",
];`;

if (code.includes(oldDef)) {
  code = code.replace(oldDef, newDefWithEmojis);
} else {
  console.error("⚠️ DEF constant হুবহু match করেনি — manual check দরকার।");
  process.exit(1);
}

// ── 2. Replace the plain emoji <input> with a clickable premium picker grid ──
const oldInput = `          <input name="emoji"  placeholder="Emoji (🚀)" value={form.emoji}  onChange={inp} style={inputSt} />`;

const newPicker = `          <div style={{ marginBottom: "1rem" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 8 }}>
              Project Icon
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,212,170,0.08)", border: "1.5px solid rgba(0,212,170,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                {form.emoji || "🚀"}
              </div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>নিচ থেকে একটি icon বেছে নিন</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(42px,1fr))", gap: 7 }}>
              {PROJECT_EMOJIS.map(e => {
                const active = form.emoji === e;
                return (
                  <button key={e} type="button" onClick={() => setForm(f => ({ ...f, emoji: e }))}
                    style={{
                      aspectRatio: "1", borderRadius: 10, fontSize: "1.15rem", cursor: "pointer",
                      background: active ? "rgba(0,212,170,0.16)" : "rgba(255,255,255,0.03)",
                      border: active ? "1.5px solid #00D4AA" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: active ? "0 0 12px rgba(0,212,170,0.25)" : "none",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={ev => { if (!active) ev.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={ev => { if (!active) ev.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                    {e}
                  </button>
                );
              })}
            </div>
          </div>`;

if (code.includes(oldInput)) {
  code = code.replace(oldInput, newPicker);
} else {
  console.error("⚠️ emoji input লাইন হুবহু match করেনি — manual check দরকার।");
  process.exit(1);
}

if (code === original) {
  console.error("❌ কোনো পরিবর্তনই হয়নি।");
  process.exit(1);
}

fs.writeFileSync(file, code, "utf8");
console.log("✅ AdminProjects.jsx আপডেট হয়েছে — এখন একটি premium emoji picker grid আছে (MERN stack + Marketing icons)।");
