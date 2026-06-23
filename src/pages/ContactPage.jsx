
import { useState } from 'react';
import { motion } from 'framer-motion';
export default function ContactPage() {
  const [form, setForm] = useState({ name:'',email:'',subject:'',message:'' });
  const [sent, setSent] = useState(false);
  const info = [['📧','Email','tarek@example.com'],['📱','Phone','+880 1234 567890'],['📍','Location','Bangladesh'],['💼','Available','Mon - Fri, 9am - 6pm']];
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 5%' }}>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} style={{ marginBottom:'60px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,#6366f1,#ec4899)' }}/>
            <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600',letterSpacing:'3px' }}>CONTACT</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:'800',color:'#fff' }}>Get In Touch</h1>
        </motion.div>
        <div className="contact-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'40px' }}>
          {/* Info */}
          <div>
            <div style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(0,200,150,0.1)',border:'1px solid rgba(0,200,150,0.2)',borderRadius:'50px',padding:'6px 16px',marginBottom:'32px' }}>
              <span style={{ width:'8px',height:'8px',borderRadius:'50%',background:'#00C896',display:'inline-block' }}/>
              <span style={{ color:'#00C896',fontSize:'13px',fontWeight:'600' }}>Available for projects</span>
            </div>
            {info.map(([icon,label,val],i)=>(
              <motion.div key={i} initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.1 }}
                style={{ display:'flex',alignItems:'center',gap:'16px',padding:'20px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',marginBottom:'12px' }}>
                <span style={{ fontSize:'24px' }}>{icon}</span>
                <div>
                  <div style={{ color:'#555',fontSize:'12px',marginBottom:'2px' }}>{label}</div>
                  <div style={{ color:'#fff',fontSize:'14px',fontWeight:'600' }}>{val}</div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Form */}
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
            style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'40px' }}>
            {sent ? (
              <div style={{ textAlign:'center',padding:'40px 0' }}>
                <div style={{ fontSize:'60px',marginBottom:'16px' }}>✅</div>
                <h3 style={{ color:'#fff',fontSize:'22px',fontWeight:'800',marginBottom:'8px' }}>Message Sent!</h3>
                <p style={{ color:'#666' }}>I will get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
                  {[['name','Your Name'],['email','Email Address']].map(([k,p])=>(
                    <input key={k} placeholder={p} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
                      style={{ padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#fff',fontSize:'14px',outline:'none' }}/>
                  ))}
                </div>
                <input placeholder="Subject" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}
                  style={{ padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#fff',fontSize:'14px',outline:'none' }}/>
                <textarea placeholder="Your message..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={5}
                  style={{ padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#fff',fontSize:'14px',outline:'none',resize:'vertical' }}/>
                <motion.button whileHover={{ scale:1.02,boxShadow:'0 0 30px rgba(99,102,241,0.4)' }} whileTap={{ scale:0.98 }}
                  onClick={()=>setSent(true)}
                  style={{ padding:'15px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'12px',color:'#fff',fontWeight:'700',fontSize:'15px',cursor:'pointer' }}>
                  Send Message →
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
