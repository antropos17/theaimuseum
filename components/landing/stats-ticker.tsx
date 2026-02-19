"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"

const stats = [
  { value: 25, label: "Models", suffix: "" },
  { value: 75, label: "Years", suffix: "" },
  { value: 8, label: "Categories", suffix: "" },
  { value: 5, label: "Eras", suffix: "" },
  { value: 12, label: "Exhibits", suffix: "" },
]

function AnimatedCounter({ target, duration = 1200, active }: { target: number; duration?: number; active: boolean }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true

    const startTime = performance.now()
    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return <>{count}</>
}

export function StatsTicker() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-4 py-12">
      {/* Separator line that grows */}
      <div className="mx-auto mb-10 flex justify-center">
        <div className={`h-px w-24 bg-border line-grow ${isInView ? "visible" : ""}`} />
      </div>

      <div className={`flex flex-wrap items-center justify-center gap-10 sm:gap-16 stagger ${isInView ? "visible" : ""}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="font-mono text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
              <AnimatedCounter target={stat.value} active={isInView} />
              {stat.suffix}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
