"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"

export function TimelineCard({ model }: { model: AIModel }) {
  const cat = categories[model.category]

  return (
    <Link
      href={`/model/${model.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-px hover:border-primary/20 hover:shadow-lg hover:shadow-glow"
      style={{ borderLeftWidth: "3px", borderLeftColor: model.color }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: `${cat.color}15` }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {model.name}
            </h3>
            <p className="font-mono text-[11px] text-muted-foreground">
              {model.creator} &middot; {model.year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
              model.open
                ? "border border-chart-3/20 text-chart-3"
                : "border border-border text-muted-foreground"
            }`}
          >
            {model.open ? "Open" : "Closed"}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[9px] capitalize ${
              model.status === "active"
                ? "border border-chart-3/20 text-chart-3"
                : model.status === "declining"
                  ? "border border-chart-5/20 text-chart-5"
                  : "border border-border text-muted-foreground"
            }`}
          >
            {model.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {model.description}
      </p>

      {/* Bottom row: capability bar + link hint */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${model.capability}%`,
                backgroundColor: model.color,
              }}
            />
          </div>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
            {model.capability}%
          </span>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/0 transition-all group-hover:text-primary" />
      </div>
    </Link>
  )
}
