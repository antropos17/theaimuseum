"use client"

import { useState, useMemo } from "react"
import { models, categories } from "@/data/models"
import { TimelineCard } from "./timeline-card"
import { cn } from "@/lib/utils"

type CategoryKey = keyof typeof categories | "all"

const yearJumps = [1950, 1966, 1997, 2017, 2019, 2021, 2022, 2023, 2024, 2025]

const categoryFilters: { key: CategoryKey; label: string; icon?: string }[] = [
  { key: "all", label: "All" },
  { key: "chatbot", label: "Chatbots", icon: "\uD83D\uDCAC" },
  { key: "image", label: "Image", icon: "\uD83C\uDFA8" },
  { key: "video", label: "Video", icon: "\uD83C\uDFAC" },
  { key: "music", label: "Music", icon: "\uD83C\uDFB5" },
  { key: "code", label: "Code", icon: "\uD83D\uDCBB" },
  { key: "game", label: "Games", icon: "\uD83C\uDFAE" },
  { key: "concept", label: "Concepts", icon: "\uD83D\uDCA1" },
  { key: "science", label: "Science", icon: "\uD83D\uDD2C" },
]

export function ExploreTimeline() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")

  const filteredModels = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? models
        : models.filter((m) => m.category === activeCategory)
    return filtered.sort((a, b) => a.year - b.year)
  }, [activeCategory])

  const scrollToYear = (year: number) => {
    const el = document.getElementById(`year-${year}`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  // Group by era/year for the spine
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
    <div className="min-h-screen pt-14">
      {/* Filter bar */}
      <div className="sticky top-14 z-40 glass border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-3">
          {/* Category pills */}
          <div className="scrollbar-none flex items-center gap-2 overflow-x-auto">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 font-sans text-xs font-medium transition-all",
                  activeCategory === cat.key
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                )}
              >
                {cat.icon && <span>{cat.icon}</span>}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Year jumps */}
          <div className="scrollbar-none mt-2 flex items-center gap-1 overflow-x-auto">
            {yearJumps.map((year) => (
              <button
                key={year}
                onClick={() => scrollToYear(year)}
                className="shrink-0 rounded px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Vertical spine */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 md:block"
          style={{
            background: "linear-gradient(to bottom, #a855f7, #22d3ee, #a855f7)",
            boxShadow: "0 0 8px rgba(168, 85, 247, 0.2)",
          }}
          aria-hidden="true"
        />

        {grouped.map(([year, yearModels]) => {
          const era = yearModels[0].era
          return (
            <div key={year} id={`year-${year}`} className="relative mb-16">
              {/* Year marker */}
              <div className="relative mb-8 flex flex-col items-center">
                <div
                  className="relative z-10 hidden h-4 w-4 rounded-full md:block"
                  style={{
                    background: "#a855f7",
                    boxShadow: "0 0 12px rgba(168, 85, 247, 0.5)",
                  }}
                  aria-hidden="true"
                />
                <span className="mt-2 font-serif text-3xl font-bold text-foreground">
                  {year}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">
                  {era}
                </span>
              </div>

              {/* Model cards */}
              <div className="flex flex-col gap-6">
                {yearModels.map((model, i) => (
                  <div
                    key={model.id}
                    className={cn(
                      "md:w-[calc(50%-2rem)]",
                      i % 2 === 0 ? "md:self-start md:mr-auto" : "md:self-end md:ml-auto"
                    )}
                  >
                    <TimelineCard model={model} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {filteredModels.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-sans text-muted-foreground">No models found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
