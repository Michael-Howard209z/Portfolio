import { motion } from 'framer-motion'
import { personalInfo, stats } from '../data/portfolioData'
import MagneticButton from './MagneticButton'

function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-screen pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingShape
        className="w-72 h-72 bg-amber-400/10 blur-3xl -top-32 -right-32"
        delay={0}
      />
      <FloatingShape
        className="w-96 h-96 bg-cyan-400/10 blur-3xl -bottom-48 -left-48"
        delay={2}
      />
      <FloatingShape
        className="w-48 h-48 bg-purple-400/10 blur-3xl top-1/3 right-1/4"
        delay={4}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-xs tracking-[0.3em] uppercase text-white/40 border border-white/10 rounded-full glass">
            Based in {personalInfo.location}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 2.1 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            <span className="block text-gradient-amber">Hi, I'm</span>
            <span className="block text-gradient-duo">Nguyen Hoang</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 2.4 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 2.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={scrollToProjects}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-dark-950 font-semibold text-sm tracking-wide overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>

          <MagneticButton
            onClick={scrollToContact}
            className="px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-sm tracking-wide transition-all duration-300 glass glass-hover"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient-duo mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/30 tracking-wider uppercase">{stat.label}</div>
              <div className="text-[10px] text-white/20">{stat.suffix}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center pt-2"
          aria-label="Scroll down"
        >
          <span className="w-1 h-2 rounded-full bg-white/30" />
        </motion.button>
      </motion.div>
    </section>
  )
}
