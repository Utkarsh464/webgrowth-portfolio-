import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Instagram } from 'lucide-react'

const links = [
  ['#work', 'Work'],
  ['#services', 'Services'],
  ['#process', 'Process'],
  ['#pricing', 'Pricing'],
]
const IG_DM = 'https://ig.me/m/webgrowth.in'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function handleClick(href: string) {
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm text-white">W</div>
          <span className="font-semibold text-base tracking-tight text-white">
            Web<span className="text-gold">Growth</span>
            <sup className="font-normal text-[0.5em] text-white/30 tracking-widest">.in</sup>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-white/60 hover:text-white transition-colors">{label}</a>
          ))}
          <a href={IG_DM} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2 rounded-lg hover:bg-white/90 transition-colors">
            <Instagram className="w-3.5 h-3.5" /> Get a Quote
          </a>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          >
            {/* Background with liquid-glass feel */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,146,42,0.06)_0%,transparent_60%)]" />
            <div className="absolute inset-0" style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }} />

            {/* Gradient border bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-10">
              <X className="w-5 h-5 text-white/70" />
            </button>

            {/* Logo at top */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm text-white">W</div>
              <span className="font-semibold text-base tracking-tight text-white">
                Web<span className="text-gold">Growth</span>
              </span>
            </div>

            {/* Nav links */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {links.map(([href, label], i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => handleClick(href)}
                  className="group relative text-3xl font-semibold tracking-tight text-white/80 hover:text-gold transition-colors"
                >
                  <span className="relative z-10">{label}</span>
                  <span className="absolute -inset-x-4 -inset-y-2 rounded-xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              href={IG_DM}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="relative z-10 mt-10 inline-flex items-center gap-2.5 bg-white text-black text-sm font-medium px-7 py-3.5 rounded-xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4" /> Get a Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
