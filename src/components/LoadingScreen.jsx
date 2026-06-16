import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let frame
    const startTime = performance.now()
    const duration = 2200

    const animate = (now) => {
      const elapsed = now - startTime
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)

      if (p < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setPhase('reveal')
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(() => onComplete?.(), 200)
        }, 600)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <span className="font-display text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-gradient-duo">NH</span>
              </span>
            </motion.div>

            <div className="w-40 md:w-56 h-[2px] bg-dark-700 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs tracking-[0.3em] text-dark-600 uppercase"
            >
              {phase === 'loading' ? 'Initializing experience\u2026' : 'Crafting interface\u2026'}
            </motion.p>
          </div>

          {phase === 'reveal' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-cyan-400/5 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
