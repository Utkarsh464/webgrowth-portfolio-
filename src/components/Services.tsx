import { motion } from 'motion/react'
import { Smartphone, Calendar, BarChart3, Zap, Palette, Target } from 'lucide-react'
import SectionEyebrow from './SectionEyebrow'

const SERVICES = [
  { icon: <Smartphone className="w-5 h-5" />, title: 'Mobile-First Design', desc: '80%+ of your customers are on mobile. Every site we build looks and works perfectly on every screen.' },
  { icon: <Calendar className="w-5 h-5" />, title: 'Booking & Enquiry', desc: 'Let customers book appointments, request quotes, or enquire 24/7 — directly from your website.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Admin Dashboard', desc: 'Manage your content, view enquiries, and track performance from a simple, easy-to-use panel.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Lightning Fast', desc: 'Fast-loading sites rank higher on Google and keep customers from bouncing. Speed is non-negotiable.' },
  { icon: <Palette className="w-5 h-5" />, title: '100% Custom Design', desc: 'No templates. Every site is designed from scratch to match your brand and stand out in your market.' },
  { icon: <Target className="w-5 h-5" />, title: 'Built to Convert', desc: 'Every button, headline, and layout is designed with one goal: turning visitors into paying customers.' },
]

export default function Services() {
  return (
    <section id="services" className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <SectionEyebrow label="What We Build" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-5 mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] text-white max-w-[440px]">
          Everything Your Website<br />Needs to Succeed
        </h2>
        <p className="text-sm text-white/40 max-w-[280px] leading-relaxed">
          Every feature is included. No hidden charges, no surprise add-ons.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="liquid-glass rounded-2xl p-6 group hover:bg-white/[0.03] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-gold bg-gold/10 border border-gold/20 mb-5">
              {s.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
