"use client"

import { useRef, useEffect, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
}

export function NeuralCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const dprRef = useRef(1)

  const PARTICLE_COUNT = 90
  const MAX_DISTANCE = 140
  const MOUSE_RADIUS = 180

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.4 + 0.3,
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    dprRef.current = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const dpr = dprRef.current
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)

      if (particlesRef.current.length === 0) {
        initParticles(window.innerWidth, window.innerHeight)
      }
    }

    resize()
    window.addEventListener("resize", resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMouseMove)

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    document.addEventListener("mouseleave", onMouseLeave)

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DISTANCE) {
            const alpha = (1 - dist / MAX_DISTANCE) * 0.12
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Mouse connection lines (brighter, to more particles)
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_RADIUS) {
          const alpha = (1 - mdist / MOUSE_RADIUS) * 0.25
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`
          ctx.lineWidth = 0.3
          ctx.stroke()
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse attraction
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (mdist < MOUSE_RADIUS && mdist > 0) {
          const force = ((MOUSE_RADIUS - mdist) / MOUSE_RADIUS) * 0.015
          p.vx += (mdx / mdist) * force
          p.vy += (mdy / mdist) * force
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Damping
        p.vx *= 0.995
        p.vy *= 0.995

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Draw glow
        const glowSize = p.size * 6
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
        gradient.addColorStop(0, `rgba(0, 255, 136, ${p.baseAlpha * 0.15})`)
        gradient.addColorStop(1, "rgba(0, 255, 136, 0)")
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw particle core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 136, ${p.baseAlpha})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className ?? ""}`}
      style={{ zIndex: 0 }}
    />
  )
}
