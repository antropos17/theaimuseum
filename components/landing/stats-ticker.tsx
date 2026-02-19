"use client"

import { useInView } from "@/hooks/use-in-view"

const stats = [
  { value: "25", label: "Models" },
  { value: "75", label: "Years" },
  { value: "8", label: "Categories" },
  { value: "5", label: "Eras" },
  { value: "12", label: "Exhibits" },
]

export function StatsTicker() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-4 py-12">
      <div
        className={`flex flex-wrap items-center justify-center gap-8 sm:gap-12 transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-baseline gap-2" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="font-mono text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
              {stat.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
