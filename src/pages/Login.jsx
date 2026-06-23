
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'',password:'' });
  const [error, setError] = useState('');
  const handleSubmit = () => {
    if(form.email==='admin@tarek.dev' && form.password==='admin123') { login('demo-token'); navigate('/dashboard'); }
    else setError('Email or password incorrect');
  };
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={{ minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#08080f,#0d0d1a)' }}>
      <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }} transition={{ delay:0.1 }}
        style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'28px',padding:'48px',width:'100%',maxWidth:'380px',margin:'0 20px' }}>
        <div style={{ textAlign:'center',marginBottom:'36px' }}>
          <div style={{ fontSize:'40px',marginBottom:'12px' }}>🔐</div>
          <h2 style={{ fontFamily:'Syne,sans-serif',color:'#fff',fontSize:'26px',fontWeight:'800',marginBottom:'6px' }}>Admin Login</h2>
          <p style={{ color:'#555',fontSize:'13px' }}>Tarek Portfolio Dashboard</p>
        </div>
        {[['email','Email','admin@tarek.dev'],['password','Password','password']].map(([k,l,ph])=>(
          <div key={k} style={{ marginBottom:'16px' }}>
            <label style={{ color:'#666',fontSize:'13px',display:'block',marginBottom:'6px' }}>{l}</label>
            <input type={k} placeholder={ph} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
              style={{ width:'100%',padding:'13px 16px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#fff',fontSize:'14px',outline:'none',boxSizing:'border-box' }}/>
          </div>
        ))}
        {error && <p style={{ color:'#ff6b6b',fontSize:'13px',marginBottom:'12px' }}>{error}</p>}
        <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }} onClick={handleSubmit}
          style={{ width:'100%',padding:'14px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'12px',color:'#fff',fontWeight:'700',fontSize:'15px',cursor:'pointer',marginTop:'8px' }}>
          Login to Dashboard
        </motion.button>
        <Link to="/" style={{ display:'block',color:'#444',fontSize:'13px',textAlign:'center',marginTop:'20px',textDecoration:'none' }}>← Back to Portfolio</Link>
        <p style={{ color:'#333',fontSize:'11px',textAlign:'center',marginTop:'8px' }}>Demo: admin@tarek.dev / admin123</p>
      </motion.div>
    </motion.div>
  );
}
