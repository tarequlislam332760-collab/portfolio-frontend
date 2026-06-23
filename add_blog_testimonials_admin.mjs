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
// 1. AdminBlog.jsx — full CRUD with backend
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminBlog.jsx"), `
import React, { useEffect, useState } from "react";
import { blogsAPI } from "../../services/api";

const CATS = ["React","Node.js","MongoDB","Next.js","JavaScript","SEO","Marketing","Express"];
const EMOJIS = ["✍️","⚛️","🍃","📈","🎯","📚","🌐","⚙️","💡","🔥","🛒","📱"];
const DEF = { title:"", excerpt:"", content:"", category:"React", emoji:"✍️", readTime:"5", color:"#38BDF8", published: true };

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

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const openAdd = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (b) => { setForm({ ...b }); setEditing(b._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.title || !form.excerpt) return alert("Title ও excerpt দিন");
    setSaving(true);
    try {
      if (editing) {
        await blogsAPI.update(editing, form);
      } else {
        await blogsAPI.create(form);
      }
      closeForm();
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id, title) => {
    if (!confirm(\`"\${title}" delete করবেন?\`)) return;
    try { await blogsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const togglePublish = async (b) => {
    try {
      await blogsAPI.update(b._id, { ...b, published: !b.published });
      load();
    } catch (err) { alert(err.message); }
  };

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  const inputSt = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: "0.88rem",
    fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Blog Posts</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>MongoDB তে directly save হয়</p>
        </div>
        <button onClick={openAdd}
          style={{ background: "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
          + New Post
        </button>
      </div>

      {/* Search */}
      <input placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ ...inputSt, marginBottom: "1.5rem", maxWidth: 360 }}
        onFocus={e => e.target.style.borderColor = "#38BDF8"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 16, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[
          ["All", blogs.length, "#fff"],
          ["Published", blogs.filter(b => b.published).length, "#00D4AA"],
          ["Draft", blogs.filter(b => !b.published).length, "#f59e0b"],
        ].map(([l, n, c]) => (
          <div key={l} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 16px", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: c, fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{n}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Blog list */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(56,189,248,0.1)", borderTop: "3px solid #38BDF8", animation: "spin 1s linear infinite" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✍️</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>No posts yet. Click "+ New Post" to start writing.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map(b => (
            <div key={b._id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "clamp(14px,2.5vw,20px)", display: "flex", alignItems: "center", gap: 16, transition: "border-color 0.2s", flexWrap: "wrap" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
              {/* Emoji */}
              <div style={{ width: 48, height: 48, borderRadius: 12, background: \`\${b.color || "#38BDF8"}18\`, border: \`1px solid \${b.color || "#38BDF8"}33\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                {b.emoji}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", color: "#fff", margin: 0 }}>{b.title}</h4>
                  <span style={{ background: b.published ? "rgba(0,212,170,0.1)" : "rgba(245,158,11,0.1)", color: b.published ? "#00D4AA" : "#f59e0b", padding: "2px 8px", borderRadius: 99, fontSize: "0.7rem", fontWeight: 700, fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
                    {b.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", fontFamily: "var(--font-body)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.excerpt}</p>
                <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                  <span style={{ color: b.color || "#38BDF8", fontSize: "0.74rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>{b.category}</span>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.74rem", fontFamily: "var(--font-body)" }}>{b.readTime} min read</span>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.74rem", fontFamily: "var(--font-body)" }}>{new Date(b.createdAt).toLocaleDateString("en-BD")}</span>
                </div>
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
                <button onClick={() => togglePublish(b)}
                  style={{ background: b.published ? "rgba(245,158,11,0.1)" : "rgba(0,212,170,0.1)", border: \`1px solid \${b.published ? "rgba(245,158,11,0.2)" : "rgba(0,212,170,0.2)"}\`, borderRadius: 8, padding: "6px 12px", color: b.published ? "#f59e0b" : "#00D4AA", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
                  {b.published ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => openEdit(b)}
                  style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, padding: "6px 12px", color: "#38BDF8", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  Edit
                </button>
                <button onClick={() => del(b._id, b.title)}
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "6px 12px", color: "#f87171", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "linear-gradient(135deg,#0d1629,#080f1c)", border: "1px solid rgba(56,189,248,0.18)", borderRadius: 24, padding: "clamp(20px,4vw,40px)", width: "100%", maxWidth: 560, maxHeight: "92vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.3rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>
                {editing ? "Edit Blog Post" : "New Blog Post"}
              </h3>
              <button onClick={closeForm}
                style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>✕</button>
            </div>

            {/* Emoji Picker */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Icon</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => setForm(f => ({ ...f, emoji: e }))}
                    style={{ fontSize: "1.2rem", padding: "7px", borderRadius: 10, border: form.emoji === e ? "2px solid #38BDF8" : "2px solid transparent", background: form.emoji === e ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.15s" }}>{e}</button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Category</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {CATS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                    style={{ padding: "6px 13px", borderRadius: 99, border: form.category === c ? "1px solid #38BDF8" : "1px solid rgba(255,255,255,0.08)", background: form.category === c ? "rgba(56,189,248,0.12)" : "transparent", color: form.category === c ? "#38BDF8" : "rgba(255,255,255,0.38)", cursor: "pointer", fontSize: "0.78rem", fontWeight: form.category === c ? 700 : 400, fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Title *</label>
            <input name="title" placeholder="Blog post title" value={form.title} onChange={inp} style={inputSt}
              onFocus={e => e.target.style.borderColor = "#38BDF8"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Short Description *</label>
            <textarea name="excerpt" placeholder="Brief description (shown in blog list)" value={form.excerpt} onChange={inp} rows={3}
              style={{ ...inputSt, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#38BDF8"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Full Content (optional)</label>
            <textarea name="content" placeholder="Full blog post content..." value={form.content} onChange={inp} rows={5}
              style={{ ...inputSt, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#38BDF8"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
              <div>
                <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Read Time (min)</label>
                <input name="readTime" placeholder="5" value={form.readTime} onChange={inp} style={inputSt}
                  onFocus={e => e.target.style.borderColor = "#38BDF8"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              </div>
              <div>
                <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Card Color</label>
                <input name="color" type="color" value={form.color || "#38BDF8"} onChange={inp}
                  style={{ ...inputSt, height: 44, padding: "4px 8px", cursor: "pointer" }} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <input type="checkbox" name="published" checked={form.published} onChange={inp} style={{ width: 18, height: 18, accentColor: "#38BDF8", cursor: "pointer" }} />
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "var(--font-body)", cursor: "pointer" }}>Publish immediately</label>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={closeForm}
                style={{ flex: 1, padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving}
                style={{ flex: 2, padding: 13, background: saving ? "rgba(56,189,248,0.4)" : "linear-gradient(135deg,#38BDF8,#818CF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: saving ? "not-allowed" : "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)" }}>
                {saving ? "Saving..." : (editing ? "Update Post ✓" : "Publish Post ✓")}
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
// 2. AdminTestimonials.jsx — full CRUD
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/AdminTestimonials.jsx"), `
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
    testimonialsAPI.getAll()
      .then(res => setReviews(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const inp = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const openAdd = () => { setForm(DEF); setEditing(null); setShowForm(true); };
  const openEdit = (r) => { setForm({ ...r }); setEditing(r._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(DEF); };

  const save = async () => {
    if (!form.name || !form.role || !form.text) return alert("Name, role ও review text দিন");
    setSaving(true);
    try {
      if (editing) {
        await testimonialsAPI.update(editing, form);
      } else {
        await testimonialsAPI.create(form);
      }
      closeForm();
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id, name) => {
    if (!confirm(\`"\${name}" এর review delete করবেন?\`)) return;
    try { await testimonialsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const toggleActive = async (r) => {
    try {
      await testimonialsAPI.update(r._id, { ...r, active: !r.active });
      load();
    } catch (err) { alert(err.message); }
  };

  const inputSt = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: "0.88rem",
    fontFamily: "var(--font-body)", outline: "none", marginBottom: "1rem", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const Stars = ({ n }) => (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? "#f59e0b" : "rgba(255,255,255,0.15)", fontSize: "1rem", cursor: "pointer" }}
          onClick={() => setForm(f => ({ ...f, rating: i }))}>★</span>
      ))}
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Client Reviews</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Website এ দেখাবে (active reviews only)</p>
        </div>
        <button onClick={openAdd}
          style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", border: "none", color: "#050A14", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
          + Add Review
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[
          ["Total", reviews.length, "#fff"],
          ["Active", reviews.filter(r => r.active).length, "#00D4AA"],
          ["Hidden", reviews.filter(r => !r.active).length, "rgba(255,255,255,0.3)"],
        ].map(([l, n, c]) => (
          <div key={l} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 16px", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: c, fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{n}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Review list */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(244,114,182,0.1)", borderTop: "3px solid #f472b6", animation: "spin 1s linear infinite" }} />
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⭐</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>No reviews yet. Add client testimonials!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.2rem" }}>
          {reviews.map(r => (
            <div key={r._id} style={{ background: "rgba(255,255,255,0.02)", border: \`1px solid \${r.active ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.06)"}\`, borderRadius: 18, padding: "clamp(16px,2.5vw,22px)", position: "relative", opacity: r.active ? 1 : 0.6, transition: "all 0.2s" }}>
              {/* Active badge */}
              <div style={{ position: "absolute", top: 14, right: 14 }}>
                <span style={{ background: r.active ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.06)", color: r.active ? "#00D4AA" : "rgba(255,255,255,0.3)", padding: "2px 8px", borderRadius: 99, fontSize: "0.68rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                  {r.active ? "Active" : "Hidden"}
                </span>
              </div>
              {/* Quote */}
              <div style={{ fontSize: "2.5rem", color: "rgba(244,114,182,0.12)", fontFamily: "Georgia", lineHeight: 1, marginBottom: 4, pointerEvents: "none" }}>"</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.87rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: 16, fontFamily: "var(--font-body)", paddingRight: 40 }}>"{r.text}"</p>
              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{r.avatar}</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-head)" }}>{r.name}</div>
                  <div style={{ color: "#f472b6", fontSize: "0.78rem", fontFamily: "var(--font-body)", marginTop: 1 }}>{r.role}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 1 }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= r.rating ? "#f59e0b" : "rgba(255,255,255,0.15)", fontSize: "0.9rem" }}>★</span>)}
                </div>
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => toggleActive(r)}
                  style={{ flex: 1, background: r.active ? "rgba(255,255,255,0.05)" : "rgba(0,212,170,0.1)", border: r.active ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,212,170,0.2)", borderRadius: 8, padding: "7px 10px", color: r.active ? "rgba(255,255,255,0.4)" : "#00D4AA", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  {r.active ? "Hide" : "Show"}
                </button>
                <button onClick={() => openEdit(r)}
                  style={{ flex: 1, background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 8, padding: "7px 10px", color: "#f472b6", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  Edit
                </button>
                <button onClick={() => del(r._id, r.name)}
                  style={{ flex: 1, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "7px 10px", color: "#f87171", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "linear-gradient(135deg,#0d1629,#080f1c)", border: "1px solid rgba(244,114,182,0.18)", borderRadius: 24, padding: "clamp(20px,4vw,40px)", width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.25rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>
                {editing ? "Edit Review" : "Add Client Review"}
              </h3>
              <button onClick={closeForm}
                style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>✕</button>
            </div>

            {/* Avatar picker */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Avatar</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {AVATARS.map(av => (
                  <button key={av} onClick={() => setForm(f => ({ ...f, avatar: av }))}
                    style={{ fontSize: "1.4rem", padding: "6px", borderRadius: 10, border: form.avatar === av ? "2px solid #f472b6" : "2px solid transparent", background: form.avatar === av ? "rgba(244,114,182,0.12)" : "rgba(255,255,255,0.04)", cursor: "pointer" }}>
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Rating</label>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} onClick={() => setForm(f => ({ ...f, rating: i }))}
                    style={{ color: i <= form.rating ? "#f59e0b" : "rgba(255,255,255,0.2)", fontSize: "1.6rem", cursor: "pointer", transition: "color 0.15s" }}>★</span>
                ))}
              </div>
            </div>

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Client Name *</label>
            <input name="name" placeholder="e.g. Ariful Islam" value={form.name} onChange={inp} style={inputSt}
              onFocus={e => e.target.style.borderColor = "#f472b6"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Role / Company *</label>
            <input name="role" placeholder="e.g. CEO, TechBD" value={form.role} onChange={inp} style={inputSt}
              onFocus={e => e.target.style.borderColor = "#f472b6"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block", marginBottom: 6 }}>Review Text *</label>
            <textarea name="text" placeholder="Client এর review লিখুন..." value={form.text} onChange={inp} rows={4}
              style={{ ...inputSt, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#f472b6"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <input type="checkbox" name="active" checked={form.active} onChange={inp} style={{ width: 18, height: 18, accentColor: "#f472b6", cursor: "pointer" }} />
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "var(--font-body)", cursor: "pointer" }}>Show on website immediately</label>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={closeForm}
                style={{ flex: 1, padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)" }}>Cancel</button>
              <button onClick={save} disabled={saving}
                style={{ flex: 2, padding: 13, background: saving ? "rgba(244,114,182,0.4)" : "linear-gradient(135deg,#f472b6,#818CF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: saving ? "not-allowed" : "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)" }}>
                {saving ? "Saving..." : (editing ? "Update Review ✓" : "Save Review ✓")}
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
// 3. Update Sidebar — add Blog & Testimonials links
// ══════════════════════════════════════════
write(path.join(src, "components/admin/Sidebar.jsx"), `
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { icon: "📊", label: "Dashboard",    path: "/admin" },
  { icon: "🚀", label: "Projects",     path: "/admin/projects" },
  { icon: "⚡", label: "Skills",       path: "/admin/skills" },
  { icon: "✍️", label: "Blog",         path: "/admin/blog" },
  { icon: "⭐", label: "Reviews",      path: "/admin/testimonials" },
  { icon: "✉️", label: "Messages",     path: "/admin/messages" },
  { icon: "👤", label: "Profile",      path: "/admin/profile" },
];

export default function Sidebar({ collapsed, setCollapsed, onLogout }) {
  const nav = useNavigate();
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [loc.pathname]);

  const isActive = (path) => path === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(path);

  if (isMobile) {
    return (
      <>
        {/* Mobile top bar */}
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 90, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "#030710", borderBottom: "1px solid rgba(0,212,170,0.08)" }}>
          <button onClick={() => setMobileOpen(true)}
            style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 8, color: "#00D4AA", width: 38, height: 38, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            {LINKS.find(l => isActive(l.path))?.label || "Dashboard"}
          </span>
          <div style={{ width: 38 }} />
        </div>
        <div style={{ height: 52, flexShrink: 0, width: 0 }} />

        {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 199 }} />}

        <aside style={{ position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 200, width: "min(78vw,280px)", background: "#030710", borderRight: "1px solid rgba(0,212,170,0.08)", transform: mobileOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease", display: "flex", flexDirection: "column", paddingTop: 16 }}>
          <div style={{ padding: "0.4rem 1.2rem 1.2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1.05rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite" }}>Tarek.dev</div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Admin Panel</div>
            </div>
            <button onClick={() => setMobileOpen(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
          </div>

          <nav style={{ flex: 1, padding: "1rem 0.8rem", overflowY: "auto" }}>
            {LINKS.map(ln => (
              <div key={ln.path} onClick={() => nav(ln.path)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 12, cursor: "pointer", marginBottom: 4, background: isActive(ln.path) ? "rgba(0,212,170,0.1)" : "transparent", borderLeft: isActive(ln.path) ? "3px solid #00D4AA" : "3px solid transparent", color: isActive(ln.path) ? "#00D4AA" : "rgba(255,255,255,0.5)", fontSize: "0.92rem", fontWeight: isActive(ln.path) ? 600 : 400, fontFamily: "var(--font-body)" }}>
                <span style={{ fontSize: "1.15rem" }}>{ln.icon}</span>
                <span style={{ flex: 1 }}>{ln.label}</span>
                {isActive(ln.path) && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
              </div>
            ))}
          </nav>

          <div style={{ padding: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div onClick={() => nav("/")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.85rem" }}>
              <span>🌐</span><span>View Site</span>
            </div>
            <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.85rem" }}>
              <span>🔒</span><span>Logout</span>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop
  return (
    <aside style={{ width: collapsed ? 64 : 230, minHeight: "calc(100vh - 68px)", background: "#030710", borderRight: "1px solid rgba(0,212,170,0.08)", display: "flex", flexDirection: "column", position: "sticky", top: 68, transition: "width 0.3s ease", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ padding: "1.2rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: collapsed ? "center" : "space-between", alignItems: "center" }}>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1rem", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 5s ease infinite", whiteSpace: "nowrap" }}>Tarek.dev</div>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Admin Panel</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 7, color: "#00D4AA", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0, transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,170,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,212,170,0.08)"}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav style={{ flex: 1, padding: "1rem 0.6rem", overflowY: "auto" }}>
        {LINKS.map(ln => (
          <div key={ln.path} onClick={() => nav(ln.path)}
            style={{ display: "flex", alignItems: "center", gap: 11, padding: collapsed ? "12px" : "12px 14px", borderRadius: 12, cursor: "pointer", marginBottom: 3, background: isActive(ln.path) ? "rgba(0,212,170,0.1)" : "transparent", borderLeft: isActive(ln.path) ? "3px solid #00D4AA" : "3px solid transparent", color: isActive(ln.path) ? "#00D4AA" : "rgba(255,255,255,0.38)", fontSize: "0.88rem", fontWeight: isActive(ln.path) ? 600 : 400, fontFamily: "var(--font-body)", whiteSpace: "nowrap", transition: "all 0.2s", justifyContent: collapsed ? "center" : "flex-start" }}
            onMouseEnter={e => { if (!isActive(ln.path)) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
            onMouseLeave={e => { if (!isActive(ln.path)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; } }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{ln.icon}</span>
            {!collapsed && <span style={{ flex: 1 }}>{ln.label}</span>}
            {!collapsed && isActive(ln.path) && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />}
          </div>
        ))}
      </nav>

      <div style={{ padding: "0.8rem 0.6rem 1.2rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 6 }}>
        <div onClick={() => nav("/")} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", color: "#38BDF8", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(56,189,248,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(56,189,248,0.06)"}>
          <span style={{ flexShrink: 0 }}>🌐</span>
          {!collapsed && <span>View Site</span>}
        </div>
        <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.84rem", whiteSpace: "nowrap", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}>
          <span style={{ flexShrink: 0 }}>🔒</span>
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}
`);

// ══════════════════════════════════════════
// 4. Update Admin.jsx — add blog & testimonials routes
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/Admin.jsx"), `
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminBlog from "./AdminBlog";
import AdminTestimonials from "./AdminTestimonials";
import AdminMessages from "./AdminMessages";
import AdminProfile from "./AdminProfile";

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [authed, setAuthed]       = useState(false);
  const [checked, setChecked]     = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "true");
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", paddingTop: 68, background: "var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onLogout={() => { sessionStorage.removeItem("admin_auth"); sessionStorage.removeItem("admin_token"); setAuthed(false); }} />
      <div style={{ flex: 1, padding: "clamp(14px,3vw,32px)", overflow: "auto", minWidth: 0, width: "100%" }} className="admin-content">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="projects"     element={<AdminProjects />} />
          <Route path="skills"       element={<AdminSkills />} />
          <Route path="blog"         element={<AdminBlog />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="messages"     element={<AdminMessages />} />
          <Route path="profile"      element={<AdminProfile />} />
        </Routes>
      </div>
      <style>{\`
        @media(max-width:768px){.admin-content{padding-top:calc(52px + 14px)!important}}
      \`}</style>
    </div>
  );
}
`);

// ══════════════════════════════════════════
// 5. Also update api.js to add getAllAdmin for blogs
// ══════════════════════════════════════════
write(path.join(src, "services/api.js"), `
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => sessionStorage.getItem("admin_token");

async function api(endpoint, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = \`Bearer \${token}\`;

  const res = await fetch(\`\${BASE_URL}\${endpoint}\`, { headers, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}

export const authAPI = {
  login:    (email, password) => api("/auth/login",    { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name, email, password) => api("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  me:       () => api("/auth/me"),
};

export const projectsAPI = {
  getAll:  ()          => api("/projects"),
  create:  (data)      => api("/projects",       { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data)  => api(\`/projects/\${id}\`,  { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)        => api(\`/projects/\${id}\`,  { method: "DELETE" }),
};

export const blogsAPI = {
  getAll:     ()         => api("/blogs"),
  getAllAdmin: ()         => api("/blogs/all"),
  create:     (data)     => api("/blogs",       { method: "POST",   body: JSON.stringify(data) }),
  update:     (id, data) => api(\`/blogs/\${id}\`,  { method: "PUT",    body: JSON.stringify(data) }),
  delete:     (id)       => api(\`/blogs/\${id}\`,  { method: "DELETE" }),
};

export const messagesAPI = {
  send:    (data) => api("/messages",           { method: "POST",   body: JSON.stringify(data) }),
  getAll:  ()     => api("/messages"),
  markRead:(id)   => api(\`/messages/\${id}/read\`,{ method: "PUT" }),
  delete:  (id)   => api(\`/messages/\${id}\`,     { method: "DELETE" }),
};

export const testimonialsAPI = {
  getAll:  ()          => api("/testimonials"),
  create:  (data)      => api("/testimonials",       { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data)  => api(\`/testimonials/\${id}\`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)        => api(\`/testimonials/\${id}\`, { method: "DELETE" }),
};

export const skillsAPI = {
  getAll:  ()          => api("/skills"),
  create:  (data)      => api("/skills",        { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data)  => api(\`/skills/\${id}\`,  { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)        => api(\`/skills/\${id}\`,  { method: "DELETE" }),
};

export const profileAPI = {
  get:    ()     => api("/profile"),
  update: (data) => api("/profile", { method: "PUT", body: JSON.stringify(data) }),
};

export const analyticsAPI = {
  getStats: () => api("/analytics"),
};

export default api;
`);

console.log(`
╔══════════════════════════════════════════════════════════╗
║     ✅ Blog ও Testimonials সম্পূর্ণ হয়েছে!             ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🚀 চালান: npm run dev                                  ║
║                                                          ║
║  ✅ Admin Panel এ নতুন যা যোগ হলো:                      ║
║                                                          ║
║  ✍️  Blog (/admin/blog):                                 ║
║     • New Post button                                    ║
║     • Emoji picker + Category selector                   ║
║     • Publish/Unpublish toggle                           ║
║     • Edit + Delete — MongoDB এ save                    ║
║     • Search posts                                       ║
║     • Stats bar (Total/Published/Draft)                  ║
║                                                          ║
║  ⭐ Client Reviews (/admin/testimonials):                ║
║     • Add Review button                                  ║
║     • Avatar picker + Star rating                        ║
║     • Show/Hide website থেকে toggle                     ║
║     • Edit + Delete — MongoDB এ save                    ║
║                                                          ║
║  Sidebar এ নতুন links:                                  ║
║     ✍️ Blog | ⭐ Reviews                                 ║
╚══════════════════════════════════════════════════════════╝
`);
