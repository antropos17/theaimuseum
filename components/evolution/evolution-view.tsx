"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { models, categories } from "@/data/models"
import { cn } from "@/lib/utils"

type Tab = "graph" | "charts"
type ChartCategory = "chatbot" | "image" | "video" | "music" | "code"

const chartCategories: { key: ChartCategory; label: string }[] = [
  { key: "chatbot", label: "Text" },
  { key: "image", label: "Image" },
  { key: "video", label: "Video" },
  { key: "music", label: "Music" },
  { key: "code", label: "Code" },
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
      // Deterministic per-index offset to spread overlapping nodes
      const offset = (i % 5) * 1.2 - 2.4
      return { ...m, xPct, yPct: yPct + offset, radius }
    })
  }, [])

  const chartModels = useMemo(
    () => models.filter((m) => m.category === chartCat).sort((a, b) => a.year - b.year),
    [chartCat]
  )

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Visualization
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Evolution of AI
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Trace the lineage of AI models and see how capability has grown across categories.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex items-center gap-0 border-b border-border">
          {(["graph", "charts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors",
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "graph" ? "Neural Graph" : "Line Charts"}
            </button>
          ))}
        </div>

        {/* Graph view */}
        {tab === "graph" && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-card">
            {/* Legend */}
            <div className="absolute right-4 top-4 z-10 flex flex-wrap gap-2">
              {categoryOrder.map((cat) => {
                const c = categories[cat as keyof typeof categories]
                if (!c) return null
                return (
                  <span key={cat} className="flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="font-mono text-[9px] text-muted-foreground">{c.label}</span>
                  </span>
                )
              })}
            </div>

            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Bezier connections */}
              {nodes.map((node) =>
                node.lineage.map((parentId) => {
                  const parent = nodes.find((n) => n.id === parentId)
                  if (!parent) return null
                  const cx1 = (parent.xPct + node.xPct) / 2
                  return (
                    <path
                      key={`${parentId}-${node.id}`}
                      d={`M${parent.xPct},${parent.yPct} C${cx1},${parent.yPct} ${cx1},${node.yPct} ${node.xPct},${node.yPct}`}
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="0.12"
                      opacity={hoveredNode === node.id || hoveredNode === parentId ? 0.6 : 0.2}
                    />
                  )
                })
              )}

              {/* Nodes */}
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
                      {isHovered && (
                        <circle
                          cx={node.xPct}
                          cy={node.yPct}
                          r={r + 1}
                          fill={node.color}
                          opacity={0.15}
                        />
                      )}
                      <circle
                        cx={node.xPct}
                        cy={node.yPct}
                        r={r}
                        fill={node.color}
                        opacity={isHovered ? 1 : 0.65}
                        className="transition-opacity duration-200"
                      />
                      {isHovered && (
                        <text
                          x={node.xPct}
                          y={node.yPct - r - 1.5}
                          textAnchor="middle"
                          className="fill-foreground"
                          style={{ fontSize: "1.6px", fontWeight: 600, fontFamily: "var(--font-sans)" }}
                        >
                          {node.name}
                        </text>
                      )}
                    </g>
                  </Link>
                )
              })}
            </svg>

            {/* Hover tooltip */}
            {hoveredNode && (() => {
              const node = nodes.find((n) => n.id === hoveredNode)
              if (!node) return null
              return (
                <div className="pointer-events-none absolute bottom-4 left-4 max-w-xs rounded-lg border border-border bg-popover p-3 shadow-lg">
                  <p className="text-sm font-semibold text-foreground">{node.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {node.creator} &middot; {node.year}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {node.description}
                  </p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${node.capability}%`, backgroundColor: node.color }}
                    />
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Charts view */}
        {tab === "charts" && (
          <div className="mt-6">
            <div className="mb-6 flex items-center gap-1">
              {chartCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChartCat(c.key)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all",
                    chartCat === c.key
                      ? "border border-primary/30 bg-primary/10 text-primary"
                      : "border border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="relative h-64">
                <div className="absolute left-0 top-0 flex h-full flex-col justify-between">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <span key={v} className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {v}
                    </span>
                  ))}
                </div>

                <div className="ml-8 h-full">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[0, 25, 50, 75, 100].map((v) => (
                      <line
                        key={v}
                        x1="0" y1={100 - v} x2="100" y2={100 - v}
                        stroke="var(--border)"
                        strokeWidth="0.3"
                      />
                    ))}

                    {chartModels.length > 1 && (
                      <polyline
                        fill="none"
                        stroke={categories[chartCat].color}
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={chartModels
                          .map((m, i) => `${(i / (chartModels.length - 1)) * 100},${100 - m.capability}`)
                          .join(" ")}
                      />
                    )}

                    {chartModels.map((m, i) => {
                      const x = chartModels.length === 1 ? 50 : (i / (chartModels.length - 1)) * 100
                      const y = 100 - m.capability
                      return (
                        <Link key={m.id} href={`/model/${m.slug}`}>
                          <circle cx={x} cy={y} r="1.5" fill={categories[chartCat].color} className="cursor-pointer" />
                          <text x={x} y={y - 3} textAnchor="middle" style={{ fontSize: "2.5px", fontFamily: "var(--font-sans)" }} className="fill-foreground">
                            {m.name}
                          </text>
                        </Link>
                      )
                    })}
                  </svg>
                </div>
              </div>

              <div className="ml-8 mt-2 flex justify-between">
                {chartModels.map((m) => (
                  <span key={m.id} className="font-mono text-[9px] tabular-nums text-muted-foreground">
                    {m.year}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
