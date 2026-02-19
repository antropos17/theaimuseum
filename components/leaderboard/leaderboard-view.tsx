"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { models, categories } from "@/data/models"
import { cn } from "@/lib/utils"

type SortKey = "capability" | "hype" | "safety"

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "capability", label: "[CAP]" },
  { key: "hype", label: "[HYPE]" },
  { key: "safety", label: "[SAFE]" },
]

export function LeaderboardView() {
  const [sortKey, setSortKey] = useState<SortKey>("capability")

  const sorted = useMemo(() => [...models].sort((a, b) => b[sortKey] - a[sortKey]), [sortKey])

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Rankings</p>
        <h1 className="text-lg text-primary sm:text-xl">LEADERBOARD</h1>
        <p className="mt-2 text-[8px] text-muted-foreground">
          All {models.length} models, ranked.
        </p>

        {/* Sort */}
        <div className="mt-6 flex gap-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={cn(
                "pixel-border px-3 py-1 text-[7px] transition-colors",
                sortKey === opt.key ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 pixel-border overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-border bg-background">
                  <th className="px-3 py-2 text-[6px] text-muted-foreground">#</th>
                  <th className="px-3 py-2 text-[6px] text-muted-foreground">MODEL</th>
                  <th className="hidden px-3 py-2 text-[6px] text-muted-foreground sm:table-cell">CAT</th>
                  <th className="hidden px-3 py-2 text-[6px] text-muted-foreground md:table-cell">YEAR</th>
                  <th className="px-3 py-2 text-[6px] text-muted-foreground">SCORE</th>
                  <th className="px-3 py-2 text-[6px] text-muted-foreground">BAR</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((model, i) => {
                  const cat = categories[model.category]
                  const val = model[sortKey]
                  return (
                    <tr key={model.id} className="border-b border-border/50 transition-colors hover:bg-background/50">
                      <td className="px-3 py-2">
                        <span className={cn("text-[7px] tabular-nums", i === 0 && "text-chart-4", i > 0 && "text-muted-foreground")}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <Link href={`/model/${model.slug}`} className="group flex items-center gap-1.5">
                          <div className="h-[5px] w-[5px]" style={{ backgroundColor: model.color }} />
                          <span className="text-[7px] text-foreground group-hover:text-primary">{model.name}</span>
                        </Link>
                      </td>
                      <td className="hidden px-3 py-2 sm:table-cell">
                        <span className="text-[6px]" style={{ color: cat.color }}>{cat.label}</span>
                      </td>
                      <td className="hidden px-3 py-2 text-[7px] tabular-nums text-muted-foreground md:table-cell">
                        {model.year}
                      </td>
                      <td className="px-3 py-2 text-[8px] tabular-nums text-foreground">{val}</td>
                      <td className="px-3 py-2">
                        <div className="h-[4px] w-16 bg-muted">
                          <div className="h-full" style={{ width: `${val}%`, backgroundColor: model.color }} />
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
