import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:   scrolled ? 'rgba(248,246,241,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom:   scrolled ? '1px solid #e8e3da' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-lg text-cream"
              style={{ background:'#0a0908' }}>
              W
            </div>
            <span className="font-display font-semibold text-[1.15rem] text-ink tracking-tight">
              Web<span className="text-gold">Growth</span>
              <sup className="font-body font-normal text-[0.5em] text-ink-4 tracking-widest">.in</sup>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="nav-link">Work</a>
            <a href="#services"  className="nav-link">Services</a>
            <a href="#cta"       className="nav-link">Contact</a>
            <Link to="/admin"    className="nav-link">Admin</Link>
            <a
              href="https://www.instagram.com/webgrowth.in"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-dark text-[0.78rem] px-5 py-2.5"
            >
              <Instagram size={13} /> Get Website
            </a>
          </div>

          {/* Mobile ham */}
          <button className="md:hidden p-2 text-ink" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background:'rgba(248,246,241,0.97)', backdropFilter:'blur(20px)' }}>
          <button className="absolute top-5 right-5 p-2 text-ink" onClick={() => setMobileOpen(false)}>
            <X size={24}/>
          </button>
          {[['#portfolio','Work'],['#services','Services'],['#cta','Contact']].map(([href,label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}
              className="font-display font-semibold text-[2.2rem] text-ink tracking-tight hover:text-gold transition-colors">
              {label}
            </a>
          ))}
          <Link to="/admin" onClick={() => setMobileOpen(false)}
            className="font-display font-semibold text-[2rem] text-ink-3 hover:text-gold transition-colors">
            Admin ↗
          </Link>
          <a href="https://www.instagram.com/webgrowth.in" target="_blank" rel="noopener noreferrer"
            className="btn btn-dark px-8 py-3.5 text-base">
            <Instagram size={16}/> Get Your Website
          </a>
        </div>
      )}
    </>
  );
}
