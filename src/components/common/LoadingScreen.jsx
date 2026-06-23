import{motion}from'framer-motion';
import{useEffect}from'react';
const LoadingScreen=({onComplete})=>{
useEffect(()=>{const t=setTimeout(onComplete,2200);return()=>clearTimeout(t);},[]);
return(
<motion.div exit={{opacity:0,scale:1.05}} transition={{duration:0.5}}
style={{position:'fixed',inset:0,background:'#050A14',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:9999}}>
<motion.div animate={{rotate:360}} transition={{duration:2,repeat:Infinity,ease:'linear'}}
style={{width:'64px',height:'64px',borderRadius:'50%',border:'3px solid rgba(0,212,170,0.15)',borderTop:'3px solid #00D4AA',marginBottom:'28px'}}/>
<motion.div animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:3,repeat:Infinity}}
style={{fontSize:'28px',fontWeight:'900',background:'linear-gradient(90deg,#00D4AA,#38BDF8,#818cf8,#00D4AA)',backgroundSize:'300%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.5px'}}>
Tarek.dev
</motion.div>
<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
style={{color:'rgba(255,255,255,0.2)',fontSize:'13px',marginTop:'12px',fontFamily:'"DM Sans",sans-serif',letterSpacing:'2px',textTransform:'uppercase'}}>
Loading portfolio...
</motion.p>
</motion.div>
);};
export default LoadingScreen;