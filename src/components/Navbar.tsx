import { motion } from 'motion/react'
import { Menu, Instagram } from 'lucide-react'

const links = [
  ['#work', 'Work'],
  ['#services', 'Services'],
  ['#process', 'Process'],
  ['#pricing', 'Pricing'],
]
const IG_DM = 'https://ig.me/m/webgrowth.in'

export default function Navbar() {
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

        <button className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.nav>
  )
}
