"use client"

import Link from "next/link"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"

const statusColors: Record<string, string> = {
  active: "#00ff88",
  historic: "#6b6b78",
  declining: "#ffaa00",
}

export function TimelineCard({ model, index = 0 }: { model: AIModel; index?: number }) {
  const cat = categories[model.category]

  return (
    <Link
      href={`/model/${model.slug}`}
      className="terminal-card group block p-4 transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Row 1: Status + Name + Year + Creator */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: statusColors[model.status] || "#6b6b78" }}
            title={model.status}
          />
          <span className="text-sm text-foreground">{model.name}</span>
          <span className="font-mono text-xs tabular-nums text-primary">{model.year}</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">{model.creator}</span>
      </div>

      {/* Row 2: Description */}
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {model.description}
      </p>

      {/* Row 3: Capability bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className="metric-bar flex-1">
          <div
            className="metric-bar-fill"
            style={{ width: `${model.capability}%`, backgroundColor: model.color }}
          />
        </div>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{model.capability}%</span>
      </div>

      {/* Row 4: Tags */}
      <div className="mt-2.5 flex items-center gap-1.5">
        <span
          className="border border-current/20 px-1.5 py-0.5 font-mono text-[10px]"
          style={{ color: cat.color }}
        >
          {cat.icon} {cat.label}
        </span>
        <span
          className={`border px-1.5 py-0.5 font-mono text-[10px] ${
            model.open ? "border-chart-3/20 text-chart-3" : "border-border text-muted-foreground"
          }`}
        >
          {model.open ? "OPEN" : "CLOSED"}
        </span>
      </div>
    </Link>
  )
}
