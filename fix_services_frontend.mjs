import fs from "fs";
import path from "path";

const src = path.join(process.cwd(), "src");

function write(fp, content) {
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content.trimStart(), "utf8");
  console.log("✅", fp.replace(process.cwd() + "/", ""));
}

// ══ 1. api.js এ servicesAPI যুক্ত ══
const apiPath = path.join(src, "services/api.js");
let apiFile = fs.readFileSync(apiPath, "utf8");
if (!apiFile.includes("servicesAPI")) {
  apiFile += `
export const servicesAPI = {
  getAll:    ()         => api("/services"),
  create:    (data)     => api("/services",       { method: "POST",   body: JSON.stringify(data) }),
  update:    (id, data) => api(\`/services/\${id}\`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:    (id)       => api(\`/services/\${id}\`, { method: "DELETE" }),
};
`;
  fs.writeFileSync(apiPath, apiFile, "utf8");
  console.log("✅ src/services/api.js — servicesAPI added");
} else {
  console.log("ℹ️  api.js — servicesAPI already exists");
}

// ══ 2. Services.jsx ══
write(path.join(src, "pages/Services.jsx"), `
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { servicesAPI } from "../services/api";

const FALLBACK = [
  { _id:"1", icon:"🌐", title:"MERN Full Stack Development", color:"#00D4AA", tag:"Most Popular",
    desc:"End-to-end web applications built with MongoDB, Express.js, React.js, and Node.js.",
    features:["Custom web app from scratch","RESTful API design","Authentication & authorization","MongoDB database design","Vercel deployment"] },
  { _id:"2", icon:"⚛️", title:"React Frontend Development", color:"#38BDF8", tag:"",
    desc:"Modern, fast, and responsive React applications with smooth animations and great UX.",
    features:["Component-based architecture","State management","Responsive mobile-first design","Performance optimization","API integration"] },
  { _id:"3", icon:"🔧", title:"Node.js Backend & REST API", color:"#818CF8", tag:"",
    desc:"Scalable and secure backend systems with Node.js and Express. JWT authentication and more.",
    features:["Express.js REST API","JWT authentication","Middleware & error handling","Database integration","API documentation"] },
  { _id:"4", icon:"📈", title:"Digital Marketing", color:"#f472b6", tag:"New",
    desc:"Comprehensive digital marketing strategy to grow your online presence.",
    features:["Social media strategy","Content marketing","Email campaigns","Analytics & reporting","Brand positioning"] },
  { _id:"5", icon:"🎯", title:"Facebook & Google Ads", color:"#fb923c", tag:"",
    desc:"Performance marketing campaigns that maximize your ROI.",
    features:["Facebook Ads setup","Google Ads campaigns","Audience targeting","A/B testing","ROI optimization"] },
  { _id:"6", icon:"🔍", title:"SEO Optimization", color:"#34d399", tag:"",
    desc:"Technical SEO and keyword strategy to rank higher on Google.",
    features:["Technical SEO audit","Keyword research","On-page optimization","Core Web Vitals","Google Search Console"] },
];

function ServiceCard({ s, index, onSelect, selected }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isSelected = selected === s._id;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}
      onClick={() => onSelect(isSelected ? null : s._id)}
      style={{
        background: isSelected ? s.color + "12" : "rgba(255,255,255,0.02)",
        border: "1px solid " + (isSelected ? s.color + "55" : "rgba(255,255,255,0.07)"),
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        transition: "all 0.4s ease",
        transform: visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: (index % 3) * 0.1 + "s",
        boxShadow: isSelected ? "0 20px 50px " + s.color + "22" : "none",
        position: "relative",
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = s.color + "44";
          e.currentTarget.style.boxShadow = "0 16px 40px " + s.color + "18";
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}>

      <div style={{ height: 3, background: "linear-gradient(90deg," + s.color + ",transparent)" }} />

      <div style={{ padding: "clamp(20px,3vw,28px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{
            width: "clamp(52px,8vw,64px)", height: "clamp(52px,8vw,64px)",
            borderRadius: 16, background: s.color + "18",
            border: "1px solid " + s.color + "33",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(1.6rem,3.5vw,2rem)", flexShrink: 0,
          }}>{s.icon}</div>
          {s.tag && (
            <span style={{
              background: s.color + "18", border: "1px solid " + s.color + "44",
              color: s.color, borderRadius: 99, padding: "4px 12px",
              fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}>{s.tag}</span>
          )}
        </div>

        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(1rem,2.2vw,1.15rem)", color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "clamp(0.82rem,1.6vw,0.88rem)", lineHeight: 1.8, fontFamily: "var(--font-body)", marginBottom: 16 }}>{s.desc}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 6, color: s.color, fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
          <span>Click to see features</span>
          <span style={{ transform: isSelected ? "rotate(180deg)" : "none", transition: "transform 0.3s", display: "inline-block" }}>↓</span>
        </div>

        <div style={{
          maxHeight: isSelected ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s ease",
        }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 16, paddingTop: 16 }}>
            {(s.features || []).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, opacity: isSelected ? 1 : 0, transform: isSelected ? "none" : "translateX(-10px)", transition: "all 0.3s ease " + (i * 0.06 + 0.1) + "s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.color + "22", border: "1px solid " + s.color + "44", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: s.color, fontSize: "0.65rem" }}>✓</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.8rem,1.5vw,0.86rem)", fontFamily: "var(--font-body)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const nav = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => setServices(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const display = services.length > 0 ? services : FALLBACK;

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="Services | Tarikul Islam Tarek — MERN & Marketing" description="Professional MERN development, digital marketing, SEO, and Facebook/Google Ads services by Tarikul Islam Tarek." />

      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pre="What I Offer" title="My" highlight="Services" sub="Click on any service to see what's included" />

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(260px,30vw,340px),1fr))", gap: "clamp(14px,2.5vw,22px)", marginBottom: "clamp(48px,7vw,80px)" }}>
            {display.map((s, i) => (
              <ServiceCard key={s._id} s={s} index={i} onSelect={setSelected} selected={selected} />
            ))}
          </div>
        )}

        <div style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.14)", borderRadius: 24, padding: "clamp(28px,5vw,52px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(0,212,170,0.06),transparent 70%)", pointerEvents: "none" }} />
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,3.5vw,1.9rem)", color: "#fff", marginBottom: 12, position: "relative" }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.88rem,1.8vw,1rem)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.8, fontFamily: "var(--font-body)", position: "relative" }}>
            Let's discuss your requirements and build something amazing together.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <button onClick={() => nav("/contact")}
              style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 12, padding: "13px 32px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,170,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              Get In Touch 🚀
            </button>
            <button onClick={() => nav("/projects")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "13px 32px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#38BDF8"; e.currentTarget.style.color = "#38BDF8"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              View Projects
            </button>
          </div>
        </div>
      </div>
      <style>{\`@keyframes spin{to{transform:rotate(360deg)}}\`}</style>
    </main>
  );
}
`);

// ══ 3. AdminServices.jsx ══
write(path.join(src, "pages/admin/AdminServices.jsx"), `
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
      <style>{\`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      \`}</style>
    </div>
  );
}
`);

// ══ 4. Admin.jsx এ Services route যুক্ত ══
const adminPath = path.join(src, "pages/admin/Admin.jsx");
let admin = fs.readFileSync(adminPath, "utf8");
if (!admin.includes("AdminServices")) {
  admin = admin.replace(
    `import AdminProfile from "./AdminProfile";`,
    `import AdminProfile from "./AdminProfile";\nimport AdminServices from "./AdminServices";`
  );
  admin = admin.replace(
    `<Route path="profile"      element={<AdminProfile />} />`,
    `<Route path="profile"      element={<AdminProfile />} />\n          <Route path="services"     element={<AdminServices />} />`
  );
  fs.writeFileSync(adminPath, admin, "utf8");
  console.log("✅ Admin.jsx — Services route added");
}

// ══ 5. Sidebar এ Services link যুক্ত ══
const sidebarPath = path.join(src, "components/admin/Sidebar.jsx");
let sidebar = fs.readFileSync(sidebarPath, "utf8");
if (!sidebar.includes("/admin/services")) {
  // try different patterns
  const patterns = [
    `{ icon: "✍️", label: "Blog",`,
    `{ icon: "✍", label: "Blog",`,
    `label: "Blog"`,
  ];
  let patched = false;
  for (const p of patterns) {
    if (sidebar.includes(p)) {
      sidebar = sidebar.replace(p, `{ icon: "⚙️", label: "Services", path: "/admin/services" },\n  ${p}`);
      patched = true;
      break;
    }
  }
  if (patched) {
    fs.writeFileSync(sidebarPath, sidebar, "utf8");
    console.log("✅ Sidebar.jsx — Services link added");
  } else {
    console.log("⚠️  Sidebar.jsx — manual update needed (Blog pattern not found)");
  }
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║   ✅ Services সম্পূর্ণ হয়েছে!                           ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  এখন করুন:                                              ║
║  1. git add .                                            ║
║  2. git commit -m "premium services page + admin"        ║
║  3. git push                                             ║
║                                                          ║
║  Test করুন:                                             ║
║  http://localhost:5173/services                          ║
║  http://localhost:5173/admin/services                    ║
╚══════════════════════════════════════════════════════════╝
`);
