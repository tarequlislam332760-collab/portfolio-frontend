import React, { useState } from "react";

const EMOJIS = ["🚀","📈","🛍️","📊","✍️","🎯","📚","🌐","⚙️","🎨","💡","🔥","⚛️","🍃","🛒","📱"];
const S = {
  width: "100%", padding: "13px 16px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#fff", fontSize: "0.9rem", outline: "none",
  marginBottom: 12, boxSizing: "border-box", fontFamily: "var(--font-body)",
  transition: "border-color 0.2s",
};

export default function ProjectForm({ onClose, onSave }) {
  const [f, setF] = useState({ title: "", desc: "", tech: "", live: "", github: "", emoji: "🚀" });
  const inp = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "clamp(10px,3vw,20px)", backdropFilter: "blur(12px)" }}>
      <div style={{
        background: "linear-gradient(135deg,#0d1629,#080f1c)",
        border: "1px solid rgba(0,212,170,0.14)", borderRadius: "clamp(16px,3vw,24px)",
        padding: "clamp(18px,4vw,40px)", width: "100%", maxWidth: 540,
        maxHeight: "92vh", overflowY: "auto",
        animation: "scaleIn 0.3s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(16px,3vw,26px)" }}>
          <h3 style={{ color: "#fff", fontSize: "clamp(1.05rem,3vw,1.25rem)", fontWeight: 800, margin: 0, fontFamily: "var(--font-head)" }}>Add New Project</h3>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, transition: "all 0.2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>Choose Icon</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setF(v => ({ ...v, emoji: e }))}
                style={{ fontSize: "1.25rem", padding: "7px", borderRadius: 10, border: f.emoji === e ? "2px solid #00D4AA" : "2px solid transparent", background: f.emoji === e ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {[["title","Project Title *"],["desc","Description *"],["tech","Technologies (comma separated)"],["live","Live Demo URL"],["github","GitHub URL"]].map(([k, p]) => (
          <input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={S}
            onFocus={e => e.target.style.borderColor = "#00D4AA"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
          <button onClick={onClose}
            style={{ flex: "1 1 100px", padding: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
            Cancel
          </button>
          <button onClick={() => onSave && onSave(f)}
            style={{ flex: "2 1 180px", padding: 13, background: "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 10, color: "#050A14", cursor: "pointer", fontWeight: 800, fontSize: "0.92rem", fontFamily: "var(--font-body)", transition: "transform 0.2s,box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Save Project ✓
          </button>
        </div>
      </div>
    </div>
  );
}
