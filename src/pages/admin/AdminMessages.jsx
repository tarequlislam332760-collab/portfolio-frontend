import React, { useEffect, useState } from "react";
import { messagesAPI } from "../../services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [unread, setUnread]     = useState(0);

  const load = async () => {
    try {
      const res = await messagesAPI.getAll();
      setMessages(res.data || []);
      setUnread(res.unreadCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRead = async (id) => {
    try {
      await messagesAPI.markRead(id);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
      setUnread(prev => Math.max(0, prev - 1));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই message delete করবেন?")) return;
    try {
      await messagesAPI.delete(id);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1.2rem,3vw,2rem)", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.6rem)", color: "#fff", marginBottom: "0.3rem" }}>Messages</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", fontFamily: "var(--font-body)" }}>Contact form থেকে আসা messages</p>
        </div>
        {unread > 0 && (
          <div style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 99, padding: "6px 16px", color: "#00D4AA", fontSize: "0.82rem", fontWeight: 700, animation: "pulse 2s infinite" }}>
            {unread} unread
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.5rem" }}>No messages yet</h3>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>Contact form এ কেউ message পাঠালে এখানে দেখাবে।</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {messages.map(m => (
            <div key={m._id} style={{ background: m.read ? "rgba(255,255,255,0.02)" : "rgba(0,212,170,0.05)", border: m.read ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,212,170,0.2)", borderRadius: 14, padding: "clamp(14px,2.5vw,20px)", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  {!m.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite", flexShrink: 0 }} />}
                  <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{m.name}</span>
                  <a href={`mailto:${m.email}`} style={{ color: "#38BDF8", fontSize: "0.82rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>{m.email}</a>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {!m.read && (
                    <button onClick={() => handleRead(m._id)} style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 7, padding: "5px 12px", color: "#00D4AA", cursor: "pointer", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                      Mark Read ✓
                    </button>
                  )}
                  <button onClick={() => handleDelete(m._id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 7, padding: "5px 12px", color: "#f87171", cursor: "pointer", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                    Delete
                  </button>
                </div>
              </div>
              {m.subject && <div style={{ color: "#818CF8", fontSize: "0.82rem", fontFamily: "var(--font-body)", marginBottom: 8, fontWeight: 600 }}>Subject: {m.subject}</div>}
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "var(--font-body)", margin: 0 }}>{m.message}</p>
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.74rem", fontFamily: "var(--font-body)", marginTop: 10 }}>
                {new Date(m.createdAt).toLocaleString("en-BD")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
