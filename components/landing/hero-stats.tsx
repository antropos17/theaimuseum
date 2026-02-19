"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const stats = [
  { value: 25, label: "MODELS" },
  { value: 75, label: "YEARS" },
  { value: 8, label: "CATEGORIES" },
]

const DURATION = 2000

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  const animate = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = easeOutCubic(progress)
      setDisplay(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [target])

  useEffect(() => {
    if (active) animate()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, animate])

  return <>{display}</>
}

export function HeroStats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative z-10 mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20">
        {stats.map((stat) => (
          <div key={stat.label} className="terminal-card flex flex-col items-center gap-3 px-8 py-6">
            <span className="font-mono text-sm text-primary bracket-label">
              [{stat.label}]
            </span>
            <span className="font-mono text-4xl font-light tabular-nums text-foreground text-glow-subtle sm:text-5xl">
              <AnimatedCounter target={stat.value} active={visible} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
