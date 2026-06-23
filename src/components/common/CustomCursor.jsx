import{useEffect,useState}from'react';
import{motion}from'framer-motion';
const CustomCursor=()=>{
const[pos,setPos]=useState({x:-100,y:-100});
const[hov,setHov]=useState(false);
useEffect(()=>{
const m=e=>{setPos({x:e.clientX,y:e.clientY});};
const over=e=>{if(e.target.closest('button,a,[role=button]'))setHov(true);};
const out=()=>setHov(false);
window.addEventListener('mousemove',m);
window.addEventListener('mouseover',over);
window.addEventListener('mouseout',out);
return()=>{window.removeEventListener('mousemove',m);window.removeEventListener('mouseover',over);window.removeEventListener('mouseout',out);};
},[]);
return(
<>
<motion.div animate={{x:pos.x-4,y:pos.y-4,scale:hov?2:1}} transition={{type:'spring',stiffness:800,damping:40}}
style={{position:'fixed',width:'8px',height:'8px',borderRadius:'50%',background:'#00D4AA',pointerEvents:'none',zIndex:99999,mixBlendMode:'difference'}}/>
<motion.div animate={{x:pos.x-16,y:pos.y-16,scale:hov?1.5:1}} transition={{type:'spring',stiffness:200,damping:30}}
style={{position:'fixed',width:'32px',height:'32px',borderRadius:'50%',border:'1.5px solid rgba(0,212,170,0.4)',pointerEvents:'none',zIndex:99998}}/>
</>
);};
export default CustomCursor;