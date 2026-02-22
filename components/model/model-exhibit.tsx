'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Heart,
  ThumbsDown,
  Star,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react'
import type { AIModel } from '@/data/models'
import { stickerTypes, models } from '@/data/models'
import { cn } from '@/lib/utils'

interface ModelExhibitProps {
  model: AIModel
  category: { label: string; icon: string; color: string }
  prevModel: AIModel | null
  nextModel: AIModel | null
}

const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'stats', label: 'Stats' },
  { id: 'opinions', label: 'Opinions' },
  { id: 'bugs', label: 'Bugs & Scandals' },
  { id: 'media', label: 'Media' },
]

const severityConfig: Record<string, { label: string; color: string; bg: string }> = {
  critical: { label: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  scandal: {
    label: 'SCANDAL',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  funny: { label: 'FUNNY', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  legendary: { label: 'LEGENDARY', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  legal: { label: 'LEGAL', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  political: {
    label: 'POLITICAL',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  security: { label: 'SECURITY', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  feature: { label: 'FEATURE', color: 'text-muted-foreground', bg: 'bg-muted/50 border-border' },
  ux: { label: 'UX', color: 'text-muted-foreground', bg: 'bg-muted/50 border-border' },
  philosophical: {
    label: 'PHILOSOPHICAL',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  overload: {
    label: 'OVERLOAD',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  ironic: {
    label: 'IRONIC',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
}

export function ModelExhibit({ model, category, prevModel, nextModel }: ModelExhibitProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [rating, setRating] = useState(0)
  const [stickerCounts, setStickerCounts] = useState<Record<string, number>>({})
  const [favorited, setFavorited] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [barWidths, setBarWidths] = useState<Record<string, number>>({})
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const shareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true)
      setBarWidths({
        capability: model.capability,
        hype: model.hype,
        safety: model.safety,
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [model.capability, model.hype, model.safety])

  // Close share dropdown on outside click
  useEffect(() => {
    if (!shareOpen) return
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [shareOpen])

  const handleSticker = (id: string) => {
    setStickerCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  // Share helpers
  const pageUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://theaimuseum.dev/model/${model.slug}`
  const shockingFact =
    model.bugs.length > 0
      ? model.bugs[0].text.slice(0, 80)
      : `was created in ${model.year} by ${model.creator}`
  const twitterText = encodeURIComponent(
    `Did you know ${model.name} ${shockingFact}? Explore at The AI Museum`,
  )
  const telegramText = encodeURIComponent(
    `${model.name} (${model.year}) by ${model.creator} -- ${model.description.slice(0, 100)}... Check it out at The AI Museum`,
  )

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setShareOpen(false)
  }

  const modelIndex = models.findIndex((m) => m.id === model.id)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        {/* Breadcrumb */}
        <nav
          className={cn(
            'mb-6 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-all duration-500',
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          <Link href="/explore" className="transition-colors hover:text-primary">
            explore
          </Link>
          <span className="text-border">/</span>
          <span>{category.label.toLowerCase()}</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{model.slug}</span>
        </nav>

        {/* ===== DOSSIER HEADER ===== */}
        <div
          className={cn(
            'terminal-card-solid overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          )}
        >
          {/* Top accent bar */}
          <div
            className="h-[3px]"
            style={{ background: `linear-gradient(90deg, ${model.color}, transparent)` }}
          />

          {/* Header content */}
          <div className="p-6">
            {/* Top row: tags + actions */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                <span
                  className="border border-dashed px-2 py-0.5 font-mono text-[10px]"
                  style={{ color: category.color, borderColor: `${category.color}40` }}
                >
                  {category.icon} {category.label}
                </span>
                <span
                  className={cn(
                    'border border-dashed px-2 py-0.5 font-mono text-[10px]',
                    model.status === 'active'
                      ? 'border-primary/30 text-primary'
                      : model.status === 'declining'
                        ? 'border-orange-500/30 text-orange-400'
                        : 'border-border text-muted-foreground',
                  )}
                >
                  {model.status === 'active'
                    ? '[ACTIVE]'
                    : model.status === 'declining'
                      ? '[DECLINING]'
                      : '[HISTORIC]'}
                </span>
                <span
                  className={cn(
                    'border border-dashed px-2 py-0.5 font-mono text-[10px]',
                    model.open
                      ? 'border-emerald-500/30 text-emerald-400'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {model.open ? '[OPEN]' : '[CLOSED]'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div ref={shareRef} className="relative">
                  <button
                    onClick={() => setShareOpen(!shareOpen)}
                    className="flex h-7 w-7 items-center justify-center border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    title="Share"
                  >
                    <Share2 size={13} />
                  </button>
                  {shareOpen && (
                    <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[180px] border border-border bg-card shadow-lg animate-[terminalFadeIn_0.15s_ease-out]">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(pageUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                        onClick={() => setShareOpen(false)}
                      >
                        <span className="text-primary">{'>'}X</span> Share on X
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${telegramText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                        onClick={() => setShareOpen(false)}
                      >
                        <span className="text-primary">{'>'}TG</span> Share on Telegram
                      </a>
                      <button
                        onClick={copyLink}
                        className="flex w-full items-center gap-2 px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                      >
                        {copied ? (
                          <Check size={11} className="text-primary" />
                        ) : (
                          <Copy size={11} className="text-primary" />
                        )}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setFavorited(!favorited)}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center border border-dashed transition-colors',
                    favorited
                      ? 'border-primary text-primary'
                      : 'border-border text-muted-foreground hover:border-primary hover:text-primary',
                  )}
                  title="Favorite"
                >
                  <Bookmark size={13} fill={favorited ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Model name */}
            <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
              {model.name}
            </h1>

            {/* Data readout grid */}
            <div className="mt-4 grid grid-cols-2 gap-px border border-dashed border-border sm:grid-cols-4">
              {[
                { label: 'CREATOR', value: model.creator },
                { label: 'YEAR', value: String(model.year) },
                { label: 'PARAMS', value: model.params },
                { label: 'COST', value: model.cost },
              ].map((cell) => (
                <div
                  key={cell.label}
                  className="border border-dashed border-border bg-background/50 px-3 py-2.5"
                >
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    {cell.label}
                  </p>
                  <p className="mt-0.5 font-mono text-xs tabular-nums text-foreground">
                    {cell.value}
                  </p>
                </div>
              ))}
            </div>

            {/* ID line */}
            <p className="mt-3 font-mono text-[10px] text-muted-foreground/50">
              ID: {model.id} | ERA: {model.era} | IDX: {String(modelIndex + 1).padStart(2, '0')}/
              {String(models.length).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div
          className={cn(
            'mt-6 flex gap-px overflow-x-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{ transitionDelay: '100ms' }}
        >
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'whitespace-nowrap border border-dashed px-4 py-2.5 font-mono text-xs transition-all duration-200',
                activeTab === tab.id
                  ? 'border-primary/40 bg-primary/5 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground',
              )}
            >
              [{tab.label}]
            </button>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}
        <div
          ref={contentRef}
          className="mt-4 animate-[terminalFadeIn_0.3s_ease-out]"
          key={activeTab}
        >
          {/* ---------- OVERVIEW ---------- */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Description */}
              <div className="terminal-card-solid p-5">
                <p className="data-label mb-3">[Description]</p>
                <p className="text-sm leading-[1.7] text-foreground/85 whitespace-pre-line">
                  {model.description}
                </p>
              </div>

              {/* Example output as styled quote */}
              {model.example && (
                <div className="relative terminal-card-solid overflow-hidden p-5">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ backgroundColor: model.color }}
                  />
                  <p className="data-label mb-3">[Example Output]</p>
                  <div className="pl-3">
                    <p className="font-mono text-[13px] leading-[1.8] text-foreground/80 whitespace-pre-line italic">
                      {model.example}
                    </p>
                  </div>
                </div>
              )}

              {/* Capability bars */}
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Capability', key: 'capability', value: model.capability },
                  { label: 'Hype Level', key: 'hype', value: model.hype },
                  { label: 'Safety Rating', key: 'safety', value: model.safety },
                ].map((bar, i) => (
                  <div
                    key={bar.label}
                    className="terminal-card-solid p-4"
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="data-label">[{bar.label}]</span>
                      <span className="font-mono text-xs tabular-nums text-foreground">
                        {bar.value}/100
                      </span>
                    </div>
                    <div className="mt-2.5 metric-bar">
                      <div
                        className="metric-bar-fill"
                        style={{
                          width: `${barWidths[bar.key] || 0}%`,
                          backgroundColor: model.color,
                          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${400 + i * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- STATS ---------- */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: 'Parameters', value: model.params, mono: true },
                { label: 'Training Cost', value: model.cost, mono: true },
                { label: 'Capability', value: `${model.capability}/100`, mono: true },
                { label: 'Hype Level', value: `${model.hype}/100`, mono: true },
                { label: 'Safety Score', value: `${model.safety}/100`, mono: true },
                { label: 'Release Year', value: String(model.year), mono: true },
                { label: 'Status', value: model.status.toUpperCase(), mono: false },
                {
                  label: 'License',
                  value: model.open ? 'Open Source' : 'Proprietary',
                  mono: false,
                },
                { label: 'Era', value: model.era, mono: false },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="terminal-card-solid p-4 transition-all duration-500"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <p className="data-label">[{stat.label}]</p>
                  <p
                    className={cn(
                      'mt-1.5 text-lg tabular-nums text-foreground',
                      stat.mono && 'font-mono',
                    )}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ---------- OPINIONS ---------- */}
          {activeTab === 'opinions' && (
            <div className="space-y-2">
              {model.opinions.length === 0 ? (
                <div className="terminal-card-solid p-10 text-center">
                  <p className="font-mono text-sm text-muted-foreground">
                    No opinions logged for this model.
                  </p>
                </div>
              ) : (
                model.opinions.map((op, i) => {
                  const isPositive = op.sentiment === '+'
                  return (
                    <div key={i} className="terminal-card-solid relative overflow-hidden p-4">
                      {/* Accent side bar */}
                      <div
                        className={cn(
                          'absolute left-0 top-0 bottom-0 w-[2px]',
                          isPositive ? 'bg-emerald-500' : 'bg-red-500',
                        )}
                      />
                      {/* Sentiment badge */}
                      <span
                        className={cn(
                          'inline-block border border-dashed px-2 py-0.5 font-mono text-[10px]',
                          isPositive
                            ? 'border-emerald-500/30 text-emerald-400'
                            : 'border-red-500/30 text-red-400',
                        )}
                      >
                        {isPositive ? '[POSITIVE]' : '[NEGATIVE]'}
                      </span>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground">
                        {'"'}
                        {op.text}
                        {'"'}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                        -- {op.source}
                        {op.url && (
                          <a
                            href={op.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1.5 inline-flex items-center gap-0.5 text-primary hover:underline"
                          >
                            src <ExternalLink size={9} />
                          </a>
                        )}
                      </p>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* ---------- BUGS & SCANDALS ---------- */}
          {activeTab === 'bugs' && (
            <div className="space-y-2">
              {model.bugs.length === 0 ? (
                <div className="terminal-card-solid p-10 text-center">
                  <p className="font-mono text-sm text-muted-foreground">
                    Clean record. No incidents to report.
                  </p>
                </div>
              ) : (
                model.bugs.map((bug, i) => {
                  const sev = severityConfig[bug.severity] || severityConfig.feature
                  return (
                    <div key={i} className="terminal-card-solid p-4">
                      <span
                        className={cn(
                          'inline-block border px-2 py-0.5 font-mono text-[10px]',
                          sev.color,
                          sev.bg,
                        )}
                      >
                        [{sev.label}]
                      </span>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground">{bug.text}</p>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* ---------- MEDIA ---------- */}
          {activeTab === 'media' && (
            <div className="space-y-2">
              {model.media.length === 0 ? (
                <div className="terminal-card-solid p-10 text-center">
                  <p className="font-mono text-sm text-muted-foreground">
                    No media artifacts available.
                  </p>
                </div>
              ) : (
                model.media.map((m, i) => (
                  <a
                    key={i}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-card-solid flex items-center gap-3 p-4 transition-all duration-200 hover:border-primary"
                  >
                    <span className="shrink-0 border border-dashed border-primary/30 px-2 py-0.5 font-mono text-[10px] text-primary">
                      [{m.type.toUpperCase()}]
                    </span>
                    <span className="text-sm text-foreground">{m.title}</span>
                    <ExternalLink size={12} className="ml-auto shrink-0 text-muted-foreground" />
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        {/* ===== COMMUNITY SECTION ===== */}
        <div className="mt-8 terminal-card-solid p-6">
          <p className="data-label">[Community Feedback]</p>

          {/* Like / Dislike */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setLikes((l) => l + 1)}
              className="flex items-center gap-1.5 border border-dashed border-border px-3 py-1.5 font-mono text-xs text-emerald-400 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 active:scale-95"
            >
              <Heart size={12} /> {likes}
            </button>
            <button
              onClick={() => setDislikes((d) => d + 1)}
              className="flex items-center gap-1.5 border border-dashed border-border px-3 py-1.5 font-mono text-xs text-red-400 transition-all hover:border-red-500/30 hover:bg-red-500/5 active:scale-95"
            >
              <ThumbsDown size={12} /> {dislikes}
            </button>
          </div>

          {/* Star rating */}
          <div className="mt-4 flex items-center gap-0.5">
            <span className="mr-2 data-label">[Rating]</span>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className={cn(
                  'transition-all duration-150 hover:scale-110',
                  s <= rating ? 'text-yellow-400' : 'text-muted-foreground/20',
                )}
              >
                <Star size={16} fill={s <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 font-mono text-xs text-muted-foreground">{rating}/5</span>
            )}
          </div>

          {/* Stickers */}
          <div className="mt-5">
            <p className="data-label mb-2">[Stickers]</p>
            <div className="flex flex-wrap gap-1.5">
              {stickerTypes.map((sticker) => {
                const count = stickerCounts[sticker.id] || 0
                return (
                  <button
                    key={sticker.id}
                    onClick={() => handleSticker(sticker.id)}
                    className={cn(
                      'flex items-center gap-1 border border-dashed px-2 py-1 font-mono text-[10px] transition-all duration-150 hover:border-primary/30 hover:bg-primary/5 active:scale-95',
                      count > 0
                        ? 'border-primary/20 text-foreground'
                        : 'border-border text-muted-foreground',
                    )}
                  >
                    <span>{sticker.emoji}</span>
                    <span>{sticker.label}</span>
                    {count > 0 && <span className="ml-0.5 text-primary">{count}</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Comments placeholder */}
          <div className="mt-5 border-t border-dashed border-border pt-4">
            <p className="font-mono text-xs text-muted-foreground/60">
              {'>'} Comments coming soon<span className="blink">_</span>
            </p>
          </div>
        </div>

        {/* ===== PREV / NEXT NAVIGATION ===== */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {prevModel ? (
            <Link
              href={`/model/${prevModel.slug}`}
              className="terminal-card-solid group flex items-center gap-2 p-3 transition-all duration-200 hover:border-primary/30"
            >
              <ChevronLeft
                size={14}
                className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
              />
              <div className="min-w-0">
                <p className="data-label">[Prev]</p>
                <p className="mt-0.5 truncate text-xs text-foreground">{prevModel.name}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/explore"
            className="terminal-card-solid flex items-center justify-center p-3 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            [All Models]
          </Link>

          {nextModel ? (
            <Link
              href={`/model/${nextModel.slug}`}
              className="terminal-card-solid group flex items-center justify-end gap-2 p-3 transition-all duration-200 hover:border-primary/30"
            >
              <div className="min-w-0 text-right">
                <p className="data-label">[Next]</p>
                <p className="mt-0.5 truncate text-xs text-foreground">{nextModel.name}</p>
              </div>
              <ChevronRight
                size={14}
                className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
