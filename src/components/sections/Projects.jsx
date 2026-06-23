import{motion}from'framer-motion';
const PROJECTS=[
{emoji:'📈',title:'Vinance Dashboard',desc:'Crypto portfolio tracker with real-time price feeds, P&L analytics, and wallet management.',tech:['React','Node.js','MongoDB','Chart.js'],live:'#',github:'#',color:'#00D4AA'},
{emoji:'🛍️',title:'E-Commerce Platform',desc:'Full-featured online store with product management, cart, Stripe payments, and admin panel.',tech:['Next.js','Express','MongoDB','Stripe'],live:'#',github:'#',color:'#38BDF8'},
];
const Projects=({navigate})=>(
<section id='projects' style={{padding:'120px clamp(20px,5vw,80px)',background:'#050A14',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(0,212,170,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#00D4AA',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Portfolio</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>Live <span style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Projects</span></h2>
<p style={{color:'rgba(255,255,255,0.4)',marginTop:'16px',fontSize:'15px',fontFamily:'"DM Sans",sans-serif'}}>Deployed on Vercel — real products, real users</p>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'32px',maxWidth:'900px',margin:'0 auto'}}>
{PROJECTS.map((p,i)=>(
<motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.15}} whileHover={{y:-10}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'28px',overflow:'hidden',transition:'all 0.4s',boxShadow:'0 0 0 rgba(0,0,0,0)'}}>
<div style={{height:'180px',background:'linear-gradient(135deg,'+p.color+'15,'+p.color+'08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'72px',borderBottom:'1px solid rgba(255,255,255,0.05)',position:'relative'}}>
{p.emoji}
<div style={{position:'absolute',top:'12px',right:'12px',background:'rgba(0,212,170,0.12)',border:'1px solid rgba(0,212,170,0.25)',borderRadius:'8px',padding:'4px 10px',fontSize:'11px',color:'#00D4AA',fontWeight:'700',letterSpacing:'0.5px',fontFamily:'"DM Sans",sans-serif'}}>LIVE ON VERCEL</div>
</div>
<div style={{padding:'28px'}}>
<h3 style={{color:'#fff',fontSize:'20px',fontWeight:'800',marginBottom:'10px',fontFamily:'"Syne",sans-serif'}}>{p.title}</h3>
<p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',lineHeight:'1.7',marginBottom:'20px',fontFamily:'"DM Sans",sans-serif'}}>{p.desc}</p>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
{p.tech.map((t,j)=>(<span key={j} style={{padding:'4px 12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'99px',color:'rgba(255,255,255,0.5)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{t}</span>))}
</div>
<div style={{display:'flex',gap:'10px'}}>
<motion.a href={p.live} target='_blank' rel='noopener noreferrer' whileHover={{scale:1.04}} style={{flex:1,padding:'11px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',borderRadius:'10px',color:'#050A14',fontWeight:'800',fontSize:'13px',cursor:'pointer',textAlign:'center',textDecoration:'none',fontFamily:'"DM Sans",sans-serif',display:'block'}}>🔗 Live Demo</motion.a>
<motion.a href={p.github} target='_blank' rel='noopener noreferrer' whileHover={{scale:1.04}} style={{flex:1,padding:'11px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',color:'rgba(255,255,255,0.6)',fontWeight:'600',fontSize:'13px',cursor:'pointer',textAlign:'center',textDecoration:'none',fontFamily:'"DM Sans",sans-serif',display:'block'}}>⭐ GitHub</motion.a>
</div>
</div>
</motion.div>
))}
</div>
</div>
</section>
);
export default Projects;