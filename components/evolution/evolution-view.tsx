'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { models, categories } from '@/data/models'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

/* ─── Types ─── */
type Tab = 'graph' | 'charts'
type CategoryKey = keyof typeof categories

const categoryOrder: CategoryKey[] = [
  'concept',
  'chatbot',
  'code',
  'game',
  'image',
  'video',
  'music',
  'science',
]

/* ─── Helpers ─── */
function getStatusColor(status: string) {
  if (status === 'active') return 'var(--primary)'
  if (status === 'declining') return '#f59e0b'
  return 'var(--muted-foreground)'
}

/* ─── Main Component ─── */
export function EvolutionView() {
  const [tab, setTab] = useState<Tab>('graph')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<CategoryKey>>(new Set(categoryOrder))
  const [chartCategory, setChartCategory] = useState<CategoryKey>('chatbot')
  const [compareMode, setCompareMode] = useState(false)
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ─── Graph nodes ─── */
  const nodes = useMemo(() => {
    const sorted = [...models].sort((a, b) => a.year - b.year)
    const years = sorted.map((m) => m.year)
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    const range = maxYear - minYear || 1

    return sorted.map((m) => {
      const xPct = ((m.year - minYear) / range) * 76 + 12
      const catIdx = Math.max(0, categoryOrder.indexOf(m.category as CategoryKey))
      const yBase = ((catIdx + 0.5) / categoryOrder.length) * 76 + 12
      // Deterministic spread from capability to avoid overlap
      const spread = ((m.capability % 7) - 3) * 0.9
      const radius = Math.max(0.6, Math.min(2.2, m.capability / 35 + 0.4))
      return { ...m, xPct, yPct: yBase + spread, radius }
    })
  }, [])

  /* ─── Lineage edges ─── */
  const edges = useMemo(() => {
    const result: { from: (typeof nodes)[0]; to: (typeof nodes)[0] }[] = []
    for (const node of nodes) {
      for (const parentId of node.lineage) {
        const parent = nodes.find((n) => n.id === parentId)
        if (parent) result.push({ from: parent, to: node })
      }
    }
    return result
  }, [nodes])

  /* ─── Filter toggle ─── */
  function toggleFilter(cat: CategoryKey) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  /* ─── Compare toggle ─── */
  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 3) {
        next.add(id)
      }
      return next
    })
  }

  /* ─── Chart data ─── */
  const chartModels = useMemo(
    () => models.filter((m) => m.category === chartCategory).sort((a, b) => a.year - b.year),
    [chartCategory],
  )

  const compareModels = useMemo(
    () => models.filter((m) => compareIds.has(m.id)).sort((a, b) => a.year - b.year),
    [compareIds],
  )

  /* ─── SVG curve path ─── */
  function curvePath(x1: number, y1: number, x2: number, y2: number) {
    const mx = (x1 + x2) / 2
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 mb-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Museum
          </Link>
          <span className="data-label">[SYS.EVOLUTION]</span>
          <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
            Evolution of AI
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Trace the lineage, growth, and divergence of AI models across 75 years.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex gap-1">
            {(['graph', 'charts'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200',
                  tab === t
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20',
                )}
              >
                [{t === 'graph' ? 'NEURAL GRAPH' : 'LINE CHARTS'}]
              </button>
            ))}
          </div>
        </div>

        {/* ═══════ GRAPH VIEW ═══════ */}
        {tab === 'graph' && (
          <div
            className={`mt-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Category filters */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mr-2">
                Filter:
              </span>
              {categoryOrder.map((cat) => {
                const c = categories[cat]
                const isActive = activeFilters.has(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={cn(
                      'flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] transition-all duration-200',
                      isActive
                        ? 'border-foreground/20 text-foreground'
                        : 'border-border text-muted-foreground/40',
                    )}
                  >
                    <span
                      className="h-2 w-2 rounded-full transition-opacity"
                      style={{ backgroundColor: c.color, opacity: isActive ? 1 : 0.2 }}
                    />
                    {c.label}
                  </button>
                )
              })}
            </div>

            {/* Graph container */}
            <div
              className="relative terminal-card-solid overflow-hidden"
              style={{ aspectRatio: '16/9', minHeight: 400 }}
            >
              {/* Circuit pattern overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                className="relative z-10"
              >
                {/* Dashed lineage edges (circuit traces) */}
                {edges.map(({ from, to }) => {
                  const fromVisible = activeFilters.has(from.category as CategoryKey)
                  const toVisible = activeFilters.has(to.category as CategoryKey)
                  if (!fromVisible && !toVisible) return null
                  const isHighlighted = hoveredNode === from.id || hoveredNode === to.id
                  return (
                    <path
                      key={`${from.id}-${to.id}`}
                      d={curvePath(from.xPct, from.yPct, to.xPct, to.yPct)}
                      fill="none"
                      stroke={isHighlighted ? to.color : 'var(--border)'}
                      strokeWidth={isHighlighted ? 0.2 : 0.1}
                      strokeDasharray={isHighlighted ? 'none' : '0.5 0.4'}
                      opacity={isHighlighted ? 0.7 : 0.2}
                      className="transition-all duration-300"
                    />
                  )
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isVisible = activeFilters.has(node.category as CategoryKey)
                  const isHovered = hoveredNode === node.id
                  const isConnected = hoveredNode
                    ? node.lineage.includes(hoveredNode) ||
                      nodes.find((n) => n.id === hoveredNode)?.lineage.includes(node.id)
                    : false

                  return (
                    <Link key={node.id} href={`/model/${node.slug}`}>
                      <g
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer"
                        style={{
                          opacity: isVisible
                            ? hoveredNode && !isHovered && !isConnected
                              ? 0.2
                              : 1
                            : 0.06,
                          transition: 'opacity 0.3s',
                        }}
                      >
                        {/* Glow ring on hover */}
                        {isHovered && (
                          <circle
                            cx={node.xPct}
                            cy={node.yPct}
                            r={node.radius + 1}
                            fill="none"
                            stroke={node.color}
                            strokeWidth="0.08"
                            opacity={0.4}
                          />
                        )}
                        {/* Main dot */}
                        <circle
                          cx={node.xPct}
                          cy={node.yPct}
                          r={node.radius}
                          fill={node.color}
                          opacity={isHovered ? 1 : 0.7}
                          className="transition-opacity duration-200"
                        />
                        {/* Status ring */}
                        <circle
                          cx={node.xPct}
                          cy={node.yPct}
                          r={node.radius + 0.3}
                          fill="none"
                          stroke={getStatusColor(node.status)}
                          strokeWidth="0.06"
                          opacity={0.5}
                        />
                        {/* Label on hover */}
                        {isHovered && (
                          <text
                            x={node.xPct}
                            y={node.yPct - node.radius - 1.2}
                            textAnchor="middle"
                            className="fill-foreground"
                            style={{ fontSize: '1.5px', fontFamily: 'var(--font-mono)' }}
                          >
                            {node.name}
                          </text>
                        )}
                      </g>
                    </Link>
                  )
                })}

                {/* Year labels along bottom */}
                {[1950, 1970, 1990, 2000, 2010, 2015, 2020, 2023, 2025].map((yr) => {
                  const years = nodes.map((n) => n.year)
                  const minY = Math.min(...years)
                  const maxY = Math.max(...years)
                  const range = maxY - minY || 1
                  const x = ((yr - minY) / range) * 76 + 12
                  if (x < 5 || x > 95) return null
                  return (
                    <text
                      key={yr}
                      x={x}
                      y={96}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: '1.3px', fontFamily: 'var(--font-mono)' }}
                    >
                      {yr}
                    </text>
                  )
                })}
              </svg>

              {/* Hover tooltip */}
              {hoveredNode &&
                (() => {
                  const node = nodes.find((n) => n.id === hoveredNode)
                  if (!node) return null
                  const cat = categories[node.category as CategoryKey]
                  return (
                    <div className="pointer-events-none absolute bottom-3 left-3 z-20 max-w-xs border border-border bg-popover/95 p-3 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: node.color }}
                        />
                        <span className="text-sm font-medium text-foreground">{node.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {node.year}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                        {node.creator} | {cat?.label} | {node.params}
                      </p>
                      <div className="mt-2 flex gap-3">
                        {[
                          { label: 'CAP', val: node.capability },
                          { label: 'HYPE', val: node.hype },
                          { label: 'SAFE', val: node.safety },
                        ].map((s) => (
                          <div key={s.label} className="flex-1">
                            <div className="flex justify-between font-mono text-[8px] text-muted-foreground mb-0.5">
                              <span>{s.label}</span>
                              <span>{s.val}%</span>
                            </div>
                            <div className="h-[3px] w-full bg-border">
                              <div
                                className="h-full transition-all duration-500"
                                style={{ width: `${s.val}%`, backgroundColor: node.color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      {node.lineage.length > 0 && (
                        <p className="mt-1.5 font-mono text-[9px] text-muted-foreground">
                          Lineage: {node.lineage.join(' > ')}
                        </p>
                      )}
                    </div>
                  )
                })()}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {categoryOrder.map((cat) => {
                const c = categories[cat]
                return (
                  <span key={cat} className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{c.label}</span>
                  </span>
                )
              })}
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                {nodes.length} models | {edges.length} connections
              </span>
            </div>
          </div>
        )}

        {/* ═══════ CHARTS VIEW ═══════ */}
        {tab === 'charts' && (
          <div
            className={`mt-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Category tabs + compare toggle */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {categoryOrder
                .filter((c) => ['chatbot', 'image', 'video', 'music', 'code'].includes(c))
                .map((cat) => {
                  const c = categories[cat]
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setChartCategory(cat)
                        setCompareMode(false)
                        setCompareIds(new Set())
                      }}
                      className={cn(
                        'border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200',
                        chartCategory === cat && !compareMode
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <span
                        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.label}
                    </button>
                  )
                })}
              <button
                onClick={() => {
                  setCompareMode(!compareMode)
                  setCompareIds(new Set())
                }}
                className={cn(
                  'ml-auto border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200',
                  compareMode
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                [COMPARE {compareMode ? 'ON' : 'OFF'}]
              </button>
            </div>

            {/* Compare model selector */}
            {compareMode && (
              <div className="mb-4 border border-dashed border-border p-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Select 2-3 models to compare ({compareIds.size}/3):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => toggleCompare(m.id)}
                      className={cn(
                        'border px-2 py-1 font-mono text-[10px] transition-all duration-200',
                        compareIds.has(m.id)
                          ? 'border-foreground/30 text-foreground bg-foreground/5'
                          : 'border-border text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <span
                        className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chart area */}
            <div className="terminal-card-solid overflow-hidden p-4">
              {/* Single category chart */}
              {!compareMode && chartModels.length > 0 && (
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {categories[chartCategory]?.label} capability over time
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {chartModels.length} models
                    </span>
                  </div>
                  <div className="relative" style={{ height: 260 }}>
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      {/* Grid lines */}
                      {[0, 25, 50, 75, 100].map((v) => (
                        <g key={v}>
                          <line
                            x1="0"
                            y1={100 - v}
                            x2="100"
                            y2={100 - v}
                            stroke="var(--border)"
                            strokeWidth="0.2"
                            strokeDasharray="0.8 0.5"
                          />
                          <text
                            x="0"
                            y={100 - v - 0.5}
                            className="fill-muted-foreground"
                            style={{ fontSize: '2px', fontFamily: 'var(--font-mono)' }}
                          >
                            {v}%
                          </text>
                        </g>
                      ))}
                      {/* Line */}
                      {chartModels.length > 1 && (
                        <polyline
                          fill="none"
                          stroke={categories[chartCategory]?.color}
                          strokeWidth="0.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          points={chartModels
                            .map(
                              (m, i) =>
                                `${(i / (chartModels.length - 1)) * 96 + 2},${100 - m.capability}`,
                            )
                            .join(' ')}
                          className={mounted ? 'animate-draw' : ''}
                        />
                      )}
                      {/* Area fill */}
                      {chartModels.length > 1 && (
                        <polygon
                          fill={categories[chartCategory]?.color}
                          opacity={0.05}
                          points={[
                            `2,100`,
                            ...chartModels.map(
                              (m, i) =>
                                `${(i / (chartModels.length - 1)) * 96 + 2},${100 - m.capability}`,
                            ),
                            `98,100`,
                          ].join(' ')}
                        />
                      )}
                      {/* Data points */}
                      {chartModels.map((m, i) => {
                        const x =
                          chartModels.length === 1 ? 50 : (i / (chartModels.length - 1)) * 96 + 2
                        const y = 100 - m.capability
                        return (
                          <Link key={m.id} href={`/model/${m.slug}`}>
                            <g className="cursor-pointer">
                              <circle
                                cx={x}
                                cy={y}
                                r="1.2"
                                fill="var(--background)"
                                stroke={categories[chartCategory]?.color}
                                strokeWidth="0.3"
                              />
                              <circle
                                cx={x}
                                cy={y}
                                r="0.5"
                                fill={categories[chartCategory]?.color}
                              />
                              <text
                                x={x}
                                y={y - 2.5}
                                textAnchor="middle"
                                className="fill-foreground"
                                style={{ fontSize: '1.8px', fontFamily: 'var(--font-mono)' }}
                              >
                                {m.name}
                              </text>
                              <text
                                x={x}
                                y={y - 1}
                                textAnchor="middle"
                                className="fill-muted-foreground"
                                style={{ fontSize: '1.4px', fontFamily: 'var(--font-mono)' }}
                              >
                                {m.year}
                              </text>
                            </g>
                          </Link>
                        )
                      })}
                    </svg>
                  </div>
                </div>
              )}

              {/* Compare mode chart */}
              {compareMode && compareModels.length >= 2 && (
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Comparing {compareModels.map((m) => m.name).join(' vs ')}
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {['capability', 'hype', 'safety'].map((metric) => (
                      <div key={metric} className="border border-dashed border-border p-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          [{metric}]
                        </span>
                        <div className="mt-3 space-y-2">
                          {compareModels.map((m) => (
                            <div key={m.id}>
                              <div className="flex justify-between font-mono text-[10px]">
                                <span className="text-foreground">{m.name}</span>
                                <span className="text-muted-foreground">
                                  {m[metric as 'capability' | 'hype' | 'safety']}%
                                </span>
                              </div>
                              <div className="mt-1 h-1.5 w-full bg-border">
                                <div
                                  className="h-full transition-all duration-700"
                                  style={{
                                    width: `${m[metric as 'capability' | 'hype' | 'safety']}%`,
                                    backgroundColor: m.color,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Detail comparison table */}
                  <div className="mt-4 border border-dashed border-border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="p-2 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            Field
                          </th>
                          {compareModels.map((m) => (
                            <th
                              key={m.id}
                              className="p-2 text-left font-mono text-[10px] text-foreground"
                            >
                              <span
                                className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: m.color }}
                              />
                              {m.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {['year', 'creator', 'params', 'cost', 'era', 'status'].map((field) => (
                          <tr key={field} className="border-b border-border/50">
                            <td className="p-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              {field}
                            </td>
                            {compareModels.map((m) => (
                              <td key={m.id} className="p-2 font-mono text-[11px] text-foreground">
                                {String(m[field as keyof typeof m])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {compareMode && compareModels.length < 2 && (
                <div className="flex h-40 items-center justify-center">
                  <span className="font-mono text-xs text-muted-foreground">
                    Select at least 2 models to compare
                    <span className="terminal-cursor" />
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
