import { motion } from 'motion/react'
import { Instagram } from 'lucide-react'

const IG_DM = 'https://ig.me/m/webgrowth.in'

export default function CTA() {
  return (
    <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)' }}
        />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs uppercase tracking-widest text-white/40 mb-6"
          >
            — Get Started Today
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-white"
          >
            Ready to Grow Your<br />Business Online?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-white/50 max-w-[460px] mx-auto text-sm leading-relaxed"
          >
            Send us a message on Instagram — we'll get back to you within a few hours, understand your requirements, and give you a free, no-pressure quote.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mt-10"
          >
            <a href={IG_DM} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all hover:shadow-[0_8px_28px_rgba(255,255,255,0.15)]">
              <Instagram className="w-4 h-4" /> DM Us on Instagram
            </a>
            <a href="#work"
              className="inline-flex items-center gap-2 liquid-glass border border-white/20 text-white/80 px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
              View Our Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12"
          >
            {[['✦', 'Free consultation'], ['⚡', 'Quick turnaround'], ['📱', 'Mobile-first'], ['🔒', 'No hidden fees']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-xs font-medium text-white/30">
                <span className="text-white/50">{icon}</span>{label}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
