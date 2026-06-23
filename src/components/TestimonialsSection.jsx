import React, { useEffect, useState, useRef } from "react";
import { testimonialsAPI } from "../services/api";

const STATIC = [
  { _id:"1", name:"Ariful Islam",   role:"CEO, TechBD",        text:"Tarek delivered our platform on time with exceptional quality. Clean code, scalable, and the UI exceeded all expectations.", avatar:"🧑‍💼", rating:5 },
  { _id:"2", name:"Sarah Mitchell", role:"Founder, DesignHub",  text:"Working with Tarek on our marketing strategy was a game-changer. Our conversion rate increased 40% in just 3 months.", avatar:"👩‍💻", rating:5 },
  { _id:"3", name:"Karim Hossain",  role:"CTO, StartupDhaka",   text:"Outstanding full-stack skills. Built our entire Node.js backend — fast, secure, and well-documented.", avatar:"👨‍💼", rating:5 },
  { _id:"4", name:"Nadia Rahman",   role:"CEO, ShopBD",         text:"The e-commerce platform Tarek built exceeded our expectations. Clean, fast, and exactly what our customers needed.", avatar:"👩‍🎨", rating:5 },
  { _id:"5", name:"James Wilson",   role:"Director, PixelForce", text:"Tarek's SEO work helped us rank on page 1 for our main keywords within 60 days. Highly recommended!", avatar:"👨‍🔬", rating:5 },
];

function StarRating({ n }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= n ? "#f59e0b" : "rgba(255,255,255,0.15)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ navigate }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    testimonialsAPI.getAll()
      .then(res => setReviews(res.data?.length > 0 ? res.data : STATIC))
      .catch(() => setReviews(STATIC))
      .finally(() => setLoading(false));
  }, []);

  // Auto advance
  useEffect(() => {
    if (reviews.length === 0 || isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % reviews.length);
    }, 3800);
    return () => clearInterval(timerRef.current);
  }, [reviews.length, isPaused]);

  const displayReviews = reviews.length > 0 ? reviews : STATIC;

  return (
    <section style={{ padding: "clamp(60px,8vw,100px) 0", background: "#07101E", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(244,114,182,0.3),transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(244,114,182,0.05),transparent 65%)", pointerEvents: "none" }} />

      {/* Section title */}
      <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)", padding: "0 clamp(20px,5vw,80px)" }}>
        <div style={{ display: "inline-block", background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.22)", borderRadius: 99, padding: "5px 16px", fontSize: "0.72rem", color: "#f472b6", marginBottom: "1rem", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Testimonials
        </div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", letterSpacing: "-0.5px" }}>
          Client <span style={{ background: "linear-gradient(135deg,#f472b6,#818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reviews</span>
        </h2>
        <div style={{ width: 56, height: 4, background: "linear-gradient(90deg,#f472b6,#818CF8)", borderRadius: 2, margin: "1rem auto 0" }} />
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(244,114,182,0.1)", borderTop: "3px solid #f472b6", animation: "spin 1s linear infinite" }} />
        </div>
      ) : (
        <>
          {/* ── FEATURED REVIEW (large) ── */}
          <div style={{ maxWidth: 800, margin: "0 auto clamp(2rem,4vw,3rem)", padding: "0 clamp(20px,5vw,80px)" }}>
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 28, padding: "clamp(24px,4vw,44px)", position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", transition: "border-color 0.3s" }}>
              {/* Decoration */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#f472b6,#818CF8,#38BDF8)" }} />
              <div style={{ position: "absolute", top: 20, left: 24, fontSize: "5rem", color: "rgba(244,114,182,0.07)", fontFamily: "Georgia", lineHeight: 1, pointerEvents: "none" }}>"</div>
              <div style={{ position: "absolute", bottom: 16, right: 24, fontSize: "3.5rem", color: "rgba(129,140,248,0.06)", fontFamily: "Georgia", lineHeight: 1, pointerEvents: "none", transform: "rotate(180deg)" }}>"</div>

              {/* Stars */}
              <div style={{ marginBottom: 20, display: "flex", gap: 3 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.5))" }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem,2.2vw,1.2rem)", lineHeight: 1.85, fontStyle: "italic", marginBottom: 28, fontFamily: "var(--font-body)", position: "relative", zIndex: 1 }}>
                "{displayReviews[activeIdx]?.text}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,rgba(244,114,182,0.2),rgba(129,140,248,0.2))", border: "2px solid rgba(244,114,182,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, boxShadow: "0 0 20px rgba(244,114,182,0.2)" }}>
                  {displayReviews[activeIdx]?.avatar}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "var(--font-head)" }}>{displayReviews[activeIdx]?.name}</div>
                  <div style={{ color: "#f472b6", fontSize: "0.82rem", fontFamily: "var(--font-body)", marginTop: 2 }}>{displayReviews[activeIdx]?.role}</div>
                </div>
                <div style={{ marginLeft: "auto", background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                  <div style={{ color: "#f472b6", fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-head)" }}>{displayReviews[activeIdx]?.rating || 5}.0</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontFamily: "var(--font-body)" }}>Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── THUMBNAIL CARDS (smaller, horizontal scroll) ── */}
          <div style={{ padding: "0 clamp(20px,5vw,80px)", overflowX: "auto", scrollbarWidth: "none" }}>
            <div ref={trackRef} style={{ display: "flex", gap: "clamp(10px,2vw,16px)", width: "max-content", margin: "0 auto", paddingBottom: 4 }}>
              {displayReviews.map((r, i) => (
                <div key={r._id || i}
                  onClick={() => { setActiveIdx(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                  style={{
                    width: "clamp(200px,22vw,260px)", flexShrink: 0,
                    background: i === activeIdx ? "rgba(244,114,182,0.08)" : "rgba(255,255,255,0.02)",
                    border: i === activeIdx ? "1px solid rgba(244,114,182,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: "clamp(14px,2vw,18px)", cursor: "pointer",
                    transition: "all 0.35s ease",
                    transform: i === activeIdx ? "scale(1.02)" : "scale(1)",
                    boxShadow: i === activeIdx ? "0 8px 24px rgba(244,114,182,0.15)" : "none",
                  }}>
                  <p style={{ color: i === activeIdx ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)", fontSize: "0.8rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: 12, fontFamily: "var(--font-body)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    "{r.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: i === activeIdx ? "rgba(244,114,182,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${i === activeIdx ? "rgba(244,114,182,0.3)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{r.avatar}</div>
                    <div>
                      <div style={{ color: i === activeIdx ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.78rem", fontFamily: "var(--font-head)" }}>{r.name}</div>
                      <div style={{ color: i === activeIdx ? "#f472b6" : "rgba(255,255,255,0.25)", fontSize: "0.7rem", fontFamily: "var(--font-body)", marginTop: 1 }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Progress dots ── */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: "clamp(1.5rem,3vw,2rem)" }}>
            {displayReviews.map((_, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                style={{ width: i === activeIdx ? 32 : 8, height: 8, borderRadius: 99, background: i === activeIdx ? "linear-gradient(90deg,#f472b6,#818CF8)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s ease", boxShadow: i === activeIdx ? "0 0 8px rgba(244,114,182,0.5)" : "none" }} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
