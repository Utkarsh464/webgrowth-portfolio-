import { motion } from 'motion/react'
import { Instagram, ArrowRight } from 'lucide-react'

const IG_DM = 'https://ig.me/m/webgrowth.in'

const gradientStyle = {
  backgroundImage: 'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #c8922a 32.5%, #e8a048 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text' as const,
  backgroundClip: 'text' as const,
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
}

export default function Hero() {
  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10 liquid-glass"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation: 'pulse 2s infinite' }} />
        <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-white/60">
          Trusted by local businesses across India
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.07] max-w-[900px]"
      >
        Your Business Deserves<br />
        <span className="animate-shiny" style={gradientStyle}>a Website That Works</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 text-white/60 max-w-[540px] text-base leading-relaxed"
      >
        We build fast, beautiful websites for local businesses and startups — the kind that actually bring in customers, not just look good.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-10"
      >
        <a href={IG_DM} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-8 py-3.5 rounded-lg hover:bg-white/90 transition-colors">
          <Instagram className="w-4 h-4" /> Start Your Project <ArrowRight className="w-4 h-4" />
        </a>
        <a href="#work"
          className="inline-flex items-center gap-2 liquid-glass border border-white/20 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
          See Our Work
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="flex items-stretch gap-4 mt-16"
      >
        {[['10+', 'Projects Delivered'], ['100%', 'Client Satisfaction'], ['5 days', 'Avg. Delivery']].map(([n, l]) => (
          <div key={l} className="liquid-glass rounded-xl px-6 py-4 text-center min-w-[130px]">
            <p className="font-semibold text-2xl tracking-tight text-white">{n}</p>
            <p className="text-[0.65rem] uppercase tracking-[0.1em] text-white/40 mt-1">{l}</p>
          </div>
        ))}
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }`}</style>
    </section>
  )
}
