import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('src/components/sections', { recursive: true });
mkdirSync('src/components/common', { recursive: true });
mkdirSync('src/components/admin', { recursive: true });
mkdirSync('src/context', { recursive: true });
mkdirSync('src/pages', { recursive: true });

// ─── APP.JSX ───
writeFileSync('src/App.jsx', `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/AboutPage';
import Projects from './pages/ProjectsPage';
import Blog from './pages/BlogPage';
import Contact from './pages/ContactPage';
import ProjectDetails from './pages/ProjectDetails';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/projects/:id" element={<Layout><ProjectDetails /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogDetails /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
`);

// ─── THEME CONTEXT ───
writeFileSync('src/context/ThemeContext.jsx', `
import { createContext, useContext, useState, useEffect } from 'react';
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light'); }, [dark]);
  return <ThemeContext.Provider value={{ dark, toggleTheme: () => setDark(d => !d) }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);
`);

// ─── AUTH CONTEXT ───
writeFileSync('src/context/AuthContext.jsx', `
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem('token'));
  const login = (token) => { localStorage.setItem('token', token); setAdmin(token); };
  const logout = () => { localStorage.removeItem('token'); setAdmin(null); };
  return <AuthContext.Provider value={{ admin, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
`);

// ─── NAVBAR ───
writeFileSync('src/components/common/Navbar.jsx', `
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .nl{position:relative;color:#666;font-size:14px;font-weight:500;text-decoration:none;padding:4px 0;transition:color 0.3s;}
        .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:linear-gradient(90deg,#6366f1,#ec4899);border-radius:2px;transition:width 0.3s;}
        .nl:hover,.nl.active{color:#fff;}
        .nl:hover::after,.nl.active::after{width:100%;}
        @media(max-width:768px){.desk-links{display:none!important;}.mob-btn{display:flex!important;}}
        .mob-btn{display:none;}
      \`}</style>

      <motion.nav initial={{ y:-80,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ duration:0.6 }}
        style={{ position:'fixed',top:0,left:0,right:0,zIndex:1000,
          padding: scrolled ? '12px 5%' : '20px 5%',
          background: scrolled ? 'rgba(6,6,12,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition:'all 0.4s ease',
          display:'flex',alignItems:'center',justifyContent:'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration:'none' }}>
          <motion.div whileHover={{ scale:1.05 }}
            style={{ fontFamily:'Syne,sans-serif',fontSize:'22px',fontWeight:'800',
              background:'linear-gradient(135deg,#6366f1,#ec4899,#00C896)',backgroundSize:'200% auto',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
              animation:'shimmer 4s linear infinite' }}>
            Tarek.dev
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="desk-links" style={{ display:'flex',gap:'32px',alignItems:'center' }}>
          {links.map(l => (
            <Link key={l.path} to={l.path} className={\`nl \${pathname===l.path?'active':''}\`}>{l.label}</Link>
          ))}
        </div>

        {/* Right */}
        <div style={{ display:'flex',gap:'10px',alignItems:'center' }}>
          <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} onClick={toggleTheme}
            style={{ width:'40px',height:'40px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',cursor:'pointer',fontSize:'18px',display:'flex',alignItems:'center',justifyContent:'center' }}>
            {dark ? '☀️' : '🌙'}
          </motion.button>
          <Link to="/login">
            <motion.button whileHover={{ scale:1.05,boxShadow:'0 0 20px rgba(99,102,241,0.4)' }} whileTap={{ scale:0.95 }}
              style={{ padding:'9px 22px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'50px',color:'#fff',fontWeight:'700',fontSize:'13px',cursor:'pointer' }}>
              Admin
            </motion.button>
          </Link>
          {/* Mobile Menu Button */}
          <button className="mob-btn" onClick={() => setMenuOpen(o => !o)}
            style={{ width:'40px',height:'40px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',cursor:'pointer',color:'#fff',fontSize:'20px',alignItems:'center',justifyContent:'center' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0,y:-20 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-20 }}
            style={{ position:'fixed',top:'64px',left:0,right:0,zIndex:999,background:'rgba(6,6,12,0.98)',backdropFilter:'blur(24px)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'20px 5%',display:'flex',flexDirection:'column',gap:'4px' }}>
            {links.map(l => (
              <Link key={l.path} to={l.path} onClick={() => setMenuOpen(false)}
                style={{ padding:'14px 16px',borderRadius:'12px',color:pathname===l.path?'#6366f1':'#888',textDecoration:'none',fontSize:'15px',fontWeight:'500',background:pathname===l.path?'rgba(99,102,241,0.1)':'transparent' }}>
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`);

// ─── FOOTER ───
writeFileSync('src/components/common/Footer.jsx', `
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function Footer() {
  return (
    <footer style={{ background:'#050508',borderTop:'1px solid rgba(255,255,255,0.05)',padding:'60px 5% 30px' }}>
      <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'40px',marginBottom:'40px' }}>
          <div>
            <div style={{ fontSize:'24px',fontWeight:'800',background:'linear-gradient(135deg,#6366f1,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'12px' }}>Tarek.dev</div>
            <p style={{ color:'#555',fontSize:'14px',lineHeight:'1.8',maxWidth:'280px' }}>MERN Full Stack Developer & Digital Marketer. Building modern web apps and growing businesses online.</p>
          </div>
          <div>
            <h4 style={{ color:'#fff',fontWeight:'700',marginBottom:'16px',fontSize:'14px' }}>Quick Links</h4>
            {['/','/about','/projects','/blog','/contact'].map((path,i) => (
              <Link key={i} to={path} style={{ display:'block',color:'#555',textDecoration:'none',fontSize:'14px',marginBottom:'8px',transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#6366f1'} onMouseLeave={e=>e.target.style.color='#555'}>
                {['Home','About','Projects','Blog','Contact'][i]}
              </Link>
            ))}
          </div>
          <div>
            <h4 style={{ color:'#fff',fontWeight:'700',marginBottom:'16px',fontSize:'14px' }}>Connect</h4>
            {[['GitHub','#'],['LinkedIn','#'],['Facebook','#'],['Email','mailto:tarek@example.com']].map(([l,h],i)=>(
              <a key={i} href={h} style={{ display:'block',color:'#555',textDecoration:'none',fontSize:'14px',marginBottom:'8px',transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#ec4899'} onMouseLeave={e=>e.target.style.color='#555'}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:'24px',textAlign:'center',color:'#333',fontSize:'13px' }}>
          © 2025 Tarikul Islam Tarek. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
`);

// ─── HOME PAGE ───
writeFileSync('src/pages/Home.jsx', `
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const roles = ['MERN Full Stack Developer','Digital Marketer','React Specialist','Node.js Expert'];

export default function Home() {
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
      } else { setRoleIndex(i => (i+1) % roles.length); setTyping(true); }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section style={{ minHeight:'100vh',display:'flex',alignItems:'center',background:'linear-gradient(135deg,#08080f 0%,#0d0d1a 50%,#08080f 100%)',position:'relative',overflow:'hidden',paddingTop:'80px' }}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important;text-align:center!important;}.hero-btns{justify-content:center!important;}.hero-stats{justify-content:center!important;}.hero-photo{display:none!important;}}
      \`}</style>

      {/* BG Orbs */}
      <div style={{ position:'absolute',top:'10%',left:'5%',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)',animation:'float 8s ease-in-out infinite',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'10%',right:'5%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(236,72,153,0.08) 0%,transparent 70%)',animation:'float 10s ease-in-out infinite reverse',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',top:'20%',right:'8%',width:'300px',height:'300px',border:'1px solid rgba(99,102,241,0.1)',borderRadius:'50%',animation:'rotate 25s linear infinite',pointerEvents:'none' }}/>

      <div className="hero-grid" style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 5%',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center',width:'100%' }}>

        {/* Left */}
        <motion.div initial={{ opacity:0,x:-60 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.9 }}>
          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
            style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(0,200,150,0.1)',border:'1px solid rgba(0,200,150,0.25)',borderRadius:'50px',padding:'6px 16px',marginBottom:'28px' }}>
            <span style={{ width:'8px',height:'8px',borderRadius:'50%',background:'#00C896',animation:'pulse 2s infinite',display:'inline-block' }}/>
            <span style={{ color:'#00C896',fontSize:'13px',fontWeight:'600' }}>Available for work</span>
          </motion.div>

          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(40px,5vw,70px)',fontWeight:'800',color:'#fff',lineHeight:'1.05',marginBottom:'20px' }}>
            Hi, I am<br/>
            <span style={{ background:'linear-gradient(135deg,#6366f1,#ec4899,#00C896)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shimmer 4s linear infinite' }}>
              Tarikul Islam<br/>Tarek
            </span>
          </h1>

          <div style={{ height:'36px',marginBottom:'24px',display:'flex',alignItems:'center' }}>
            <span style={{ color:'#8888aa',fontSize:'18px',fontFamily:'DM Sans,sans-serif' }}>{displayed}</span>
            <span style={{ color:'#6366f1',fontSize:'22px',animation:'pulse 1s infinite',marginLeft:'2px' }}>|</span>
          </div>

          <p style={{ color:'#6666aa',fontSize:'16px',lineHeight:'1.8',fontFamily:'DM Sans,sans-serif',marginBottom:'40px',maxWidth:'460px' }}>
            MERN Stack developer with 2 live Vercel projects. Building scalable web apps and growing businesses through digital marketing.
          </p>

          <div className="hero-btns" style={{ display:'flex',gap:'16px',flexWrap:'wrap' }}>
            <Link to="/projects">
              <motion.button whileHover={{ scale:1.05,boxShadow:'0 0 40px rgba(99,102,241,0.5)' }} whileTap={{ scale:0.95 }}
                style={{ padding:'14px 32px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'50px',color:'#fff',fontWeight:'700',fontSize:'15px',cursor:'pointer',boxShadow:'0 0 20px rgba(99,102,241,0.3)' }}>
                View Projects
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{ padding:'14px 32px',background:'transparent',border:'1px solid rgba(99,102,241,0.5)',borderRadius:'50px',color:'#6366f1',fontWeight:'700',fontSize:'15px',cursor:'pointer' }}>
                Hire Me
              </motion.button>
            </Link>
          </div>

          <div className="hero-stats" style={{ display:'flex',gap:'32px',marginTop:'48px' }}>
            {[['2+','Live Projects'],['1+','Years Exp'],['100%','Client Sat']].map(([v,l],i)=>(
              <motion.div key={i} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.6+i*0.1 }}>
                <div style={{ fontSize:'28px',fontWeight:'800',color:'#fff',fontFamily:'Syne,sans-serif' }}>{v}</div>
                <div style={{ fontSize:'12px',color:'#555',marginTop:'2px' }}>{l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Photo */}
        <motion.div className="hero-photo" initial={{ opacity:0,x:60 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.9,delay:0.2 }}
          style={{ display:'flex',justifyContent:'center',position:'relative' }}>
          <div style={{ position:'relative',width:'360px',height:'420px' }}>
            <div style={{ position:'absolute',inset:'-20px',background:'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(236,72,153,0.15))',borderRadius:'40px',filter:'blur(30px)' }}/>
            <div style={{ position:'relative',width:'100%',height:'100%',borderRadius:'32px',overflow:'hidden',border:'1px solid rgba(99,102,241,0.25)' }}>
              <img src="/profile.jpg" alt="Tarikul Islam Tarek" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'top' }}
                onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
              <div style={{ display:'none',width:'100%',height:'100%',background:'linear-gradient(135deg,#1a1a2e,#16213e)',alignItems:'center',justifyContent:'center',fontSize:'80px' }}>👨‍💻</div>
            </div>
            <motion.div animate={{ y:[0,-10,0] }} transition={{ repeat:Infinity,duration:3 }}
              style={{ position:'absolute',bottom:'30px',left:'-24px',background:'rgba(8,8,15,0.95)',backdropFilter:'blur(20px)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:'16px',padding:'14px 18px' }}>
              <div style={{ color:'#fff',fontSize:'15px',fontWeight:'800' }}>MERN Stack</div>
              <div style={{ color:'#6366f1',fontSize:'11px' }}>Full Stack Dev</div>
            </motion.div>
            <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity,duration:4,delay:1 }}
              style={{ position:'absolute',top:'30px',right:'-20px',background:'rgba(8,8,15,0.95)',backdropFilter:'blur(20px)',border:'1px solid rgba(236,72,153,0.3)',borderRadius:'16px',padding:'14px 18px' }}>
              <div style={{ color:'#fff',fontSize:'15px',fontWeight:'800' }}>2 Projects</div>
              <div style={{ color:'#ec4899',fontSize:'11px' }}>Live on Vercel</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`);

// ─── ABOUT PAGE ───
writeFileSync('src/pages/AboutPage.jsx', `
import { motion } from 'framer-motion';
const skills = [['React.js',90],['Node.js',85],['MongoDB',82],['Express.js',85],['Next.js',75],['Digital Marketing',80],['SEO',78],['Tailwind CSS',88]];
export default function AboutPage() {
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        @media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}.about-photo{width:260px!important;height:300px!important;margin:0 auto!important;}}
      \`}</style>
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
`);

// ─── PROJECTS PAGE ───
writeFileSync('src/pages/ProjectsPage.jsx', `
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const projects = [
  { id:'1',emoji:'🚀',title:'MERN E-Commerce',desc:'Full-featured online store with cart, payment & admin panel.',tech:['React','Node.js','MongoDB','Stripe'],cat:'Full Stack',live:'#',github:'#' },
  { id:'2',emoji:'📊',title:'Admin Dashboard',desc:'Analytics dashboard with charts, user management & reports.',tech:['React','Express','Chart.js'],cat:'Full Stack',live:'#',github:'#' },
  { id:'3',emoji:'🌐',title:'Portfolio Website',desc:'Personal portfolio with dark theme, animations & admin panel.',tech:['React','Framer Motion'],cat:'Frontend',live:'#',github:'#' },
  { id:'4',emoji:'📈',title:'SEO Campaign',desc:'Full SEO strategy that ranked client site on Google page 1.',tech:['SEO','Google Analytics','Ads'],cat:'Marketing',live:'#',github:'#' },
];
const cats = ['All','Full Stack','Frontend','Marketing'];
export default function ProjectsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.cat === active);
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{\`@media(max-width:768px){.proj-grid{grid-template-columns:1fr!important;}}\`}</style>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 5%' }}>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} style={{ marginBottom:'60px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,#6366f1,#ec4899)' }}/>
            <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600',letterSpacing:'3px' }}>PORTFOLIO</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:'800',color:'#fff',marginBottom:'32px' }}>Featured Projects</h1>
          <div style={{ display:'flex',gap:'10px',flexWrap:'wrap' }}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setActive(c)}
                style={{ padding:'8px 20px',borderRadius:'50px',border:active===c?'1px solid #6366f1':'1px solid rgba(255,255,255,0.1)',background:active===c?'rgba(99,102,241,0.15)':'transparent',color:active===c?'#6366f1':'#666',cursor:'pointer',fontSize:'14px',fontWeight:'500',transition:'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="proj-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px' }}>
          {filtered.map((p,i)=>(
            <motion.div key={p.id} initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }} whileHover={{ y:-8 }}
              style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',overflow:'hidden',cursor:'pointer' }}>
              <div style={{ height:'160px',background:'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(236,72,153,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'60px' }}>{p.emoji}</div>
              <div style={{ padding:'24px' }}>
                <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'11px',padding:'3px 10px',borderRadius:'20px',fontWeight:'600' }}>{p.cat}</span>
                <h3 style={{ color:'#fff',fontSize:'18px',fontWeight:'700',margin:'12px 0 8px' }}>{p.title}</h3>
                <p style={{ color:'#666',fontSize:'13px',lineHeight:'1.6',marginBottom:'16px' }}>{p.desc}</p>
                <div style={{ display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'16px' }}>
                  {p.tech.map((t,j)=>(<span key={j} style={{ fontSize:'11px',padding:'3px 10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'20px',color:'#888' }}>{t}</span>))}
                </div>
                <div style={{ display:'flex',gap:'10px' }}>
                  <a href={p.live} target="_blank" style={{ flex:1,padding:'9px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:'10px',color:'#fff',fontSize:'12px',fontWeight:'700',textAlign:'center',textDecoration:'none' }}>Live Demo</a>
                  <a href={p.github} target="_blank" style={{ flex:1,padding:'9px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#aaa',fontSize:'12px',textAlign:'center',textDecoration:'none' }}>GitHub</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// ─── BLOG PAGE ───
writeFileSync('src/pages/BlogPage.jsx', `
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const posts = [
  { id:'1',emoji:'⚛️',title:'React 19 New Features Guide',excerpt:'Complete guide to all new features in React 19 including server components.',cat:'React',date:'Mar 2025',time:'8' },
  { id:'2',emoji:'🍃',title:'MongoDB Aggregation Pipeline',excerpt:'Advanced aggregation techniques for complex data queries.',cat:'MongoDB',date:'Feb 2025',time:'6' },
  { id:'3',emoji:'📈',title:'SEO Complete Guide 2025',excerpt:'Step by step guide to rank your website on Google page 1.',cat:'SEO',date:'Jan 2025',time:'10' },
  { id:'4',emoji:'⚡',title:'Node.js Performance Tips',excerpt:'Optimize your Node.js app for maximum performance.',cat:'Node.js',date:'Dec 2024',time:'7' },
  { id:'5',emoji:'🎨',title:'Tailwind CSS Best Practices',excerpt:'Write cleaner, more maintainable Tailwind CSS code.',cat:'CSS',date:'Nov 2024',time:'5' },
  { id:'6',emoji:'🚀',title:'Deploying MERN on Vercel',excerpt:'Complete guide to deploy your MERN stack on Vercel for free.',cat:'DevOps',date:'Oct 2024',time:'9' },
];
export default function BlogPage() {
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{\`@media(max-width:768px){.blog-grid{grid-template-columns:1fr!important;}}\`}</style>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 5%' }}>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} style={{ marginBottom:'60px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,#6366f1,#ec4899)' }}/>
            <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600',letterSpacing:'3px' }}>BLOG</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:'800',color:'#fff' }}>Latest Articles</h1>
        </motion.div>
        <div className="blog-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px' }}>
          {posts.map((p,i)=>(
            <motion.div key={p.id} initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }} whileHover={{ y:-6 }}>
              <Link to={"/blog/"+p.id} style={{ textDecoration:'none' }}>
                <div style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',overflow:'hidden',cursor:'pointer',height:'100%' }}>
                  <div style={{ height:'120px',background:'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(236,72,153,0.08))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px' }}>{p.emoji}</div>
                  <div style={{ padding:'24px' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px' }}>
                      <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'11px',padding:'3px 10px',borderRadius:'20px',fontWeight:'600' }}>{p.cat}</span>
                      <span style={{ color:'#444',fontSize:'12px' }}>{p.time} min read</span>
                    </div>
                    <h3 style={{ color:'#fff',fontSize:'16px',fontWeight:'700',marginBottom:'10px',lineHeight:'1.4' }}>{p.title}</h3>
                    <p style={{ color:'#666',fontSize:'13px',lineHeight:'1.6',marginBottom:'16px' }}>{p.excerpt}</p>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ color:'#444',fontSize:'12px' }}>{p.date}</span>
                      <span style={{ color:'#6366f1',fontSize:'13px',fontWeight:'600' }}>Read More →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// ─── CONTACT PAGE ───
writeFileSync('src/pages/ContactPage.jsx', `
import { useState } from 'react';
import { motion } from 'framer-motion';
export default function ContactPage() {
  const [form, setForm] = useState({ name:'',email:'',subject:'',message:'' });
  const [sent, setSent] = useState(false);
  const info = [['📧','Email','tarek@example.com'],['📱','Phone','+880 1234 567890'],['📍','Location','Bangladesh'],['💼','Available','Mon - Fri, 9am - 6pm']];
  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <style>{\`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;}}\`}</style>
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
`);

// ─── PROJECT DETAILS ───
writeFileSync('src/pages/ProjectDetails.jsx', `
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const projects = [
  { id:'1',emoji:'🚀',title:'MERN E-Commerce',desc:'A full-featured e-commerce platform built with MERN stack. Includes product management, cart system, payment integration with Stripe, and a complete admin panel.',tech:['React','Node.js','MongoDB','Express','Stripe','JWT'],live:'#',github:'#' },
  { id:'2',emoji:'📊',title:'Admin Dashboard',desc:'A comprehensive analytics dashboard with real-time data visualization, user management, role-based access control, and detailed reporting features.',tech:['React','Express','MongoDB','Chart.js','JWT'],live:'#',github:'#' },
];
export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id) || projects[0];
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'0 5%' }}>
        <Link to="/projects">
          <button style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#888',padding:'10px 20px',cursor:'pointer',marginBottom:'40px',fontSize:'14px' }}>← Back to Projects</button>
        </Link>
        <div style={{ fontSize:'80px',marginBottom:'24px' }}>{project.emoji}</div>
        <h1 style={{ fontFamily:'Syne,sans-serif',color:'#fff',fontSize:'clamp(32px,5vw,52px)',fontWeight:'800',marginBottom:'20px' }}>{project.title}</h1>
        <p style={{ color:'#8888aa',fontSize:'17px',lineHeight:'1.8',marginBottom:'32px',maxWidth:'650px' }}>{project.desc}</p>
        <div style={{ display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'40px' }}>
          {project.tech.map((t,i)=>(<span key={i} style={{ padding:'6px 16px',background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.25)',borderRadius:'20px',color:'#6366f1',fontSize:'13px',fontWeight:'600' }}>{t}</span>))}
        </div>
        <div style={{ display:'flex',gap:'16px' }}>
          <a href={project.live} target="_blank" style={{ padding:'14px 32px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:'50px',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'15px' }}>Live Demo</a>
          <a href={project.github} target="_blank" style={{ padding:'14px 32px',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'50px',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'15px' }}>GitHub</a>
        </div>
      </div>
    </motion.div>
  );
}
`);

// ─── BLOG DETAILS ───
writeFileSync('src/pages/BlogDetails.jsx', `
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function BlogDetails() {
  const { id } = useParams();
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={{ minHeight:'100vh',background:'linear-gradient(135deg,#08080f,#0d0d1a)',paddingTop:'100px',paddingBottom:'80px' }}>
      <div style={{ maxWidth:'700px',margin:'0 auto',padding:'0 5%' }}>
        <Link to="/blog">
          <button style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#888',padding:'10px 20px',cursor:'pointer',marginBottom:'40px',fontSize:'14px' }}>← Back to Blog</button>
        </Link>
        <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'12px',padding:'4px 14px',borderRadius:'20px',fontWeight:'600' }}>React</span>
        <h1 style={{ fontFamily:'Syne,sans-serif',color:'#fff',fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'20px 0 16px',lineHeight:'1.2' }}>Blog Post #{id}</h1>
        <p style={{ color:'#555',fontSize:'14px',marginBottom:'40px' }}>8 min read • March 2025</p>
        <p style={{ color:'#8888aa',fontSize:'16px',lineHeight:'1.9',marginBottom:'24px' }}>This blog post content will be loaded dynamically from the backend API once connected. The admin can create and manage posts from the dashboard.</p>
        <p style={{ color:'#6666aa',fontSize:'16px',lineHeight:'1.9' }}>Stay tuned for more articles about React, Node.js, MongoDB, and Digital Marketing.</p>
      </div>
    </motion.div>
  );
}
`);

// ─── LOGIN ───
writeFileSync('src/pages/Login.jsx', `
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
`);

// ─── DASHBOARD ───
writeFileSync('src/pages/Dashboard.jsx', `
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  {icon:'📊',label:'Analytics',id:'analytics'},
  {icon:'🗂️',label:'Projects',id:'projects'},
  {icon:'✍️',label:'Blog',id:'blog'},
  {icon:'💬',label:'Messages',id:'messages'},
  {icon:'⭐',label:'Testimonials',id:'testimonials'},
  {icon:'⚙️',label:'Settings',id:'settings'},
];

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('analytics');
  const [projects, setProjects] = useState([
    {emoji:'🚀',title:'MERN E-Commerce',desc:'Full stack online store',tech:'React,Node,MongoDB',live:'#',github:'#'},
    {emoji:'📊',title:'Admin Dashboard',desc:'Analytics dashboard',tech:'React,Express',live:'#',github:'#'},
  ]);
  const [blogs, setBlogs] = useState([
    {emoji:'⚛️',title:'React 19 Features',category:'React',readTime:'8'},
    {emoji:'🍃',title:'MongoDB Tips',category:'MongoDB',readTime:'6'},
  ]);
  const [showPF, setShowPF] = useState(false);
  const [showBF, setShowBF] = useState(false);
  const [pForm, setPForm] = useState({title:'',desc:'',tech:'',live:'',github:'',emoji:'🚀'});
  const [bForm, setBForm] = useState({title:'',excerpt:'',category:'React',readTime:'5'});
  const inp = {width:'100%',padding:'11px 14px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#fff',fontSize:'14px',outline:'none',marginBottom:'12px',boxSizing:'border-box'};

  const cards = [
    {title:'Total Visitors',value:'12,450',change:18,icon:'👁️',color:'#6366f1'},
    {title:'Live Projects',value:projects.length+'',change:100,icon:'🚀',color:'#00C896'},
    {title:'Blog Posts',value:blogs.length+'',change:12,icon:'✍️',color:'#ec4899'},
    {title:'Messages',value:'34',change:8,icon:'💬',color:'#f59e0b'},
  ];

  return (
    <div style={{ minHeight:'100vh',background:'#06060c',display:'flex',fontFamily:'sans-serif' }}>
      <style>{\`@media(max-width:768px){.dash-sidebar{width:60px!important;}.dash-sidebar .sl{display:none!important;}.dash-main{margin-left:60px!important;}}\`}</style>

      {/* Sidebar */}
      <aside className="dash-sidebar" style={{ width:'240px',minHeight:'100vh',background:'#050508',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',position:'fixed',left:0,top:0,zIndex:100,transition:'width 0.3s' }}>
        <div style={{ padding:'28px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:'18px',fontWeight:'800',background:'linear-gradient(135deg,#6366f1,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Tarek.dev</div>
          <div className="sl" style={{ color:'#444',fontSize:'12px',marginTop:'2px' }}>Admin Dashboard</div>
        </div>
        <nav style={{ flex:1,padding:'16px 10px' }}>
          {menuItems.map(m=>(
            <button key={m.id} onClick={()=>setActive(m.id)}
              style={{ width:'100%',display:'flex',alignItems:'center',gap:'12px',padding:'11px 14px',borderRadius:'12px',border:'none',cursor:'pointer',marginBottom:'4px',
                background:active===m.id?'rgba(99,102,241,0.12)':'transparent',
                color:active===m.id?'#6366f1':'#555',fontSize:'14px',fontWeight:active===m.id?'700':'400',transition:'all 0.2s',textAlign:'left' }}>
              <span style={{ fontSize:'18px' }}>{m.icon}</span>
              <span className="sl">{m.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 10px',borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={()=>{logout();navigate('/');}}
            style={{ width:'100%',padding:'11px 14px',background:'rgba(255,59,59,0.08)',border:'1px solid rgba(255,59,59,0.15)',borderRadius:'12px',color:'#ff6b6b',cursor:'pointer',fontSize:'14px',fontWeight:'600',display:'flex',alignItems:'center',gap:'10px' }}>
            <span>🚪</span><span className="sl">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main" style={{ marginLeft:'240px',flex:1,padding:'32px',minHeight:'100vh' }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px' }}>
          <div>
            <h1 style={{ color:'#fff',fontSize:'22px',fontWeight:'800',marginBottom:'4px' }}>{menuItems.find(m=>m.id===active)?.label}</h1>
            <p style={{ color:'#444',fontSize:'13px' }}>Welcome back, Tarikul Islam Tarek</p>
          </div>
          <div style={{ display:'flex',gap:'10px' }}>
            {active==='projects' && <button onClick={()=>setShowPF(true)} style={{ padding:'9px 18px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'10px',color:'#fff',fontWeight:'700',cursor:'pointer',fontSize:'13px' }}>+ Add Project</button>}
            {active==='blog' && <button onClick={()=>setShowBF(true)} style={{ padding:'9px 18px',background:'linear-gradient(135deg,#ec4899,#8b5cf6)',border:'none',borderRadius:'10px',color:'#fff',fontWeight:'700',cursor:'pointer',fontSize:'13px' }}>+ Add Post</button>}
          </div>
        </div>

        {/* Analytics */}
        {active==='analytics' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px' }}>
              {cards.map((c,i)=>(
                <motion.div key={i} whileHover={{ y:-4 }}
                  style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'18px',padding:'22px',position:'relative',overflow:'hidden' }}>
                  <div style={{ position:'absolute',top:0,right:0,width:'70px',height:'70px',background:'radial-gradient(circle,'+c.color+'33 0%,transparent 70%)' }}/>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px' }}>
                    <span style={{ fontSize:'26px' }}>{c.icon}</span>
                    <span style={{ background:'rgba(0,200,150,0.12)',color:'#00C896',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'600' }}>+{c.change}%</span>
                  </div>
                  <div style={{ fontSize:'26px',fontWeight:'800',color:'#fff',marginBottom:'4px' }}>{c.value}</div>
                  <div style={{ color:'#555',fontSize:'13px' }}>{c.title}</div>
                </motion.div>
              ))}
            </div>
            {/* Charts */}
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
              <div style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'18px',padding:'24px' }}>
                <h3 style={{ color:'#fff',fontSize:'14px',fontWeight:'700',marginBottom:'20px' }}>SEO Performance</h3>
                <div style={{ display:'flex',alignItems:'flex-end',gap:'10px',height:'120px' }}>
                  {[45,52,48,61,67,74].map((v,i)=>(
                    <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',height:'100%',justifyContent:'flex-end' }}>
                      <motion.div initial={{ height:0 }} animate={{ height:(v/74*100)+'%' }} transition={{ duration:0.8,delay:i*0.1 }}
                        style={{ width:'100%',background:'linear-gradient(180deg,#6366f1,#8b5cf6)',borderRadius:'4px 4px 0 0',minHeight:'4px' }}/>
                      <span style={{ color:'#333',fontSize:'10px' }}>{['J','F','M','A','M','J'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'18px',padding:'24px' }}>
                <h3 style={{ color:'#fff',fontSize:'14px',fontWeight:'700',marginBottom:'20px' }}>Ad Distribution</h3>
                {[['Facebook',42,'#3b82f6'],['Google',31,'#f59e0b'],['Instagram',18,'#ec4899'],['Other',9,'#6366f1']].map(([l,v,c],i)=>(
                  <div key={i} style={{ marginBottom:'12px' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',color:'#666',fontSize:'12px',marginBottom:'5px' }}>
                      <span>{l}</span><span style={{ color:'#fff',fontWeight:'600' }}>{v}%</span>
                    </div>
                    <div style={{ height:'6px',background:'rgba(255,255,255,0.05)',borderRadius:'99px' }}>
                      <motion.div initial={{ width:0 }} animate={{ width:v+'%' }} transition={{ duration:0.7,delay:i*0.1 }}
                        style={{ height:'100%',background:c,borderRadius:'99px' }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects */}
        {active==='projects' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px' }}>
            {projects.map((p,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'18px',overflow:'hidden' }}>
                <div style={{ height:'90px',background:'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(236,72,153,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px' }}>{p.emoji}</div>
                <div style={{ padding:'18px' }}>
                  <h3 style={{ color:'#fff',fontWeight:'700',marginBottom:'6px',fontSize:'15px' }}>{p.title}</h3>
                  <p style={{ color:'#555',fontSize:'12px',marginBottom:'10px' }}>{p.desc}</p>
                  <p style={{ color:'#6366f1',fontSize:'11px',marginBottom:'14px' }}>{p.tech}</p>
                  <div style={{ display:'flex',gap:'8px' }}>
                    <a href={p.live} style={{ flex:1,padding:'7px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:'8px',color:'#fff',fontSize:'11px',fontWeight:'700',textAlign:'center',textDecoration:'none' }}>Live</a>
                    <a href={p.github} style={{ flex:1,padding:'7px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',color:'#aaa',fontSize:'11px',textAlign:'center',textDecoration:'none' }}>GitHub</a>
                    <button onClick={()=>setProjects(prev=>prev.filter((_,j)=>j!==i))} style={{ padding:'7px 10px',background:'rgba(255,59,59,0.1)',border:'1px solid rgba(255,59,59,0.2)',borderRadius:'8px',color:'#ff6b6b',fontSize:'11px',cursor:'pointer' }}>Del</button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Blog */}
        {active==='blog' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px' }}>
            {blogs.map((b,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'18px',padding:'20px' }}>
                <span style={{ background:'rgba(99,102,241,0.12)',color:'#6366f1',fontSize:'11px',padding:'3px 10px',borderRadius:'20px',fontWeight:'600' }}>{b.category}</span>
                <h3 style={{ color:'#fff',fontWeight:'700',margin:'12px 0 6px',fontSize:'15px' }}>{b.title}</h3>
                <p style={{ color:'#444',fontSize:'12px',marginBottom:'14px' }}>{b.readTime} min read</p>
                <button onClick={()=>setBlogs(prev=>prev.filter((_,j)=>j!==i))} style={{ padding:'7px 14px',background:'rgba(255,59,59,0.08)',border:'1px solid rgba(255,59,59,0.15)',borderRadius:'8px',color:'#ff6b6b',fontSize:'12px',cursor:'pointer' }}>Delete</button>
              </div>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        {active==='messages' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            {['Client inquiry about MERN project — John Doe','Digital marketing consultation — Sarah M.','Freelance web development proposal — Ahmed K.'].map((m,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'18px',marginBottom:'10px',display:'flex',alignItems:'center',gap:'14px' }}>
                <div style={{ width:'38px',height:'38px',borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#ec4899)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:'700',flexShrink:0,fontSize:'14px' }}>{i+1}</div>
                <p style={{ color:'#ccc',fontSize:'14px',flex:1 }}>{m}</p>
                <button style={{ padding:'7px 14px',background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.25)',borderRadius:'8px',color:'#6366f1',cursor:'pointer',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap' }}>Reply</button>
              </div>
            ))}
          </motion.div>
        )}

        {/* Testimonials */}
        {active==='testimonials' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            {[['Ariful Islam','CEO, TechBD','Excellent work! Delivered on time.'],['Sarah Mitchell','Founder, DesignHub','Conversion rate increased by 40%.'],['Karim Hossain','CTO, StartupDhaka','Amazing MERN skills. Highly recommend.']].map(([n,r,t],i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'20px',marginBottom:'10px' }}>
                <p style={{ color:'#fbbf24',fontSize:'14px',marginBottom:'10px' }}>★★★★★</p>
                <p style={{ color:'#8888aa',fontSize:'14px',fontStyle:'italic',marginBottom:'12px' }}>"{t}"</p>
                <p style={{ color:'#fff',fontWeight:'700',fontSize:'14px' }}>{n} <span style={{ color:'#6366f1',fontWeight:'400' }}>— {r}</span></p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Settings */}
        {active==='settings' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ maxWidth:'520px' }}>
            {[['Full Name','Tarikul Islam Tarek'],['Email','admin@tarek.dev'],['Phone','+880 1234 567890'],['Location','Bangladesh'],['GitHub URL','https://github.com/tarek'],['LinkedIn URL','https://linkedin.com/in/tarek']].map(([l,v],i)=>(
              <div key={i} style={{ marginBottom:'14px' }}>
                <label style={{ color:'#555',fontSize:'13px',display:'block',marginBottom:'5px' }}>{l}</label>
                <input defaultValue={v} style={{ width:'100%',padding:'12px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#fff',fontSize:'14px',outline:'none',boxSizing:'border-box' }}/>
              </div>
            ))}
            <button style={{ padding:'13px 28px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'12px',color:'#fff',fontWeight:'700',cursor:'pointer',marginTop:'8px' }}>Save Changes</button>
          </motion.div>
        )}
      </main>

      {/* Project Form Modal */}
      {showPF && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:'20px' }}>
          <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }}
            style={{ background:'#0d0d18',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'24px',padding:'36px',width:'100%',maxWidth:'500px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px' }}>
              <h3 style={{ color:'#fff',fontSize:'20px',fontWeight:'800' }}>Add Project</h3>
              <button onClick={()=>setShowPF(false)} style={{ background:'rgba(255,255,255,0.06)',border:'none',color:'#888',borderRadius:'8px',padding:'8px 12px',cursor:'pointer' }}>✕</button>
            </div>
            {[['title','Project Title'],['desc','Description'],['tech','Technologies'],['live','Live URL'],['github','GitHub URL']].map(([k,p])=>(
              <input key={k} placeholder={p} value={pForm[k]} onChange={e=>setPForm(f=>({...f,[k]:e.target.value}))} style={inp}/>
            ))}
            <div style={{ display:'flex',gap:'10px',marginTop:'4px' }}>
              <button onClick={()=>setShowPF(false)} style={{ flex:1,padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#888',cursor:'pointer',fontWeight:'600' }}>Cancel</button>
              <button onClick={()=>{setProjects(p=>[...p,{...pForm}]);setShowPF(false);setPForm({title:'',desc:'',tech:'',live:'',github:'',emoji:'🚀'});}}
                style={{ flex:1,padding:'12px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:'10px',color:'#fff',cursor:'pointer',fontWeight:'700' }}>Save</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Blog Form Modal */}
      {showBF && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:'20px' }}>
          <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }}
            style={{ background:'#0d0d18',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'24px',padding:'36px',width:'100%',maxWidth:'500px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px' }}>
              <h3 style={{ color:'#fff',fontSize:'20px',fontWeight:'800' }}>Add Blog Post</h3>
              <button onClick={()=>setShowBF(false)} style={{ background:'rgba(255,255,255,0.06)',border:'none',color:'#888',borderRadius:'8px',padding:'8px 12px',cursor:'pointer' }}>✕</button>
            </div>
            {[['title','Blog Title'],['excerpt','Short Description'],['readTime','Read Time (min)']].map(([k,p])=>(
              <input key={k} placeholder={p} value={bForm[k]} onChange={e=>setBForm(f=>({...f,[k]:e.target.value}))} style={inp}/>
            ))}
            <div style={{ display:'flex',gap:'10px',marginTop:'4px' }}>
              <button onClick={()=>setShowBF(false)} style={{ flex:1,padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'#888',cursor:'pointer',fontWeight:'600' }}>Cancel</button>
              <button onClick={()=>{setBlogs(b=>[...b,{...bForm}]);setShowBF(false);setBForm({title:'',excerpt:'',category:'React',readTime:'5'});}}
                style={{ flex:1,padding:'12px',background:'linear-gradient(135deg,#ec4899,#8b5cf6)',border:'none',borderRadius:'10px',color:'#fff',cursor:'pointer',fontWeight:'700' }}>Save</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
`);

console.log('ALL FRONTEND FILES CREATED SUCCESSFULLY');
