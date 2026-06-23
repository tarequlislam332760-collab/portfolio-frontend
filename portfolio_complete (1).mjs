import fs from "fs";
import path from "path";

const base = process.cwd();
const src = path.join(base, "src");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("✅", filePath.replace(base + "/", ""));
}

// ══════════════════════════════════════════
// main.jsx
// ══════════════════════════════════════════
write(path.join(src, "main.jsx"), `
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter><App /></BrowserRouter>
);
`);

// ══════════════════════════════════════════
// index.css
// ══════════════════════════════════════════
write(path.join(src, "index.css"), `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#050A14;--surface:#0D1525;--card:#111827;
  --border:rgba(0,212,170,0.15);--teal:#00D4AA;--sky:#38BDF8;--indigo:#818CF8;
  --text:#E2E8F0;--muted:#64748B;
  --font-head:'Syne',sans-serif;--font-body:'DM Sans',sans-serif;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--teal);border-radius:3px}
a{text-decoration:none;color:inherit}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
`);

// ══════════════════════════════════════════
// App.jsx
// ══════════════════════════════════════════
write(path.join(src, "App.jsx"), `
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}
`);

// ══════════════════════════════════════════
// Navbar.jsx
// ══════════════════════════════════════════
write(path.join(src, "components/Navbar.jsx"), `
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Skills",   to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Blog",     to: "/blog" },
  { label: "Contact",  to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const lk = (active) => ({
    fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.87rem",
    color: active ? "var(--teal)" : "var(--muted)",
    borderBottom: active ? "2px solid var(--teal)" : "2px solid transparent",
    paddingBottom: "2px", transition: "all .25s",
  });

  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:999,height:68,
        padding:"0 5%",display:"flex",alignItems:"center",justifyContent:"space-between",
        background: scrolled ? "rgba(5,10,20,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,170,0.1)" : "none",
        transition:"all .4s ease",
      }}>
        <div onClick={() => nav("/")} style={{cursor:"pointer",fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.25rem",display:"flex",alignItems:"center",gap:7}}>
          <span style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Tarek</span>
          <span style={{width:7,height:7,borderRadius:"50%",background:"var(--teal)",display:"inline-block",animation:"pulse 2s infinite"}}/>
        </div>

        {/* Desktop */}
        <div style={{display:"flex",alignItems:"center",gap:"1.5rem"}} className="desk-nav">
          {NAV.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==="/"} style={({isActive})=>lk(isActive)}>{l.label}</NavLink>
          ))}
          <button onClick={()=>nav("/contact")} style={{
            background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",
            border:"none",borderRadius:8,padding:"9px 20px",fontWeight:700,
            fontSize:"0.83rem",cursor:"pointer",fontFamily:"var(--font-body)",
          }}>Hire Me</button>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(!open)} className="burger" style={{
          display:"none",background:"rgba(0,212,170,0.08)",border:"1px solid var(--border)",
          borderRadius:8,color:"var(--teal)",width:40,height:40,
          cursor:"pointer",fontSize:"1.2rem",
        }}>{open ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position:"fixed",top:68,left:0,right:0,zIndex:998,
        background:"rgba(5,10,20,0.97)",backdropFilter:"blur(24px)",
        padding: open ? "1.5rem 5% 2rem" : "0 5%",
        maxHeight: open ? "520px" : "0",
        overflow:"hidden",
        transition:"all .35s ease",
        borderBottom: open ? "1px solid var(--border)" : "none",
      }}>
        {NAV.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to==="/"} onClick={()=>setOpen(false)}
            style={({isActive})=>({
              display:"block",padding:"13px 14px",marginBottom:4,borderRadius:8,
              fontFamily:"var(--font-body)",fontWeight:500,fontSize:"0.95rem",
              background: isActive ? "rgba(0,212,170,0.1)" : "transparent",
              color: isActive ? "var(--teal)" : "var(--text)",
              borderLeft: isActive ? "3px solid var(--teal)" : "3px solid transparent",
            })}>{l.label}</NavLink>
        ))}
        <button onClick={()=>{nav("/contact");setOpen(false);}} style={{
          width:"100%",marginTop:"0.8rem",
          background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",
          border:"none",borderRadius:10,padding:"13px",fontWeight:700,
          fontSize:"0.95rem",cursor:"pointer",fontFamily:"var(--font-body)",
        }}>Hire Me 🚀</button>
      </div>

      <style>{\`
        @media(max-width:900px){.desk-nav{display:none!important}.burger{display:flex!important;align-items:center;justify-content:center}}
      \`}</style>
    </>
  );
}
`);

// ══════════════════════════════════════════
// SectionTitle component
// ══════════════════════════════════════════
write(path.join(src, "components/SectionTitle.jsx"), `
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
`);

// ══════════════════════════════════════════
// Footer.jsx
// ══════════════════════════════════════════
write(path.join(src, "components/Footer.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const nav = useNavigate();
  return (
    <footer style={{background:"var(--surface)",borderTop:"1px solid var(--border)",padding:"4rem 5% 2rem"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"2.5rem",marginBottom:"3rem"}}>
          <div>
            <div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.5rem",marginBottom:"1rem",background:"linear-gradient(135deg,var(--teal),var(--sky))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Tarek.</div>
            <p style={{color:"var(--muted)",lineHeight:1.85,fontSize:"0.86rem"}}>MERN Full Stack Developer & Digital Marketer. Building powerful web solutions from Bangladesh 🇧🇩</p>
            <div style={{display:"flex",gap:"0.6rem",marginTop:"1.2rem",flexWrap:"wrap"}}>
              {["GitHub","LinkedIn","Facebook"].map(s=>(
                <span key={s} style={{background:"rgba(0,212,170,0.07)",border:"1px solid var(--border)",borderRadius:6,padding:"5px 11px",fontSize:"0.76rem",color:"var(--teal)",cursor:"pointer"}}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{fontFamily:"var(--font-head)",fontWeight:700,color:"var(--sky)",marginBottom:"1.2rem",fontSize:"0.92rem"}}>Pages</h4>
            {[["Home","/"],["About","/about"],["Skills","/skills"],["Projects","/projects"],["Services","/services"],["Contact","/contact"]].map(([l,p])=>(
              <div key={p} onClick={()=>nav(p)} style={{color:"var(--muted)",fontSize:"0.86rem",marginBottom:"0.55rem",cursor:"pointer",transition:"color .2s"}}
                onMouseEnter={e=>e.target.style.color="var(--teal)"}
                onMouseLeave={e=>e.target.style.color="var(--muted)"}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"var(--font-head)",fontWeight:700,color:"var(--sky)",marginBottom:"1.2rem",fontSize:"0.92rem"}}>Services</h4>
            {["MERN Development","React Frontend","Node.js Backend","REST API","Digital Marketing","SEO"].map(s=>(
              <div key={s} style={{color:"var(--muted)",fontSize:"0.86rem",marginBottom:"0.55rem"}}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"var(--font-head)",fontWeight:700,color:"var(--sky)",marginBottom:"1.2rem",fontSize:"0.92rem"}}>Contact</h4>
            <p style={{color:"var(--muted)",fontSize:"0.86rem",lineHeight:1.85,marginBottom:"1rem"}}>📍 Bangladesh<br/>🌐 Remote Worldwide<br/>✅ Available for hire</p>
            <div onClick={()=>nav("/contact")} style={{display:"inline-block",background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",borderRadius:8,padding:"9px 20px",fontSize:"0.82rem",fontWeight:700,cursor:"pointer"}}>Get In Touch</div>
          </div>
        </div>
        <div style={{borderTop:"1px solid var(--border)",paddingTop:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.8rem"}}>
          <span style={{color:"var(--muted)",fontSize:"0.8rem"}}>© {new Date().getFullYear()} Tarikul Islam Tarek. All rights reserved.</span>
          <span style={{color:"var(--muted)",fontSize:"0.8rem"}}>Built with MERN Stack ❤️</span>
        </div>
      </div>
    </footer>
  );
}
`);

// ══════════════════════════════════════════
// HOME PAGE — Hero + overview of all sections
// ══════════════════════════════════════════
write(path.join(src, "pages/Home.jsx"), `
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";

const SKILLS_PREVIEW = [
  {n:"React.js",p:90,c:"var(--teal)"},{n:"Node.js",p:80,c:"var(--sky)"},
  {n:"MongoDB",p:85,c:"var(--indigo)"},{n:"Express.js",p:80,c:"var(--teal)"},
  {n:"JavaScript",p:88,c:"var(--sky)"},{n:"Digital Marketing",p:85,c:"var(--indigo)"},
];

const PROJECTS_PREVIEW = [
  {title:"MERN Project 1",desc:"Full-stack web application with auth, REST API, and React frontend. Live on Vercel.",tags:["React","Node","MongoDB"],c:"var(--teal)"},
  {title:"MERN Project 2",desc:"Advanced MERN app with dashboard, real-time features & modern UI. Live on Vercel.",tags:["Express","JWT","React"],c:"var(--sky)"},
];

const SERVICES_PREVIEW = [
  {icon:"🌐",title:"MERN Development",desc:"End-to-end full-stack web apps"},
  {icon:"⚛️",title:"React Frontend",desc:"Fast, interactive modern UIs"},
  {icon:"🔧",title:"REST API",desc:"Scalable Node.js backends"},
  {icon:"📈",title:"Digital Marketing",desc:"SEO & growth strategies"},
];

export default function Home() {
  const nav = useNavigate();
  const roleRef = useRef(null);

  useEffect(() => {
    const roles = ["MERN Full Stack Developer","Digital Marketer","React Specialist","MongoDB Expert"];
    let i = 0;
    const tick = setInterval(() => {
      i = (i + 1) % roles.length;
      const el = roleRef.current;
      if (!el) return;
      el.style.opacity = "0";
      setTimeout(() => { el.textContent = roles[i]; el.style.opacity = "1"; }, 300);
    }, 2600);
    return () => clearInterval(tick);
  }, []);

  return (
    <main>
      {/* ──────────── HERO ──────────── */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"0 5%",paddingTop:68,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"8%",left:"3%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.07) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"8%",right:"3%",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}/>

        <div style={{width:"100%",maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"3rem",alignItems:"center"}} className="hero-grid">

            {/* TEXT */}
            <div style={{animation:"fadeUp .8s ease both"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,170,0.07)",border:"1px solid rgba(0,212,170,0.22)",borderRadius:20,padding:"6px 16px",fontSize:"0.76rem",color:"var(--teal)",marginBottom:"1.5rem",fontFamily:"var(--font-body)",letterSpacing:"0.04em",textTransform:"uppercase"}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"var(--teal)",animation:"pulse 1.8s infinite"}}/>
                Available for freelance work
              </div>

              <h1 style={{fontFamily:"var(--font-head)",fontSize:"clamp(2.4rem,5.5vw,4.2rem)",fontWeight:800,lineHeight:1.06,marginBottom:"1rem"}}>
                Hi, I'm<br/>
                <span style={{background:"linear-gradient(135deg,var(--teal),var(--sky),var(--indigo))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"block"}}>
                  Tarikul Islam<br/>Tarek
                </span>
              </h1>

              <div ref={roleRef} style={{fontSize:"clamp(1rem,2.3vw,1.25rem)",color:"var(--sky)",fontWeight:600,marginBottom:"1.5rem",fontFamily:"var(--font-head)",transition:"opacity .3s ease",minHeight:"2rem"}}>
                MERN Full Stack Developer
              </div>

              <p style={{color:"var(--muted)",lineHeight:1.9,fontSize:"0.96rem",maxWidth:520,marginBottom:"2.2rem"}}>
                I build powerful MERN stack web applications and drive business growth through digital marketing.
                2 live projects on Vercel — let's create something amazing together.
              </p>

              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                <button onClick={()=>nav("/projects")} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:10,padding:"14px 32px",fontWeight:700,fontSize:"0.98rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>
                  View Projects 🚀
                </button>
                <button onClick={()=>nav("/contact")} style={{background:"transparent",color:"var(--teal)",border:"2px solid var(--teal)",borderRadius:10,padding:"14px 32px",fontWeight:700,fontSize:"0.98rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>
                  Hire Me
                </button>
              </div>

              <div style={{display:"flex",gap:"2.5rem",marginTop:"2.8rem",flexWrap:"wrap"}}>
                {[["2+","Live Projects"],["MERN","Stack Expert"],["100%","Dedication"]].map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"var(--font-head)",fontSize:"2rem",fontWeight:800,background:"linear-gradient(135deg,var(--teal),var(--sky))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{n}</div>
                    <div style={{color:"var(--muted)",fontSize:"0.78rem",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROFILE IMAGE */}
            <div style={{animation:"fadeUp 1s ease .2s both",display:"flex",justifyContent:"center"}} className="hero-img">
              <div style={{position:"relative",width:300,height:300,flexShrink:0,animation:"floatY 5s ease-in-out infinite"}}>
                {/* Spinning ring */}
                <div style={{position:"absolute",inset:-14,borderRadius:"50%",background:"conic-gradient(var(--teal),var(--sky),var(--indigo),var(--teal))",animation:"spin 5s linear infinite",padding:3,zIndex:0}}>
                  <div style={{borderRadius:"50%",background:"var(--bg)",width:"100%",height:"100%"}}/>
                </div>
                {/* Glow halo */}
                <div style={{position:"absolute",inset:-35,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.14) 0%,transparent 70%)",pointerEvents:"none"}}/>
                {/* Photo */}
                <img
                  src="/profile.png"
                  alt="Tarikul Islam Tarek"
                  onError={e=>{e.target.style.display="none";document.getElementById("hero-fb").style.display="flex";}}
                  style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",objectPosition:"top center",border:"3px solid rgba(0,212,170,0.35)",zIndex:1}}
                />
                {/* Fallback */}
                <div id="hero-fb" style={{display:"none",position:"absolute",inset:0,borderRadius:"50%",background:"linear-gradient(135deg,var(--teal),var(--indigo))",alignItems:"center",justifyContent:"center",fontSize:"5.5rem",fontFamily:"var(--font-head)",fontWeight:800,color:"#050A14",border:"3px solid rgba(0,212,170,0.35)",zIndex:1}}>T</div>
                {/* Badge */}
                <div style={{position:"absolute",bottom:8,right:-20,background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",borderRadius:20,padding:"7px 16px",fontSize:"0.73rem",fontWeight:700,fontFamily:"var(--font-body)",whiteSpace:"nowrap",zIndex:2,boxShadow:"0 4px 20px rgba(0,212,170,0.3)"}}>✓ MERN Developer</div>
              </div>
            </div>
          </div>
        </div>
        <style>{\`@media(max-width:700px){.hero-grid{grid-template-columns:1fr!important;text-align:center}.hero-img{display:none!important}}\`}</style>
      </section>

      {/* ──────────── SERVICES OVERVIEW ──────────── */}
      <section style={{padding:"5rem 5%",background:"var(--surface)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionTitle pre="What I Do" title="My" highlight="Services" sub="Expert solutions across full-stack development and digital marketing"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem"}}>
            {SERVICES_PREVIEW.map(s=>(
              <div key={s.title} style={{background:"var(--card)",borderRadius:16,padding:"1.8rem",border:"1px solid var(--border)",transition:"transform .3s,border-color .3s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor="var(--teal)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="var(--border)"}}>
                <div style={{fontSize:"2.2rem",marginBottom:"0.8rem"}}>{s.icon}</div>
                <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1rem",marginBottom:"0.5rem"}}>{s.title}</h3>
                <p style={{color:"var(--muted)",fontSize:"0.84rem",lineHeight:1.75}}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button onClick={()=>nav("/services")} style={{background:"transparent",color:"var(--teal)",border:"2px solid var(--teal)",borderRadius:10,padding:"12px 28px",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>View All Services →</button>
          </div>
        </div>
      </section>

      {/* ──────────── ABOUT PREVIEW ──────────── */}
      <section style={{padding:"5rem 5%"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"auto 1fr",gap:"4rem",alignItems:"center"}} className="about-grid">
          {/* Photo */}
          <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{position:"relative",width:240,height:280}}>
              <div style={{position:"absolute",inset:-3,borderRadius:20,background:"linear-gradient(135deg,var(--teal),var(--sky),var(--indigo))",padding:3}}>
                <div style={{borderRadius:18,background:"var(--bg)",width:"100%",height:"100%"}}/>
              </div>
              <img src="/profile.png" alt="Tarikul Islam Tarek"
                onError={e=>{e.target.style.display="none";document.getElementById("about-fb").style.display="flex";}}
                style={{position:"absolute",inset:3,width:"calc(100% - 6px)",height:"calc(100% - 6px)",borderRadius:16,objectFit:"cover",objectPosition:"top center"}}
              />
              <div id="about-fb" style={{display:"none",position:"absolute",inset:3,width:"calc(100% - 6px)",height:"calc(100% - 6px)",borderRadius:16,background:"linear-gradient(135deg,var(--teal),var(--indigo))",alignItems:"center",justifyContent:"center",fontSize:"5rem",fontFamily:"var(--font-head)",color:"#050A14",fontWeight:800}}>T</div>
            </div>
          </div>
          {/* Text */}
          <div>
            <div style={{display:"inline-block",background:"rgba(0,212,170,0.08)",border:"1px solid rgba(0,212,170,0.22)",borderRadius:20,padding:"5px 14px",fontSize:"0.75rem",color:"var(--teal)",marginBottom:"1.2rem",letterSpacing:"0.04em",textTransform:"uppercase"}}>About Me</div>
            <h2 style={{fontFamily:"var(--font-head)",fontSize:"clamp(1.6rem,3.5vw,2.4rem)",fontWeight:800,marginBottom:"1rem",lineHeight:1.15}}>
              Tarikul Islam <span style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Tarek</span>
            </h2>
            <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:"2rem",fontSize:"0.94rem",maxWidth:520}}>
              আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। 
              MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable web applications তৈরি করি। 
              আমার ২টি project Vercel এ live আছে।
            </p>
            <button onClick={()=>nav("/about")} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:10,padding:"13px 28px",fontWeight:700,fontSize:"0.92rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>Know More About Me →</button>
          </div>
        </div>
        <style>{\`@media(max-width:700px){.about-grid{grid-template-columns:1fr!important;gap:2rem!important}}\`}</style>
      </section>

      {/* ──────────── SKILLS OVERVIEW ──────────── */}
      <section style={{padding:"5rem 5%",background:"var(--surface)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionTitle pre="Technologies" title="My" highlight="Skills"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"1.1rem"}}>
            {SKILLS_PREVIEW.map(s=>(
              <div key={s.n} style={{background:"var(--card)",borderRadius:12,padding:"18px 20px",border:"1px solid var(--border)"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <span style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.92rem"}}>{s.n}</span>
                  <span style={{color:s.c,fontWeight:700,fontSize:"0.88rem"}}>{s.p}%</span>
                </div>
                <div style={{height:7,background:"rgba(255,255,255,0.05)",borderRadius:4,overflow:"hidden"}}>
                  <div style={{height:"100%",width:s.p+"%",background:s.c,borderRadius:4}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button onClick={()=>nav("/skills")} style={{background:"transparent",color:"var(--teal)",border:"2px solid var(--teal)",borderRadius:10,padding:"12px 28px",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>View All Skills →</button>
          </div>
        </div>
      </section>

      {/* ──────────── PROJECTS OVERVIEW ──────────── */}
      <section style={{padding:"5rem 5%"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionTitle pre="My Work" title="Featured" highlight="Projects"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2rem"}}>
            {PROJECTS_PREVIEW.map(p=>(
              <div key={p.title} style={{background:"var(--card)",borderRadius:18,padding:"2rem",border:"1px solid var(--border)",transition:"transform .3s,box-shadow .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-7px)";e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,0.35)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
                <div style={{width:50,height:5,background:p.c,borderRadius:3,marginBottom:"1.2rem"}}/>
                <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1.15rem",marginBottom:"0.7rem"}}>{p.title}</h3>
                <p style={{color:"var(--muted)",fontSize:"0.87rem",lineHeight:1.85,marginBottom:"1.2rem"}}>{p.desc}</p>
                <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
                  {p.tags.map(t=>(
                    <span key={t} style={{background:"rgba(0,212,170,0.08)",color:"var(--teal)",borderRadius:6,padding:"3px 11px",fontSize:"0.74rem",fontWeight:600}}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button onClick={()=>nav("/projects")} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:10,padding:"14px 32px",fontWeight:700,fontSize:"0.95rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>View All Projects 🚀</button>
          </div>
        </div>
      </section>

      {/* ──────────── CTA ──────────── */}
      <section style={{padding:"5rem 5%",textAlign:"center",background:"var(--surface)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(0,212,170,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:580,margin:"0 auto",position:"relative"}}>
          <h2 style={{fontFamily:"var(--font-head)",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:800,marginBottom:"1rem",lineHeight:1.15}}>
            Ready to <span style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Work Together?</span>
          </h2>
          <p style={{color:"var(--muted)",marginBottom:"2.2rem",lineHeight:1.9,fontSize:"0.95rem"}}>
            Let's build something powerful. Available for freelance projects and long-term collaborations.
          </p>
          <button onClick={()=>nav("/contact")} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:12,padding:"16px 44px",fontWeight:700,fontSize:"1.05rem",cursor:"pointer",fontFamily:"var(--font-body)",boxShadow:"0 8px 30px rgba(0,212,170,0.25)"}}>
            Get In Touch 👋
          </button>
        </div>
      </section>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════
write(path.join(src, "pages/About.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";

export default function About() {
  const nav = useNavigate();
  return (
    <main style={{minHeight:"100vh",paddingTop:68}}>
      <div style={{padding:"4rem 5% 5rem",maxWidth:1100,margin:"0 auto"}}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:"4rem",alignItems:"center"}} className="about-inner">
          {/* Image */}
          <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{position:"relative",width:290,height:360}}>
              <div style={{position:"absolute",inset:-3,borderRadius:24,background:"linear-gradient(135deg,var(--teal),var(--sky),var(--indigo))",padding:3}}>
                <div style={{borderRadius:22,background:"var(--bg)",width:"100%",height:"100%"}}/>
              </div>
              <img src="/profile.png" alt="Tarikul Islam Tarek"
                onError={e=>{e.target.style.display="none";document.getElementById("pg-about-fb").style.display="flex";}}
                style={{position:"absolute",inset:3,width:"calc(100% - 6px)",height:"calc(100% - 6px)",borderRadius:20,objectFit:"cover",objectPosition:"top center",zIndex:1}}
              />
              <div id="pg-about-fb" style={{display:"none",position:"absolute",inset:3,width:"calc(100% - 6px)",height:"calc(100% - 6px)",borderRadius:20,background:"linear-gradient(135deg,var(--teal),var(--indigo))",alignItems:"center",justifyContent:"center",fontSize:"6rem",fontFamily:"var(--font-head)",color:"#050A14",fontWeight:800,zIndex:1}}>T</div>
              <div style={{position:"absolute",bottom:-18,right:-18,background:"var(--card)",border:"2px solid var(--teal)",borderRadius:14,padding:"12px 20px",zIndex:2,textAlign:"center",boxShadow:"0 8px 30px rgba(0,0,0,0.4)"}}>
                <div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.5rem",color:"var(--teal)"}}>2+</div>
                <div style={{color:"var(--muted)",fontSize:"0.72rem"}}>Projects Live</div>
              </div>
            </div>
          </div>
          {/* Text */}
          <div>
            <h3 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.7rem",marginBottom:"0.4rem"}}>Tarikul Islam Tarek</h3>
            <div style={{color:"var(--teal)",fontWeight:600,marginBottom:"1.3rem",fontSize:"0.93rem"}}>MERN Full Stack Developer & Digital Marketer</div>
            <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:"1rem",fontSize:"0.93rem"}}>
              আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে আমি scalable, high-performance web applications তৈরি করি।
            </p>
            <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:"2rem",fontSize:"0.93rem"}}>
              আমার ২টি MERN project বর্তমানে Vercel এ live আছে। আমি সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.8rem",marginBottom:"2rem"}}>
              {[["👤 Name","Tarikul Islam Tarek"],["💼 Role","MERN Developer"],["📍 Location","Bangladesh"],["🌐 Work","Remote Worldwide"],["🎯 Focus","Full Stack + Marketing"],["✅ Status","Available for Hire"]].map(([k,v])=>(
                <div key={k} style={{background:"var(--card)",borderRadius:10,padding:"12px 14px",border:"1px solid var(--border)"}}>
                  <div style={{color:"var(--teal)",fontSize:"0.7rem",marginBottom:3,fontWeight:600}}>{k}</div>
                  <div style={{fontSize:"0.84rem",fontWeight:500}}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>nav("/contact")} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:10,padding:"13px 28px",fontWeight:700,fontSize:"0.92rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>Let's Talk 👋</button>
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:2.5rem!important}}\`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// SKILLS PAGE
// ══════════════════════════════════════════
write(path.join(src, "pages/Skills.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";

const CATS = [
  {cat:"Frontend",items:[{n:"React.js",p:90,c:"var(--teal)"},{n:"JavaScript",p:88,c:"var(--sky)"},{n:"HTML/CSS",p:95,c:"var(--indigo)"},{n:"Tailwind CSS",p:82,c:"var(--teal)"}]},
  {cat:"Backend",items:[{n:"Node.js",p:80,c:"var(--sky)"},{n:"Express.js",p:80,c:"var(--teal)"},{n:"REST API",p:85,c:"var(--indigo)"},{n:"JWT Auth",p:78,c:"var(--sky)"}]},
  {cat:"Database",items:[{n:"MongoDB",p:85,c:"var(--teal)"},{n:"Mongoose",p:82,c:"var(--sky)"},{n:"Firebase",p:70,c:"var(--indigo)"}]},
  {cat:"Marketing",items:[{n:"Digital Marketing",p:85,c:"var(--sky)"},{n:"SEO",p:75,c:"var(--teal)"},{n:"Social Media",p:80,c:"var(--indigo)"}]},
];
const TOOLS=["VS Code","Git & GitHub","Postman","Vercel","Netlify","Figma","npm","MongoDB Atlas","React DevTools"];

export default function Skills() {
  return (
    <main style={{minHeight:"100vh",paddingTop:68,padding:"100px 5% 60px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SectionTitle pre="What I Know" title="Skills &" highlight="Expertise"/>
        {CATS.map(c=>(
          <div key={c.cat} style={{marginBottom:"3rem"}}>
            <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1.05rem",color:"var(--sky)",marginBottom:"1.2rem",display:"flex",alignItems:"center",gap:10}}>
              <span style={{width:28,height:3,background:"var(--teal)",borderRadius:2,display:"inline-block"}}/>
              {c.cat}
            </h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
              {c.items.map(s=>(
                <div key={s.n} style={{background:"var(--card)",borderRadius:12,padding:"17px 20px",border:"1px solid var(--border)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                    <span style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.9rem"}}>{s.n}</span>
                    <span style={{color:s.c,fontWeight:700,fontSize:"0.87rem"}}>{s.p}%</span>
                  </div>
                  <div style={{height:7,background:"rgba(255,255,255,0.05)",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:s.p+"%",background:s.c,borderRadius:4}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1.05rem",color:"var(--sky)",marginBottom:"1.2rem",display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:28,height:3,background:"var(--teal)",borderRadius:2,display:"inline-block"}}/>
          Tools & Technologies
        </h3>
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.8rem"}}>
          {TOOLS.map(t=>(
            <span key={t} style={{background:"rgba(0,212,170,0.07)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 18px",fontSize:"0.84rem",color:"var(--text)"}}>{t}</span>
          ))}
        </div>
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// PROJECTS PAGE
// ══════════════════════════════════════════
write(path.join(src, "pages/Projects.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";

const PROJECTS=[
  {title:"MERN Project 1",desc:"A full-stack web application with user authentication, REST API, and a responsive React frontend. Deployed and live on Vercel.",tags:["MongoDB","Express","React","Node.js","JWT"],live:"#",c:"var(--teal)",n:"01"},
  {title:"MERN Project 2",desc:"Advanced MERN stack application featuring a dashboard, real-time data, and modern UI/UX design. Live on Vercel.",tags:["React","Node.js","MongoDB","REST API"],live:"#",c:"var(--sky)",n:"02"},
];

export default function Projects() {
  return (
    <main style={{minHeight:"100vh",paddingTop:68,padding:"100px 5% 60px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SectionTitle pre="My Work" title="Featured" highlight="Projects" sub="2 live projects on Vercel — built with MERN stack"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"2rem"}}>
          {PROJECTS.map(p=>(
            <div key={p.title} style={{background:"var(--card)",borderRadius:22,padding:"2.5rem",border:"1px solid var(--border)",position:"relative",overflow:"hidden",transition:"transform .3s,box-shadow .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(0,0,0,0.4)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
              <div style={{position:"absolute",top:"1.5rem",right:"1.8rem",fontFamily:"var(--font-head)",fontWeight:800,fontSize:"3.5rem",color:p.c,opacity:0.07,lineHeight:1}}>{p.n}</div>
              <div style={{width:56,height:5,background:p.c,borderRadius:3,marginBottom:"1.5rem"}}/>
              <h3 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.3rem",marginBottom:"0.8rem"}}>{p.title}</h3>
              <p style={{color:"var(--muted)",fontSize:"0.9rem",lineHeight:1.9,marginBottom:"1.5rem"}}>{p.desc}</p>
              <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"1.8rem"}}>
                {p.tags.map(t=>(
                  <span key={t} style={{background:"rgba(0,212,170,0.08)",color:"var(--teal)",borderRadius:6,padding:"4px 12px",fontSize:"0.74rem",fontWeight:600}}>{t}</span>
                ))}
              </div>
              <a href={p.live} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",borderRadius:9,padding:"11px 24px",fontWeight:700,fontSize:"0.88rem",fontFamily:"var(--font-body)"}}>
                🚀 Live on Vercel
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// SERVICES PAGE
// ══════════════════════════════════════════
write(path.join(src, "pages/Services.jsx"), `
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
`);

// ══════════════════════════════════════════
// BLOG PAGE
// ══════════════════════════════════════════
write(path.join(src, "pages/Blog.jsx"), `
import React from "react";
import SectionTitle from "../components/SectionTitle";

const POSTS=[
  {title:"Getting Started with MERN Stack",cat:"Development",date:"Jun 2025",desc:"A complete guide to building your first full-stack app with MongoDB, Express, React, and Node.js.",c:"var(--teal)"},
  {title:"SEO Tips for Developers",cat:"Marketing",date:"May 2025",desc:"How to optimize web apps for search engines and increase organic traffic effectively.",c:"var(--sky)"},
  {title:"React Best Practices 2025",cat:"React",date:"Apr 2025",desc:"Modern React patterns, hooks, and performance optimization techniques every developer should know.",c:"var(--indigo)"},
];

export default function Blog() {
  return (
    <main style={{minHeight:"100vh",paddingTop:68,padding:"100px 5% 60px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SectionTitle pre="My Thoughts" title="Latest" highlight="Blog Posts" sub="Insights on MERN development and digital marketing"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2rem"}}>
          {POSTS.map(p=>(
            <div key={p.title} style={{background:"var(--card)",borderRadius:18,padding:"2rem",border:"1px solid var(--border)",cursor:"pointer",transition:"transform .3s,border-color .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor=p.c}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="var(--border)"}}>
              <div style={{display:"flex",gap:"0.8rem",marginBottom:"1.2rem",alignItems:"center"}}>
                <span style={{background:"rgba(0,212,170,0.1)",color:"var(--teal)",borderRadius:6,padding:"4px 12px",fontSize:"0.74rem",fontWeight:600}}>{p.cat}</span>
                <span style={{color:"var(--muted)",fontSize:"0.77rem"}}>{p.date}</span>
              </div>
              <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1.1rem",marginBottom:"0.7rem",lineHeight:1.4}}>{p.title}</h3>
              <p style={{color:"var(--muted)",fontSize:"0.86rem",lineHeight:1.85,marginBottom:"1.2rem"}}>{p.desc}</p>
              <span style={{color:"var(--teal)",fontSize:"0.84rem",fontWeight:600}}>Read More →</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// CONTACT PAGE
// ══════════════════════════════════════════
write(path.join(src, "pages/Contact.jsx"), `
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";

export default function Contact() {
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const [sent,setSent]=useState(false);
  const inp=e=>setForm({...form,[e.target.name]:e.target.value});
  const focus=e=>e.target.style.borderColor="var(--teal)";
  const blur=e=>e.target.style.borderColor="var(--border)";
  const inputSt={width:"100%",background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,padding:"13px 16px",color:"var(--text)",fontSize:"0.92rem",fontFamily:"var(--font-body)",outline:"none",marginBottom:"1rem",transition:"border-color .2s"};
  return (
    <main style={{minHeight:"100vh",paddingTop:68,padding:"100px 5% 60px"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <SectionTitle pre="Get In Touch" title="Contact" highlight="Me" sub="Available for freelance projects and collaborations"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"3rem",alignItems:"start"}} className="contact-grid">
          <div>
            {[["📍","Location","Bangladesh — Remote Worldwide"],["✅","Availability","Available for hire"],["⚡","Response","Within 24 hours"],["💼","Type","Freelance & Full-time"]].map(([ico,l,v])=>(
              <div key={l} style={{background:"var(--card)",borderRadius:14,padding:"1.2rem 1.5rem",border:"1px solid var(--border)",marginBottom:"1rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
                <span style={{fontSize:"1.4rem"}}>{ico}</span>
                <div>
                  <div style={{color:"var(--teal)",fontSize:"0.72rem",fontWeight:600,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.04em"}}>{l}</div>
                  <div style={{fontSize:"0.88rem"}}>{v}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {sent ? (
              <div style={{background:"rgba(0,212,170,0.07)",border:"2px solid var(--teal)",borderRadius:18,padding:"3rem",textAlign:"center"}}>
                <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✅</div>
                <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"1.3rem",color:"var(--teal)",marginBottom:"0.5rem"}}>Message Sent!</h3>
                <p style={{color:"var(--muted)",fontSize:"0.9rem"}}>আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={()=>setSent(false)} style={{marginTop:"1.5rem",background:"transparent",color:"var(--teal)",border:"2px solid var(--teal)",borderRadius:8,padding:"10px 24px",fontWeight:700,cursor:"pointer",fontFamily:"var(--font-body)"}}>Send Another</button>
              </div>
            ):(
              <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{background:"var(--card)",borderRadius:20,padding:"2.5rem",border:"1px solid var(--border)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 1rem"}}>
                  <input name="name" placeholder="Your Name" value={form.name} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur}/>
                  <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur}/>
                </div>
                <input name="subject" placeholder="Subject" value={form.subject} onChange={inp} style={inputSt} onFocus={focus} onBlur={blur}/>
                <textarea name="message" placeholder="Your Message..." value={form.message} onChange={inp} required rows={5} style={{...inputSt,resize:"vertical"}} onFocus={focus} onBlur={blur}/>
                <button type="submit" style={{width:"100%",background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:10,padding:"15px",fontWeight:700,fontSize:"1rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>Send Message 🚀</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{\`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}\`}</style>
    </main>
  );
}
`);

// ══════════════════════════════════════════
// ADMIN — Main Layout
// ══════════════════════════════════════════
write(path.join(src, "pages/admin/Admin.jsx"), `
import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminMessages from "./AdminMessages";
import AdminProfile from "./AdminProfile";

const MENU=[
  {icon:"📊",label:"Dashboard",to:"/admin"},
  {icon:"🚀",label:"Projects",to:"/admin/projects"},
  {icon:"⚡",label:"Skills",to:"/admin/skills"},
  {icon:"✉️",label:"Messages",to:"/admin/messages"},
  {icon:"👤",label:"Profile",to:"/admin/profile"},
];

export default function Admin() {
  const nav = useNavigate();
  const loc = useLocation();
  const [col, setCol] = useState(false);
  return (
    <div style={{display:"flex",minHeight:"100vh",paddingTop:68,background:"var(--bg)"}}>
      <aside style={{width:col?64:220,flexShrink:0,background:"var(--surface)",borderRight:"1px solid var(--border)",padding:"1.5rem 0",transition:"width .3s",position:"sticky",top:68,height:"calc(100vh - 68px)",overflow:"hidden"}}>
        <div style={{padding:"0 1rem 1.5rem",borderBottom:"1px solid var(--border)",marginBottom:"1rem",display:"flex",justifyContent:col?"center":"space-between",alignItems:"center"}}>
          {!col && <span style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"0.95rem",color:"var(--teal)"}}>Admin Panel</span>}
          <button onClick={()=>setCol(!col)} style={{background:"rgba(0,212,170,0.08)",border:"1px solid var(--border)",borderRadius:6,color:"var(--teal)",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0}}>{col?"→":"←"}</button>
        </div>
        {MENU.map(m=>{
          const active=m.to==="/admin"?loc.pathname==="/admin":loc.pathname.startsWith(m.to+"/") || loc.pathname===m.to;
          return (
            <div key={m.to} onClick={()=>nav(m.to)} style={{display:"flex",alignItems:"center",gap:11,padding:"12px 16px",cursor:"pointer",transition:"all .2s",background:active?"rgba(0,212,170,0.1)":"transparent",borderLeft:active?"3px solid var(--teal)":"3px solid transparent",color:active?"var(--teal)":"var(--muted)",marginBottom:2,whiteSpace:"nowrap"}}
              onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(255,255,255,0.03)"}}
              onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent"}}>
              <span style={{fontSize:"1.05rem",flexShrink:0}}>{m.icon}</span>
              {!col && <span style={{fontFamily:"var(--font-body)",fontWeight:500,fontSize:"0.88rem"}}>{m.label}</span>}
            </div>
          );
        })}
        <div style={{position:"absolute",bottom:"1rem",width:"100%",padding:"0 1rem"}}>
          <div onClick={()=>nav("/")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",cursor:"pointer",background:"rgba(56,189,248,0.07)",border:"1px solid rgba(56,189,248,0.18)",borderRadius:8,color:"var(--sky)",fontSize:"0.84rem",whiteSpace:"nowrap"}}>
            <span style={{flexShrink:0}}>🌐</span>
            {!col && <span>View Site</span>}
          </div>
        </div>
      </aside>
      <div style={{flex:1,padding:"2rem",overflow:"auto"}}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
}
`);

// ADMIN DASHBOARD
write(path.join(src, "pages/admin/AdminDashboard.jsx"), `
import React from "react";
import { useNavigate } from "react-router-dom";
const STATS=[{icon:"🚀",l:"Projects",v:"2",c:"var(--teal)"},{icon:"⚡",l:"Skills",v:"14+",c:"var(--sky)"},{icon:"✉️",l:"Messages",v:"0",c:"var(--indigo)"},{icon:"🌐",l:"Pages",v:"7",c:"var(--teal)"}];
export default function AdminDashboard() {
  const nav = useNavigate();
  return (
    <div>
      <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.6rem",marginBottom:"0.3rem"}}>Dashboard</h2>
      <p style={{color:"var(--muted)",marginBottom:"2rem",fontSize:"0.88rem"}}>Welcome back, Tarek! Manage your portfolio from here.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"1.2rem",marginBottom:"2.5rem"}}>
        {STATS.map(s=>(
          <div key={s.l} style={{background:"var(--card)",borderRadius:14,padding:"1.5rem",border:"1px solid var(--border)"}}>
            <div style={{fontSize:"1.6rem",marginBottom:"0.5rem"}}>{s.icon}</div>
            <div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.8rem",color:s.c}}>{s.v}</div>
            <div style={{color:"var(--muted)",fontSize:"0.8rem",marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:"var(--card)",borderRadius:14,padding:"1.5rem",border:"1px solid var(--border)"}}>
        <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.95rem",marginBottom:"1.2rem",color:"var(--sky)"}}>Quick Actions</h3>
        <div style={{display:"flex",gap:"0.8rem",flexWrap:"wrap"}}>
          {[["Add Project","🚀","/admin/projects"],["Update Skills","⚡","/admin/skills"],["Edit Profile","👤","/admin/profile"],["View Messages","✉️","/admin/messages"]].map(([l,i,p])=>(
            <div key={l} onClick={()=>nav(p)} style={{background:"rgba(0,212,170,0.08)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 18px",color:"var(--teal)",fontSize:"0.84rem",fontWeight:600,display:"flex",gap:7,alignItems:"center",cursor:"pointer"}}>
              {i}{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// ADMIN PROJECTS
write(path.join(src, "pages/admin/AdminProjects.jsx"), `
import React, { useState } from "react";
const DEF={title:"",desc:"",tags:"",live:""};
export default function AdminProjects() {
  const [list,setList]=useState([
    {id:1,title:"MERN Project 1",desc:"Full-stack app on Vercel",tags:"React,Node,MongoDB",live:"#"},
    {id:2,title:"MERN Project 2",desc:"Advanced MERN app on Vercel",tags:"React,Express,JWT",live:"#"},
  ]);
  const [form,setForm]=useState(DEF);
  const [editing,setEditing]=useState(null);
  const inp=e=>setForm({...form,[e.target.name]:e.target.value});
  const save=()=>{
    if(editing){setList(list.map(p=>p.id===editing?{...form,id:editing}:p));setEditing(null);}
    else{setList([...list,{...form,id:Date.now()}]);}
    setForm(DEF);
  };
  const inputSt={width:"100%",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px",color:"var(--text)",fontSize:"0.87rem",fontFamily:"var(--font-body)",outline:"none",marginBottom:"0.8rem"};
  return (
    <div>
      <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.5rem",marginBottom:"0.3rem"}}>Projects</h2>
      <p style={{color:"var(--muted)",marginBottom:"2rem",fontSize:"0.87rem"}}>Manage your portfolio projects</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem",alignItems:"start"}} className="ap-grid">
        <div style={{background:"var(--card)",borderRadius:14,padding:"1.5rem",border:"1px solid var(--border)"}}>
          <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.95rem",marginBottom:"1.2rem",color:"var(--teal)"}}>{editing?"Edit":"Add"} Project</h3>
          <input name="title" placeholder="Project Title" value={form.title} onChange={inp} style={inputSt}/>
          <textarea name="desc" placeholder="Description" value={form.desc} onChange={inp} rows={3} style={{...inputSt,resize:"vertical"}}/>
          <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={inp} style={inputSt}/>
          <input name="live" placeholder="Live URL" value={form.live} onChange={inp} style={{...inputSt,marginBottom:"1.2rem"}}/>
          <div style={{display:"flex",gap:"0.8rem"}}>
            <button onClick={save} style={{flex:1,background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:8,padding:"11px",fontWeight:700,cursor:"pointer",fontFamily:"var(--font-body)"}}>{editing?"Update":"Add"}</button>
            {editing&&<button onClick={()=>{setEditing(null);setForm(DEF);}} style={{background:"rgba(255,255,255,0.05)",border:"1px solid var(--border)",borderRadius:8,padding:"11px 14px",color:"var(--muted)",cursor:"pointer"}}>Cancel</button>}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          {list.map(p=>(
            <div key={p.id} style={{background:"var(--card)",borderRadius:12,padding:"1.2rem",border:"1px solid var(--border)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.5rem"}}>
                <h4 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.92rem"}}>{p.title}</h4>
                <div style={{display:"flex",gap:"0.5rem"}}>
                  <button onClick={()=>{setForm(p);setEditing(p.id);}} style={{background:"rgba(56,189,248,0.1)",border:"none",borderRadius:5,padding:"5px 10px",color:"var(--sky)",cursor:"pointer",fontSize:"0.78rem"}}>Edit</button>
                  <button onClick={()=>setList(list.filter(x=>x.id!==p.id))} style={{background:"rgba(239,68,68,0.1)",border:"none",borderRadius:5,padding:"5px 10px",color:"#ef4444",cursor:"pointer",fontSize:"0.78rem"}}>Del</button>
                </div>
              </div>
              <p style={{color:"var(--muted)",fontSize:"0.8rem"}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{\`@media(max-width:700px){.ap-grid{grid-template-columns:1fr!important}}\`}</style>
    </div>
  );
}
`);

// ADMIN SKILLS
write(path.join(src, "pages/admin/AdminSkills.jsx"), `
import React, { useState } from "react";
const DEF={name:"",level:80,category:"Frontend"};
const CATS=["Frontend","Backend","Database","Marketing","Other"];
export default function AdminSkills() {
  const [list,setList]=useState([
    {id:1,name:"React.js",level:90,category:"Frontend"},
    {id:2,name:"Node.js",level:80,category:"Backend"},
    {id:3,name:"MongoDB",level:85,category:"Database"},
    {id:4,name:"Digital Marketing",level:85,category:"Marketing"},
  ]);
  const [form,setForm]=useState(DEF);
  const inp=e=>setForm({...form,[e.target.name]:e.target.value});
  const inputSt={background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px",color:"var(--text)",fontSize:"0.87rem",fontFamily:"var(--font-body)",outline:"none"};
  return (
    <div>
      <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.5rem",marginBottom:"0.3rem"}}>Skills</h2>
      <p style={{color:"var(--muted)",marginBottom:"2rem",fontSize:"0.87rem"}}>Manage your skills and expertise levels</p>
      <div style={{background:"var(--card)",borderRadius:14,padding:"1.5rem",border:"1px solid var(--border)",marginBottom:"2rem"}}>
        <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.95rem",marginBottom:"1.2rem",color:"var(--teal)"}}>Add New Skill</h3>
        <div style={{display:"flex",gap:"0.8rem",flexWrap:"wrap",alignItems:"flex-end"}}>
          <input name="name" placeholder="Skill name" value={form.name} onChange={inp} style={{...inputSt,flex:"1 1 140px"}}/>
          <select name="category" value={form.category} onChange={inp} style={{...inputSt,flex:"1 1 120px"}}>
            {CATS.map(c=><option key={c}>{c}</option>)}
          </select>
          <div style={{display:"flex",flexDirection:"column",gap:4,flex:"1 1 130px"}}>
            <label style={{color:"var(--muted)",fontSize:"0.76rem"}}>Level: {form.level}%</label>
            <input type="range" name="level" min={10} max={100} value={form.level} onChange={inp} style={{accentColor:"var(--teal)",width:"100%"}}/>
          </div>
          <button onClick={()=>{setList([...list,{...form,id:Date.now(),level:Number(form.level)}]);setForm(DEF);}} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:8,padding:"11px 22px",fontWeight:700,cursor:"pointer",fontFamily:"var(--font-body)",flexShrink:0}}>Add</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:"1rem"}}>
        {list.map(s=>(
          <div key={s.id} style={{background:"var(--card)",borderRadius:12,padding:"1.2rem",border:"1px solid var(--border)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div><div style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:"0.9rem"}}>{s.name}</div><div style={{color:"var(--muted)",fontSize:"0.73rem"}}>{s.category}</div></div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{color:"var(--teal)",fontWeight:700,fontSize:"0.87rem"}}>{s.level}%</span>
                <button onClick={()=>setList(list.filter(x=>x.id!==s.id))} style={{background:"rgba(239,68,68,0.1)",border:"none",borderRadius:5,padding:"4px 8px",color:"#ef4444",cursor:"pointer",fontSize:"0.74rem"}}>✕</button>
              </div>
            </div>
            <div style={{height:6,background:"rgba(255,255,255,0.05)",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:s.level+"%",background:"var(--teal)",borderRadius:3}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ADMIN MESSAGES
write(path.join(src, "pages/admin/AdminMessages.jsx"), `
import React from "react";
export default function AdminMessages() {
  return (
    <div>
      <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.5rem",marginBottom:"0.3rem"}}>Messages</h2>
      <p style={{color:"var(--muted)",marginBottom:"2rem",fontSize:"0.87rem"}}>Contact form submissions will appear here</p>
      <div style={{background:"var(--card)",borderRadius:14,padding:"3rem",border:"1px solid var(--border)",textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✉️</div>
        <h3 style={{fontFamily:"var(--font-head)",fontWeight:700,color:"var(--muted)",fontSize:"1rem",marginBottom:"0.5rem"}}>No messages yet</h3>
        <p style={{color:"var(--muted)",fontSize:"0.84rem"}}>When visitors submit the contact form, messages will appear here. Connect your backend to enable this.</p>
      </div>
    </div>
  );
}
`);

// ADMIN PROFILE
write(path.join(src, "pages/admin/AdminProfile.jsx"), `
import React, { useState } from "react";
export default function AdminProfile() {
  const [p,setP]=useState({name:"Tarikul Islam Tarek",role:"MERN Full Stack Developer & Digital Marketer",bio:"Passionate MERN developer with 2 live projects on Vercel. Building powerful web solutions from Bangladesh.",email:"",location:"Bangladesh",github:"",linkedin:"",facebook:""});
  const [saved,setSaved]=useState(false);
  const inp=e=>setP({...p,[e.target.name]:e.target.value});
  const inputSt={width:"100%",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"11px 13px",color:"var(--text)",fontSize:"0.88rem",fontFamily:"var(--font-body)",outline:"none",marginBottom:"1rem"};
  const fields=[["Full Name","name","text"],["Role / Title","role","text"],["Email","email","email"],["Location","location","text"],["GitHub URL","github","url"],["LinkedIn URL","linkedin","url"],["Facebook URL","facebook","url"]];
  return (
    <div>
      <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.5rem",marginBottom:"0.3rem"}}>Profile</h2>
      <p style={{color:"var(--muted)",marginBottom:"2rem",fontSize:"0.87rem"}}>Update your portfolio information</p>
      <div style={{background:"var(--card)",borderRadius:14,padding:"2rem",border:"1px solid var(--border)",maxWidth:620}}>
        {saved&&<div style={{background:"rgba(0,212,170,0.08)",border:"1px solid var(--teal)",borderRadius:8,padding:"10px 16px",marginBottom:"1.2rem",color:"var(--teal)",fontSize:"0.86rem"}}>✅ Profile updated!</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 1rem"}}>
          {fields.slice(0,2).map(([l,n,t])=>(
            <div key={n}><label style={{color:"var(--muted)",fontSize:"0.75rem",display:"block",marginBottom:5}}>{l}</label><input name={n} type={t} value={p[n]} onChange={inp} style={inputSt}/></div>
          ))}
        </div>
        <label style={{color:"var(--muted)",fontSize:"0.75rem",display:"block",marginBottom:5}}>Bio</label>
        <textarea name="bio" value={p.bio} onChange={inp} rows={3} style={{...inputSt,resize:"vertical"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 1rem"}}>
          {fields.slice(2,4).map(([l,n,t])=>(
            <div key={n}><label style={{color:"var(--muted)",fontSize:"0.75rem",display:"block",marginBottom:5}}>{l}</label><input name={n} type={t} value={p[n]} onChange={inp} style={inputSt} placeholder={n==="email"?"your@email.com":""}/></div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0 1rem"}}>
          {fields.slice(4).map(([l,n,t])=>(
            <div key={n}><label style={{color:"var(--muted)",fontSize:"0.75rem",display:"block",marginBottom:5}}>{l}</label><input name={n} type={t} value={p[n]} onChange={inp} placeholder="https://..." style={inputSt}/></div>
          ))}
        </div>
        <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),3000);}} style={{background:"linear-gradient(135deg,var(--teal),var(--sky))",color:"#050A14",border:"none",borderRadius:9,padding:"13px 28px",fontWeight:700,fontSize:"0.93rem",cursor:"pointer",fontFamily:"var(--font-body)"}}>Save Changes ✓</button>
      </div>
    </div>
  );
}
`);

// vite.config.js
const vp = path.join(base,"vite.config.js");
if(!fs.existsSync(vp)){
  write(vp,`
import{defineConfig}from'vite';import react from'@vitejs/plugin-react';
export default defineConfig({plugins:[react()]});
`);
}

console.log(`
╔═══════════════════════════════════════════════════╗
║        ✅ PORTFOLIO সম্পূর্ণ তৈরি হয়েছে!          ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  📦 STEP 1:                                       ║
║     npm install react-router-dom                  ║
║                                                   ║
║  📸 STEP 2 — ছবি এখানে রাখুন:                    ║
║     client/public/profile.png                     ║
║     (আপনার photo, PNG বা JPG)                     ║
║                                                   ║
║  🚀 STEP 3:                                       ║
║     npm run dev                                   ║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║  🔗 ROUTES:                                       ║
║  /           → Home (all sections overview)       ║
║  /about      → About + ছবি সহ                    ║
║  /skills     → Skills page                        ║
║  /projects   → Projects page                      ║
║  /services   → Services page                      ║
║  /blog       → Blog page                          ║
║  /contact    → Contact page                       ║
║  /admin      → Admin Panel                        ║
╚═══════════════════════════════════════════════════╝
`);
