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
// 1. Backend — Profile model already has all fields
//    About page uses same /api/profile endpoint
//    Just need frontend AdminAbout page
// ══════════════════════════════════════════

// ══════════════════════════════════════════
// 2. AdminAbout.jsx — separate About customization
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminAbout.jsx"), `
import React, { useEffect, useState, useRef } from "react";
import { profileAPI } from "../../services/api";

export default function AdminAbout() {
  const [data, setData] = useState({
    name: "Tarikul Islam Tarek",
    title: "MERN Full Stack Developer",
    subtitle: "Digital Marketing Specialist",
    bio: "আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।",
    bio2: "আমার ২টি MERN project বর্তমানে Vercel এ live আছে। সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।",
    location: "Sylhet, Bangladesh",
    email: "tareq.islam.dev@gmail.com",
    phone: "+880 1732-483149",
    available: true,
    image: "",
    // Info grid items
    infoRole: "MERN Developer",
    infoWork: "Remote Worldwide",
    // Stats
    stat1n: "2+", stat1l: "Projects Live",
    stat2n: "3+", stat2l: "Years Exp",
    stat3n: "20+", stat3l: "Clients",
    stat4n: "15+", stat4l: "Technologies",
  });
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [error,    setError]    = useState("");
  const [tab,      setTab]      = useState("content");
  const [preview,  setPreview]  = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        if (res.data) {
          setData(prev => ({ ...prev, ...res.data }));
          if (res.data.image) setPreview(res.data.image);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData(p => ({ ...p, [e.target.name]: val }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { setError("Image 3MB এর কম হতে হবে"); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = ev.target.result;
      setPreview(b64);
      setData(p => ({ ...p, image: b64 }));
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true); setError("");
    try {
      await profileAPI.update(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const INP = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)",
    borderRadius:10, padding:"11px 14px", color:"#fff", fontSize:"0.88rem",
    fontFamily:"var(--font-body)", outline:"none", marginBottom:"1rem", boxSizing:"border-box",
  };
  const LBL = {
    color:"rgba(255,255,255,0.4)", fontSize:"0.68rem", letterSpacing:"1.5px",
    textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:6,
  };
  const TABS = [
    { key:"content", label:"📝 Content",  color:"#38BDF8" },
    { key:"photo",   label:"📷 Photo",    color:"#00D4AA" },
    { key:"info",    label:"📋 Info Grid",color:"#818CF8" },
    { key:"stats",   label:"📊 Stats",    color:"#f472b6" },
  ];

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:200 }}>
      <div style={{ width:36,height:36,borderRadius:"50%",border:"3px solid rgba(0,212,170,0.1)",borderTop:"3px solid #00D4AA",animation:"spin 1s linear infinite" }} />
    </div>
  );

  const activeTab = TABS.find(t => t.key === tab);

  return (
    <div style={{ animation:"fadeUp 0.5s ease both", maxWidth:700 }}>
      {/* Header */}
      <div style={{ marginBottom:"1.5rem" }}>
        <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", marginBottom:"0.2rem" }}>
          About Page
        </h2>
        <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)" }}>
          About page এর সব content এখান থেকে customize করুন
        </p>
      </div>

      {/* Status */}
      {saved && (
        <div style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.25)", borderRadius:10, padding:"11px 16px", marginBottom:"1rem", color:"#00D4AA", fontSize:"0.86rem", display:"flex", alignItems:"center", gap:8 }}>
          ✅ About page সফলভাবে update হয়েছে!
        </div>
      )}
      {error && (
        <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:10, padding:"11px 16px", marginBottom:"1rem", color:"#f87171", fontSize:"0.86rem" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:"8px clamp(10px,2vw,16px)", borderRadius:99, cursor:"pointer", fontSize:"clamp(0.74rem,1.8vw,0.82rem)", fontWeight: tab===t.key ? 700 : 500, fontFamily:"var(--font-body)", transition:"all 0.2s", background: tab===t.key ? "linear-gradient(135deg,"+t.color+",#818CF8)" : "rgba(255,255,255,0.04)", border: tab===t.key ? "none" : "1px solid rgba(255,255,255,0.09)", color: tab===t.key ? "#050A14" : "rgba(255,255,255,0.6)", whiteSpace:"nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, padding:"clamp(16px,3vw,28px)" }}>

        {/* ── CONTENT TAB ── */}
        {tab === "content" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#38BDF8", marginBottom:"1.3rem", fontSize:"0.95rem", display:"flex", alignItems:"center", gap:8 }}>
              📝 Text Content
            </h3>
            <label style={LBL}>Name</label>
            <input name="name" value={data.name||""} onChange={inp} style={INP} placeholder="Tarikul Islam Tarek"
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <label style={LBL}>Job Title</label>
            <input name="title" value={data.title||""} onChange={inp} style={INP} placeholder="MERN Full Stack Developer"
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <label style={LBL}>Subtitle</label>
            <input name="subtitle" value={data.subtitle||""} onChange={inp} style={INP} placeholder="Digital Marketing Specialist"
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <label style={LBL}>Bio — Paragraph 1</label>
            <textarea name="bio" value={data.bio||""} onChange={inp} rows={4} style={{...INP,resize:"vertical"}} placeholder="আমার সম্পর্কে প্রথম paragraph..."
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <label style={LBL}>Bio — Paragraph 2</label>
            <textarea name="bio2" value={data.bio2||""} onChange={inp} rows={3} style={{...INP,resize:"vertical"}} placeholder="আমার সম্পর্কে দ্বিতীয় paragraph..."
              onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            {/* Live preview */}
            {(data.bio || data.bio2) && (
              <div style={{ background:"rgba(56,189,248,0.05)", border:"1px solid rgba(56,189,248,0.12)", borderRadius:12, padding:"14px 16px", marginTop:"-0.5rem", marginBottom:"1rem" }}>
                <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.66rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:8 }}>Preview</div>
                {data.bio && <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.86rem", lineHeight:1.85, fontFamily:"var(--font-body)", marginBottom: data.bio2 ? 8 : 0 }}>{data.bio}</p>}
                {data.bio2 && <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.86rem", lineHeight:1.85, fontFamily:"var(--font-body)", margin:0 }}>{data.bio2}</p>}
              </div>
            )}

            {/* Availability toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", background: data.available?"rgba(0,212,170,0.06)":"rgba(255,255,255,0.03)", border:"1px solid "+(data.available?"rgba(0,212,170,0.2)":"rgba(255,255,255,0.08)"), borderRadius:12, cursor:"pointer" }}
              onClick={() => setData(p => ({ ...p, available: !p.available }))}>
              <div style={{ width:44, height:24, borderRadius:99, background: data.available?"#00D4AA":"rgba(255,255,255,0.15)", position:"relative", transition:"background 0.3s", flexShrink:0 }}>
                <div style={{ position:"absolute", top:3, left: data.available?23:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.3s", boxShadow:"0 2px 6px rgba(0,0,0,0.3)" }} />
              </div>
              <div>
                <div style={{ color: data.available?"#00D4AA":"rgba(255,255,255,0.45)", fontSize:"0.88rem", fontWeight:600, fontFamily:"var(--font-body)" }}>
                  {data.available ? "✓ Available for hire" : "✗ Not available"}
                </div>
                <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.74rem", fontFamily:"var(--font-body)" }}>About page এ badge দেখাবে</div>
              </div>
            </div>
          </div>
        )}

        {/* ── PHOTO TAB ── */}
        {tab === "photo" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#00D4AA", marginBottom:"1.3rem", fontSize:"0.95rem", display:"flex", alignItems:"center", gap:8 }}>
              📷 Profile Photo
            </h3>

            {/* Preview */}
            <div style={{ display:"flex", alignItems:"center", gap:"clamp(16px,3vw,28px)", marginBottom:"1.5rem", flexWrap:"wrap" }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <div style={{ width:"clamp(100px,18vw,130px)", height:"clamp(100px,18vw,130px)", borderRadius:"50%", background:"linear-gradient(135deg,#00D4AA,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", border:"3px solid rgba(0,212,170,0.3)", boxShadow:"0 0 24px rgba(0,212,170,0.2)" }}>
                  {preview ? (
                    <img src={preview} alt="Profile" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }} />
                  ) : (
                    <span style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:900, color:"#050A14", fontFamily:"var(--font-head)" }}>T</span>
                  )}
                </div>
                <button onClick={() => fileRef.current?.click()}
                  style={{ position:"absolute", bottom:4, right:4, width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"2px solid #050A14", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"0.85rem" }}>
                  📷
                </button>
              </div>
              <div style={{ flex:1, minWidth:180 }}>
                <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.82rem", fontFamily:"var(--font-body)", marginBottom:"1rem", lineHeight:1.75 }}>
                  JPG, PNG, WebP — সর্বোচ্চ 3MB<br/>
                  Mobile থেকেও photo তুলে upload করতে পারবেন<br/>
                  <span style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.74rem" }}>Cloudinary পরে যোগ হবে — তখন auto-optimize হবে</span>
                </p>
                <input ref={fileRef} type="file" accept="image/*" capture="user" onChange={handleImage} style={{ display:"none" }} />
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <button onClick={() => fileRef.current?.click()}
                    style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.3)", borderRadius:9, padding:"9px 18px", color:"#00D4AA", cursor:"pointer", fontSize:"0.84rem", fontWeight:600, fontFamily:"var(--font-body)" }}>
                    📷 Choose / Take Photo
                  </button>
                  {preview && (
                    <button onClick={() => { setPreview(""); setData(p => ({ ...p, image:"" })); }}
                      style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:9, padding:"9px 14px", color:"#f87171", cursor:"pointer", fontSize:"0.84rem", fontFamily:"var(--font-body)" }}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Image URL manual */}
            <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"14px 16px" }}>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.82rem", fontFamily:"var(--font-body)", marginBottom:10 }}>
                অথবা image URL দিন (Imgur, Cloudinary, ইত্যাদি):
              </div>
              <input name="image"
                value={data.image?.startsWith("data:") ? "" : (data.image||"")}
                onChange={e => { setData(p => ({ ...p, image: e.target.value })); setPreview(e.target.value); }}
                placeholder="https://i.imgur.com/your-image.jpg"
                style={{...INP, marginBottom:0}}
                onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
            </div>
          </div>
        )}

        {/* ── INFO GRID TAB ── */}
        {tab === "info" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#818CF8", marginBottom:"0.5rem", fontSize:"0.95rem", display:"flex", alignItems:"center", gap:8 }}>
              📋 Info Cards
            </h3>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.8rem", fontFamily:"var(--font-body)", marginBottom:"1.3rem" }}>
              About page এ "Name, Role, Location, Email" এর info grid
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"0 16px" }}>
              {[
                ["Email","email","email"],
                ["Phone","phone","tel"],
                ["Location","location","text"],
                ["Role","infoRole","text"],
                ["Work Type","infoWork","text"],
              ].map(([l,n,t]) => (
                <div key={n}>
                  <label style={LBL}>{l}</label>
                  <input name={n} type={t} value={data[n]||""} onChange={inp} style={INP}
                    onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
              ))}
            </div>

            {/* Preview */}
            <div style={{ background:"rgba(129,140,248,0.05)", border:"1px solid rgba(129,140,248,0.12)", borderRadius:12, padding:"14px 16px", marginTop:"0.5rem" }}>
              <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.66rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:10 }}>Preview — Info Cards</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:8 }}>
                {[["👤 Name",data.name],["💼 Role",data.infoRole],["📍 Location",data.location],["🌐 Work",data.infoWork],["📧 Email",data.email],["📱 Phone",data.phone]].map(([k,v])=>(
                  <div key={k} style={{ background:"rgba(255,255,255,0.03)", borderRadius:9, padding:"10px 12px", border:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ color:"#818CF8", fontSize:"0.68rem", fontWeight:600, fontFamily:"var(--font-body)", marginBottom:3 }}>{k}</div>
                    <div style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.78rem", fontFamily:"var(--font-body)", wordBreak:"break-all" }}>{v||"—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STATS TAB ── */}
        {tab === "stats" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#f472b6", marginBottom:"0.5rem", fontSize:"0.95rem", display:"flex", alignItems:"center", gap:8 }}>
              📊 Stats / Numbers
            </h3>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.8rem", fontFamily:"var(--font-body)", marginBottom:"1.3rem" }}>
              About page এ "2+ Projects Live", "3+ Years Exp" ধরনের stats
            </p>

            {[["stat1n","stat1l","Stat 1 (e.g. 2+)","Projects Live"],["stat2n","stat2l","Stat 2 (e.g. 3+)","Years Exp"],["stat3n","stat3l","Stat 3 (e.g. 20+)","Clients"],["stat4n","stat4l","Stat 4 (e.g. 15+)","Technologies"]].map(([nk,lk,np,lp],i) => (
              <div key={nk} style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"0 12px", background:"rgba(244,114,182,0.04)", border:"1px solid rgba(244,114,182,0.1)", borderRadius:12, padding:"14px 16px", marginBottom:"0.8rem" }}>
                <div>
                  <label style={LBL}>Number</label>
                  <input name={nk} value={data[nk]||""} onChange={inp} style={{...INP, marginBottom:0}} placeholder={np}
                    onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
                <div>
                  <label style={LBL}>Label</label>
                  <input name={lk} value={data[lk]||""} onChange={inp} style={{...INP, marginBottom:0}} placeholder={lp}
                    onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
              </div>
            ))}

            {/* Preview */}
            <div style={{ background:"rgba(244,114,182,0.04)", border:"1px solid rgba(244,114,182,0.1)", borderRadius:12, padding:"14px 16px", marginTop:"0.5rem" }}>
              <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.66rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:10 }}>Preview — Stats Row</div>
              <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
                {[[data.stat1n,data.stat1l],[data.stat2n,data.stat2l],[data.stat3n,data.stat3l],[data.stat4n,data.stat4l]].map(([n,l],i)=>(
                  <div key={i} style={{ textAlign:"center" }}>
                    <div style={{ color:"#f472b6", fontWeight:900, fontSize:"1.4rem", fontFamily:"var(--font-head)" }}>{n||"—"}</div>
                    <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.72rem", fontFamily:"var(--font-body)" }}>{l||"—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div style={{ marginTop:"1.8rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={save} disabled={saving}
            style={{ width:"100%", padding:"14px", background: saving?"rgba(0,212,170,0.4)":"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", borderRadius:12, color:"#050A14", fontWeight:800, fontSize:"0.95rem", cursor: saving?"not-allowed":"pointer", fontFamily:"var(--font-body)" }}>
            {saving ? "Saving to MongoDB..." : "💾 Save About Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 3. Update Admin.jsx — add /admin/about route
// ══════════════════════════════════════════
{
  const fp = path.join(src, "pages/admin/Admin.jsx");
  let c = fs.readFileSync(fp, "utf8");

  if (!c.includes("AdminAbout")) {
    c = c.replace(
      `import AdminProfile from "./AdminProfile";`,
      `import AdminProfile from "./AdminProfile";\nimport AdminAbout from "./AdminAbout";`
    );
    c = c.replace(
      `<Route path="profile"      element={<AdminProfile />} />`,
      `<Route path="profile"      element={<AdminProfile />} />\n          <Route path="about"        element={<AdminAbout />} />`
    );
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ Admin.jsx — /admin/about route added");
  }
}

// ══════════════════════════════════════════
// 4. Sidebar.jsx — add About link
// ══════════════════════════════════════════
{
  const fp = path.join(src, "components/admin/Sidebar.jsx");
  let c = fs.readFileSync(fp, "utf8");

  if (!c.includes("/admin/about")) {
    c = c.replace(
      `{ icon: "👤", label: "Profile",      path: "/admin/profile" },`,
      `{ icon: "🙋", label: "About Page",   path: "/admin/about" },\n  { icon: "👤", label: "Profile",      path: "/admin/profile" },`
    );
    fs.writeFileSync(fp, c, "utf8");
    console.log("✅ Sidebar.jsx — About Page link added");
  }
}

// ══════════════════════════════════════════
// 5. About.jsx — load from API (profile endpoint)
// ══════════════════════════════════════════
write(path.join(src, "pages/About.jsx"), `
import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import SocialLinks, { SocialLink } from "../components/SocialIcons";
import { profileAPI } from "../services/api";

const DEFAULT = {
  name: "Tarikul Islam Tarek",
  title: "MERN Full Stack Developer",
  subtitle: "Digital Marketing Specialist",
  bio: "আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।",
  bio2: "আমার ২টি MERN project বর্তমানে Vercel এ live আছে। সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।",
  email: "tareq.islam.dev@gmail.com",
  phone: "+880 1732-483149",
  location: "Sylhet, Bangladesh",
  available: true,
  image: "",
  infoRole: "MERN Developer",
  infoWork: "Remote Worldwide",
  stat1n:"2+", stat1l:"Projects Live",
  stat2n:"3+", stat2l:"Years Exp",
  stat3n:"20+", stat3l:"Clients",
  stat4n:"15+", stat4l:"Technologies",
};

export default function About() {
  const nav = useNavigate();
  const [profile, setProfile] = useState(DEFAULT);

  useEffect(() => {
    profileAPI.get()
      .then(res => { if (res.data) setProfile(prev => ({ ...prev, ...res.data })); })
      .catch(() => {});
  }, []);

  const stats = [
    [profile.stat1n||"2+", profile.stat1l||"Projects Live"],
    [profile.stat2n||"3+", profile.stat2l||"Years Exp"],
    [profile.stat3n||"20+", profile.stat3l||"Clients"],
    [profile.stat4n||"15+", profile.stat4l||"Technologies"],
  ];

  const infoGrid = [
    ["👤 Name",    profile.name],
    ["💼 Role",    profile.infoRole || "MERN Developer"],
    ["📍 Location",profile.location],
    ["🌐 Work",    profile.infoWork || "Remote Worldwide"],
    ["📧 Email",   profile.email],
    ["📱 Phone",   profile.phone],
  ];

  return (
    <main style={{ minHeight:"100vh", paddingTop:68, background:"#050A14" }}>
      <SEO title="About Tarikul Islam Tarek | MERN Developer" description="Learn about Tarikul Islam Tarek - MERN Full Stack Developer and Digital Marketing Specialist based in Sylhet, Bangladesh." />

      <div style={{ padding:"clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth:1100, margin:"0 auto" }}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me" />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.3fr", gap:"clamp(30px,5vw,60px)", alignItems:"center" }} className="about-inner">

          {/* Image */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:"clamp(220px,26vw,290px)" }}>
              <div style={{ position:"absolute", inset:-3, borderRadius:24, background:"linear-gradient(135deg,#00D4AA,#38BDF8,#818CF8)", padding:3, zIndex:0 }}>
                <div style={{ borderRadius:22, background:"#050A14", width:"100%", height:"100%" }} />
              </div>
              <div style={{ position:"relative", borderRadius:20, overflow:"hidden", aspectRatio:"4/5", background:"linear-gradient(135deg,#0d1829,#0a1220)", zIndex:1 }}>
                {profile.image ? (
                  <img src={profile.image} alt={profile.name}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                ) : (
                  <img src="/profile.png" alt={profile.name}
                    onError={e => { e.target.style.display="none"; e.target.parentElement.querySelector('.fallback-t').style.display="flex"; }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                )}
                <div className="fallback-t" style={{ display:"none", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", fontSize:"5rem", fontFamily:"var(--font-head)", fontWeight:900, background:"linear-gradient(135deg,#00D4AA,#818CF8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", position:"absolute", inset:0 }}>T</div>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(5,10,20,0.7),transparent 50%)" }} />
                {/* Social icons overlay */}
                <div style={{ position:"absolute", bottom:14, left:12, right:12, display:"flex", gap:7, justifyContent:"center" }}>
                  <SocialLink type="facebook"  size={34} />
                  <SocialLink type="instagram" size={34} />
                  <SocialLink type="linkedin"  size={34} />
                  <SocialLink type="github"    size={34} />
                </div>
              </div>
              {/* Badge */}
              <div style={{ position:"absolute", bottom:-18, right:-18, background:"#0d1829", border:"2px solid #00D4AA", borderRadius:14, padding:"12px 16px", textAlign:"center", boxShadow:"0 8px 30px rgba(0,0,0,0.4)", zIndex:2 }}>
                <div style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"1.5rem", color:"#00D4AA" }}>{profile.stat1n||"2+"}</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.72rem" }}>{profile.stat1l||"Projects Live"}</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.5rem,3vw,2rem)", marginBottom:"0.3rem", color:"#fff" }}>{profile.name}</h3>
            <div style={{ color:"#00D4AA", fontWeight:600, marginBottom:"0.4rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.title}</div>
            {profile.subtitle && <div style={{ color:"rgba(255,255,255,0.4)", fontWeight:500, marginBottom:"1.3rem", fontSize:"0.85rem", fontFamily:"var(--font-body)" }}>{profile.subtitle}</div>}

            {profile.bio && <p style={{ color:"rgba(255,255,255,0.45)", lineHeight:1.9, marginBottom:"0.9rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.bio}</p>}
            {profile.bio2 && <p style={{ color:"rgba(255,255,255,0.45)", lineHeight:1.9, marginBottom:"1.8rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.bio2}</p>}

            {/* Info grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"1.5rem" }}>
              {infoGrid.map(([k,v]) => (
                <div key={k} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"11px 13px", transition:"border-color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(0,212,170,0.2)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                  <div style={{ color:"#00D4AA", fontSize:"0.7rem", marginBottom:3, fontWeight:600, fontFamily:"var(--font-body)" }}>{k}</div>
                  <div style={{ fontSize:"0.82rem", fontWeight:500, wordBreak:"break-all", color:"rgba(255,255,255,0.8)", fontFamily:"var(--font-body)" }}>{v||"—"}</div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:"clamp(16px,3vw,28px)", marginBottom:"1.8rem", flexWrap:"wrap" }}>
              {stats.map(([n,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontWeight:900, fontSize:"clamp(1.3rem,3vw,1.6rem)", color:"#00D4AA", lineHeight:1 }}>{n}</div>
                  <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.72rem", fontFamily:"var(--font-body)", marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Available badge */}
            {profile.available && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,212,170,0.06)", border:"1px solid rgba(0,212,170,0.2)", borderRadius:99, padding:"7px 16px", marginBottom:"1.5rem" }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#00D4AA", animation:"pulse 1.8s infinite", flexShrink:0 }} />
                <span style={{ color:"#00D4AA", fontSize:"0.82rem", fontWeight:600, fontFamily:"var(--font-body)" }}>Available for hire</span>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => nav("/contact")}
                style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", color:"#050A14", border:"none", borderRadius:10, padding:"13px 26px", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", fontFamily:"var(--font-body)", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 22px rgba(0,212,170,0.38)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
                Let's Talk 👋
              </button>
              <SocialLinks size={42} />
            </div>
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:3rem!important}}\`}</style>
    </main>
  );
}
`);

console.log(`
╔══════════════════════════════════════════════════════════╗
║     ✅ About Page Admin সম্পূর্ণ হয়েছে!                 ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  ✅ Admin Panel এ নতুন: 🙋 About Page                  ║
║                                                          ║
║  4টা Tab:                                               ║
║  📝 Content — Name, Title, Bio 1, Bio 2, Available     ║
║  📷 Photo   — ছবি upload (mobile থেকেও)               ║
║  📋 Info    — Email, Phone, Location, Role, Work       ║
║  📊 Stats   — "2+ Projects", "3+ Years" ইত্যাদি        ║
║                                                          ║
║  ✅ About.jsx — এখন API থেকে data load করে:           ║
║     • profile image দেখায়                              ║
║     • Admin থেকে change করলে auto-update              ║
║     • Fallback /profile.png যদি image না থাকে         ║
║                                                          ║
║  Profile = আপনার personal data (login, CV link)        ║
║  About   = website visitor দের জন্য public page       ║
╚══════════════════════════════════════════════════════════╝
`);
