"use client"

import { useState, useMemo } from "react"
import { models, categories } from "@/data/models"
import { TimelineCard } from "./timeline-card"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

type CategoryKey = keyof typeof categories | "all"

const categoryFilters: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "chatbot", label: "Chat" },
  { key: "image", label: "Image" },
  { key: "video", label: "Video" },
  { key: "music", label: "Music" },
  { key: "code", label: "Code" },
  { key: "game", label: "Game" },
  { key: "concept", label: "Concept" },
  { key: "science", label: "Science" },
]

export function ExploreTimeline() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [search, setSearch] = useState("")

  const filteredModels = useMemo(() => {
    let filtered = activeCategory === "all" ? models : models.filter((m) => m.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (m) => m.name.toLowerCase().includes(q) || m.creator.toLowerCase().includes(q)
      )
    }
    return filtered.sort((a, b) => a.year - b.year)
  }, [activeCategory, search])

  const grouped = useMemo(() => {
    const map = new Map<number, typeof filteredModels>()
    filteredModels.forEach((m) => {
      const existing = map.get(m.year) || []
      existing.push(m)
      map.set(m.year, existing)
    })
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
  }, [filteredModels])

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        {/* Header */}
        <span className="data-label">[Timeline]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          Explore the Collection
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Every AI model from 1950 to 2025, mapped chronologically.
        </p>

        {/* Search */}
        <div className="mt-6 flex items-center gap-2 border border-border bg-card px-3 py-2.5 transition-colors focus-within:border-primary">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models..."
            className="w-full bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Category filters */}
        <div className="mt-4 flex flex-wrap gap-1">
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "border px-3 py-1.5 font-mono text-[11px] transition-all duration-200",
                activeCategory === cat.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* Timeline spine */}
          <div className="absolute left-[7px] top-0 hidden h-full w-px bg-border md:block" />

          {grouped.map(([year, yearModels]) => (
            <div key={year} id={`year-${year}`} className="relative mb-10 last:mb-0">
              {/* Year marker */}
              <div className="relative mb-4 flex items-center gap-3 md:pl-8">
                <div className="absolute left-0 top-1/2 hidden h-[7px] w-[7px] -translate-y-1/2 rounded-full border border-primary bg-primary/20 md:block" />
                <h2 className="font-mono text-lg font-light tabular-nums text-primary text-glow-subtle">
                  {year}
                </h2>
                <span className="border border-border bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {yearModels[0].era}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 md:pl-8">
                {yearModels.map((model, idx) => (
                  <TimelineCard key={model.id} model={model} index={idx} />
                ))}
              </div>
            </div>
          ))}

          {filteredModels.length === 0 && (
            <div className="terminal-card p-10 text-center">
              <p className="font-mono text-sm text-muted-foreground">No models found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
