import{motion,AnimatePresence}from'framer-motion';
import{useState,useEffect}from'react';
import{useTheme}from'../../context/ThemeContext';
const SECTIONS=['about','skills','services','projects','blog','contact'];
const Navbar=({navigate,currentPath})=>{
const{dark,toggleTheme}=useTheme();
const[scrolled,setScrolled]=useState(false);
const[active,setActive]=useState('');
const[menuOpen,setMenuOpen]=useState(false);
useEffect(()=>{
const h=()=>{
setScrolled(window.scrollY>60);
const found=SECTIONS.find(s=>{const el=document.getElementById(s);if(!el)return false;const r=el.getBoundingClientRect();return r.top<140&&r.bottom>0;});
setActive(found||'');
};
window.addEventListener('scroll',h,{passive:true});
return()=>window.removeEventListener('scroll',h);
},[]);
const go=(id)=>{setMenuOpen(false);const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});};
const goHome=()=>{navigate('home');window.scrollTo({top:0,behavior:'smooth'});};
return(
<>
<motion.nav initial={{y:-80}} animate={{y:0}} transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
style={{position:'fixed',top:0,left:0,right:0,zIndex:999,height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(20px,4vw,60px)',background:scrolled?'rgba(5,10,20,0.97)':'rgba(5,10,20,0.5)',backdropFilter:'blur(28px)',borderBottom:scrolled?'1px solid rgba(0,212,170,0.15)':'1px solid transparent',transition:'all 0.4s ease',boxShadow:scrolled?'0 4px 40px rgba(0,0,0,0.5)':'none'}}>
<motion.div onClick={goHome} whileHover={{scale:1.04}} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'10px'}}>
<div style={{width:'36px',height:'36px',borderRadius:'10px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:'900',color:'#050A14',fontFamily:'monospace',boxShadow:'0 0 20px rgba(0,212,170,0.35)'}}>T</div>
<motion.span animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:5,repeat:Infinity,ease:'linear'}}
style={{fontSize:'17px',fontWeight:'800',background:'linear-gradient(90deg,#00D4AA,#38BDF8,#818cf8,#00D4AA)',backgroundSize:'300%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:'-0.3px',fontFamily:'"Syne",sans-serif'}}>
Tarek.dev
</motion.span>
</motion.div>
<div style={{display:'flex',gap:'2px',alignItems:'center'}}>
{SECTIONS.map(s=>(
<motion.button key={s} onClick={()=>go(s)} whileHover={{y:-1}}
style={{position:'relative',padding:'8px 14px',background:'none',border:'none',cursor:'pointer',color:active===s?'#00D4AA':'rgba(255,255,255,0.5)',fontSize:'13px',fontWeight:active===s?'700':'400',textTransform:'capitalize',letterSpacing:'0.3px',transition:'color 0.2s',fontFamily:'"DM Sans",sans-serif'}}>
{s}
{active===s&&<motion.div layoutId='ul' style={{position:'absolute',bottom:'4px',left:'50%',transform:'translateX(-50%)',height:'2px',width:'20px',borderRadius:'99px',background:'linear-gradient(90deg,#00D4AA,#38BDF8)'}}/>}
</motion.button>
))}
</div>
<div style={{display:'flex',gap:'8px',alignItems:'center'}}>
<motion.button onClick={toggleTheme} whileHover={{scale:1.1,rotate:15}} whileTap={{scale:0.9}}
style={{width:'36px',height:'36px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',cursor:'pointer',fontSize:'16px'}}>
{dark?'☀️':'🌙'}
</motion.button>
<motion.button onClick={()=>navigate('login')}
whileHover={{scale:1.04,boxShadow:'0 0 24px rgba(0,212,170,0.5)'}} whileTap={{scale:0.96}}
style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',color:'#050A14',borderRadius:'10px',padding:'9px 22px',cursor:'pointer',fontWeight:'800',fontSize:'13px',letterSpacing:'0.4px',fontFamily:'"DM Sans",sans-serif'}}>
Dashboard
</motion.button>
</div>
</motion.nav>
<AnimatePresence>
{menuOpen&&<motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} style={{position:'fixed',top:'68px',left:0,right:0,zIndex:998,background:'rgba(5,10,20,0.98)',backdropFilter:'blur(20px)',padding:'20px',borderBottom:'1px solid rgba(0,212,170,0.1)'}}>
{SECTIONS.map(s=>(<button key={s} onClick={()=>go(s)} style={{display:'block',width:'100%',padding:'14px 20px',background:'none',border:'none',color:'rgba(255,255,255,0.7)',fontSize:'15px',cursor:'pointer',textTransform:'capitalize',textAlign:'left',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{s}</button>))}
</motion.div>}
</AnimatePresence>
</>
);};
export default Navbar;