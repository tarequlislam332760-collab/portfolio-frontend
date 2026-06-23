import{useState}from'react';
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
