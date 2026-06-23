import{motion}from'framer-motion';
import{useState,useEffect}from'react';
const ROLES=['MERN Full Stack Developer','Digital Marketing Specialist','React & Node.js Expert','MongoDB & Express Developer'];
const Hero=({navigate})=>{
const[ri,setRi]=useState(0);
const[visible,setVisible]=useState(true);
useEffect(()=>{
const t=setInterval(()=>{setVisible(false);setTimeout(()=>{setRi(i=>(i+1)%ROLES.length);setVisible(true);},400);},3000);
return()=>clearInterval(t);
},[]);
return(
<section id='home' style={{minHeight:'100vh',display:'flex',alignItems:'center',background:'#050A14',position:'relative',overflow:'hidden',paddingTop:'68px'}}>
{/* BG BLOBS */}
<div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
<motion.div animate={{scale:[1,1.2,1],opacity:[0.15,0.25,0.15]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}
style={{position:'absolute',top:'-20%',left:'-10%',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,#00D4AA33,transparent 70%)',filter:'blur(60px)'}}/>
<motion.div animate={{scale:[1,1.15,1],opacity:[0.1,0.2,0.1]}} transition={{duration:10,repeat:Infinity,ease:'easeInOut',delay:2}}
style={{position:'absolute',bottom:'-20%',right:'-10%',width:'700px',height:'700px',borderRadius:'50%',background:'radial-gradient(circle,#38BDF833,transparent 70%)',filter:'blur(80px)'}}/>
<motion.div animate={{scale:[1,1.3,1],opacity:[0.08,0.15,0.08]}} transition={{duration:12,repeat:Infinity,ease:'easeInOut',delay:4}}
style={{position:'absolute',top:'40%',left:'40%',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,#818cf822,transparent 70%)',filter:'blur(60px)'}}/>
{/* GRID */}
<div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,212,170,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,0.04) 1px,transparent 1px)',backgroundSize:'60px 60px',maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)'}}/>
</div>
<div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 clamp(20px,5vw,80px)',width:'100%',display:'flex',alignItems:'center',gap:'80px',position:'relative',zIndex:1}}>
{/* LEFT TEXT */}
<div style={{flex:1,minWidth:0}}>
<motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'rgba(0,212,170,0.08)',border:'1px solid rgba(0,212,170,0.2)',borderRadius:'99px',padding:'8px 18px',marginBottom:'28px'}}>
<span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#00D4AA',display:'inline-block',boxShadow:'0 0 8px #00D4AA'}}/>
<span style={{color:'#00D4AA',fontSize:'13px',fontWeight:'600',letterSpacing:'1px',fontFamily:'"DM Sans",sans-serif'}}>Available for work</span>
</motion.div>
<motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1,ease:[0.16,1,0.3,1]}}
style={{fontSize:'clamp(38px,5.5vw,72px)',fontWeight:'900',lineHeight:'1.08',color:'#fff',marginBottom:'12px',fontFamily:'"Syne",sans-serif',letterSpacing:'-1.5px'}}>
Hi, I'm<br/>
<span style={{background:'linear-gradient(135deg,#00D4AA 0%,#38BDF8 50%,#818cf8 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',display:'block'}}>Tarikul Islam</span>
<span style={{background:'linear-gradient(135deg,#00D4AA 0%,#38BDF8 50%,#818cf8 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',display:'block'}}>Tarek</span>
</motion.h1>
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}
style={{height:'36px',display:'flex',alignItems:'center',marginBottom:'24px'}}>
<motion.span animate={{opacity:visible?1:0}} transition={{duration:0.3}}
style={{fontSize:'clamp(16px,2.2vw,22px)',color:'#38BDF8',fontWeight:'600',fontFamily:'"DM Sans",sans-serif',letterSpacing:'-0.3px'}}>
{ROLES[ri]}
</motion.span>
</motion.div>
<motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}}
style={{color:'rgba(255,255,255,0.5)',fontSize:'clamp(14px,1.5vw,17px)',lineHeight:'1.75',maxWidth:'500px',marginBottom:'44px',fontFamily:'"DM Sans",sans-serif'}}>
I build high-performance web applications with the MERN stack and help businesses scale through data-driven digital marketing strategies.
</motion.p>
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.4}} style={{display:'flex',gap:'14px',flexWrap:'wrap'}}>
<motion.button onClick={()=>{const el=document.getElementById('projects');if(el)el.scrollIntoView({behavior:'smooth'});}}
whileHover={{scale:1.05,boxShadow:'0 0 32px rgba(0,212,170,0.5)'}} whileTap={{scale:0.97}}
style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',color:'#050A14',padding:'14px 36px',borderRadius:'12px',cursor:'pointer',fontWeight:'800',fontSize:'15px',fontFamily:'"DM Sans",sans-serif',letterSpacing:'0.3px'}}>
View My Work
</motion.button>
<motion.button onClick={()=>{const el=document.getElementById('contact');if(el)el.scrollIntoView({behavior:'smooth'});}}
whileHover={{scale:1.05,borderColor:'#00D4AA',color:'#00D4AA'}} whileTap={{scale:0.97}}
style={{background:'transparent',border:'1.5px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.7)',padding:'14px 36px',borderRadius:'12px',cursor:'pointer',fontWeight:'700',fontSize:'15px',fontFamily:'"DM Sans",sans-serif',transition:'all 0.25s'}}>
Hire Me
</motion.button>
</motion.div>
<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}} style={{display:'flex',gap:'32px',marginTop:'52px'}}>
{[['3+','Years Experience'],['2+','Live Projects'],['∞','Passion for Code']].map(([n,l],i)=>(
<div key={i} style={{textAlign:'center'}}>
<div style={{fontSize:'clamp(22px,3vw,32px)',fontWeight:'900',color:'#fff',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.5px'}}>{n}</div>
<div style={{color:'rgba(255,255,255,0.35)',fontSize:'12px',marginTop:'3px',letterSpacing:'0.5px',fontFamily:'"DM Sans",sans-serif',textTransform:'uppercase'}}>{l}</div>
</div>
))}
</motion.div>
</div>
{/* RIGHT — PROFILE IMAGE */}
<motion.div initial={{opacity:0,scale:0.85,x:40}} animate={{opacity:1,scale:1,x:0}} transition={{duration:0.9,delay:0.2,ease:[0.16,1,0.3,1]}}
style={{flexShrink:0,position:'relative',width:'clamp(280px,32vw,420px)',aspectRatio:'1'}}>
<motion.div animate={{rotate:[0,360]}} transition={{duration:20,repeat:Infinity,ease:'linear'}}
style={{position:'absolute',inset:'-12px',borderRadius:'50%',background:'conic-gradient(from 0deg,#00D4AA,#38BDF8,#818cf8,transparent,#00D4AA)',opacity:0.6}}/>
<motion.div animate={{rotate:[360,0]}} transition={{duration:15,repeat:Infinity,ease:'linear'}}
style={{position:'absolute',inset:'-6px',borderRadius:'50%',background:'conic-gradient(from 180deg,transparent,#38BDF844,transparent,#00D4AA44,transparent)',opacity:0.8}}/>
<div style={{position:'absolute',inset:0,borderRadius:'50%',background:'#050A14'}}/>
<div style={{position:'absolute',inset:'4px',borderRadius:'50%',overflow:'hidden',background:'linear-gradient(135deg,#0d1829,#0a1420)'}}>
<img src='/profile.png' alt='Tarikul Islam Tarek' style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}}
onError={e=>{e.target.style.display='none';e.target.parentElement.innerHTML='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;">👨‍💻</div>';}}/>
</div>
<motion.div animate={{scale:[1,1.4,1],opacity:[0.5,0.8,0.5]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
style={{position:'absolute',inset:'-30px',borderRadius:'50%',background:'radial-gradient(circle,#00D4AA15,transparent 70%)',pointerEvents:'none'}}/>
</motion.div>
</div>
</section>
);};
export default Hero;