import { useState, useRef, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { ADMIN_PASSWORD, SESSION_HOURS } from '../admin.config';

const SESSION_KEY = 'wg_admin_auth';

/* ── Auth helpers ── */
export function isAuthenticated() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function setAuthenticated() {
  const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ expiry }));
}

export function clearAuthenticated() {
  sessionStorage.removeItem(SESSION_KEY);
}

/* ── Login screen ── */
export default function AdminLogin({ onSuccess }) {
  const [password, setPassword]   = useState('');
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [shaking,   setShaking]   = useState(false);
  const [loading,   setLoading]   = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const attempt = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    // small artificial delay — prevents brute-force timing
    await new Promise(r => setTimeout(r, 450));

    if (password === ADMIN_PASSWORD) {
      setAuthenticated();
      onSuccess();
    } else {
      setLoading(false);
      setError('Incorrect password. Please try again.');
      setPassword('');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      inputRef.current?.focus();
    }
  };

  return (
    <div style={{
      minHeight:   '100vh',
      display:     'flex',
      alignItems:  'center',
      justifyContent: 'center',
      background:  '#0a0908',
      padding:     24,
      fontFamily:  '"DM Sans", system-ui, sans-serif',
    }}>

      {/* Subtle grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div
        style={{
          width:        '100%',
          maxWidth:     380,
          position:     'relative',
          animation:    shaking ? 'shake 0.5s cubic-bezier(0.36,0.07,0.19,0.97)' : 'none',
        }}
      >
        {/* Card */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 20,
          padding:      '40px 36px 36px',
          boxShadow:    '0 32px 100px rgba(0,0,0,0.5)',
        }}>
          {/* Logo */}
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{
              width:48, height:48, borderRadius:12,
              background:'#0a0908',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              marginBottom:14,
            }}>
              <Lock size={20} color="#c8922a" />
            </div>
            <h1 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'1.5rem', color:'#0a0908', letterSpacing:'-0.02em', marginBottom:4 }}>
              Admin Access
            </h1>
            <p style={{ fontSize:'0.8rem', color:'#9a918a' }}>
              WebGrowth<span style={{ color:'#c8922a' }}>.in</span> — protected area
            </p>
          </div>

          {/* Form */}
          <form onSubmit={attempt}>
            <label style={{ display:'block', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#6b6560', marginBottom:7 }}>
              Password
            </label>
            <div style={{ position:'relative', marginBottom:error ? 10 : 20 }}>
              <input
                ref={inputRef}
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); if (error) setError(''); }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                style={{
                  width:        '100%',
                  padding:      '13px 44px 13px 16px',
                  borderRadius: 10,
                  border:       `1.5px solid ${error ? 'rgba(192,57,43,0.5)' : '#d4cdc3'}`,
                  background:   error ? '#fdf0ef' : '#f8f6f1',
                  color:        '#0a0908',
                  fontSize:     '0.9rem',
                  outline:      'none',
                  transition:   'border-color 0.2s, box-shadow 0.2s',
                  fontFamily:   'inherit',
                  boxSizing:    'border-box',
                }}
                onFocus={e => { e.target.style.borderColor='#0a0908'; e.target.style.boxShadow='0 0 0 3px rgba(10,9,8,0.07)'; e.target.style.background='#fff'; }}
                onBlur={e  => { e.target.style.borderColor=error?'rgba(192,57,43,0.5)':'#d4cdc3'; e.target.style.boxShadow='none'; e.target.style.background=error?'#fdf0ef':'#f8f6f1'; }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#b5b0aa', padding:4, display:'flex' }}
              >
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:16, padding:'9px 12px', borderRadius:8, background:'#fdf0ef', border:'1px solid rgba(192,57,43,0.2)' }}>
                <AlertCircle size={14} color="#c0392b" style={{ flexShrink:0 }}/>
                <p style={{ fontSize:'0.78rem', color:'#c0392b', fontWeight:500 }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              style={{
                width:        '100%',
                padding:      '13px 0',
                borderRadius: 10,
                border:       'none',
                background:   '#0a0908',
                color:        '#fff',
                fontFamily:   'inherit',
                fontWeight:   700,
                fontSize:     '0.88rem',
                cursor:       (loading || !password.trim()) ? 'not-allowed' : 'pointer',
                opacity:      (loading || !password.trim()) ? 0.55 : 1,
                transition:   'all 0.2s',
                letterSpacing:'0.03em',
              }}
              onMouseEnter={e => { if (!loading && password.trim()) e.currentTarget.style.boxShadow = '0 6px 20px rgba(10,9,8,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              {loading ? 'Verifying…' : 'Enter Dashboard →'}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{ textAlign:'center', marginTop:20, fontSize:'0.7rem', color:'rgba(255,255,255,0.2)', lineHeight:1.6 }}>
          This panel is private. Unauthorised access is prohibited.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-3px); }
          20%, 80% { transform: translateX(5px); }
          30%, 50%, 70% { transform: translateX(-6px); }
          40%, 60% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
