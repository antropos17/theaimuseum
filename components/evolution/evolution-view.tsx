"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { models, categories } from "@/data/models"
import { cn } from "@/lib/utils"

type Tab = "graph" | "charts"
type ChartCategory = "chatbot" | "image" | "video" | "music" | "code"

const chartCategories: { key: ChartCategory; label: string }[] = [
  { key: "chatbot", label: "[TEXT]" },
  { key: "image", label: "[IMG]" },
  { key: "video", label: "[VID]" },
  { key: "music", label: "[MUS]" },
  { key: "code", label: "[CODE]" },
]

const categoryOrder = ["concept", "chatbot", "code", "game", "image", "video", "music", "science"]

export function EvolutionView() {
  const [tab, setTab] = useState<Tab>("graph")
  const [chartCat, setChartCat] = useState<ChartCategory>("chatbot")
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes = useMemo(() => {
    const sorted = [...models].sort((a, b) => a.year - b.year)
    const years = Array.from(new Set(sorted.map((m) => m.year))).sort()
    const minYear = years[0]
    const maxYear = years[years.length - 1]
    return sorted.map((m, i) => {
      const xPct = maxYear === minYear ? 50 : ((m.year - minYear) / (maxYear - minYear)) * 80 + 10
      const catIdx = Math.max(0, categoryOrder.indexOf(m.category))
      const yPct = ((catIdx + 0.5) / categoryOrder.length) * 80 + 10
      const radius = Math.max(8, Math.min(28, m.capability / 4 + 6))
      const offset = (i % 5) * 1.2 - 2.4
      return { ...m, xPct, yPct: yPct + offset, radius }
    })
  }, [])

  const chartModels = useMemo(
    () => models.filter((m) => m.category === chartCat).sort((a, b) => a.year - b.year),
    [chartCat]
  )

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Visualization</p>
        <h1 className="text-lg text-primary sm:text-xl">EVOLUTION OF AI</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          Trace the lineage and growth of AI models across categories.
        </p>

        {/* Tabs */}
        <div className="mt-6 flex gap-1">
          {(["graph", "charts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pixel-border px-3 py-1.5 text-[7px] transition-colors",
                tab === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "graph" ? "[GRAPH]" : "[CHARTS]"}
            </button>
          ))}
        </div>

        {/* Graph */}
        {tab === "graph" && (
          <div className="relative mt-6 pixel-border bg-card" style={{ aspectRatio: "16/9" }}>
            {/* Legend */}
            <div className="absolute right-2 top-2 z-10 flex flex-wrap gap-1">
              {categoryOrder.map((cat) => {
                const c = categories[cat as keyof typeof categories]
                if (!c) return null
                return (
                  <span key={cat} className="flex items-center gap-1 bg-background/80 px-1.5 py-0.5">
                    <div className="h-[4px] w-[4px]" style={{ backgroundColor: c.color }} />
                    <span className="text-[5px] text-muted-foreground">{c.label}</span>
                  </span>
                )
              })}
            </div>

            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {nodes.map((node) =>
                node.lineage.map((parentId) => {
                  const parent = nodes.find((n) => n.id === parentId)
                  if (!parent) return null
                  return (
                    <line
                      key={`${parentId}-${node.id}`}
                      x1={parent.xPct} y1={parent.yPct}
                      x2={node.xPct} y2={node.yPct}
                      stroke="var(--border)"
                      strokeWidth="0.15"
                      opacity={hoveredNode === node.id || hoveredNode === parentId ? 0.6 : 0.15}
                    />
                  )
                })
              )}
              {nodes.map((node) => {
                const isHovered = hoveredNode === node.id
                const r = node.radius / 8
                return (
                  <Link key={node.id} href={`/model/${node.slug}`}>
                    <g
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      {/* Pixel square instead of circle for 8-bit */}
                      <rect
                        x={node.xPct - r}
                        y={node.yPct - r}
                        width={r * 2}
                        height={r * 2}
                        fill={node.color}
                        opacity={isHovered ? 1 : 0.6}
                      />
                      {isHovered && (
                        <text
                          x={node.xPct}
                          y={node.yPct - r - 1.5}
                          textAnchor="middle"
                          className="fill-foreground"
                          style={{ fontSize: "1.4px", fontFamily: "var(--font-sans)" }}
                        >
                          {node.name}
                        </text>
                      )}
                    </g>
                  </Link>
                )
              })}
            </svg>

            {hoveredNode && (() => {
              const node = nodes.find((n) => n.id === hoveredNode)
              if (!node) return null
              return (
                <div className="pointer-events-none absolute bottom-2 left-2 pixel-border max-w-xs bg-popover p-3">
                  <p className="text-[8px] text-foreground">{node.name}</p>
                  <p className="text-[6px] text-muted-foreground">{node.creator} | {node.year}</p>
                  <div className="mt-1 h-[4px] w-full bg-muted">
                    <div className="h-full" style={{ width: `${node.capability}%`, backgroundColor: node.color }} />
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Charts */}
        {tab === "charts" && (
          <div className="mt-6">
            <div className="mb-4 flex gap-1">
              {chartCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChartCat(c.key)}
                  className={cn(
                    "pixel-border px-2 py-1 text-[7px] transition-colors",
                    chartCat === c.key ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="pixel-border bg-card p-4">
              <div className="relative h-48">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[0, 25, 50, 75, 100].map((v) => (
                    <line key={v} x1="0" y1={100 - v} x2="100" y2={100 - v} stroke="var(--border)" strokeWidth="0.3" />
                  ))}
                  {chartModels.length > 1 && (
                    <polyline
                      fill="none"
                      stroke={categories[chartCat].color}
                      strokeWidth="0.6"
                      points={chartModels.map((m, i) => `${(i / (chartModels.length - 1)) * 100},${100 - m.capability}`).join(" ")}
                    />
                  )}
                  {chartModels.map((m, i) => {
                    const x = chartModels.length === 1 ? 50 : (i / (chartModels.length - 1)) * 100
                    return (
                      <Link key={m.id} href={`/model/${m.slug}`}>
                        <rect x={x - 1} y={100 - m.capability - 1} width="2" height="2" fill={categories[chartCat].color} />
                        <text x={x} y={100 - m.capability - 3} textAnchor="middle" style={{ fontSize: "2.2px", fontFamily: "var(--font-sans)" }} className="fill-foreground">
                          {m.name}
                        </text>
                      </Link>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
