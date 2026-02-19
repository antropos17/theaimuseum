"use client"

import { useState } from "react"
import Link from "next/link"
import type { AIModel } from "@/data/models"
import { stickerTypes } from "@/data/models"
import { ChevronLeft, ChevronRight, Star, Share2, ExternalLink, FileText, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModelExhibitProps {
  model: AIModel
  category: { label: string; icon: string; color: string }
  prevModel: AIModel | null
  nextModel: AIModel | null
}

const tabs = [
  { id: "overview", label: "Overview", icon: "\uD83D\uDCCB" },
  { id: "stats", label: "Stats", icon: "\uD83D\uDCCA" },
  { id: "opinions", label: "Opinions", icon: "\uD83D\uDDE3\uFE0F" },
  { id: "bugs", label: "Bugs & Scandals", icon: "\uD83D\uDC1B" },
  { id: "media", label: "Media", icon: "\uD83C\uDFAC" },
]

const severityColors: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400",
  scandal: "bg-orange-500/10 text-orange-400",
  funny: "bg-yellow-500/10 text-yellow-400",
  legendary: "bg-purple-500/10 text-purple-400",
  legal: "bg-blue-500/10 text-blue-400",
  political: "bg-rose-500/10 text-rose-400",
  security: "bg-red-500/10 text-red-400",
  feature: "bg-muted text-muted-foreground",
  ux: "bg-muted text-muted-foreground",
  philosophical: "bg-purple-500/10 text-purple-400",
  overload: "bg-yellow-500/10 text-yellow-400",
  ironic: "bg-cyan-500/10 text-cyan-400",
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <Link href="/explore" className="hover:text-foreground transition-colors">
            Explore
          </Link>
          <span>/</span>
          <span>{category.label}</span>
          <span>/</span>
          <span className="text-foreground">{model.name}</span>
        </nav>

        {/* Header */}
        <h1 className="font-serif text-4xl font-bold text-foreground">{model.name}</h1>

        {/* Meta row */}
        <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>{model.creator}</span>
          <span className="text-border">&middot;</span>
          <span>{model.year}</span>
          <span className="text-border">&middot;</span>
          <span>{model.params}</span>
          <span className="text-border">&middot;</span>
          <span>{model.cost}</span>
        </div>

        {/* Badge row */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 font-sans text-xs font-medium text-foreground"
            style={{ backgroundColor: `${category.color}20`, color: category.color }}
          >
            {category.icon} {category.label}
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider",
              model.status === "active"
                ? "bg-[#22c55e]/10 text-[#22c55e]"
                : model.status === "declining"
                  ? "bg-red-500/10 text-red-400"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {model.status}
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider",
              model.open ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-muted text-muted-foreground"
            )}
          >
            {model.open ? "Open Source" : "Closed"}
          </span>
        </div>

        {/* Tabs */}
        <div className="scrollbar-none mt-8 flex items-center gap-1 overflow-x-auto border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-2.5 font-sans text-sm transition-all",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <p className="font-sans text-[15px] leading-[1.7] text-foreground/90 whitespace-pre-line">
                {model.description}
              </p>

              {model.example && (
                <div
                  className="rounded-lg border p-4 font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-line"
                  style={{ borderLeftWidth: 3, borderLeftColor: model.color }}
                >
                  {model.example}
                </div>
              )}

              {/* Bars */}
              <div className="space-y-4">
                {[
                  { label: "Capability", value: model.capability },
                  { label: "Hype", value: model.hype },
                  { label: "Safety", value: model.safety },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {bar.label}
                      </span>
                      <span className="font-mono text-xs text-foreground">{bar.value}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
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

          {/* Stats */}
          {activeTab === "stats" && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { label: "Parameters", value: model.params },
                { label: "Training Cost", value: model.cost },
                { label: "Capability", value: `${model.capability}/100` },
                { label: "Hype Level", value: `${model.hype}/100` },
                { label: "Safety Score", value: `${model.safety}/100` },
                { label: "Release Year", value: String(model.year) },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">
                    {stat.label}
                  </span>
                  <p className="mt-1 font-mono text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Opinions */}
          {activeTab === "opinions" && (
            <div className="space-y-3">
              {model.opinions.length === 0 ? (
                <p className="py-12 text-center font-sans text-sm text-muted-foreground">
                  No opinions recorded.
                </p>
              ) : (
                model.opinions.map((op, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl p-4"
                    style={{
                      borderLeftWidth: 3,
                      borderLeftColor: op.sentiment === "+" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    <p className="font-sans text-sm text-foreground">
                      {op.text}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                      &mdash; {op.source}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Bugs & Scandals */}
          {activeTab === "bugs" && (
            <div className="space-y-3">
              {model.bugs.length === 0 ? (
                <p className="py-12 text-center font-sans text-sm text-muted-foreground">
                  No bugs or scandals recorded. Clean record.
                </p>
              ) : (
                model.bugs.map((bug, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <span
                      className={cn(
                        "inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        severityColors[bug.severity] || "bg-muted text-muted-foreground"
                      )}
                    >
                      {bug.severity}
                    </span>
                    <p className="mt-2 font-sans text-sm text-foreground">{bug.text}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Media */}
          {activeTab === "media" && (
            <div className="space-y-3">
              {model.media.length === 0 ? (
                <p className="py-12 text-center font-sans text-sm text-muted-foreground">
                  No media links available yet.
                </p>
              ) : (
                model.media.map((m, i) => (
                  <a
                    key={i}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glass-hover flex items-center gap-3 rounded-xl p-4 transition-all"
                  >
                    {m.type === "paper" && <FileText className="h-4 w-4 text-muted-foreground" />}
                    {m.type === "yt" && <PlayCircle className="h-4 w-4 text-red-400" />}
                    {m.type === "link" && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    <span className="font-sans text-sm text-foreground">{m.title}</span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        {/* Community Section */}
        <div className="mt-12 glass rounded-xl p-6">
          <h3 className="font-serif text-lg font-bold text-foreground">Community</h3>

          {/* Reactions */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setLikes((l) => l + 1)}
              className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 font-sans text-sm text-foreground transition-all hover:bg-primary/10"
            >
              <span>{"👍"}</span> {likes}
            </button>
            <button
              onClick={() => setDislikes((d) => d + 1)}
              className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 font-sans text-sm text-foreground transition-all hover:bg-red-500/10"
            >
              <span>{"👎"}</span> {dislikes}
            </button>
          </div>

          {/* Star rating */}
          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-6 w-6",
                    s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                {rating}/5
              </span>
            )}
          </div>

          {/* Stickers */}
          <div className="mt-6">
            <h4 className="font-sans text-sm font-medium text-foreground">
              How would you describe this model?
            </h4>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {stickerTypes.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => handleSticker(sticker.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 font-sans text-xs text-foreground transition-all hover:bg-primary/10 active:scale-95"
                >
                  <span>{sticker.emoji}</span>
                  <span className="truncate">{sticker.label}</span>
                  {(stickerCounts[sticker.id] || 0) > 0 && (
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {stickerCounts[sticker.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Coming soon */}
          <p className="mt-6 font-sans text-xs text-muted-foreground">
            {"💬"} Comments &mdash; Reddit-style discussions coming soon
          </p>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 flex items-center justify-between">
          {prevModel ? (
            <Link
              href={`/model/${prevModel.slug}`}
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              <span style={{ color: prevModel.color }}>{prevModel.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextModel ? (
            <Link
              href={`/model/${nextModel.slug}`}
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span style={{ color: nextModel.color }}>{nextModel.name}</span>
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
