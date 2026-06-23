import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('src/components/sections', { recursive: true });
mkdirSync('src/components/common', { recursive: true });
mkdirSync('src/components/admin', { recursive: true });
mkdirSync('src/context', { recursive: true });

// HERO
writeFileSync('src/components/sections/Hero.jsx', `
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = ['MERN Full Stack Developer', 'Digital Marketer', 'React Specialist', 'Node.js Expert'];

const Hero = ({ navigate }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIndex];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1500);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg,#0a0a0f 0%,#0d0d1a 50%,#0a0a0f 100%)', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      \`}</style>

      {/* Animated background orbs */}
      <div style={{ position:'absolute', top:'10%', left:'5%', width:'500px', height:'500px', background:'radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)', animation:'float 8s ease-in-out infinite', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'10%', right:'5%', width:'400px', height:'400px', background:'radial-gradient(circle,rgba(236,72,153,0.1) 0%,transparent 70%)', animation:'float 10s ease-in-out infinite reverse', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', top:'50%', left:'50%', width:'600px', height:'600px', background:'radial-gradient(circle,rgba(0,200,150,0.05) 0%,transparent 70%)', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>

      {/* Rotating ring */}
      <div style={{ position:'absolute', top:'15%', right:'10%', width:'300px', height:'300px', border:'1px solid rgba(99,102,241,0.15)', borderRadius:'50%', animation:'rotate 20s linear infinite', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', top:'20%', right:'15%', width:'200px', height:'200px', border:'1px solid rgba(236,72,153,0.1)', borderRadius:'50%', animation:'rotate 15s linear infinite reverse', pointerEvents:'none' }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 40px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center', width:'100%' }}>

        {/* Left Content */}
        <motion.div initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.9 }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(0,200,150,0.1)', border:'1px solid rgba(0,200,150,0.25)', borderRadius:'50px', padding:'6px 16px', marginBottom:'28px' }}>
            <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#00C896', animation:'pulse 2s infinite', display:'inline-block' }}/>
            <span style={{ color:'#00C896', fontSize:'13px', fontWeight:'600', letterSpacing:'1px' }}>Available for work</span>
          </motion.div>

          <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(42px,5vw,68px)', fontWeight:'800', color:'#fff', lineHeight:'1.05', marginBottom:'20px' }}>
            Hi, I am<br/>
            <span style={{ background:'linear-gradient(135deg,#6366f1,#ec4899,#00C896)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Tarikul Islam<br/>Tarek
            </span>
          </h1>

          <div style={{ height:'36px', marginBottom:'24px', display:'flex', alignItems:'center' }}>
            <span style={{ color:'#8888aa', fontSize:'18px', fontFamily:'DM Sans,sans-serif' }}>{displayed}</span>
            <span style={{ color:'#6366f1', fontSize:'22px', animation:'pulse 1s infinite', marginLeft:'2px' }}>|</span>
          </div>

          <p style={{ color:'#6666aa', fontSize:'16px', lineHeight:'1.8', fontFamily:'DM Sans,sans-serif', marginBottom:'40px', maxWidth:'460px' }}>
            MERN Stack developer with 2 live Vercel projects. Building scalable web apps and growing businesses through digital marketing.
          </p>

          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            <motion.button whileHover={{ scale:1.05, boxShadow:'0 0 40px rgba(99,102,241,0.5)' }} whileTap={{ scale:0.95 }}
              onClick={() => navigate('projects')}
              style={{ padding:'14px 32px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', borderRadius:'50px', color:'#fff', fontWeight:'700', fontSize:'15px', cursor:'pointer', boxShadow:'0 0 20px rgba(99,102,241,0.3)' }}>
              View Projects
            </motion.button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => navigate('contact')}
              style={{ padding:'14px 32px', background:'transparent', border:'1px solid rgba(99,102,241,0.5)', borderRadius:'50px', color:'#6366f1', fontWeight:'700', fontSize:'15px', cursor:'pointer' }}>
              Hire Me
            </motion.button>
          </div>

          {/* Stats */}
          <div style={{ display:'flex', gap:'32px', marginTop:'48px' }}>
            {[['2+','Live Projects'],['1+','Years Exp'],['100%','Client Sat']].map(([v,l],i)=>(
              <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6+i*0.1 }}>
                <div style={{ fontSize:'28px', fontWeight:'800', color:'#fff', fontFamily:'Syne,sans-serif' }}>{v}</div>
                <div style={{ fontSize:'12px', color:'#555', marginTop:'2px' }}>{l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Photo */}
        <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.9, delay:0.2 }} style={{ position:'relative', display:'flex', justifyContent:'center' }}>
          <div style={{ position:'relative', width:'380px', height:'420px' }}>
            {/* Glow behind photo */}
            <div style={{ position:'absolute', inset:'-20px', background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(236,72,153,0.2))', borderRadius:'40px', filter:'blur(30px)' }}/>
            {/* Photo frame */}
            <div style={{ position:'relative', width:'100%', height:'100%', borderRadius:'32px', overflow:'hidden', border:'1px solid rgba(99,102,241,0.3)' }}>
              <img src="/profile.png" alt="Tarikul Islam Tarek"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
              <div style={{ display:'none', width:'100%', height:'100%', background:'linear-gradient(135deg,#1a1a2e,#16213e)', alignItems:'center', justifyContent:'center', fontSize:'80px' }}>👨‍💻</div>
            </div>
            {/* Floating badge */}
            <motion.div animate={{ y:[0,-10,0] }} transition={{ repeat:Infinity, duration:3 }}
              style={{ position:'absolute', bottom:'30px', left:'-30px', background:'rgba(10,10,20,0.9)', backdropFilter:'blur(20px)', border:'1px solid rgba(99,102,241,0.3)', borderRadius:'16px', padding:'14px 18px' }}>
              <div style={{ color:'#fff', fontSize:'16px', fontWeight:'800' }}>MERN</div>
              <div style={{ color:'#6366f1', fontSize:'11px' }}>Full Stack</div>
            </motion.div>
            <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:4, delay:1 }}
              style={{ position:'absolute', top:'30px', right:'-20px', background:'rgba(10,10,20,0.9)', backdropFilter:'blur(20px)', border:'1px solid rgba(236,72,153,0.3)', borderRadius:'16px', padding:'14px 18px' }}>
              <div style={{ color:'#fff', fontSize:'16px', fontWeight:'800' }}>2</div>
              <div style={{ color:'#ec4899', fontSize:'11px' }}>Live Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
`);

console.log('Hero done');
