"use client"

import { useState } from "react"
import Link from "next/link"
import type { AIModel } from "@/data/models"
import { stickerTypes } from "@/data/models"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  FileText,
  PlayCircle,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
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
  { id: "bugs", label: "Bugs & Scandals" },
  { id: "media", label: "Media" },
]

const severityColors: Record<string, string> = {
  critical: "border-chart-5/30 text-chart-5",
  scandal: "border-chart-4/30 text-chart-4",
  funny: "border-yellow-500/30 text-yellow-500",
  legendary: "border-primary/30 text-primary",
  legal: "border-chart-2/30 text-chart-2",
  political: "border-rose-500/30 text-rose-500",
  security: "border-chart-5/30 text-chart-5",
  feature: "border-border text-muted-foreground",
  ux: "border-border text-muted-foreground",
  philosophical: "border-primary/30 text-primary",
  overload: "border-chart-4/30 text-chart-4",
  ironic: "border-chart-2/30 text-chart-2",
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
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 lg:px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/explore" className="transition-colors hover:text-foreground">
            Explore
          </Link>
          <span className="text-border">/</span>
          <span>{category.label}</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{model.name}</span>
        </nav>

        {/* Header area with colored top accent */}
        <div
          className="rounded-xl border border-border bg-card p-6 sm:p-8"
          style={{ borderTopWidth: "3px", borderTopColor: model.color }}
        >
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {model.name}
          </h1>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
            <span>{model.creator}</span>
            <span className="text-border">&middot;</span>
            <span>{model.year}</span>
            <span className="text-border">&middot;</span>
            <span>{model.params}</span>
            <span className="text-border">&middot;</span>
            <span>{model.cost}</span>
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
              style={{ borderColor: `${category.color}40`, color: category.color }}
            >
              {category.label}
            </span>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                model.status === "active"
                  ? "border-chart-3/30 text-chart-3"
                  : model.status === "declining"
                    ? "border-chart-5/30 text-chart-5"
                    : "border-border text-muted-foreground"
              )}
            >
              {model.status}
            </span>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                model.open
                  ? "border-chart-3/30 text-chart-3"
                  : "border-border text-muted-foreground"
              )}
            >
              {model.open ? "Open Source" : "Closed"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex items-center gap-0 overflow-x-auto border-b border-border">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-8">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left: Description */}
              <div className="flex-1 space-y-6">
                <p className="text-[15px] leading-[1.75] text-foreground/85 whitespace-pre-line">
                  {model.description}
                </p>

                {model.example && (
                  <div
                    className="rounded-lg border border-border bg-surface-1 p-4 font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-line"
                    style={{ borderLeftWidth: 3, borderLeftColor: model.color }}
                  >
                    {model.example}
                  </div>
                )}
              </div>

              {/* Right: Metric cards */}
              <div className="w-full shrink-0 space-y-4 lg:w-64">
                {[
                  { label: "Capability", value: model.capability },
                  { label: "Hype", value: model.hype },
                  { label: "Safety", value: model.safety },
                ].map((bar) => (
                  <div key={bar.label} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {bar.label}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-foreground">
                        {bar.value}%
                      </span>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${bar.value}%`,
                          backgroundColor: model.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATS */}
          {activeTab === "stats" && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[
                { label: "Parameters", value: model.params },
                { label: "Training Cost", value: model.cost },
                { label: "Capability", value: `${model.capability}/100` },
                { label: "Hype Level", value: `${model.hype}/100` },
                { label: "Safety Score", value: `${model.safety}/100` },
                { label: "Release Year", value: String(model.year) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </span>
                  <p className="mt-1.5 font-mono text-lg font-semibold tabular-nums text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* OPINIONS */}
          {activeTab === "opinions" && (
            <div className="space-y-3">
              {model.opinions.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No opinions recorded yet.
                </p>
              ) : (
                model.opinions.map((op, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card p-5"
                    style={{
                      borderLeftWidth: 3,
                      borderLeftColor: op.sentiment === "+" ? "var(--chart-3)" : "var(--chart-5)",
                    }}
                  >
                    <p className="text-sm leading-relaxed text-foreground">{op.text}</p>
                    <p className="mt-2.5 font-mono text-[11px] text-muted-foreground">
                      &mdash; {op.source}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* BUGS */}
          {activeTab === "bugs" && (
            <div className="space-y-3">
              {model.bugs.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No bugs or scandals recorded. Clean record.
                </p>
              ) : (
                model.bugs.map((bug, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-5">
                    <span
                      className={cn(
                        "inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        severityColors[bug.severity] || "border-border text-muted-foreground"
                      )}
                    >
                      {bug.severity}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">{bug.text}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MEDIA */}
          {activeTab === "media" && (
            <div className="space-y-2">
              {model.media.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No media links available yet.
                </p>
              ) : (
                model.media.map((m, i) => (
                  <a
                    key={i}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/20 hover:bg-surface-1"
                  >
                    {m.type === "paper" && <FileText className="h-4 w-4 text-muted-foreground" />}
                    {m.type === "yt" && <PlayCircle className="h-4 w-4 text-chart-5" />}
                    {m.type === "link" && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-sm text-foreground">{m.title}</span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        {/* Community Section */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-foreground">Community</h3>

          {/* Reactions */}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => setLikes((l) => l + 1)}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-chart-3/30 hover:text-chart-3"
            >
              <ThumbsUp className="h-3.5 w-3.5" /> {likes}
            </button>
            <button
              onClick={() => setDislikes((d) => d + 1)}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-chart-5/30 hover:text-chart-5"
            >
              <ThumbsDown className="h-3.5 w-3.5" /> {dislikes}
            </button>
          </div>

          {/* Star rating */}
          <div className="mt-5 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className="transition-transform hover:scale-110"
                aria-label={`Rate ${s} stars`}
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    s <= rating ? "fill-chart-4 text-chart-4" : "text-muted-foreground/30"
                  )}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                {rating}/5
              </span>
            )}
          </div>

          {/* Stickers */}
          <div className="mt-6">
            <p className="text-[13px] font-medium text-foreground">
              How would you describe this model?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stickerTypes.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => handleSticker(sticker.id)}
                  className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground active:scale-95"
                >
                  <span>{sticker.emoji}</span>
                  <span>{sticker.label}</span>
                  {(stickerCounts[sticker.id] || 0) > 0 && (
                    <span className="ml-1 font-mono text-[10px] tabular-nums text-primary">
                      {stickerCounts[sticker.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prev/Next navigation */}
        <div className="mt-8 flex items-center justify-between rounded-lg border border-border bg-card p-4">
          {prevModel ? (
            <Link
              href={`/model/${prevModel.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline" style={{ color: prevModel.color }}>
                {prevModel.name}
              </span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/explore"
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            All Models
          </Link>
          {nextModel ? (
            <Link
              href={`/model/${nextModel.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="hidden sm:inline" style={{ color: nextModel.color }}>
                {nextModel.name}
              </span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
