import fs from "fs";
import path from "path";

const base = process.cwd();
const src  = path.join(base, "src");

function write(fp, content) {
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content.trimStart(), "utf8");
  console.log("✅", fp.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// 1. Backend — Service model
// ══════════════════════════════════════════
write(path.join(base, "../../backend/models/Service.js"), `
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  icon:        { type: String, default: '🌐' },
  title:       { type: String, required: true },
  desc:        { type: String, required: true },
  color:       { type: String, default: '#00D4AA' },
  features:    [{ type: String }],
  tag:         { type: String, default: '' },
  order:       { type: Number, default: 0 },
  active:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
`);

// ══════════════════════════════════════════
// 2. Backend — Service controller
// ══════════════════════════════════════════
write(path.join(base, "../../backend/controllers/serviceController.js"), `
const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createService = async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.features === 'string') {
      body.features = body.features.split(',').map(f => f.trim()).filter(Boolean);
    }
    const service = await Service.create(body);
    res.status(201).json({ success: true, data: service });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.updateService = async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.features === 'string') {
      body.features = body.features.split(',').map(f => f.trim()).filter(Boolean);
    }
    const service = await Service.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
`);

// ══════════════════════════════════════════
// 3. Backend — Service routes
// ══════════════════════════════════════════
write(path.join(base, "../../backend/routes/serviceRoutes.js"), `
const express = require('express');
const router  = express.Router();
const {
  getServices, getAllServices, createService, updateService, deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',      getServices);
router.get('/all',   protect, getAllServices);
router.post('/',     protect, createService);
router.put('/:id',   protect, updateService);
router.delete('/:id',protect, deleteService);

module.exports = router;
`);

// Patch server.js to add service route
const serverPath = path.join(base, "../../backend/server.js");
let server = fs.readFileSync(serverPath, "utf8");
if (!server.includes("serviceRoutes")) {
  server = server.replace(
    "app.use('/api/upload'",
    "app.use('/api/services', require('./routes/serviceRoutes'));\napp.use('/api/upload'"
  );
  fs.writeFileSync(serverPath, server, "utf8");
  console.log("✅ backend/server.js — service route added");
}

// ══════════════════════════════════════════
// 4. Frontend API — add servicesAPI
// ══════════════════════════════════════════
let apiFile = fs.readFileSync(path.join(src, "services/api.js"), "utf8");
if (!apiFile.includes("servicesAPI")) {
  apiFile += `
export const servicesAPI = {
  getAll:    ()          => api("/services"),
  getAllAdmin:()          => api("/services/all"),
  create:    (data)      => api("/services",       { method: "POST",   body: JSON.stringify(data) }),
  update:    (id, data)  => api(\`/services/\${id}\`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:    (id)        => api(\`/services/\${id}\`, { method: "DELETE" }),
};
`;
  fs.writeFileSync(path.join(src, "services/api.js"), apiFile, "utf8");
  console.log("✅ api.js — servicesAPI added");
}

// ══════════════════════════════════════════
// 5. Premium Services.jsx — video-card style
// ══════════════════════════════════════════
write(path.join(src, "pages/Services.jsx"), `
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { servicesAPI } from "../services/api";

const FALLBACK = [
  { _id:"1", icon:"🌐", title:"MERN Full Stack Development", color:"#00D4AA",
    tag:"Most Popular",
    desc:"End-to-end web applications built with MongoDB, Express.js, React.js, and Node.js. From database design to beautiful frontend.",
    features:["Custom web app from scratch","RESTful API design","Authentication & authorization","MongoDB database design","Vercel/Render deployment"] },
  { _id:"2", icon:"⚛️", title:"React Frontend Development", color:"#38BDF8",
    tag:"",
    desc:"Modern, fast, and responsive React applications with smooth animations, great UX, and pixel-perfect design implementation.",
    features:["Component-based architecture","State management (Redux/Context)","Responsive mobile-first design","Performance optimization","API integration"] },
  { _id:"3", icon:"🔧", title:"Node.js Backend & REST API", color:"#818CF8",
    tag:"",
    desc:"Scalable and secure backend systems with Node.js and Express. JWT authentication, middleware, error handling, and more.",
    features:["Express.js REST API","JWT authentication","Middleware & error handling","Database integration","API documentation"] },
  { _id:"4", icon:"📈", title:"Digital Marketing", color:"#f472b6",
    tag:"New",
    desc:"Comprehensive digital marketing strategy to grow your online presence. Social media, content marketing, and paid advertising.",
    features:["Social media strategy","Content marketing","Email campaigns","Analytics & reporting","Brand positioning"] },
  { _id:"5", icon:"🎯", title:"Facebook & Google Ads", color:"#fb923c",
    tag:"",
    desc:"Performance marketing campaigns that maximize your ROI. Audience targeting, A/B testing, and conversion optimization.",
    features:["Facebook Ads setup","Google Ads campaigns","Audience targeting","A/B testing","ROI optimization"] },
  { _id:"6", icon:"🔍", title:"SEO Optimization", color:"#34d399",
    tag:"",
    desc:"Technical SEO and keyword strategy to rank higher on Google. On-page, off-page, and Core Web Vitals optimization.",
    features:["Technical SEO audit","Keyword research","On-page optimization","Core Web Vitals","Google Search Console"] },
];

function ServiceCard({ s, index, onSelect, selected }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isSelected = selected === s._id;

  return (
    <div ref={ref}
      onClick={() => onSelect(isSelected ? null : s._id)}
      style={{
        background: isSelected ? \`\${s.color}12\` : "rgba(255,255,255,0.02)",
        border: \`1px solid \${isSelected ? s.color + "55" : "rgba(255,255,255,0.07)"}\`,
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        transition: "all 0.4s ease",
        transform: visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: (index % 3) * 0.1 + "s",
        boxShadow: isSelected ? \`0 20px 50px \${s.color}22\` : "none",
        position: "relative",
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.borderColor = s.color + "44";
          e.currentTarget.style.boxShadow = \`0 16px 40px \${s.color}18\`;
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}>

      {/* Color bar top */}
      <div style={{ height: 3, background: \`linear-gradient(90deg,\${s.color},transparent)\` }} />

      {/* Tag */}
      {s.tag && (
        <div style={{ position: "absolute", top: 16, right: 16, background: s.color + "20", border: \`1px solid \${s.color}44\`, borderRadius: 99, padding: "3px 10px", fontSize: "0.68rem", color: s.color, fontWeight: 700, fontFamily: "var(--font-body)" }}>
          {s.tag}
        </div>
      )}

      <div style={{ padding: "clamp(20px,3vw,28px)" }}>
        {/* Icon */}
        <div style={{ width: 60, height: 60, borderRadius: 16, background: s.color + "15", border: \`1px solid \${s.color}30\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", marginBottom: "1.2rem", transition: "transform 0.3s" }}>
          {s.icon}
        </div>

        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1rem,2.2vw,1.15rem)", marginBottom: "0.7rem", color: "#fff", lineHeight: 1.3 }}>{s.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.82rem,1.8vw,0.88rem)", lineHeight: 1.8, fontFamily: "var(--font-body)", marginBottom: "1.3rem" }}>{s.desc}</p>

        {/* Features — expand on click */}
        <div style={{ overflow: "hidden", maxHeight: isSelected ? "300px" : "0", transition: "max-height 0.4s ease, opacity 0.3s", opacity: isSelected ? 1 : 0 }}>
          <div style={{ paddingTop: "0.8rem", borderTop: \`1px solid \${s.color}22\`, marginBottom: "1rem" }}>
            {(s.features || []).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.84rem", fontFamily: "var(--font-body)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: s.color, fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 5 }}>
            {isSelected ? "Click to close ↑" : "View details ↓"}
          </span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.color + "15", border: \`1px solid \${s.color}30\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", transition: "transform 0.3s", transform: isSelected ? "rotate(180deg)" : "rotate(0)" }}>
            ↓
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

  const displayServices = services.length > 0 ? services : FALLBACK;

  return (
    <main style={{ minHeight: "100vh", paddingTop: 68, background: "#050A14" }}>
      <SEO title="Services | Tarikul Islam Tarek — MERN & Marketing" description="MERN Full Stack Development, React, Node.js, Digital Marketing, SEO, and Facebook/Google Ads services." />

      <div style={{ padding: "clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle pre="What I Offer" title="My" highlight="Services" sub="Click any service to see what's included" />

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(280px,30vw,360px),1fr))", gap: "clamp(14px,2.5vw,22px)", marginBottom: "4rem" }}>
            {displayServices.map((s, i) => (
              <ServiceCard key={s._id} s={s} index={i} onSelect={setSelected} selected={selected} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div style={{ textAlign: "center", padding: "clamp(40px,6vw,60px)", background: "rgba(0,212,170,0.03)", border: "1px solid rgba(0,212,170,0.1)", borderRadius: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,0.08),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.2rem)", color: "#fff", marginBottom: "1rem", letterSpacing: "-0.5px" }}>
              Ready to <span style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Work Together?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.9rem,2vw,1rem)", fontFamily: "var(--font-body)", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>
              Let's discuss your project and find the perfect solution for your needs.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => nav("/contact")}
                style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 12, padding: "14px 32px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,170,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Discuss Your Project 🚀
              </button>
              <button onClick={() => nav("/projects")}
                style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 28px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,170,0.4)"; e.currentTarget.style.color = "#00D4AA"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                View My Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// 6. AdminServices.jsx
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminServices.jsx"), `
import React, { useEffect, useState } from "react";
import { servicesAPI } from "../../services/api";

const ICONS = ["🌐","⚛️","🔧","🗄️","📈","🎯","🔍","🛒","📊","💡","🚀","🎨","📱","⚡","🔐","🌟","💼","🤖"];
const COLORS = ["#00D4AA","#38BDF8","#818CF8","#f472b6","#fb923c","#34d399","#f59e0b","#EC4899","#6366F1"];
const DEF = { icon:"🌐", title:"", desc:"", color:"#00D4AA", features:"", tag:"", order:0, active:true };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const load = () => {
    servicesAPI.getAllAdmin()
      .then(res => setServices(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const openAdd  = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (s) => { setForm({ ...s, features: (s.features||[]).join(", ") }); setEditing(s._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.title || !form.desc) return alert("Title ও description দিন");
    setSaving(true);
    try {
      editing ? await servicesAPI.update(editing, form) : await servicesAPI.create(form);
      closeForm(); load();
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const del = async (id, title) => {
    if (!confirm(\`"\${title}" delete করবেন?\`)) return;
    try { await servicesAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const toggleActive = async (s) => {
    try { await servicesAPI.update(s._id, { active: !s.active }); load(); }
    catch (err) { alert(err.message); }
  };

  const INP = { width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, padding:"11px 14px", color:"#fff", fontSize:"0.88rem", fontFamily:"var(--font-body)", outline:"none", marginBottom:"1rem", boxSizing:"border-box" };
  const LBL = { color:"rgba(255,255,255,0.4)", fontSize:"0.68rem", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:6 };

  return (
    <div style={{ animation:"fadeUp 0.5s ease both" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.4rem", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", marginBottom:"0.2rem" }}>Services</h2>
          <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)" }}>Website এ Services page এ দেখাবে</p>
        </div>
        <button onClick={openAdd}
          style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:800, fontSize:"0.88rem", cursor:"pointer", fontFamily:"var(--font-body)", whiteSpace:"nowrap" }}>
          + Add Service
        </button>
      </div>

      {/* Service list */}
      {loading ? (
        <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
          <div style={{ width:36,height:36,borderRadius:"50%",border:"3px solid rgba(0,212,170,0.1)",borderTop:"3px solid #00D4AA",animation:"spin 1s linear infinite" }} />
        </div>
      ) : services.length === 0 ? (
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.09)", borderRadius:14, padding:"3rem", textAlign:"center" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.8rem" }}>🌐</div>
          <p style={{ color:"rgba(255,255,255,0.35)", fontFamily:"var(--font-body)", marginBottom:"1rem" }}>No services yet.</p>
          <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:800, cursor:"pointer", fontFamily:"var(--font-body)" }}>Add First Service</button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1rem" }}>
          {services.map(s => (
            <div key={s._id}
              style={{ background:"rgba(255,255,255,0.02)", border:\`1px solid \${s.active?"rgba(0,212,170,0.12)":"rgba(255,255,255,0.05)"}\`, borderRadius:16, overflow:"hidden", opacity:s.active?1:0.6, transition:"all 0.2s" }}>
              <div style={{ height:3, background:\`linear-gradient(90deg,\${s.color},transparent)\` }} />
              <div style={{ padding:"clamp(14px,2.5vw,18px)" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:10 }}>
                  <div style={{ width:44,height:44,borderRadius:12,background:s.color+"15",border:"1px solid "+s.color+"30",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0 }}>{s.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4, flexWrap:"wrap" }}>
                      <h4 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.92rem", color:"#fff", margin:0 }}>{s.title}</h4>
                      {s.tag && <span style={{ background:s.color+"20", color:s.color, padding:"1px 8px", borderRadius:99, fontSize:"0.67rem", fontWeight:700 }}>{s.tag}</span>}
                    </div>
                    <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", fontFamily:"var(--font-body)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.desc}</p>
                  </div>
                </div>
                {s.features?.length > 0 && (
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
                    {s.features.slice(0,3).map((f,i)=>(
                      <span key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:99, padding:"2px 8px", fontSize:"0.68rem", color:"rgba(255,255,255,0.4)", fontFamily:"var(--font-body)" }}>{f}</span>
                    ))}
                    {s.features.length > 3 && <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.68rem", fontFamily:"var(--font-body)", alignSelf:"center" }}>+{s.features.length-3}</span>}
                  </div>
                )}
                <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                  <button onClick={()=>toggleActive(s)} style={{ background:s.active?"rgba(245,158,11,0.1)":"rgba(0,212,170,0.1)", border:"1px solid "+(s.active?"rgba(245,158,11,0.25)":"rgba(0,212,170,0.25)"), borderRadius:8, padding:"5px 11px", color:s.active?"#f59e0b":"#00D4AA", cursor:"pointer", fontSize:"0.72rem", fontWeight:600 }}>
                    {s.active?"Hide":"Show"}
                  </button>
                  <button onClick={()=>openEdit(s)} style={{ background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.25)", borderRadius:8, padding:"5px 11px", color:"#38BDF8", cursor:"pointer", fontSize:"0.72rem", fontWeight:600 }}>Edit</button>
                  <button onClick={()=>del(s._id,s.title)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:8, padding:"5px 11px", color:"#f87171", cursor:"pointer", fontSize:"0.72rem", fontWeight:600 }}>Del</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:3000, overflowY:"auto", display:"flex", justifyContent:"center", padding:"24px 16px", backdropFilter:"blur(16px)" }}>
          <div style={{ background:"linear-gradient(135deg,#0d1629,#080f1c)", border:"1px solid rgba(0,212,170,0.2)", borderRadius:20, padding:"clamp(18px,4vw,32px)", width:"100%", maxWidth:560, height:"fit-content", alignSelf:"flex-start" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.3rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:40,height:40,borderRadius:10,background:form.color+"20",border:"1px solid "+form.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem" }}>{form.icon}</div>
                <h3 style={{ color:"#fff", fontSize:"clamp(1rem,3vw,1.2rem)", fontWeight:800, margin:0, fontFamily:"var(--font-head)" }}>{editing?"Edit Service":"New Service"}</h3>
              </div>
              <button onClick={closeForm} style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.5)", borderRadius:8, width:32,height:32, cursor:"pointer", fontSize:"1.1rem" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.15)";e.currentTarget.style.color="#f87171";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>✕</button>
            </div>

            {/* Icon picker */}
            <div style={{ marginBottom:"1.2rem" }}>
              <span style={LBL}>Icon</span>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {ICONS.map(ic=>(
                  <button key={ic} onClick={()=>setForm(f=>({...f,icon:ic}))}
                    style={{ fontSize:"1.3rem", padding:"7px", borderRadius:9, border:form.icon===ic?"2px solid #00D4AA":"1px solid rgba(255,255,255,0.09)", background:form.icon===ic?"rgba(0,212,170,0.12)":"rgba(255,255,255,0.04)", cursor:"pointer" }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div style={{ marginBottom:"1.2rem" }}>
              <span style={LBL}>Color</span>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                {COLORS.map(c=>(
                  <button key={c} onClick={()=>setForm(f=>({...f,color:c}))}
                    style={{ width:32,height:32,borderRadius:8,background:c,border:form.color===c?"3px solid #fff":"2px solid transparent",cursor:"pointer",flexShrink:0 }} />
                ))}
              </div>
            </div>

            <span style={LBL}>Title *</span>
            <input name="title" placeholder="Service title" value={form.title} onChange={inp} style={INP}
              onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <span style={LBL}>Description *</span>
            <textarea name="desc" placeholder="Brief description of this service..." value={form.desc} onChange={inp} rows={3}
              style={{...INP,resize:"vertical"}}
              onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <span style={LBL}>Features (comma separated)</span>
            <textarea name="features" placeholder="Custom web app, REST API, Authentication, Deployment..." value={form.features} onChange={inp} rows={3}
              style={{...INP,resize:"vertical"}}
              onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 12px" }}>
              <div>
                <span style={LBL}>Badge Tag (optional)</span>
                <input name="tag" placeholder="Most Popular / New" value={form.tag} onChange={inp} style={{...INP,marginBottom:0}}
                  onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
              <div>
                <span style={LBL}>Display Order</span>
                <input name="order" type="number" value={form.order} onChange={inp} style={{...INP,marginBottom:0}}
                  onFocus={e=>e.target.style.borderColor="#00D4AA"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:9, margin:"1rem 0 1.3rem" }}>
              <input type="checkbox" name="active" checked={form.active} onChange={inp} style={{ width:18,height:18,accentColor:"#00D4AA",cursor:"pointer" }} />
              <label style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.88rem", fontFamily:"var(--font-body)", cursor:"pointer" }} onClick={()=>setForm(f=>({...f,active:!f.active}))}>
                Show on website
              </label>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={closeForm} style={{ flex:1,padding:13,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"rgba(255,255,255,0.45)",cursor:"pointer",fontFamily:"var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving}
                style={{ flex:2,padding:13,background:saving?"rgba(0,212,170,0.4)":"linear-gradient(135deg,#00D4AA,#38BDF8)",border:"none",borderRadius:10,color:"#050A14",cursor:saving?"not-allowed":"pointer",fontWeight:800,fontFamily:"var(--font-body)",opacity:saving?0.7:1 }}>
                {saving?"Saving...":(editing?"Update ✓":"Add Service ✓")}
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
// 7. Add Services to Admin routing + Sidebar
// ══════════════════════════════════════════
const adminPath = path.join(src, "pages/admin/Admin.jsx");
let admin = fs.readFileSync(adminPath, "utf8");
if (!admin.includes("AdminServices")) {
  admin = admin.replace(
    `import AdminAbout from "./AdminAbout";`,
    `import AdminAbout from "./AdminAbout";\nimport AdminServices from "./AdminServices";`
  );
  admin = admin.replace(
    `<Route path="about"        element={<AdminAbout />} />`,
    `<Route path="about"        element={<AdminAbout />} />\n          <Route path="services"     element={<AdminServices />} />`
  );
  fs.writeFileSync(adminPath, admin, "utf8");
  console.log("✅ Admin.jsx — Services route added");
}

const sidebarPath = path.join(src, "components/admin/Sidebar.jsx");
let sidebar = fs.readFileSync(sidebarPath, "utf8");
if (!sidebar.includes("/admin/services")) {
  sidebar = sidebar.replace(
    `{ icon: "✍️", label: "Blog",         path: "/admin/blog" },`,
    `{ icon: "⚙️", label: "Services",     path: "/admin/services" },\n  { icon: "✍️", label: "Blog",         path: "/admin/blog" },`
  );
  fs.writeFileSync(sidebarPath, sidebar, "utf8");
  console.log("✅ Sidebar.jsx — Services link added");
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║   ✅ Premium Services সম্পূর্ণ হয়েছে!                   ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 Backend restart করুন:                               ║
║     cd backend && node server.js                         ║
║                                                          ║
║  🚀 Frontend:                                            ║
║     cd client && npm run dev                             ║
║                                                          ║
║  ✅ Services page:                                       ║
║     • Click করলে features expand হয় (video-like)       ║
║     • Smooth animation on scroll                         ║
║     • Color-coded cards                                  ║
║     • Badge tags (Most Popular, New)                     ║
║     • CTA section নিচে                                  ║
║                                                          ║
║  ✅ Admin → Services (/admin/services):                  ║
║     • Icon picker + color picker                         ║
║     • Features (comma separated)                         ║
║     • Badge tag option                                   ║
║     • Show/Hide toggle                                   ║
║     • Display order control                              ║
╚══════════════════════════════════════════════════════════╝
`);
