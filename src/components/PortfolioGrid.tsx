import { motion } from 'motion/react'
import { ExternalLink, Instagram, ArrowUpRight } from 'lucide-react'
import SectionEyebrow from './SectionEyebrow'

const IG_URL = 'https://www.instagram.com/webgrowth.in'

interface Project {
  id: string; title: string; subtitle?: string; description: string
  tech: string[]; category: string; image: string; link: string
  featured?: boolean; color?: string; accent?: string
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionEyebrow label="Our Work" />
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02] text-white">
              Real Projects, Real Results
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-[200px] text-right leading-relaxed hidden md:block">
            Click "View Demo" on any card to see it live.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="liquid-glass rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-52 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {project.featured && (
                  <span className="absolute top-3 right-3 text-[0.6rem] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/80 border border-white/10">
                    ✦ Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-white/40 mb-3">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span className="w-4 h-px bg-white/20" />
                  <span>{project.category}</span>
                </div>

                <h3 className="text-xl font-semibold text-white tracking-tight">{project.title}</h3>
                {project.subtitle && (
                  <p className="text-sm text-gold/70 mt-0.5">{project.subtitle}</p>
                )}
                <p className="text-sm text-white/50 mt-2 leading-relaxed line-clamp-2">{project.description}</p>

                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-[0.6rem] font-medium px-2 py-1 rounded-md bg-white/[0.06] text-white/40 border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
                  {project.link && project.link !== '#' ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-black bg-white px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                      <ExternalLink className="w-3 h-3" /> View Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/30 bg-white/[0.06] px-4 py-2 rounded-lg">
                      ⏳ Coming Soon
                    </span>
                  )}
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors">
                    <Instagram className="w-3 h-3" /> Get This
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 text-center border-t border-white/[0.06] pt-14">
        <p className="text-sm text-white/40 mb-5">Don't see your industry? We build for any business — just ask.</p>
        <a href="https://ig.me/m/webgrowth.in" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 liquid-glass border border-white/20 text-white/80 px-6 py-3 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-colors">
          <Instagram className="w-4 h-4" /> Get a Free Consultation
        </a>
      </div>
    </section>
  )
}
