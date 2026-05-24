import { motion } from 'motion/react'
import { MessageCircle, Layers, Rocket, Instagram } from 'lucide-react'
import SectionEyebrow from './SectionEyebrow'

const steps = [
  {
    n: '01',
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Tell Us About Your Business',
    desc: "Send us a DM on Instagram. No forms, no calls — just tell us what you do, who your customers are, and what you need. We'll reply same day.",
  },
  {
    n: '02',
    icon: <Layers className="w-5 h-5" />,
    title: 'We Design & Build It',
    desc: "We design a site that matches your brand, works on every device, and is built to convert visitors into customers. You get to review it before it goes live.",
  },
  {
    n: '03',
    icon: <Rocket className="w-5 h-5" />,
    title: 'Launch & Grow',
    desc: "Your site goes live within days. We handle hosting, deployment, and make sure everything works. You focus on your business — we handle the tech.",
  },
]

export default function Process() {
  return (
    <section id="process" className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionEyebrow label="How It Works" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-5 mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] text-white max-w-[480px]">
          Getting a Website Has Never Been This Simple
        </h2>
        <p className="text-sm text-white/40 max-w-[260px] leading-relaxed">
          No technical knowledge needed. We handle everything from start to finish.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            className="liquid-glass rounded-2xl p-7 relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-gold bg-gold/10 border border-gold/20">
                {s.icon}
              </div>
              <span className="text-[0.6rem] tracking-[0.2em] text-white/20">{s.n}</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-3">{s.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <a href="https://ig.me/m/webgrowth.in" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold text-black font-bold px-9 py-4 rounded-lg hover:bg-gold/90 transition-all hover:shadow-[0_8px_28px_rgba(200,146,42,0.4)]">
          <Instagram className="w-4 h-4" /> Start With a Free DM
        </a>
      </motion.div>
    </section>
  )
}
