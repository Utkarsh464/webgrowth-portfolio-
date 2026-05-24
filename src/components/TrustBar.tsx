const items = ['Restaurants', 'Gyms & Fitness', 'Hotels', 'Clinics', 'Retail Stores', 'Startups', 'Coaching', 'Real Estate']

export default function TrustBar() {
  return (
    <div className="relative z-10 border-y border-white/[0.06] py-3 overflow-hidden bg-black/20 backdrop-blur-sm">
      <div className="flex animate-marquee gap-12" style={{ width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap text-white/30">
            {i % 2 === 0 ? '✦' : '·'} {item}
          </span>
        ))}
      </div>
    </div>
  )
}
