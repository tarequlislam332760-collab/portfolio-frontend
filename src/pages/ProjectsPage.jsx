
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const projects = [
  { id:'1',emoji:'🚀',title:'MERN E-Commerce',desc:'Full-featured online store with cart, payment & admin panel.',tech:['React','Node.js','MongoDB','Stripe'],cat:'Full Stack',live:'#',github:'#' },
  { id:'2',emoji:'📊',title:'Admin Dashboard',desc:'Analytics dashboard with charts, user management & reports.',tech:['React','Express','Chart.js'],cat:'Full Stack',live:'#',github:'#' },
  { id:'3',emoji:'🌐',title:'Portfolio Website',desc:'Personal portfolio with dark theme, animations & admin panel.',tech:['React','Framer Motion'],cat:'Frontend',live:'#',github:'#' },
  { id:'4',emoji:'📈',title:'SEO Campaign',desc:'Full SEO strategy that ranked client site on Google page 1.',tech:['SEO','Google Analytics','Ads'],cat:'Marketing',live:'#',github:'#' },
];
const cats = ['All','Full Stack','Frontend','Marketing'];
export default function ProjectsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.cat === active);
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{`@media(max-width:768px){.proj-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 5%' }}>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} style={{ marginBottom:'60px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,#6366f1,#ec4899)' }}/>
            <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600',letterSpacing:'3px' }}>PORTFOLIO</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:'800',color:'#fff',marginBottom:'32px' }}>Featured Projects</h1>
          <div style={{ display:'flex',gap:'10px',flexWrap:'wrap' }}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setActive(c)}
                style={{ padding:'8px 20px',borderRadius:'50px',border:active===c?'1px solid #6366f1':'1px solid rgba(255,255,255,0.1)',background:active===c?'rgba(99,102,241,0.15)':'transparent',color:active===c?'#6366f1':'#666',cursor:'pointer',fontSize:'14px',fontWeight:'500',transition:'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="proj-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px' }}>
          {filtered.map((p,i)=>(
            <motion.div key={p.id} initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }} whileHover={{ y:-8 }}
              style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',overflow:'hidden',cursor:'pointer' }}>
              <div style={{ height:'160px',background:'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(236,72,153,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'60px' }}>{p.emoji}</div>
              <div style={{ padding:'24px' }}>
                <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'11px',padding:'3px 10px',borderRadius:'20px',fontWeight:'600' }}>{p.cat}</span>
                <h3 style={{ color:'#fff',fontSize:'18px',fontWeight:'700',margin:'12px 0 8px' }}>{p.title}</h3>
                <p style={{ color:'#666',fontSize:'13px',lineHeight:'1.6',marginBottom:'16px' }}>{p.desc}</p>
                <div style={{ display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'16px' }}>
                  {p.tech.map((t,j)=>(<span key={j} style={{ fontSize:'11px',padding:'3px 10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'20px',color:'#888' }}>{t}</span>))}
                </div>
                <div style={{ display:'flex',gap:'10px' }}>
                  <a href={p.live} target="_blank" style={{ flex:1,padding:'9px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:'10px',color:'#fff',fontSize:'12px',fontWeight:'700',textAlign:'center',textDecoration:'none' }}>Live Demo</a>
                  <a href={p.github} target="_blank" style={{ flex:1,padding:'9px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#aaa',fontSize:'12px',textAlign:'center',textDecoration:'none' }}>GitHub</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
