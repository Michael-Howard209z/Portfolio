import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    let ticking = false
    const handleResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSize({ width: window.innerWidth, height: window.innerHeight })
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
