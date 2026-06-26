import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import SEO from "../components/SEO";
import { messagesAPI, profileAPI } from "../services/api";

const SOCIAL_CFG = [
  { key:"facebook",  color:"#1877F2", bg:"rgba(24,119,242,0.15)",  icon:<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854V15.54H7.078v-3.467h3.047V9.41c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.49 0-1.955.925-1.955 1.874v2.252h3.328l-.532 3.467h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { key:"instagram", color:"#E1306C", bg:"rgba(225,48,108,0.15)",  icon:<svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#E1306C"/><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="#fff"/></svg> },
  { key:"linkedin",  color:"#0A66C2", bg:"rgba(10,102,194,0.15)",  icon:<svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7.115 9h2.77v9.5h-2.77V9zM8.5 7.7c-.9 0-1.5-.6-1.5-1.35S7.6 5 8.5 5s1.5.6 1.5 1.35-.6 1.35-1.5 1.35zM11.5 9h2.65v1.3h.04c.37-.7 1.27-1.45 2.62-1.45 2.8 0 3.32 1.84 3.32 4.24V18.5h-2.77v-4.86c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57V18.5H11.5V9z"/></svg> },
  { key:"github",    color:"#fff",    bg:"rgba(255,255,255,0.12)", icon:<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.07 0 0 .98-.31 3.2 1.19a11 11 0 015.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.77.11 3.07.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg> },
  { key:"whatsapp",  color:"#25D366", bg:"rgba(37,211,102,0.15)",  icon:<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
];

export default function Contact() {
  const [form, setForm]       = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [profile, setProfile] = useState({
    email:"tareq.islam.dev@gmail.com", phone:"+880 1732-483149", location:"Sylhet, Bangladesh",
    facebook:"https://www.facebook.com/profile.php?id=61585040426028",
    instagram:"https://www.instagram.com/tareq23337/",
    linkedin:"https://www.linkedin.com/in/tareq-islam3149/",
    github:"https://github.com/tarequlislam332760-collab",
    whatsapp:"",
    available:true,
  });

  useEffect(() => {
    profileAPI.get().then(res => {
      const d = res.data?.data || res.data;
      if (d) setProfile(prev => ({ ...prev, ...d }));
    }).catch(() => {});
  }, []);

  const inp   = e => setForm({ ...form, [e.target.name]: e.target.value });
  const focus = e => e.target.style.borderColor = "#00D4AA";
  const blur  = e => e.target.style.borderColor = "rgba(255,255,255,0.09)";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await messagesAPI.send(form);
      setSent(true);
      setForm({ name:"", email:"", subject:"", message:"" });
    } catch (err) {
      setError(err.message || "Message পাঠাতে সমস্যা হয়েছে।");
    } finally { setLoading(false); }
  };

  const inputSt = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)",
    borderRadius:12, padding:"14px 18px", color:"#fff", fontSize:"0.92rem",
    fontFamily:"var(--font-body)", outline:"none", marginBottom:"1rem",
    transition:"border-color 0.2s", boxSizing:"border-box",
  };

  const contactInfo = [
    { icon:"📧", label:"Email",    value:profile.email,    href:`mailto:${profile.email}` },
    { icon:"📱", label:"Phone",    value:profile.phone,    href:`tel:${profile.phone?.replace(/[^+\d]/g,"")}` },
    { icon:"📍", label:"Location", value:profile.location, href:null },
  ];

  const activeSocials = SOCIAL_CFG.filter(s => profile[s.key]);

  return (
    <main style={{ minHeight:"100vh", paddingTop:68, background:"#050A14" }}>
      <SEO title="Contact Tarikul Islam Tarek | Hire MERN Developer" description="Get in touch with Tarikul Islam Tarek for MERN development and digital marketing projects." />
      <div style={{ padding:"clamp(50px,7vw,90px) clamp(20px,5vw,80px)", maxWidth:1100, margin:"0 auto" }}>
        <SectionTitle pre="Get In Touch" title="Let's Work" highlight="Together" sub="Available for freelance projects and full-time opportunities" />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"clamp(24px,4vw,60px)", alignItems:"start" }} className="contact-grid">
          <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>

            {/* Contact info */}
            {contactInfo.map((c,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:16, padding:"15px 18px", background:"rgba(0,212,170,0.04)", border:"1px solid rgba(0,212,170,0.1)", borderRadius:14, transition:"border-color 0.2s,transform 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(0,212,170,0.25)"; e.currentTarget.style.transform="translateX(4px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(0,212,170,0.1)"; e.currentTarget.style.transform="none"; }}>
                <span style={{ fontSize:"1.3rem", flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:3 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.88rem", fontFamily:"var(--font-body)", textDecoration:"none" }}>{c.value}</a>
                  ) : (
                    <span style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.88rem", fontFamily:"var(--font-body)" }}>{c.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social Icons — DB থেকে */}
            {activeSocials.length > 0 && (
              <div style={{ padding:"15px 18px", background:"rgba(0,212,170,0.04)", border:"1px solid rgba(0,212,170,0.1)", borderRadius:14 }}>
                <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", fontFamily:"var(--font-body)", marginBottom:12 }}>Follow Me</div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {activeSocials.map(s => {
                    const [hov, setHov] = React.useState(false);
                    return (
                      <a key={s.key} href={profile[s.key]} target="_blank" rel="noopener noreferrer"
                        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                        style={{ width:42, height:42, borderRadius:12, display:"inline-flex", alignItems:"center", justifyContent:"center", textDecoration:"none", background:hov?s.bg:"rgba(255,255,255,0.06)", border:`1px solid ${hov?s.color:"rgba(255,255,255,0.1)"}`, transform:hov?"translateY(-3px) scale(1.1)":"none", transition:"all 0.25s", flexShrink:0 }}>
                        {s.icon}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {profile.available && (
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 18px", background:"rgba(0,212,170,0.06)", border:"1px solid rgba(0,212,170,0.15)", borderRadius:12 }}>
                <span style={{ width:9, height:9, borderRadius:"50%", background:"#00D4AA", animation:"pulse 1.8s infinite", flexShrink:0 }} />
                <span style={{ color:"#00D4AA", fontSize:"0.84rem", fontWeight:600, fontFamily:"var(--font-body)" }}>Available for hire — Response within 24h</span>
              </div>
            )}
          </div>

          <div>
            {sent ? (
              <div style={{ background:"rgba(0,212,170,0.06)", border:"2px solid rgba(0,212,170,0.25)", borderRadius:24, padding:"3rem", textAlign:"center" }}>
                <div style={{ fontSize:"3.5rem", marginBottom:"1rem" }}>✅</div>
                <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"1.3rem", color:"#00D4AA", marginBottom:"0.5rem" }}>Message Sent!</h3>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.9rem", fontFamily:"var(--font-body)" }}>আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={() => setSent(false)} style={{ marginTop:"1.5rem", background:"transparent", color:"#00D4AA", border:"1.5px solid #00D4AA", borderRadius:9, padding:"10px 24px", fontWeight:700, cursor:"pointer", fontFamily:"var(--font-body)" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, padding:"clamp(24px,3vw,40px)" }}>
                {error && <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"12px 16px", marginBottom:"1rem", color:"#f87171", fontSize:"0.88rem", fontFamily:"var(--font-body)" }}>⚠️ {error}</div>}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }} className="form-grid">
                  <input name="name"  placeholder="Your Name *"  value={form.name}  onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                  <input name="email" type="email" placeholder="Email *" value={form.email} onChange={inp} required style={inputSt} onFocus={focus} onBlur={blur} />
                </div>
                <input name="subject" placeholder="Subject" value={form.subject} onChange={inp} style={inputSt} onFocus={focus} onBlur={blur} />
                <textarea name="message" placeholder="Your Message *" value={form.message} onChange={inp} required rows={5} style={{ ...inputSt, resize:"vertical" }} onFocus={focus} onBlur={blur} />
                <button type="submit" disabled={loading}
                  style={{ width:"100%", background:loading?"rgba(0,212,170,0.5)":"linear-gradient(135deg,#00D4AA,#38BDF8)", border:"none", color:"#050A14", padding:16, borderRadius:12, cursor:loading?"not-allowed":"pointer", fontWeight:800, fontSize:"1rem", fontFamily:"var(--font-body)", transition:"all 0.2s" }}>
                  {loading ? "Sending..." : "Send Message 🚀"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}.form-grid{grid-template-columns:1fr!important}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>
    </main>
  );
}
