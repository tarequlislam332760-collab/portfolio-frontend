import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer:coarse)").matches);
    let ringX = -100, ringY = -100;
    let raf;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onOver = (e) => {
      if (e.target.closest("button,a,[role=button],input,textarea,select")) setHovered(true);
    };
    const onOut = () => setHovered(false);

    const animateRing = () => {
      setRing(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 99999,
        width: hovered ? 12 : 8, height: hovered ? 12 : 8,
        borderRadius: "50%", background: "#00D4AA",
        left: pos.x - (hovered ? 6 : 4), top: pos.y - (hovered ? 6 : 4),
        transform: hovered ? "scale(1.5)" : "scale(1)",
        transition: "width 0.2s,height 0.2s,transform 0.2s",
        boxShadow: "0 0 8px #00D4AA",
        mixBlendMode: "difference",
      }} />
      {/* Ring */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 99998,
        width: hovered ? 48 : 32, height: hovered ? 48 : 32,
        borderRadius: "50%",
        border: hovered ? "2px solid rgba(56,189,248,0.7)" : "1.5px solid rgba(0,212,170,0.4)",
        left: ring.x - (hovered ? 24 : 16), top: ring.y - (hovered ? 24 : 16),
        transition: "width 0.25s,height 0.25s,border 0.25s",
      }} />
    </>
  );
}
