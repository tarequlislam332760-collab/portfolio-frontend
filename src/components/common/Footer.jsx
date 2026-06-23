import{motion}from'framer-motion';
const LINKS=[['About','about'],['Skills','skills'],['Services','services'],['Projects','projects'],['Blog','blog'],['Contact','contact']];
const SOCIALS=[{icon:'🐙',label:'GitHub',url:'https://github.com'},{icon:'💼',label:'LinkedIn',url:'https://linkedin.com'},{icon:'🐦',label:'Twitter',url:'https://twitter.com'},{icon:'📘',label:'Facebook',url:'https://facebook.com'}];
const Footer=({navigate})=>{
const go=(id)=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});};
return(
<footer style={{background:'#03070F',borderTop:'1px solid rgba(0,212,170,0.1)',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'800px',height:'2px',background:'linear-gradient(90deg,transparent,rgba(0,212,170,0.4),rgba(56,189,248,0.4),transparent)'}}/>
<div style={{position:'absolute',top:'-200px',left:'50%',transform:'translateX(-50%)',width:'600px',height:'400px',background:'radial-gradient(ellipse,rgba(0,212,170,0.04),transparent 70%)',pointerEvents:'none'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto',padding:'72px clamp(20px,5vw,80px) 0'}}>
<div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'60px',paddingBottom:'60px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
{/* BRAND */}
<div>
<motion.div onClick={()=>{navigate('home');window.scrollTo({top:0,behavior:'smooth'});}} whileHover={{scale:1.04}} style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
<div style={{width:'42px',height:'42px',borderRadius:'12px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:'900',color:'#050A14',fontFamily:'monospace',boxShadow:'0 0 24px rgba(0,212,170,0.3)'}}>T</div>
<span style={{fontSize:'20px',fontWeight:'900',background:'linear-gradient(90deg,#00D4AA,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.3px'}}>Tarek.dev</span>
</motion.div>
<p style={{color:'rgba(255,255,255,0.35)',fontSize:'14px',lineHeight:'1.85',maxWidth:'320px',marginBottom:'28px',fontFamily:'"DM Sans",sans-serif'}}>
MERN Full Stack Developer & Digital Marketing Specialist. Building modern web apps and helping businesses grow online.
</p>
<div style={{display:'flex',gap:'10px'}}>
{SOCIALS.map((s,i)=>(
<motion.a key={i} href={s.url} target='_blank' rel='noopener noreferrer' whileHover={{y:-3,scale:1.1}} title={s.label}
style={{width:'40px',height:'40px',borderRadius:'10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',cursor:'pointer',textDecoration:'none'}}>
{s.icon}
</motion.a>
))}
</div>
</div>
{/* NAV */}
<div>
<h4 style={{color:'rgba(255,255,255,0.6)',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'24px',fontFamily:'"DM Sans",sans-serif'}}>Navigation</h4>
{LINKS.map(([l,id],i)=>(
<motion.button key={i} onClick={()=>go(id)} whileHover={{x:4,color:'#00D4AA'}}
style={{display:'block',background:'none',border:'none',color:'rgba(255,255,255,0.4)',fontSize:'14px',cursor:'pointer',marginBottom:'12px',padding:0,textAlign:'left',fontFamily:'"DM Sans",sans-serif',transition:'color 0.2s',textTransform:'capitalize'}}>
{l}
</motion.button>
))}
</div>
{/* SERVICES */}
<div>
<h4 style={{color:'rgba(255,255,255,0.6)',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'24px',fontFamily:'"DM Sans",sans-serif'}}>Services</h4>
{['Web Development','Backend APIs','SEO Strategy','Facebook Ads','E-Commerce','Dashboard'].map((s,i)=>(
<div key={i} style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'12px',fontFamily:'"DM Sans",sans-serif'}}>{s}</div>
))}
</div>
</div>
{/* BOTTOM BAR */}
<div style={{padding:'24px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<p style={{color:'rgba(255,255,255,0.2)',fontSize:'13px',fontFamily:'"DM Sans",sans-serif',margin:0}}>
© 2025 Tarikul Islam Tarek. All rights reserved.
</p>
<div style={{display:'flex',gap:'6px',alignItems:'center'}}>
<span style={{color:'rgba(255,255,255,0.15)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>Built with</span>
{['⚛️ React','🍃 MongoDB','⚡ Vite'].map((t,i)=>(<span key={i} style={{color:'rgba(255,255,255,0.25)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{t}</span>))}
</div>
</div>
</div>
</footer>
);};
export default Footer;