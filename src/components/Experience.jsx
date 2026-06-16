import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

function ExperienceCard({ exp, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [ref, inView] = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative pl-12 pb-16 last:pb-0"
    >
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />

      <motion.div
        className="absolute left-0 top-2 w-4 h-4 rounded-full -translate-x-[8.5px] border-2 flex items-center justify-center"
        style={{ borderColor: exp.color }}
        animate={inView ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
      </motion.div>

      <div className="glass rounded-2xl p-6 md:p-8 border border-glass-border hover:border-white/10 transition-all duration-500 group">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span
            className="px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium"
            style={{
              backgroundColor: `${exp.color}15`,
              color: exp.color,
            }}
          >
            {exp.type === 'education' ? 'Education' : 'Experience'}
          </span>
          <span className="text-xs text-white/20 font-mono">{exp.period}</span>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-gradient-duo transition-all duration-300">
          {exp.role}
        </h3>
        <p className="text-amber-400/60 text-sm mt-1 font-medium">{exp.company}</p>

        <p className="text-white/40 text-sm mt-4 leading-relaxed">{exp.description}</p>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-xs tracking-wider uppercase text-white/30 hover:text-white/60 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show Achievements'}
          <motion.svg
            className="w-3 h-3"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <ul className="mt-4 space-y-2 pt-4 border-t border-white/5">
            {exp.achievements.map((ach, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: exp.color }} />
                {ach}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-amber-400/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400/80 font-medium">Journey</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            My learning{' '}
            <span className="text-gradient-duo">journey</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/40 text-lg max-w-2xl mb-16 font-light">
            From self-taught beginnings to building full-stack applications — here's how I got here.
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}
