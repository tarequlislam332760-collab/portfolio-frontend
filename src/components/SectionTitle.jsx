import React from "react";
export default function SectionTitle({ pre, title, highlight, sub }) {
  return (
    <div style={{marginBottom:"3rem",textAlign:"center"}}>
      {pre && (
        <div style={{display:"inline-block",background:"rgba(0,212,170,0.08)",border:"1px solid rgba(0,212,170,0.22)",borderRadius:20,padding:"5px 16px",fontSize:"0.76rem",color:"var(--teal)",marginBottom:"1rem",fontFamily:"var(--font-body)",letterSpacing:"0.05em",textTransform:"uppercase"}}>
          {pre}
        </div>
      )}
      <h2 style={{fontFamily:"var(--font-head)",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:800,lineHeight:1.1}}>
        {title}{" "}
        {highlight && (
          <span style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{highlight}</span>
        )}
      </h2>
      <div style={{width:56,height:4,background:"linear-gradient(90deg,var(--teal),var(--sky))",borderRadius:2,margin:"1rem auto 0"}}/>
      {sub && <p style={{color:"var(--muted)",marginTop:"1.2rem",fontSize:"0.93rem",maxWidth:480,margin:"1.2rem auto 0",lineHeight:1.8}}>{sub}</p>}
    </div>
  );
}
