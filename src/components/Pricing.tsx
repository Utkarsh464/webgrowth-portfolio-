import { motion } from 'motion/react'
import { CheckCircle2, Instagram } from 'lucide-react'
import SectionEyebrow from './SectionEyebrow'

const plans = [
  {
    name: 'Starter',
    tag: 'Perfect for small businesses',
    price: 'Custom Quote',
    features: ['Up to 5 pages', 'Mobile-first design', 'Contact / enquiry form', 'WhatsApp integration', 'Basic SEO setup', '1 round of revisions'],
    cta: 'Get a Quote',
    highlight: false,
  },
  {
    name: 'Growth',
    tag: 'Most popular',
    price: 'Custom Quote',
    features: ['Up to 10 pages', 'Custom animations & design', 'Booking or order system', 'Admin dashboard', 'Google Analytics setup', '3 rounds of revisions', 'Post-launch support'],
    cta: 'Get a Quote',
    highlight: true,
  },
  {
    name: 'Pro',
    tag: 'For serious growth',
    price: 'Custom Quote',
    features: ['Unlimited pages', 'Full custom web application', 'Payment gateway integration', 'Advanced dashboard & analytics', 'Priority support', 'Unlimited revisions', 'Ongoing maintenance'],
    cta: "Let's Talk",
    highlight: false,
  },
]

const IG_DM = 'https://ig.me/m/webgrowth.in'

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <SectionEyebrow label="Pricing" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-5 mb-5"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] text-white max-w-[440px]">
          Flexible Pricing,<br />Built Around You
        </h2>
        <p className="text-sm text-white/40 max-w-[300px] leading-relaxed">
          Every project is different. Tell us what you need and we'll give you an honest, no-pressure quote.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm text-white/40 mb-14"
      >
        💬 Prices vary based on your requirements — DM us to get a custom quote within 24 hours.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`liquid-glass rounded-2xl p-7 flex flex-col relative ${plan.highlight ? 'border border-gold/30' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full bg-gold text-black">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-2">{plan.tag}</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-1">{plan.name}</h3>
              <p className="text-sm font-semibold text-gold">{plan.price}</p>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/60 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <a href={IG_DM} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 w-full text-center font-bold text-sm py-3 rounded-lg transition-all ${
                plan.highlight
                  ? 'bg-gold text-black hover:bg-gold/90'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {plan.cta || 'Get a Quote'} <Instagram className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 p-5 rounded-xl bg-gold/5 border border-gold/20 text-center"
      >
        <p className="text-sm text-white/60 leading-relaxed">
          <span className="font-semibold text-white">Not sure which plan fits you?</span> That's completely fine — just DM us on Instagram and describe your business. We'll recommend the right option with no obligation.
        </p>
      </motion.div>
    </section>
  )
}
