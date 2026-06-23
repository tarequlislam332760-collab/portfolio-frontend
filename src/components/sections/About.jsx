import{motion}from'framer-motion';
const STATS=[{n:'3+',l:'Years Experience'},{n:'2+',l:'Live on Vercel'},{n:'20+',l:'Happy Clients'},{n:'15+',l:'Technologies'}];
const About=()=>(
<section id='about' style={{padding:'120px clamp(20px,5vw,80px)',background:'#07101E',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(0,212,170,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#00D4AA',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>About Me</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif',lineHeight:1.1}}>The Developer Behind<br/><span style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>The Code</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center'}}>
<motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
<div style={{position:'relative',borderRadius:'28px',overflow:'hidden',aspectRatio:'4/5',background:'linear-gradient(135deg,#0d1829,#0a1420)',border:'1px solid rgba(0,212,170,0.12)'}}>
<img src='/profile.png' alt='Tarikul Islam Tarek' style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}}
onError={e=>{e.target.style.display='none';}}/>
<div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,10,20,0.7) 0%,transparent 50%)'}}/>
<div style={{position:'absolute',bottom:'24px',left:'24px',right:'24px'}}>
<div style={{background:'rgba(5,10,20,0.85)',backdropFilter:'blur(20px)',border:'1px solid rgba(0,212,170,0.2)',borderRadius:'16px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'14px'}}>
<div style={{width:'42px',height:'42px',borderRadius:'50%',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>👨‍💻</div>
<div><div style={{color:'#fff',fontWeight:'700',fontSize:'14px',fontFamily:'"Syne",sans-serif'}}>Tarikul Islam Tarek</div><div style={{color:'#00D4AA',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>MERN Developer & Digital Marketer</div></div>
</div>
</div>
</div>
</motion.div>
<motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1}}>
<h3 style={{color:'#fff',fontSize:'clamp(22px,2.5vw,32px)',fontWeight:'800',marginBottom:'20px',fontFamily:'"Syne",sans-serif',lineHeight:1.2}}>Passionate about building impactful web products</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'15px',lineHeight:'1.85',marginBottom:'16px',fontFamily:'"DM Sans",sans-serif'}}>
I'm a MERN Full Stack Developer and Digital Marketing Specialist based in Bangladesh. I specialize in building modern, scalable web applications with React, Node.js, Express, and MongoDB.
</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'15px',lineHeight:'1.85',marginBottom:'40px',fontFamily:'"DM Sans",sans-serif'}}>
I've built and deployed multiple full-stack projects on Vercel — combining technical depth with strategic digital marketing to help businesses grow online.
</p>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
{STATS.map((s,i)=>(
<motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1+0.2}} whileHover={{y:-4,borderColor:'rgba(0,212,170,0.3)'}}
style={{background:'rgba(0,212,170,0.04)',border:'1px solid rgba(0,212,170,0.12)',borderRadius:'16px',padding:'20px',transition:'all 0.3s'}}>
<div style={{fontSize:'28px',fontWeight:'900',color:'#fff',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.5px'}}>{s.n}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px',fontFamily:'"DM Sans",sans-serif',letterSpacing:'0.3px'}}>{s.l}</div>
</motion.div>
))}
</div>
</motion.div>
</div>
</div>
</section>
);
export default About;