import React, { useEffect, useState } from "react";
import { testimonialsAPI } from "../../services/api";

const AVATARS = ["🧑‍💼","👩‍💻","👨‍💼","👩‍🎨","👨‍🔬","👩‍💼","🧑‍🚀","👨‍🎨","👩‍🔬","🧑‍💻"];
const DEF = { name:"", role:"", text:"", avatar:"🧑‍💼", rating:5, active:true };

export default function AdminTestimonials() {
  const [reviews, setReviews]   = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const load = () => {
    // Get ALL reviews (active + hidden) for admin — use getAll
    // Backend testimonials route: active filter only applied on GET without auth
    // We need admin to see all — send token
    testimonialsAPI.getAll()
      .then(res => setReviews(res.data || []))
      .catch(err => console.error("Testimonials error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const openAdd  = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (r) => { setForm({ ...r }); setEditing(r._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.name || !form.role || !form.text) return alert("Name, role এবং review text দিন");
    setSaving(true);
    try {
      editing ? await testimonialsAPI.update(editing, form) : await testimonialsAPI.create(form);
      closeForm(); load();
    } catch (err) { alert("Error: " + err.message); }
    finally { setSaving(false); }
  };

  const del = async (id, name) => {
    if (!confirm(`"${name}" এর review delete করবেন?`)) return;
    try { await testimonialsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const toggleActive = async (r) => {
    try { await testimonialsAPI.update(r._id, { active: !r.active }); load(); }
    catch (err) { alert(err.message); }
  };

  const inputSt = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: "0.88rem", fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem", boxSizing: "border-box" };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Client Reviews</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Active reviews website এ দেখাবে — inactive গুলো hidden থাকবে</p>
        </div>
        <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          + Add Review
        </button>
      </div>

      {/* Note */}
      <div style={{ background: "rgba(244,114,182,0.05)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 12, padding: "12px 18px", marginBottom: "1.5rem", display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: "1.2rem" }}>💡</span>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.84rem", fontFamily: "var(--font-body)", margin: 0 }}>
          <strong style={{ color: "#f472b6" }}>Professional approach:</strong> আপনি নিজে client এর review add করবেন এবং "Active" করে দেবেন। Website visitor রা সরাসরি review submit করতে পারবে না — এটাই industry standard।
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[["Total", reviews.length, "#fff"],["Active", reviews.filter(r=>r.active).length, "#00D4AA"],["Hidden", reviews.filter(r=>!r.active).length, "rgba(255,255,255,0.3)"]].map(([l,n,c])=>(
          <div key={l} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 16px", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: c, fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{n}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Review list */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(244,114,182,0.1)", borderTop: "3px solid #f472b6", animation: "spin 1s linear infinite" }} />
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⭐</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>No reviews yet. Add your first client testimonial!</p>
          <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-body)" }}>+ Add First Review</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.2rem" }}>
          {reviews.map(r => (
            <div key={r._id} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${r.active ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 18, padding: "clamp(16px,2.5vw,22px)", opacity: r.active ? 1 : 0.65, transition: "all 0.2s", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 14 }}>
                <span style={{ background: r.active ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.06)", color: r.active ? "#00D4AA" : "rgba(255,255,255,0.3)", padding: "2px 8px", borderRadius: 99, fontSize: "0.68rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                  {r.active ? "● Live" : "○ Hidden"}
                </span>
              </div>
              <div style={{ fontSize: "2.5rem", color: "rgba(244,114,182,0.12)", fontFamily: "Georgia", lineHeight: 1, marginBottom: 4 }}>"</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.87rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: 16, fontFamily: "var(--font-body)", paddingRight: 40 }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{r.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-head)" }}>{r.name}</div>
                  <div style={{ color: "#f472b6", fontSize: "0.78rem", fontFamily: "var(--font-body)", marginTop: 1 }}>{r.role}</div>
                </div>
                <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(i=><span key={i} style={{ color: i<=(r.rating||5)?"#f59e0b":"rgba(255,255,255,0.15)", fontSize: "0.9rem" }}>★</span>)}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toggleActive(r)} style={{ flex: 1, background: r.active ? "rgba(255,255,255,0.05)" : "rgba(0,212,170,0.1)", border: r.active ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,212,170,0.2)", borderRadius: 8, padding: "7px", color: r.active ? "rgba(255,255,255,0.4)" : "#00D4AA", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  {r.active ? "Hide" : "Show"}
                </button>
                <button onClick={() => openEdit(r)} style={{ flex: 1, background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 8, padding: "7px", color: "#f472b6", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Edit</button>
                <button onClick={() => del(r._id, r.name)} style={{ flex: 1, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "7px", color: "#f87171", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "linear-gradient(135deg,#0d1629,#080f1c)", border: "1px solid rgba(244,114,182,0.18)", borderRadius: 24, padding: "clamp(20px,4vw,40px)", width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.25rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>{editing ? "Edit Review" : "Add Client Review"}</h3>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.15)";e.currentTarget.style.color="#f87171";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>✕</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Avatar</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {AVATARS.map(av=><button key={av} onClick={()=>setForm(f=>({...f,avatar:av}))} style={{ fontSize:"1.4rem",padding:"6px",borderRadius:10,border:form.avatar===av?"2px solid #f472b6":"2px solid transparent",background:form.avatar===av?"rgba(244,114,182,0.12)":"rgba(255,255,255,0.04)",cursor:"pointer" }}>{av}</button>)}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Rating</label>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(i=><span key={i} onClick={()=>setForm(f=>({...f,rating:i}))} style={{ color:i<=form.rating?"#f59e0b":"rgba(255,255,255,0.2)",fontSize:"1.8rem",cursor:"pointer",transition:"color 0.15s" }}>★</span>)}
              </div>
            </div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Client Name *</label>
            <input name="name" placeholder="e.g. Ariful Islam" value={form.name} onChange={inp} style={inputSt}
              onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Role / Company *</label>
            <input name="role" placeholder="e.g. CEO, TechBD" value={form.role} onChange={inp} style={inputSt}
              onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Review Text *</label>
            <textarea name="text" placeholder="Client এর review..." value={form.text} onChange={inp} rows={4} style={{ ...inputSt, resize: "vertical" }}
              onFocus={e=>e.target.style.borderColor="#f472b6"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <input type="checkbox" name="active" checked={form.active} onChange={inp} style={{ width:18,height:18,accentColor:"#f472b6",cursor:"pointer" }} />
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "var(--font-body)", cursor: "pointer" }}>Show on website</label>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={closeForm} style={{ flex:1,padding:13,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex:2,padding:13,background:saving?"rgba(244,114,182,0.4)":"linear-gradient(135deg,#f472b6,#818CF8)",border:"none",borderRadius:10,color:"#050A14",cursor:saving?"not-allowed":"pointer",fontWeight:800,fontFamily:"var(--font-body)" }}>
                {saving?"Saving...":(editing?"Update ✓":"Save Review ✓")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
