import React, { useState } from "react";
import { authAPI } from "../../services/api";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [password, setPwd]    = useState("");
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake]     = useState(false);
  const [show, setShow]       = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await authAPI.login(email, password);
      sessionStorage.setItem("admin_token", res.token);
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } catch (err) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050A14", padding: "20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "clamp(280px,50vw,500px)", height: "clamp(280px,50vw,500px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,0.12),transparent 70%)", filter: "blur(60px)", animation: "blobPulse 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: "clamp(280px,55vw,550px)", height: "clamp(280px,55vw,550px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.1),transparent 70%)", filter: "blur(70px)", animation: "blobPulse2 10s ease-in-out infinite 2s", pointerEvents: "none" }} />

      <form onSubmit={submit} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(28px,5vw,44px)", backdropFilter: "blur(20px)", animation: shake ? "shakeX 0.5s ease" : "fadeUp 0.6s ease both", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#050A14", boxShadow: "0 0 30px rgba(0,212,170,0.4)", animation: "floatY 4s ease-in-out infinite" }}>🔒</div>
          <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.4rem,4vw,1.8rem)", color: "#fff", marginBottom: 6, letterSpacing: "-0.5px" }}>
            Admin <span style={{ background: "linear-gradient(135deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Login</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>Enter your credentials to access dashboard</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(false); }} placeholder="admin@email.com" required
            style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#fff", fontSize: "0.95rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
            onFocus={e => { if (!error) e.target.style.borderColor = "#00D4AA"; }}
            onBlur={e => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
          />
        </div>

        <div style={{ position: "relative", marginBottom: error ? 8 : 24 }}>
          <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>Password</label>
          <input type={show ? "text" : "password"} value={password} onChange={e => { setPwd(e.target.value); setError(false); }} placeholder="Your password" required
            style={{ width: "100%", padding: "14px 50px 14px 18px", background: "rgba(255,255,255,0.04)", border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#fff", fontSize: "0.95rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
            onFocus={e => { if (!error) e.target.style.borderColor = "#00D4AA"; }}
            onBlur={e => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
          />
          <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, bottom: 14, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", padding: 0 }}>
            {show ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p style={{ color: "#f87171", fontSize: "0.82rem", marginBottom: 18, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6 }}>⚠️ Invalid email or password</p>}

        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: 15, background: loading ? "rgba(0,212,170,0.5)" : "linear-gradient(135deg,#00D4AA,#38BDF8)", border: "none", borderRadius: 12, color: "#050A14", fontWeight: 800, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-body)" }}>
          {loading ? "Logging in..." : "Unlock Dashboard 🚀"}
        </button>

        <div style={{ textAlign: "center", marginTop: 22 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Back to Website</a>
        </div>
      </form>

      <style>{`@keyframes shakeX{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-10px)}40%,80%{transform:translateX(10px)}}`}</style>
    </main>
  );
}
