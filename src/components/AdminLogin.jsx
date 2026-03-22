import { useState, useRef, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, ShieldOff } from 'lucide-react';
import { ADMIN_PASSWORD, SESSION_HOURS } from '../admin.config';

const SESSION_KEY = 'wg_admin_v2_authenticated';

/* ─── Clear any old/stale keys from previous builds ─── */
const STALE_KEYS = ['wg_admin_auth', 'wg_admin_session', 'admin_auth'];
STALE_KEYS.forEach(k => { sessionStorage.removeItem(k); localStorage.removeItem(k); });

/* ─── Auth helpers (exported for App.jsx) ─── */
export function isAuthenticated() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data?.ok || !data?.expiry) { sessionStorage.removeItem(SESSION_KEY); return false; }
    if (Date.now() > data.expiry)    { sessionStorage.removeItem(SESSION_KEY); return false; }
    return true;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return false;
  }
}

export function setAuthenticated() {
  const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ok: true, expiry }));
}

export function clearAuthenticated() {
  sessionStorage.removeItem(SESSION_KEY);
}

/* ─── Login Screen ─── */
export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState('');
  const [shake,    setShake]    = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked,   setLocked]   = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timerRef.current);
  }, []);

  // Countdown display when locked
  useEffect(() => {
    if (!locked) return;
    timerRef.current = setInterval(() => {
      setLockTime(t => {
        if (t <= 1) { setLocked(false); setError(''); clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [locked]);

  const attempt = async (e) => {
    e.preventDefault();
    if (!password.trim() || loading || locked) return;

    setLoading(true);
    // Anti brute-force delay — increases with each failed attempt
    const delay = Math.min(300 + attempts * 200, 2000);
    await new Promise(r => setTimeout(r, delay));

    if (password === ADMIN_PASSWORD) {
      setAuthenticated();
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPassword('');
      setShake(true);
      setTimeout(() => setShake(false), 600);

      if (newAttempts >= 5) {
        // Lock out for 30 seconds after 5 wrong attempts
        setLocked(true);
        setLockTime(30);
        setError('Too many failed attempts. Locked for 30 seconds.');
      } else {
        setError(`Incorrect password. ${5 - newAttempts} attempt${5 - newAttempts === 1 ? '' : 's'} remaining.`);
      }
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'#0a0908', padding:24,
      fontFamily:'"DM Sans", system-ui, sans-serif',
    }}>
      {/* Grid bg */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', opacity:0.4,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
        backgroundSize:'60px 60px' }}
      />

      <div style={{
        width:'100%', maxWidth:380, position:'relative',
        animation: shake ? 'shake 0.5s cubic-bezier(0.36,0.07,0.19,0.97)' : 'none',
      }}>
        {/* Card */}
        <div style={{ background:'#fff', borderRadius:20, padding:'40px 36px 36px', boxShadow:'0 32px 100px rgba(0,0,0,0.6)' }}>

          {/* Icon + title */}
          <div style={{ textAlign:'center', marginBottom:30 }}>
            <div style={{ width:52, height:52, borderRadius:14, background:'#0a0908', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
              {locked ? <ShieldOff size={22} color="#c0392b"/> : <Lock size={22} color="#c8922a"/>}
            </div>
            <h1 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:700, fontSize:'1.55rem', color:'#0a0908', letterSpacing:'-0.02em', marginBottom:5 }}>
              Admin Access
            </h1>
            <p style={{ fontSize:'0.78rem', color:'#9a918a' }}>
              WebGrowth<span style={{ color:'#c8922a' }}>.in</span> — private dashboard
            </p>
          </div>

          {/* Locked state */}
          {locked ? (
            <div style={{ padding:'18px 16px', borderRadius:12, background:'#fdf0ef', border:'1px solid rgba(192,57,43,0.2)', textAlign:'center', marginBottom:0 }}>
              <p style={{ fontSize:'0.88rem', fontWeight:700, color:'#c0392b', marginBottom:6 }}>🔒 Locked Out</p>
              <p style={{ fontSize:'0.8rem', color:'#c0392b', marginBottom:10 }}>Too many failed attempts.</p>
              <p style={{ fontSize:'1.4rem', fontWeight:800, color:'#c0392b', fontFamily:'monospace' }}>{lockTime}s</p>
              <p style={{ fontSize:'0.72rem', color:'rgba(192,57,43,0.65)', marginTop:6 }}>Wait before trying again</p>
            </div>
          ) : (
            <form onSubmit={attempt}>
              <label style={{ display:'block', fontSize:'0.67rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#6b6560', marginBottom:7 }}>
                Password
              </label>

              <div style={{ position:'relative', marginBottom: error ? 10 : 18 }}>
                <input
                  ref={inputRef}
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (error) setError(''); }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  disabled={loading}
                  style={{
                    width:'100%', padding:'13px 44px 13px 16px', borderRadius:10,
                    border:`1.5px solid ${error ? 'rgba(192,57,43,0.45)' : '#d4cdc3'}`,
                    background: error ? '#fdf0ef' : '#f8f6f1',
                    color:'#0a0908', fontSize:'0.9rem', outline:'none',
                    fontFamily:'inherit', boxSizing:'border-box',
                    transition:'border-color 0.18s, box-shadow 0.18s',
                  }}
                  onFocus={e => { e.target.style.borderColor='#0a0908'; e.target.style.boxShadow='0 0 0 3px rgba(10,9,8,0.07)'; e.target.style.background='#fff'; }}
                  onBlur={e  => { e.target.style.borderColor=error?'rgba(192,57,43,0.45)':'#d4cdc3'; e.target.style.boxShadow='none'; e.target.style.background=error?'#fdf0ef':'#f8f6f1'; }}
                />
                <button type="button" onClick={() => setShow(v => !v)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#b5b0aa', padding:4, display:'flex', alignItems:'center' }}>
                  {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:14, padding:'9px 12px', borderRadius:8, background:'#fdf0ef', border:'1px solid rgba(192,57,43,0.18)' }}>
                  <AlertCircle size={14} color="#c0392b" style={{ flexShrink:0 }}/>
                  <p style={{ fontSize:'0.76rem', color:'#c0392b', fontWeight:500 }}>{error}</p>
                </div>
              )}

              {/* Attempt indicator dots */}
              {attempts > 0 && (
                <div style={{ display:'flex', gap:5, marginBottom:14, justifyContent:'center' }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ width:7, height:7, borderRadius:'50%', background: n <= attempts ? '#c0392b' : '#e8e3da', transition:'background 0.2s' }}/>
                  ))}
                </div>
              )}

              <button type="submit"
                disabled={loading || !password.trim()}
                style={{
                  width:'100%', padding:'13px 0', borderRadius:10, border:'none',
                  background: '#0a0908', color:'#fff',
                  fontFamily:'inherit', fontWeight:700, fontSize:'0.88rem',
                  cursor: (loading || !password.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (loading || !password.trim()) ? 0.5 : 1,
                  transition:'all 0.2s', letterSpacing:'0.02em',
                }}
                onMouseEnter={e => { if (!loading && password.trim()) e.currentTarget.style.boxShadow='0 6px 20px rgba(10,9,8,0.28)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; }}>
                {loading ? 'Checking…' : 'Enter Dashboard →'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign:'center', marginTop:18, fontSize:'0.68rem', color:'rgba(255,255,255,0.18)', lineHeight:1.6 }}>
          Protected area · Unauthorised access is prohibited
        </p>
      </div>

      <style>{`
        @keyframes shake {
          10%,90%  { transform:translateX(-3px); }
          20%,80%  { transform:translateX(5px); }
          30%,50%,70% { transform:translateX(-7px); }
          40%,60%  { transform:translateX(7px); }
        }
      `}</style>
    </div>
  );
}
