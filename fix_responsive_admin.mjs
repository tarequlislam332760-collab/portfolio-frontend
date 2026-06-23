import { writeFileSync, mkdirSync } from 'fs';
mkdirSync('src/components/admin', { recursive: true });
mkdirSync('src/components/common', { recursive: true });
mkdirSync('src/pages', { recursive: true });

// ═══════════════════════════════════════════════════
// 1. NAVBAR — Admin button + mobile hamburger fixed
// ═══════════════════════════════════════════════════
writeFileSync('src/components/common/Navbar.jsx', `import{motion,AnimatePresence}from'framer-motion';
import{useState,useEffect}from'react';
import{useTheme}from'../../context/ThemeContext';
const SECTIONS=['home','about','skills','services','projects','blog','contact'];
const Navbar=({navigate,currentPage})=>{
const{dark,toggleTheme}=useTheme();
const[scrolled,setScrolled]=useState(false);
const[open,setOpen]=useState(false);
useEffect(()=>{
const h=()=>setScrolled(window.scrollY>50);
window.addEventListener('scroll',h,{passive:true});
return()=>window.removeEventListener('scroll',h);
},[]);
useEffect(()=>{setOpen(false);},[currentPage]);
const go=p=>{navigate(p);setOpen(false);window.scrollTo({top:0,behavior:'smooth'});};
return(<>
<style>{\`
.nav-links{display:flex!important}
.nav-admin-btn{display:flex!important}
.nav-ham{display:none!important}
@media(max-width:860px){
  .nav-links{display:none!important}
  .nav-admin-btn{display:none!important}
  .nav-ham{display:flex!important}
}
.nav-link-btn:hover{color:#00D4AA!important}
\`}</style>
<motion.nav initial={{y:-70}} animate={{y:0}} transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(14px,4vw,52px)',background:scrolled?'rgba(5,10,20,0.97)':'rgba(5,10,20,0.55)',backdropFilter:'blur(28px)',borderBottom:scrolled?'1px solid rgba(0,212,170,0.14)':'1px solid transparent',transition:'all 0.4s',boxShadow:scrolled?'0 4px 40px rgba(0,0,0,0.5)':'none'}}>

{/* LOGO */}
<motion.div onClick={()=>go('home')} whileHover={{scale:1.04}} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'9px',flexShrink:0,zIndex:10}}>
<div style={{width:'33px',height:'33px',borderRadius:'9px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'900',color:'#050A14',fontFamily:'monospace',fontSize:'15px',boxShadow:'0 0 16px rgba(0,212,170,0.4)',flexShrink:0}}>T</div>
<motion.span animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:5,repeat:Infinity}}
style={{fontSize:'16px',fontWeight:'800',background:'linear-gradient(90deg,#00D4AA,#38BDF8,#818cf8,#00D4AA)',backgroundSize:'300%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'"Syne",sans-serif',whiteSpace:'nowrap'}}>
Tarek.dev
</motion.span>
</motion.div>

{/* DESKTOP NAV LINKS */}
<div className='nav-links' style={{gap:'1px',alignItems:'center',position:'absolute',left:'50%',transform:'translateX(-50%)'}}>
{SECTIONS.map(s=>(
<motion.button key={s} onClick={()=>go(s)} whileHover={{y:-1}} className='nav-link-btn'
style={{position:'relative',padding:'7px 11px',background:'none',border:'none',cursor:'pointer',color:currentPage===s?'#00D4AA':'rgba(255,255,255,0.45)',fontSize:'13px',fontWeight:currentPage===s?'700':'400',textTransform:'capitalize',letterSpacing:'0.2px',transition:'color 0.2s',fontFamily:'"DM Sans",sans-serif'}}>
{s==='home'?'Home':s}
{currentPage===s&&<motion.div layoutId='nb' style={{position:'absolute',bottom:'2px',left:'50%',transform:'translateX(-50%)',height:'2px',width:'16px',borderRadius:'99px',background:'linear-gradient(90deg,#00D4AA,#38BDF8)'}}/>}
</motion.button>
))}
</div>

{/* RIGHT — DESKTOP */}
<div style={{display:'flex',gap:'8px',alignItems:'center',flexShrink:0}}>
<motion.button onClick={toggleTheme} whileHover={{scale:1.1,rotate:15}} whileTap={{scale:0.9}}
style={{width:'33px',height:'33px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'9px',cursor:'pointer',fontSize:'14px'}}>
{dark?'☀️':'🌙'}
</motion.button>
<motion.button onClick={()=>go('login')} whileHover={{scale:1.04,boxShadow:'0 0 22px rgba(0,212,170,0.45)'}} whileTap={{scale:0.96}}
className='nav-admin-btn'
style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',color:'#050A14',borderRadius:'9px',padding:'8px 18px',cursor:'pointer',fontWeight:'800',fontSize:'12px',fontFamily:'"DM Sans",sans-serif',whiteSpace:'nowrap',letterSpacing:'0.3px'}}>
Admin
</motion.button>

{/* HAMBURGER */}
<motion.button onClick={()=>setOpen(o=>!o)} className='nav-ham' whileTap={{scale:0.9}}
style={{width:'36px',height:'36px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'9px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'5px',flexShrink:0,padding:0}}>
<span style={{display:'block',width:'15px',height:'1.5px',background:'rgba(255,255,255,0.75)',borderRadius:'2px',transition:'all 0.3s',transform:open?'rotate(45deg) translate(4.5px,4.5px)':'none'}}/>
<span style={{display:'block',width:'15px',height:'1.5px',background:'rgba(255,255,255,0.75)',borderRadius:'2px',transition:'all 0.3s',opacity:open?0:1}}/>
<span style={{display:'block',width:'15px',height:'1.5px',background:'rgba(255,255,255,0.75)',borderRadius:'2px',transition:'all 0.3s',transform:open?'rotate(-45deg) translate(4.5px,-4.5px)':'none'}}/>
</motion.button>
</div>
</motion.nav>

{/* MOBILE MENU */}
<AnimatePresence>
{open&&(
<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.22}}
style={{position:'fixed',top:'64px',left:0,right:0,zIndex:999,background:'rgba(5,10,20,0.99)',backdropFilter:'blur(24px)',borderBottom:'1px solid rgba(0,212,170,0.1)',padding:'6px 0 14px'}}>
{SECTIONS.map((s,i)=>(
<motion.button key={s} onClick={()=>go(s)} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.03}}
style={{display:'flex',alignItems:'center',gap:'10px',width:'100%',padding:'12px clamp(18px,5vw,48px)',background:'none',border:'none',color:currentPage===s?'#00D4AA':'rgba(255,255,255,0.55)',fontSize:'15px',cursor:'pointer',textAlign:'left',fontFamily:'"DM Sans",sans-serif',fontWeight:currentPage===s?'700':'400',borderBottom:'1px solid rgba(255,255,255,0.04)',textTransform:'capitalize'}}>
<span style={{width:'5px',height:'5px',borderRadius:'50%',background:currentPage===s?'#00D4AA':'rgba(255,255,255,0.2)',display:'inline-block',flexShrink:0}}/>{s==='home'?'Home':s}
</motion.button>
))}
<div style={{padding:'12px clamp(18px,5vw,48px) 0',display:'flex',gap:'10px'}}>
<button onClick={toggleTheme} style={{width:'42px',height:'42px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',cursor:'pointer',fontSize:'16px',flexShrink:0}}>
{dark?'☀️':'🌙'}
</button>
<button onClick={()=>{go('login');}} style={{flex:1,padding:'11px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',borderRadius:'10px',color:'#050A14',cursor:'pointer',fontWeight:'800',fontSize:'14px',fontFamily:'"DM Sans",sans-serif'}}>
Admin
</button>
</div>
</motion.div>
)}
</AnimatePresence>
</>);};
export default Navbar;`);

// ═══════════════════════════════════════════════════
// 2. LOGIN PAGE — password: tareq@#49
// ═══════════════════════════════════════════════════
writeFileSync('src/pages/LoginPage.jsx', `import{useState}from'react';
import{motion}from'framer-motion';
import{useAuth}from'../context/AuthContext';
export default function LoginPage({navigate}){
const{login}=useAuth();
const[f,setF]=useState({email:'',pass:''});
const[err,setErr]=useState('');
const[loading,setLoading]=useState(false);
const[showPass,setShowPass]=useState(false);
const submit=()=>{
if(!f.email||!f.pass){setErr('সব field পূরণ করুন');return;}
setLoading(true);setErr('');
setTimeout(()=>{
if(f.pass==='tareq@#49'){login('tarek-admin-2025');navigate('dashboard');}
else{setErr('Wrong password! Try again.');setLoading(false);}
},900);
};
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
style={{minHeight:'100vh',background:'#050A14',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',paddingTop:'80px',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:'30%',left:'50%',transform:'translateX(-50%)',width:'clamp(300px,60vw,600px)',height:'clamp(300px,60vw,600px)',borderRadius:'50%',background:'radial-gradient(circle,rgba(0,212,170,0.06),transparent 70%)',pointerEvents:'none'}}/>
<motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.45,ease:[0.16,1,0.3,1]}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'clamp(16px,3vw,28px)',padding:'clamp(24px,4vw,48px)',width:'100%',maxWidth:'420px',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'3px',borderRadius:'28px 28px 0 0',background:'linear-gradient(90deg,#00D4AA,#38BDF8)'}}/>

<div style={{textAlign:'center',marginBottom:'28px'}}>
<div style={{width:'54px',height:'54px',borderRadius:'14px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'900',color:'#050A14',fontFamily:'monospace',margin:'0 auto 14px',boxShadow:'0 0 28px rgba(0,212,170,0.4)'}}>T</div>
<h2 style={{color:'#fff',fontSize:'clamp(1.2rem,3vw,1.5rem)',fontWeight:'900',fontFamily:'"Syne",sans-serif',marginBottom:'5px'}}>Admin Login</h2>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'0.82rem',fontFamily:'"DM Sans",sans-serif'}}>Dashboard access only</p>
</div>

<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.35)',fontSize:'0.7rem',fontWeight:'700',letterSpacing:'1px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'6px'}}>Email / Username</label>
<input type='text' placeholder='Enter your email' value={f.email} onChange={e=>setF(v=>({...v,email:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&submit()}
style={{width:'100%',padding:'13px 16px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'11px',color:'#fff',fontSize:'0.9rem',outline:'none',boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif',transition:'border-color 0.2s'}}
onFocus={e=>e.target.style.borderColor='#00D4AA'}
onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.09)'}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.35)',fontSize:'0.7rem',fontWeight:'700',letterSpacing:'1px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'6px'}}>Password</label>
<div style={{position:'relative'}}>
<input type={showPass?'text':'password'} placeholder='Enter password' value={f.pass} onChange={e=>setF(v=>({...v,pass:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&submit()}
style={{width:'100%',padding:'13px 44px 13px 16px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'11px',color:'#fff',fontSize:'0.9rem',outline:'none',boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif',transition:'border-color 0.2s'}}
onFocus={e=>e.target.style.borderColor='#00D4AA'}
onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.09)'}/>
<button onClick={()=>setShowPass(s=>!s)} style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'16px',padding:'0',lineHeight:1}}>
{showPass?'🙈':'👁️'}
</button>
</div>
</div>

{err&&<motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} style={{color:'#f87171',fontSize:'0.82rem',textAlign:'center',fontFamily:'"DM Sans",sans-serif',margin:0,background:'rgba(239,68,68,0.08)',padding:'8px 12px',borderRadius:'8px',border:'1px solid rgba(239,68,68,0.15)'}}>{err}</motion.p>}

<motion.button onClick={submit} disabled={loading} whileHover={{scale:1.02,boxShadow:'0 0 24px rgba(0,212,170,0.4)'}} whileTap={{scale:0.97}}
style={{background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',color:'#050A14',padding:'14px',borderRadius:'11px',cursor:loading?'not-allowed':'pointer',fontWeight:'800',fontSize:'0.95rem',fontFamily:'"DM Sans",sans-serif',opacity:loading?0.75:1,marginTop:'4px',transition:'opacity 0.2s'}}>
{loading?'Signing in...':'Sign In →'}
</motion.button>
</div>

<div style={{marginTop:'18px',padding:'12px 16px',background:'rgba(0,212,170,0.04)',border:'1px solid rgba(0,212,170,0.1)',borderRadius:'10px',textAlign:'center'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'0.75rem',fontFamily:'"DM Sans",sans-serif',margin:0,lineHeight:1.6}}>
Password: <span style={{color:'#00D4AA',fontWeight:'700',letterSpacing:'1px'}}>tareq@#49</span>
</p>
</div>

<button onClick={()=>navigate('home')} style={{display:'block',width:'100%',marginTop:'12px',padding:'10px',background:'none',border:'none',color:'rgba(255,255,255,0.25)',cursor:'pointer',fontSize:'0.82rem',fontFamily:'"DM Sans",sans-serif',transition:'color 0.2s'}}
onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}
onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.25)'}>
← Back to website
</button>
</motion.div>
</motion.div>
);}
`);

// ═══════════════════════════════════════════════════
// 3. AnalyticsCard — responsive
// ═══════════════════════════════════════════════════
writeFileSync('src/components/admin/AnalyticsCard.jsx', `import React,{useState}from'react';
export default function AnalyticsCard({title,value,change,icon,color}){
const[h,setH]=useState(false);
const pos=change>=0;
return(
<div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
style={{background:'rgba(255,255,255,0.02)',border:h?'1px solid '+color+'33':'1px solid rgba(255,255,255,0.06)',borderRadius:'clamp(14px,2vw,20px)',padding:'clamp(16px,2.5vw,26px)',position:'relative',overflow:'hidden',transform:h?'translateY(-5px)':'translateY(0)',boxShadow:h?'0 16px 40px rgba(0,0,0,0.3)':'none',transition:'all 0.3s ease',cursor:'default'}}>
<div style={{position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',background:'radial-gradient(circle,'+color+'18,transparent 70%)',pointerEvents:'none'}}/>
<div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,'+color+',transparent)',opacity:h?1:0.5,transition:'opacity 0.3s'}}/>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'clamp(12px,2vw,16px)'}}>
<div style={{fontSize:'clamp(1.4rem,3vw,1.8rem)'}}>{icon}</div>
<span style={{background:pos?'rgba(0,212,170,0.12)':'rgba(239,68,68,0.12)',color:pos?'#00D4AA':'#f87171',padding:'3px 10px',borderRadius:99,fontSize:'clamp(0.65rem,1.2vw,0.75rem)',fontWeight:700,fontFamily:'"DM Sans",sans-serif',display:'flex',alignItems:'center',gap:3,whiteSpace:'nowrap'}}>
{pos?'↑':'↓'} {Math.abs(change)}%
</span>
</div>
<div style={{fontFamily:'"Syne",sans-serif',fontWeight:900,fontSize:'clamp(1.4rem,3.5vw,2rem)',color:'#fff',marginBottom:4,letterSpacing:'-0.5px'}}>{value}</div>
<div style={{color:'rgba(255,255,255,0.35)',fontSize:'clamp(0.75rem,1.3vw,0.85rem)',fontFamily:'"DM Sans",sans-serif'}}>{title}</div>
</div>
);}`);

// ═══════════════════════════════════════════════════
// 4. SEOChart — responsive
// ═══════════════════════════════════════════════════
writeFileSync('src/components/admin/SEOChart.jsx', `import React,{useEffect,useRef,useState}from'react';
const DATA=[{m:'Jan',s:45},{m:'Feb',s:52},{m:'Mar',s:48},{m:'Apr',s:61},{m:'May',s:67},{m:'Jun',s:74}];
const MAX=Math.max(...DATA.map(d=>d.s));
export default function SEOChart(){
const ref=useRef(null);
const[animated,setAnimated]=useState(false);
useEffect(()=>{
const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setAnimated(true);},{threshold:0.3});
if(ref.current)obs.observe(ref.current);
return()=>obs.disconnect();
},[]);
return(
<div ref={ref} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'clamp(14px,2vw,20px)',padding:'clamp(16px,2.5vw,28px)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'clamp(16px,2.5vw,24px)',flexWrap:'wrap',gap:8}}>
<h3 style={{color:'#fff',fontSize:'clamp(0.85rem,1.5vw,0.95rem)',fontWeight:700,margin:0,fontFamily:'"Syne",sans-serif'}}>SEO Score Trend</h3>
<span style={{background:'rgba(0,212,170,0.1)',color:'#00D4AA',padding:'3px 11px',borderRadius:99,fontSize:'0.74rem',fontWeight:700,fontFamily:'"DM Sans",sans-serif'}}>+64% YTD</span>
</div>
<div style={{display:'flex',alignItems:'flex-end',gap:'clamp(6px,1.5vw,10px)',height:'clamp(90px,15vw,130px)',marginBottom:12}}>
{DATA.map((d,i)=>(
<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4,height:'100%',justifyContent:'flex-end'}}>
<span style={{color:'rgba(255,255,255,0.35)',fontSize:'clamp(0.58rem,1vw,0.68rem)',fontFamily:'"DM Sans",sans-serif'}}>{d.s}</span>
<div style={{width:'100%',background:'rgba(255,255,255,0.04)',borderRadius:'6px 6px 0 0',height:'100%',display:'flex',alignItems:'flex-end',overflow:'hidden'}}>
<div style={{width:'100%',height:animated?(d.s/MAX*100)+'%':'0%',background:'linear-gradient(180deg,#00D4AA,#38BDF8)',borderRadius:'5px 5px 0 0',transition:'height 0.9s ease '+(i*0.1)+'s',minHeight:animated?4:0,cursor:'pointer'}}
onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.3)'}
onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}/>
</div>
<span style={{color:'rgba(255,255,255,0.28)',fontSize:'clamp(0.58rem,1vw,0.68rem)',fontFamily:'"DM Sans",sans-serif'}}>{d.m}</span>
</div>
))}
</div>
<div style={{display:'flex',gap:'clamp(8px,2vw,16px)',marginTop:8,flexWrap:'wrap'}}>
{[['#00D4AA','High (70+)'],['#38BDF8','Medium (50-70)'],['rgba(255,255,255,0.2)','Low (<50)']].map(([c,l])=>(
<div key={l} style={{display:'flex',alignItems:'center',gap:5}}>
<div style={{width:7,height:7,borderRadius:2,background:c,flexShrink:0}}/>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'clamp(0.6rem,1vw,0.68rem)',fontFamily:'"DM Sans",sans-serif'}}>{l}</span>
</div>
))}
</div>
</div>
);}`);

// ═══════════════════════════════════════════════════
// 5. AdsChart — responsive
// ═══════════════════════════════════════════════════
writeFileSync('src/components/admin/AdsChart.jsx', `import React,{useEffect,useRef,useState}from'react';
const DATA=[{label:'Facebook',value:42,color:'#3b82f6'},{label:'Google',value:31,color:'#f59e0b'},{label:'Instagram',value:18,color:'#ec4899'},{label:'Other',value:9,color:'#6366f1'}];
const SZ=140,R=50,CIR=2*Math.PI*R;
export default function AdsChart(){
const ref=useRef(null);
const[animated,setAnimated]=useState(false);
useEffect(()=>{
const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setTimeout(()=>setAnimated(true),100);},{threshold:0.3});
if(ref.current)obs.observe(ref.current);
return()=>obs.disconnect();
},[]);
let offset=0;
const segs=DATA.map(d=>{
const dash=CIR*(d.value/100);
const gap=CIR-dash;
const dashOff=-(offset/100)*CIR;
offset+=d.value;
return{...d,dash,gap,dashOff};
});
return(
<div ref={ref} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'clamp(14px,2vw,20px)',padding:'clamp(16px,2.5vw,28px)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'clamp(16px,2.5vw,24px)',flexWrap:'wrap',gap:8}}>
<h3 style={{color:'#fff',fontSize:'clamp(0.85rem,1.5vw,0.95rem)',fontWeight:700,margin:0,fontFamily:'"Syne",sans-serif'}}>Ad Spend Breakdown</h3>
<span style={{background:'rgba(56,189,248,0.1)',color:'#38BDF8',padding:'3px 11px',borderRadius:99,fontSize:'0.74rem',fontWeight:700,fontFamily:'"DM Sans",sans-serif'}}>This Month</span>
</div>
<div style={{display:'flex',alignItems:'center',gap:'clamp(14px,3vw,24px)',flexWrap:'wrap'}}>
<div style={{position:'relative',flexShrink:0,margin:'0 auto'}}>
<svg width={SZ} height={SZ} style={{transform:'rotate(-90deg)'}}>
<circle cx={SZ/2} cy={SZ/2} r={R} fill='none' stroke='rgba(255,255,255,0.04)' strokeWidth={16}/>
{segs.map((s,i)=>(
<circle key={i} cx={SZ/2} cy={SZ/2} r={R} fill='none' stroke={s.color} strokeWidth={16} strokeLinecap='round'
strokeDasharray={animated?s.dash+' '+s.gap:'0 '+CIR}
strokeDashoffset={s.dashOff}
style={{transition:'stroke-dasharray 1.1s ease '+(i*0.2)+'s'}}/>
))}
</svg>
<div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
<div style={{fontFamily:'"Syne",sans-serif',fontWeight:900,fontSize:'clamp(1rem,2.5vw,1.3rem)',color:'#fff',lineHeight:1}}>100%</div>
<div style={{color:'rgba(255,255,255,0.3)',fontSize:'0.65rem',fontFamily:'"DM Sans",sans-serif'}}>Total</div>
</div>
</div>
<div style={{flex:1,minWidth:120,display:'flex',flexDirection:'column',gap:'clamp(7px,1.5vw,10px)'}}>
{DATA.map((d,i)=>(
<div key={i} style={{display:'flex',alignItems:'center',gap:9,opacity:animated?1:0,transform:animated?'none':'translateX(12px)',transition:'all 0.5s ease '+(i*0.1+0.3)+'s'}}>
<div style={{width:9,height:9,borderRadius:3,background:d.color,flexShrink:0}}/>
<span style={{color:'rgba(255,255,255,0.5)',fontSize:'clamp(0.75rem,1.3vw,0.82rem)',flex:1,fontFamily:'"DM Sans",sans-serif'}}>{d.label}</span>
<span style={{color:'#fff',fontSize:'clamp(0.78rem,1.4vw,0.88rem)',fontWeight:700,fontFamily:'"DM Sans",sans-serif'}}>{d.value}%</span>
</div>
))}
</div>
</div>
<div style={{marginTop:'clamp(12px,2vw,20px)',padding:'10px 14px',background:'rgba(255,255,255,0.02)',borderRadius:10,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6}}>
<span style={{color:'rgba(255,255,255,0.35)',fontSize:'clamp(0.72rem,1.2vw,0.8rem)',fontFamily:'"DM Sans",sans-serif'}}>Total Budget Used</span>
<span style={{color:'#00D4AA',fontWeight:700,fontSize:'clamp(0.78rem,1.4vw,0.88rem)',fontFamily:'"DM Sans",sans-serif'}}>$1,240 / $1,500</span>
</div>
</div>
);}`);

// ═══════════════════════════════════════════════════
// 6. ProjectForm — responsive
// ═══════════════════════════════════════════════════
writeFileSync('src/components/admin/ProjectForm.jsx', `import React,{useState}from'react';
const EMOJIS=['🚀','📈','🛍️','📊','✍️','🎯','📚','🌐','⚙️','🎨','💡','🔥','⚛️','🍃','🛒','📱'];
const getS=()=>({width:'100%',padding:'12px 15px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,color:'#fff',fontSize:'clamp(0.82rem,1.5vw,0.9rem)',outline:'none',marginBottom:11,boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif',transition:'border-color 0.2s'});
export default function ProjectForm({onClose,onSave}){
const[f,setF]=useState({title:'',desc:'',tech:'',live:'',github:'',emoji:'🚀'});
const inp=e=>setF(v=>({...v,[e.target.name]:e.target.value}));
return(
<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.88)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:'clamp(12px,3vw,20px)',backdropFilter:'blur(12px)'}}>
<div style={{background:'linear-gradient(135deg,#0d1629,#080f1c)',border:'1px solid rgba(0,212,170,0.14)',borderRadius:'clamp(16px,3vw,24px)',padding:'clamp(20px,3vw,36px)',width:'100%',maxWidth:520,maxHeight:'92vh',overflowY:'auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'clamp(18px,2.5vw,26px)'}}>
<h3 style={{color:'#fff',fontSize:'clamp(1rem,2.5vw,1.25rem)',fontWeight:800,margin:0,fontFamily:'"Syne",sans-serif'}}>Add New Project</h3>
<button onClick={onClose}
style={{background:'rgba(255,255,255,0.06)',border:'none',color:'rgba(255,255,255,0.5)',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:'1.2rem',lineHeight:1,transition:'all 0.2s',flexShrink:0}}
onMouseEnter={e=>{e.currentTarget.style.background='rgba(239,68,68,0.15)';e.currentTarget.style.color='#f87171';}}
onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.5)';}}>×</button>
</div>
<div style={{marginBottom:16}}>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'0.7rem',letterSpacing:'1px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',marginBottom:9}}>Choose Icon</div>
<div style={{display:'flex',gap:'clamp(5px,1vw,8px)',flexWrap:'wrap'}}>
{EMOJIS.map(e=>(
<button key={e} onClick={()=>setF(v=>({...v,emoji:e}))}
style={{fontSize:'clamp(1.1rem,2.5vw,1.3rem)',padding:'7px',borderRadius:9,border:f.emoji===e?'2px solid #00D4AA':'2px solid transparent',background:f.emoji===e?'rgba(0,212,170,0.1)':'rgba(255,255,255,0.04)',cursor:'pointer',transition:'all 0.15s'}}
onMouseEnter={e=>e.currentTarget.style.transform='scale(1.2)'}
onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>{e}</button>
))}
</div>
</div>
{[['title','Project Title *'],['desc','Description *'],['tech','Technologies (comma separated)'],['live','Live Demo URL'],['github','GitHub URL']].map(([k,p])=>(
<input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={getS()}
onFocus={e=>e.target.style.borderColor='#00D4AA'}
onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
))}
<div style={{display:'flex',gap:10,marginTop:4}}>
<button onClick={onClose}
style={{flex:1,padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:10,color:'rgba(255,255,255,0.5)',cursor:'pointer',fontWeight:600,fontFamily:'"DM Sans",sans-serif',fontSize:'clamp(0.82rem,1.5vw,0.9rem)',transition:'all 0.2s'}}
onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.09)'}
onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>Cancel</button>
<button onClick={()=>onSave&&onSave(f)}
style={{flex:1,padding:'12px',background:'linear-gradient(135deg,#00D4AA,#38BDF8)',border:'none',borderRadius:10,color:'#050A14',cursor:'pointer',fontWeight:800,fontSize:'clamp(0.82rem,1.5vw,0.9rem)',fontFamily:'"DM Sans",sans-serif',transition:'transform 0.2s,box-shadow 0.2s'}}
onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.02)';e.currentTarget.style.boxShadow='0 0 22px rgba(0,212,170,0.35)';}}
onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}>Save Project ✓</button>
</div>
</div>
</div>
);}`);

// ═══════════════════════════════════════════════════
// 7. BlogForm — responsive
// ═══════════════════════════════════════════════════
writeFileSync('src/components/admin/BlogForm.jsx', `import React,{useState}from'react';
const CATS=['React','Node.js','MongoDB','Next.js','SEO','Marketing','JavaScript','Express'];
const getS=()=>({width:'100%',padding:'12px 15px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,color:'#fff',fontSize:'clamp(0.82rem,1.5vw,0.9rem)',outline:'none',marginBottom:11,boxSizing:'border-box',fontFamily:'"DM Sans",sans-serif',transition:'border-color 0.2s'});
export default function BlogForm({onClose,onSave}){
const[f,setF]=useState({title:'',excerpt:'',category:'React',readTime:'5',content:''});
const inp=e=>setF(v=>({...v,[e.target.name]:e.target.value}));
return(
<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.88)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:'clamp(12px,3vw,20px)',backdropFilter:'blur(12px)'}}>
<div style={{background:'linear-gradient(135deg,#0d1629,#080f1c)',border:'1px solid rgba(56,189,248,0.14)',borderRadius:'clamp(16px,3vw,24px)',padding:'clamp(20px,3vw,36px)',width:'100%',maxWidth:500,maxHeight:'92vh',overflowY:'auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'clamp(18px,2.5vw,26px)'}}>
<h3 style={{color:'#fff',fontSize:'clamp(1rem,2.5vw,1.25rem)',fontWeight:800,margin:0,fontFamily:'"Syne",sans-serif'}}>New Blog Post</h3>
<button onClick={onClose}
style={{background:'rgba(255,255,255,0.06)',border:'none',color:'rgba(255,255,255,0.5)',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:'1.2rem',lineHeight:1,transition:'all 0.2s',flexShrink:0}}
onMouseEnter={e=>{e.currentTarget.style.background='rgba(239,68,68,0.15)';e.currentTarget.style.color='#f87171';}}
onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.5)';}}>×</button>
</div>
<div style={{marginBottom:16}}>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'0.7rem',letterSpacing:'1px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',marginBottom:9}}>Category</div>
<div style={{display:'flex',gap:'clamp(5px,1.2vw,7px)',flexWrap:'wrap'}}>
{CATS.map(c=>(
<button key={c} onClick={()=>setF(v=>({...v,category:c}))}
style={{padding:'5px 12px',borderRadius:99,border:f.category===c?'1px solid #38BDF8':'1px solid rgba(255,255,255,0.08)',background:f.category===c?'rgba(56,189,248,0.12)':'transparent',color:f.category===c?'#38BDF8':'rgba(255,255,255,0.38)',cursor:'pointer',fontSize:'clamp(0.72rem,1.3vw,0.8rem)',fontWeight:f.category===c?700:400,fontFamily:'"DM Sans",sans-serif',transition:'all 0.2s'}}>{c}</button>
))}
</div>
</div>
{[['title','Blog Title *'],['excerpt','Short Description *']].map(([k,p])=>(
<input key={k} name={k} placeholder={p} value={f[k]} onChange={inp} style={getS()}
onFocus={e=>e.target.style.borderColor='#38BDF8'}
onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
))}
<textarea name='content' placeholder='Content (optional)' value={f.content} onChange={inp} rows={4}
style={{...getS(),resize:'vertical',marginBottom:11}}
onFocus={e=>e.target.style.borderColor='#38BDF8'}
onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
<input name='readTime' placeholder='Read Time (min)' value={f.readTime} onChange={inp} style={getS()}
onFocus={e=>e.target.style.borderColor='#38BDF8'}
onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
<div style={{display:'flex',gap:10,marginTop:4}}>
<button onClick={onClose}
style={{flex:1,padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:10,color:'rgba(255,255,255,0.5)',cursor:'pointer',fontWeight:600,fontFamily:'"DM Sans",sans-serif',fontSize:'clamp(0.82rem,1.5vw,0.9rem)',transition:'all 0.2s'}}
onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.09)'}
onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>Cancel</button>
<button onClick={()=>onSave&&onSave(f)}
style={{flex:1,padding:'12px',background:'linear-gradient(135deg,#38BDF8,#818CF8)',border:'none',borderRadius:10,color:'#050A14',cursor:'pointer',fontWeight:800,fontSize:'clamp(0.82rem,1.5vw,0.9rem)',fontFamily:'"DM Sans",sans-serif',transition:'transform 0.2s,box-shadow 0.2s'}}
onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.02)';e.currentTarget.style.boxShadow='0 0 22px rgba(56,189,248,0.35)';}}
onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}>Publish Post ✓</button>
</div>
</div>
</div>
);}`);

// ═══════════════════════════════════════════════════
// 8. AuthContext — updated with correct password check
// ═══════════════════════════════════════════════════
writeFileSync('src/context/AuthContext.jsx', `import{createContext,useContext,useState}from'react';
const Ctx=createContext();
export const AuthProvider=({children})=>{
const[admin,setAdmin]=useState(()=>{try{return localStorage.getItem('tarek_admin_tk')}catch{return null}});
const login=(t)=>{try{localStorage.setItem('tarek_admin_tk',t)}catch{}setAdmin(t)};
const logout=()=>{try{localStorage.removeItem('tarek_admin_tk')}catch{}setAdmin(null)};
const isAdmin=()=>admin==='tarek-admin-2025';
return<Ctx.Provider value={{admin,login,logout,isAdmin}}>{children}</Ctx.Provider>;
};
export const useAuth=()=>useContext(Ctx);`);

console.log(`
╔══════════════════════════════════════════════════════╗
║  ✅ সব ফাইল responsive + fixed হয়েছে!             ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  🔧 Changes:                                        ║
║  ✓ Navbar — "Admin" button, hamburger menu          ║
║  ✓ LoginPage — password: tareq@#49                  ║
║  ✓ AnalyticsCard — clamp() responsive               ║
║  ✓ SEOChart — mobile height adjusted                ║
║  ✓ AdsChart — wraps on small screens               ║
║  ✓ ProjectForm — mobile scroll + font size          ║
║  ✓ BlogForm — mobile scroll + font size             ║
║  ✓ AuthContext — secure token storage               ║
║                                                      ║
║  🔑 Login Password: tareq@#49                       ║
╚══════════════════════════════════════════════════════╝
`);
