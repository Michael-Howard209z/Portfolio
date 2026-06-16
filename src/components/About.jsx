import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, timeline, services } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

function AnimatedCounter({ value, suffix = '', inView }) {
  const [count, setCount] = useState(0)
  const numValue = parseInt(value)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numValue))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, numValue])

  return (
    <span>
      {count}{suffix ? value.replace(numValue, '') : ''}
    </span>
  )
}

export default function About() {
  const [ref, inView] = useInView()
  const [activeYear, setActiveYear] = useState(null)

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-amber-400/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400/80 font-medium">About</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12">
            Turning ideas into{' '}
            <span className="text-gradient-duo">reality</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {services.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-glass-border hover:border-white/10 transition-all duration-500 group">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {personalInfo.bio.map((paragraph, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                <p className="text-white/60 leading-relaxed text-lg font-light">{paragraph}</p>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap gap-3 pt-4">
                {['Web Development', 'React / Next.js', 'UI/UX Design', 'Open Source'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-xs rounded-full border border-white/5 glass text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal delay={0.3}>
              <div className="relative pl-8 border-l border-white/5 space-y-0">
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    className="relative pb-8 group cursor-pointer"
                    onMouseEnter={() => setActiveYear(i)}
                    onMouseLeave={() => setActiveYear(null)}
                  >
                    <motion.div
                      className={`absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-[1.35rem] border-2 transition-all duration-500 ${
                        activeYear === i || activeYear === null
                          ? 'border-amber-400 bg-amber-400/20 shadow-lg shadow-amber-400/20'
                          : 'border-white/10 bg-dark-950'
                      }`}
                      animate={{
                        scale: activeYear === i ? 1.5 : 1,
                      }}
                    />
                    <motion.div
                      className="pl-6"
                      animate={{
                        opacity: activeYear === null || activeYear === i ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-display text-sm font-bold text-amber-400/80">{item.year}</span>
                      <h4 className="font-display text-lg font-semibold text-white mt-1">{item.title}</h4>
                      <p className="text-white/40 text-sm mt-1 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 right-0 w-64 h-64 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
