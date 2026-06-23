import React, { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = [20, 45, 70, 88, 100];
    let i = 0;
    const tick = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(tick);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    }, 280);
    return () => clearInterval(tick);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#050A14", zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1, transition: "opacity 0.5s ease",
    }}>
      {/* Background blobs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,0.08),transparent 70%)", filter: "blur(60px)", animation: "blobPulse 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.07),transparent 70%)", filter: "blur(60px)", animation: "blobPulse2 7s ease-in-out infinite", pointerEvents: "none" }} />

      {/* Spinner rings */}
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: 32 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid rgba(0,212,170,0.1)", borderTop: "3px solid #00D4AA", animation: "spin 1s linear infinite" }} />
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "2px solid rgba(56,189,248,0.1)", borderBottom: "2px solid #38BDF8", animation: "spinR 1.5s linear infinite" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "1.1rem", background: "linear-gradient(135deg,#00D4AA,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>T</div>
      </div>

      {/* Logo text */}
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.2rem)", background: "linear-gradient(90deg,#00D4AA,#38BDF8,#818CF8,#00D4AA)", backgroundSize: "300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 3s ease infinite", marginBottom: 8 }}>
        Tarek.dev
      </div>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 36 }}>
        Loading Portfolio...
      </div>

      {/* Progress bar */}
      <div style={{ width: "min(260px,70vw)", height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg,#00D4AA,#38BDF8)", borderRadius: 99, transition: "width 0.4s ease", boxShadow: "0 0 10px rgba(0,212,170,0.5)" }} />
      </div>
      <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", marginTop: 10, fontFamily: "var(--font-body)" }}>{progress}%</div>
    </div>
  );
}
