import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import MagneticButton from './MagneticButton'

function AnimatedInput({ label, type = 'text', value, onChange, textarea = false }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  const Tag = textarea ? 'textarea' : 'input'

  return (
    <div className="relative">
      <Tag
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent border-b text-white transition-all duration-300 peer ${
          focused || hasValue ? 'border-amber-400/50' : 'border-white/10'
        } ${textarea ? 'pb-3 pt-6 resize-none min-h-[120px]' : 'pb-3 pt-6'}`}
        rows={textarea ? 4 : undefined}
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? 'text-[10px] -top-1 text-amber-400/60'
            : 'text-sm top-6 text-white/20'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.subject.trim()) errs.subject = 'Required'
    if (!form.message.trim()) errs.message = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-amber-400/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400/80 font-medium">Connect</span>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Let's work{' '}
            <span className="text-gradient-duo">together</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">
                Have a project in mind? I'm always open to discussing new opportunities,
                collaborations, or just a friendly conversation about design and technology.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-4 mb-10">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="w-10 h-10 rounded-full glass border border-glass-border flex items-center justify-center group-hover:border-amber-400/30 transition-all duration-300">
                    <svg className="w-4 h-4 text-white/30 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors">
                    {personalInfo.email}
                  </span>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="w-10 h-10 rounded-full glass border border-glass-border flex items-center justify-center group-hover:border-amber-400/30 transition-all duration-300">
                    <svg className="w-4 h-4 text-white/30 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors">
                    {personalInfo.phone}
                  </span>
                </a>

                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full glass border border-glass-border flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/40">{personalInfo.location}</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex gap-3">
                {Object.entries(personalInfo.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass border border-glass-border flex items-center justify-center hover:border-amber-400/30 hover:bg-amber-400/5 transition-all duration-300 group"
                    aria-label={platform}
                  >
                    <span className="text-xs text-white/30 group-hover:text-amber-400 uppercase font-bold">
                      {platform[0]}
                    </span>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3} direction="right">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatedInput
                label="Your Name"
                value={form.name}
                onChange={updateField('name')}
                error={errors.name}
              />
              {errors.name && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400/80 tracking-wider uppercase -mt-6">
                  {errors.name}
                </motion.p>
              )}

              <AnimatedInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={updateField('email')}
                error={errors.email}
              />
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400/80 tracking-wider uppercase -mt-6">
                  {errors.email}
                </motion.p>
              )}

              <AnimatedInput
                label="Subject"
                value={form.subject}
                onChange={updateField('subject')}
                error={errors.subject}
              />
              {errors.subject && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400/80 tracking-wider uppercase -mt-6">
                  {errors.subject}
                </motion.p>
              )}

              <AnimatedInput
                label="Your Message"
                value={form.message}
                onChange={updateField('message')}
                textarea
                error={errors.message}
              />
              {errors.message && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400/80 tracking-wider uppercase -mt-6">
                  {errors.message}
                </motion.p>
              )}

              <div className="relative">
                <MagneticButton
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-dark-950 font-semibold text-sm tracking-wide disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending\u2026' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </MagneticButton>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-16 left-0 right-0 p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm text-center"
                    >
                      Thank you! I'll get back to you within 24 hours.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
