"use client"

import { useEffect, useRef, useCallback } from "react"

interface Point {
  x: number
  y: number
  birth: number
}

const MAX_POINTS = 100
const FADE_MS = 500
const RADIUS = 3
const COLOR = "#00ff88"
const INITIAL_OPACITY = 0.6

export function PhosphorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const points = pointsRef.current
    points.push({ x: e.clientX, y: e.clientY, birth: performance.now() })
    if (points.length > MAX_POINTS) points.shift()
  }, [])

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    const draw = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const points = pointsRef.current
      let i = points.length
      while (i--) {
        const age = now - points[i].birth
        if (age > FADE_MS) {
          points.splice(i, 1)
          continue
        }
        const alpha = INITIAL_OPACITY * (1 - age / FADE_MS)
        ctx.globalAlpha = alpha
        ctx.fillStyle = COLOR
        ctx.beginPath()
        ctx.arc(points[i].x, points[i].y, RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  )
}
