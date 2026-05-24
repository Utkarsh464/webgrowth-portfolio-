import { Instagram } from 'lucide-react'

const IG = 'https://www.instagram.com/webgrowth.in'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center font-bold text-sm text-white">W</div>
            <span className="font-semibold text-base tracking-tight text-white">
              Web<span className="text-gold">Growth</span>
              <sup className="font-normal text-[0.5em] text-white/30 tracking-widest">.in</sup>
            </span>
          </div>

          <nav className="flex items-center gap-6 flex-wrap">
            {[['#work', 'Work'], ['#services', 'Services'], ['#process', 'Process'], ['#pricing', 'Pricing']].map(([href, label]) => (
              <a key={href} href={href} className="text-xs tracking-[0.08em] uppercase text-white/35 hover:text-white/70 transition-colors">{label}</a>
            ))}
            <a href={IG} target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.08em] uppercase text-white/35 hover:text-gold transition-colors">@webgrowth.in</a>
          </nav>

          <p className="text-[0.7rem] text-white/20">&copy; 2025 WebGrowth.in</p>
        </div>
      </div>
    </footer>
  )
}
