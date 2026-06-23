import{motion}from'framer-motion';
const SERVICES=[
{icon:'🌐',title:'Full Stack Web Apps',desc:'End-to-end MERN stack applications with modern UI, authentication, REST APIs, and MongoDB.',color:'#00D4AA'},
{icon:'⚙️',title:'Backend Development',desc:'Scalable Node.js & Express APIs, database design, and server-side logic.',color:'#38BDF8'},
{icon:'📈',title:'SEO & Content Marketing',desc:'On-page and technical SEO strategies to rank higher and drive organic traffic.',color:'#818cf8'},
{icon:'🎯',title:'Facebook & Google Ads',desc:'Performance marketing campaigns that maximize ROI and reduce cost-per-acquisition.',color:'#f472b6'},
{icon:'🛒',title:'E-Commerce Solutions',desc:'Full online stores with product management, cart, and Stripe/payment integration.',color:'#fb923c'},
{icon:'📊',title:'Analytics & Dashboard',desc:'Custom admin panels, data visualization, and real-time analytics dashboards.',color:'#34d399'},
];
const Services=()=>(
<section id='services' style={{padding:'120px clamp(20px,5vw,80px)',background:'#07101E',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(129,140,248,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#818cf8',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Services</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>What I <span style={{background:'linear-gradient(135deg,#818cf8,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Offer</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px'}}>
{SERVICES.map((s,i)=>(
<motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} whileHover={{y:-8,borderColor:s.color+'44'}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'24px',padding:'36px 28px',cursor:'default',transition:'all 0.35s',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,'+s.color+',transparent)',opacity:0.8}}/>
<div style={{fontSize:'40px',marginBottom:'20px'}}>{s.icon}</div>
<h3 style={{color:'#fff',fontSize:'17px',fontWeight:'700',marginBottom:'12px',fontFamily:'"Syne",sans-serif'}}>{s.title}</h3>
<p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',lineHeight:'1.75',fontFamily:'"DM Sans",sans-serif',margin:0}}>{s.desc}</p>
</motion.div>
))}
</div>
</div>
</section>
);
export default Services;