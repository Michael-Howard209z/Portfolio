import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-dark-950/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-5xl mx-auto my-8 md:my-16 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-video mb-10 bg-dark-800">
              <motion.img
                src={project.images?.[0] || project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-[10px] tracking-wider uppercase font-medium">
                    {project.year}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-[10px] tracking-wider uppercase">
                    {project.duration}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white">{project.title}</h2>
                <p className="text-white/40 text-lg mt-1">{project.subtitle}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mb-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">Overview</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{project.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">The Challenge</h3>
                  <p className="text-white/50 leading-relaxed">{project.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">The Solution</h3>
                  <p className="text-white/50 leading-relaxed">{project.solution}</p>
                </div>

                {project.images && project.images.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.slice(1).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${project.title} screenshot ${i + 2}`}
                        loading="lazy"
                        className="rounded-xl w-full aspect-video object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="glass rounded-xl p-6 border border-glass-border">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Details</h3>
                  <div className="space-y-3">
                    {project.language && (
                      <div>
                        <span className="text-[10px] tracking-wider uppercase text-white/20">Language</span>
                        <p className="text-sm text-white/70">{project.language}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-white/20">Year</span>
                      <p className="text-sm text-white/70">{project.year}</p>
                    </div>
                    <div className="flex gap-4 pt-2">
                      {project.stars !== undefined && (
                        <div className="flex items-center gap-1.5 text-sm text-amber-400/70">
                          <span>&starf;</span>
                          <span>{project.stars}</span>
                        </div>
                      )}
                      {project.forks !== undefined && (
                        <div className="flex items-center gap-1.5 text-sm text-cyan-400/70">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          <span>{project.forks}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 border border-glass-border">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[10px] tracking-wider rounded-full bg-white/5 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-dark-950 text-sm font-semibold text-center hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300"
                    >
                      {project.link.includes('github.com') ? 'View on GitHub' : 'Live Site'}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-5 py-3 rounded-full border border-white/10 text-white/50 text-sm text-center hover:text-white hover:border-white/30 transition-all duration-300"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
