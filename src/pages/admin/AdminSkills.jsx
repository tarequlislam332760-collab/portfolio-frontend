import React, { useEffect, useState } from "react";
import { skillsAPI } from "../../services/api";

const CATS = ["Frontend","Backend","Database","Marketing","Other"];
const CAT_COLORS = { Frontend:"#00D4AA", Backend:"#38BDF8", Database:"#818CF8", Marketing:"#f472b6", Other:"#f59e0b" };
const DEF  = { name: "", level: 80, category: "Frontend" };

export default function AdminSkills() {
  const [skills, setSkills] = useState([]); // raw category documents from backend
  const [form, setForm]     = useState(DEF);
  const [saving, setSaving] = useState(false);

  const load = () => skillsAPI.getAll().then(res => setSkills(res.data || [])).catch(console.error);

  useEffect(() => { load(); }, []);

  const inp = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ সঠিক structure: প্রতিটা category document-এর items[] এর ভেতরে {name, percent} push করতে হবে
  const add = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const existing = skills.find(s => s.category === form.category);
      const newItem = { name: form.name.trim(), percent: Number(form.level) };

      if (existing) {
        // ওই category আগে থেকেই আছে — তার items array এ নতুন item যোগ করে update করি
        const updatedItems = [...(existing.items || []), newItem];
        await skillsAPI.update(existing._id, { items: updatedItems });
      } else {
        // নতুন category তৈরি — সঠিক shape সহ
        await skillsAPI.create({
          category: form.category,
          icon: "⚡",
          color: CAT_COLORS[form.category] || "#00D4AA",
          items: [newItem],
        });
      }

      setForm(DEF);
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // একটা category document এর ভেতর থেকে নির্দিষ্ট একটা item মুছে ফেলা
  const delItem = async (categoryDoc, itemIndex) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const updatedItems = categoryDoc.items.filter((_, i) => i !== itemIndex);
      if (updatedItems.length === 0) {
        // আর কোনো item না থাকলে পুরো category document-ই মুছে ফেলা যায়
        await skillsAPI.delete(categoryDoc._id);
      } else {
        await skillsAPI.update(categoryDoc._id, { items: updatedItems });
      }
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  // পুরো category document মুছে ফেলা (সব item সহ)
  const delCategory = async (id) => {
    if (!confirm("Delete entire category and all its skills?")) return;
    try { await skillsAPI.delete(id); load(); }
    catch (err) { alert(err.message); }
  };

  const inputSt = { background: "var(--surface)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: "0.87rem", fontFamily: "var(--font-body)", outline: "none" };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.5rem)", marginBottom: "0.3rem", color: "#fff" }}>Skills</h2>
      <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Skill add করুন — MongoDB তে save হবে</p>

      <div style={{ background: "var(--card)", borderRadius: 14, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.2rem", color: "#00D4AA" }}>Add Skill</h3>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <input name="name"     placeholder="Skill name *" value={form.name} onChange={inp} style={{ ...inputSt, flex: "1 1 140px" }} />
          <select name="category" value={form.category} onChange={inp} style={{ ...inputSt, flex: "1 1 120px" }}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 130px" }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.76rem" }}>Level: {form.level}%</label>
            <input type="range" name="level" min={10} max={100} value={form.level} onChange={inp} style={{ accentColor: "#00D4AA", width: "100%" }} />
          </div>
          <button onClick={add} disabled={saving || !form.name}
            style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", color: "#050A14", border: "none", borderRadius: 8, padding: "11px 22px", fontWeight: 700, cursor: saving || !form.name ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", flexShrink: 0, opacity: saving || !form.name ? 0.7 : 1 }}>
            {saving ? "..." : "Add"}
          </button>
        </div>
      </div>

      {skills.length === 0 && (
        <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", textAlign: "center", padding: "2rem 0" }}>
          কোনো skill এখনো যোগ করা হয়নি। উপরের form দিয়ে প্রথমটা যোগ করুন।
        </p>
      )}

      {skills.map(catDoc => (
        <div key={catDoc._id} style={{ marginBottom: "1.8rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", color: catDoc.color || "#00D4AA", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{catDoc.icon || "⚡"}</span> {catDoc.category}
            </h3>
            <button onClick={() => delCategory(catDoc._id)}
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, padding: "4px 10px", color: "#f87171", cursor: "pointer", fontSize: "0.72rem", fontFamily: "var(--font-body)" }}>
              Delete category
            </button>
          </div>

          {(!catDoc.items || catDoc.items.length === 0) ? (
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.82rem", fontFamily: "var(--font-body)" }}>এই category তে এখনো কোনো skill নেই।</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "1rem" }}>
              {catDoc.items.map((item, idx) => (
                <div key={idx} style={{ background: "var(--card)", borderRadius: 12, padding: "1.2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{item.name}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ color: catDoc.color || "#00D4AA", fontWeight: 700, fontSize: "0.87rem" }}>{item.percent}%</span>
                      <button onClick={() => delItem(catDoc, idx)} style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 5, padding: "4px 8px", color: "#f87171", cursor: "pointer", fontSize: "0.74rem" }}>✕</button>
                    </div>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: item.percent + "%", background: catDoc.color || "#00D4AA", borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
