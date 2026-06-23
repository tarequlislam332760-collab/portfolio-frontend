
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const projects = [
  { id:'1',emoji:'🚀',title:'MERN E-Commerce',desc:'A full-featured e-commerce platform built with MERN stack. Includes product management, cart system, payment integration with Stripe, and a complete admin panel.',tech:['React','Node.js','MongoDB','Express','Stripe','JWT'],live:'#',github:'#' },
  { id:'2',emoji:'📊',title:'Admin Dashboard',desc:'A comprehensive analytics dashboard with real-time data visualization, user management, role-based access control, and detailed reporting features.',tech:['React','Express','MongoDB','Chart.js','JWT'],live:'#',github:'#' },
];
export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id) || projects[0];
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'0 5%' }}>
        <Link to="/projects">
          <button style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#888',padding:'10px 20px',cursor:'pointer',marginBottom:'40px',fontSize:'14px' }}>← Back to Projects</button>
        </Link>
        <div style={{ fontSize:'80px',marginBottom:'24px' }}>{project.emoji}</div>
        <h1 style={{ fontFamily:'Syne,sans-serif',color:'#fff',fontSize:'clamp(32px,5vw,52px)',fontWeight:'800',marginBottom:'20px' }}>{project.title}</h1>
        <p style={{ color:'#8888aa',fontSize:'17px',lineHeight:'1.8',marginBottom:'32px',maxWidth:'650px' }}>{project.desc}</p>
        <div style={{ display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'40px' }}>
          {project.tech.map((t,i)=>(<span key={i} style={{ padding:'6px 16px',background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.25)',borderRadius:'20px',color:'#6366f1',fontSize:'13px',fontWeight:'600' }}>{t}</span>))}
        </div>
        <div style={{ display:'flex',gap:'16px' }}>
          <a href={project.live} target="_blank" style={{ padding:'14px 32px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:'50px',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'15px' }}>Live Demo</a>
          <a href={project.github} target="_blank" style={{ padding:'14px 32px',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'50px',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'15px' }}>GitHub</a>
        </div>
      </div>
    </motion.div>
  );
}
