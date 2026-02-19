"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"

const stats = [
  { value: 25, label: "MODELS" },
  { value: 75, label: "YEARS" },
  { value: 8, label: "CATEGORIES" },
  { value: 5, label: "ERAS" },
  { value: 12, label: "EXHIBITS" },
]

function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    let current = 0
    const step = Math.ceil(target / 15)
    const interval = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(current)
      if (current >= target) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [active, target])

  return <>{count}</>
}

export function StatsTicker() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-4 py-12">
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
              <AnimatedCounter target={stat.value} active={isInView} />
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
