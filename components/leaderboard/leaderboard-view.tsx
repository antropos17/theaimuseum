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

  const sorted = useMemo(
    () => [...models].sort((a, b) => b[sortKey] - a[sortKey]),
    [sortKey]
  )

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Rankings
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Leaderboard
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          All {models.length} models, ranked. Choose your metric.
        </p>

        {/* Sort tabs */}
        <div className="mt-6 flex items-center gap-0 border-b border-border">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors",
                sortKey === opt.key
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-1">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    #
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Model
                  </th>
                  <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:table-cell">
                    Category
                  </th>
                  <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:table-cell">
                    Year
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Score
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((model, i) => {
                  const cat = categories[model.category]
                  const val = model[sortKey]
                  return (
                    <tr
                      key={model.id}
                      className="border-b border-border/50 transition-colors hover:bg-surface-1/50"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold tabular-nums",
                            i === 0 && "text-chart-4",
                            i === 1 && "text-muted-foreground",
                            i === 2 && "text-chart-4/60",
                            i > 2 && "text-muted-foreground/60"
                          )}
                        >
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/model/${model.slug}`}
                          className="group flex items-center gap-2"
                        >
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: model.color }}
                          />
                          <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                            {model.name}
                          </span>
                        </Link>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <span
                          className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                          style={{ borderColor: `${cat.color}30`, color: cat.color }}
                        >
                          {cat.label}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground md:table-cell">
                        {model.year}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold tabular-nums text-foreground">
                        {val}
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${val}%`, backgroundColor: model.color }}
                          />
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
