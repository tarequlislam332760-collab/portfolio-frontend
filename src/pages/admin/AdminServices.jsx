import React, { useEffect, useState } from "react";
import { servicesAPI } from "../../services/api";

const ICONS = ["🌐","⚛️","🔧","📈","🎯","🔍","💡","🚀","⚙️","📊","🛒","✍️","🎨","🔐","📱","☁️"];
const COLORS = ["#00D4AA","#38BDF8","#818CF8","#f472b6","#fb923c","#34d399","#f59e0b","#ef4444"];

const EMPTY = { icon:"🌐", title:"", desc:"", color:"#00D4AA", features:"", tag:"", order:"0", active:true };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");

  const load = () => {
    servicesAPI.getAll()
      .then(res => setServices(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (s) => {
    setForm({ ...s, features: (s.features || []).join(", "), order: String(s.order || 0) });
    setEditing(s._id);
    setModal(true);
  };

  const inp = e => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: v }));
  };

  const save = async () => {
    if (!form.title || !form.desc) { setMsg("Title ও Description দিন"); return; }
    setSaving(true); setMsg("");
    try {
      const data = { ...form, order: Number(form.order) || 0,
        features: typeof form.features === "string"
          ? form.features.split(",").map(f => f.trim()).filter(Boolean)
          : form.features };
      if (editing) await servicesAPI.update(editing, data);
      else         await servicesAPI.create(data);
      setModal(false); load();
    } catch (err) { setMsg(err.message); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await servicesAPI.delete(id);
    load();
  };

  const INP = { width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, padding:"11px 14px", color:"#fff", fontSize:"0.88rem", fontFamily:"var(--font-body)", outline:"none", marginBottom:"1rem", boxSizing:"border-box", transition:"border-color 0.2s" };
  const focus = e => e.target.style.borderColor = "#00D4AA";
  const blur  = e => e.target.style.borderColor = "rgba(255,255,255,0.09)";

  return (
    <div style={{ animation:"fadeUp 0.5s ease both" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", margin:0 }}>Services</h2>
          <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)", marginTop:4 }}>Admin panel থেকে services manage করুন</p>
        </div>
        <button onClick={openAdd}
          style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", cursor:"pointer", fontWeight:700, fontSize:"0.88rem", fontFamily:"var(--font-body)", display:"flex", alignItems:"center", gap:8 }}>
          + New Service
        </button>
      </div>

      {loading ? (
        <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
          <div style={{ width:36, height:36, borderRadius:"50%", border:"3px solid rgba(0,212,170,0.1)", borderTop:"3px solid #00D4AA", animation:"spin 1s linear infinite" }} />
        </div>
      ) : services.length === 0 ? (
        <div style={{ textAlign:"center", padding:"4rem 2rem", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:20 }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>⚙️</div>
          <p style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>No services yet. Add your first service!</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(clamp(240px,28vw,320px),1fr))", gap:"clamp(12px,2vw,18px)" }}>
          {services.map(s => (
            <div key={s._id} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", transition:"border-color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=s.color+"44"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
              <div style={{ height:3, background:"linear-gradient(90deg,"+s.color+",transparent)" }} />
              <div style={{ padding:"clamp(14px,2.5vw,20px)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:"1.8rem" }}>{s.icon}</span>
                    <div>
                      <div style={{ color:"#fff", fontWeight:700, fontSize:"0.92rem", fontFamily:"var(--font-head)", lineHeight:1.3 }}>{s.title}</div>
                      {s.tag && <span style={{ background:s.color+"18", color:s.color, borderRadius:99, padding:"2px 9px", fontSize:"0.65rem", fontWeight:700 }}>{s.tag}</span>}
                    </div>
                  </div>
                  <span style={{ background:s.active?"rgba(0,212,170,0.1)":"rgba(255,255,255,0.05)", color:s.active?"#00D4AA":"rgba(255,255,255,0.3)", borderRadius:99, padding:"3px 9px", fontSize:"0.68rem", fontWeight:700 }}>
                    {s.active?"Live":"Hidden"}
                  </span>
                </div>
                <p style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.8rem", lineHeight:1.7, fontFamily:"var(--font-body)", marginBottom:12, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{s.desc}</p>
                {s.features?.length > 0 && (
                  <div style={{ marginBottom:12 }}>
                    {s.features.slice(0,3).map((f,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
                        <span style={{ color:s.color, fontSize:"0.65rem" }}>✓</span>
                        <span style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.78rem", fontFamily:"var(--font-body)" }}>{f}</span>
                      </div>
                    ))}
                    {s.features.length > 3 && <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.72rem" }}>+{s.features.length-3} more</span>}
                  </div>
                )}
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>openEdit(s)}
                    style={{ flex:1, padding:"8px", background:"rgba(56,189,248,0.08)", border:"1px solid rgba(56,189,248,0.18)", borderRadius:9, color:"#38BDF8", cursor:"pointer", fontSize:"0.8rem", fontWeight:600, fontFamily:"var(--font-body)" }}>
                    Edit
                  </button>
                  <button onClick={()=>del(s._id)}
                    style={{ padding:"8px 14px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.18)", borderRadius:9, color:"#f87171", cursor:"pointer", fontSize:"0.8rem", fontFamily:"var(--font-body)" }}>
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"flex-start", justifyContent:"center", zIndex:2000, padding:"clamp(10px,3vw,20px)", overflowY:"auto", backdropFilter:"blur(16px)" }}>
          <div style={{ background:"linear-gradient(135deg,#0d1629,#080f1c)", border:"1px solid rgba(0,212,170,0.18)", borderRadius:24, padding:"clamp(18px,4vw,32px)", width:"100%", maxWidth:540, marginTop:20, marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
              <h3 style={{ color:"#fff", fontFamily:"var(--font-head)", fontWeight:800, fontSize:"1.1rem", margin:0 }}>
                {editing ? "Edit Service" : "New Service"}
              </h3>
              <button onClick={()=>setModal(false)}
                style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.5)", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:"1.1rem" }}>×</button>
            </div>

            {msg && <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:9, padding:"10px 14px", marginBottom:"1rem", color:"#f87171", fontSize:"0.82rem" }}>{msg}</div>}

            <div style={{ marginBottom:"1rem" }}>
              <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:8 }}>Icon</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={()=>setForm(f=>({...f,icon:ic}))}
                    style={{ fontSize:"1.4rem", padding:"7px 9px", borderRadius:9, border:form.icon===ic?"2px solid #00D4AA":"2px solid transparent", background:form.icon===ic?"rgba(0,212,170,0.1)":"rgba(255,255,255,0.04)", cursor:"pointer", transition:"all 0.15s" }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"1rem" }}>
              <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:8 }}>Color</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {COLORS.map(c => (
                  <button key={c} onClick={()=>setForm(f=>({...f,color:c}))}
                    style={{ width:30, height:30, borderRadius:"50%", background:c, border:form.color===c?"3px solid #fff":"3px solid transparent", cursor:"pointer", transition:"all 0.15s", flexShrink:0 }} />
                ))}
              </div>
            </div>

            {[["Title *","title","text"],["Short Description *","desc","text"],["Features (comma separated)","features","text"],["Badge Tag (optional)","tag","text"],["Display Order","order","number"]].map(([l,n,t])=>(
              <div key={n}>
                <label style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:6 }}>{l}</label>
                <input name={n} type={t} value={form[n]||""} onChange={inp} style={INP} onFocus={focus} onBlur={blur} />
              </div>
            ))}

            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:"rgba(0,212,170,0.04)", border:"1px solid rgba(0,212,170,0.12)", borderRadius:10, cursor:"pointer", marginBottom:"1.5rem" }}
              onClick={()=>setForm(f=>({...f,active:!f.active}))}>
              <div style={{ width:40,height:22,borderRadius:99,background:form.active?"#00D4AA":"rgba(255,255,255,0.15)",position:"relative",transition:"background 0.3s",flexShrink:0 }}>
                <div style={{ position:"absolute",top:2,left:form.active?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.3s" }} />
              </div>
              <span style={{ color:form.active?"#00D4AA":"rgba(255,255,255,0.4)", fontSize:"0.86rem", fontFamily:"var(--font-body)" }}>
                {form.active?"Visible on website":"Hidden from website"}
              </span>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setModal(false)}
                style={{ flex:1, padding:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, color:"rgba(255,255,255,0.5)", cursor:"pointer", fontFamily:"var(--font-body)" }}>
                Cancel
              </button>
              <button onClick={save} disabled={saving}
                style={{ flex:1, padding:12, background:"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", borderRadius:10, color:"#050A14", cursor:saving?"not-allowed":"pointer", fontWeight:800, fontFamily:"var(--font-body)", opacity:saving?0.7:1 }}>
                {saving ? "Saving..." : editing ? "Update ✓" : "Create ✓"}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      `}</style>
    </div>
  );
}
