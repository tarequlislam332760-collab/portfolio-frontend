import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import SocialLinks from "../components/SocialIcons";
import { profileAPI } from "../services/api";

const DEFAULT = {
  name: "Tarikul Islam Tarek",
  title: "MERN Full Stack Developer",
  subtitle: "Digital Marketing Specialist",
  bio: "আমি একজন passionate MERN Full Stack Developer এবং Digital Marketer।",
  bio2: "আমার ২টি MERN project বর্তমানে Vercel এ live আছে।",
  email: "tareq.islam.dev@gmail.com",
  phone: "+880 1732-483149",
  location: "Sylhet, Bangladesh",
  available: true,
  image: "",
  infoRole: "MERN Developer",
  infoWork: "Remote Worldwide",
  facebook:  "https://www.facebook.com/profile.php?id=61585040426028",
  instagram: "https://www.instagram.com/tareq23337/",
  linkedin:  "https://www.linkedin.com/in/tareq-islam3149/",
  github:    "https://github.com/tarequlislam332760-collab",
  whatsapp:  "https://wa.me/8801732483149",
  stat1n:"2+", stat1l:"Projects Live",
  stat2n:"3+", stat2l:"Years Exp",
  stat3n:"20+", stat3l:"Clients",
  stat4n:"15+", stat4l:"Technologies",
};

// Dynamic social link component using profile data
function ProfileSocialLink({ url, color, hoverColor, bgColor, children, size = 42 }) {
  const [hovered, setHovered] = React.useState(false);
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: 12, display: "inline-flex",
        alignItems: "center", justifyContent: "center", textDecoration: "none",
        background: hovered ? bgColor : "rgba(255,255,255,0.06)",
        border: `1px solid ${hovered ? color : "rgba(255,255,255,0.1)"}`,
        transform: hovered ? "translateY(-3px) scale(1.1)" : "none",
        transition: "all 0.25s ease", flexShrink: 0,
      }}>
      {children}
    </a>
  );
}

function ProfileSocialLinks({ profile, size = 42 }) {
  const links = [
    { key: "facebook",  color: "#1877F2", bg: "rgba(24,119,242,0.15)",  icon: <svg width={Math.round(size*0.46)} height={Math.round(size*0.46)} viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854V15.54H7.078v-3.467h3.047V9.41c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.49 0-1.955.925-1.955 1.874v2.252h3.328l-.532 3.467h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { key: "instagram", color: "#E1306C", bg: "rgba(225,48,108,0.15)",  icon: <svg width={Math.round(size*0.46)} height={Math.round(size*0.46)} viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#E1306C"/><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="#fff"/></svg> },
    { key: "linkedin",  color: "#0A66C2", bg: "rgba(10,102,194,0.15)",  icon: <svg width={Math.round(size*0.46)} height={Math.round(size*0.46)} viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7.115 9h2.77v9.5h-2.77V9zM8.5 7.7c-.9 0-1.5-.6-1.5-1.35S7.6 5 8.5 5s1.5.6 1.5 1.35-.6 1.35-1.5 1.35zM11.5 9h2.65v1.3h.04c.37-.7 1.27-1.45 2.62-1.45 2.8 0 3.32 1.84 3.32 4.24V18.5h-2.77v-4.86c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57V18.5H11.5V9z"/></svg> },
    { key: "github",    color: "#fff",    bg: "rgba(255,255,255,0.12)", icon: <svg width={Math.round(size*0.46)} height={Math.round(size*0.46)} viewBox="0 0 24 24"><path fill="#fff" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.07 0 0 .98-.31 3.2 1.19a11 11 0 015.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.77.11 3.07.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg> },
    { key: "whatsapp",  color: "#25D366", bg: "rgba(37,211,102,0.15)",  icon: <svg width={Math.round(size*0.46)} height={Math.round(size*0.46)} viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  ];

  const active = links.filter(l => profile[l.key]);
  if (active.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {active.map(l => (
        <ProfileSocialLink key={l.key} url={profile[l.key]} color={l.color} bgColor={l.bg} size={size}>
          {l.icon}
        </ProfileSocialLink>
      ))}
    </div>
  );
}

export default function About() {
  const nav = useNavigate();
  const [profile, setProfile] = useState(DEFAULT);

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        const d = res.data?.data || res.data;
        if (d) setProfile(prev => ({ ...prev, ...d }));
      })
      .catch(() => {});
  }, []);

  const stats = [
    [profile.stat1n||"2+", profile.stat1l||"Projects Live"],
    [profile.stat2n||"3+", profile.stat2l||"Years Exp"],
    [profile.stat3n||"20+", profile.stat3l||"Clients"],
    [profile.stat4n||"15+", profile.stat4l||"Technologies"],
  ];

  const infoGrid = [
    ["👤 Name",     profile.name],
    ["💼 Role",     profile.infoRole || "MERN Developer"],
    ["📍 Location", profile.location],
    ["🌐 Work",     profile.infoWork || "Remote Worldwide"],
    ["📧 Email",    profile.email],
    ["📱 Phone",    profile.phone],
  ];

  return (
    <main style={{ minHeight:"100vh", paddingTop:68, background:"#050A14" }}>
      <SEO title="About Tarikul Islam Tarek | MERN Developer" description="Learn about Tarikul Islam Tarek - MERN Full Stack Developer and Digital Marketing Specialist based in Sylhet, Bangladesh." />

      <div style={{ padding:"clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth:1100, margin:"0 auto" }}>
        <SectionTitle pre="Who I Am" title="About" highlight="Me" />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.3fr", gap:"clamp(30px,5vw,60px)", alignItems:"center" }} className="about-inner">

          {/* ── Image (social icons সরানো হয়েছে) ── */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:"clamp(220px,26vw,290px)" }}>
              <div style={{ position:"absolute", inset:-3, borderRadius:24, background:"linear-gradient(135deg,#00D4AA,#38BDF8,#818CF8)", padding:3, zIndex:0 }}>
                <div style={{ borderRadius:22, background:"#050A14", width:"100%", height:"100%" }} />
              </div>
              <div style={{ position:"relative", borderRadius:20, overflow:"hidden", aspectRatio:"4/5", background:"linear-gradient(135deg,#0d1829,#0a1220)", zIndex:1 }}>
                {profile.image ? (
                  <img src={profile.image} alt={profile.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                ) : (
                  <img src="/profile.png" alt={profile.name}
                    onError={e => { e.target.style.display="none"; }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                )}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(5,10,20,0.5),transparent 60%)" }} />
              </div>
              {/* Badge */}
              <div style={{ position:"absolute", bottom:-18, right:-18, background:"#0d1829", border:"2px solid #00D4AA", borderRadius:14, padding:"12px 16px", textAlign:"center", boxShadow:"0 8px 30px rgba(0,0,0,0.4)", zIndex:2 }}>
                <div style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"1.5rem", color:"#00D4AA" }}>{profile.stat1n||"2+"}</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.72rem" }}>{profile.stat1l||"Projects Live"}</div>
              </div>
            </div>
          </div>

          {/* ── Info ── */}
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:"clamp(1.5rem,3vw,2rem)", marginBottom:"0.3rem", color:"#fff" }}>{profile.name}</h3>
            <div style={{ color:"#00D4AA", fontWeight:600, marginBottom:"0.4rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.title}</div>
            {profile.subtitle && <div style={{ color:"rgba(255,255,255,0.4)", fontWeight:500, marginBottom:"1.3rem", fontSize:"0.85rem", fontFamily:"var(--font-body)" }}>{profile.subtitle}</div>}

            {profile.bio  && <p style={{ color:"rgba(255,255,255,0.45)", lineHeight:1.9, marginBottom:"0.9rem", fontSize:"0.93rem", fontFamily:"var(--font-body)" }}>{profile.bio}</p>}
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

            {/* Stats */}
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

            {/* Buttons + Social Icons পাশাপাশি */}
            <div style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => nav("/contact")}
                style={{ background:"linear-gradient(135deg,#00D4AA,#38BDF8)", color:"#050A14", border:"none", borderRadius:10, padding:"13px 26px", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", fontFamily:"var(--font-body)", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 22px rgba(0,212,170,0.38)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
                Let's Talk 👋
              </button>
              {/* DB থেকে social links — admin এ add করলে এখানে দেখাবে */}
              <ProfileSocialLinks profile={profile} size={42} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.about-inner{grid-template-columns:1fr!important;gap:3rem!important}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>
    </main>
  );
}
