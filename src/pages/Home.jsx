import { motion, AnimatePresence } from 'framer-motion';
import TestimonialsSection from '../components/TestimonialsSection';
import { useState, useEffect } from 'react';
import { skillsAPI, blogsAPI, projectsAPI, profileAPI } from '../services/api';

const ROLES = [
  'MERN Full Stack Developer',
  'Digital Marketing Specialist',
  'React & Node.js Expert',
  'MongoDB Developer',
];

const SERVICES = [
  { icon: '🌐', title: 'Full Stack Web Apps', desc: 'End-to-end MERN applications with modern UI, authentication and MongoDB.', color: '#00D4AA' },
  { icon: '⚙️', title: 'Backend Development', desc: 'Scalable Node.js & Express APIs, database design, and server logic.', color: '#38BDF8' },
  { icon: '📈', title: 'SEO & Marketing', desc: 'On-page SEO strategies to rank higher and drive organic traffic.', color: '#818cf8' },
  { icon: '🎯', title: 'Facebook & Google Ads', desc: 'Performance marketing campaigns that maximize ROI.', color: '#f472b6' },
  { icon: '🛒', title: 'E-Commerce Solutions', desc: 'Full online stores with cart, payment and order management.', color: '#fb923c' },
  { icon: '📊', title: 'Admin Dashboard', desc: 'Custom analytics panels, data visualization and reporting.', color: '#34d399' },
];

const TESTIMONIALS = [
  { name: 'Ariful Islam',  role: 'CEO, TechBD',       text: 'Tarek delivered our platform on time with exceptional quality. Clean code, scalable, and the UI exceeded expectations.', av: '🧑‍💼' },
  { name: 'Sarah Mitchell',role: 'Founder, DesignHub', text: 'Working with Tarek on marketing was a game-changer. Conversion rate increased 40% in 3 months.', av: '👩‍💻' },
  { name: 'Karim Hossain', role: 'CTO, StartupDhaka', text: 'Outstanding full-stack skills. Built our Node.js backend — fast, secure, well-documented.', av: '👨‍💼' },
];

const PROFILE_IMG = '/profile.png'; // static fallback if no DB image yet
const DEFAULT_STATS = [{ n: '3+', l: 'Years Exp' }, { n: '2+', l: 'Live Projects' }, { n: '20+', l: 'Clients' }, { n: '15+', l: 'Technologies' }];

const responsiveCSS = [
  '@media(max-width:768px){',
  '.home-hero-inner{flex-direction:column!important;text-align:center!important;padding-top:40px!important;}',
  '.home-hero-img{width:clamp(180px,55vw,280px)!important;margin:0 auto 32px!important;order:-1!important;}',
  '.home-hero-btns{justify-content:center!important;}',
  '.home-hero-stats{justify-content:center!important;}',
  '.home-about-grid{grid-template-columns:1fr!important;}',
  '.home-skills-grid{grid-template-columns:1fr!important;}',
  '.home-services-grid{grid-template-columns:1fr!important;}',
  '.home-projects-grid{grid-template-columns:1fr!important;}',
  '.home-blog-grid{grid-template-columns:1fr!important;}',
  '.home-testi-grid{grid-template-columns:1fr!important;}',
  '}',
  '@media(max-width:480px){',
  '.home-hero-h1{font-size:clamp(30px,8vw,42px)!important;letter-spacing:-1px!important;}',
  '}',
].join('');

export default function Home({ navigate }) {
  const [ri, setRi] = useState(0);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    Promise.all([
      skillsAPI.getAll().catch(() => ({ data: [] })),
      blogsAPI.getAll().catch(() => ({ data: [] })),
      projectsAPI.getAll().catch(() => ({ data: [] })),
      profileAPI.get().catch(() => ({ data: null })),
    ]).then(([skillsRes, blogsRes, projectsRes, profileRes]) => {
      setSkills((skillsRes.data || []).filter(g => g.items && g.items.length > 0));
      setBlogs(blogsRes.data || []);
      setProjects(projectsRes.data || []);
      setProfile(profileRes.data || null);
    }).finally(() => setDataLoading(false));
  }, []);

  const STATS = profile ? [
  { n: profile.stat2n||'3+', l: profile.stat2l||'Years Exp' },
  { n: profile.stat2n||'2+', l: profile.stat2l||'Live Projects' },
  { n: profile.stat3n||'20+', l: profile.stat3l||'Clients' },
  { n: profile.stat4n||'15+', l: profile.stat4l||'Technologies' },
] : DEFAULT_STATS;

  const go = (p) => { navigate(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const SH = { color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: '"DM Sans",sans-serif', display: 'block', marginBottom: '12px' };
  const H2 = { color: '#fff', fontWeight: 900, letterSpacing: '-1px', fontFamily: '"Syne",sans-serif', lineHeight: 1.1 };
  const SEC = { padding: 'clamp(64px,8vw,110px) clamp(18px,5vw,80px)' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

      {/* ── RESPONSIVE STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: responsiveCSS }} />

      {/* ══════ HERO ══════ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#050A14', position: 'relative', overflow: 'hidden', paddingTop: '64px' }}>
        {/* BG blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
            style={{ position: 'absolute', top: '-20%', left: '-10%', width: 'clamp(260px,50vw,600px)', height: 'clamp(260px,50vw,600px)', borderRadius: '50%', background: 'radial-gradient(circle,#00D4AA28,transparent 70%)', filter: 'blur(60px)' }} />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.15, 0.07] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 'clamp(260px,55vw,700px)', height: 'clamp(260px,55vw,700px)', borderRadius: '50%', background: 'radial-gradient(circle,#38BDF822,transparent 70%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,170,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)' }} />
        </div>

        <div className="home-hero-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(18px,5vw,80px)', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(28px,5vw,80px)', position: 'relative', zIndex: 1 }}>

          {/* TEXT */}
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '99px', padding: '7px 16px', marginBottom: '22px' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00D4AA', display: 'inline-block', boxShadow: '0 0 8px #00D4AA' }} />
              <span style={{ color: '#00D4AA', fontSize: '12px', fontWeight: 600, letterSpacing: '0.8px', fontFamily: '"DM Sans",sans-serif' }}>Available for work</span>
            </motion.div>

            <motion.h1 className="home-hero-h1" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
              style={{ fontSize: 'clamp(36px,6vw,74px)', fontWeight: 900, lineHeight: '1.06', color: '#fff', marginBottom: '14px', fontFamily: '"Syne",sans-serif', letterSpacing: '-2px' }}>
              Hi, I'm<br />
              <span style={{ background: 'linear-gradient(135deg,#00D4AA 0%,#38BDF8 50%,#818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{profile?.name || 'Tarikul Islam Tarek'}</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ height: '30px', display: 'flex', alignItems: 'center', marginBottom: '18px', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.span key={ri} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.26 }}
                  style={{ fontSize: 'clamp(13px,2vw,19px)', color: '#38BDF8', fontWeight: 600, fontFamily: '"DM Sans",sans-serif' }}>
                  {ROLES[ri]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'clamp(13px,1.5vw,16px)', lineHeight: '1.82', maxWidth: '440px', marginBottom: '32px', fontFamily: '"DM Sans",sans-serif' }}>
              I build high-performance MERN stack web apps and help businesses scale through data-driven digital marketing strategies.
            </motion.p>

            <motion.div className="home-hero-btns" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.button onClick={() => go('projects')} whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(0,212,170,0.45)' }} whileTap={{ scale: 0.97 }}
                style={{ background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', border: 'none', color: '#050A14', padding: '12px 28px', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, fontSize: '14px', fontFamily: '"DM Sans",sans-serif', whiteSpace: 'nowrap' }}>
                View Projects
              </motion.button>
              <motion.button onClick={() => go('contact')} whileHover={{ scale: 1.05, borderColor: '#00D4AA', color: '#00D4AA' }} whileTap={{ scale: 0.97 }}
                style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', padding: '12px 28px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '14px', fontFamily: '"DM Sans",sans-serif', transition: 'all 0.25s', whiteSpace: 'nowrap' }}>
                Hire Me
              </motion.button>
            </motion.div>

            <motion.div className="home-hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: 'clamp(18px,3vw,36px)', marginTop: '38px', flexWrap: 'wrap' }}>
              {STATS.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, color: '#fff', fontFamily: '"Syne",sans-serif', letterSpacing: '-0.5px' }}>{s.n}</div>
                  <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px', marginTop: '2px', letterSpacing: '0.5px', fontFamily: '"DM Sans",sans-serif', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* PROFILE IMAGE */}
          <motion.div className="home-hero-img" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ flexShrink: 0, position: 'relative', width: 'clamp(220px,28vw,370px)', aspectRatio: '1' }}>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', background: 'conic-gradient(from 0deg,#00D4AA,#38BDF8,#818cf8,transparent 60%,#00D4AA)', opacity: 0.65 }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#050A14' }} />
            <div style={{ position: 'absolute', inset: '5px', borderRadius: '50%', overflow: 'hidden', background: '#0d1829' }}>
              <img src={(profile && profile.image) ? profile.image : PROFILE_IMG} alt="Tarikul Islam Tarek"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;background:#0d1829">👨‍💻</div>'; }} />
            </div>
            <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: 'absolute', inset: '-28px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,170,0.09),transparent 70%)', pointerEvents: 'none' }} />
          </motion.div>
        </div>
      </section>

      {/* ══════ ABOUT PREVIEW ══════ */}
      <section style={{ background: '#07101E', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,212,170,0.25),transparent)' }} />
        <div style={{ ...SEC, maxWidth: '1100px', margin: '0 auto' }}>
          <div className="home-about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(28px,5vw,60px)', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
              <div style={{ position: 'relative', borderRadius: '22px', overflow: 'hidden', aspectRatio: '4/5', background: 'linear-gradient(135deg,#0d1829,#0a1218)', border: '1px solid rgba(0,212,170,0.1)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
                <img src={(profile && profile.image) ? profile.image : PROFILE_IMG} alt="Tarikul Islam Tarek"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  onError={e => { e.currentTarget.style.display = 'none'; }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(5,10,20,0.65) 0%,transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '14px', right: '14px' }}>
                  <div style={{ background: 'rgba(5,10,20,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,170,0.18)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{'💻'}</div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: '"Syne",sans-serif' }}>{profile?.name || 'Tarikul Islam Tarek'}</div>
                      <div style={{ color: '#00D4AA', fontSize: '11px', fontFamily: '"DM Sans",sans-serif', marginTop: '1px' }}>{profile?.title || 'MERN Dev & Digital Marketer'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <span style={SH}>About Me</span>
              <h2 style={{ ...H2, fontSize: 'clamp(24px,3.5vw,40px)', marginBottom: '16px' }}>
                The Developer Behind{' '}
                <span style={{ background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Code</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'clamp(13px,1.4vw,15px)', lineHeight: '1.85', marginBottom: '14px', fontFamily: '"DM Sans",sans-serif' }}>
                {profile?.bio || "I'm a MERN Full Stack Developer and Digital Marketing Specialist based in Sylhet, Bangladesh. I build scalable web apps with React, Node.js, Express, and MongoDB."}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'clamp(13px,1.4vw,15px)', lineHeight: '1.85', marginBottom: '28px', fontFamily: '"DM Sans",sans-serif' }}>
                {profile?.bio2 || "Deployed 2+ full-stack projects on Vercel — combining technical depth with strategic digital marketing to grow businesses online."}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                {STATS.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.2 }} whileHover={{ y: -4, borderColor: 'rgba(0,212,170,0.25)' }}
                    style={{ background: 'rgba(0,212,170,0.04)', border: '1px solid rgba(0,212,170,0.1)', borderRadius: '12px', padding: '14px', transition: 'all 0.3s' }}>
                    <div style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#fff', fontFamily: '"Syne",sans-serif' }}>{s.n}</div>
                    <div style={{ color: 'rgba(255,255,255,0.33)', fontSize: '11px', fontFamily: '"DM Sans",sans-serif', marginTop: '2px' }}>{s.l}</div>
                  </motion.div>
                ))}
              </div>
              <motion.button onClick={() => go('about')} whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0,212,170,0.35)' }}
                style={{ background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', border: 'none', color: '#050A14', padding: '11px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '13px', fontFamily: '"DM Sans",sans-serif' }}>
                Learn More →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ SKILLS PREVIEW ══════ */}
      <section style={{ background: '#050A14', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(56,189,248,0.25),transparent)' }} />
        <div style={{ ...SEC, maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ ...SH, color: '#38BDF8' }}>Skills</span>
            <h2 style={{ ...H2, fontSize: 'clamp(26px,4vw,48px)' }}>
              My Tech{' '}
              <span style={{ background: 'linear-gradient(135deg,#38BDF8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Arsenal</span>
            </h2>
          </motion.div>
          <div className="home-skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '18px', marginBottom: '32px' }}>
            {dataLoading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Loading skills...</p>
            )}
            {!dataLoading && skills.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Skills coming soon.</p>
            )}
            {skills.map((g, gi) => (
              <motion.div key={g._id || gi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.07 }} whileHover={{ y: -5 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,' + (g.color || '#38BDF8') + ',transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, margin: 0, fontFamily: '"Syne",sans-serif' }}>{g.icon ? g.icon + ' ' : ''}{g.category}</h3>
                </div>
                {(g.items || []).slice(0, 3).map((it, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '12px', fontFamily: '"DM Sans",sans-serif' }}>{it.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '11px', fontFamily: '"DM Sans",sans-serif' }}>{it.percent}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: (it.percent || 0) + '%' }} viewport={{ once: true }} transition={{ duration: 0.9, delay: gi * 0.06 + i * 0.05 }}
                        style={{ height: '100%', borderRadius: '99px', background: g.color || '#38BDF8' }} />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <motion.button onClick={() => go('skills')} whileHover={{ scale: 1.04 }}
              style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', color: '#38BDF8', padding: '10px 26px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: '"DM Sans",sans-serif' }}>
              View All Skills →
            </motion.button>
          </div>
        </div>
      </section>

      {/* ══════ SERVICES PREVIEW ══════ */}
      <section style={{ background: '#07101E', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(129,140,248,0.25),transparent)' }} />
        <div style={{ ...SEC, maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ ...SH, color: '#818cf8' }}>Services</span>
            <h2 style={{ ...H2, fontSize: 'clamp(26px,4vw,48px)' }}>
              What I{' '}
              <span style={{ background: 'linear-gradient(135deg,#818cf8,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Offer</span>
            </h2>
          </motion.div>
          <div className="home-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px', marginBottom: '32px' }}>
            {SERVICES.slice(0, 3).map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -6, borderColor: s.color + '44' }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px 22px', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,' + s.color + ',transparent)' }} />
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{s.icon}</div>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, marginBottom: '8px', fontFamily: '"Syne",sans-serif' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.72', fontFamily: '"DM Sans",sans-serif', margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <motion.button onClick={() => go('services')} whileHover={{ scale: 1.04 }}
              style={{ background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)', color: '#818cf8', padding: '10px 26px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: '"DM Sans",sans-serif' }}>
              All Services →
            </motion.button>
          </div>
        </div>
      </section>

      {/* ══════ PROJECTS PREVIEW ══════ */}
      <section style={{ background: '#050A14', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,212,170,0.25),transparent)' }} />
        <div style={{ ...SEC, maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ ...SH, color: '#00D4AA' }}>Portfolio</span>
            <h2 style={{ ...H2, fontSize: 'clamp(26px,4vw,48px)' }}>
              Live{' '}
              <span style={{ background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: '10px', fontSize: '14px', fontFamily: '"DM Sans",sans-serif' }}>Deployed on Vercel</p>
          </motion.div>
          <div className="home-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '22px', marginBottom: '32px' }}>
            {dataLoading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Loading projects...</p>
            )}
            {!dataLoading && projects.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Projects coming soon.</p>
            )}
            {projects.slice(0, 4).map((p, i) => (
              <motion.div key={p._id || i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '22px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: 'linear-gradient(135deg,' + (p.color || '#00D4AA') + '18,' + (p.color || '#00D4AA') + '07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', position: 'relative' }}>
                  {p.emoji || '🚀'}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', color: '#00D4AA', fontWeight: 700, fontFamily: '"DM Sans",sans-serif' }}>▲ {p.status || 'LIVE'}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: 800, marginBottom: '6px', fontFamily: '"Syne",sans-serif' }}>{p.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', lineHeight: '1.7', marginBottom: '14px', fontFamily: '"DM Sans",sans-serif' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {(p.tech || []).map((t, j) => (<span key={j} style={{ padding: '2px 9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{t}</span>))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '9px', background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', borderRadius: '8px', color: '#050A14', fontWeight: 800, fontSize: '11px', textAlign: 'center', textDecoration: 'none', fontFamily: '"DM Sans",sans-serif', display: 'block' }}>Live Demo</a>}
                    {p.github && p.github !== '#' && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '11px', textAlign: 'center', textDecoration: 'none', fontFamily: '"DM Sans",sans-serif', display: 'block' }}>GitHub</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <motion.button onClick={() => go('projects')} whileHover={{ scale: 1.04 }}
              style={{ background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)', color: '#00D4AA', padding: '10px 26px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: '"DM Sans",sans-serif' }}>
              All Projects →
            </motion.button>
          </div>
        </div>
      </section>

      <TestimonialsSection navigate={navigate} />

      {/* ══════ BLOG PREVIEW ══════ */}
      <section style={{ background: '#050A14', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(56,189,248,0.25),transparent)' }} />
        <div style={{ ...SEC, maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ ...SH, color: '#38BDF8' }}>Blog</span>
            <h2 style={{ ...H2, fontSize: 'clamp(26px,4vw,48px)' }}>
              Latest{' '}
              <span style={{ background: 'linear-gradient(135deg,#38BDF8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Articles</span>
            </h2>
          </motion.div>
          <div className="home-blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px', marginBottom: '32px' }}>
            {dataLoading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>Loading articles...</p>
            )}
            {!dataLoading && blogs.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', gridColumn: '1/-1', textAlign: 'center' }}>No blog posts yet. Check back soon!</p>
            )}
            {blogs.slice(0, 4).map((p, i) => (
              <motion.div key={p._id || i} onClick={() => go('blog/' + p._id)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '22px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.18)', borderRadius: '99px', padding: '2px 10px', color: '#38BDF8', fontSize: '10px', fontWeight: 700, fontFamily: '"DM Sans",sans-serif' }}>{p.category}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{p.readTime ? p.readTime + ' min' : ''}</span>
                </div>
                <div style={{ fontSize: '38px', marginBottom: '12px' }}>{p.emoji || '✍️'}</div>
                <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, lineHeight: '1.42', marginBottom: '8px', fontFamily: '"Syne",sans-serif' }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: '1.68', fontFamily: '"DM Sans",sans-serif', margin: 0 }}>{p.excerpt}</p>
                <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '10px', fontFamily: '"DM Sans",sans-serif' }}>{p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US',{month:'short',year:'numeric'}) : ''}</span>
                  <motion.span whileHover={{ x: 3 }} style={{ color: '#38BDF8', fontSize: '11px', fontWeight: 600, fontFamily: '"DM Sans",sans-serif' }}>Read →</motion.span>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <motion.button onClick={() => go('blog')} whileHover={{ scale: 1.04 }}
              style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', color: '#38BDF8', padding: '10px 26px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: '"DM Sans",sans-serif' }}>
              All Articles →
            </motion.button>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section style={{ background: '#07101E', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,212,170,0.25),transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(0,212,170,0.04),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ ...SEC, maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ ...H2, fontSize: 'clamp(24px,4vw,46px)', marginBottom: '14px' }}>
              Ready to{' '}
              <span style={{ background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work Together?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'clamp(13px,1.5vw,16px)', maxWidth: '420px', margin: '0 auto 28px', lineHeight: '1.8', fontFamily: '"DM Sans",sans-serif' }}>
              I'm available for freelance projects and full-time opportunities. Let's build something amazing.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button onClick={() => go('contact')} whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(0,212,170,0.45)' }}
                style={{ background: 'linear-gradient(135deg,#00D4AA,#38BDF8)', border: 'none', color: '#050A14', padding: '13px 32px', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, fontSize: '14px', fontFamily: '"DM Sans",sans-serif' }}>
                Get In Touch
              </motion.button>
              <motion.button onClick={() => go('about')} whileHover={{ scale: 1.05 }}
                style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', padding: '13px 32px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '14px', fontFamily: '"DM Sans",sans-serif', transition: 'all 0.25s' }}>
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
