import{motion}from'framer-motion';
const SKILLS=[
{cat:'Frontend',icon:'⚛️',items:[['React.js',92],['Next.js',80],['Tailwind CSS',90],['JavaScript',88]]},
{cat:'Backend',icon:'⚙️',items:[['Node.js',87],['Express.js',85],['REST APIs',88],['MongoDB',84]]},
{cat:'Marketing',icon:'📈',items:[['SEO',82],['Facebook Ads',80],['Google Ads',75],['Analytics',78]]},
];
const Skills=()=>(
<section id='skills' style={{padding:'120px clamp(20px,5vw,80px)',background:'#050A14',position:'relative'}}>
<div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(56,189,248,0.3),transparent)'}}/>
<div style={{maxWidth:'1100px',margin:'0 auto'}}>
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:'72px'}}>
<span style={{color:'#38BDF8',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif',display:'block',marginBottom:'12px'}}>Skills</span>
<h2 style={{color:'#fff',fontSize:'clamp(32px,4vw,52px)',fontWeight:'900',letterSpacing:'-1px',fontFamily:'"Syne",sans-serif'}}>My Tech <span style={{background:'linear-gradient(135deg,#38BDF8,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Arsenal</span></h2>
</motion.div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'28px'}}>
{SKILLS.map((g,gi)=>(
<motion.div key={gi} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:gi*0.1}} whileHover={{y:-6}}
style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'32px',transition:'all 0.3s'}}>
<div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px'}}>
<div style={{fontSize:'28px'}}>{g.icon}</div>
<h3 style={{color:'#fff',fontSize:'17px',fontWeight:'700',margin:0,fontFamily:'"Syne",sans-serif'}}>{g.cat}</h3>
</div>
{g.items.map(([name,pct],i)=>(
<div key={i} style={{marginBottom:'18px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'7px'}}>
<span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',fontFamily:'"DM Sans",sans-serif'}}>{name}</span>
<span style={{color:'rgba(255,255,255,0.35)',fontSize:'12px',fontFamily:'"DM Sans",sans-serif'}}>{pct}%</span>
</div>
<div style={{height:'5px',background:'rgba(255,255,255,0.06)',borderRadius:'99px',overflow:'hidden'}}>
<motion.div initial={{width:0}} whileInView={{width:pct+'%'}} viewport={{once:true}} transition={{duration:1,delay:gi*0.1+i*0.08,ease:'easeOut'}}
style={{height:'100%',borderRadius:'99px',background:gi===0?'linear-gradient(90deg,#00D4AA,#38BDF8)':gi===1?'linear-gradient(90deg,#38BDF8,#818cf8)':'linear-gradient(90deg,#818cf8,#f472b6)'}}/>
</div>
</div>
))}
</motion.div>
))}
</div>
</div>
</section>
);
export default Skills;