import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectForm from '../components/ProjectForm';
import {
  LayoutDashboard, Layers, Plus, Pencil, Trash2,
  Star, StarOff, ExternalLink, X, Globe,
  Copy, Search, ArrowUpRight, TrendingUp, Eye, Sparkles, LogOut
} from 'lucide-react';

/* ── Design tokens ── */
const BG    = '#f8f6f1';
const WHITE = '#ffffff';
const INK   = '#0a0908';
const INK2  = '#2c2825';
const INK3  = '#6b6560';
const INK4  = '#b5b0aa';
const GOLD  = '#c8922a';
const GOLDBG= '#fdf7ec';
const GOLDBR= '#e8c87a';
const BORD  = '#e8e3da';
const BORDK = '#d4cdc3';
const GREEN = '#1d7a4a';
const GREENBG='#edfbf3';
const RED   = '#c0392b';
const REDBG = '#fdf0ef';
const SIDEBAR = '#0a0908';

/* ── Sidebar ── */
function Sidebar({ active, onNav }) {
  const NAV = [
    { id:'overview', label:'Overview',     icon:<LayoutDashboard size={16}/> },
    { id:'projects', label:'All Projects', icon:<Layers size={16}/> },
    { id:'add',      label:'Add Project',  icon:<Plus size={16}/> },
  ];
  return (
    <aside style={{ width:210, background:SIDEBAR, display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, flexShrink:0 }}>
      {/* Brand */}
      <div style={{ padding:'28px 22px 20px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontFamily:'"Cormorant Garamond", Georgia, serif', fontWeight:700, fontSize:'1.2rem', color:'#fff', letterSpacing:'-0.02em' }}>
          Web<span style={{ color:GOLD }}>Growth</span>
          <sup style={{ fontFamily:'inherit', fontWeight:400, fontSize:'0.45em', letterSpacing:'0.1em', color:'rgba(200,146,42,0.6)' }}>.in</sup>
        </div>
        <p style={{ fontFamily:'inherit', fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginTop:4 }}>Admin Panel</p>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:'14px 10px', display:'flex', flexDirection:'column', gap:2 }}>
        <p style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', padding:'8px 12px 4px' }}>Manage</p>
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'9px 12px', borderRadius:10, border:'none',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                fontFamily:'inherit', fontSize:'0.83rem', fontWeight:500,
                cursor:'pointer', width:'100%', textAlign:'left',
                transition:'all 0.18s',
              }}
              onMouseEnter={e=>{ if(!isActive){e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(255,255,255,0.7)';} }}
              onMouseLeave={e=>{ if(!isActive){e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.45)';} }}>
              <span style={{ color: isActive ? GOLD : 'rgba(255,255,255,0.3)', flexShrink:0 }}>{item.icon}</span>
              {item.label}
              {item.id === 'add' && <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:GOLD, flexShrink:0 }}/>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding:'14px 10px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
        <Link to="/"
          style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 12px', borderRadius:10, color:'rgba(255,255,255,0.3)', fontFamily:'inherit', fontSize:'0.83rem', fontWeight:500, textDecoration:'none', transition:'all 0.18s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.color='rgba(255,255,255,0.6)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,255,255,0.3)';}}>
          <Globe size={15} style={{ color:'rgba(255,255,255,0.2)' }}/> View Portfolio
          <ArrowUpRight size={12} style={{ marginLeft:'auto', opacity:0.4 }}/>
        </Link>
      </div>
    </aside>
  );
}

/* ── Stat card ── */
function StatCard({ label, value, sub, icon }) {
  return (
    <div style={{ padding:24, borderRadius:16, background:WHITE, border:`1px solid ${BORD}`, position:'relative', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'start', justifyContent:'space-between', marginBottom:12 }}>
        <p style={{ fontFamily:'inherit', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:INK4 }}>{label}</p>
        <div style={{ width:32, height:32, borderRadius:8, background:GOLDBG, display:'flex', alignItems:'center', justifyContent:'center', color:GOLD }}>{icon}</div>
      </div>
      <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'2.1rem', lineHeight:1, color:INK, marginBottom:4 }}>{value}</p>
      <p style={{ fontFamily:'inherit', fontSize:'0.72rem', color:INK4 }}>{sub}</p>
    </div>
  );
}

/* ── Overview ── */
function Overview({ projects, onNav }) {
  const total   = projects.length;
  const featured= projects.filter(p=>p.featured).length;
  const hasDemo = projects.filter(p=>p.link&&p.link!=='#').length;
  const cats    = {};
  projects.forEach(p=>{ cats[p.category]=(cats[p.category]||0)+1; });

  return (
    <div>
      {/* Page header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32 }}>
        <div>
          <p style={{ fontFamily:'inherit', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:GOLD, marginBottom:4 }}>Dashboard</p>
          <h1 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'2rem', letterSpacing:'-0.02em', color:INK }}>Portfolio Overview</h1>
        </div>
        <button onClick={() => onNav('add')}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:10, border:'none', background:INK, color:'#fff', fontFamily:'inherit', fontWeight:700, fontSize:'0.83rem', cursor:'pointer', transition:'all 0.2s' }}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 6px 20px rgba(10,9,8,0.25)';}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';}}>
          <Plus size={14}/> New Project
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        <StatCard label="Total Projects" value={total}    sub="Live on portfolio"    icon={<Layers size={15}/>}    />
        <StatCard label="Featured"       value={featured} sub="Pinned with ✦ badge"  icon={<Star size={15}/>}      />
        <StatCard label="Live Demos"     value={hasDemo}  sub="Drive more enquiries" icon={<Eye size={15}/>}       />
        <StatCard label="Categories"     value={Object.keys(cats).length} sub="Distinct types"  icon={<TrendingUp size={15}/>}/>
      </div>

      {/* How it works */}
      <div style={{ padding:24, borderRadius:16, background:GOLDBG, border:`1px solid ${GOLDBR}`, marginBottom:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:'rgba(200,146,42,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:GOLD }}>
            <Sparkles size={14}/>
          </div>
          <p style={{ fontFamily:'inherit', fontWeight:700, fontSize:'0.83rem', color:INK }}>How Your Portfolio System Works</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {[
            { n:'01', t:'Add Projects',   d:'Use the form to add project cards — title, image, tech stack, and live demo link.' },
            { n:'02', t:'Clients Browse', d:'Visitors scroll through stacked cards and click "View Demo" to see your work.' },
            { n:'03', t:'They Contact You', d:'Every card has a "Get This Website" button linked directly to your Instagram.' },
          ].map(s=>(
            <div key={s.n} style={{ display:'flex', gap:14 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:'rgba(200,146,42,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'0.9rem', color:GOLD, border:`1px solid ${GOLDBR}` }}>{s.n}</div>
              <div>
                <p style={{ fontFamily:'inherit', fontWeight:600, fontSize:'0.83rem', color:INK, marginBottom:3 }}>{s.t}</p>
                <p style={{ fontFamily:'inherit', fontSize:'0.75rem', color:INK3, lineHeight:1.55 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent list */}
      <div style={{ borderRadius:16, background:WHITE, border:`1px solid ${BORD}`, overflow:'hidden' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 22px', borderBottom:`1px solid ${BORD}`, background:BG }}>
          <p style={{ fontFamily:'inherit', fontWeight:600, fontSize:'0.83rem', color:INK }}>Recent Projects</p>
          <button onClick={()=>onNav('projects')} style={{ fontFamily:'inherit', fontSize:'0.75rem', fontWeight:600, color:GOLD, background:'none', border:'none', cursor:'pointer' }}>View all →</button>
        </div>
        {projects.length === 0 ? (
          <div style={{ padding:40, textAlign:'center' }}>
            <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontSize:'1.2rem', color:INK3, marginBottom:6 }}>No projects yet</p>
            <p style={{ fontSize:'0.8rem', color:INK4 }}>Add your first project to get started</p>
          </div>
        ) : (
          projects.slice(0,5).map(p => (
            <div key={p.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 22px', borderBottom:`1px solid ${BORD}`, transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#faf9f7'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ width:42, height:42, borderRadius:10, overflow:'hidden', background:p.color||'#0a0908', flexShrink:0 }}>
                {p.image && <img src={p.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={e=>e.target.style.display='none'}/>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:'inherit', fontWeight:600, fontSize:'0.85rem', color:INK, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</p>
                <p style={{ fontFamily:'inherit', fontSize:'0.72rem', color:GOLD, marginTop:1 }}>{p.subtitle || p.category}</p>
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:100, background:BORD, color:INK2, fontSize:'0.65rem', fontWeight:600 }}>{p.category}</span>
              {p.featured && <span style={{ fontSize:'0.75rem', color:GOLD, fontWeight:700 }}>✦</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ── Projects list ── */
function ProjectsList({ projects, onEdit, onDelete, onToggleFeatured, onDuplicate }) {
  const [search, setSearch] = useState('');
  const [cat,    setCat]    = useState('All');

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    return (cat === 'All' || p.category === cat) &&
           (!q || p.title.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
  });

  const cats = ['All', ...new Set(projects.map(p => p.category))];

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <p style={{ fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:GOLD, marginBottom:4 }}>Portfolio</p>
          <h1 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'2rem', letterSpacing:'-0.02em', color:INK }}>
            All Projects <span style={{ fontFamily:'inherit', fontWeight:400, fontSize:'1.2rem', color:INK4 }}>({projects.length})</span>
          </h1>
        </div>
      </div>

      {/* Search + filter */}
      <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:1, minWidth:180 }}>
          <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:INK4 }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search projects…"
            style={{ width:'100%', paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10, borderRadius:10, border:`1px solid ${BORDK}`, background:WHITE, color:INK, fontFamily:'inherit', fontSize:'0.85rem', outline:'none' }}
            onFocus={e=>{e.target.style.borderColor=INK;e.target.style.boxShadow='0 0 0 3px rgba(10,9,8,0.07)';}}
            onBlur={e=>{e.target.style.borderColor=BORDK;e.target.style.boxShadow='none';}}
          />
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding:'9px 16px', borderRadius:10, border:`1px solid ${cat===c?INK:BORDK}`, background:cat===c?INK:WHITE, color:cat===c?'#fff':INK3, fontFamily:'inherit', fontWeight:600, fontSize:'0.75rem', cursor:'pointer', transition:'all 0.18s', whiteSpace:'nowrap' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ borderRadius:16, background:WHITE, border:`1px solid ${BORD}`, overflow:'hidden' }}>
        {/* Header row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 120px 90px 130px', padding:'11px 22px', background:BG, borderBottom:`1px solid ${BORD}` }}>
          {['Project','Category','Status','Actions'].map(h => (
            <p key={h} style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:INK4 }}>{h}</p>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding:40, textAlign:'center' }}>
            <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontSize:'1.2rem', color:INK3 }}>{search?'No results':'No projects yet'}</p>
          </div>
        ) : filtered.map(p => (
          <div key={p.id}
            style={{ display:'grid', gridTemplateColumns:'1fr 120px 90px 130px', alignItems:'center', padding:'14px 22px', borderBottom:`1px solid ${BORD}`, transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.background='#faf9f7'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>

            {/* Info */}
            <div style={{ display:'flex', alignItems:'center', gap:12, paddingRight:16, minWidth:0 }}>
              <div style={{ width:44, height:44, borderRadius:10, overflow:'hidden', background:p.color||'#0a0908', flexShrink:0, position:'relative' }}>
                {p.image && <img src={p.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={e=>e.target.style.display='none'}/>}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <p style={{ fontFamily:'inherit', fontWeight:600, fontSize:'0.85rem', color:INK, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</p>
                  {p.featured && <span style={{ fontSize:'0.6rem', fontWeight:800, letterSpacing:'0.1em', padding:'2px 8px', borderRadius:100, background:GOLDBG, color:GOLD, border:`1px solid ${GOLDBR}`, flexShrink:0 }}>✦ Featured</span>}
                </div>
                <p style={{ fontSize:'0.72rem', color:INK4, marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.subtitle || p.description}</p>
              </div>
            </div>

            {/* Category */}
            <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:100, background:BORD, color:INK2, fontSize:'0.65rem', fontWeight:600, width:'fit-content' }}>{p.category}</span>

            {/* Status */}
            {p.link && p.link !== '#' ? (
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:100, background:GREENBG, color:GREEN, fontSize:'0.65rem', fontWeight:600, width:'fit-content' }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:GREEN }}/>Live
              </span>
            ) : (
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:100, background:BORD, color:INK4, fontSize:'0.65rem', fontWeight:600, width:'fit-content' }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:INK4 }}/>Soon
              </span>
            )}

            {/* Actions */}
            <div style={{ display:'flex', alignItems:'center', gap:3 }}>
              {p.link && p.link !== '#' && (
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ padding:7, borderRadius:8, color:INK4, display:'flex', transition:'all 0.15s', textDecoration:'none' }}
                  onMouseEnter={e=>{e.currentTarget.style.background=BORD;e.currentTarget.style.color=INK;}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=INK4;}}>
                  <ExternalLink size={14}/>
                </a>
              )}
              <button onClick={()=>onToggleFeatured(p.id)}
                style={{ padding:7, borderRadius:8, border:'none', background: p.featured?GOLDBG:'transparent', color:p.featured?GOLD:INK4, cursor:'pointer', display:'flex', transition:'all 0.15s' }}
                onMouseEnter={e=>{ if(!p.featured){e.currentTarget.style.background=BORD;e.currentTarget.style.color=INK;} }}
                onMouseLeave={e=>{ if(!p.featured){e.currentTarget.style.background='transparent';e.currentTarget.style.color=INK4;} }}>
                {p.featured ? <Star size={14} fill="currentColor"/> : <StarOff size={14}/>}
              </button>
              <button onClick={()=>onDuplicate(p.id)}
                style={{ padding:7, borderRadius:8, border:'none', background:'transparent', color:INK4, cursor:'pointer', display:'flex', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.background=BORD;e.currentTarget.style.color=INK;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=INK4;}}>
                <Copy size={14}/>
              </button>
              <button onClick={()=>onEdit(p)}
                style={{ padding:7, borderRadius:8, border:'none', background:'transparent', color:INK4, cursor:'pointer', display:'flex', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.background=GOLDBG;e.currentTarget.style.color=GOLD;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=INK4;}}>
                <Pencil size={14}/>
              </button>
              <button onClick={()=>onDelete(p.id)}
                style={{ padding:7, borderRadius:8, border:'none', background:'transparent', color:INK4, cursor:'pointer', display:'flex', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.background=REDBG;e.currentTarget.style.color=RED;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=INK4;}}>
                <Trash2 size={14}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Add project page ── */
function AddPage({ onSubmit, onCancel }) {
  return (
    <div style={{ maxWidth:760 }}>
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:GOLD, marginBottom:4 }}>Portfolio</p>
        <h1 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'2rem', letterSpacing:'-0.02em', color:INK, marginBottom:6 }}>Add New Project</h1>
        <p style={{ fontSize:'0.85rem', color:INK3, lineHeight:1.5 }}>Fill in the details below. Your project will appear on the portfolio instantly.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:20 }}>
        {/* Form */}
        <div style={{ padding:28, borderRadius:18, background:WHITE, border:`1px solid ${BORD}` }}>
          <ProjectForm mode="add" onSubmit={onSubmit} onCancel={onCancel} />
        </div>
        {/* Tips */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ padding:20, borderRadius:16, background:GOLDBG, border:`1px solid ${GOLDBR}` }}>
            <p style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:GOLD, marginBottom:14 }}>✦ Tips</p>
            {[
              ['📝','Business Title','Use industry names like "Restaurant Website", not project names'],
              ['📷','Image',         'Use Unsplash — add ?w=1200&q=85 at the end'],
              ['🔗','Demo Link',     'A live demo converts 3× better — always add one'],
              ['🎨','Card Color',    'Pick a dark theme — it looks premium and editorial'],
              ['⭐','Feature',       'Mark your best project Featured for extra visibility'],
            ].map(([icon,label,tip])=>(
              <div key={label} style={{ display:'flex', gap:10, marginBottom:10 }}>
                <span style={{ fontSize:'1rem', flexShrink:0 }}>{icon}</span>
                <div>
                  <p style={{ fontSize:'0.75rem', fontWeight:700, color:INK, marginBottom:2 }}>{label}</p>
                  <p style={{ fontSize:'0.72rem', color:INK3, lineHeight:1.5 }}>{tip}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Quick Unsplash images */}
          <div style={{ padding:18, borderRadius:16, background:WHITE, border:`1px solid ${BORD}` }}>
            <p style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:INK4, marginBottom:10 }}>📸 Sample Images</p>
            {[
              ['Restaurant','https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85'],
              ['Gym',       'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85'],
              ['Hotel',     'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85'],
              ['Clinic',    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=85'],
              ['Dashboard', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85'],
            ].map(([label,url])=>(
              <button key={label} onClick={()=>navigator.clipboard?.writeText(url).catch(()=>{})}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'7px 10px', borderRadius:8, border:`1px solid ${BORD}`, background:'transparent', cursor:'pointer', marginBottom:5, fontFamily:'inherit', transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.background=BG}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={{ fontSize:'0.78rem', color:INK2, fontWeight:500 }}>{label}</span>
                <span style={{ fontSize:'0.65rem', color:INK4 }}>Copy URL ↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Edit slide panel ── */
function EditPanel({ project, onSubmit, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', justifyContent:'flex-end', background:'rgba(10,9,8,0.5)', backdropFilter:'blur(4px)' }}>
      <div style={{ height:'100%', overflowY:'auto', width:'100%', maxWidth:500, background:WHITE, borderLeft:`1px solid ${BORD}`, display:'flex', flexDirection:'column', boxShadow:'-20px 0 80px rgba(10,9,8,0.2)' }}>
        <div style={{ display:'flex', alignItems:'start', justifyContent:'space-between', padding:'24px 28px', borderBottom:`1px solid ${BORD}` }}>
          <div>
            <p style={{ fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:GOLD, marginBottom:4 }}>Editing</p>
            <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'1.4rem', color:INK }}>{project.title}</h2>
          </div>
          <button onClick={onClose} style={{ padding:8, borderRadius:10, border:'none', background:BG, color:INK3, cursor:'pointer', display:'flex', marginTop:2 }}
            onMouseEnter={e=>{e.currentTarget.style.background=BORD;e.currentTarget.style.color=INK;}}
            onMouseLeave={e=>{e.currentTarget.style.background=BG;e.currentTarget.style.color=INK3;}}>
            <X size={17}/>
          </button>
        </div>
        <div style={{ flex:1, padding:'24px 28px' }}>
          <ProjectForm mode="edit" initial={project} onSubmit={onSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}

/* ── Confirm dialog ── */
function ConfirmDelete({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(10,9,8,0.5)', backdropFilter:'blur(6px)', padding:16 }}>
      <div style={{ borderRadius:20, padding:36, maxWidth:380, width:'100%', background:WHITE, border:`1px solid ${BORD}`, boxShadow:'0 24px 80px rgba(10,9,8,0.2)' }}>
        <div style={{ textAlign:'center', fontSize:'2.5rem', marginBottom:14 }}>🗑️</div>
        <h3 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'1.3rem', color:INK, textAlign:'center', marginBottom:10 }}>Delete Project?</h3>
        <p style={{ fontSize:'0.83rem', color:INK3, textAlign:'center', lineHeight:1.6, marginBottom:24 }}>{message}</p>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onCancel}
            style={{ flex:1, padding:'12px 0', borderRadius:12, border:`1px solid ${BORDK}`, background:BG, color:INK2, fontFamily:'inherit', fontWeight:600, fontSize:'0.85rem', cursor:'pointer', transition:'all 0.18s' }}
            onMouseEnter={e=>{e.currentTarget.style.background=BORD;}}
            onMouseLeave={e=>{e.currentTarget.style.background=BG;}}>
            Cancel
          </button>
          <button onClick={onConfirm}
            style={{ flex:1, padding:'12px 0', borderRadius:12, border:`1px solid rgba(192,57,43,0.2)`, background:REDBG, color:RED, fontFamily:'inherit', fontWeight:700, fontSize:'0.85rem', cursor:'pointer', transition:'all 0.18s' }}
            onMouseEnter={e=>{e.currentTarget.style.background='#fbe5e3';}}
            onMouseLeave={e=>{e.currentTarget.style.background=REDBG;}}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Toast ── */
function Toast({ message, type, onDone }) {
  const [show, setShow] = useState(false);
  useState(() => {
    requestAnimationFrame(() => setShow(true));
    const t = setTimeout(() => { setShow(false); setTimeout(onDone, 300); }, 3000);
    return () => clearTimeout(t);
  }, []);
  const cfg = {
    success: { bg:GREENBG, border:'rgba(29,122,74,0.25)', icon:'✓', color:GREEN },
    error:   { bg:REDBG,   border:'rgba(192,57,43,0.25)', icon:'✕', color:RED   },
    info:    { bg:GOLDBG,  border:GOLDBR,                 icon:'✦', color:GOLD  },
  };
  const c = cfg[type]||cfg.info;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 18px', borderRadius:14, background:WHITE, border:`1px solid ${c.border}`, boxShadow:'0 8px 28px rgba(10,9,8,0.12)', fontFamily:'inherit', fontSize:'0.83rem', fontWeight:600, whiteSpace:'nowrap', opacity:show?1:0, transform:show?'translateY(0)':'translateY(-10px)', transition:'all 0.25s', color:INK }}>
      <span style={{ fontWeight:800, color:c.color }}>{c.icon}</span> {message}
    </div>
  );
}

/* ── ADMIN PAGE ── */
export default function Admin({ onLogout }) {
  const { projects, addProject, updateProject, deleteProject, toggleFeatured, duplicateProject } = useProjects();
  const [activeNav,  setActiveNav]  = useState('overview');
  const [editPanel,  setEditPanel]  = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [toasts,     setToasts]     = useState([]);

  const push = useCallback((message, type='success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const handleAdd = useCallback((data) => {
    addProject(data);
    setActiveNav('projects');
    push('Project added!', 'success');
  }, [addProject, push]);

  const handleUpdate = useCallback((data) => {
    if (!editPanel) return;
    updateProject(editPanel.id, data);
    setEditPanel(null);
    push('Project updated!', 'info');
  }, [editPanel, updateProject, push]);

  const handleDelete = useCallback(() => {
    if (!confirmDel) return;
    deleteProject(confirmDel);
    setConfirmDel(null);
    push('Project deleted.', 'error');
  }, [confirmDel, deleteProject, push]);

  const handleDuplicate = useCallback((id) => {
    duplicateProject(id);
    push('Project duplicated!', 'success');
  }, [duplicateProject, push]);

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:BG, fontFamily:'"DM Sans",system-ui,sans-serif' }}>
      <Sidebar active={activeNav} onNav={id => { setActiveNav(id); setEditPanel(null); }} />

      <main style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
        {/* Top bar */}
        <header style={{ height:60, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', background:BG, borderBottom:`1px solid ${BORD}`, position:'sticky', top:0, zIndex:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'0.75rem', color:INK4, fontWeight:500 }}>
            <span>WebGrowth.in</span>
            <span>/</span>
            <span style={{ color:INK, fontWeight:600 }}>
              {activeNav==='overview'?'Dashboard':activeNav==='projects'?'Projects':'Add Project'}
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button
              onClick={onLogout}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8, border:'1px solid rgba(192,57,43,0.2)', background:'rgba(192,57,43,0.05)', color:'#c0392b', fontFamily:'inherit', fontSize:'0.75rem', fontWeight:600, cursor:'pointer', transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(192,57,43,0.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(192,57,43,0.05)';}}>
              <LogOut size={12}/> Logout
            </button>
            <Link to="/"
              style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8, border:`1px solid ${BORDK}`, background:WHITE, color:INK3, fontFamily:'inherit', fontSize:'0.75rem', fontWeight:600, textDecoration:'none', transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.color=INK;}}
              onMouseLeave={e=>{e.currentTarget.style.color=INK3;}}>
              ← Portfolio
            </Link>
            <button onClick={() => setActiveNav('add')}
              style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:8, border:'none', background:INK, color:'#fff', fontFamily:'inherit', fontWeight:700, fontSize:'0.75rem', cursor:'pointer', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 4px 14px rgba(10,9,8,0.25)';}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';}}>
              <Plus size={12}/> Add Project
            </button>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex:1, overflowY:'auto', padding:32 }}>
          {activeNav === 'overview' && <Overview projects={projects} onNav={setActiveNav} />}
          {activeNav === 'projects' && (
            <ProjectsList projects={projects}
              onEdit={setEditPanel}
              onDelete={setConfirmDel}
              onToggleFeatured={id => { toggleFeatured(id); push(projects.find(p=>p.id===id)?.featured?'Removed from featured.':'✦ Marked as featured!','info'); }}
              onDuplicate={handleDuplicate}
            />
          )}
          {activeNav === 'add' && (
            <AddPage onSubmit={handleAdd} onCancel={() => setActiveNav('projects')} />
          )}
        </div>
      </main>

      {/* Panels */}
      {editPanel && <EditPanel project={editPanel} onSubmit={handleUpdate} onClose={() => setEditPanel(null)} />}
      {confirmDel && (
        <ConfirmDelete
          message={`"${projects.find(p=>p.id===confirmDel)?.title}" will be permanently removed from your portfolio.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDel(null)}
        />
      )}

      {/* Toast stack */}
      <div style={{ position:'fixed', top:16, right:16, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
        {toasts.map(t => <Toast key={t.id} {...t} onDone={() => setToasts(x => x.filter(i => i.id !== t.id))} />)}
      </div>
    </div>
  );
}
