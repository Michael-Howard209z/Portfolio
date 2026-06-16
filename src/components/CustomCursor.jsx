import { useEffect, useRef } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const { pos } = useMousePosition()

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let isHovering = false
    let isClicking = false

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover], input, textarea, select')
      if (target) {
        isHovering = true
        cursor?.classList.add('scale-150', 'opacity-60')
        follower?.classList.add('scale-[3]', 'opacity-20')
      }
    }

    const handleMouseOut = () => {
      isHovering = false
      cursor?.classList.remove('scale-150', 'opacity-60')
      follower?.classList.remove('scale-[3]', 'opacity-20')
    }

    const handleMouseDown = () => {
      isClicking = true
      cursor?.classList.add('scale-75')
    }

    const handleMouseUp = () => {
      isClicking = false
      cursor?.classList.remove('scale-75')
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15

      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
      if (follower) {
        follower.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
      }

      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-amber-400 pointer-events-none z-[9998] transition-[width,height] duration-300 mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-400/40 pointer-events-none z-[9997] transition-[width,height] duration-500 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
