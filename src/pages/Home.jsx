import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StackedCards from '../components/StackedCards';
import { useProjects } from '../hooks/useProjects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Instagram, ArrowRight, Zap, Smartphone, Calendar,
  BarChart3, Palette, Target, ChevronDown
} from 'lucide-react';

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
      style={{ background: 'var(--cream)' }}>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(10,9,8,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,9,8,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Badge */}
        <div className="anim-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
          style={{ background:'rgba(10,9,8,0.05)', border:'1px solid rgba(10,9,8,0.1)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation:'pulse 2s infinite' }} />
          <span className="font-body text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-ink-3">
            India's Premium Web Design Agency
          </span>
        </div>

        {/* Headline */}
        <h1 className="anim-fade-up anim-d1 font-display font-semibold text-ink leading-[1.07] mb-6"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)', letterSpacing: '-0.03em' }}>
          Websites That Bring<br />
          <em className="not-italic" style={{ color:'var(--gold)' }}>More Customers</em>
        </h1>

        <p className="anim-fade-up anim-d2 font-body text-ink-3 max-w-[520px] mx-auto leading-relaxed mb-12"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}>
          We build modern, high-converting websites for businesses that want to grow online.
        </p>

        {/* CTAs */}
        <div className="anim-fade-up anim-d3 flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#portfolio"
            className="btn btn-dark px-8 py-3.5"
            style={{ fontSize:'0.9rem' }}>
            View Projects <ArrowRight size={16}/>
          </a>
          <a href="https://www.instagram.com/webgrowth.in" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline px-8 py-3.5"
            style={{ fontSize:'0.9rem' }}>
            <Instagram size={15}/> DM on Instagram
          </a>
        </div>

        {/* Stats row */}
        <div className="anim-fade-up anim-d4 grid grid-cols-3 gap-6 max-w-[480px] mx-auto mb-16">
          {[['10+','Projects Built'],['100%','Client Satisfaction'],['48h','Delivery Time']].map(([n,l]) => (
            <div key={l} className="text-center">
              <p className="font-display font-semibold text-ink mb-0.5" style={{ fontSize:'2rem', letterSpacing:'-0.02em' }}>{n}</p>
              <p className="font-body text-ink-4 text-xs uppercase tracking-[0.1em]">{l}</p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="anim-fade-up anim-d5 flex flex-col items-center gap-2 opacity-40">
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-ink-3">Scroll</span>
          <ChevronDown size={16} className="text-ink-3" style={{ animation:'bounce 2s infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      `}</style>
    </section>
  );
}

/* ── PORTFOLIO ── */
function Portfolio({ projects }) {
  return (
    <section id="portfolio" style={{ background: '#0f0d0a' }}>
      {/* Section header */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 flex items-end justify-between border-b border-white/10">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-2" style={{ color:'rgba(255,255,255,0.35)' }}>
            — Work
          </p>
          <h2 className="font-display font-semibold text-white" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em' }}>
            Selected Projects
          </h2>
        </div>
        <p className="font-body text-[0.83rem] hidden md:block" style={{ color:'rgba(255,255,255,0.35)', maxWidth:260, textAlign:'right', lineHeight:1.6 }}>
          Scroll through our work — each card is a live demo for your industry.
        </p>
      </div>

      <StackedCards projects={projects} />

      {/* Bottom CTA within dark section */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 text-center border-t border-white/10">
        <p className="font-body text-[0.85rem] mb-4" style={{ color:'rgba(255,255,255,0.4)' }}>Don't see your industry? We build for any local business.</p>
        <a href="https://www.instagram.com/webgrowth.in" target="_blank" rel="noopener noreferrer"
          className="btn" style={{ background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.12)', fontSize:'0.83rem' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.15)';e.currentTarget.style.color='#fff';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.7)';}}>
          <Instagram size={14}/> DM us for a custom quote
        </a>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
const SERVICES = [
  { icon:<Smartphone size={20}/>, title:'Mobile-First Design',  desc:'Pixel-perfect on every device. 80%+ of your customers are on mobile.' },
  { icon:<Calendar   size={20}/>, title:'Booking System',       desc:'Online reservations and appointments. Customers book you 24/7.' },
  { icon:<BarChart3  size={20}/>, title:'Admin Dashboard',      desc:'Manage content, bookings, and analytics from a simple panel.' },
  { icon:<Zap        size={20}/>, title:'Fast Performance',     desc:'Speed-optimised. Fast sites rank higher and convert better.' },
  { icon:<Palette    size={20}/>, title:'Custom Design',        desc:'Zero templates. 100% custom — built to match your brand.' },
  { icon:<Target     size={20}/>, title:'Built to Convert',     desc:'Every element designed to turn visitors into paying customers.' },
];

function Services() {
  return (
    <section id="services" className="py-28 px-6 md:px-10" style={{ background:'var(--cream)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="mb-3">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-4">— Services</p>
        </Reveal>
        <Reveal delay={60} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display font-semibold text-ink" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em', maxWidth:440 }}>
            Everything Your Business<br/>Website Needs
          </h2>
          <p className="font-body text-ink-3 text-sm leading-relaxed" style={{ maxWidth:280 }}>
            Every feature included by default. No hidden add-ons.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="p-7 rounded-2xl group cursor-default transition-all duration-350"
                style={{ background:'#fff', border:'1px solid var(--border)' }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--shadow-md)';e.currentTarget.style.borderColor='var(--border-dk)';e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)';}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background:'var(--gold-bg)', color:'var(--gold)', border:'1px solid rgba(200,146,42,0.2)' }}>
                  {s.icon}
                </div>
                <h3 className="font-body font-semibold text-ink text-[0.97rem] mb-2">{s.title}</h3>
                <p className="font-body text-ink-3 text-[0.84rem] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section id="cta" className="py-28 px-6 md:px-10" style={{ background:'var(--ink)' }}>
      <div className="max-w-[900px] mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6" style={{ color:'rgba(255,255,255,0.3)' }}>— Get Started</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display font-semibold text-white mb-6" style={{ fontSize:'clamp(2.2rem,5vw,4rem)', letterSpacing:'-0.03em', lineHeight:1.08 }}>
            Want a website like this<br/>for your business?
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="font-body mb-12 leading-relaxed" style={{ color:'rgba(255,255,255,0.45)', fontSize:'1.05rem', maxWidth:440, margin:'0 auto 48px' }}>
            Let WebGrowth.in build you a modern, high-converting website that actually brings results.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a href="https://www.instagram.com/webgrowth.in" target="_blank" rel="noopener noreferrer"
              className="btn px-9 py-4" style={{ background:'rgba(255,255,255,0.95)', color:'var(--ink)', fontSize:'0.92rem', fontWeight:700 }}
              onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.boxShadow='0 8px 28px rgba(255,255,255,0.15)';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.95)';e.currentTarget.style.boxShadow='none';}}>
              <Instagram size={16}/> DM on Instagram
            </a>
            <a href="#portfolio"
              className="btn px-9 py-4" style={{ background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.12)', fontSize:'0.92rem' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.13)';e.currentTarget.style.color='#fff';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)';e.currentTarget.style.color='rgba(255,255,255,0.7)';}}>
              View Our Work
            </a>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[['⚡','48h delivery'],['🎯','Conversion-focused'],['📱','Mobile first'],['✦','Custom design']].map(([icon,label]) => (
              <div key={label} className="flex items-center gap-2 font-body text-xs font-medium" style={{ color:'rgba(255,255,255,0.3)' }}>
                <span style={{ color:'rgba(255,255,255,0.5)' }}>{icon}</span>{label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="px-6 md:px-10 py-14" style={{ background:'var(--ink)', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md flex items-center justify-center font-display font-bold text-sm text-cream"
            style={{ background:'rgba(255,255,255,0.1)' }}>W</div>
          <span className="font-display font-semibold text-white text-lg tracking-tight">
            Web<span style={{ color:'var(--gold)' }}>Growth</span>
            <sup className="font-body font-normal text-[0.5em] tracking-widest" style={{ color:'rgba(200,146,42,0.6)' }}>.in</sup>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#portfolio" className="font-body text-xs tracking-[0.08em] uppercase transition-colors" style={{ color:'rgba(255,255,255,0.35)' }}
            onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.7)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>Work</a>
          <a href="#services" className="font-body text-xs tracking-[0.08em] uppercase transition-colors" style={{ color:'rgba(255,255,255,0.35)' }}
            onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.7)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>Services</a>
          <a href="https://www.instagram.com/webgrowth.in" target="_blank" rel="noopener noreferrer"
            className="font-body text-xs tracking-[0.08em] uppercase transition-colors" style={{ color:'rgba(255,255,255,0.35)' }}
            onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>
            @webgrowth.in
          </a>
          <Link to="/admin" className="font-body text-xs tracking-[0.08em] uppercase transition-colors" style={{ color:'rgba(255,255,255,0.2)' }}
            onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.4)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.2)'}>Admin</Link>
        </div>
        <p className="font-body text-[0.7rem]" style={{ color:'rgba(255,255,255,0.2)' }}>
          © 2025 WebGrowth.in — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ── PAGE EXPORT ── */
export default function Home() {
  const { projects } = useProjects();
  return (
    <div className="grain">
      <Navbar />
      <Hero />
      <Portfolio projects={projects} />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
}
