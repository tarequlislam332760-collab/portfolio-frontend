import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('src/components/admin', { recursive: true });
mkdirSync('src/context', { recursive: true });

// ─── NAVBAR (fixed: smooth scroll for same-page, navigate for pages) ───
writeFileSync('src/components/common/Navbar.jsx', `import{motion,useScroll,useTransform}from'framer-motion';
import{useState,useEffect}from'react';
import{useTheme}from'../../context/ThemeContext';
const sections=['about','skills','services','projects','blog','contact'];
const Navbar=({navigate,currentPath})=>{
const{dark,toggleTheme}=useTheme();
const[scrolled,setScrolled]=useState(false);
const[active,setActive]=useState('');
useEffect(()=>{
const onScroll=()=>{
setScrolled(window.scrollY>50);
const found=sections.find(s=>{const el=document.getElementById(s);if(!el)return false;const r=el.getBoundingClientRect();return r.top<=120&&r.bottom>=120;});
if(found)setActive(found);
};
window.addEventListener('scroll',onScroll);
return()=>window.removeEventListener('scroll',onScroll);
},[]);
const scrollTo=(id)=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});};
return(
<motion.nav initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6,ease:'easeOut'}}
style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,padding:'0 40px',height:'70px',display:'flex',alignItems:'center',justifyContent:'space-between',background:scrolled?'rgba(8,14,26,0.95)':'rgba(8,14,26,0.6)',backdropFilter:'blur(24px)',borderBottom:scrolled?'1px solid rgba(0,200,150,0.12)':'1px solid rgba(255,255,255,0.04)',transition:'all 0.4s ease'}}>
<motion.div onClick={()=>{navigate('home');window.scrollTo({top:0,behavior:'smooth'});}}
whileHover={{scale:1.05}} style={{cursor:'pointer',position:'relative'}}>
<motion.span animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:4,repeat:Infinity,ease:'linear'}}
style={{fontSize:'22px',fontWeight:'900',background:'linear-gradient(90deg,#00C896,#38BDF8,#a78bfa,#00C896)',backgroundSize:'300% 100%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:'-0.5px',fontFamily:'monospace'}}>
{'<Tarek />'}
</motion.span>
</motion.div>
<div style={{display:'flex',gap:'4px',alignItems:'center'}}>
{sections.map(s=>(
<motion.button key={s} onClick={()=>scrollTo(s)} whileHover={{y:-1}} style={{position:'relative',padding:'8px 14px',background:'none',border:'none',cursor:'pointer',color:active===s?'#00C896':'#888',fontSize:'13px',fontWeight:active===s?'600':'400',textTransform:'capitalize',transition:'color 0.2s'}}>
{s}
{active===s&&<motion.div layoutId='nav-indicator' style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:'16px',height:'2px',background:'linear-gradient(90deg,#00C896,#38BDF8)',borderRadius:'99px'}}/>}
</motion.button>
))}
</div>
<div style={{display:'flex',gap:'10px',alignItems:'center'}}>
<motion.button onClick={toggleTheme} whileHover={{scale:1.1}} whileTap={{scale:0.95}}
style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#ccc',borderRadius:'10px',padding:'7px 12px',cursor:'pointer',fontSize:'16px'}}>
{dark?'☀️':'🌙'}
</motion.button>
<motion.button onClick={()=>navigate('login')} whileHover={{scale:1.04,boxShadow:'0 0 20px rgba(0,200,150,0.4)'}} whileTap={{scale:0.96}}
style={{background:'linear-gradient(135deg,#00C896,#38BDF8)',border:'none',color:'#0B1120',borderRadius:'10px',padding:'9px 20px',cursor:'pointer',fontWeight:'700',fontSize:'13px',letterSpacing:'0.3px'}}>
Admin
</motion.button>
</div>
</motion.nav>
);};
export default Navbar;`);

// ─── SIDEBAR ───
writeFileSync('src/components/admin/Sidebar.jsx', `import{motion}from'framer-motion';
import{useAuth}from'../../context/AuthContext';
const links=[{icon:'📊',label:'Analytics',page:'analytics'},{icon:'🗂️',label:'Projects',page:'projects'},{icon:'✍️',label:'Blog',page:'blog'},{icon:'💬',label:'Messages',page:'messages'},{icon:'⚙️',label:'Settings',page:'settings'}];
const Sidebar=({active,setActive,navigate})=>{
const{logout}=useAuth();
return(
<motion.aside initial={{x:-60,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.4}}
style={{width:'240px',minHeight:'100vh',background:'#080e1a',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',padding:'32px 0',position:'fixed',left:0,top:0,zIndex:100}}>
<div style={{padding:'0 24px 32px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
<motion.div animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:4,repeat:Infinity}}
style={{fontSize:'18px',fontWeight:'800',background:'linear-gradient(90deg,#00C896,#38BDF8,#a78bfa,#00C896)',backgroundSize:'300% 100%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'monospace'}}>
{'<Admin />'}
</motion.div>
<div style={{color:'#444',fontSize:'12px',marginTop:'4px'}}>Portfolio Dashboard</div>
</div>
<nav style={{flex:1,padding:'20px 12px'}}>
{links.map((l,i)=>(
<motion.button key={i} onClick={()=>setActive(l.page)} whileHover={{x:4}}
style={{width:'100%',display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',borderRadius:'12px',border:'none',cursor:'pointer',marginBottom:'4px',background:active===l.page?'rgba(0,200,150,0.1)':'transparent',color:active===l.page?'#00C896':'#555',fontSize:'14px',fontWeight:active===l.page?'600':'400',transition:'all 0.2s',textAlign:'left'}}>
<span>{l.icon}</span><span>{l.label}</span>
{active===l.page&&<motion.div layoutId='sidebar-dot' style={{marginLeft:'auto',width:'6px',height:'6px',borderRadius:'50%',background:'#00C896'}}/>}
</motion.button>
))}
</nav>
<div style={{padding:'20px 12px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
<motion.button onClick={()=>{logout();navigate('home');}} whileHover={{scale:1.02}}
style={{width:'100%',padding:'12px',background:'rgba(255,59,59,0.08)',border:'1px solid rgba(255,59,59,0.15)',borderRadius:'12px',color:'#ff6b6b',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
🚪 Logout
</motion.button>
</div>
</motion.aside>
);};
export default Sidebar;`);

// ─── ANALYTICS CARD ───
writeFileSync('src/components/admin/AnalyticsCard.jsx', `import{motion}from'framer-motion';
const AnalyticsCard=({title,value,change,icon,color})=>(
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} whileHover={{y:-4,boxShadow:'0 20px 40px rgba(0,0,0,0.3)'}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',padding:'28px',position:'relative',overflow:'hidden',cursor:'default'}}>
<div style={{position:'absolute',top:-20,right:-20,width:'100px',height:'100px',background:'radial-gradient(circle,'+color+'22 0%,transparent 70%)',pointerEvents:'none'}}/>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px'}}>
<div style={{fontSize:'32px'}}>{icon}</div>
<motion.span animate={{opacity:[1,0.6,1]}} transition={{duration:2,repeat:Infinity}}
style={{background:change>=0?'rgba(0,200,150,0.15)':'rgba(255,59,59,0.15)',color:change>=0?'#00C896':'#ff6b6b',padding:'4px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
{change>=0?'+':''}{change}%
</motion.span>
</div>
<motion.div initial={{scale:0.5}} animate={{scale:1}} transition={{type:'spring',stiffness:200}}
style={{fontSize:'34px',fontWeight:'900',color:'#fff',marginBottom:'6px',fontVariantNumeric:'tabular-nums'}}>
{value}
</motion.div>
<div style={{color:'#555',fontSize:'13px'}}>{title}</div>
</motion.div>
);
export default AnalyticsCard;`);

// ─── PROJECT FORM ───
writeFileSync('src/components/admin/ProjectForm.jsx', `import{useState}from'react';
import{motion,AnimatePresence}from'framer-motion';
const emojis=['🚀','📈','🛍️','📊','✍️','🎯','📚','🌐','⚙️','🎨','💡','🔥'];
const ProjectForm=({onClose,onSave})=>{
const[form,setForm]=useState({title:'',desc:'',tech:'',live:'',github:'',emoji:'🚀'});
const inp={width:'100%',padding:'12px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#fff',fontSize:'14px',outline:'none',marginBottom:'12px',boxSizing:'border-box',transition:'border-color 0.2s'};
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px',backdropFilter:'blur(8px)'}}>
<motion.div initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.85,opacity:0}} transition={{type:'spring',stiffness:260,damping:20}}
style={{background:'linear-gradient(135deg,#0d1422,#0a1018)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'560px',maxHeight:'90vh',overflowY:'auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
<h3 style={{color:'#fff',fontSize:'22px',fontWeight:'800',margin:0}}>Add Project</h3>
<motion.button onClick={onClose} whileHover={{scale:1.1,rotate:90}} style={{background:'rgba(255,255,255,0.06)',border:'none',color:'#888',borderRadius:'8px',padding:'8px 12px',cursor:'pointer',fontSize:'20px',lineHeight:1}}>×</motion.button>
</div>
<div style={{display:'flex',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
{emojis.map(e=>(<motion.button key={e} onClick={()=>setForm(f=>({...f,emoji:e}))} whileHover={{scale:1.2}} style={{fontSize:'24px',padding:'8px',borderRadius:'10px',border:form.emoji===e?'2px solid #00C896':'2px solid transparent',background:'rgba(255,255,255,0.04)',cursor:'pointer'}}>{e}</motion.button>))}
</div>
{[['title','Project Title *'],['desc','Short Description *'],['tech','Technologies (e.g. React, Node.js)'],['live','Live Demo URL'],['github','GitHub Repository URL']].map(([k,p])=>(
<input key={k} placeholder={p} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={inp}/>
))}
<div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
<motion.button onClick={onClose} whileHover={{scale:1.02}} style={{flex:1,padding:'13px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',color:'#888',cursor:'pointer',fontWeight:'600'}}>Cancel</motion.button>
<motion.button onClick={()=>onSave&&onSave(form)} whileHover={{scale:1.02,boxShadow:'0 0 20px rgba(0,200,150,0.3)'}} style={{flex:1,padding:'13px',background:'linear-gradient(135deg,#00C896,#38BDF8)',border:'none',borderRadius:'10px',color:'#0B1120',cursor:'pointer',fontWeight:'800',fontSize:'15px'}}>Save Project</motion.button>
</div>
</motion.div>
</motion.div>
);};
export default ProjectForm;`);

// ─── BLOG FORM ───
writeFileSync('src/components/admin/BlogForm.jsx', `import{useState}from'react';
import{motion}from'framer-motion';
const categories=['React','Node.js','MongoDB','Next.js','SEO','Marketing','JavaScript'];
const BlogForm=({onClose,onSave})=>{
const[form,setForm]=useState({title:'',excerpt:'',category:'React',readTime:'5',emoji:'✍️'});
const inp={width:'100%',padding:'12px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#fff',fontSize:'14px',outline:'none',marginBottom:'12px',boxSizing:'border-box'};
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px',backdropFilter:'blur(8px)'}}>
<motion.div initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.85,opacity:0}} transition={{type:'spring',stiffness:260,damping:20}}
style={{background:'linear-gradient(135deg,#0d1422,#0a1018)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'520px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
<h3 style={{color:'#fff',fontSize:'22px',fontWeight:'800',margin:0}}>New Blog Post</h3>
<motion.button onClick={onClose} whileHover={{scale:1.1,rotate:90}} style={{background:'rgba(255,255,255,0.06)',border:'none',color:'#888',borderRadius:'8px',padding:'8px 12px',cursor:'pointer',fontSize:'20px',lineHeight:1}}>×</motion.button>
</div>
<div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
{categories.map(c=>(<motion.button key={c} onClick={()=>setForm(f=>({...f,category:c}))} whileHover={{scale:1.05}}
style={{padding:'6px 14px',borderRadius:'20px',border:form.category===c?'1px solid #00C896':'1px solid rgba(255,255,255,0.08)',background:form.category===c?'rgba(0,200,150,0.12)':'transparent',color:form.category===c?'#00C896':'#555',cursor:'pointer',fontSize:'12px',fontWeight:'500'}}>{c}</motion.button>))}
</div>
{[['title','Blog Title *'],['excerpt','Short Description *'],['readTime','Read Time (minutes)']].map(([k,p])=>(
<input key={k} placeholder={p} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={inp}/>
))}
<div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
<motion.button onClick={onClose} whileHover={{scale:1.02}} style={{flex:1,padding:'13px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',color:'#888',cursor:'pointer',fontWeight:'600'}}>Cancel</motion.button>
<motion.button onClick={()=>onSave&&onSave(form)} whileHover={{scale:1.02,boxShadow:'0 0 20px rgba(0,200,150,0.3)'}} style={{flex:1,padding:'13px',background:'linear-gradient(135deg,#00C896,#38BDF8)',border:'none',borderRadius:'10px',color:'#0B1120',cursor:'pointer',fontWeight:'800',fontSize:'15px'}}>Publish Post</motion.button>
</div>
</motion.div>
</motion.div>
);};
export default BlogForm;`);

// ─── SEO CHART ───
writeFileSync('src/components/admin/SEOChart.jsx', `import{motion}from'framer-motion';
const data=[{month:'Jan',score:45,traffic:1200},{month:'Feb',score:52,traffic:1800},{month:'Mar',score:48,traffic:1500},{month:'Apr',score:61,traffic:2400},{month:'May',score:67,traffic:3100},{month:'Jun',score:74,traffic:3800}];
const max=Math.max(...data.map(d=>d.score));
const SEOChart=()=>(
<div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',padding:'28px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
<h3 style={{color:'#fff',fontSize:'16px',fontWeight:'700',margin:0}}>SEO Performance Score</h3>
<span style={{color:'#00C896',fontSize:'13px',fontWeight:'600',background:'rgba(0,200,150,0.1)',padding:'4px 12px',borderRadius:'20px'}}>+64% YTD</span>
</div>
<div style={{display:'flex',alignItems:'flex-end',gap:'8px',height:'140px',marginBottom:'16px'}}>
{data.map((d,i)=>(
<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',height:'100%',justifyContent:'flex-end'}}>
<span style={{color:'#555',fontSize:'10px',fontWeight:'600'}}>{d.score}</span>
<motion.div initial={{height:0,opacity:0}} animate={{height:(d.score/max*100)+'%',opacity:1}} transition={{duration:0.8,delay:i*0.1,ease:'easeOut'}}
style={{width:'100%',background:'linear-gradient(180deg,#00C896,#38BDF8)',borderRadius:'6px 6px 0 0',minHeight:'4px',position:'relative',cursor:'pointer'}}/>
<span style={{color:'#444',fontSize:'10px'}}>{d.month}</span>
</div>
))}
</div>
</div>
);
export default SEOChart;`);

// ─── ADS CHART ───
writeFileSync('src/components/admin/AdsChart.jsx', `import{motion}from'framer-motion';
const data=[{label:'Facebook Ads',value:42,color:'#3b82f6'},{label:'Google Ads',value:31,color:'#f59e0b'},{label:'Instagram',value:18,color:'#ec4899'},{label:'Other',value:9,color:'#6366f1'}];
const SIZE=140;const R=52;const CIRC=2*Math.PI*R;
const AdsChart=()=>{
let off=0;
return(
<div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',padding:'28px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
<h3 style={{color:'#fff',fontSize:'16px',fontWeight:'700',margin:0}}>Ad Spend Distribution</h3>
</div>
<div style={{display:'flex',alignItems:'center',gap:'24px'}}>
<svg width={SIZE} height={SIZE} style={{flexShrink:0,transform:'rotate(-90deg)'}}>
<circle cx={SIZE/2} cy={SIZE/2} r={R} fill='none' stroke='rgba(255,255,255,0.05)' strokeWidth='18'/>
{data.map((d,i)=>{const dash=CIRC*(d.value/100);const gap=CIRC-dash;const dashOffset=-(off/100)*CIRC;off+=d.value;
return(<motion.circle key={i} cx={SIZE/2} cy={SIZE/2} r={R} fill='none' stroke={d.color} strokeWidth='18' strokeDasharray={dash+' '+gap} strokeDashoffset={dashOffset} initial={{strokeDasharray:'0 '+CIRC}} animate={{strokeDasharray:dash+' '+gap}} transition={{duration:1,delay:i*0.2}}/>);})}
</svg>
<div style={{flex:1,display:'flex',flexDirection:'column',gap:'10px'}}>
{data.map((d,i)=>(
<motion.div key={i} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}} style={{display:'flex',alignItems:'center',gap:'10px'}}>
<div style={{width:'8px',height:'8px',borderRadius:'50%',background:d.color,flexShrink:0}}/>
<span style={{color:'#777',fontSize:'12px',flex:1}}>{d.label}</span>
<span style={{color:'#fff',fontSize:'13px',fontWeight:'700'}}>{d.value}%</span>
</motion.div>
))}
</div>
</div>
</div>
);};
export default AdsChart;`);

// ─── THEME CONTEXT ───
writeFileSync('src/context/ThemeContext.jsx', `import{createContext,useContext,useState,useEffect}from'react';
const ThemeContext=createContext();
export const ThemeProvider=({children})=>{
const[dark,setDark]=useState(true);
useEffect(()=>{document.documentElement.classList.toggle('dark',dark);},[dark]);
return(<ThemeContext.Provider value={{dark,toggleTheme:()=>setDark(d=>!d)}}>{children}</ThemeContext.Provider>);
};
export const useTheme=()=>useContext(ThemeContext);`);

// ─── AUTH CONTEXT ───
writeFileSync('src/context/AuthContext.jsx', `import{createContext,useContext,useState}from'react';
const AuthContext=createContext();
export const AuthProvider=({children})=>{
const[admin,setAdmin]=useState(()=>{try{return localStorage.getItem('token');}catch{return null;}});
const login=(token)=>{try{localStorage.setItem('token',token);}catch{}setAdmin(token);};
const logout=()=>{try{localStorage.removeItem('token');}catch{}setAdmin(null);};
return(<AuthContext.Provider value={{admin,login,logout}}>{children}</AuthContext.Provider>);
};
export const useAuth=()=>useContext(AuthContext);`);

console.log('All files created successfully!');
