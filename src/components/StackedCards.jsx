import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Instagram, ArrowUpRight } from 'lucide-react';

const IG_URL = 'https://www.instagram.com/webgrowth.in';

/* ─── Single project card ─── */
function ProjectCard({ project, index, total }) {
  const wrapRef  = useRef(null);
  const [prog,   setProg]   = useState(0);
  const [imgErr, setImgErr] = useState(false);
  const [hovered,setHovered]= useState(false);

  /* sticky-scroll progress for parallax image */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const calc = () => {
      const rect = wrap.getBoundingClientRect();
      const vh   = window.innerHeight;
      // once card is sticky, rect.top stays at the stackOffset value
      // we track how far the page has scrolled within this card's range
      const scrolled = Math.max(0, -rect.top + index * 28);
      const range    = vh * 0.8;
      setProg(Math.min(1, scrolled / range));
    };
    window.addEventListener('scroll', calc, { passive: true });
    calc();
    return () => window.removeEventListener('scroll', calc);
  }, [index]);

  const stackOffset = index * 28;   // each card peeks out from under the next
  const hasDemo     = project.link && project.link !== '#';

  return (
    <div
      ref={wrapRef}
      className="stack-card"
      style={{
        top:        stackOffset,
        height:     '100vh',
        zIndex:     index + 1,
        display:    'flex',
        alignItems: 'center',
        padding:    `${stackOffset + 20}px 20px 20px`,
      }}
    >
      {/* Card shell */}
      <div
        style={{
          width:        '100%',
          maxWidth:     1120,
          margin:       '0 auto',
          borderRadius: 22,
          background:   project.color || '#0a0908',
          boxShadow:    hovered
            ? '0 40px 120px rgba(10,9,8,0.45), 0 12px 40px rgba(10,9,8,0.25)'
            : '0 28px 90px rgba(10,9,8,0.35), 0 8px 28px rgba(10,9,8,0.18)',
          height:       `calc(100vh - ${stackOffset + 40}px)`,
          minHeight:    420,
          display:      'grid',
          gridTemplateColumns: 'minmax(0,42%) 1fr',
          overflow:     'hidden',
          transition:   'box-shadow 0.4s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── LEFT: text content ── */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'space-between',
          padding:       'clamp(28px,4vw,56px)',
          position:      'relative',
          zIndex:        2,
        }}>
          {/* Top row */}
          <div>
            {/* Counter + category */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
              <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'0.62rem', fontWeight:500, letterSpacing:'0.18em', color: project.accent || '#f5dfa0', opacity:0.65 }}>
                {String(index + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
              </span>
              <span style={{ width:28, height:1, background: project.accent || '#f5dfa0', opacity:0.35 }} />
              <span style={{ fontFamily:'"DM Sans",system-ui,sans-serif', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color: project.accent || '#f5dfa0', opacity:0.55 }}>
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: '"Cormorant Garamond",Georgia,serif',
              fontWeight: 600,
              fontSize:   'clamp(2rem,3.8vw,3.4rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color:      '#ffffff',
              marginBottom: 10,
            }}>
              {project.title}
            </h2>

            {/* Subtitle */}
            {project.subtitle && (
              <p style={{ fontFamily:'"DM Sans",system-ui,sans-serif', fontSize:'0.95rem', fontWeight:300, color: project.accent || '#f5dfa0', opacity:0.72, marginBottom:18 }}>
                {project.subtitle}
              </p>
            )}

            {/* Description */}
            <p style={{
              fontFamily:  '"DM Sans",system-ui,sans-serif',
              fontSize:    '0.86rem',
              lineHeight:  1.72,
              color:       'rgba(255,255,255,0.52)',
              maxWidth:    400,
              marginBottom:28,
            }}>
              {project.description}
            </p>

            {/* Tech pills */}
            {project.tech && project.tech.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:32 }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize:   '0.62rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    padding:    '4px 11px',
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.07)',
                    color:      'rgba(255,255,255,0.45)',
                    border:     '1px solid rgba(255,255,255,0.1)',
                  }}>{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom: CTAs */}
          <div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:20 }}>
              {/* Primary: demo */}
              {hasDemo ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:     'inline-flex',
                    alignItems:  'center',
                    gap:         8,
                    padding:     '12px 22px',
                    borderRadius:12,
                    background:  project.accent || '#f5dfa0',
                    color:       '#0a0908',
                    fontFamily:  '"DM Sans",system-ui,sans-serif',
                    fontWeight:  700,
                    fontSize:    '0.83rem',
                    textDecoration: 'none',
                    transition:  'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-1px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)';}}
                >
                  <ExternalLink size={14}/> View Live Demo
                </a>
              ) : (
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'12px 22px', borderRadius:12,
                  background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.28)',
                  fontFamily:'"DM Sans",system-ui,sans-serif', fontWeight:600, fontSize:'0.83rem',
                  border:'1px solid rgba(255,255,255,0.09)',
                }}>
                  ⏳ Coming Soon
                </span>
              )}

              {/* Secondary: get this */}
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'12px 22px', borderRadius:12,
                  background:'rgba(255,255,255,0.08)',
                  color:'rgba(255,255,255,0.68)',
                  fontFamily:'"DM Sans",system-ui,sans-serif', fontWeight:600, fontSize:'0.83rem',
                  border:'1px solid rgba(255,255,255,0.11)',
                  textDecoration:'none', transition:'all 0.2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.14)';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.68)';}}
              >
                <Instagram size={14}/> Get This Website
              </a>
            </div>

            {/* IG handle */}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:'"DM Sans",system-ui,sans-serif', fontSize:'0.72rem', fontWeight:500, color:'rgba(255,255,255,0.28)', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.28)'}
            >
              <Instagram size={12}/> @webgrowth.in
            </a>
          </div>
        </div>

        {/* ── RIGHT: image ── */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          {!imgErr ? (
            <img
              src={project.image}
              alt={project.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={() => setImgErr(true)}
              style={{
                width:         '100%',
                height:        '100%',
                objectFit:     'cover',
                objectPosition:'top center',
                transform:     `scale(1.06) translateY(${-prog * 5}%)`,
                transition:    hovered ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' : 'none',
                display:       'block',
              }}
            />
          ) : (
            <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize:'3rem', opacity:0.15, marginBottom:10 }}>🖼️</span>
              <span style={{ fontFamily:'"DM Sans",system-ui,sans-serif', fontSize:'0.72rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.18)' }}>Preview unavailable</span>
            </div>
          )}

          {/* Left-edge blend gradient */}
          <div style={{ position:'absolute', inset:0, background:`linear-gradient(to right, ${project.color || '#0a0908'} 0%, transparent 18%)`, pointerEvents:'none' }}/>
          {/* Bottom gradient */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,9,8,0.55) 0%, transparent 35%)', pointerEvents:'none' }}/>

          {/* Featured badge */}
          {project.featured && (
            <div style={{ position:'absolute', top:18, right:18 }}>
              <span style={{ fontFamily:'"DM Sans",system-ui,sans-serif', fontSize:'0.6rem', fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', padding:'6px 14px', borderRadius:100, background: project.accent || '#f5dfa0', color:'#0a0908' }}>
                ✦ Featured
              </span>
            </div>
          )}

          {/* Demo shortcut on image */}
          {hasDemo && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position:'absolute', bottom:18, right:18,
                display:'inline-flex', alignItems:'center', gap:6,
                padding:'8px 14px', borderRadius:10,
                background:'rgba(255,255,255,0.11)',
                color:'rgba(255,255,255,0.8)',
                fontFamily:'"DM Sans",system-ui,sans-serif', fontWeight:600, fontSize:'0.72rem',
                backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.14)',
                textDecoration:'none', transition:'all 0.2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.2)';e.currentTarget.style.color='#fff';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.11)';e.currentTarget.style.color='rgba(255,255,255,0.8)';}}
            >
              Open <ArrowUpRight size={12}/>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile card (simple list layout) ─── */
function MobileCard({ project, index, total }) {
  const [imgErr, setImgErr] = useState(false);
  const hasDemo = project.link && project.link !== '#';

  return (
    <div style={{ padding:'0 16px', marginBottom:20 }}>
      <div style={{ borderRadius:18, background: project.color || '#0a0908', overflow:'hidden', boxShadow:'0 16px 48px rgba(10,9,8,0.3)' }}>
        {/* Image */}
        {!imgErr && project.image && (
          <div style={{ height:210, overflow:'hidden' }}>
            <img src={project.image} alt={project.title} loading="lazy" onError={()=>setImgErr(true)}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}/>
            <div style={{ position:'relative', marginTop:-60, height:60, background:`linear-gradient(to top, ${project.color||'#0a0908'}, transparent)` }}/>
          </div>
        )}
        {/* Content */}
        <div style={{ padding:'24px 24px 28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'0.6rem', letterSpacing:'0.15em', color: project.accent||'#f5dfa0', opacity:0.6 }}>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
            <span style={{ fontSize:'0.62rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color: project.accent||'#f5dfa0', opacity:0.5 }}>{project.category}</span>
          </div>
          <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:600, fontSize:'1.8rem', letterSpacing:'-0.02em', color:'#fff', marginBottom:6, lineHeight:1.1 }}>{project.title}</h2>
          {project.subtitle && <p style={{ fontSize:'0.85rem', color: project.accent||'#f5dfa0', opacity:0.7, marginBottom:12 }}>{project.subtitle}</p>}
          <p style={{ fontSize:'0.83rem', lineHeight:1.65, color:'rgba(255,255,255,0.48)', marginBottom:20 }}>{project.description}</p>
          {project.tech && project.tech.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:22 }}>
              {project.tech.map(t=>(
                <span key={t} style={{ fontSize:'0.62rem', fontFamily:'"JetBrains Mono",monospace', padding:'3px 9px', borderRadius:5, background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.09)' }}>{t}</span>
              ))}
            </div>
          )}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {hasDemo ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                style={{ flex:1, minWidth:120, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7, padding:'11px 18px', borderRadius:10, background: project.accent||'#f5dfa0', color:'#0a0908', fontFamily:'"DM Sans",system-ui,sans-serif', fontWeight:700, fontSize:'0.8rem', textDecoration:'none' }}>
                <ExternalLink size={13}/> View Demo
              </a>
            ) : (
              <span style={{ flex:1, minWidth:120, display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'11px 18px', borderRadius:10, background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.28)', fontSize:'0.78rem', fontFamily:'"DM Sans",system-ui,sans-serif', fontWeight:600 }}>⏳ Coming Soon</span>
            )}
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
              style={{ flex:1, minWidth:120, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7, padding:'11px 18px', borderRadius:10, background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.65)', fontFamily:'"DM Sans",system-ui,sans-serif', fontWeight:600, fontSize:'0.8rem', border:'1px solid rgba(255,255,255,0.1)', textDecoration:'none' }}>
              <Instagram size={13}/> Get This
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function StackedCards({ projects }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  if (!projects.length) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 24px', textAlign:'center' }}>
        <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontSize:'1.6rem', color:'rgba(255,255,255,0.25)', marginBottom:10 }}>No projects yet</p>
        <p style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.18)' }}>Add your first project from the admin panel.</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ paddingTop:24, paddingBottom:24 }}>
        {projects.map((project, i) => (
          <MobileCard key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>
    );
  }

  /* Desktop: sticky stack */
  return (
    <div style={{ position:'relative', height: `${projects.length * 100}vh` }}>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </div>
  );
}
