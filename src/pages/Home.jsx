import { useRef } from 'react';
import Navbar from '../components/Navbar';
import StackedCards from '../components/StackedCards';
import { useProjects } from '../hooks/useProjects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Instagram, ArrowRight, Zap, Smartphone, Calendar,
  BarChart3, Palette, Target, ChevronDown,
  CheckCircle2, MessageCircle, Layers, Rocket
} from 'lucide-react';

const IG = 'https://www.instagram.com/webgrowth.in';
const IG_DM = 'https://ig.me/m/webgrowth.in';

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
      style={{ background: 'var(--cream)' }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(10,9,8,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,9,8,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div className="anim-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
          style={{ background:'rgba(10,9,8,0.05)', border:'1px solid rgba(10,9,8,0.1)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation:'pulse 2s infinite' }} />
          <span className="font-body text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-ink-3">
            Trusted by local businesses across India
          </span>
        </div>

        <h1 className="anim-fade-up anim-d1 font-display font-semibold text-ink leading-[1.07] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}>
          Your Business Deserves<br />
          <em className="not-italic" style={{ color:'var(--gold)' }}>a Website That Works</em>
        </h1>

        <p className="anim-fade-up anim-d2 font-body text-ink-3 max-w-[540px] mx-auto leading-relaxed mb-12"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}>
          We build fast, beautiful websites for local businesses and startups — the kind that actually bring in customers, not just look good.
        </p>

        <div className="anim-fade-up anim-d3 flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href={IG_DM} target="_blank" rel="noopener noreferrer"
            className="btn btn-dark px-8 py-3.5" style={{ fontSize:'0.9rem' }}>
            Start Your Project <ArrowRight size={16}/>
          </a>
          <a href="#work" className="btn btn-outline px-8 py-3.5" style={{ fontSize:'0.9rem' }}>
            See Our Work
          </a>
        </div>

        <div className="anim-fade-up anim-d4 grid grid-cols-3 gap-6 max-w-[480px] mx-auto mb-16">
          {[['10+','Projects Delivered'],['100%','Client Satisfaction'],['5 days','Avg. Delivery']].map(([n,l]) => (
            <div key={l} className="text-center">
              <p className="font-display font-semibold text-ink mb-0.5" style={{ fontSize:'2rem', letterSpacing:'-0.02em' }}>{n}</p>
              <p className="font-body text-ink-4 text-xs uppercase tracking-[0.1em]">{l}</p>
            </div>
          ))}
        </div>

        <div className="anim-fade-up anim-d5 flex flex-col items-center gap-2 opacity-40">
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-ink-3">Scroll to explore</span>
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

/* ══════════════════════════════════════════
   TRUST BAR
══════════════════════════════════════════ */
function TrustBar() {
  const items = ['Restaurants','Gyms & Fitness','Hotels','Clinics','Retail Stores','Startups','Coaching','Real Estate'];
  return (
    <div style={{ background:'var(--ink)', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'14px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', gap:'48px', animation:'marquee 22s linear infinite', width:'max-content' }}>
        {[...items,...items].map((item, i) => (
          <span key={i} className="font-body text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap"
            style={{ color:'rgba(255,255,255,0.35)' }}>
            {i % 2 === 0 ? '✦' : '·'} {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   PORTFOLIO
══════════════════════════════════════════ */
function Portfolio({ projects }) {
  return (
    <section id="work" style={{ background: '#0f0d0a' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 flex items-end justify-between border-b border-white/10">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-2" style={{ color:'rgba(255,255,255,0.35)' }}>— Our Work</p>
          <h2 className="font-display font-semibold text-white" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em' }}>
            Real Projects, Real Results
          </h2>
        </div>
        <p className="font-body text-[0.83rem] hidden md:block" style={{ color:'rgba(255,255,255,0.35)', maxWidth:240, textAlign:'right', lineHeight:1.6 }}>
          Click "View Demo" on any card to see it live.
        </p>
      </div>
      <StackedCards projects={projects} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 text-center border-t border-white/10">
        <p className="font-body text-[0.9rem] mb-5" style={{ color:'rgba(255,255,255,0.45)' }}>
          Don't see your industry? We build for any business — just ask.
        </p>
        <a href={IG_DM} target="_blank" rel="noopener noreferrer"
          className="btn" style={{ background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.75)', border:'1px solid rgba(255,255,255,0.12)', fontSize:'0.85rem' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.15)';e.currentTarget.style.color='#fff';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.75)';}}>
          <Instagram size={14}/> Get a Free Consultation
        </a>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════ */
function Process() {
  const steps = [
    {
      n: '01',
      icon: <MessageCircle size={22}/>,
      title: 'Tell Us About Your Business',
      desc: "Send us a DM on Instagram. No forms, no calls — just tell us what you do, who your customers are, and what you need. We'll reply same day.",
    },
    {
      n: '02',
      icon: <Layers size={22}/>,
      title: 'We Design & Build It',
      desc: "We design a site that matches your brand, works on every device, and is built to convert visitors into customers. You get to review it before it goes live.",
    },
    {
      n: '03',
      icon: <Rocket size={22}/>,
      title: 'Launch & Grow',
      desc: "Your site goes live within days. We handle hosting, deployment, and make sure everything works. You focus on your business — we handle the tech.",
    },
  ];

  return (
    <section id="process" className="py-28 px-6 md:px-10" style={{ background:'var(--ink)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-4" style={{ color:'rgba(255,255,255,0.3)' }}>— How It Works</p>
        </Reveal>
        <Reveal delay={60} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display font-semibold text-white" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em', maxWidth:480 }}>
            Getting a Website Has Never Been This Simple
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.4)', maxWidth:260 }}>
            No technical knowledge needed. We handle everything from start to finish.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="relative p-8 rounded-2xl h-full"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:'rgba(200,146,42,0.15)', color:'var(--gold)', border:'1px solid rgba(200,146,42,0.2)' }}>
                    {s.icon}
                  </div>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em]" style={{ color:'rgba(255,255,255,0.2)' }}>{s.n}</span>
                </div>
                <h3 className="font-body font-semibold text-white mb-3" style={{ fontSize:'1rem' }}>{s.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.45)' }}>{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px" style={{ background:'rgba(255,255,255,0.12)' }}/>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-12 text-center">
          <a href={IG_DM} target="_blank" rel="noopener noreferrer"
            className="btn px-9 py-4" style={{ background:'var(--gold)', color:'#fff', fontSize:'0.92rem', fontWeight:700 }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 28px rgba(200,146,42,0.4)';}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';}}>
            <Instagram size={16}/> Start With a Free DM
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES
══════════════════════════════════════════ */
const SERVICES = [
  { icon:<Smartphone size={20}/>, title:'Mobile-First Design',  desc:'80%+ of your customers are on mobile. Every site we build looks and works perfectly on every screen.' },
  { icon:<Calendar   size={20}/>, title:'Booking & Enquiry',    desc:'Let customers book appointments, request quotes, or enquire 24/7 — directly from your website.' },
  { icon:<BarChart3  size={20}/>, title:'Admin Dashboard',      desc:'Manage your content, view enquiries, and track performance from a simple, easy-to-use panel.' },
  { icon:<Zap        size={20}/>, title:'Lightning Fast',       desc:'Fast-loading sites rank higher on Google and keep customers from bouncing. Speed is non-negotiable.' },
  { icon:<Palette    size={20}/>, title:'100% Custom Design',   desc:'No templates. Every site is designed from scratch to match your brand and stand out in your market.' },
  { icon:<Target     size={20}/>, title:'Built to Convert',     desc:'Every button, headline, and layout is designed with one goal: turning visitors into paying customers.' },
];

function Services() {
  return (
    <section id="services" className="py-28 px-6 md:px-10" style={{ background:'var(--cream)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal><p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-4 mb-3">— What We Build</p></Reveal>
        <Reveal delay={60} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display font-semibold text-ink" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em', maxWidth:440 }}>
            Everything Your Website<br/>Needs to Succeed
          </h2>
          <p className="font-body text-ink-3 text-sm leading-relaxed" style={{ maxWidth:280 }}>
            Every feature is included. No hidden charges, no surprise add-ons.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="p-7 rounded-2xl h-full"
                style={{ background:'#fff', border:'1px solid var(--border)', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--shadow-md)';e.currentTarget.style.borderColor='var(--border-dk)';e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)';}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
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

/* ══════════════════════════════════════════
   PRICING
══════════════════════════════════════════ */
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      tag: 'Perfect for small businesses',
      price: 'Custom Quote',
      features: [
        'Up to 5 pages',
        'Mobile-first design',
        'Contact / enquiry form',
        'WhatsApp integration',
        'Basic SEO setup',
        '1 round of revisions',
      ],
      cta: 'Get a Quote',
      highlight: false,
    },
    {
      name: 'Growth',
      tag: 'Most popular',
      price: 'Custom Quote',
      features: [
        'Up to 10 pages',
        'Custom animations & design',
        'Booking or order system',
        'Admin dashboard',
        'Google Analytics setup',
        '3 rounds of revisions',
        'Post-launch support',
      ],
      cta: 'Get a Quote',
      highlight: true,
    },
    {
      name: 'Pro',
      tag: 'For serious growth',
      price: 'Custom Quote',
      features: [
        'Unlimited pages',
        'Full custom web application',
        'Payment gateway integration',
        'Advanced dashboard & analytics',
        'Priority support',
        'Unlimited revisions',
        'Ongoing maintenance',
      ],
      cta: 'Let\'s Talk',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 px-6 md:px-10" style={{ background:'var(--cream)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal><p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-4 mb-3">— Pricing</p></Reveal>
        <Reveal delay={60} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-5">
          <h2 className="font-display font-semibold text-ink" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em', maxWidth:440 }}>
            Flexible Pricing,<br/>Built Around You
          </h2>
          <p className="font-body text-ink-3 text-sm leading-relaxed" style={{ maxWidth:300 }}>
            Every project is different. Tell us what you need and we'll give you an honest, no-pressure quote.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="font-body text-sm text-ink-4 mb-14">
            💬 Prices vary based on your requirements — DM us to get a custom quote within 24 hours.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div className="relative flex flex-col p-8 rounded-2xl h-full"
                style={{
                  background: plan.highlight ? 'var(--ink)' : '#fff',
                  border: plan.highlight ? 'none' : '1px solid var(--border)',
                  boxShadow: plan.highlight ? '0 24px 60px rgba(10,9,8,0.25)' : 'none',
                }}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="font-body text-[0.65rem] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
                      style={{ background:'var(--gold)', color:'#fff' }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="font-body text-xs font-semibold tracking-[0.12em] uppercase mb-2"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.4)' : 'var(--ink-4)' }}>
                    {plan.tag}
                  </p>
                  <h3 className="font-display font-semibold mb-1" style={{ fontSize:'1.7rem', color: plan.highlight ? '#fff' : 'var(--ink)', letterSpacing:'-0.02em' }}>
                    {plan.name}
                  </h3>
                  <p className="font-body text-sm font-semibold" style={{ color:'var(--gold)' }}>{plan.price}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: plan.highlight ? 'var(--gold)' : 'var(--gold)' }}/>
                      <span className="font-body text-sm leading-relaxed" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--ink-3)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href={IG_DM} target="_blank" rel="noopener noreferrer"
                  className="btn text-center w-full justify-center"
                  style={{
                    background: plan.highlight ? 'var(--gold)' : 'transparent',
                    color: plan.highlight ? '#fff' : 'var(--ink)',
                    border: plan.highlight ? 'none' : '1px solid var(--border-dk)',
                    fontWeight: 700,
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.opacity='0.88'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; }}>
                  {plan.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 p-6 rounded-2xl text-center" style={{ background:'var(--gold-bg)', border:'1px solid rgba(200,146,42,0.2)' }}>
            <p className="font-body text-sm text-ink-3 leading-relaxed">
              <span className="font-semibold text-ink">Not sure which plan fits you?</span> That's completely fine — just DM us on Instagram and describe your business. We'll recommend the right option with no obligation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
function CTA() {
  return (
    <section id="contact" className="py-28 px-6 md:px-10" style={{ background:'var(--ink)' }}>
      <div className="max-w-[860px] mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6" style={{ color:'rgba(255,255,255,0.3)' }}>— Get Started Today</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display font-semibold text-white mb-5" style={{ fontSize:'clamp(2rem,5vw,3.8rem)', letterSpacing:'-0.03em', lineHeight:1.1 }}>
            Ready to Grow Your<br/>Business Online?
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="font-body mb-12 leading-relaxed" style={{ color:'rgba(255,255,255,0.5)', fontSize:'1.05rem', maxWidth:460, margin:'0 auto 48px' }}>
            Send us a message on Instagram — we'll get back to you within a few hours, understand your requirements, and give you a free, no-pressure quote.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <a href={IG_DM} target="_blank" rel="noopener noreferrer"
              className="btn px-9 py-4" style={{ background:'rgba(255,255,255,0.95)', color:'var(--ink)', fontSize:'0.92rem', fontWeight:700 }}
              onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.boxShadow='0 8px 28px rgba(255,255,255,0.15)';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.95)';e.currentTarget.style.boxShadow='none';}}>
              <Instagram size={16}/> DM Us on Instagram
            </a>
            <a href="#work" className="btn px-9 py-4"
              style={{ background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.12)', fontSize:'0.92rem' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.13)';e.currentTarget.style.color='#fff';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)';e.currentTarget.style.color='rgba(255,255,255,0.7)';}}>
              View Our Work
            </a>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[['✦','Free consultation'],['⚡','Quick turnaround'],['📱','Mobile-first'],['🔒','No hidden fees']].map(([icon,label]) => (
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

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="px-6 md:px-10 py-12" style={{ background:'var(--ink)', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center font-display font-bold text-sm"
              style={{ background:'rgba(255,255,255,0.1)', color:'#f8f6f1' }}>W</div>
            <span className="font-display font-semibold text-white text-lg tracking-tight">
              Web<span style={{ color:'var(--gold)' }}>Growth</span>
              <sup className="font-body font-normal text-[0.5em] tracking-widest" style={{ color:'rgba(200,146,42,0.6)' }}>.in</sup>
            </span>
          </div>
          <nav className="flex items-center gap-6 flex-wrap">
            {[['#work','Work'],['#services','Services'],['#process','Process'],['#pricing','Pricing']].map(([href,label]) => (
              <a key={href} href={href} className="font-body text-xs tracking-[0.08em] uppercase transition-colors"
                style={{ color:'rgba(255,255,255,0.35)' }}
                onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>
                {label}
              </a>
            ))}
            <a href={IG} target="_blank" rel="noopener noreferrer"
              className="font-body text-xs tracking-[0.08em] uppercase transition-colors"
              style={{ color:'rgba(255,255,255,0.35)' }}
              onMouseEnter={e=>e.target.style.color='var(--gold)'}
              onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>
              @webgrowth.in
            </a>
          </nav>
          <p className="font-body text-[0.7rem]" style={{ color:'rgba(255,255,255,0.2)' }}>
            © 2025 WebGrowth.in
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════ */
export default function Home() {
  const { projects } = useProjects();
  return (
    <div className="grain">
      <Navbar />
      <Hero />
      <TrustBar />
      <Portfolio projects={projects} />
      <Process />
      <Services />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
