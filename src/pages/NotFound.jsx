import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:24, background:'#f8f6f1' }}>
      <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'clamp(5rem,14vw,10rem)', lineHeight:1, color:'rgba(10,9,8,0.08)', marginBottom:16 }}>404</p>
      <h1 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:600, fontSize:'2rem', color:'#0a0908', marginBottom:10 }}>Page not found</h1>
      <p style={{ fontFamily:'inherit', fontSize:'0.9rem', color:'#6b6560', marginBottom:32, maxWidth:340, lineHeight:1.6 }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
        <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:10, background:'#0a0908', color:'#fff', fontFamily:'inherit', fontWeight:700, fontSize:'0.85rem', textDecoration:'none' }}>
          ← Back to Portfolio
        </Link>
        <Link to="/admin" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:10, border:'1px solid #d4cdc3', background:'#fff', color:'#6b6560', fontFamily:'inherit', fontWeight:600, fontSize:'0.85rem', textDecoration:'none' }}>
          Admin Panel ↗
        </Link>
      </div>
    </div>
  );
}
