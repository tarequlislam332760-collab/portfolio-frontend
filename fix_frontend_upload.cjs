// Run in CLIENT folder: node fix_frontend_upload.cjs
const fs = require('fs');

// ══════════════════════════════════════════
// 1. api.js — add uploadAPI
// ══════════════════════════════════════════
let api = fs.readFileSync('src/services/api.js', 'utf8');

if (!api.includes('uploadAPI')) {
  api += `
export const uploadAPI = {
  uploadImage: (base64Image) => api("/upload", {
    method: "POST",
    body: JSON.stringify({ image: base64Image }),
  }),
};
`;
  fs.writeFileSync('src/services/api.js', api, 'utf8');
  console.log('✅ api.js — uploadAPI added');
} else {
  console.log('ℹ️  api.js — uploadAPI already exists');
}

// ══════════════════════════════════════════
// 2. AdminProfile.jsx — use Cloudinary upload
// ══════════════════════════════════════════
fs.writeFileSync('src/pages/admin/AdminProfile.jsx', `
import React, { useEffect, useState, useRef } from "react";
import { profileAPI, uploadAPI } from "../../services/api";

const SECTIONS = [
  { key: "personal", label: "👤 Personal",   color: "#00D4AA" },
  { key: "social",   label: "🔗 Social",     color: "#38BDF8" },
  { key: "content",  label: "✍️ Bio",        color: "#818CF8" },
  { key: "stats",    label: "📊 Stats",      color: "#f472b6" },
];

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name:"Tarikul Islam Tarek", title:"MERN Full Stack Developer",
    subtitle:"Digital Marketing Specialist",
    bio:"", bio2:"", email:"", phone:"", location:"Sylhet, Bangladesh",
    available:true, image:"",
    github:"https://github.com/tarequlislam332760-collab",
    linkedin:"https://www.linkedin.com/in/tareq-islam3149/",
    facebook:"https://www.facebook.com/profile.php?id=61585040426028",
    instagram:"https://www.instagram.com/tareq23337/",
    whatsapp:"https://wa.me/8801732483149", cvLink:"#",
    infoRole:"MERN Developer", infoWork:"Remote Worldwide",
    stat1n:"2+", stat1l:"Projects Live",
    stat2n:"3+", stat2l:"Years Exp",
    stat3n:"20+", stat3l:"Clients",
    stat4n:"15+", stat4l:"Technologies",
  });
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [saved,      setSaved]      = useState(false);
  const [error,      setError]      = useState("");
  const [section,    setSection]    = useState("personal");
  const [preview,    setPreview]    = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        if (res.data) { setProfile(p => ({ ...p, ...res.data })); if (res.data.image) setPreview(res.data.image); }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProfile(p => ({ ...p, [e.target.name]: val }));
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image 5MB এর কম হতে হবে"); return; }

    // Local preview
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setPreview(base64);
      setUploading(true);
      setError("");
      try {
        // Upload to Cloudinary via backend
        const res = await uploadAPI.uploadImage(base64);
        if (res.url) {
          setProfile(p => ({ ...p, image: res.url }));
          setPreview(res.url);
          console.log("✅ Cloudinary URL:", res.url);
        }
      } catch (err) {
        // Keep local preview if upload fails
        setProfile(p => ({ ...p, image: base64 }));
        setError("Cloudinary upload এ সমস্যা — local preview save হবে");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true); setError("");
    try {
      await profileAPI.update(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const INP = { width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, padding:"11px 14px", color:"#fff", fontSize:"0.88rem", fontFamily:"var(--font-body)", outline:"none", marginBottom:"1rem", boxSizing:"border-box" };
  const LBL = { color:"rgba(255,255,255,0.4)", fontSize:"0.68rem", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:6 };

  if (loading) return <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}><div style={{ width:36,height:36,borderRadius:"50%",border:"3px solid rgba(0,212,170,0.1)",borderTop:"3px solid #00D4AA",animation:"spin 1s linear infinite" }} /></div>;

  return (
    <div style={{ animation:"fadeUp 0.5s ease both", maxWidth:700 }}>
      <div style={{ marginBottom:"1.5rem" }}>
        <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", marginBottom:"0.2rem" }}>Profile Settings</h2>
        <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)" }}>আপনার portfolio সম্পূর্ণ এখান থেকে customize করুন</p>
      </div>

      {saved && <div style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.25)", borderRadius:10, padding:"11px 16px", marginBottom:"1rem", color:"#00D4AA", fontSize:"0.86rem" }}>✅ Profile সফলভাবে save হয়েছে!</div>}
      {error && <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:10, padding:"11px 16px", marginBottom:"1rem", color:"#f87171", fontSize:"0.86rem" }}>⚠️ {error}</div>}

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        {SECTIONS.map(s => (
          <button key={s.key} onClick={() => setSection(s.key)}
            style={{ padding:"8px clamp(10px,2vw,16px)", borderRadius:99, cursor:"pointer", fontSize:"clamp(0.74rem,1.8vw,0.82rem)", fontWeight:section===s.key?700:500, fontFamily:"var(--font-body)", transition:"all 0.2s", background:section===s.key?"linear-gradient(135deg,"+s.color+",#818CF8)":"rgba(255,255,255,0.04)", border:section===s.key?"none":"1px solid rgba(255,255,255,0.09)", color:section===s.key?"#050A14":"rgba(255,255,255,0.6)", whiteSpace:"nowrap" }}>
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, padding:"clamp(16px,3vw,28px)" }}>

        {/* PERSONAL */}
        {section === "personal" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#00D4AA", marginBottom:"1.3rem", fontSize:"0.95rem" }}>👤 Personal Information</h3>

            {/* Photo Upload */}
            <div style={{ marginBottom:"1.5rem" }}>
              <label style={LBL}>Profile Photo</label>
              <div style={{ display:"flex", alignItems:"center", gap:"clamp(14px,3vw,24px)", flexWrap:"wrap" }}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:"clamp(80px,15vw,100px)", height:"clamp(80px,15vw,100px)", borderRadius:"50%", background:"linear-gradient(135deg,#00D4AA,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", border:"3px solid rgba(0,212,170,0.3)" }}>
                    {preview ? (
                      <img src={preview} alt="Profile" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
                    ) : (
                      <span style={{ fontSize:"2.5rem", fontWeight:900, color:"#050A14" }}>T</span>
                    )}
                  </div>
                  {uploading && (
                    <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ width:20,height:20,borderRadius:"50%",border:"2px solid rgba(0,212,170,0.3)",borderTop:"2px solid #00D4AA",animation:"spin 1s linear infinite" }} />
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.8rem", fontFamily:"var(--font-body)", marginBottom:"0.8rem", lineHeight:1.7 }}>
                    JPG, PNG — সর্বোচ্চ 5MB<br/>
                    {uploading ? <span style={{ color:"#00D4AA" }}>⏳ Cloudinary তে upload হচ্ছে...</span> : <span style={{ color:"rgba(255,255,255,0.28)" }}>✅ Cloudinary connected</span>}
                  </p>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display:"none" }} />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.25)", borderRadius:9, padding:"8px 18px", color:"#00D4AA", cursor:uploading?"not-allowed":"pointer", fontSize:"0.82rem", fontWeight:600, fontFamily:"var(--font-body)", marginRight:8, opacity:uploading?0.6:1 }}>
                    📷 {uploading ? "Uploading..." : "Choose Photo"}
                  </button>
                  {preview && !uploading && (
                    <button onClick={() => { setPreview(""); setProfile(p => ({ ...p, image:"" })); }}
                      style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:9, padding:"8px 14px", color:"#f87171", cursor:"pointer", fontSize:"0.82rem" }}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"0 16px" }}>
              {[["Full Name","name"],["Job Title","title"],["Subtitle","subtitle"],["Email","email"],["Phone","phone"],["Location","location"]].map(([l,n]) => (
                <div key={n}><label style={LBL}>{l}</label><input name={n} value={profile[n]||""} onChange={inp} style={INP} onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} /></div>
              ))}
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", background:profile.available?"rgba(0,212,170,0.06)":"rgba(255,255,255,0.03)", border:"1px solid "+(profile.available?"rgba(0,212,170,0.2)":"rgba(255,255,255,0.08)"), borderRadius:12, cursor:"pointer" }}
              onClick={() => setProfile(p => ({ ...p, available:!p.available }))}>
              <div style={{ width:44,height:24,borderRadius:99,background:profile.available?"#00D4AA":"rgba(255,255,255,0.15)",position:"relative",transition:"background 0.3s",flexShrink:0 }}>
                <div style={{ position:"absolute",top:3,left:profile.available?23:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.3s" }} />
              </div>
              <div>
                <div style={{ color:profile.available?"#00D4AA":"rgba(255,255,255,0.45)", fontSize:"0.88rem", fontWeight:600, fontFamily:"var(--font-body)" }}>{profile.available?"✓ Available for hire":"✗ Not available"}</div>
                <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.74rem", fontFamily:"var(--font-body)" }}>Website এ badge দেখাবে</div>
              </div>
            </div>
          </div>
        )}

        {/* SOCIAL */}
        {section === "social" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#38BDF8", marginBottom:"1.3rem", fontSize:"0.95rem" }}>🔗 Social Media Links</h3>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.82rem", fontFamily:"var(--font-body)", marginBottom:"1.5rem" }}>Footer, About page, Contact page এ দেখাবে</p>
            {[["📘 Facebook","facebook"],["📸 Instagram","instagram"],["💼 LinkedIn","linkedin"],["🐙 GitHub","github"],["💬 WhatsApp","whatsapp"],["📄 CV Link","cvLink"]].map(([l,n]) => (
              <div key={n}><label style={LBL}>{l}</label><input name={n} type="url" value={profile[n]||""} onChange={inp} placeholder="https://..." style={INP} onFocus={e=>e.target.style.borderColor="#38BDF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} /></div>
            ))}
          </div>
        )}

        {/* BIO */}
        {section === "content" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#818CF8", marginBottom:"1.3rem", fontSize:"0.95rem" }}>✍️ Bio & Content</h3>
            <label style={LBL}>Bio — Paragraph 1</label>
            <textarea name="bio" value={profile.bio||""} onChange={inp} rows={4} style={{...INP,resize:"vertical"}} placeholder="আপনার সম্পর্কে প্রথম paragraph..." onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
            <label style={LBL}>Bio — Paragraph 2</label>
            <textarea name="bio2" value={profile.bio2||""} onChange={inp} rows={3} style={{...INP,resize:"vertical"}} placeholder="দ্বিতীয় paragraph..." onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
            {(profile.bio||profile.bio2) && (
              <div style={{ background:"rgba(129,140,248,0.05)", border:"1px solid rgba(129,140,248,0.12)", borderRadius:12, padding:"14px 16px", marginTop:"-0.5rem" }}>
                <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.66rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:8 }}>Preview</div>
                {profile.bio && <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.86rem", lineHeight:1.85, fontFamily:"var(--font-body)", marginBottom:8 }}>{profile.bio}</p>}
                {profile.bio2 && <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.86rem", lineHeight:1.85, fontFamily:"var(--font-body)", margin:0 }}>{profile.bio2}</p>}
              </div>
            )}
          </div>
        )}

        {/* STATS */}
        {section === "stats" && (
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, color:"#f472b6", marginBottom:"0.5rem", fontSize:"0.95rem" }}>📊 Stats Numbers</h3>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.8rem", fontFamily:"var(--font-body)", marginBottom:"1.3rem" }}>Home page ও About page এ দেখাবে — save করার পর immediately update হবে</p>

            {[["stat1n","stat1l","2+","Projects Live"],["stat2n","stat2l","3+","Years Exp"],["stat3n","stat3l","20+","Clients"],["stat4n","stat4l","15+","Technologies"]].map(([nk,lk,np,lp],i) => (
              <div key={nk} style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"0 12px", background:"rgba(244,114,182,0.04)", border:"1px solid rgba(244,114,182,0.1)", borderRadius:12, padding:"14px 16px", marginBottom:"0.8rem" }}>
                <div>
                  <label style={LBL}>Number</label>
                  <input name={nk} value={profile[nk]||""} onChange={inp} placeholder={np} style={{...INP,marginBottom:0,fontWeight:800,color:"#f472b6",fontSize:"1.1rem"}} onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
                <div>
                  <label style={LBL}>Label</label>
                  <input name={lk} value={profile[lk]||""} onChange={inp} placeholder={lp} style={{...INP,marginBottom:0}} onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
              </div>
            ))}

            {/* Preview */}
            <div style={{ background:"rgba(244,114,182,0.04)", border:"1px solid rgba(244,114,182,0.1)", borderRadius:12, padding:"14px 16px" }}>
              <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.66rem", letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:12 }}>Live Preview — এভাবে website এ দেখাবে</div>
              <div style={{ display:"flex", gap:"clamp(16px,3vw,28px)", flexWrap:"wrap" }}>
                {[[profile.stat1n,profile.stat1l],[profile.stat2n,profile.stat2l],[profile.stat3n,profile.stat3l],[profile.stat4n,profile.stat4l]].map(([n,l],i)=>(
                  <div key={i} style={{ textAlign:"center" }}>
                    <div style={{ color:"#f472b6", fontWeight:900, fontSize:"clamp(1.3rem,3vw,1.6rem)", fontFamily:"var(--font-head)" }}>{n||"—"}</div>
                    <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.72rem", fontFamily:"var(--font-body)", marginTop:3 }}>{l||"—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save */}
        <div style={{ marginTop:"1.8rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={save} disabled={saving||uploading}
            style={{ width:"100%", padding:14, background:saving?"rgba(0,212,170,0.4)":"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", borderRadius:12, color:"#050A14", fontWeight:800, fontSize:"0.95rem", cursor:saving||uploading?"not-allowed":"pointer", fontFamily:"var(--font-body)" }}>
            {saving ? "Saving to MongoDB..." : uploading ? "Photo uploading..." : "💾 Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
`.trimStart());
console.log('✅ AdminProfile.jsx — Cloudinary upload connected');

console.log(`
╔══════════════════════════════════════════════════════╗
║  ✅ Frontend fix সম্পূর্ণ!                           ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  ✅ Photo upload → Cloudinary → URL save হবে        ║
║  ✅ Stats tab → save করলে website update হবে        ║
║  ✅ Social links tab → all platforms                 ║
║  ✅ Bio tab → with live preview                     ║
║                                                      ║
║  npm run dev চালান                                   ║
╚══════════════════════════════════════════════════════╝
`);
