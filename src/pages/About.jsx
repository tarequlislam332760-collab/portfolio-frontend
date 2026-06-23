import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import SocialLinks, { SocialLink } from "../components/SocialIcons";
import { profileAPI } from "../services/api";

const DEFAULT = {
  name: "Tarikul Islam Tarek",
  title: "MERN Full Stack Developer",
  subtitle: "Digital Marketing Specialist",
  bio: "আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer। MongoDB, Express.js, React.js এবং Node.js ব্যবহার করে scalable, high-performance web applications তৈরি করি।",
  bio2: "আমার ২টি MERN project বর্তমানে Vercel এ live আছে। সবসময় নতুন technology শিখতে এবং clients-এর জন্য best solution দিতে পছন্দ করি।",
  email: "tareq.islam.dev@gmail.com",
  phone: "+880 1732-483149",
  location: "Sylhet, Bangladesh",
  available: true,
  image: "",
  infoRole: "MERN Developer",
  infoWork: "Remote Worldwide",
  stat1n:"2+", stat1l:"Projects Live",
  stat2n:"3+", stat2l:"Years Exp",
  stat3n:"20+", stat3l:"Clients",
  stat4n:"15+", stat4l:"Technologies",
};

export default function About() {
  const nav = useNavigate();
  const [profile, setProfile] = useState(DEFAULT);

  useEffect(() => {
    profileAPI.get()
      .then(res => { if (res.data) setProfile(prev => ({ ...prev, ...res.data })); })
      .catch(() => {});
  }, []);

  const stats = [
    [profile.stat1n||"2+", profile.stat1l||"Projects Live"],
    [profile.stat2n||"3+", profile.stat2l||"Years Exp"],
    [profile.stat3n||"20+", profile.stat3l||"Clients"],
    [profile.stat4n||"15+", profile.stat4l||"Technologies"],
  ];

  const infoGrid = [
    ["👤 Name",    profile.name],
    ["💼 Role",    profile.infoRole || "MERN Developer"],
    ["📍 Location",profile.location],
    ["🌐 Work",    profile.infoWork || "Remote Worldwide"],
    ["📧 Email",   profile.email],
    ["📱 Phone",   profile.phone],
  ];

  return (
    <main style={{ minHeight:"100vh", paddingTop:68, background:"#050A14" }}>
      <SEO title="About Tarikul Islam Tarek | MERN Developer" description="Learn about Tarikul Islam Tarek - MERN Full Stack Developer and Digital Marketing Specialist based in Sylhet, Bangladesh." />

      <div style={{ padding:"clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth:1100, margin:"0 auto" }}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me" />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.3fr", gap:"clamp(30px,5vw,60px)", alignItems:"center" }} className="about-inner">

          {/* Image */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:"clamp(220px,26vw,290px)" }}>
              <div style={{ position:"absolute", inset:-3, borderRadius:24, background:"linear-gradient(135deg,#00D4AA,#38BDF8,#818CF8)", padding:3, zIndex:0 }}>
                <div style={{ borderRadius:22, background:"#050A14", width:"100%", height:"100%" }} />
              </div>
              <div style={{ position:"relative", borderRadius:20, overflow:"hidden", aspectRatio:"4/5", background:"linear-gradient(135deg,#0d1829,#0a1220)", zIndex:1 }}>
                {profile.image ? (
                  <img src={profile.image} alt={profile.name}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                ) : (
                  <img src="/profile.png" alt={profile.name}
                    onError={e => { e.target.style.display="none"; e.target.parentElement.querySelector('.fallback-t').style.display="flex"; }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                )}
                <div className="fallback-t" style={{ display:"none", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", fontSize:"5rem", fontFamily:"var(--font-head)", fontWeight:900, background:"linear-gradient(135deg,#00D4AA,#818CF8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", position:"absolute", inset:0 }}>T</div>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(5,10,20,0.7),transparent 50%)" }} />
                {/* Social icons overlay */}
                <div style={{ position:"absolute", bottom:14, left:12, right:12, display:"flex", gap:7, justifyContent:"center" }}>
                  <SocialLink type="facebook"  size={34} />
                  <SocialLink type="instagram" size={34} />
                  <SocialLink type="linkedin"  size={34} />
                  <SocialLink type="github"    size={34} />
                </div>
              </div>
              {/* Badge */}
              <div style={{ position:"absolute", bottom:-18, right:-18, background:"#0d1829", border:"2px solid #00D4AA", borderRadius:14, padding:"12px 16px", textAlign:"center", boxShadow:"0 8px 30px rgba(0,0,0,0.4)", zIndex:2 }}>
                <div style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"1.5rem", color:"#00D4AA" }}>{profile.stat1n||"2+"}</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.72rem" }}>{profile.stat1l||"Projects Live"}</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.5rem,3vw,2rem)", marginBottom:"0.3rem", color:"#fff" }}>{profile.name}</h3>
            <div style={{ color:"#00D4AA", fontWeight:600, marginBottom:"0.4rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.title}</div>
            {profile.subtitle && <div style={{ color:"rgba(255,255,255,0.4)", fontWeight:500, marginBottom:"1.3rem", fontSize:"0.85rem", fontFamily:"var(--font-body)" }}>{profile.subtitle}</div>}

            {profile.bio && <p style={{ color:"rgba(255,255,255,0.45)", lineHeight:1.9, marginBottom:"0.9rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.bio}</p>}
            {profile.bio2 && <p style={{ color:"rgba(255,255,255,0.45)", lineHeight:1.9, marginBottom:"1.8rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.bio2}</p>}

            {/* Info grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"1.5rem" }}>
              {infoGrid.map(([k,v]) => (
                <div key={k} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"11px 13px", transition:"border-color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(0,212,170,0.2)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                  <div style={{ color:"#00D4AA", fontSize:"0.7rem", marginBottom:3, fontWeight:600, fontFamily:"var(--font-body)" }}>{k}</div>
                  <div style={{ fontSize:"0.82rem", fontWeight:500, wordBreak:"break-all", color:"rgba(255,255,255,0.8)", fontFamily:"var(--font-body)" }}>{v||"—"}</div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:"clamp(16px,3vw,28px)", marginBottom:"1.8rem", flexWrap:"wrap" }}>
              {stats.map(([n,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontWeight:900, fontSize:"clamp(1.3rem,3vw,1.6rem)", color:"#00D4AA", lineHeight:1 }}>{n}</div>
                  <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.72rem", fontFamily:"var(--font-body)", marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Available badge */}
            {profile.available && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,212,170,0.06)", border:"1px solid rgba(0,212,170,0.2)", borderRadius:99, padding:"7px 16px", marginBottom:"1.5rem" }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#00D4AA", animation:"pulse 1.8s infinite", flexShrink:0 }} />
                <span style={{ color:"#00D4AA", fontSize:"0.82rem", fontWeight:600, fontFamily:"var(--font-body)" }}>Available for hire</span>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => nav("/contact")}
                style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", color:"#050A14", border:"none", borderRadius:10, padding:"13px 26px", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", fontFamily:"var(--font-body)", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 22px rgba(0,212,170,0.38)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
                Let's Talk 👋
              </button>
              <SocialLinks size={42} />
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </main>
  );
}
