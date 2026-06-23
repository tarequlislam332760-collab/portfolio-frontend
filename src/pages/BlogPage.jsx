
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const posts = [
  { id:'1',emoji:'⚛️',title:'React 19 New Features Guide',excerpt:'Complete guide to all new features in React 19 including server components.',cat:'React',date:'Mar 2025',time:'8' },
  { id:'2',emoji:'🍃',title:'MongoDB Aggregation Pipeline',excerpt:'Advanced aggregation techniques for complex data queries.',cat:'MongoDB',date:'Feb 2025',time:'6' },
  { id:'3',emoji:'📈',title:'SEO Complete Guide 2025',excerpt:'Step by step guide to rank your website on Google page 1.',cat:'SEO',date:'Jan 2025',time:'10' },
  { id:'4',emoji:'⚡',title:'Node.js Performance Tips',excerpt:'Optimize your Node.js app for maximum performance.',cat:'Node.js',date:'Dec 2024',time:'7' },
  { id:'5',emoji:'🎨',title:'Tailwind CSS Best Practices',excerpt:'Write cleaner, more maintainable Tailwind CSS code.',cat:'CSS',date:'Nov 2024',time:'5' },
  { id:'6',emoji:'🚀',title:'Deploying MERN on Vercel',excerpt:'Complete guide to deploy your MERN stack on Vercel for free.',cat:'DevOps',date:'Oct 2024',time:'9' },
];
export default function BlogPage() {
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{`@media(max-width:768px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 5%' }}>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} style={{ marginBottom:'60px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,#6366f1,#ec4899)' }}/>
            <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600',letterSpacing:'3px' }}>BLOG</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:'800',color:'#fff' }}>Latest Articles</h1>
        </motion.div>
        <div className="blog-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px' }}>
          {posts.map((p,i)=>(
            <motion.div key={p.id} initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }} whileHover={{ y:-6 }}>
              <Link to={"/blog/"+p.id} style={{ textDecoration:'none' }}>
                <div style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',overflow:'hidden',cursor:'pointer',height:'100%' }}>
                  <div style={{ height:'120px',background:'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(236,72,153,0.08))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px' }}>{p.emoji}</div>
                  <div style={{ padding:'24px' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px' }}>
                      <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'11px',padding:'3px 10px',borderRadius:'20px',fontWeight:'600' }}>{p.cat}</span>
                      <span style={{ color:'#444',fontSize:'12px' }}>{p.time} min read</span>
                    </div>
                    <h3 style={{ color:'#fff',fontSize:'16px',fontWeight:'700',marginBottom:'10px',lineHeight:'1.4' }}>{p.title}</h3>
                    <p style={{ color:'#666',fontSize:'13px',lineHeight:'1.6',marginBottom:'16px' }}>{p.excerpt}</p>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ color:'#444',fontSize:'12px' }}>{p.date}</span>
                      <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600' }}>Read More →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
