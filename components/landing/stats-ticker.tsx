"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const stats = [
  { value: 25, label: "MODELS" },
  { value: 75, label: "YEARS" },
  { value: 8, label: "CATEGORIES" },
  { value: 5, label: "ERAS" },
  { value: 12, label: "EXHIBITS" },
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
    <div ref={containerRef} className="relative z-10 mx-auto max-w-5xl px-4 py-12">
      {/* Pixel divider */}
      <div className="mx-auto mb-10 flex justify-center">
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 bg-primary" />
          <div className="h-1 w-4 bg-primary" />
          <div className="h-1 w-8 bg-border" />
          <div className="h-1 w-4 bg-primary" />
          <div className="h-1 w-1 bg-primary" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <span className="text-[18px] tabular-nums text-primary sm:text-[24px]">
              <AnimatedCounter target={stat.value} active={visible} />
            </span>
            <span className="text-[6px] text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
