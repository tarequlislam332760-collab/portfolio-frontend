
import { motion } from 'framer-motion';
const skills = [['React.js',90],['Node.js',85],['MongoDB',82],['Express.js',85],['Next.js',75],['Digital Marketing',80],['SEO',78],['Tailwind CSS',88]];
export default function AboutPage() {
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        @media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}.about-photo{width:260px!important;height:300px!important;margin:0 auto!important;}}
      `}</style>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 5%' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} style={{ marginBottom:'80px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,#6366f1,#ec4899)' }}/>
            <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600',letterSpacing:'3px',textTransform:'uppercase' }}>About Me</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:'800',color:'#fff',lineHeight:'1.1' }}>
            Passionate about<br/>
            <span style={{ background:'linear-gradient(135deg,#6366f1,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>crafting digital</span> experiences
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="about-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center',marginBottom:'80px' }}>
          {/* Photo */}
          <motion.div initial={{ opacity:0,x:-50 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.8 }} style={{ display:'flex',justifyContent:'center' }}>
            <div className="about-photo" style={{ position:'relative',width:'360px',height:'420px' }}>
              <div style={{ position:'absolute',inset:'-16px',background:'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(236,72,153,0.15))',borderRadius:'40px',filter:'blur(24px)' }}/>
              <div style={{ position:'relative',width:'100%',height:'100%',borderRadius:'28px',overflow:'hidden',border:'1px solid rgba(99,102,241,0.2)' }}>
                <img src="/profile.jpg" alt="Tarikul Islam Tarek" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'top' }}
                  onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
                <div style={{ display:'none',width:'100%',height:'100%',background:'linear-gradient(135deg,#1a1a2e,#16213e)',alignItems:'center',justifyContent:'center',fontSize:'80px' }}>👨‍💻</div>
              </div>
              <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity,duration:3 }}
                style={{ position:'absolute',bottom:'24px',right:'-20px',background:'rgba(8,8,15,0.95)',backdropFilter:'blur(20px)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:'14px',padding:'12px 16px' }}>
                <div style={{ color:'#fff',fontSize:'18px',fontWeight:'800' }}>3+</div>
                <div style={{ color:'#6366f1',fontSize:'11px' }}>Years Exp</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity:0,x:50 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.8,delay:0.2 }}>
            <p style={{ color:'#8888aa',fontSize:'16px',lineHeight:'1.8',fontFamily:'DM Sans,sans-serif',marginBottom:'20px' }}>
              আমি Tarikul Islam Tarek — একজন passionate MERN Full Stack Developer এবং Digital Marketer। আমি modern, scalable web applications তৈরি করি এবং businesses কে digital world এ grow করতে সাহায্য করি।
            </p>
            <p style={{ color:'#6666aa',fontSize:'16px',lineHeight:'1.8',fontFamily:'DM Sans,sans-serif',marginBottom:'36px' }}>
              Currently 2টি full-stack project Vercel এ live আছে। প্রতিটি project এ clean code, best practices এবং user-first design follow করি।
            </p>
            {/* Stats */}
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'36px' }}>
              {[['2+','Live Projects'],['1+','Years Experience'],['100%','Client Satisfaction'],['10+','Technologies']].map(([v,l],i)=>(
                <motion.div key={i} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4+i*0.1 }}
                  style={{ padding:'20px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px' }}>
                  <div style={{ fontSize:'28px',fontWeight:'800',color:'#fff',fontFamily:'Syne,sans-serif' }}>{v}</div>
                  <div style={{ fontSize:'13px',color:'#555',marginTop:'4px' }}>{l}</div>
                </motion.div>
              ))}
            </div>
            <motion.a href="/cv.pdf" download whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex',alignItems:'center',gap:'10px',padding:'14px 32px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',borderRadius:'50px',textDecoration:'none',fontWeight:'700',fontSize:'15px',boxShadow:'0 0 30px rgba(99,102,241,0.3)' }}>
              Download CV ↓
            </motion.a>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}>
          <h2 style={{ fontFamily:'Syne,sans-serif',color:'#fff',fontSize:'32px',fontWeight:'800',marginBottom:'40px' }}>My Skills</h2>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px' }}>
            {skills.map(([name,level],i)=>(
              <div key={i}>
                <div style={{ display:'flex',justifyContent:'space-between',color:'#ccc',fontSize:'14px',marginBottom:'8px' }}>
                  <span>{name}</span><span style={{ color:'#6366f1' }}>{level}%</span>
                </div>
                <div style={{ height:'6px',background:'rgba(255,255,255,0.06)',borderRadius:'99px' }}>
                  <motion.div initial={{ width:0 }} animate={{ width:level+'%' }} transition={{ duration:0.8,delay:i*0.1 }}
                    style={{ height:'100%',background:'linear-gradient(90deg,#6366f1,#ec4899)',borderRadius:'99px' }}/>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
