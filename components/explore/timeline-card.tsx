"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"

export function TimelineCard({ model, index = 0 }: { model: AIModel; index?: number }) {
  const cat = categories[model.category]
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link
      ref={cardRef}
      href={`/model/${model.slug}`}
      className="card-hover group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/20"
      style={{
        borderLeftWidth: "3px",
        borderLeftColor: model.color,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionProperty: "opacity, transform, border-color, box-shadow",
        transitionDuration: "0.6s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${cat.color}15` }}
          >
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{model.name}</h3>
            <p className="font-mono text-[11px] text-muted-foreground">
              {model.creator} &middot; {model.year}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${model.open ? "border border-chart-3/20 text-chart-3" : "border border-border text-muted-foreground"}`}>
            {model.open ? "Open" : "Closed"}
          </span>
          <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] capitalize ${model.status === "active" ? "border border-chart-3/20 text-chart-3" : model.status === "declining" ? "border border-chart-5/20 text-chart-5" : "border border-border text-muted-foreground"}`}>
            {model.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{model.description}</p>

      {/* Animated capability bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: visible ? `${model.capability}%` : "0%",
                backgroundColor: model.color,
                transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${index * 80 + 400}ms`,
              }}
            />
          </div>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{model.capability}%</span>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/0 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
