import{useState}from'react';
import{motion,AnimatePresence}from'framer-motion';
const REVIEWS=[
{name:'Ariful Islam',role:'CEO, TechBD',text:'Tarek delivered our platform on time with exceptional quality. The code is clean, scalable, and the UI exceeded our expectations.',avatar:'🧑‍💼'},
{name:'Sarah Mitchell',role:'Founder, DesignHub',text:'Working with Tarek on our marketing strategy was a game-changer. Our conversion rate increased by 40% in just 3 months.',avatar:'👩‍💻'},
{name:'Karim Hossain',role:'CTO, StartupDhaka',text:'Outstanding full-stack skills. Tarek built our entire backend in Node.js and Express — fast, secure, and well-documented.',avatar:'👨‍💼'},
];
const Testimonials=()=>{
const[ci,setCi]=useState(0);
return(
<section id='testimonials' style={{padding:'120px clamp(20px,5vw,80px)',background:'#07101E',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(244,114,182,0.3),transparent)'}}/>
<div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:'60px'}}>
<span style={{color:'#f472b6',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Testimonials</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>Client <span style={{background:'linear-gradient(135deg,#f472b6,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Reviews</span></h2>
</motion.div>
<AnimatePresence mode='wait'>
<motion.div key={ci} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.4}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'28px',padding:'48px',marginBottom:'32px',position:'relative'}}>
<div style={{position:'absolute',top:'24px',left:'28px',fontSize:'64px',color:'rgba(0,212,170,0.12)',fontFamily:'Georgia',lineHeight:1}}>"</div>
<p style={{color:'rgba(255,255,255,0.7)',fontSize:'clamp(15px,1.8vw,18px)',lineHeight:'1.8',fontStyle:'italic',marginBottom:'36px',fontFamily:'"DM Sans",sans-serif',position:'relative',zIndex:1,textAlign:'left'}}>
"{REVIEWS[ci].text}"
</p>
<div style={{display:'flex',alignItems:'center',gap:'16px'}}>
<div style={{width:'52px',height:'52px',borderRadius:'50%',background:'linear-gradient(135deg,#00D4AA22,#38BDF822)',border:'1px solid rgba(0,212,170,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>{REVIEWS[ci].avatar}</div>
<div style={{textAlign:'left'}}>
<div style={{color:'#fff',fontWeight:'700',fontSize:'15px',fontFamily:'"Syne",sans-serif'}}>{REVIEWS[ci].name}</div>
<div style={{color:'#00D4AA',fontSize:'13px',fontFamily:'"DM Sans",sans-serif',marginTop:'2px'}}>{REVIEWS[ci].role}</div>
</div>
<div style={{marginLeft:'auto',color:'#f59e0b',fontSize:'18px',letterSpacing:'2px'}}>★★★★★</div>
</div>
</motion.div>
</AnimatePresence>
<div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
{REVIEWS.map((_,i)=>(
<motion.button key={i} onClick={()=>setCi(i)} whileHover={{scale:1.2}}
style={{width:i===ci?'28px':'8px',height:'8px',borderRadius:'99px',background:i===ci?'linear-gradient(90deg,#00D4AA,#38BDF8)':'rgba(255,255,255,0.15)',border:'none',cursor:'pointer',padding:0,transition:'all 0.35s'}}/>
))}
</div>
</div>
</section>
);};
export default Testimonials;