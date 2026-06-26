import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileAPI } from "../services/api";

const NAV_LINKS = ["Home","About","Skills","Projects","Services","Blog","Contact"];
const SERVICES  = ["MERN Development","React Frontend","Node.js Backend","REST API","Digital Marketing","SEO"];

const SOCIAL_CFG = [
  { key:"facebook",  label:"Facebook",  color:"#1877F2", bg:"rgba(24,119,242,0.15)",  icon:<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854V15.54H7.078v-3.467h3.047V9.41c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.49 0-1.955.925-1.955 1.874v2.252h3.328l-.532 3.467h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { key:"instagram", label:"Instagram", color:"#E1306C", bg:"rgba(225,48,108,0.15)",  icon:<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#E1306C"/><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="#fff"/></svg> },
  { key:"linkedin",  label:"LinkedIn",  color:"#0A66C2", bg:"rgba(10,102,194,0.15)",  icon:<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7.115 9h2.77v9.5h-2.77V9zM8.5 7.7c-.9 0-1.5-.6-1.5-1.35S7.6 5 8.5 5s1.5.6 1.5 1.35-.6 1.35-1.5 1.35zM11.5 9h2.65v1.3h.04c.37-.7 1.27-1.45 2.62-1.45 2.8 0 3.32 1.84 3.32 4.24V18.5h-2.77v-4.86c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57V18.5H11.5V9z"/></svg> },
  { key:"github",    label:"GitHub",    color:"#fff",    bg:"rgba(255,255,255,0.12)", icon:<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.07 0 0 .98-.31 3.2 1.19a11 11 0 015.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.77.11 3.07.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg> },
  { key:"whatsapp",  label:"WhatsApp", color:"#25D366", bg:"rgba(37,211,102,0.15)",  icon:<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
];

function FooterSocialIcons({ profile }) {
  const active = SOCIAL_CFG.filter(s => profile[s.key]);
  if (!active.length) return null;
  return (
    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
      {active.map(s => {
        const [hov, setHov] = React.useState(false);
        return (
          <a key={s.key} href={profile[s.key]} target="_blank" rel="noopener noreferrer"
            onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
            style={{ width:40, height:40, borderRadius:10, display:"inline-flex", alignItems:"center", justifyContent:"center", textDecoration:"none", background:hov?s.bg:"rgba(255,255,255,0.06)", border:`1px solid ${hov?s.color:"rgba(255,255,255,0.1)"}`, transform:hov?"translateY(-3px)":"none", transition:"all 0.25s", flexShrink:0 }}>
            {s.icon}
          </a>
        );
      })}
    </div>
  );
}

export default function Footer() {
  const nav = useNavigate();
  const [profile, setProfile] = useState({
    email:"tareq.islam.dev@gmail.com", phone:"+880 1732-483149", location:"Sylhet, Bangladesh",
    facebook:"https://www.facebook.com/profile.php?id=61585040426028",
    instagram:"https://www.instagram.com/tareq23337/",
    linkedin:"https://www.linkedin.com/in/tareq-islam3149/",
    github:"https://github.com/tarequlislam332760-collab",
    whatsapp:"",
  });

  useEffect(() => {
    profileAPI.get().then(res => {
      const d = res.data?.data || res.data;
      if (d) setProfile(prev => ({ ...prev, ...d }));
    }).catch(() => {});
  }, []);

  return (
    <footer style={{ background:"#03070F", borderTop:"1px solid rgba(0,212,170,0.08)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"min(800px,90vw)", height:2, background:"linear-gradient(90deg,transparent,rgba(0,212,170,0.4),rgba(56,189,248,0.35),transparent)" }} />
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"clamp(48px,6vw,72px) clamp(20px,5vw,80px) 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"clamp(24px,4vw,52px)", paddingBottom:"clamp(36px,4vw,52px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div onClick={() => nav("/")} style={{ cursor:"pointer", display:"inline-flex", alignItems:"center", gap:12, marginBottom:20, transition:"transform 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradient(135deg,#00D4AA,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:"#050A14", fontFamily:"monospace", boxShadow:"0 0 24px rgba(0,212,170,0.3)", flexShrink:0 }}>T</div>
              <span style={{ fontSize:"1.2rem", fontWeight:900, background:"linear-gradient(90deg,#00D4AA,#38BDF8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontFamily:"var(--font-head)" }}>Tarek.dev</span>
            </div>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.86rem", lineHeight:1.88, maxWidth:270, marginBottom:22, fontFamily:"var(--font-body)" }}>
              MERN Full Stack Developer & Digital Marketing Specialist. Building modern web apps deployed on Vercel.
            </p>

            {/* DB থেকে Social Icons */}
            <FooterSocialIcons profile={profile} />

            <div style={{ marginTop:18, display:"flex", flexDirection:"column", gap:7 }}>
              <a href={`mailto:${profile.email}`} style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.8rem", fontFamily:"var(--font-body)", textDecoration:"none", display:"flex", alignItems:"center", gap:7, transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#00D4AA"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>
                <span>📧</span> {profile.email}
              </a>
              <a href={`tel:${profile.phone?.replace(/[^+\d]/g,"")}`} style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.8rem", fontFamily:"var(--font-body)", textDecoration:"none", display:"flex", alignItems:"center", gap:7, transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#00D4AA"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>
                <span>📱</span> {profile.phone}
              </a>
              <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.8rem", fontFamily:"var(--font-body)", display:"flex", alignItems:"center", gap:7 }}>
                <span>📍</span> {profile.location}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:20, fontFamily:"var(--font-body)" }}>Pages</h4>
            {NAV_LINKS.map((l,i) => (
              <div key={i} onClick={() => nav(l==="Home"?"/":"/"+l.toLowerCase())}
                style={{ color:"rgba(255,255,255,0.33)", fontSize:"0.87rem", marginBottom:10, cursor:"pointer", fontFamily:"var(--font-body)", transition:"color 0.2s,transform 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.color="#00D4AA"; e.currentTarget.style.transform="translateX(5px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.color="rgba(255,255,255,0.33)"; e.currentTarget.style.transform="none"; }}>
                {l}
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:20, fontFamily:"var(--font-body)" }}>Services</h4>
            {SERVICES.map((s,i) => <div key={i} style={{ color:"rgba(255,255,255,0.33)", fontSize:"0.87rem", marginBottom:10, fontFamily:"var(--font-body)" }}>{s}</div>)}
          </div>

          {/* Hire Me */}
          <div>
            <h4 style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:20, fontFamily:"var(--font-body)" }}>Hire Me</h4>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.84rem", lineHeight:1.85, marginBottom:18, fontFamily:"var(--font-body)" }}>Available for freelance & full-time opportunities.</p>
            <div onClick={() => nav("/contact")}
              style={{ display:"inline-block", background:"linear-gradient(135deg,#00D4AA,#38BDF8)", color:"#050A14", borderRadius:10, padding:"11px 22px", fontSize:"0.82rem", fontWeight:700, cursor:"pointer", fontFamily:"var(--font-body)", transition:"transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 18px rgba(0,212,170,0.4)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
              Get In Touch 🚀
            </div>
            <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:8 }}>
              {[["🦷","ST Dental","https://st-dental-frontend.vercel.app/"],["📈","Vinance","https://vinance-frontend-vjqa.vercel.app/"]].map(([e,t,u]) => (
                <a key={t} href={u} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:8, color:"rgba(255,255,255,0.3)", fontSize:"0.78rem", fontFamily:"var(--font-body)", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#00D4AA"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>
                  <span>{e}</span> {t} <span style={{ color:"rgba(0,212,170,0.5)", fontSize:"0.65rem" }}>▲ vercel</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding:"clamp(16px,2.5vw,24px) 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <span style={{ color:"rgba(255,255,255,0.18)", fontSize:"0.8rem", fontFamily:"var(--font-body)" }}>
            © {new Date().getFullYear()} Tarikul Islam Tarek. All rights reserved.
          </span>
          <div style={{ display:"flex", gap:14 }}>
            {["⚛️ React","🍃 MongoDB","⚡ Vite","▲ Vercel"].map((t,i) => (
              <span key={i} style={{ color:"rgba(255,255,255,0.18)", fontSize:"0.75rem", fontFamily:"var(--font-body)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:580px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
