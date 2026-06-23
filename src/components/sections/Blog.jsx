import{motion}from'framer-motion';
const POSTS=[
{emoji:'⚛️',cat:'React',title:'React 19 Features You Need to Know',desc:'Deep dive into Server Components, new hooks, and performance improvements in React 19.',date:'Mar 2025',read:'6 min'},
{emoji:'🍃',cat:'MongoDB',title:'Advanced MongoDB Aggregation Pipelines',desc:'Master complex data transformations using lookup, unwind, and facet stages.',date:'Feb 2025',read:'8 min'},
{emoji:'📈',cat:'SEO',title:'Complete SEO Guide for 2025',desc:'Technical and content SEO strategies to dominate Google search rankings this year.',date:'Jan 2025',read:'10 min'},
];
const Blog=({navigate})=>(
<section id='blog' style={{padding:'120px clamp(20px,5vw,80px)',background:'#050A14',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(56,189,248,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#38BDF8',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Blog</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>Latest <span style={{background:'linear-gradient(135deg,#38BDF8,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Articles</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px'}}>
{POSTS.map((p,i)=>(
<motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-8}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',overflow:'hidden',cursor:'pointer',transition:'all 0.35s'}}>
<div style={{padding:'32px 28px 0'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
<span style={{background:'rgba(56,189,248,0.1)',border:'1px solid rgba(56,189,248,0.2)',borderRadius:'99px',padding:'4px 12px',color:'#38BDF8',fontSize:'11px',fontWeight:'700',letterSpacing:'0.5px',fontFamily:'"DM Sans",sans-serif'}}>{p.cat}</span>
<span style={{color:'rgba(255,255,255,0.25)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{p.read} read</span>
</div>
<div style={{fontSize:'48px',marginBottom:'16px'}}>{p.emoji}</div>
<h3 style={{color:'#fff',fontSize:'17px',fontWeight:'700',lineHeight:'1.35',marginBottom:'12px',fontFamily:'"Syne",sans-serif'}}>{p.title}</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',lineHeight:'1.7',fontFamily:'"DM Sans",sans-serif'}}>{p.desc}</p>
</div>
<div style={{padding:'20px 28px',borderTop:'1px solid rgba(255,255,255,0.05)',marginTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{p.date}</span>
<motion.span whileHover={{x:4}} style={{color:'#38BDF8',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'"DM Sans",sans-serif'}}>Read More →</motion.span>
</div>
</motion.div>
))}
</div>
</div>
</section>
);
export default Blog;