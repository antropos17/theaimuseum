"use client"

import { useState } from "react"
import Link from "next/link"
import type { AIModel } from "@/data/models"
import { stickerTypes } from "@/data/models"
import { cn } from "@/lib/utils"

interface ModelExhibitProps {
  model: AIModel
  category: { label: string; icon: string; color: string }
  prevModel: AIModel | null
  nextModel: AIModel | null
}

const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "stats", label: "Stats" },
  { id: "opinions", label: "Opinions" },
  { id: "bugs", label: "Incidents" },
  { id: "media", label: "Media" },
]

const severityColors: Record<string, string> = {
  critical: "text-chart-5",
  scandal: "text-chart-4",
  funny: "text-yellow-500",
  legendary: "text-primary",
  legal: "text-chart-2",
  political: "text-rose-500",
  security: "text-chart-5",
  feature: "text-muted-foreground",
  ux: "text-muted-foreground",
  philosophical: "text-primary",
  overload: "text-chart-4",
  ironic: "text-chart-2",
}

export function ModelExhibit({ model, category, prevModel, nextModel }: ModelExhibitProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [rating, setRating] = useState(0)
  const [stickerCounts, setStickerCounts] = useState<Record<string, number>>({})

  const handleSticker = (id: string) => {
    setStickerCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <Link href="/explore" className="transition-colors hover:text-foreground">Explore</Link>
          <span className="text-border">/</span>
          <span>{category.label}</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{model.name}</span>
        </nav>

        {/* Header card */}
        <div className="terminal-card-solid p-6" style={{ borderLeftWidth: "2px", borderLeftColor: model.color }}>
          <h1 className="text-2xl font-light tracking-tight text-foreground">{model.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{model.creator}</span>
            <span className="text-border">|</span>
            <span>{model.year}</span>
            <span className="text-border">|</span>
            <span>{model.params}</span>
            <span className="text-border">|</span>
            <span>{model.cost}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="border border-current/20 px-2 py-0.5 font-mono text-[10px]" style={{ color: category.color }}>
              {category.label}
            </span>
            <span className={`border px-2 py-0.5 font-mono text-[10px] ${model.status === "active" ? "border-primary/20 text-primary" : model.status === "declining" ? "border-chart-5/20 text-chart-5" : "border-border text-muted-foreground"}`}>
              {model.status.toUpperCase()}
            </span>
            <span className={`border px-2 py-0.5 font-mono text-[10px] ${model.open ? "border-chart-3/20 text-chart-3" : "border-border text-muted-foreground"}`}>
              {model.open ? "OPEN SOURCE" : "CLOSED"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-1">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "border px-4 py-2 font-mono text-xs transition-all duration-200",
                activeTab === tab.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6" key={activeTab}>
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="terminal-card-solid p-5">
                <p className="text-[14px] leading-relaxed text-foreground/85 whitespace-pre-line">
                  {model.description}
                </p>
                {model.example && (
                  <div className="mt-4 border-t border-dashed border-border pt-4">
                    <p className="font-mono text-xs text-primary">Example:</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/80 whitespace-pre-line">
                      {model.example}
                    </p>
                  </div>
                )}
              </div>

              {[
                { label: "Capability", value: model.capability },
                { label: "Hype", value: model.hype },
                { label: "Safety", value: model.safety },
              ].map((bar) => (
                <div key={bar.label} className="terminal-card-solid p-4">
                  <div className="flex items-center justify-between">
                    <span className="data-label">{bar.label}</span>
                    <span className="font-mono text-xs tabular-nums text-foreground">{bar.value}/100</span>
                  </div>
                  <div className="mt-2 metric-bar">
                    <div
                      className="metric-bar-fill"
                      style={{ width: `${bar.value}%`, backgroundColor: model.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: "Params", value: model.params },
                { label: "Cost", value: model.cost },
                { label: "Capability", value: `${model.capability}/100` },
                { label: "Hype", value: `${model.hype}/100` },
                { label: "Safety", value: `${model.safety}/100` },
                { label: "Year", value: String(model.year) },
              ].map((stat) => (
                <div key={stat.label} className="terminal-card-solid p-4">
                  <p className="data-label">{stat.label}</p>
                  <p className="mt-1.5 font-mono text-lg tabular-nums text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "opinions" && (
            <div className="space-y-2">
              {model.opinions.length === 0 ? (
                <div className="terminal-card p-8 text-center">
                  <p className="font-mono text-sm text-muted-foreground">No opinions recorded yet.</p>
                </div>
              ) : (
                model.opinions.map((op, i) => (
                  <div key={i} className="terminal-card-solid p-4" style={{ borderLeftWidth: "2px", borderLeftColor: op.sentiment === "+" ? "var(--chart-3)" : "var(--chart-5)" }}>
                    <p className="text-[14px] leading-relaxed text-foreground">{op.text}</p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">&mdash; {op.source}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "bugs" && (
            <div className="space-y-2">
              {model.bugs.length === 0 ? (
                <div className="terminal-card p-8 text-center">
                  <p className="font-mono text-sm text-muted-foreground">Clean record. No incidents.</p>
                </div>
              ) : (
                model.bugs.map((bug, i) => (
                  <div key={i} className="terminal-card-solid p-4">
                    <span className={cn("font-mono text-[11px] uppercase", severityColors[bug.severity] || "text-muted-foreground")}>
                      [{bug.severity}]
                    </span>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-foreground">{bug.text}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-2">
              {model.media.length === 0 ? (
                <div className="terminal-card p-8 text-center">
                  <p className="font-mono text-sm text-muted-foreground">No media available.</p>
                </div>
              ) : (
                model.media.map((m, i) => (
                  <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="terminal-card-solid block p-4 transition-all duration-200 hover:border-primary">
                    <span className="font-mono text-[11px] text-primary">[{m.type.toUpperCase()}]</span>
                    <span className="ml-2 text-sm text-foreground">{m.title}</span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        {/* Community */}
        <div className="mt-8 terminal-card-solid p-6">
          <h3 className="data-label">[Community]</h3>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => setLikes((l) => l + 1)} className="border border-border px-3 py-1.5 font-mono text-xs text-chart-3 transition-colors hover:bg-chart-3/5">
              + {likes}
            </button>
            <button onClick={() => setDislikes((d) => d + 1)} className="border border-border px-3 py-1.5 font-mono text-xs text-chart-5 transition-colors hover:bg-chart-5/5">
              - {dislikes}
            </button>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)} className={cn("text-base transition-colors", s <= rating ? "text-chart-4" : "text-muted-foreground/20")}>
                *
              </button>
            ))}
            {rating > 0 && <span className="ml-2 font-mono text-xs text-muted-foreground">{rating}/5</span>}
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {stickerTypes.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => handleSticker(sticker.id)}
                className="border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground active:scale-95"
              >
                {sticker.label}
                {(stickerCounts[sticker.id] || 0) > 0 && (
                  <span className="ml-1 text-primary">{stickerCounts[sticker.id]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Prev/Next */}
        <div className="mt-6 flex items-center justify-between">
          {prevModel ? (
            <Link href={`/model/${prevModel.slug}`} className="terminal-card-solid px-4 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
              &larr; {prevModel.name}
            </Link>
          ) : <div />}
          <Link href="/explore" className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
            [All Models]
          </Link>
          {nextModel ? (
            <Link href={`/model/${nextModel.slug}`} className="terminal-card-solid px-4 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
              {nextModel.name} &rarr;
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
