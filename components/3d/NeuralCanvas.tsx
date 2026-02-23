"use client"

import { useRef, useEffect, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  originX: number
  originY: number
  gridX: number
  gridY: number
  size: number
  baseAlpha: number
}

export function NeuralCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number>(0)
  const dprRef = useRef(1)

  const PARTICLE_COUNT = 90
  const MAX_DISTANCE = 140
  const MOUSE_RADIUS = 180
  const SCROLL_THRESHOLD = 500 // Max scroll for fully formed grid

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []

    // Calculate grid dimensions
    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)))
    const rows = Math.ceil(PARTICLE_COUNT / cols)
    const paddingX = width * 0.1
    const paddingY = height * 0.1
    const stepX = (width - paddingX * 2) / Math.max(1, cols - 1)
    const stepY = (height - paddingY * 2) / Math.max(1, rows - 1)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = i % cols
      const r = Math.floor(i / cols)

      const gridX = paddingX + c * stepX
      const gridY = paddingY + r * stepY

      const x = Math.random() * width
      const y = Math.random() * height

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        gridX,
        gridY,
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

      initParticles(window.innerWidth, window.innerHeight)
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

    const onScroll = (e: Event) => {
      const customEvent = e as CustomEvent<number>
      scrollRef.current = customEvent.detail
    }
    window.addEventListener("museum-scroll", onScroll)

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const scrollProgress = Math.min(Math.max(scrollRef.current / SCROLL_THRESHOLD, 0), 1)

      // Smooth grid formation interpolation
      const easeProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress) // Smoothstep

      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DISTANCE) {
            // Connections fade out as grid forms
            const baseAlpha = (1 - dist / MAX_DISTANCE) * 0.12
            const alpha = baseAlpha * (1 - easeProgress * 0.8)

            if (alpha > 0.01) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }

        // Mouse connection lines (brighter, to more particles)
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_RADIUS) {
          const alpha = (1 - mdist / MOUSE_RADIUS) * 0.25 * (1 - easeProgress * 0.5)
          if (alpha > 0.01) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`
            ctx.lineWidth = 0.3
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse attraction (weaker as grid forms)
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (mdist < MOUSE_RADIUS && mdist > 0) {
          const force = ((MOUSE_RADIUS - mdist) / MOUSE_RADIUS) * 0.015 * (1 - easeProgress)
          p.vx += (mdx / mdist) * force
          p.vy += (mdy / mdist) * force
        }

        // Calculate target based on grid progress
        const targetX = p.originX * (1 - easeProgress) + p.gridX * easeProgress
        const targetY = p.originY * (1 - easeProgress) + p.gridY * easeProgress

        // Stronger snap to grid based on how close to fully formed it is
        if (easeProgress > 0) {
          p.x += (targetX - p.x) * (0.02 + easeProgress * 0.08)
          p.y += (targetY - p.y) * (0.02 + easeProgress * 0.08)
        } else {
          // Normal drifting if perfectly at 0
          p.x += p.vx
          p.y += p.vy
          p.originX += p.vx
          p.originY += p.vy

          // Re-wrap origins on edge cross
          if (p.originX < -10) { p.originX = w + 10; p.x = p.originX; }
          if (p.originX > w + 10) { p.originX = -10; p.x = p.originX; }
          if (p.originY < -10) { p.originY = h + 10; p.y = p.originY; }
          if (p.originY > h + 10) { p.originY = -10; p.y = p.originY; }
        }

        // Damping
        p.vx *= 0.995 * (1 - easeProgress * 0.5)
        p.vy *= 0.995 * (1 - easeProgress * 0.5)

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
      window.removeEventListener("museum-scroll", onScroll)
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
