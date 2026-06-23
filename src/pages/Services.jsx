import React from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";

const SVC=[
  {icon:"🌐",title:"MERN Full Stack",desc:"Complete web apps from DB to UI. MongoDB, Express, React, Node.js.",c:"var(--teal)"},
  {icon:"⚛️",title:"React Frontend",desc:"Fast, modern, responsive React apps with great UX and animations.",c:"var(--sky)"},
  {icon:"🔧",title:"REST API",desc:"Scalable, secure Node.js + Express REST APIs with JWT auth.",c:"var(--indigo)"},
  {icon:"🗄️",title:"MongoDB",desc:"Database design, optimization, and Mongoose ODM integration.",c:"var(--teal)"},
  {icon:"📈",title:"Digital Marketing",desc:"Social media, content strategy, and paid advertising campaigns.",c:"var(--sky)"},
  {icon:"🔍",title:"SEO Optimization",desc:"Technical SEO and keyword strategy to rank higher on Google.",c:"var(--indigo)"},
];

export default function Services() {
  const nav = useNavigate();
  return (
    <main style={{minHeight:"100vh",paddingTop:68,padding:"100px 5% 60px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SectionTitle pre="What I Offer" title="My" highlight="Services"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.8rem"}}>
          {SVC.map(s=>(
            <div key={s.title} style={{background:"var(--card)",borderRadius:18,padding:"2rem",border:"1px solid var(--border)",transition:"transform .3s,border-color .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor=s.c}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="var(--border)"}}>
              <div style={{fontSize:"2.4rem",marginBottom:"1rem"}}>{s.icon}</div>
              <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1.1rem",marginBottom:"0.7rem"}}>{s.title}</h3>
              <p style={{color:"var(--muted)",fontSize:"0.87rem",lineHeight:1.8}}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"3rem"}}>
          <button onClick={()=>nav("/contact")} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:12,padding:"16px 40px",fontWeight:700,fontSize:"1rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>Discuss Your Project 🚀</button>
        </div>
      </div>
    </main>
  );
}
