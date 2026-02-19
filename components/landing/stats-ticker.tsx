"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const stats = [
  { value: 25, label: "Models" },
  { value: 75, label: "Years" },
  { value: 8, label: "Categories" },
  { value: 5, label: "Eras" },
]

const DURATION = 1500

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

export function StatsTicker() {
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
      {/* Divider */}
      <div className="mx-auto mb-12 flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-24 bg-border" />
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">[ARCHIVE]</span>
        <div className="h-px flex-1 max-w-24 bg-border" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-3xl font-light tabular-nums text-primary text-glow-subtle sm:text-4xl">
              <AnimatedCounter target={stat.value} active={visible} />
            </span>
            <span className="data-label">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
