import React, { useEffect, useState } from "react";
import { projectsAPI } from "../../services/api";

const DEF = { title: "", desc: "", emoji: "🚀", tech: "", live: "", github: "", color: "#00D4AA", status: "Live", cat: "Full Stack" };

// MERN stack + Marketing/Digital Marketing প্রাসঙ্গিক icon সেট
const PROJECT_EMOJIS = [
  "🚀","⚛️","🟢","🍃","⚙️","📦","🔗","💻","🖥️","🌐",
  "📱","🛒","💳","📊","📈","🎯","📣","📘","🔍","✉️",
  "💬","📅","🏥","🦷","💰","🔐","🗂️","☁️","🧩","🎨",
];

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm]         = useState(DEF);
  const [editing, setEditing]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const load = () => {
    projectsAPI.getAll()
      .then(res => setProjects(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    setSaving(true);
    try {
      if (editing) {
        await projectsAPI.update(editing, form);
        setEditing(null);
      } else {
        await projectsAPI.create(form);
      }
      setForm(DEF);
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this project?")) return;
    try { await projectsAPI.delete(id); load(); }
    catch (err) { alert("Error: " + err.message); }
  };

  const inputSt = { width: "100%", background: "var(--surface)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: "0.87rem", fontFamily: "var(--font-body)", outline: "none", marginBottom: "0.8rem", boxSizing: "border-box" };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.5rem)", marginBottom: "0.3rem", color: "#fff" }}>Projects</h2>
      <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>MongoDB তে সরাসরি save হবে</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="ap-grid">
        {/* Form */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#00D4AA" }}>{editing ? "Edit" : "Add"} Project</h3>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 8 }}>
              Project Icon
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,212,170,0.08)", border: "1.5px solid rgba(0,212,170,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                {form.emoji || "🚀"}
              </div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>নিচ থেকে একটি icon বেছে নিন</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(42px,1fr))", gap: 7 }}>
              {PROJECT_EMOJIS.map(e => {
                const active = form.emoji === e;
                return (
                  <button key={e} type="button" onClick={() => setForm(f => ({ ...f, emoji: e }))}
                    style={{
                      aspectRatio: "1", borderRadius: 10, fontSize: "1.15rem", cursor: "pointer",
                      background: active ? "rgba(0,212,170,0.16)" : "rgba(255,255,255,0.03)",
                      border: active ? "1.5px solid #00D4AA" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: active ? "0 0 12px rgba(0,212,170,0.25)" : "none",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={ev => { if (!active) ev.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={ev => { if (!active) ev.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                    {e}
                  </button>
                );
              })}
            </div>
          </div>
          <input name="title"  placeholder="Title *"    value={form.title}  onChange={inp} style={inputSt} />
          <textarea name="desc" placeholder="Description *" value={form.desc} onChange={inp} rows={3} style={{ ...inputSt, resize: "vertical" }} />
          <input name="tech"   placeholder="Tech (React, Node, MongoDB)" value={form.tech}   onChange={inp} style={inputSt} />
          <input name="live"   placeholder="Live URL"   value={form.live}   onChange={inp} style={inputSt} />
          <input name="github" placeholder="GitHub URL" value={form.github} onChange={inp} style={inputSt} />
          <input name="color"  placeholder="Color (#00D4AA)" value={form.color} onChange={inp} style={{ ...inputSt, marginBottom: "1.2rem" }} />
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button onClick={save} disabled={saving}
              style={{ flex: 1, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 8, padding: "11px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving..." : (editing ? "Update" : "Add")}
            </button>
            {editing && <button onClick={() => { setEditing(null); setForm(DEF); }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "11px 14px", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Cancel</button>}
          </div>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {loading ? <p style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>Loading...</p> :
           projects.length === 0 ? <p style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>No projects yet. Add one!</p> :
           projects.map(p => (
            <div key={p._id} style={{ background: "var(--card)", borderRadius: 12, padding: "1.2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <div>
                  <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.92rem", color: "#fff" }}>{p.emoji} {p.title}</h4>
                  <div style={{ color: "#00D4AA", fontSize: "0.75rem", fontFamily: "var(--font-body)", marginTop: 2 }}>{p.status}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => { setForm({ ...p, tech: (p.tech || []).join(", ") }); setEditing(p._id); }} style={{ background: "rgba(56,189,248,0.1)", border: "none", borderRadius: 5, padding: "5px 10px", color: "#38BDF8", cursor: "pointer", fontSize: "0.78rem" }}>Edit</button>
                  <button onClick={() => del(p._id)} style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 5, padding: "5px 10px", color: "#f87171", cursor: "pointer", fontSize: "0.78rem" }}>Del</button>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: 0 }}>{p.desc?.slice(0, 80)}...</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:700px){.ap-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
