"use client"

import { useState, useMemo } from "react"
import { models, categories } from "@/data/models"
import { TimelineCard } from "./timeline-card"
import { cn } from "@/lib/utils"

type CategoryKey = keyof typeof categories | "all"

const categoryFilters: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "[ALL]" },
  { key: "chatbot", label: "[CHAT]" },
  { key: "image", label: "[IMG]" },
  { key: "video", label: "[VID]" },
  { key: "music", label: "[MUS]" },
  { key: "code", label: "[CODE]" },
  { key: "game", label: "[GAME]" },
  { key: "concept", label: "[IDEA]" },
  { key: "science", label: "[SCI]" },
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
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
          {'>'} Timeline
        </p>
        <h1 className="text-lg text-primary sm:text-xl">EXPLORE THE COLLECTION</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          Every AI model from 1950 to 2025.
        </p>

        {/* Search */}
        <div className="mt-6 pixel-border bg-card p-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="> SEARCH MODELS..."
            className="w-full bg-transparent text-[8px] text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Category pills */}
        <div className="mt-4 flex flex-wrap gap-1">
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "pixel-border px-2 py-1 text-[7px] transition-colors",
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mt-8">
          {/* Pixel spine */}
          <div className="absolute left-1 top-0 hidden h-full w-[2px] bg-border md:block" />

          {grouped.map(([year, yearModels]) => (
            <div key={year} id={`year-${year}`} className="relative mb-8 last:mb-0">
              {/* Year */}
              <div className="relative mb-4 flex items-center gap-3 md:pl-8">
                <div className="absolute left-0 top-1/2 hidden h-[6px] w-[6px] -translate-y-1/2 bg-primary md:block" />
                <h2 className="text-sm text-primary">{year}</h2>
                <span className="pixel-border bg-card px-2 py-0.5 text-[7px] text-muted-foreground">
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
            <div className="pixel-border bg-card p-8 text-center">
              <p className="text-[8px] text-muted-foreground">NO MODELS FOUND. TRY DIFFERENT SEARCH.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
