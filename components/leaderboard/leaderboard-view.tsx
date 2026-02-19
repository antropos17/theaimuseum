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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Leaderboard
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          All 25 models, ranked. Choose your metric.
        </p>

        {/* Sort tabs */}
        <div className="mt-6 flex items-center gap-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={cn(
                "rounded-lg px-4 py-2 font-sans text-xs font-medium transition-all",
                sortKey === opt.key
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-6 glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    #
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Model
                  </th>
                  <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground sm:table-cell">
                    Category
                  </th>
                  <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground md:table-cell">
                    Year
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {sortKey}
                  </th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Bar
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
                      className="border-b border-border/50 transition-colors hover:bg-primary/3"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "font-mono text-xs font-bold",
                            i === 0 && "text-[var(--museum-warning)]",
                            i === 1 && "text-muted-foreground",
                            i === 2 && "text-[#CD7F32]",
                            i > 2 && "text-muted-foreground"
                          )}
                        >
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/model/${model.slug}`} className="group flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: model.color }}
                          />
                          <span className="font-sans text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {model.name}
                          </span>
                        </Link>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <span className="rounded-md bg-primary/6 px-2 py-0.5 font-mono text-[10px]" style={{ color: cat.color }}>
                          {cat.label}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground md:table-cell">
                        {model.year}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-foreground">
                        {val}
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${val}%`,
                              backgroundColor: model.color,
                            }}
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
