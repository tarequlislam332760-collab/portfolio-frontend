import React, { useEffect, useState, useRef } from "react";
import { profileAPI } from "../../services/api";

const TABS = [
  { key:"content", label:"📝 Text Content",  color:"#38BDF8" },
  { key:"photo",   label:"📷 Photo",         color:"#00D4AA" },
  { key:"info",    label:"📋 Info Grid",     color:"#818CF8" },
  { key:"stats",   label:"📊 Stats",         color:"#f472b6" },
];

const DEF = {
  name:"Tarikul Islam Tarek",
  title:"MERN Full Stack Developer",
  subtitle:"Digital Marketing Specialist",
  bio:"আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।",
  bio2:"আমার ২টি MERN project বর্তমানে Vercel এ live আছে। সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।",
  location:"Sylhet, Bangladesh",
  email:"tareq.islam.dev@gmail.com",
  phone:"+880 1732-483149",
  available:true,
  image:"",
  infoRole:"MERN Developer",
  infoWork:"Remote Worldwide",
  stat1n:"2+", stat1l:"Projects Live",
  stat2n:"3+", stat2l:"Years Exp",
  stat3n:"20+", stat3l:"Clients",
  stat4n:"15+", stat4l:"Technologies",
};

export default function AdminAbout() {
  const [data, setData]       = useState(DEF);
  const [tab, setTab]         = useState("content");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState("");
  const [preview, setPreview] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        const d = res.data?.data || res.data;
        if (d) {
          setData(prev => ({ ...prev, ...d }));
          if (d.image) setPreview(d.image);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData(p => ({ ...p, [e.target.name]: val }));
  };

  const handleImage = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { setError("Image 3MB এর কম হতে হবে"); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      setPreview(ev.target.result);
      setData(p => ({ ...p, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreview("");
    setData(p => ({ ...p, image: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      await profileAPI.update(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally { setSaving(false); }
  };

  const INP = {
    width:"100%", background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.09)", borderRadius:10,
    padding:"12px 14px", color:"#fff", fontSize:"0.88rem",
    fontFamily:"var(--font-body)", outline:"none",
    boxSizing:"border-box", transition:"border-color 0.2s",
  };
  const LBL = {
    color:"rgba(255,255,255,0.4)", fontSize:"0.68rem",
    letterSpacing:"1.5px", textTransform:"uppercase",
    fontFamily:"var(--font-body)", display:"block", marginBottom:6,
  };
  const CARD = {
    background:"rgba(255,255,255,0.02)",
    border:"1px solid rgba(255,255,255,0.07)",
    borderRadius:16, padding:"clamp(18px,3vw,28px)",
    marginBottom:"1.2rem",
  };

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:300 }}>
      <div style={{ width:40,height:40,borderRadius:"50%",border:"3px solid rgba(0,212,170,0.1)",borderTop:"3px solid #00D4AA",animation:"spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ animation:"fadeUp 0.5s ease both", maxWidth:760 }}>
      <style>{`
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0;transform:translateY(14px); } to { opacity:1;transform:translateY(0); } }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .inp-focus:focus   { border-color:#00D4AA!important; }
        .tab-hover:hover   { opacity:1!important; }
        .about-grid        { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .about-grid-3      { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        @media(max-width:580px){
          .about-grid   { grid-template-columns:1fr; }
          .about-grid-3 { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom:"1.8rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"0.4rem" }}>
          <div style={{ width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#00D4AA,#38BDF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0 }}>🙋</div>
          <div>
            <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.6rem)", color:"#fff", margin:0 }}>About Page</h2>
            <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)", margin:0 }}>About page এর সব content এখান থেকে customize করুন</p>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {saved && (
        <div style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.3)", borderRadius:12, padding:"13px 18px", marginBottom:"1.2rem", color:"#00D4AA", fontSize:"0.88rem", display:"flex", alignItems:"center", gap:10, animation:"fadeUp 0.3s ease" }}>
          <span style={{ fontSize:"1.1rem" }}>✅</span> About page সফলভাবে MongoDB তে save হয়েছে!
        </div>
      )}
      {error && (
        <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"13px 18px", marginBottom:"1.2rem", color:"#f87171", fontSize:"0.88rem", display:"flex", alignItems:"center", gap:10 }}>
          <span>⚠️</span> {error}
        </div>
      )}

      {/* ── Tabs ── */}
      <div style={{ display:"flex", gap:8, marginBottom:"1.8rem", flexWrap:"wrap" }}>
        {TABS.map(t => {
          const active = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className="tab-hover"
              style={{
                padding:"9px clamp(12px,2vw,20px)", borderRadius:99, cursor:"pointer",
                fontSize:"clamp(0.76rem,1.8vw,0.84rem)", fontWeight: active ? 700 : 500,
                fontFamily:"var(--font-body)", transition:"all 0.2s", whiteSpace:"nowrap",
                background: active ? `linear-gradient(135deg,${t.color},#818CF8)` : "rgba(255,255,255,0.05)",
                border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: active ? "#050A14" : "rgba(255,255,255,0.65)",
                boxShadow: active ? `0 4px 18px ${t.color}33` : "none",
                opacity: active ? 1 : 0.85,
              }}>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════
          TAB 1 — Text Content
      ══════════════════════════════════ */}
      {tab === "content" && (
        <div>
          <div style={CARD}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.4rem" }}>
              <span style={{ fontSize:"1.1rem" }}>📝</span>
              <h3 style={{ color:"#38BDF8", fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.95rem", margin:0 }}>Text Content</h3>
            </div>

            <div className="about-grid-3" style={{ marginBottom:"1rem" }}>
              {[
                { name:"name",     label:"Full Name",    placeholder:"Tarikul Islam Tarek" },
                { name:"title",    label:"Job Title",    placeholder:"MERN Full Stack Developer" },
                { name:"subtitle", label:"Subtitle",     placeholder:"Digital Marketing Specialist" },
              ].map(f => (
                <div key={f.name}>
                  <label style={LBL}>{f.label}</label>
                  <input name={f.name} value={data[f.name]||""} onChange={inp}
                    placeholder={f.placeholder} className="inp-focus"
                    style={INP}
                    onFocus={e=>e.target.style.borderColor="#38BDF8"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom:"1rem" }}>
              <label style={LBL}>Bio — Paragraph 1</label>
              <textarea name="bio" value={data.bio||""} onChange={inp} rows={4} className="inp-focus"
                placeholder="প্রথম paragraph..." style={{ ...INP, resize:"vertical" }}
                onFocus={e=>e.target.style.borderColor="#38BDF8"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
            </div>

            <div style={{ marginBottom:"1rem" }}>
              <label style={LBL}>Bio — Paragraph 2</label>
              <textarea name="bio2" value={data.bio2||""} onChange={inp} rows={3} className="inp-focus"
                placeholder="দ্বিতীয় paragraph..." style={{ ...INP, resize:"vertical" }}
                onFocus={e=>e.target.style.borderColor="#38BDF8"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
            </div>

            {/* Preview */}
            {(data.bio || data.bio2) && (
              <div style={{ background:"rgba(56,189,248,0.04)", border:"1px solid rgba(56,189,248,0.12)", borderRadius:12, padding:"16px 18px" }}>
                <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.68rem", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10, fontFamily:"var(--font-body)" }}>PREVIEW</p>
                {data.bio  && <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.88rem", lineHeight:1.85, fontFamily:"var(--font-body)", marginBottom:8 }}>{data.bio}</p>}
                {data.bio2 && <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.88rem", lineHeight:1.85, fontFamily:"var(--font-body)", margin:0 }}>{data.bio2}</p>}
              </div>
            )}
          </div>

          {/* Available toggle */}
          <div style={{ ...CARD, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div>
              <div style={{ color:"#fff", fontWeight:600, fontSize:"0.92rem", fontFamily:"var(--font-body)", marginBottom:3 }}>✅ Available for hire</div>
              <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.8rem", fontFamily:"var(--font-body)" }}>About page এ badge দেখাবে</div>
            </div>
            <div onClick={() => setData(p => ({...p, available: !p.available}))}
              style={{ width:52, height:28, borderRadius:99, background: data.available ? "linear-gradient(135deg,#00D4AA,#38BDF8)" : "rgba(255,255,255,0.1)", cursor:"pointer", position:"relative", transition:"all 0.3s", flexShrink:0, border: data.available ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ position:"absolute", top:3, left: data.available ? 26 : 3, width:22, height:22, borderRadius:"50%", background:"#fff", transition:"left 0.3s", boxShadow:"0 2px 6px rgba(0,0,0,0.3)" }} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB 2 — Photo
      ══════════════════════════════════ */}
      {tab === "photo" && (
        <div style={CARD}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.6rem" }}>
            <span style={{ fontSize:"1.1rem" }}>📷</span>
            <h3 style={{ color:"#00D4AA", fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.95rem", margin:0 }}>About Page Photo</h3>
          </div>

          {/* Preview */}
          <div style={{ display:"flex", alignItems:"flex-start", gap:"clamp(16px,3vw,28px)", flexWrap:"wrap", marginBottom:"1.6rem" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:120, height:148, borderRadius:18, overflow:"hidden", background:"linear-gradient(135deg,#0d1829,#0a1220)", border:"2px solid rgba(0,212,170,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {preview ? (
                  <img src={preview} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }} />
                ) : (
                  <div style={{ fontSize:"3rem", opacity:0.3 }}>🙋</div>
                )}
              </div>
              {preview && (
                <div style={{ position:"absolute", inset:0, borderRadius:18, background:"linear-gradient(to top,rgba(0,212,170,0.15),transparent)" }} />
              )}
            </div>

            <div style={{ flex:1, minWidth:180 }}>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.82rem", fontFamily:"var(--font-body)", lineHeight:1.7, marginBottom:"1.2rem" }}>
                <div style={{ color:"#00D4AA", fontWeight:600, marginBottom:6, fontSize:"0.88rem" }}>📌 About page এর ছবি</div>
                JPG, PNG, WebP — সর্বোচ্চ 3MB<br />
                Recommended: portrait (4:5 ratio)<br />
                <span style={{ opacity:0.5, fontSize:"0.76rem" }}>Cloudinary integration পরে যোগ হবে</span>
              </div>

              <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display:"none" }} />

              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button onClick={() => fileRef.current?.click()}
                  style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", fontFamily:"var(--font-body)", display:"flex", alignItems:"center", gap:7 }}>
                  🖼️ Choose Photo
                </button>
                {preview && (
                  <button onClick={removePhoto}
                    style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#f87171", borderRadius:10, padding:"10px 18px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer", fontFamily:"var(--font-body)" }}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Image URL alternative */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"1.2rem" }}>
            <label style={LBL}>অথবা Image URL paste করুন</label>
            <input name="image" value={data.image?.startsWith("data:") ? "" : (data.image||"")}
              onChange={e => { setPreview(e.target.value); setData(p => ({...p, image: e.target.value})); }}
              placeholder="https://example.com/photo.jpg" className="inp-focus"
              style={INP}
              onFocus={e=>e.target.style.borderColor="#00D4AA"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB 3 — Info Grid
      ══════════════════════════════════ */}
      {tab === "info" && (
        <div style={CARD}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.6rem" }}>
            <span style={{ fontSize:"1.1rem" }}>📋</span>
            <h3 style={{ color:"#818CF8", fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.95rem", margin:0 }}>Info Grid</h3>
            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.78rem", fontFamily:"var(--font-body)" }}>— About page এ 6-box grid দেখায়</span>
          </div>

          <div className="about-grid" style={{ marginBottom:"1.2rem" }}>
            {[
              { name:"name",     label:"👤 Name",      placeholder:"Tarikul Islam Tarek" },
              { name:"infoRole", label:"💼 Role",       placeholder:"MERN Developer" },
              { name:"location", label:"📍 Location",   placeholder:"Sylhet, Bangladesh" },
              { name:"infoWork", label:"🌐 Work Type",  placeholder:"Remote Worldwide" },
              { name:"email",    label:"📧 Email",      placeholder:"tareq@gmail.com" },
              { name:"phone",    label:"📱 Phone",      placeholder:"+880 1732-483149" },
            ].map(f => (
              <div key={f.name}>
                <label style={LBL}>{f.label}</label>
                <input name={f.name} value={data[f.name]||""} onChange={inp}
                  placeholder={f.placeholder} className="inp-focus"
                  style={INP}
                  onFocus={e=>e.target.style.borderColor="#818CF8"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
            ))}
          </div>

          {/* Live preview of info grid */}
          <div style={{ background:"rgba(129,140,248,0.05)", border:"1px solid rgba(129,140,248,0.12)", borderRadius:12, padding:"14px 16px" }}>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.68rem", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:12, fontFamily:"var(--font-body)" }}>LIVE PREVIEW</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[
                ["👤 Name", data.name],
                ["💼 Role", data.infoRole],
                ["📍 Location", data.location],
                ["🌐 Work", data.infoWork],
                ["📧 Email", data.email],
                ["📱 Phone", data.phone],
              ].map(([k,v]) => (
                <div key={k} style={{ background:"rgba(255,255,255,0.03)", borderRadius:8, padding:"9px 11px", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ color:"#818CF8", fontSize:"0.65rem", fontWeight:600, fontFamily:"var(--font-body)", marginBottom:3 }}>{k}</div>
                  <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.78rem", fontFamily:"var(--font-body)", wordBreak:"break-all" }}>{v||"—"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB 4 — Stats
      ══════════════════════════════════ */}
      {tab === "stats" && (
        <div style={CARD}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.6rem" }}>
            <span style={{ fontSize:"1.1rem" }}>📊</span>
            <h3 style={{ color:"#f472b6", fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.95rem", margin:0 }}>Stats Numbers</h3>
            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.78rem", fontFamily:"var(--font-body)" }}>— About page এ দেখায়</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem", marginBottom:"1.4rem" }}>
            {[
              { n:"stat1n", l:"stat1l", label:"Stat 1", placeholder_n:"2+",  placeholder_l:"Projects Live", color:"#00D4AA" },
              { n:"stat2n", l:"stat2l", label:"Stat 2", placeholder_n:"3+",  placeholder_l:"Years Exp",     color:"#38BDF8" },
              { n:"stat3n", l:"stat3l", label:"Stat 3", placeholder_n:"20+", placeholder_l:"Clients",       color:"#818CF8" },
              { n:"stat4n", l:"stat4l", label:"Stat 4", placeholder_n:"15+", placeholder_l:"Technologies",  color:"#f472b6" },
            ].map(s => (
              <div key={s.n} style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${s.color}20`, borderRadius:14, padding:"16px" }}>
                <div style={{ color:s.color, fontSize:"0.68rem", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:12 }}>{s.label}</div>
                <div style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:10 }}>
                  <div>
                    <label style={{ ...LBL, color:s.color+"99" }}>Number</label>
                    <input name={s.n} value={data[s.n]||""} onChange={inp}
                      placeholder={s.placeholder_n} className="inp-focus"
                      style={{ ...INP, textAlign:"center", fontFamily:"var(--font-head)", fontWeight:800, fontSize:"1.1rem", color:s.color, padding:"10px 8px" }}
                      onFocus={e=>e.target.style.borderColor=s.color}
                      onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                  </div>
                  <div>
                    <label style={{ ...LBL, color:s.color+"99" }}>Label</label>
                    <input name={s.l} value={data[s.l]||""} onChange={inp}
                      placeholder={s.placeholder_l} className="inp-focus"
                      style={INP}
                      onFocus={e=>e.target.style.borderColor=s.color}
                      onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                  </div>
                </div>
                {/* Mini preview */}
                <div style={{ marginTop:10, textAlign:"center", padding:"8px", background:`${s.color}08`, borderRadius:8 }}>
                  <div style={{ color:s.color, fontFamily:"var(--font-head)", fontWeight:900, fontSize:"1.3rem", lineHeight:1 }}>{data[s.n]||s.placeholder_n}</div>
                  <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.7rem", fontFamily:"var(--font-body)", marginTop:3 }}>{data[s.l]||s.placeholder_l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Save Button ── */}
      <button onClick={save} disabled={saving}
        style={{ width:"100%", padding:"clamp(13px,2vw,16px)", background: saving ? "rgba(0,212,170,0.4)" : "linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", borderRadius:14, color:"#050A14", cursor: saving ? "not-allowed" : "pointer", fontWeight:800, fontSize:"clamp(0.9rem,2vw,1rem)", fontFamily:"var(--font-body)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"all 0.3s", boxShadow: saving ? "none" : "0 4px 24px rgba(0,212,170,0.25)" }}
        onMouseEnter={e=>{ if(!saving){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,212,170,0.35)"; }}}
        onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=saving?"none":"0 4px 24px rgba(0,212,170,0.25)"; }}>
        {saving ? (
          <><div style={{ width:18,height:18,borderRadius:"50%",border:"2px solid rgba(5,10,20,0.3)",borderTop:"2px solid #050A14",animation:"spin 1s linear infinite" }} /> Saving...</>
        ) : (
          <><span>💾</span> Save About Page</>
        )}
      </button>

      <p style={{ textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:"0.76rem", fontFamily:"var(--font-body)", marginTop:"0.8rem" }}>
        🔒 Auto-saves to MongoDB
      </p>
    </div>
  );
}
