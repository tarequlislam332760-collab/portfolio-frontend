
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
      <style>{`@media(max-width:768px){.dash-sidebar{width:60px!important;}.dash-sidebar .sl{display:none!important;}.dash-main{margin-left:60px!important;}}`}</style>

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
