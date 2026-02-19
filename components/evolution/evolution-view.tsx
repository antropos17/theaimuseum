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

export function EvolutionView() {
  const [tab, setTab] = useState<Tab>("graph")
  const [chartCat, setChartCat] = useState<ChartCategory>("chatbot")
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Neural graph positions (spread by year left-to-right, cluster by category vertically)
  const categoryOrder = ["concept", "chatbot", "code", "game", "image", "video", "music", "science"]
  const nodes = useMemo(() => {
    const sorted = [...models].sort((a, b) => a.year - b.year)
    const years = Array.from(new Set(sorted.map((m) => m.year))).sort()
    const minYear = years[0]
    const maxYear = years[years.length - 1]

    return sorted.map((m) => {
      const xPct = maxYear === minYear ? 50 : ((m.year - minYear) / (maxYear - minYear)) * 80 + 10
      const catIdx = categoryOrder.indexOf(m.category)
      const yPct = ((catIdx + 0.5) / categoryOrder.length) * 80 + 10
      const radius = Math.max(8, Math.min(28, m.capability / 4 + 6))
      return { ...m, xPct, yPct: yPct + (Math.random() * 6 - 3), radius }
    })
  }, [])

  // Chart data
  const chartModels = useMemo(
    () =>
      models
        .filter((m) => m.category === chartCat)
        .sort((a, b) => a.year - b.year),
    [chartCat]
  )

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Evolution of AI
        </h1>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-2">
          {(["graph", "charts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-lg px-4 py-2 font-sans text-sm font-medium transition-all",
                tab === t
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "graph" ? "Neural Graph" : "Line Charts"}
            </button>
          ))}
        </div>

        {/* Graph view */}
        {tab === "graph" && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl glass">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Connections */}
              {nodes.map((node) =>
                node.lineage.map((parentId) => {
                  const parent = nodes.find((n) => n.id === parentId)
                  if (!parent) return null
                  return (
                    <line
                      key={`${parentId}-${node.id}`}
                      x1={parent.xPct}
                      y1={parent.yPct}
                      x2={node.xPct}
                      y2={node.yPct}
                      stroke="rgba(168,85,247,0.15)"
                      strokeWidth="0.15"
                    />
                  )
                })
              )}

              {/* Nodes */}
              {nodes.map((node) => {
                const isHovered = hoveredNode === node.id
                return (
                  <Link key={node.id} href={`/model/${node.slug}`}>
                    <g
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      {/* Glow */}
                      <circle
                        cx={node.xPct}
                        cy={node.yPct}
                        r={node.radius / 6 + (isHovered ? 1.5 : 0)}
                        fill={node.color}
                        opacity={isHovered ? 0.3 : 0.1}
                      />
                      {/* Node */}
                      <circle
                        cx={node.xPct}
                        cy={node.yPct}
                        r={node.radius / 8}
                        fill={node.color}
                        opacity={isHovered ? 1 : 0.7}
                        className="transition-all duration-200"
                      />
                      {/* Label on hover */}
                      {isHovered && (
                        <text
                          x={node.xPct}
                          y={node.yPct - node.radius / 6 - 1.5}
                          textAnchor="middle"
                          className="fill-foreground font-sans"
                          fontSize="1.8"
                          fontWeight="600"
                        >
                          {node.name} ({node.year})
                        </text>
                      )}
                    </g>
                  </Link>
                )
              })}
            </svg>

            {/* Tooltip */}
            {hoveredNode && (() => {
              const node = nodes.find((n) => n.id === hoveredNode)
              if (!node) return null
              return (
                <div className="pointer-events-none absolute bottom-4 left-4 glass rounded-lg p-3 max-w-xs">
                  <p className="font-sans text-sm font-bold text-foreground">{node.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {node.creator} &middot; {node.year}
                  </p>
                  <p className="mt-1 line-clamp-2 font-sans text-xs text-muted-foreground">
                    {node.description}
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
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
            {/* Sub-tabs */}
            <div className="flex items-center gap-2 mb-6">
              {chartCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChartCat(c.key)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 font-sans text-xs font-medium transition-all",
                    chartCat === c.key
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="glass rounded-xl p-6">
              <div className="relative h-64">
                {/* Y axis */}
                <div className="absolute left-0 top-0 flex h-full flex-col justify-between">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <span key={v} className="font-mono text-[10px] text-muted-foreground">
                      {v}
                    </span>
                  ))}
                </div>

                {/* Chart area */}
                <div className="ml-8 h-full">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((v) => (
                      <line
                        key={v}
                        x1="0"
                        y1={100 - v}
                        x2="100"
                        y2={100 - v}
                        stroke="currentColor"
                        strokeOpacity="0.05"
                        strokeWidth="0.3"
                      />
                    ))}

                    {/* Line */}
                    {chartModels.length > 1 && (
                      <polyline
                        fill="none"
                        stroke={categories[chartCat].color}
                        strokeWidth="0.8"
                        points={chartModels
                          .map((m, i) => {
                            const x = (i / (chartModels.length - 1)) * 100
                            const y = 100 - m.capability
                            return `${x},${y}`
                          })
                          .join(" ")}
                      />
                    )}

                    {/* Points */}
                    {chartModels.map((m, i) => {
                      const x =
                        chartModels.length === 1
                          ? 50
                          : (i / (chartModels.length - 1)) * 100
                      const y = 100 - m.capability
                      return (
                        <Link key={m.id} href={`/model/${m.slug}`}>
                          <circle
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill={categories[chartCat].color}
                            className="cursor-pointer hover:r-[2.5]"
                          />
                          <text
                            x={x}
                            y={y - 3}
                            textAnchor="middle"
                            className="fill-foreground font-sans"
                            fontSize="2.5"
                          >
                            {m.name}
                          </text>
                        </Link>
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* X axis labels */}
              <div className="ml-8 mt-2 flex justify-between">
                {chartModels.map((m) => (
                  <span key={m.id} className="font-mono text-[9px] text-muted-foreground">
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
