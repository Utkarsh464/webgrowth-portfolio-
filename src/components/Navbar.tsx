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

      {/* Side drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] sm:w-[320px] flex flex-col"
            >
              <div className="absolute inset-0 bg-[#0c0c0c]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,146,42,0.04)_0%,transparent_60%)]" />
              <div className="absolute inset-0 border-l border-white/10" />
              <div className="absolute inset-0" style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }} />

              {/* Close + logo row */}
              <div className="relative z-10 flex items-center justify-between px-6 h-16 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs text-white">W</div>
                  <span className="font-semibold text-sm tracking-tight text-white">
                    Web<span className="text-gold">Growth</span>
                  </span>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Nav links */}
              <div className="relative z-10 flex-1 flex flex-col justify-center px-6 gap-1">
                {links.map(([href, label], i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    onClick={() => handleClick(href)}
                    className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-lg font-semibold tracking-tight text-white/70 hover:text-gold hover:bg-gold/5 transition-all"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                    {label}
                  </motion.button>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 px-6 pb-8"
              >
                <a
                  href={IG_DM}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full bg-white text-black text-sm font-medium px-5 py-3.5 rounded-xl hover:bg-white/90 transition-all active:scale-[0.98]"
                >
                  <Instagram className="w-4 h-4" /> Get a Quote
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
