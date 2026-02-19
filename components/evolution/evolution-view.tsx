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
    return sorted.map((m) => {
      const xPct = maxYear === minYear ? 50 : ((m.year - minYear) / (maxYear - minYear)) * 80 + 10
      const catIdx = Math.max(0, categoryOrder.indexOf(m.category))
      const yPct = ((catIdx + 0.5) / categoryOrder.length) * 80 + 10
      const radius = Math.max(8, Math.min(28, m.capability / 4 + 6))
      // Deterministic spread based on capability value (stable across server/client)
      const spread = ((m.capability % 7) - 3) * 0.8
      return { ...m, xPct, yPct: yPct + spread, radius }
    })
  }, [])

  const chartModels = useMemo(
    () => models.filter((m) => m.category === chartCat).sort((a, b) => a.year - b.year),
    [chartCat]
  )

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-10">
        <span className="data-label">[Visualization]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">Evolution of AI</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Trace the lineage and growth of AI models across categories.
        </p>

        {/* Tabs */}
        <div className="mt-6 flex gap-1">
          {(["graph", "charts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "border px-4 py-2 font-mono text-xs transition-all duration-200",
                tab === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "graph" ? "Graph" : "Charts"}
            </button>
          ))}
        </div>

        {/* Graph */}
        {tab === "graph" && (
          <div className="relative mt-6 terminal-card-solid overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {/* Legend */}
            <div className="absolute right-3 top-3 z-10 flex flex-wrap gap-1.5">
              {categoryOrder.map((cat) => {
                const c = categories[cat as keyof typeof categories]
                if (!c) return null
                return (
                  <span key={cat} className="flex items-center gap-1.5 bg-background/80 px-2 py-0.5 backdrop-blur-sm">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="font-mono text-[9px] text-muted-foreground">{c.label}</span>
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
                      strokeWidth="0.12"
                      opacity={hoveredNode === node.id || hoveredNode === parentId ? 0.5 : 0.12}
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
                      <circle
                        cx={node.xPct}
                        cy={node.yPct}
                        r={r}
                        fill={node.color}
                        opacity={isHovered ? 1 : 0.5}
                        className="transition-opacity duration-200"
                      />
                      {isHovered && (
                        <>
                          <circle
                            cx={node.xPct}
                            cy={node.yPct}
                            r={r + 0.5}
                            fill="none"
                            stroke={node.color}
                            strokeWidth="0.15"
                            opacity={0.4}
                          />
                          <text
                            x={node.xPct}
                            y={node.yPct - r - 1.5}
                            textAnchor="middle"
                            className="fill-foreground"
                            style={{ fontSize: "1.4px", fontFamily: "var(--font-mono)" }}
                          >
                            {node.name}
                          </text>
                        </>
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
                <div className="pointer-events-none absolute bottom-3 left-3 max-w-xs border border-border bg-popover p-3 backdrop-blur-sm">
                  <p className="text-sm text-foreground">{node.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{node.creator} | {node.year}</p>
                  <div className="mt-1.5 metric-bar">
                    <div className="metric-bar-fill" style={{ width: `${node.capability}%`, backgroundColor: node.color }} />
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
                    "border px-3 py-1.5 font-mono text-xs transition-all duration-200",
                    chartCat === c.key ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="terminal-card-solid p-4">
              <div className="relative h-48">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[0, 25, 50, 75, 100].map((v) => (
                    <line key={v} x1="0" y1={100 - v} x2="100" y2={100 - v} stroke="var(--border)" strokeWidth="0.3" strokeDasharray="1 1" />
                  ))}
                  {chartModels.length > 1 && (
                    <polyline
                      fill="none"
                      stroke={categories[chartCat].color}
                      strokeWidth="0.5"
                      points={chartModels.map((m, i) => `${(i / (chartModels.length - 1)) * 100},${100 - m.capability}`).join(" ")}
                    />
                  )}
                  {chartModels.map((m, i) => {
                    const x = chartModels.length === 1 ? 50 : (i / (chartModels.length - 1)) * 100
                    return (
                      <Link key={m.id} href={`/model/${m.slug}`}>
                        <circle cx={x} cy={100 - m.capability} r="1" fill={categories[chartCat].color} />
                        <text x={x} y={100 - m.capability - 3} textAnchor="middle" style={{ fontSize: "2.2px", fontFamily: "var(--font-mono)" }} className="fill-foreground">
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
