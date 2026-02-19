"use client"

import Link from "next/link"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"

export function TimelineCard({ model, index = 0 }: { model: AIModel; index?: number }) {
  const cat = categories[model.category]

  return (
    <Link
      href={`/model/${model.slug}`}
      className="pixel-border group block bg-card p-4 transition-colors hover:border-primary"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2" style={{ backgroundColor: model.color }} />
          <span className="text-[9px] text-foreground">{model.name}</span>
        </div>
        <span className="text-[7px] text-muted-foreground">{model.creator}</span>
      </div>

      <p className="mt-2 line-clamp-2 text-[7px] leading-relaxed text-muted-foreground">
        {model.description}
      </p>

      {/* Pixel capability bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-[4px] flex-1 bg-muted">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${model.capability}%`, backgroundColor: model.color }}
          />
        </div>
        <span className="text-[7px] tabular-nums text-muted-foreground">{model.capability}%</span>
      </div>

      {/* Tags */}
      <div className="mt-2 flex items-center gap-1">
        <span
          className="pixel-border px-1.5 py-0.5 text-[6px]"
          style={{ color: cat.color, borderColor: `${cat.color}40` }}
        >
          {cat.label}
        </span>
        <span className={`pixel-border px-1.5 py-0.5 text-[6px] ${model.open ? "text-chart-3" : "text-muted-foreground"}`}>
          {model.open ? "OPEN" : "CLOSED"}
        </span>
      </div>
    </Link>
  )
}
