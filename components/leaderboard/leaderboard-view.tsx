"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { models, categories } from "@/data/models"
import { cn } from "@/lib/utils"

type SortKey = "capability" | "hype" | "safety"

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "capability", label: "Capability" },
  { key: "hype", label: "Hype" },
  { key: "safety", label: "Safety" },
]

export function LeaderboardView() {
  const [sortKey, setSortKey] = useState<SortKey>("capability")

  const sorted = useMemo(() => [...models].sort((a, b) => b[sortKey] - a[sortKey]), [sortKey])

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        <span className="data-label">[Rankings]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">Leaderboard</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          All {models.length} models, ranked by performance metrics.
        </p>

        {/* Sort */}
        <div className="mt-6 flex gap-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={cn(
                "border px-4 py-2 font-mono text-xs transition-all duration-200",
                sortKey === opt.key ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 terminal-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="px-4 py-3 data-label">#</th>
                  <th className="px-4 py-3 data-label">Model</th>
                  <th className="hidden px-4 py-3 data-label sm:table-cell">Category</th>
                  <th className="hidden px-4 py-3 data-label md:table-cell">Year</th>
                  <th className="px-4 py-3 data-label">Score</th>
                  <th className="px-4 py-3 data-label">Bar</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((model, i) => {
                  const cat = categories[model.category]
                  const val = model[sortKey]
                  return (
                    <tr key={model.id} className="border-b border-border/50 transition-colors hover:bg-surface-2">
                      <td className="px-4 py-3">
                        <span className={cn("font-mono text-xs tabular-nums", i === 0 ? "text-chart-4" : i < 3 ? "text-foreground" : "text-muted-foreground")}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/model/${model.slug}`} className="group flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: model.color }} />
                          <span className="text-sm text-foreground transition-colors group-hover:text-primary">{model.name}</span>
                        </Link>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <span className="font-mono text-[11px]" style={{ color: cat.color }}>{cat.label}</span>
                      </td>
                      <td className="hidden px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground md:table-cell">
                        {model.year}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm tabular-nums text-foreground">{val}</td>
                      <td className="px-4 py-3">
                        <div className="metric-bar w-20">
                          <div className="metric-bar-fill" style={{ width: `${val}%`, backgroundColor: model.color }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
