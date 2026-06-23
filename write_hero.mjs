import { writeFileSync } from 'fs';
const code = [
  "import{motion}from'framer-motion';",
  "const Hero=({navigate})=>(",
  "<section style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0B1120',paddingTop:'80px'}}>",
  "<motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8}} style={{textAlign:'center',color:'#fff'}}>",
  "<p style={{color:'#00C896',letterSpacing:'3px',fontSize:'13px',fontWeight:'600',marginBottom:'16px'}}>MERN FULL STACK DEVELOPER</p>",
  "<h1 style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:'800',lineHeight:'1.1',marginBottom:'24px'}}>",
  "Hi, I am <span style={{background:'linear-gradient(90deg,#00C896,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Your Name</span>",
  "</h1>",
  "<p style={{color:'#888',fontSize:'18px',maxWidth:'500px',margin:'0 auto 40px'}}>Building modern web apps with React, Node.js, and MongoDB</p>",
  "<div style={{display:'flex',gap:'16px',justifyContent:'center'}}>",
  "<button onClick={()=>navigate('projects')} style={{background:'linear-gradient(135deg,#00C896,#38BDF8)',border:'none',color:'#0B1120',padding:'14px 32px',borderRadius:'50px',cursor:'pointer',fontWeight:'700',fontSize:'15px'}}>View Projects</button>",
  "<button onClick={()=>navigate('contact')} style={{background:'transparent',border:'1px solid #00C896',color:'#00C896',padding:'14px 32px',borderRadius:'50px',cursor:'pointer',fontWeight:'700',fontSize:'15px'}}>Hire Me</button>",
  "</div></motion.div></section>",
  ");",
  "export default Hero;"
].join('');
writeFileSync('src/components/sections/Hero.jsx', code);
console.log('Hero done');
