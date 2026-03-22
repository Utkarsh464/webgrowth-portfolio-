import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';

const IG_DM = 'https://ig.me/m/webgrowth.in';

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    ['#work',    'Work'],
    ['#services','Services'],
    ['#process', 'Process'],
    ['#pricing', 'Pricing'],
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:     scrolled ? 'rgba(248,246,241,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)'             : 'none',
          borderBottom:   scrolled ? '1px solid #e8e3da'      : '1px solid transparent',
        }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-lg"
              style={{ background:'#0a0908', color:'#f8f6f1' }}>W</div>
            <span className="font-display font-semibold text-[1.15rem] text-ink tracking-tight">
              Web<span className="text-gold">Growth</span>
              <sup className="font-body font-normal text-[0.5em] text-ink-4 tracking-widest">.in</sup>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
            <a href={IG_DM} target="_blank" rel="noopener noreferrer"
              className="btn btn-dark text-[0.78rem] px-5 py-2.5">
              <Instagram size={13}/> Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <span style={{ display:'block', width:22, height:1.5, background:'var(--ink)', borderRadius:2, transition:'all 0.25s', transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none' }}/>
            <span style={{ display:'block', width:22, height:1.5, background:'var(--ink)', borderRadius:2, transition:'all 0.25s', opacity: mobileOpen ? 0 : 1 }}/>
            <span style={{ display:'block', width:22, height:1.5, background:'var(--ink)', borderRadius:2, transition:'all 0.25s', transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background:'rgba(248,246,241,0.97)', backdropFilter:'blur(20px)' }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}
              className="font-display font-semibold text-ink tracking-tight hover:text-gold transition-colors"
              style={{ fontSize:'2.2rem' }}>
              {label}
            </a>
          ))}
          <a href={IG_DM} target="_blank" rel="noopener noreferrer"
            className="btn btn-dark px-8 py-3.5 text-base mt-4"
            onClick={() => setMobileOpen(false)}>
            <Instagram size={16}/> Get a Free Quote
          </a>
        </div>
      )}
    </>
  );
}
