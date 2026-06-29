import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");

function write(p, c) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, c.trimStart(), "utf8");
  console.log("✅", p.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. AdminServices.jsx — no scroll, responsive
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminServices.jsx"), `
import React, { useEffect, useState } from "react";
import { servicesAPI } from "../../services/api";

const ICONS  = ["🌐","⚛️","🔧","📈","🎯","🔍","💡","🚀","⚙️","📊","🛒","✍️","🎨","🔐","📱","☁️"];
const COLORS = ["#00D4AA","#38BDF8","#818CF8","#f472b6","#fb923c","#34d399","#f59e0b","#ef4444"];
const EMPTY  = { icon:"🌐", title:"", desc:"", color:"#00D4AA", features:"", tag:"", order:"0", active:true };

const INP = {
  width:"100%", background:"rgba(255,255,255,0.04)",
  border:"1px solid rgba(255,255,255,0.09)", borderRadius:10,
  padding:"11px 14px", color:"#fff", fontSize:"0.87rem",
  fontFamily:"var(--font-body)", outline:"none", boxSizing:"border-box",
  marginBottom:"0.9rem", transition:"border-color 0.2s",
};
const LBL = {
  color:"rgba(255,255,255,0.4)", fontSize:"0.68rem",
  letterSpacing:"1.5px", textTransform:"uppercase",
  fontFamily:"var(--font-body)", display:"block", marginBottom:5,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [form,     setForm]     = useState(EMPTY);
  const [editing,  setEditing]  = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [msg,      setMsg]      = useState("");

  const load = () => {
    servicesAPI.getAll()
      .then(res => {
        const arr = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setServices(arr);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm(EMPTY); setEditing(null); setModal(true); setMsg(""); };
  const openEdit = (s) => {
    setForm({ ...s, features:(s.features||[]).join(", "), order:String(s.order||0) });
    setEditing(s._id); setModal(true); setMsg("");
  };
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY); setMsg(""); };

  const inp = e => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: v }));
  };

  const save = async () => {
    if (!form.title || !form.desc) { setMsg("Title ও Description দিন"); return; }
    setSaving(true); setMsg("");
    try {
      const data = {
        ...form,
        order: Number(form.order) || 0,
        features: typeof form.features === "string"
          ? form.features.split(",").map(f => f.trim()).filter(Boolean)
          : form.features,
      };
      if (editing) await servicesAPI.update(editing, data);
      else         await servicesAPI.create(data);
      closeModal();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      load();
    } catch (err) { setMsg(err.message); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm("Delete করবেন?")) return;
    try { await servicesAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const toggle = async (s) => {
    try { await servicesAPI.update(s._id, { ...s, active: !s.active }); load(); }
    catch (err) { alert(err.message); }
  };

  return (
    <div style={{ animation:"fadeUp 0.5s ease both" }}>
      <style>{\`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        .svc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:1rem; }
        .form-row2{ display:grid; grid-template-columns:1fr 1fr; gap:0 12px; }
        @media(max-width:520px){
          .form-row2{ grid-template-columns:1fr; }
          .svc-grid { grid-template-columns:1fr; }
        }
      \`}</style>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"clamp(1rem,3vw,1.8rem)", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", marginBottom:"0.2rem" }}>Services</h2>
          <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)" }}>
            {loading ? "Loading..." : \`\${services.filter(s=>s.active).length} Active · \${services.filter(s=>!s.active).length} Hidden\`}
          </p>
        </div>
        <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#818CF8,#f472b6)", border:"none", color:"#fff", borderRadius:10, padding:"10px 20px", fontWeight:800, fontSize:"0.85rem", cursor:"pointer", fontFamily:"var(--font-body)", whiteSpace:"nowrap" }}>
          + Add Service
        </button>
      </div>

      {saved && (
        <div style={{ background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.25)", borderRadius:10, padding:"11px 16px", marginBottom:"1rem", color:"#00D4AA", fontSize:"0.86rem", fontFamily:"var(--font-body)" }}>
          ✅ Service সফলভাবে save হয়েছে!
        </div>
      )}

      {/* List */}
      {loading ? (
        <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
          <div style={{ width:40,height:40,borderRadius:"50%",border:"3px solid rgba(129,140,248,0.1)",borderTop:"3px solid #818CF8",animation:"spin 1s linear infinite" }} />
        </div>
      ) : services.length === 0 ? (
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.1)", borderRadius:14, padding:"3rem", textAlign:"center" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.8rem" }}>⚙️</div>
          <p style={{ color:"rgba(255,255,255,0.4)", fontFamily:"var(--font-body)", marginBottom:"1rem" }}>No services yet.</p>
          <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#818CF8,#f472b6)", border:"none", color:"#fff", borderRadius:10, padding:"10px 20px", fontWeight:800, cursor:"pointer", fontFamily:"var(--font-body)" }}>+ Add First Service</button>
        </div>
      ) : (
        <div className="svc-grid">
          {services.map(s => (
            <div key={s._id} style={{ background:"rgba(255,255,255,0.02)", border:\`1px solid \${s.active?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.06)"}\`, borderRadius:16, padding:"clamp(14px,2.5vw,20px)", opacity:s.active?1:0.6, transition:"all 0.2s", display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                <div style={{ width:46,height:46,borderRadius:12,background:\`\${s.color}18\`,border:\`1px solid \${s.color}33\`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",flexShrink:0 }}>{s.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:3 }}>
                    <span style={{ background:s.active?"rgba(0,212,170,0.1)":"rgba(255,255,255,0.06)", color:s.active?"#00D4AA":"rgba(255,255,255,0.3)", padding:"1px 7px", borderRadius:99, fontSize:"0.68rem", fontWeight:700, fontFamily:"var(--font-body)" }}>{s.active?"● Active":"○ Hidden"}</span>
                    {s.tag && <span style={{ background:\`\${s.color}15\`,color:s.color,padding:"1px 7px",borderRadius:99,fontSize:"0.68rem",fontWeight:700,fontFamily:"var(--font-body)" }}>{s.tag}</span>}
                  </div>
                  <h4 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.9rem", color:"#fff", margin:0 }}>{s.title}</h4>
                </div>
              </div>
              <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", fontFamily:"var(--font-body)", margin:0, lineHeight:1.6 }}>{s.desc}</p>
              {(s.features||[]).length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {(s.features||[]).slice(0,3).map((f,i) => (
                    <span key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, padding:"2px 8px", fontSize:"0.7rem", color:"rgba(255,255,255,0.45)", fontFamily:"var(--font-body)" }}>{f}</span>
                  ))}
                  {(s.features||[]).length > 3 && <span style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.25)", fontFamily:"var(--font-body)" }}>+{s.features.length-3}</span>}
                </div>
              )}
              <div style={{ display:"flex", gap:6, marginTop:"auto" }}>
                <button onClick={()=>toggle(s)} style={{ flex:1,padding:"6px 0",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:s.active?"#f59e0b":"#00D4AA",fontSize:"0.72rem",fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)" }}>{s.active?"Hide":"Show"}</button>
                <button onClick={()=>openEdit(s)} style={{ flex:1,padding:"6px 0",borderRadius:8,border:"1px solid rgba(129,140,248,0.25)",background:"rgba(129,140,248,0.1)",color:"#818CF8",fontSize:"0.72rem",fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)" }}>Edit</button>
                <button onClick={()=>del(s._id)} style={{ flex:1,padding:"6px 0",borderRadius:8,border:"1px solid rgba(239,68,68,0.25)",background:"rgba(239,68,68,0.1)",color:"#f87171",fontSize:"0.72rem",fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal — no scroll needed */}
      {modal && (
        <div style={{ position:"fixed", top:"64px", left:0, right:0, bottom:0, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"flex-start", justifyContent:"center", zIndex:9999, overflowY:"auto", padding:"clamp(12px,3vw,20px)", backdropFilter:"blur(14px)" }}>
          <div style={{ background:"linear-gradient(135deg,#0d1629,#080f1c)", border:"1px solid rgba(129,140,248,0.2)", borderRadius:22, padding:"clamp(16px,3.5vw,28px)", width:"100%", maxWidth:580, marginBottom:"auto" }}>

            {/* Modal header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h3 style={{ color:"#fff", fontSize:"clamp(1rem,3vw,1.15rem)", fontWeight:800, margin:0, fontFamily:"var(--font-head)" }}>
                {editing ? "✏️ Edit Service" : "⚙️ New Service"}
              </h3>
              <button onClick={closeModal} style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.5)", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:"1rem" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.2)";e.currentTarget.style.color="#f87171";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>✕</button>
            </div>

            {msg && <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:9, padding:"10px 14px", marginBottom:"1rem", color:"#f87171", fontSize:"0.84rem", fontFamily:"var(--font-body)" }}>⚠️ {msg}</div>}

            {/* Icon picker */}
            <label style={LBL}>Icon</label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:6, marginBottom:"1rem" }}>
              {ICONS.map(ic => (
                <button key={ic} onClick={()=>setForm(f=>({...f,icon:ic}))}
                  style={{ aspectRatio:"1", fontSize:"1.3rem", borderRadius:9, border:form.icon===ic?"2px solid #818CF8":"2px solid transparent", background:form.icon===ic?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {ic}
                </button>
              ))}
            </div>

            {/* Color picker */}
            <label style={LBL}>Color</label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:"1rem" }}>
              {COLORS.map(c => (
                <button key={c} onClick={()=>setForm(f=>({...f,color:c}))}
                  style={{ width:32, height:32, borderRadius:"50%", background:c, border:form.color===c?"3px solid #fff":"3px solid transparent", cursor:"pointer", transition:"transform 0.15s", transform:form.color===c?"scale(1.2)":"scale(1)" }} />
              ))}
            </div>

            {/* Title + Tag in 2 columns */}
            <div className="form-row2">
              <div>
                <label style={LBL}>Title *</label>
                <input name="title" value={form.title} onChange={inp} placeholder="Service name" style={INP}
                  onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
              <div>
                <label style={LBL}>Badge Tag (optional)</label>
                <input name="tag" value={form.tag} onChange={inp} placeholder="e.g. Most Popular" style={INP}
                  onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
            </div>

            {/* Description */}
            <label style={LBL}>Short Description *</label>
            <textarea name="desc" value={form.desc} onChange={inp} rows={2} placeholder="Brief description..." style={{ ...INP, resize:"none" }}
              onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            {/* Features + Order in 2 columns */}
            <div className="form-row2">
              <div>
                <label style={LBL}>Features (comma separated)</label>
                <textarea name="features" value={form.features} onChange={inp} rows={2} placeholder="Feature 1, Feature 2, ..." style={{ ...INP, resize:"none" }}
                  onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
              <div>
                <label style={LBL}>Display Order</label>
                <input name="order" type="number" value={form.order} onChange={inp} placeholder="0" style={INP}
                  onFocus={e=>e.target.style.borderColor="#818CF8"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:-8 }}>
                  <input type="checkbox" name="active" checked={form.active} onChange={inp} style={{ width:16,height:16,accentColor:"#818CF8",cursor:"pointer" }} />
                  <label style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.84rem", fontFamily:"var(--font-body)", cursor:"pointer" }}>Active</label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display:"flex", gap:10, marginTop:4 }}>
              <button onClick={closeModal} style={{ flex:1,padding:"12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"rgba(255,255,255,0.45)",cursor:"pointer",fontFamily:"var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex:2,padding:"12px",background:saving?"rgba(129,140,248,0.4)":"linear-gradient(135deg,#818CF8,#f472b6)",border:"none",borderRadius:10,color:"#fff",cursor:saving?"not-allowed":"pointer",fontWeight:800,fontFamily:"var(--font-body)" }}>
                {saving ? "Saving..." : (editing ? "Update ✓" : "Save ✓")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 2. AdminDashboard.jsx — add Services card
// ══════════════════════════════════════════
const dashPath = path.join(src, "pages/admin/AdminDashboard.jsx");
if (fs.existsSync(dashPath)) {
  let f = fs.readFileSync(dashPath, "utf8");

  // Fix get() to handle totalServices
  if (!f.includes("totalServices")) {
    f = f.replace(
      "if (stats.skills !== undefined && key === \"totalSkills\") return stats.skills;",
      `if (stats.skills !== undefined && key === "totalSkills") return stats.skills;
    if (stats.totalServices !== undefined && key === "totalServices") return stats.totalServices;
    if (stats.services !== undefined && key === "totalServices") return stats.services;`
    );

    // Add Services card
    f = f.replace(
      `{ icon: "⚡", title: "Skills",`,
      `{ icon: "⚙️", title: "Services",  value: loading ? "..." : String(get("totalServices")), change: 0, color: "#818CF8" },
    { icon: "⚡", title: "Skills",`
    );

    fs.writeFileSync(dashPath, f, "utf8");
    console.log("✅ src/pages/admin/AdminDashboard.jsx — Services card added!");
  } else {
    console.log("ℹ️  AdminDashboard already has Services card");
  }
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║          ✅ সব fix হয়েছে!                               ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  এখন করুন:                                              ║
║    git add src/pages/admin/AdminServices.jsx             ║
║    git add src/pages/admin/AdminDashboard.jsx            ║
║    git commit -m "Fix services form and dashboard card"  ║
║    git push                                              ║
║                                                          ║
║  Backend এও push করুন (analyticsController fix):       ║
║    cd /c/portfolio-ecosystem/backend                     ║
║    git add .                                             ║
║    git commit -m "Add totalServices to analytics"        ║
║    git push                                              ║
╚══════════════════════════════════════════════════════════╝
`);
