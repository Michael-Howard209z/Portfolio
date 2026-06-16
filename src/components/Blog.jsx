import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const RSS_URL = 'https://github.blog/feed/'
const RSS2JSON = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`

function timeAgo(dateStr) {
  const now = new Date()
  const d = new Date(dateStr)
  const diff = Math.floor((now - d) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer"
    >
      <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-dark-800 mb-5">
          {post.thumbnail && (
            <motion.img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
          {post.category && (
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/40">{post.category}</span>
          )}
          <span>{timeAgo(post.pubDate)}</span>
          {post.author && (
            <>
              <span>\u00b7</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        <h3 className="font-display text-lg font-bold text-white group-hover:text-gradient-amber transition-all duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-white/40 text-sm mt-2 leading-relaxed line-clamp-2">
          {post.description?.replace(/<[^>]*>/g, '').slice(0, 200)}
        </p>
      </a>
    </motion.article>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(RSS2JSON, { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error('Failed to fetch'); return r.json() })
      .then((data) => {
        if (data.status === 'ok') {
          setPosts(data.items.slice(0, 6).map((item) => ({
            title: item.title,
            link: item.link,
            description: item.description,
            thumbnail: item.enclosure?.link || item.thumbnail || '',
            pubDate: item.pubDate,
            category: item.categories?.[0] || 'Blog',
            author: item.author || 'GitHub',
          })))
        }
      })
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-cyan-400/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-cyan-400/80 font-medium">From GitHub Blog</span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Latest{' '}
              <span className="text-gradient-cyan">posts</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href="https://github.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
            >
              Read all articles
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 gap-3">
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-white/30 text-sm">Loading latest posts\u2026</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-white/20 text-lg">Could not load posts.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogCard key={post.link} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
