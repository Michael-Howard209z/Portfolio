import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function MorphingShape({ mouse }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)

  const positions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2)
    const pos = geo.attributes.position.array.slice()
    geo.dispose()
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.08
    meshRef.current.rotation.y = t * 0.12

    const positions = meshRef.current.geometry.attributes.position
    const array = positions.array
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i], y = array[i + 1], z = array[i + 2]
      const len = Math.sqrt(x * x + y * y + z * z)
      const noise = Math.sin(t * 0.5 + x * 2) * 0.15 + Math.cos(t * 0.3 + y * 2) * 0.1
      const scale = 1 + noise
      array[i] = (x / len) * scale
      array[i + 1] = (y / len) * scale
      array[i + 2] = (z / len) * scale
    }
    positions.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 2]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#f59e0b"
        emissive="#f59e0b"
        emissiveIntensity={0.15}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  )
}

function FloatingOrbs({ count = 30 }) {
  const meshRef = useRef(null)
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 4
      temp.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        speed: 0.1 + Math.random() * 0.2,
        offset: Math.random() * Math.PI * 2,
        size: 0.02 + Math.random() * 0.04,
      })
    }
    return temp
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const positions = meshRef.current.geometry.attributes.position
    const array = positions.array
    particles.forEach((p, i) => {
      const idx = i * 3
      const angle = t * p.speed + p.offset
      const r = 3 + Math.sin(angle * 0.5) * 2
      array[idx] = p.pos[0] + Math.sin(angle) * 0.5
      array[idx + 1] = p.pos[1] + Math.cos(angle * 0.7) * 0.5
      array[idx + 2] = p.pos[2] + Math.sin(angle * 0.3) * 0.5
    })
    positions.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap((p) => p.pos))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ThreeBackground() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f59e0b" />
        <directionalLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <MorphingShape mouse={mouse} />
        </Float>
        <FloatingOrbs count={40} />
      </Canvas>
    </div>
  )
}
