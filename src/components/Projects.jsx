import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import ProjectModal from './ProjectModal'

const GITHUB_USERNAME = 'Michael-Howard209z'
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`

const langColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', PHP: '#4F5D95',
  'C#': '#178600', Ruby: '#701516', Go: '#00ADD8', Rust: '#dea584',
  Java: '#b07219', Swift: '#F05138', Kotlin: '#A97BFF', Vue: '#4fc08d',
  SCSS: '#c6538c', Less: '#1d365d', Astro: '#ff5a03', Zig: '#ec915c',
}

const FALLBACK_IMG = 'https://i.pinimg.com/originals/01/78/d7/0178d72ea4a29e79665cfeacf566259e.gif'

function repoToProject(repo, index) {
  const topics = repo.topics?.length ? repo.topics : (repo.language ? [repo.language] : ['Web'])
  return {
    id: repo.id,
    title: repo.name,
    subtitle: repo.description?.slice(0, 60) || 'No description',
    description: repo.description || 'A project on GitHub.',
    longDescription: repo.description || 'No description available.',
    tags: topics.slice(0, 5),
    image: FALLBACK_IMG,
    images: [FALLBACK_IMG],
    category: topics.includes('frontend') || topics.includes('react') || topics.includes('nextjs') ? 'frontend' : 'backend',
    year: new Date(repo.created_at).getFullYear().toString(),
    role: 'Developer',
    duration: 'Ongoing',
    link: repo.homepage || repo.html_url,
    github: repo.html_url,
    color: repo.language ? (langColors[repo.language] || '#f59e0b') : '#f59e0b',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    challenge: 'Building and maintaining open-source software.',
    solution: 'Focused on clean code, documentation, and community-driven development.',
  }
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative cursor-pointer"
      onClick={() => onOpen(project)}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-dark-800">
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/10">
            View Details
          </span>
        </motion.div>
        <div className="absolute top-4 left-4 flex gap-2">
          {project.language && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/60 backdrop-blur-sm text-[10px] tracking-wider uppercase text-white/50 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColors[project.language] || '#888' }} />
              {project.language}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {project.stars > 0 && (
            <span className="px-3 py-1 rounded-full bg-dark-950/60 backdrop-blur-sm text-[10px] text-amber-400/80 border border-white/5">
              &starf; {project.stars}
            </span>
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white group-hover:text-gradient-amber transition-all duration-300">
              {project.title}
            </h3>
            <p className="text-white/40 text-sm mt-1 line-clamp-1">{project.subtitle}</p>
          </div>
          <motion.div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center shrink-0 group-hover:border-amber-400/30 group-hover:bg-amber-400/5 transition-all duration-300" whileHover={{ x: 5 }}>
            <svg className="w-4 h-4 text-white/30 group-hover:text-amber-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </motion.div>
        </div>
        <p className="text-white/30 text-sm mt-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-3 py-1 text-[10px] tracking-wider rounded-full bg-white/5 text-white/30">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-[10px] tracking-wider rounded-full bg-white/5 text-white/20">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(GITHUB_API, { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork).map(repoToProject))
        }
      })
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const filtered = useMemo(() => {
    if (!searchQuery) return repos
    const q = searchQuery.toLowerCase()
    return repos.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q))
    )
  }, [repos, searchQuery])

  const handleOpen = useCallback((project) => setSelectedProject(project), [])
  const handleClose = useCallback(() => setSelectedProject(null), [])

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-amber-400/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400/80 font-medium">Open Source Work</span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Projects from{' '}
              <span className="text-gradient-duo">GitHub</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search repos\u2026"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-4 py-2.5 bg-white/5 border border-white/5 rounded-full text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-400/30 transition-colors duration-300"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-amber-400/30 border-t-amber-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-white/30 text-sm">Loading projects from GitHub\u2026</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-white/20 text-lg">Could not load repositories. Please try again later.</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onOpen={handleOpen} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-white/20 text-lg">No repos match your search.</p>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={handleClose} />
    </section>
  )
}
