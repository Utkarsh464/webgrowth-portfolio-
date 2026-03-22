import { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/projects';
import { X, Loader, Image as ImgIcon, Link2, Tag, Type, AlignLeft, Code } from 'lucide-react';

const EMPTY = {
  title: '', subtitle: '', description: '',
  image: '', link: '', tech: [], category: 'Website',
  color: '#0a0908', accent: '#f5dfa0',
};

const CARD_COLORS = [
  { label: 'Dark',     color: '#0a0908', accent: '#f5dfa0' },
  { label: 'Forest',   color: '#0a1a0f', accent: '#4ade80' },
  { label: 'Ocean',    color: '#080d1a', accent: '#60a5fa' },
  { label: 'Amber',    color: '#150c00', accent: '#fbbf24' },
  { label: 'Rose',     color: '#1a0808', accent: '#fb7185' },
  { label: 'Violet',   color: '#0d0814', accent: '#c084fc' },
];

export default function ProjectForm({ initial, onSubmit, onCancel, mode = 'add' }) {
  const [form,       setForm]       = useState({ ...EMPTY, ...initial });
  const [techInput,  setTechInput]  = useState('');
  const [errors,     setErrors]     = useState({});
  const [imgPreview, setImgPreview] = useState(initial?.image || '');
  const [imgOk,      setImgOk]      = useState(!!initial?.image);
  const [imgLoading, setImgLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({ ...EMPTY, ...initial });
      setImgPreview(initial.image || '');
      setImgOk(!!initial.image);
    }
  }, [initial]);

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
    if (field === 'image') {
      setImgPreview(val);
      setImgOk(false);
      setImgLoading(!!val);
    }
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) {
      setForm(f => ({ ...f, tech: [...f.tech, t] }));
    }
    setTechInput('');
  };

  const removeTech = (t) => setForm(f => ({ ...f, tech: f.tech.filter(x => x !== t) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim())       errs.title = 'Required';
    if (!form.description.trim()) errs.description = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    onSubmit(form);
    setSubmitting(false);
  };

  /* Shared input style */
  const inp = (err) => ({
    style: {
      width: '100%', padding: '10px 13px', borderRadius: 8, outline:'none',
      fontFamily: 'inherit', fontSize: '0.875rem',
      background: err ? '#fdf0ef' : '#fff',
      border: `1px solid ${err ? 'rgba(192,57,43,0.4)' : '#d4cdc3'}`,
      color: '#0a0908', transition:'border-color 0.18s, box-shadow 0.18s',
    },
    onFocus:  e => { e.target.style.borderColor='#0a0908'; e.target.style.boxShadow='0 0 0 3px rgba(10,9,8,0.07)'; },
    onBlur:   e => { e.target.style.borderColor=err?'rgba(192,57,43,0.4)':'#d4cdc3'; e.target.style.boxShadow='none'; },
  });

  const lbl = { display:'block', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6b6560', marginBottom:6 };

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }} noValidate>

      {/* Title */}
      <div>
        <label style={lbl}>Project Title *</label>
        <input placeholder="e.g. Restaurant & Café Website" value={form.title} onChange={set('title')} maxLength={60} {...inp(errors.title)} />
        {errors.title && <p style={{ marginTop:4, fontSize:'0.7rem', color:'#c0392b' }}>{errors.title}</p>}
      </div>

      {/* Subtitle */}
      <div>
        <label style={lbl}>Subtitle / Tagline</label>
        <input placeholder="e.g. Modern ordering web app" value={form.subtitle} onChange={set('subtitle')} maxLength={80} {...inp()} />
      </div>

      {/* Description */}
      <div>
        <label style={lbl}>Description *</label>
        <textarea
          rows={3} placeholder="What does this project do? Who is it for?"
          value={form.description} onChange={set('description')} maxLength={280}
          style={{ ...inp(errors.description).style, resize:'vertical', minHeight:80, lineHeight:1.6 }}
          onFocus={inp(errors.description).onFocus} onBlur={inp(errors.description).onBlur}
        />
        {errors.description && <p style={{ marginTop:4, fontSize:'0.7rem', color:'#c0392b' }}>{errors.description}</p>}
      </div>

      {/* Image URL */}
      <div>
        <label style={lbl}>Image URL (Unsplash recommended)</label>
        <div style={{ position:'relative' }}>
          <input placeholder="https://images.unsplash.com/photo-...?w=1200&q=85"
            value={form.image} onChange={set('image')} {...inp()} />
          {imgLoading && !imgOk && <Loader size={14} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'#c8922a', animation:'spin 0.7s linear infinite' }} />}
          {imgOk && <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'#1d7a4a', fontWeight:800 }}>✓</span>}
        </div>
        {imgPreview && (
          <div style={{ marginTop:8, borderRadius:10, overflow:'hidden', height:110, border:'1px solid #e8e3da', position:'relative' }}>
            <img src={imgPreview} alt="Preview" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
              onLoad={() => { setImgLoading(false); setImgOk(true); }}
              onError={() => { setImgLoading(false); setImgOk(false); setImgPreview(''); }} />
            <button type="button" onClick={() => { setForm(f=>({...f,image:''})); setImgPreview(''); setImgOk(false); }}
              style={{ position:'absolute', top:6, right:6, padding:4, borderRadius:6, border:'none', cursor:'pointer', background:'rgba(248,246,241,0.9)', color:'#0a0908', display:'flex' }}>
              <X size={12}/>
            </button>
          </div>
        )}
      </div>

      {/* Demo Link */}
      <div>
        <label style={lbl}>Live Demo URL</label>
        <input placeholder="https://your-project.vercel.app" value={form.link} onChange={set('link')} {...inp()} />
        <p style={{ marginTop:4, fontSize:'0.68rem', color:'#b5b0aa' }}>Leave blank if not ready — card shows "Coming Soon"</p>
      </div>

      {/* Tech stack */}
      <div>
        <label style={lbl}>Tech Stack</label>
        <div style={{ display:'flex', gap:8 }}>
          <input
            placeholder="Next.js, React, Tailwind…"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
            style={{ ...inp().style, flex:1 }}
            onFocus={inp().onFocus} onBlur={inp().onBlur}
          />
          <button type="button" onClick={addTech}
            style={{ padding:'10px 16px', borderRadius:8, border:'1px solid #d4cdc3', background:'#f8f6f1', color:'#0a0908', fontFamily:'inherit', fontSize:'0.8rem', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
            Add
          </button>
        </div>
        {form.tech.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
            {form.tech.map(t => (
              <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:100, background:'#e8e3da', color:'#2c2825', fontSize:'0.68rem', fontWeight:600 }}>
                {t}
                <button type="button" onClick={() => removeTech(t)} style={{ border:'none', background:'none', cursor:'pointer', color:'#6b6560', display:'flex', padding:0 }}>
                  <X size={10}/>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <label style={lbl}>Category</label>
        <select value={form.category} onChange={set('category')}
          style={{ ...inp().style, cursor:'pointer', appearance:'none', WebkitAppearance:'none' }}
          onFocus={inp().onFocus} onBlur={inp().onBlur}>
          {CATEGORIES.filter(c => c !== 'All').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Card color */}
      <div>
        <label style={lbl}>Card Color Theme</label>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {CARD_COLORS.map(cc => (
            <button key={cc.label} type="button"
              onClick={() => setForm(f => ({ ...f, color: cc.color, accent: cc.accent }))}
              style={{
                width:32, height:32, borderRadius:8,
                background: cc.color,
                border: form.color === cc.color ? `2px solid ${cc.accent}` : '2px solid transparent',
                cursor:'pointer', position:'relative', transition:'transform 0.15s',
                transform: form.color === cc.color ? 'scale(1.1)' : 'scale(1)',
              }}
              title={cc.label}
            >
              {form.color === cc.color && (
                <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:cc.accent, fontSize:12, fontWeight:800 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:10, paddingTop:4 }}>
        <button type="button" onClick={onCancel}
          style={{ flex:1, padding:'12px 0', borderRadius:10, border:'1px solid #d4cdc3', background:'#f8f6f1', color:'#6b6560', fontFamily:'inherit', fontWeight:600, fontSize:'0.85rem', cursor:'pointer', transition:'all 0.18s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='#e8e3da'; e.currentTarget.style.color='#0a0908';}}
          onMouseLeave={e=>{e.currentTarget.style.background='#f8f6f1'; e.currentTarget.style.color='#6b6560';}}>
          Cancel
        </button>
        <button type="submit" disabled={submitting}
          style={{ flex:2, padding:'12px 0', borderRadius:10, border:'none', background:'#0a0908', color:'#fff', fontFamily:'inherit', fontWeight:700, fontSize:'0.85rem', cursor:submitting?'not-allowed':'pointer', opacity:submitting?0.65:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.18s' }}
          onMouseEnter={e=>{ if(!submitting) e.currentTarget.style.boxShadow='0 6px 20px rgba(10,9,8,0.25)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; }}>
          {submitting ? <><Loader size={14} style={{ animation:'spin 0.7s linear infinite' }}/> Saving…</> : mode === 'add' ? '+ Add Project' : '✓ Save Changes'}
        </button>
      </div>

    </form>
  );
}
