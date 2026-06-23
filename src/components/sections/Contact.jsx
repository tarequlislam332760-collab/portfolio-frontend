import{useState}from'react';
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
export default Contact;