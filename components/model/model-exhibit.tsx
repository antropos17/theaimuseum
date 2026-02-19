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
  { id: "overview", label: "[INFO]" },
  { id: "stats", label: "[STATS]" },
  { id: "opinions", label: "[SAY]" },
  { id: "bugs", label: "[BUGS]" },
  { id: "media", label: "[MEDIA]" },
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
        <nav className="mb-6 flex items-center gap-1 text-[7px] text-muted-foreground">
          <Link href="/explore" className="hover:text-foreground">{'>'} EXPLORE</Link>
          <span>/</span>
          <span>{category.label.toUpperCase()}</span>
          <span>/</span>
          <span className="text-foreground">{model.name.toUpperCase()}</span>
        </nav>

        {/* Header card */}
        <div className="pixel-border bg-card p-6" style={{ borderLeftWidth: "4px", borderLeftColor: model.color }}>
          <h1 className="text-lg text-primary sm:text-xl">{model.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[7px] text-muted-foreground">
            <span>{model.creator}</span>
            <span className="text-border">|</span>
            <span>{model.year}</span>
            <span className="text-border">|</span>
            <span>{model.params}</span>
            <span className="text-border">|</span>
            <span>{model.cost}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            <span className="pixel-border px-2 py-0.5 text-[6px]" style={{ color: category.color }}>
              {category.label}
            </span>
            <span className={`pixel-border px-2 py-0.5 text-[6px] ${model.status === "active" ? "text-chart-3" : model.status === "declining" ? "text-chart-5" : "text-muted-foreground"}`}>
              {model.status.toUpperCase()}
            </span>
            <span className={`pixel-border px-2 py-0.5 text-[6px] ${model.open ? "text-chart-3" : "text-muted-foreground"}`}>
              {model.open ? "OPEN SRC" : "CLOSED"}
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
                "pixel-border px-3 py-1.5 text-[7px] transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6 animate-pixel-fade-in" key={activeTab}>
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="pixel-border bg-card p-5">
                <p className="text-[8px] leading-[2] text-foreground/85 whitespace-pre-line">
                  {model.description}
                </p>
                {model.example && (
                  <div className="mt-4 border-t-2 border-dashed border-border pt-4">
                    <p className="text-[7px] text-primary">{'>'} EXAMPLE:</p>
                    <p className="mt-1 text-[7px] leading-[2] text-foreground/80 whitespace-pre-line">
                      {model.example}
                    </p>
                  </div>
                )}
              </div>

              {/* Metric bars */}
              {[
                { label: "CAPABILITY", value: model.capability },
                { label: "HYPE", value: model.hype },
                { label: "SAFETY", value: model.safety },
              ].map((bar) => (
                <div key={bar.label} className="pixel-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] text-muted-foreground">{bar.label}</span>
                    <span className="text-[7px] tabular-nums text-foreground">{bar.value}/100</span>
                  </div>
                  <div className="mt-2 h-[6px] w-full bg-muted">
                    <div
                      className="h-full pixel-bar"
                      style={{ width: `${bar.value}%`, backgroundColor: model.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STATS */}
          {activeTab === "stats" && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: "PARAMS", value: model.params },
                { label: "COST", value: model.cost },
                { label: "CAP", value: `${model.capability}/100` },
                { label: "HYPE", value: `${model.hype}/100` },
                { label: "SAFE", value: `${model.safety}/100` },
                { label: "YEAR", value: String(model.year) },
              ].map((stat) => (
                <div key={stat.label} className="pixel-border bg-card p-3">
                  <p className="text-[6px] text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-[9px] tabular-nums text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* OPINIONS */}
          {activeTab === "opinions" && (
            <div className="space-y-2">
              {model.opinions.length === 0 ? (
                <div className="pixel-border bg-card p-6 text-center">
                  <p className="text-[8px] text-muted-foreground">NO OPINIONS YET.</p>
                </div>
              ) : (
                model.opinions.map((op, i) => (
                  <div key={i} className="pixel-border bg-card p-4" style={{ borderLeftWidth: "3px", borderLeftColor: op.sentiment === "+" ? "var(--chart-3)" : "var(--chart-5)" }}>
                    <p className="text-[8px] leading-[2] text-foreground">{op.text}</p>
                    <p className="mt-2 text-[7px] text-muted-foreground">-- {op.source}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* BUGS */}
          {activeTab === "bugs" && (
            <div className="space-y-2">
              {model.bugs.length === 0 ? (
                <div className="pixel-border bg-card p-6 text-center">
                  <p className="text-[8px] text-muted-foreground">CLEAN RECORD. NO BUGS.</p>
                </div>
              ) : (
                model.bugs.map((bug, i) => (
                  <div key={i} className="pixel-border bg-card p-4">
                    <span className={cn("text-[7px] uppercase", severityColors[bug.severity] || "text-muted-foreground")}>
                      [{bug.severity}]
                    </span>
                    <p className="mt-1 text-[8px] leading-[2] text-foreground">{bug.text}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MEDIA */}
          {activeTab === "media" && (
            <div className="space-y-2">
              {model.media.length === 0 ? (
                <div className="pixel-border bg-card p-6 text-center">
                  <p className="text-[8px] text-muted-foreground">NO MEDIA AVAILABLE.</p>
                </div>
              ) : (
                model.media.map((m, i) => (
                  <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="pixel-border block bg-card p-3 transition-colors hover:border-primary">
                    <span className="text-[7px] text-primary">[{m.type.toUpperCase()}]</span>
                    <span className="ml-2 text-[8px] text-foreground">{m.title}</span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        {/* Community */}
        <div className="mt-8 pixel-border bg-card p-6">
          <h3 className="text-[9px] text-primary">{'>'} COMMUNITY</h3>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => setLikes((l) => l + 1)} className="pixel-border px-3 py-1 text-[7px] text-chart-3 hover:bg-chart-3/10">
              [+] {likes}
            </button>
            <button onClick={() => setDislikes((d) => d + 1)} className="pixel-border px-3 py-1 text-[7px] text-chart-5 hover:bg-chart-5/10">
              [-] {dislikes}
            </button>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)} className={cn("text-[10px]", s <= rating ? "text-chart-4" : "text-muted-foreground/30")}>
                *
              </button>
            ))}
            {rating > 0 && <span className="ml-1 text-[7px] text-muted-foreground">{rating}/5</span>}
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {stickerTypes.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => handleSticker(sticker.id)}
                className="pixel-border px-2 py-1 text-[6px] text-muted-foreground hover:text-foreground active:scale-95"
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
            <Link href={`/model/${prevModel.slug}`} className="pixel-border bg-card px-3 py-2 text-[7px] text-muted-foreground hover:text-foreground">
              {'<'} {prevModel.name}
            </Link>
          ) : <div />}
          <Link href="/explore" className="text-[7px] text-muted-foreground hover:text-foreground">
            [ALL MODELS]
          </Link>
          {nextModel ? (
            <Link href={`/model/${nextModel.slug}`} className="pixel-border bg-card px-3 py-2 text-[7px] text-muted-foreground hover:text-foreground">
              {nextModel.name} {'>'}
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
