"use client"

import Link from "next/link"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"

export function TimelineCard({ model }: { model: AIModel }) {
  const cat = categories[model.category]
  const statusClass =
    model.status === "active"
      ? "status-dot-active"
      : model.status === "declining"
        ? "status-dot-declining"
        : "status-dot-historic"

  return (
    <Link
      href={`/model/${model.slug}`}
      className="glass glass-hover group block rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{ borderLeft: `3px solid ${model.color}` }}
    >
      {/* Row 1: Category + Name + Year + Status */}
      <div className="flex items-center gap-2">
        <span className="text-sm">{cat.icon}</span>
        <span className="font-sans text-base font-bold text-foreground">
          {model.name}
        </span>
        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          {model.year}
        </span>
        <span className={`status-dot ml-auto ${statusClass}`} />
      </div>

      {/* Row 2: Creator + Open/Closed */}
      <div className="mt-1.5 flex items-center gap-2">
        <span className="font-sans text-xs text-muted-foreground">{model.creator}</span>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
            model.open
              ? "bg-[#22c55e]/10 text-[#22c55e]"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {model.open ? "Open" : "Closed"}
        </span>
      </div>

      {/* Row 3: Description */}
      <p className="mt-3 line-clamp-2 font-sans text-[13px] leading-relaxed text-muted-foreground">
        {model.description}
      </p>

      {/* Row 4: Capability bar */}
      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${model.capability}%`,
            backgroundColor: model.color,
          }}
        />
      </div>
    </Link>
  )
}
