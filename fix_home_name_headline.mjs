import fs from "fs";
import path from "path";

const file = path.join("src", "pages", "Home.jsx");

if (!fs.existsSync(file)) {
  console.error("❌ src/pages/Home.jsx পাওয়া যায়নি। client ফোল্ডারে গিয়ে চালান।");
  process.exit(1);
}

let code = fs.readFileSync(file, "utf8");
const original = code;

const old = `              Hi, I'm<br />
              <span style={{ background: 'linear-gradient(135deg,#00D4AA 0%,#38BDF8 50%,#818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tarikul Islam</span><br />
              <span style={{ background: 'linear-gradient(135deg,#00D4AA 0%,#38BDF8 50%,#818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tarek</span>`;

const replacement = `              Hi, I'm<br />
              <span style={{ background: 'linear-gradient(135deg,#00D4AA 0%,#38BDF8 50%,#818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{profile?.name || 'Tarikul Islam Tarek'}</span>`;

if (code.includes(old)) {
  code = code.replace(old, replacement);
  fs.writeFileSync(file, code, "utf8");
  console.log("✅ Headline এখন profile.name থেকে dynamic হয়েছে — Admin Panel-এ যে নাম দেবেন, সেটাই এখানে দেখাবে।");
} else {
  console.error("⚠️ exact match পাওয়া যায়নি — ফাইলের content আশানুরূপ ছিল না। ম্যানুয়াল check দরকার।");
  process.exit(1);
}
