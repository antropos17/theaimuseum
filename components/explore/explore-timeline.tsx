"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
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

/* Era visual progression: raw terminal --> modern glass */
const ERA_STYLE: Record<string, "terminal" | "refined" | "glass"> = {
  Genesis: "terminal",
  "Classic AI": "terminal",
  "The Revolution": "terminal",
  "Pre-LLM": "refined",
  "Dawn of GenAI": "refined",
  "The Explosion": "refined",
  "The Arms Race": "glass",
  "Peak Hype": "glass",
  "The Reckoning": "glass",
}

export function ExploreTimeline() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [search, setSearch] = useState("")
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(t)
  }, [])

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

  /* Group by year, track era changes */
  const grouped = useMemo(() => {
    const map = new Map<number, typeof filteredModels>()
    filteredModels.forEach((m) => {
      const existing = map.get(m.year) || []
      existing.push(m)
      map.set(m.year, existing)
    })
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
  }, [filteredModels])

  /* Track which eras have already been shown to only render era header once */
  const seenEras = useRef(new Set<string>())
  seenEras.current = new Set()

  /* Running card index for alternation */
  let globalIndex = 0

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-10">
        {/* Header */}
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <span className="data-label">[Timeline]</span>
          <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
            Explore the Collection
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            75 years of artificial intelligence, mapped chronologically.
          </p>
        </div>

        {/* Search & Filters */}
        <div className={`mt-6 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="flex items-center gap-2 border border-dashed border-border bg-card px-3 py-2.5 transition-colors focus-within:border-primary">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search models..."
              className="w-full bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
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
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Center dashed spine (hidden on mobile) */}
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 6px, transparent 6px, transparent 12px)",
            }}
          />

          {grouped.map(([year, yearModels]) => {
            const era = yearModels[0].era
            const showEra = !seenEras.current.has(era)
            if (showEra) seenEras.current.add(era)
            const eraStyle = ERA_STYLE[era] || "refined"

            return (
              <div key={year} className="relative mb-16 last:mb-0">
                {/* Era header (shown once per era) */}
                {showEra && (
                  <EraHeader era={era} style={eraStyle} />
                )}

                {/* Year marker -- centered on spine */}
                <YearMarker year={year} count={yearModels.length} />

                {/* Cards alternating left/right */}
                <div className="mt-6 space-y-4 md:space-y-6">
                  {yearModels.map((model) => {
                    const side = globalIndex % 2 === 0 ? "left" : "right"
                    const idx = globalIndex
                    globalIndex++
                    return (
                      <TimelineCard
                        key={model.id}
                        model={model}
                        side={side}
                        eraStyle={eraStyle}
                        index={idx}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}

          {filteredModels.length === 0 && (
            <div className="terminal-card p-10 text-center">
              <p className="font-mono text-sm text-muted-foreground">No models found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Era header -- terminal style
   ───────────────────────────────────────────────────── */
function EraHeader({ era, style }: { era: string; style: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`mb-8 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${vis ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className="h-px flex-1 bg-border" />
      <div className={cn(
        "mx-4 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]",
        style === "terminal" ? "border-dashed border-primary/40 text-primary bg-primary/5" :
        style === "glass" ? "border-primary/20 text-primary bg-primary/5 backdrop-blur-sm" :
        "border-border text-muted-foreground bg-card"
      )}>
        {`> ${era}`}
      </div>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Year marker -- glowing badge centered on spine
   ───────────────────────────────────────────────────── */
function YearMarker({ year, count }: { year: number; count: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el) } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${vis ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
    >
      <div className="relative flex items-center gap-2 border border-primary/30 bg-card px-4 py-1.5 shadow-[0_0_12px_rgba(0,255,136,0.08)]">
        {/* Glowing dot */}
        <div className="h-2 w-2 rounded-full bg-primary pulse-dot" />
        <span className="font-mono text-sm tabular-nums text-primary text-glow-subtle">{year}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{count} {count === 1 ? "model" : "models"}</span>
      </div>
    </div>
  )
}
