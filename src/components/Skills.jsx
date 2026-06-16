import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillCategories } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

function SkillOrb({ skill, index, isActive, onHover }) {
  const size = 120 + skill.level * 0.8
  const hue = skill.level * 1.2

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group cursor-pointer"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className="relative rounded-2xl p-6 glass border border-glass-border hover:border-amber-400/20 transition-all duration-500"
        animate={{
          y: isActive === index ? -8 : 0,
          boxShadow: isActive === index
            ? '0 20px 60px rgba(245, 158, 11, 0.1)'
            : '0 0 0 rgba(245, 158, 11, 0)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl">{skill.icon}</span>
          <div className="flex-1">
            <h3 className="font-display text-sm font-semibold text-white">{skill.name}</h3>
            <span className="text-[10px] tracking-wider uppercase text-white/20">{skill.category}</span>
          </div>
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
              />
              <motion.circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke={`hsl(${hue}, 80%, 60%)`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${skill.level * 0.97} 100`}
                initial={{ strokeDasharray: '0 100' }}
                whileInView={{ strokeDasharray: `${skill.level * 0.97} 100` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.05, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-[10px] font-mono text-white/50">{skill.level}%</span>
          </div>
        </div>

        <AnimatePresence>
          {isActive === index && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-white/40 leading-relaxed overflow-hidden"
            >
              {skill.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter(s => s.category === activeFilter)

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-cyan-400/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-cyan-400/80 font-medium">Skills</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
             Technologies I{' '}
            <span className="text-gradient-cyan">use</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/40 text-lg max-w-2xl mb-12 font-light">
            Tools and technologies I work with to build modern, performant web applications.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-2 mb-12">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-5 py-2.5 text-xs tracking-wider rounded-full transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'text-dark-950 bg-gradient-to-r from-cyan-400 to-cyan-500 font-medium'
                    : 'text-white/40 border border-white/5 glass hover:text-white/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillOrb
                key={skill.name}
                skill={skill}
                index={i}
                isActive={hoveredSkill}
                onHover={setHoveredSkill}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
