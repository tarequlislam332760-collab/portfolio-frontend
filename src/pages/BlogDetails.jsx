
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function BlogDetails() {
  const { id } = useParams();
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <div style={{ maxWidth:'700px',margin:'0 auto',padding:'0 5%' }}>
        <Link to="/blog">
          <button style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#888',padding:'10px 20px',cursor:'pointer',marginBottom:'40px',fontSize:'14px' }}>← Back to Blog</button>
        </Link>
        <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'12px',padding:'4px 14px',borderRadius:'20px',fontWeight:'600' }}>React</span>
        <h1 style={{ fontFamily:'Syne,sans-serif',color:'#fff',fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'20px 0 16px',lineHeight:'1.2' }}>Blog Post #{id}</h1>
        <p style={{ color:'#555',fontSize:'14px',marginBottom:'40px' }}>8 min read • March 2025</p>
        <p style={{ color:'#8888aa',fontSize:'16px',lineHeight:'1.9',marginBottom:'24px' }}>This blog post content will be loaded dynamically from the backend API once connected. The admin can create and manage posts from the dashboard.</p>
        <p style={{ color:'#6666aa',fontSize:'16px',lineHeight:'1.9' }}>Stay tuned for more articles about React, Node.js, MongoDB, and Digital Marketing.</p>
      </div>
    </motion.div>
  );
}
