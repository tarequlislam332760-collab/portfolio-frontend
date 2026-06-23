import { writeFileSync, mkdirSync, copyFileSync } from 'fs';

mkdirSync('src/components/admin', { recursive: true });
mkdirSync('src/components/common', { recursive: true });
mkdirSync('src/components/sections', { recursive: true });
mkdirSync('src/context', { recursive: true });
mkdirSync('src/pages', { recursive: true });

// ═══════════════════════════════════════════════
// THEME CONTEXT
// ═══════════════════════════════════════════════
writeFileSync('src/context/ThemeContext.jsx', `import{createContext,useContext,useState,useEffect}from'react';
const ThemeContext=createContext();
export const ThemeProvider=({children})=>{
const[dark,setDark]=useState(true);
useEffect(()=>{document.documentElement.setAttribute('data-theme',dark?'dark':'light');},[dark]);
return(<ThemeContext.Provider value={{dark,toggleTheme:()=>setDark(d=>!d)}}>{children}</ThemeContext.Provider>);
};
export const useTheme=()=>useContext(ThemeContext);`);

// ═══════════════════════════════════════════════
// AUTH CONTEXT
// ═══════════════════════════════════════════════
writeFileSync('src/context/AuthContext.jsx', `import{createContext,useContext,useState}from'react';
const AuthContext=createContext();
export const AuthProvider=({children})=>{
const[admin,setAdmin]=useState(()=>{try{return localStorage.getItem('tk');}catch{return null;}});
const login=(t)=>{try{localStorage.setItem('tk',t);}catch{}setAdmin(t);};
const logout=()=>{try{localStorage.removeItem('tk');}catch{}setAdmin(null);};
return(<AuthContext.Provider value={{admin,login,logout}}>{children}</AuthContext.Provider>);
};
export const useAuth=()=>useContext(AuthContext);`);

// ═══════════════════════════════════════════════
// NAVBAR — scroll-based, no page change for sections
// ═══════════════════════════════════════════════
writeFileSync('src/components/common/Navbar.jsx', `import{motion,AnimatePresence}from'framer-motion';
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
export default Navbar;`);

// ═══════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Hero.jsx', `import{motion}from'framer-motion';
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
export default Hero;`);

// ═══════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/About.jsx', `import{motion}from'framer-motion';
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
export default About;`);

// ═══════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Skills.jsx', `import{motion}from'framer-motion';
const SKILLS=[
{cat:'Frontend',icon:'⚛️',items:[['React.js',92],['Next.js',80],['Tailwind CSS',90],['JavaScript',88]]},
{cat:'Backend',icon:'⚙️',items:[['Node.js',87],['Express.js',85],['REST APIs',88],['MongoDB',84]]},
{cat:'Marketing',icon:'📈',items:[['SEO',82],['Facebook Ads',80],['Google Ads',75],['Analytics',78]]},
];
const Skills=()=>(
<section id='skills' style={{padding:'120px clamp(20px,5vw,80px)',background:'#050A14',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(56,189,248,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#38BDF8',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Skills</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>My Tech <span style={{background:'linear-gradient(135deg,#38BDF8,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Arsenal</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'28px'}}>
{SKILLS.map((g,gi)=>(
<motion.div key={gi} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:gi*0.1}} whileHover={{y:-6}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'32px',transition:'all 0.3s'}}>
<div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px'}}>
<div style={{fontSize:'28px'}}>{g.icon}</div>
<h3 style={{color:'#fff',fontSize:'17px',fontWeight:'700',margin:0,fontFamily:'"Syne",sans-serif'}}>{g.cat}</h3>
</div>
{g.items.map(([name,pct],i)=>(
<div key={i} style={{marginBottom:'18px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'7px'}}>
<span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',fontFamily:'"DM Sans",sans-serif'}}>{name}</span>
<span style={{color:'rgba(255,255,255,0.35)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{pct}%</span>
</div>
<div style={{height:'5px',background:'rgba(255,255,255,0.06)',borderRadius:'99px',overflow:'hidden'}}>
<motion.div initial={{width:0}} whileInView={{width:pct+'%'}} viewport={{once:true}} transition={{duration:1,delay:gi*0.1+i*0.08,ease:'easeOut'}}
style={{height:'100%',borderRadius:'99px',background:gi===0?'linear-gradient(90deg,#00D4AA,#38BDF8)':gi===1?'linear-gradient(90deg,#38BDF8,#818cf8)':'linear-gradient(90deg,#818cf8,#f472b6)'}}/>
</div>
</div>
))}
</motion.div>
))}
</div>
</div>
</section>
);
export default Skills;`);

// ═══════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Services.jsx', `import{motion}from'framer-motion';
const SERVICES=[
{icon:'🌐',title:'Full Stack Web Apps',desc:'End-to-end MERN stack applications with modern UI, authentication, REST APIs, and MongoDB.',color:'#00D4AA'},
{icon:'⚙️',title:'Backend Development',desc:'Scalable Node.js & Express APIs, database design, and server-side logic.',color:'#38BDF8'},
{icon:'📈',title:'SEO & Content Marketing',desc:'On-page and technical SEO strategies to rank higher and drive organic traffic.',color:'#818cf8'},
{icon:'🎯',title:'Facebook & Google Ads',desc:'Performance marketing campaigns that maximize ROI and reduce cost-per-acquisition.',color:'#f472b6'},
{icon:'🛒',title:'E-Commerce Solutions',desc:'Full online stores with product management, cart, and Stripe/payment integration.',color:'#fb923c'},
{icon:'📊',title:'Analytics & Dashboard',desc:'Custom admin panels, data visualization, and real-time analytics dashboards.',color:'#34d399'},
];
const Services=()=>(
<section id='services' style={{padding:'120px clamp(20px,5vw,80px)',background:'#07101E',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(129,140,248,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#818cf8',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Services</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>What I <span style={{background:'linear-gradient(135deg,#818cf8,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Offer</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px'}}>
{SERVICES.map((s,i)=>(
<motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} whileHover={{y:-8,borderColor:s.color+'44'}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'24px',padding:'36px 28px',cursor:'default',transition:'all 0.35s',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,'+s.color+',transparent)',opacity:0.8}}/>
<div style={{fontSize:'40px',marginBottom:'20px'}}>{s.icon}</div>
<h3 style={{color:'#fff',fontSize:'17px',fontWeight:'700',marginBottom:'12px',fontFamily:'"Syne",sans-serif'}}>{s.title}</h3>
<p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',lineHeight:'1.75',fontFamily:'"DM Sans",sans-serif',margin:0}}>{s.desc}</p>
</motion.div>
))}
</div>
</div>
</section>
);
export default Services;`);

// ═══════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Projects.jsx', `import{motion}from'framer-motion';
const PROJECTS=[
{emoji:'📈',title:'Vinance Dashboard',desc:'Crypto portfolio tracker with real-time price feeds, P&L analytics, and wallet management.',tech:['React','Node.js','MongoDB','Chart.js'],live:'#',github:'#',color:'#00D4AA'},
{emoji:'🛍️',title:'E-Commerce Platform',desc:'Full-featured online store with product management, cart, Stripe payments, and admin panel.',tech:['Next.js','Express','MongoDB','Stripe'],live:'#',github:'#',color:'#38BDF8'},
];
const Projects=({navigate})=>(
<section id='projects' style={{padding:'120px clamp(20px,5vw,80px)',background:'#050A14',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(0,212,170,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#00D4AA',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Portfolio</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>Live <span style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Projects</span></h2>
<p style={{color:'rgba(255,255,255,0.4)',marginTop:'16px',fontSize:'15px',fontFamily:'"DM Sans",sans-serif'}}>Deployed on Vercel — real products, real users</p>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'32px',maxWidth:'900px',margin:'0 auto'}}>
{PROJECTS.map((p,i)=>(
<motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.15}} whileHover={{y:-10}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'28px',overflow:'hidden',transition:'all 0.4s',boxShadow:'0 0 0 rgba(0,0,0,0)'}}>
<div style={{height:'180px',background:'linear-gradient(135deg,'+p.color+'15,'+p.color+'08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'72px',borderBottom:'1px solid rgba(255,255,255,0.05)',position:'relative'}}>
{p.emoji}
<div style={{position:'absolute',top:'12px',right:'12px',background:'rgba(0,212,170,0.12)',border:'1px solid rgba(0,212,170,0.25)',borderRadius:'8px',padding:'4px 10px',fontSize:'11px',color:'#00D4AA',fontWeight:'700',letterSpacing:'0.5px',fontFamily:'"DM Sans",sans-serif'}}>LIVE ON VERCEL</div>
</div>
<div style={{padding:'28px'}}>
<h3 style={{color:'#fff',fontSize:'20px',fontWeight:'800',marginBottom:'10px',fontFamily:'"Syne",sans-serif'}}>{p.title}</h3>
<p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',lineHeight:'1.7',marginBottom:'20px',fontFamily:'"DM Sans",sans-serif'}}>{p.desc}</p>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
{p.tech.map((t,j)=>(<span key={j} style={{padding:'4px 12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'99px',color:'rgba(255,255,255,0.5)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{t}</span>))}
</div>
<div style={{display:'flex',gap:'10px'}}>
<motion.a href={p.live} target='_blank' rel='noopener noreferrer' whileHover={{scale:1.04}} style={{flex:1,padding:'11px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',borderRadius:'10px',color:'#050A14',fontWeight:'800',fontSize:'13px',cursor:'pointer',textAlign:'center',textDecoration:'none',fontFamily:'"DM Sans",sans-serif',display:'block'}}>🔗 Live Demo</motion.a>
<motion.a href={p.github} target='_blank' rel='noopener noreferrer' whileHover={{scale:1.04}} style={{flex:1,padding:'11px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',color:'rgba(255,255,255,0.6)',fontWeight:'600',fontSize:'13px',cursor:'pointer',textAlign:'center',textDecoration:'none',fontFamily:'"DM Sans",sans-serif',display:'block'}}>⭐ GitHub</motion.a>
</div>
</div>
</motion.div>
))}
</div>
</div>
</section>
);
export default Projects;`);

// ═══════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Testimonials.jsx', `import{useState}from'react';
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
export default Testimonials;`);

// ═══════════════════════════════════════════════
// BLOG SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Blog.jsx', `import{motion}from'framer-motion';
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
export default Blog;`);

// ═══════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════
writeFileSync('src/components/sections/Contact.jsx', `import{useState}from'react';
import{motion}from'framer-motion';
const INP={width:'100%',padding:'14px 18px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'12px',color:'#fff',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif',transition:'border-color 0.2s'};
const Contact=()=>{
const[form,setForm]=useState({name:'',email:'',subject:'',message:''});
const[sent,setSent]=useState(false);
const handle=()=>{if(!form.name||!form.email||!form.message)return;setSent(true);setTimeout(()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''});},4000);};
return(
<section id='contact' style={{padding:'120px clamp(20px,5vw,80px)',background:'#07101E',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(0,212,170,0.3),transparent)'}}/>
<div style={{position:'absolute',bottom:'-200px',left:'50%',transform:'translateX(-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(0,212,170,0.06),transparent 70%)',pointerEvents:'none'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#00D4AA',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Contact</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>Let's Work <span style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Together</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'60px',alignItems:'start'}}>
<motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
<h3 style={{color:'#fff',fontSize:'24px',fontWeight:'800',marginBottom:'16px',fontFamily:'"Syne",sans-serif'}}>Ready to build something great?</h3>
<p style={{color:'rgba(255,255,255,0.45)',fontSize:'15px',lineHeight:'1.8',marginBottom:'40px',fontFamily:'"DM Sans",sans-serif'}}>Whether you need a full-stack web app, a high-performing marketing campaign, or both — I'm here to help.</p>
{[['📧','Email','tarek@example.com'],['📱','WhatsApp','+880 1XXX-XXXXXX'],['📍','Location','Sylhet, Bangladesh']].map(([ic,l,v],i)=>(
<div key={i} style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px',background:'rgba(0,212,170,0.04)',border:'1px solid rgba(0,212,170,0.1)',borderRadius:'14px',marginBottom:'12px'}}>
<span style={{fontSize:'22px'}}>{ic}</span>
<div><div style={{color:'rgba(255,255,255,0.35)',fontSize:'11px',fontWeight:'600',letterSpacing:'1px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif'}}>{l}</div><div style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',fontFamily:'"DM Sans",sans-serif',marginTop:'2px'}}>{v}</div></div>
</div>
))}
</motion.div>
<motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'28px',padding:'40px'}}>
{sent?(
<motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} style={{textAlign:'center',padding:'40px 0'}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>✅</div>
<h4 style={{color:'#00D4AA',fontSize:'22px',fontWeight:'800',fontFamily:'"Syne",sans-serif',marginBottom:'8px'}}>Message Sent!</h4>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',fontFamily:'"DM Sans",sans-serif'}}>I'll get back to you within 24 hours.</p>
</motion.div>
):(
<div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
<input placeholder='Your Name *' value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={INP}/>
<input type='email' placeholder='Email Address *' value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={INP}/>
</div>
<input placeholder='Subject' value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} style={INP}/>
<textarea placeholder='Your Message *' value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={5} style={{...INP,resize:'vertical'}}/>
<motion.button onClick={handle} whileHover={{scale:1.02,boxShadow:'0 0 30px rgba(0,212,170,0.4)'}} whileTap={{scale:0.98}}
style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',color:'#050A14',padding:'16px',borderRadius:'12px',cursor:'pointer',fontWeight:'800',fontSize:'15px',fontFamily:'"DM Sans",sans-serif',letterSpacing:'0.3px'}}>
Send Message 🚀
</motion.button>
</div>
)}
</motion.div>
</div>
</div>
</section>
);};
export default Contact;`);

// ═══════════════════════════════════════════════
// FOOTER — Premium
// ═══════════════════════════════════════════════
writeFileSync('src/components/common/Footer.jsx', `import{motion}from'framer-motion';
const LINKS=[['About','about'],['Skills','skills'],['Services','services'],['Projects','projects'],['Blog','blog'],['Contact','contact']];
const SOCIALS=[{icon:'🐙',label:'GitHub',url:'https://github.com'},{icon:'💼',label:'LinkedIn',url:'https://linkedin.com'},{icon:'🐦',label:'Twitter',url:'https://twitter.com'},{icon:'📘',label:'Facebook',url:'https://facebook.com'}];
const Footer=({navigate})=>{
const go=(id)=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});};
return(
<footer style={{background:'#03070F',borderTop:'1px solid rgba(0,212,170,0.1)',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'800px',height:'2px',background:'linear-gradient(90deg,transparent,rgba(0,212,170,0.4),rgba(56,189,248,0.4),transparent)'}}/>
<div style={{position:'absolute',top:'-200px',left:'50%',transform:'translateX(-50%)',width:'600px',height:'400px',background:'radial-gradient(ellipse,rgba(0,212,170,0.04),transparent 70%)',pointerEvents:'none'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto',padding:'72px clamp(20px,5vw,80px) 0'}}>
<div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'60px',paddingBottom:'60px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
{/* BRAND */}
<div>
<motion.div onClick={()=>{navigate('home');window.scrollTo({top:0,behavior:'smooth'});}} whileHover={{scale:1.04}} style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
<div style={{width:'42px',height:'42px',borderRadius:'12px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:'900',color:'#050A14',fontFamily:'monospace',boxShadow:'0 0 24px rgba(0,212,170,0.3)'}}>T</div>
<span style={{fontSize:'20px',fontWeight:'900',background:'linear-gradient(90deg,#00D4AA,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.3px'}}>Tarek.dev</span>
</motion.div>
<p style={{color:'rgba(255,255,255,0.35)',fontSize:'14px',lineHeight:'1.85',maxWidth:'320px',marginBottom:'28px',fontFamily:'"DM Sans",sans-serif'}}>
MERN Full Stack Developer & Digital Marketing Specialist. Building modern web apps and helping businesses grow online.
</p>
<div style={{display:'flex',gap:'10px'}}>
{SOCIALS.map((s,i)=>(
<motion.a key={i} href={s.url} target='_blank' rel='noopener noreferrer' whileHover={{y:-3,scale:1.1}} title={s.label}
style={{width:'40px',height:'40px',borderRadius:'10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',cursor:'pointer',textDecoration:'none'}}>
{s.icon}
</motion.a>
))}
</div>
</div>
{/* NAV */}
<div>
<h4 style={{color:'rgba(255,255,255,0.6)',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'24px',fontFamily:'"DM Sans",sans-serif'}}>Navigation</h4>
{LINKS.map(([l,id],i)=>(
<motion.button key={i} onClick={()=>go(id)} whileHover={{x:4,color:'#00D4AA'}}
style={{display:'block',background:'none',border:'none',color:'rgba(255,255,255,0.4)',fontSize:'14px',cursor:'pointer',marginBottom:'12px',padding:0,textAlign:'left',fontFamily:'"DM Sans",sans-serif',transition:'color 0.2s',textTransform:'capitalize'}}>
{l}
</motion.button>
))}
</div>
{/* SERVICES */}
<div>
<h4 style={{color:'rgba(255,255,255,0.6)',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'24px',fontFamily:'"DM Sans",sans-serif'}}>Services</h4>
{['Web Development','Backend APIs','SEO Strategy','Facebook Ads','E-Commerce','Dashboard'].map((s,i)=>(
<div key={i} style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'12px',fontFamily:'"DM Sans",sans-serif'}}>{s}</div>
))}
</div>
</div>
{/* BOTTOM BAR */}
<div style={{padding:'24px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<p style={{color:'rgba(255,255,255,0.2)',fontSize:'13px',fontFamily:'"DM Sans",sans-serif',margin:0}}>
© 2025 Tarikul Islam Tarek. All rights reserved.
</p>
<div style={{display:'flex',gap:'6px',alignItems:'center'}}>
<span style={{color:'rgba(255,255,255,0.15)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>Built with</span>
{['⚛️ React','🍃 MongoDB','⚡ Vite'].map((t,i)=>(<span key={i} style={{color:'rgba(255,255,255,0.25)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{t}</span>))}
</div>
</div>
</div>
</footer>
);};
export default Footer;`);

// ═══════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════
writeFileSync('src/pages/Home.jsx', `import{motion}from'framer-motion';
import Hero from'../components/sections/Hero.jsx';
import About from'../components/sections/About.jsx';
import Skills from'../components/sections/Skills.jsx';
import Services from'../components/sections/Services.jsx';
import Projects from'../components/sections/Projects.jsx';
import Testimonials from'../components/sections/Testimonials.jsx';
import Blog from'../components/sections/Blog.jsx';
import Contact from'../components/sections/Contact.jsx';
export default function Home({navigate}){
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}>
<Hero navigate={navigate}/>
<About/>
<Skills/>
<Services/>
<Projects navigate={navigate}/>
<Testimonials/>
<Blog navigate={navigate}/>
<Contact/>
</motion.div>
);}`) ;

// ═══════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════
writeFileSync('src/components/common/LoadingScreen.jsx', `import{motion}from'framer-motion';
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
export default LoadingScreen;`);

// ═══════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════
writeFileSync('src/components/common/CustomCursor.jsx', `import{useEffect,useState}from'react';
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
export default CustomCursor;`);

// ═══════════════════════════════════════════════
// PARTICLE BG
// ═══════════════════════════════════════════════
writeFileSync('src/components/common/ParticleBg.jsx', `const ParticleBg=()=>null;
export default ParticleBg;`);

// ═══════════════════════════════════════════════
// ADMIN — SIDEBAR
// ═══════════════════════════════════════════════
writeFileSync('src/components/admin/Sidebar.jsx', `import{motion}from'framer-motion';
import{useAuth}from'../../context/AuthContext';
const LINKS=[{icon:'📊',l:'Analytics',p:'analytics'},{icon:'🗂️',l:'Projects',p:'projects'},{icon:'✍️',l:'Blog',p:'blog'},{icon:'💬',l:'Messages',p:'messages'},{icon:'⚙️',l:'Settings',p:'settings'}];
const Sidebar=({active,setActive,navigate})=>{
const{logout}=useAuth();
return(
<motion.aside initial={{x:-60,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5,ease:[0.16,1,0.3,1]}}
style={{width:'240px',minHeight:'100vh',background:'#030710',borderRight:'1px solid rgba(0,212,170,0.08)',display:'flex',flexDirection:'column',position:'fixed',left:0,top:0,zIndex:100}}>
<div style={{padding:'28px 24px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
<motion.span animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:5,repeat:Infinity}}
style={{fontSize:'18px',fontWeight:'900',background:'linear-gradient(90deg,#00D4AA,#38BDF8,#818cf8,#00D4AA)',backgroundSize:'300%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.3px',display:'block'}}>
Tarek.dev
</motion.span>
<span style={{color:'rgba(255,255,255,0.2)',fontSize:'11px',fontFamily:'"DM Sans",sans-serif',letterSpacing:'1.5px',textTransform:'uppercase'}}>Admin Panel</span>
</div>
<nav style={{flex:1,padding:'20px 12px'}}>
{LINKS.map((ln,i)=>(
<motion.button key={i} onClick={()=>setActive(ln.p)} whileHover={{x:3}}
style={{width:'100%',display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',borderRadius:'12px',border:'none',cursor:'pointer',marginBottom:'4px',background:active===ln.p?'rgba(0,212,170,0.08)':'transparent',color:active===ln.p?'#00D4AA':'rgba(255,255,255,0.35)',fontSize:'14px',fontWeight:active===ln.p?'600':'400',fontFamily:'"DM Sans",sans-serif',textAlign:'left',transition:'all 0.2s'}}>
<span>{ln.icon}</span><span style={{flex:1}}>{ln.l}</span>
{active===ln.p&&<motion.div layoutId='sb' style={{width:'5px',height:'5px',borderRadius:'50%',background:'#00D4AA'}}/>}
</motion.button>
))}
</nav>
<div style={{padding:'20px 12px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
<motion.button onClick={()=>{logout();navigate('home');}} whileHover={{scale:1.02}}
style={{width:'100%',padding:'12px',background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:'12px',color:'#f87171',cursor:'pointer',fontSize:'14px',fontWeight:'600',fontFamily:'"DM Sans",sans-serif'}}>
🚪 Sign Out
</motion.button>
</div>
</motion.aside>
);};
export default Sidebar;`);

// ═══════════════════════════════════════════════
// ADMIN — ANALYTICS CARD
// ═══════════════════════════════════════════════
writeFileSync('src/components/admin/AnalyticsCard.jsx', `import{motion}from'framer-motion';
const AnalyticsCard=({title,value,change,icon,color})=>(
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} whileHover={{y:-5}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'20px',padding:'28px',position:'relative',overflow:'hidden',cursor:'default',transition:'box-shadow 0.3s'}}>
<div style={{position:'absolute',top:-30,right:-30,width:'120px',height:'120px',borderRadius:'50%',background:'radial-gradient(circle,'+color+'18,transparent 70%)',pointerEvents:'none'}}/>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
<div style={{fontSize:'30px'}}>{icon}</div>
<span style={{background:change>=0?'rgba(0,212,170,0.12)':'rgba(239,68,68,0.12)',color:change>=0?'#00D4AA':'#f87171',padding:'3px 10px',borderRadius:'99px',fontSize:'12px',fontWeight:'700',fontFamily:'"DM Sans",sans-serif'}}>
{change>=0?'+':''}{change}%
</span>
</div>
<div style={{fontSize:'32px',fontWeight:'900',color:'#fff',marginBottom:'5px',fontFamily:'"Syne",sans-serif',letterSpacing:'-0.5px'}}>{value}</div>
<div style={{color:'rgba(255,255,255,0.35)',fontSize:'13px',fontFamily:'"DM Sans",sans-serif'}}>{title}</div>
</motion.div>
);
export default AnalyticsCard;`);

// ═══════════════════════════════════════════════
// ADMIN — PROJECT FORM
// ═══════════════════════════════════════════════
writeFileSync('src/components/admin/ProjectForm.jsx', `import{useState}from'react';
import{motion}from'framer-motion';
const EMOJIS=['🚀','📈','🛍️','📊','✍️','🎯','📚','🌐','⚙️','🎨','💡','🔥'];
const S={width:'100%',padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#fff',fontSize:'14px',outline:'none',marginBottom:'12px',boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif'};
const ProjectForm=({onClose,onSave})=>{
const[f,setF]=useState({title:'',desc:'',tech:'',live:'',github:'',emoji:'🚀'});
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px',backdropFilter:'blur(10px)'}}>
<motion.div initial={{scale:0.88,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.88,opacity:0}} transition={{type:'spring',stiffness:260,damping:20}}
style={{background:'linear-gradient(135deg,#0d1629,#080f1c)',border:'1px solid rgba(0,212,170,0.12)',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'540px',maxHeight:'90vh',overflowY:'auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
<h3 style={{color:'#fff',fontSize:'20px',fontWeight:'800',margin:0,fontFamily:'"Syne",sans-serif'}}>Add New Project</h3>
<motion.button onClick={onClose} whileHover={{rotate:90}} style={{background:'rgba(255,255,255,0.06)',border:'none',color:'#666',borderRadius:'8px',padding:'6px 12px',cursor:'pointer',fontSize:'20px',lineHeight:1}}>×</motion.button>
</div>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px'}}>
{EMOJIS.map(e=>(<motion.button key={e} onClick={()=>setF(v=>({...v,emoji:e}))} whileHover={{scale:1.2}} style={{fontSize:'22px',padding:'8px',borderRadius:'10px',border:f.emoji===e?'2px solid #00D4AA':'2px solid transparent',background:'rgba(255,255,255,0.04)',cursor:'pointer'}}>{e}</motion.button>))}
</div>
{[['title','Project Title *'],['desc','Description *'],['tech','Technologies (comma separated)'],['live','Live Demo URL'],['github','GitHub URL']].map(([k,p])=>(
<input key={k} placeholder={p} value={f[k]} onChange={e=>setF(v=>({...v,[k]:e.target.value}))} style={S}/>
))}
<div style={{display:'flex',gap:'12px',marginTop:'4px'}}>
<motion.button onClick={onClose} whileHover={{scale:1.02}} style={{flex:1,padding:'13px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontWeight:'600',fontFamily:'"DM Sans",sans-serif'}}>Cancel</motion.button>
<motion.button onClick={()=>onSave&&onSave(f)} whileHover={{scale:1.02,boxShadow:'0 0 24px rgba(0,212,170,0.35)'}} style={{flex:1,padding:'13px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',borderRadius:'10px',color:'#050A14',cursor:'pointer',fontWeight:'800',fontSize:'14px',fontFamily:'"DM Sans",sans-serif'}}>Save Project</motion.button>
</div>
</motion.div>
</motion.div>
);};
export default ProjectForm;`);

// ═══════════════════════════════════════════════
// ADMIN — BLOG FORM
// ═══════════════════════════════════════════════
writeFileSync('src/components/admin/BlogForm.jsx', `import{useState}from'react';
import{motion}from'framer-motion';
const CATS=['React','Node.js','MongoDB','Next.js','SEO','Marketing','JavaScript'];
const S={width:'100%',padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#fff',fontSize:'14px',outline:'none',marginBottom:'12px',boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif'};
const BlogForm=({onClose,onSave})=>{
const[f,setF]=useState({title:'',excerpt:'',category:'React',readTime:'5'});
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px',backdropFilter:'blur(10px)'}}>
<motion.div initial={{scale:0.88,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.88,opacity:0}} transition={{type:'spring',stiffness:260,damping:20}}
style={{background:'linear-gradient(135deg,#0d1629,#080f1c)',border:'1px solid rgba(56,189,248,0.12)',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'500px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
<h3 style={{color:'#fff',fontSize:'20px',fontWeight:'800',margin:0,fontFamily:'"Syne",sans-serif'}}>New Blog Post</h3>
<motion.button onClick={onClose} whileHover={{rotate:90}} style={{background:'rgba(255,255,255,0.06)',border:'none',color:'#666',borderRadius:'8px',padding:'6px 12px',cursor:'pointer',fontSize:'20px',lineHeight:1}}>×</motion.button>
</div>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px'}}>
{CATS.map(c=>(<motion.button key={c} onClick={()=>setF(v=>({...v,category:c}))} whileHover={{scale:1.05}}
style={{padding:'5px 13px',borderRadius:'99px',border:f.category===c?'1px solid #38BDF8':'1px solid rgba(255,255,255,0.08)',background:f.category===c?'rgba(56,189,248,0.1)':'transparent',color:f.category===c?'#38BDF8':'rgba(255,255,255,0.35)',cursor:'pointer',fontSize:'12px',fontWeight:'500',fontFamily:'"DM Sans",sans-serif'}}>{c}</motion.button>))}
</div>
{[['title','Blog Title *'],['excerpt','Short Description *'],['readTime','Read Time (minutes)']].map(([k,p])=>(
<input key={k} placeholder={p} value={f[k]} onChange={e=>setF(v=>({...v,[k]:e.target.value}))} style={S}/>
))}
<div style={{display:'flex',gap:'12px',marginTop:'4px'}}>
<motion.button onClick={onClose} whileHover={{scale:1.02}} style={{flex:1,padding:'13px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontWeight:'600',fontFamily:'"DM Sans",sans-serif'}}>Cancel</motion.button>
<motion.button onClick={()=>onSave&&onSave(f)} whileHover={{scale:1.02,boxShadow:'0 0 24px rgba(56,189,248,0.35)'}} style={{flex:1,padding:'13px',background:'linear-gradient(135deg,#38BDF8,#818cf8)',border:'none',borderRadius:'10px',color:'#050A14',cursor:'pointer',fontWeight:'800',fontSize:'14px',fontFamily:'"DM Sans",sans-serif'}}>Publish Post</motion.button>
</div>
</motion.div>
</motion.div>
);};
export default BlogForm;`);

// ═══════════════════════════════════════════════
// ADMIN — SEO CHART
// ═══════════════════════════════════════════════
writeFileSync('src/components/admin/SEOChart.jsx', `import{motion}from'framer-motion';
const DATA=[{m:'Jan',s:45},{m:'Feb',s:52},{m:'Mar',s:48},{m:'Apr',s:61},{m:'May',s:67},{m:'Jun',s:74}];
const MAX=Math.max(...DATA.map(d=>d.s));
const SEOChart=()=>(
<div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'20px',padding:'28px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
<h3 style={{color:'#fff',fontSize:'15px',fontWeight:'700',margin:0,fontFamily:'"Syne",sans-serif'}}>SEO Score Trend</h3>
<span style={{color:'#00D4AA',fontSize:'12px',background:'rgba(0,212,170,0.1)',padding:'3px 10px',borderRadius:'99px',fontFamily:'"DM Sans",sans-serif',fontWeight:'600'}}>+64% YTD</span>
</div>
<div style={{display:'flex',alignItems:'flex-end',gap:'10px',height:'130px',marginBottom:'12px'}}>
{DATA.map((d,i)=>(
<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',height:'100%',justifyContent:'flex-end'}}>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'10px',fontFamily:'"DM Sans",sans-serif'}}>{d.s}</span>
<motion.div initial={{height:0}} animate={{height:(d.s/MAX*100)+'%'}} transition={{duration:0.9,delay:i*0.1,ease:'easeOut'}} whileHover={{filter:'brightness(1.3)'}}
style={{width:'100%',background:'linear-gradient(180deg,#00D4AA,#38BDF8)',borderRadius:'6px 6px 0 0',minHeight:'4px',cursor:'pointer'}}/>
<span style={{color:'rgba(255,255,255,0.25)',fontSize:'10px',fontFamily:'"DM Sans",sans-serif'}}>{d.m}</span>
</div>
))}
</div>
</div>
);
export default SEOChart;`);

// ═══════════════════════════════════════════════
// ADMIN — ADS CHART
// ═══════════════════════════════════════════════
writeFileSync('src/components/admin/AdsChart.jsx', `import{motion}from'framer-motion';
const DATA=[{l:'Facebook',v:42,c:'#3b82f6'},{l:'Google',v:31,c:'#f59e0b'},{l:'Instagram',v:18,c:'#ec4899'},{l:'Other',v:9,c:'#6366f1'}];
const SZ=150;const R=55;const CIR=2*Math.PI*R;
const AdsChart=()=>{
let off=0;
return(
<div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'20px',padding:'28px'}}>
<h3 style={{color:'#fff',fontSize:'15px',fontWeight:'700',marginBottom:'24px',margin:'0 0 24px',fontFamily:'"Syne",sans-serif'}}>Ad Spend</h3>
<div style={{display:'flex',alignItems:'center',gap:'24px'}}>
<svg width={SZ} height={SZ} style={{flexShrink:0,transform:'rotate(-90deg)'}}>
<circle cx={SZ/2} cy={SZ/2} r={R} fill='none' stroke='rgba(255,255,255,0.04)' strokeWidth='18'/>
{DATA.map((d,i)=>{const dash=CIR*(d.v/100);const gap=CIR-dash;const dashOff=-(off/100)*CIR;off+=d.v;
return(<motion.circle key={i} cx={SZ/2} cy={SZ/2} r={R} fill='none' stroke={d.c} strokeWidth='18' strokeLinecap='round' strokeDasharray={dash+' '+gap} strokeDashoffset={dashOff} initial={{strokeDasharray:'0 '+CIR}} animate={{strokeDasharray:dash+' '+gap}} transition={{duration:1,delay:i*0.2}}/>);})}
</svg>
<div style={{flex:1,display:'flex',flexDirection:'column',gap:'10px'}}>
{DATA.map((d,i)=>(<motion.div key={i} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}} style={{display:'flex',alignItems:'center',gap:'8px'}}>
<div style={{width:'8px',height:'8px',borderRadius:'2px',background:d.c,flexShrink:0}}/>
<span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',flex:1,fontFamily:'"DM Sans",sans-serif'}}>{d.l}</span>
<span style={{color:'#fff',fontSize:'13px',fontWeight:'700',fontFamily:'"DM Sans",sans-serif'}}>{d.v}%</span>
</motion.div>))}
</div>
</div>
</div>
);};
export default AdsChart;`);

// ═══════════════════════════════════════════════
// INDEX.HTML — Google Fonts
// ═══════════════════════════════════════════════
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tarikul Islam Tarek | MERN Developer & Digital Marketer</title>
    <meta name="description" content="MERN Full Stack Developer and Digital Marketing Specialist based in Bangladesh. Building modern web apps deployed on Vercel." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      body{background:#050A14;color:#fff;cursor:none;-webkit-font-smoothing:antialiased;}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-track{background:#050A14;}
      ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00D4AA,#38BDF8);border-radius:99px;}
      ::selection{background:rgba(0,212,170,0.2);color:#fff;}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
writeFileSync('index.html', indexHtml);

console.log('All files created successfully!');
