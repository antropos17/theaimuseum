"use client"

import Link from "next/link"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"

const statusColors: Record<string, string> = {
  active: "#22c55e",
  historic: "#a1a1aa",
  declining: "#f59e0b",
}

export function TimelineCard({ model, index = 0 }: { model: AIModel; index?: number }) {
  const cat = categories[model.category]

  return (
    <Link
      href={`/model/${model.slug}`}
      className="pixel-border group block bg-card p-4 transition-colors hover:border-primary"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Row 1: Status dot + Name + Year + Creator */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Status dot */}
          <div
            className="h-[6px] w-[6px] shrink-0"
            style={{ backgroundColor: statusColors[model.status] || "#a1a1aa" }}
            title={model.status}
          />
          {/* Name */}
          <span className="text-[9px] text-foreground">{model.name}</span>
          {/* Year */}
          <span className="text-[7px] tabular-nums text-primary">{model.year}</span>
        </div>
        {/* Creator */}
        <span className="text-[7px] text-muted-foreground">{model.creator}</span>
      </div>

      {/* Row 2: Description (2-line clamp) */}
      <p className="mt-2 line-clamp-2 text-[7px] leading-relaxed text-muted-foreground">
        {model.description}
      </p>

      {/* Row 3: Capability bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-[4px] flex-1 bg-muted">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${model.capability}%`, backgroundColor: model.color }}
          />
        </div>
        <span className="text-[7px] tabular-nums text-muted-foreground">{model.capability}%</span>
      </div>

      {/* Row 4: Category icon tag + Open/Closed tag */}
      <div className="mt-2 flex items-center gap-1">
        <span
          className="pixel-border px-1.5 py-0.5 text-[6px]"
          style={{ color: cat.color, borderColor: `${cat.color}40` }}
        >
          {cat.icon} {cat.label}
        </span>
        <span
          className={`pixel-border px-1.5 py-0.5 text-[6px] ${
            model.open ? "text-chart-3" : "text-muted-foreground"
          }`}
        >
          {model.open ? "OPEN" : "CLOSED"}
        </span>
      </div>
    </Link>
  )
}
