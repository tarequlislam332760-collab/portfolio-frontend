import { writeFileSync } from 'fs';

writeFileSync('src/components/common/Navbar.jsx', `
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const links = ['about','skills','services','projects','blog','contact'];

const Navbar = ({ navigate, currentPath }) => {
  const { dark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.5 });
    links.forEach(l => { const el = document.getElementById(l); if(el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .nav-link { position:relative; color:#666; font-size:14px; font-weight:500; text-decoration:none; text-transform:capitalize; transition:color 0.3s; padding:4px 0; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:linear-gradient(90deg,#6366f1,#ec4899); border-radius:2px; transition:width 0.3s; }
        .nav-link:hover { color:#fff; }
        .nav-link:hover::after { width:100%; }
        .nav-link.active { color:#fff; }
        .nav-link.active::after { width:100%; }
      \`}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '12px 40px' : '20px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,16,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          onClick={() => navigate('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer', fontFamily: 'Syne,sans-serif', fontSize: '22px', fontWeight: '800',
            background: 'linear-gradient(135deg,#6366f1,#ec4899,#00C896)', backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite' }}
        >
          Tarek.dev
        </motion.div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l} href={\`#\${l}\`}
              className={\`nav-link \${activeSection === l ? 'active' : ''}\`}>
              {l}
            </a>
          ))}
        </div>

        {/* Right Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {dark ? '☀️' : '🌙'}
          </motion.button>

          {/* Admin Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('login')}
            style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: '0 0 15px rgba(99,102,241,0.25)' }}
          >
            Admin
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
};
export default Navbar;
`);

console.log('Navbar done');
