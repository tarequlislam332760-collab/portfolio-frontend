import React, { useState } from "react";

export default function AnalyticsCard({ title, value, change, icon, color }) {
  const [hovered, setHovered] = useState(false);
  const positive = change >= 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: hovered ? `1px solid ${color}33` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 18, padding: "clamp(14px,2.5vw,1.6rem)",
        position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s ease",
        cursor: "default", minWidth: 0,
        animation: "fadeUp 0.5s ease both",
      }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${color}18,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${color},transparent)`, opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "clamp(10px,2vw,16px)", flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontSize: "clamp(1.4rem,4vw,1.8rem)" }}>{icon}</div>
        <span style={{
          background: positive ? "rgba(0,212,170,0.12)" : "rgba(239,68,68,0.12)",
          color: positive ? "#00D4AA" : "#f87171",
          padding: "3px 9px", borderRadius: 99, fontSize: "clamp(0.65rem,1.5vw,0.75rem)", fontWeight: 700,
          fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 3,
          animation: "pulse 3s ease-in-out infinite", whiteSpace: "nowrap",
        }}>
          {positive ? "↑" : "↓"} {Math.abs(change)}%
        </span>
      </div>

      <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.4rem,4.5vw,2rem)", color: "#fff", marginBottom: 4, letterSpacing: "-0.5px", wordBreak: "break-word" }}>{value}</div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(0.74rem,1.8vw,0.85rem)", fontFamily: "var(--font-body)" }}>{title}</div>
    </div>
  );
}
