"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { models, categories } from "@/data/models"
import { TimelineCard } from "./timeline-card"
import { cn } from "@/lib/utils"

type CategoryKey = keyof typeof categories | "all"

const categoryFilters: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "chatbot", label: "Chatbots" },
  { key: "image", label: "Image" },
  { key: "video", label: "Video" },
  { key: "music", label: "Music" },
  { key: "code", label: "Code" },
  { key: "game", label: "Games" },
  { key: "concept", label: "Concepts" },
  { key: "science", label: "Science" },
]

export function ExploreTimeline() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [search, setSearch] = useState("")

  const filteredModels = useMemo(() => {
    let filtered = activeCategory === "all"
      ? models
      : models.filter((m) => m.category === activeCategory)

    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.creator.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
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

  const years = grouped.map(([y]) => y)

  const scrollToYear = (year: number) => {
    const el = document.getElementById(`year-${year}`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen pt-12">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-6 lg:px-6">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Timeline
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Explore the Collection
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Every AI model that shaped history, from Turing{"'"}s 1950 paper to the latest frontier models.
        </p>
      </div>

      {/* Filter bar */}
      <div className="sticky top-12 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-3 lg:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search + category row */}
            <div className="flex items-center gap-3 overflow-x-auto">
              {/* Search input */}
              <div className="relative shrink-0">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="h-8 w-40 rounded-lg border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                      activeCategory === cat.key
                        ? "border border-primary/30 bg-primary/10 text-primary"
                        : "border border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year jump chips */}
            <div className="hidden items-center gap-1 sm:flex">
              {years.slice(0, 6).map((year) => (
                <button
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className="rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {year}
                </button>
              ))}
              {years.length > 6 && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  +{years.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline content */}
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
        <div className="relative">
          {/* Thin left spine */}
          <div
            className="absolute left-3 top-0 hidden h-full w-px bg-border md:block"
            aria-hidden="true"
          />

          {grouped.map(([year, yearModels]) => {
            const era = yearModels[0].era
            return (
              <div key={year} id={`year-${year}`} className="relative mb-12 last:mb-0">
                {/* Year heading */}
                <div className="relative mb-6 flex items-center gap-4 md:pl-10">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[9px] hidden h-2 w-2 rounded-full bg-primary md:block"
                    aria-hidden="true"
                  />
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    {year}
                  </h2>
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {era}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 md:pl-10">
                  {yearModels.map((model) => (
                    <TimelineCard key={model.id} model={model} />
                  ))}
                </div>
              </div>
            )
          })}

          {filteredModels.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-sm text-muted-foreground">
                No models found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
