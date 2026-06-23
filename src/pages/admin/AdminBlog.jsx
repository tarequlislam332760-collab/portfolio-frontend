import React, { useEffect, useState } from "react";
import { blogsAPI } from "../../services/api";

const CAT_CONFIG = {
  "React":        { icon: "⚛️",  color: "#61DAFB", bg: "rgba(97,218,251,0.1)",   border: "rgba(97,218,251,0.4)" },
  "Node.js":      { icon: "🟢",  color: "#68A063", bg: "rgba(104,160,99,0.1)",   border: "rgba(104,160,99,0.4)" },
  "MongoDB":      { icon: "🍃",  color: "#4DB33D", bg: "rgba(77,179,61,0.1)",    border: "rgba(77,179,61,0.4)" },
  "Express":      { icon: "⚙️",  color: "#cccccc", bg: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.25)" },
  "Next.js":      { icon: "▲",   color: "#ffffff", bg: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.28)" },
  "JavaScript":   { icon: "📜",  color: "#F7DF1E", bg: "rgba(247,223,30,0.1)",   border: "rgba(247,223,30,0.4)" },
  "TypeScript":   { icon: "📘",  color: "#3178C6", bg: "rgba(49,120,198,0.1)",   border: "rgba(49,120,198,0.4)" },
  "SEO":          { icon: "🔍",  color: "#34d399", bg: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.4)" },
  "Marketing":    { icon: "📈",  color: "#f472b6", bg: "rgba(244,114,182,0.1)",  border: "rgba(244,114,182,0.4)" },
  "Facebook Ads": { icon: "📢",  color: "#1877F2", bg: "rgba(24,119,242,0.1)",   border: "rgba(24,119,242,0.4)" },
  "Google Ads":   { icon: "🎯",  color: "#EA4335", bg: "rgba(234,67,53,0.1)",    border: "rgba(234,67,53,0.4)" },
  "Tailwind CSS": { icon: "🌊",  color: "#06B6D4", bg: "rgba(6,182,212,0.1)",    border: "rgba(6,182,212,0.4)" },
  "Git":          { icon: "🌿",  color: "#F05031", bg: "rgba(240,80,49,0.1)",    border: "rgba(240,80,49,0.4)" },
};
const CATS = Object.keys(CAT_CONFIG);
const EMOJIS = ["✍️","📚","💡","🔥","🌐","🛒","📱","⭐","🚀","💼","📊","🎨","🤖","⚡","🔐","🌟"];
const DEF = { title:"", excerpt:"", content:"", category:"React", emoji:"⚛️", readTime:"5", color:"#61DAFB", published: true };

export default function AdminBlog() {
  const [blogs, setBlogs]       = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState("");

  const load = () => {
    blogsAPI.getAllAdmin()
      .then(res => setBlogs(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const selectCat = (cat) => {
    const cfg = CAT_CONFIG[cat];
    setForm(f => ({ ...f, category: cat, emoji: cfg.icon, color: cfg.color }));
  };

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const openAdd  = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (b) => { setForm({ ...b }); setEditing(b._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.title || !form.excerpt) return alert("Title ও excerpt দিন");
    setSaving(true);
    try {
      editing ? await blogsAPI.update(editing, form) : await blogsAPI.create(form);
      closeForm(); load();
    } catch (err) { alert("Error: " + err.message); }
    finally { setSaving(false); }
  };

  const del = async (id, title) => {
    if (!confirm('"' + title + '" delete করবেন?')) return;
    try { await blogsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const togglePublish = async (b) => {
    try { await blogsAPI.update(b._id, { published: !b.published }); load(); }
    catch (err) { alert(err.message); }
  };

  const filtered = blogs.filter(b =>
    !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase())
  );

  const catCfg = CAT_CONFIG[form.category] || CAT_CONFIG["React"];

  const INP = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:10, padding:"12px 14px", color:"#fff", fontSize:"0.88rem",
    fontFamily:"var(--font-body)", outline:"none", marginBottom:"0.9rem", boxSizing:"border-box",
  };
  const LBL = {
    color:"rgba(255,255,255,0.4)", fontSize:"0.68rem", letterSpacing:"1.5px",
    textTransform:"uppercase", fontFamily:"var(--font-body)", display:"block", marginBottom:6,
  };

  return (
    <div style={{ animation:"fadeUp 0.5s ease both" }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.4rem", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.2rem,4vw,1.5rem)", color:"#fff", marginBottom:"0.2rem" }}>Blog Posts</h2>
          <p style={{ color:"var(--muted)", fontSize:"0.82rem", fontFamily:"var(--font-body)" }}>MongoDB তে save — website এ automatically দেখায়</p>
        </div>
        <button onClick={openAdd}
          style={{ background:"linear-gradient(135deg,#38BDF8,#818CF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:800, fontSize:"0.88rem", cursor:"pointer", fontFamily:"var(--font-body)", whiteSpace:"nowrap" }}>
          + New Post
        </button>
      </div>

      {/* Search + stats */}
      <div style={{ display:"flex", gap:10, marginBottom:"1.2rem", flexWrap:"wrap", alignItems:"center" }}>
        <input placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...INP, marginBottom:0, flex:"1 1 180px", maxWidth:260 }}
          onFocus={e => e.target.style.borderColor="#38BDF8"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
        {[["All",blogs.length,"#fff"],["Live",blogs.filter(b=>b.published).length,"#00D4AA"],["Draft",blogs.filter(b=>!b.published).length,"#f59e0b"]].map(([l,n,c]) => (
          <div key={l} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:9, padding:"7px 14px", display:"flex", gap:7, alignItems:"center", flexShrink:0 }}>
            <span style={{ color:c, fontWeight:700, fontFamily:"var(--font-head)", fontSize:"0.95rem" }}>{n}</span>
            <span style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", fontFamily:"var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Blog list */}
      {loading ? (
        <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", border:"3px solid rgba(56,189,248,0.1)", borderTop:"3px solid #38BDF8", animation:"spin 1s linear infinite" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.08)", borderRadius:14, padding:"3rem", textAlign:"center" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.8rem" }}>✍️</div>
          <p style={{ color:"rgba(255,255,255,0.35)", fontFamily:"var(--font-body)", marginBottom:"1rem" }}>No posts yet.</p>
          <button onClick={openAdd} style={{ background:"linear-gradient(135deg,#38BDF8,#818CF8)", border:"none", color:"#050A14", borderRadius:10, padding:"10px 20px", fontWeight:800, cursor:"pointer", fontFamily:"var(--font-body)" }}>Write First Post</button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
          {filtered.map(b => {
            const cfg = CAT_CONFIG[b.category] || { icon:"✍️", color:"#38BDF8", bg:"rgba(56,189,248,0.08)", border:"rgba(56,189,248,0.2)" };
            return (
              <div key={b._id}
                style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"clamp(12px,2vw,16px)", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", transition:"border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(56,189,248,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                <div style={{ width:46, height:46, borderRadius:11, background:cfg.bg, border:"1px solid "+cfg.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", flexShrink:0 }}>
                  {b.emoji || cfg.icon}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap", marginBottom:3 }}>
                    <span style={{ color:cfg.color, fontSize:"0.7rem", fontWeight:700, fontFamily:"var(--font-body)" }}>{cfg.icon} {b.category}</span>
                    <span style={{ background:b.published?"rgba(0,212,170,0.1)":"rgba(245,158,11,0.1)", color:b.published?"#00D4AA":"#f59e0b", padding:"2px 8px", borderRadius:99, fontSize:"0.67rem", fontWeight:700 }}>
                      {b.published?"Live":"Draft"}
                    </span>
                    <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.7rem" }}>{b.readTime}m</span>
                  </div>
                  <h4 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"clamp(0.84rem,2vw,0.94rem)", color:"#fff", margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.title}</h4>
                  <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.78rem", fontFamily:"var(--font-body)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.excerpt}</p>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0, flexWrap:"wrap" }}>
                  <button onClick={() => togglePublish(b)} style={{ background:b.published?"rgba(245,158,11,0.1)":"rgba(0,212,170,0.1)", border:"1px solid "+(b.published?"rgba(245,158,11,0.25)":"rgba(0,212,170,0.25)"), borderRadius:8, padding:"5px 11px", color:b.published?"#f59e0b":"#00D4AA", cursor:"pointer", fontSize:"0.72rem", fontWeight:600 }}>
                    {b.published?"Unpublish":"Publish"}
                  </button>
                  <button onClick={() => openEdit(b)} style={{ background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.25)", borderRadius:8, padding:"5px 11px", color:"#38BDF8", cursor:"pointer", fontSize:"0.72rem", fontWeight:600 }}>Edit</button>
                  <button onClick={() => del(b._id, b.title)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:8, padding:"5px 11px", color:"#f87171", cursor:"pointer", fontSize:"0.72rem", fontWeight:600 }}>Del</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ MODAL ═══ */}
      {showForm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:3000, overflowY:"auto", display:"flex", justifyContent:"center", padding:"24px 16px", backdropFilter:"blur(16px)" }}>
          <div style={{ background:"linear-gradient(135deg,#0d1629,#080f1c)", border:"1px solid rgba(56,189,248,0.2)", borderRadius:20, padding:"clamp(18px,4vw,32px)", width:"100%", maxWidth:600, marginTop:"auto", marginBottom:"auto" }}>

            {/* Modal header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.3rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:catCfg.bg, border:"1px solid "+catCfg.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>
                  {form.emoji}
                </div>
                <h3 style={{ color:"#fff", fontSize:"clamp(1rem,3vw,1.2rem)", fontWeight:800, margin:0, fontFamily:"var(--font-head)" }}>
                  {editing ? "Edit Post" : "New Blog Post"}
                </h3>
              </div>
              <button onClick={closeForm}
                style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.5)", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:"1.1rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.15)"; e.currentTarget.style.color="#f87171"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}>✕</button>
            </div>

            {/* Category icon grid — Projects style, 4 per row */}
            <div style={{ marginBottom:"1.2rem" }}>
              <span style={LBL}>Category (icon auto-selects)</span>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {CATS.map(cat => {
                  const cfg = CAT_CONFIG[cat];
                  const active = form.category === cat;
                  return (
                    <button key={cat} onClick={() => selectCat(cat)}
                      style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:10, cursor:"pointer", border: active ? "2px solid "+cfg.border : "1px solid rgba(255,255,255,0.09)", background: active ? cfg.bg : "rgba(255,255,255,0.03)", outline:"none", transition:"all 0.15s" }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background="rgba(255,255,255,0.07)"; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}>
                      <span style={{ fontSize:"1.3rem" }}>{cfg.icon}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:7 }}>
                {CATS.map(cat => {
                  const cfg = CAT_CONFIG[cat];
                  const active = form.category === cat;
                  return (
                    <button key={cat+'-lbl'} onClick={() => selectCat(cat)}
                      style={{ padding:"3px 10px", borderRadius:99, cursor:"pointer",
                        border: active ? "1px solid "+cfg.border : "1px solid rgba(255,255,255,0.08)",
                        background: active ? cfg.bg : "transparent",
                        color: active ? cfg.color : "rgba(255,255,255,0.5)",
                        fontSize:"0.7rem", fontWeight: active ? 700 : 400,
                        fontFamily:"var(--font-body)", outline:"none", whiteSpace:"nowrap" }}>
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra emoji */}
            <div style={{ marginBottom:"1.2rem" }}>
              <span style={LBL}>Custom Emoji</span>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => setForm(f => ({ ...f, emoji:e }))}
                    style={{ fontSize:"1.1rem", padding:"6px", borderRadius:8, border: form.emoji===e ? "2px solid #38BDF8" : "1px solid rgba(255,255,255,0.09)", background: form.emoji===e ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)", cursor:"pointer" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <span style={LBL}>Title *</span>
            <input name="title" placeholder="Blog post title" value={form.title} onChange={inp} style={INP}
              onFocus={e => e.target.style.borderColor=catCfg.color} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />

            <span style={LBL}>Short Description *</span>
            <textarea name="excerpt" placeholder="Brief description shown on blog page..." value={form.excerpt} onChange={inp} rows={3}
              style={{ ...INP, resize:"vertical" }}
              onFocus={e => e.target.style.borderColor=catCfg.color} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />

            <span style={LBL}>Full Content (optional)</span>
            <textarea name="content" placeholder="Full article content..." value={form.content} onChange={inp} rows={4}
              style={{ ...INP, resize:"vertical" }}
              onFocus={e => e.target.style.borderColor=catCfg.color} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />

            <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap", marginBottom:"1.2rem" }}>
              <div style={{ flex:"1 1 100px" }}>
                <span style={LBL}>Read Time (min)</span>
                <input name="readTime" placeholder="5" value={form.readTime} onChange={inp}
                  style={{ ...INP, marginBottom:0 }}
                  onFocus={e => e.target.style.borderColor=catCfg.color} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
              </div>
              <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flexShrink:0, paddingTop:18 }}>
                <input type="checkbox" name="published" checked={form.published} onChange={inp}
                  style={{ width:18, height:18, accentColor:"#38BDF8", cursor:"pointer" }} />
                <span style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.88rem", fontFamily:"var(--font-body)" }}>Publish immediately</span>
              </label>
            </div>

            {/* Buttons */}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={closeForm}
                style={{ flex:1, padding:13, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, color:"rgba(255,255,255,0.45)", cursor:"pointer", fontFamily:"var(--font-body)" }}>
                Cancel
              </button>
              <button onClick={save} disabled={saving}
                style={{ flex:2, padding:13, background: saving ? "rgba(56,189,248,0.4)" : "linear-gradient(135deg,"+catCfg.color+",#818CF8)", border:"none", borderRadius:10, color:"#050A14", cursor: saving ? "not-allowed" : "pointer", fontWeight:800, fontSize:"0.92rem", fontFamily:"var(--font-body)", opacity: saving ? 0.7 : 1 }}>
                {saving ? "Saving..." : (editing ? "Update Post ✓" : "Publish Post ✓")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
