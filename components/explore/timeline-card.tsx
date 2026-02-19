"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { AIModel } from "@/data/models"
import { categories } from "@/data/models"
import { cn } from "@/lib/utils"
import { CopyableTerminalCard } from "@/components/ui/copyable-terminal-card"
import { toast } from "@/hooks/use-toast"

const statusColors: Record<string, string> = {
  active: "#00ff88",
  historic: "#6b6b78",
  declining: "#ffaa00",
}

type EraStyle = "terminal" | "refined" | "glass"

export function TimelineCard({
  model,
  side = "left",
  eraStyle = "refined",
  index = 0,
}: {
  model: AIModel
  side?: "left" | "right"
  eraStyle?: EraStyle
  index?: number
}) {
  const cat = categories[model.category]
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Card base classes depending on era style */
  const cardBase = cn(
    "relative block p-4 transition-all duration-300",
    eraStyle === "terminal"
      ? "border border-dashed border-border bg-card hover:border-primary/50 hover:shadow-[0_0_16px_rgba(0,255,136,0.06)]"
      : eraStyle === "glass"
        ? "border border-solid border-primary/10 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_24px_rgba(0,255,136,0.08)]"
        : "terminal-card-solid"
  )

  /* Chrome dots color set */
  const chromeColors = eraStyle === "terminal"
    ? ["bg-muted-foreground/40", "bg-muted-foreground/30", "bg-muted-foreground/20"]
    : ["bg-destructive/60", "bg-warning/60", "bg-primary/60"]

  return (
    <div
      ref={cardRef}
      className={cn(
        "grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-0 md:gap-6",
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : `translateY(20px) translateX(${side === "left" ? "-12px" : "12px"})`,
        transitionProperty: "opacity, transform",
        transitionDuration: "0.7s",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${(index % 4) * 80}ms`,
      }}
    >
      {/* Left column (card or empty) */}
      <div className={cn("hidden md:block", side === "right" && "md:invisible")}>
        {side === "left" && (
          <CardContent
            model={model}
            cat={cat}
            cardBase={cardBase}
            eraStyle={eraStyle}
            chromeColors={chromeColors}
            align="right"
          />
        )}
      </div>

      {/* Center connector line + dot */}
      <div className="hidden flex-col items-center md:flex">
        <div className="h-3 w-px bg-border" />
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-full border-2"
          style={{
            borderColor: model.color,
            backgroundColor: visible ? model.color + "33" : "transparent",
            boxShadow: visible ? `0 0 8px ${model.color}44` : "none",
            transition: "all 0.6s ease",
          }}
        />
        <div className="h-full min-h-4 w-px bg-border" />
      </div>

      {/* Right column (card or empty) */}
      <div className={cn("hidden md:block", side === "left" && "md:invisible")}>
        {side === "right" && (
          <CardContent
            model={model}
            cat={cat}
            cardBase={cardBase}
            eraStyle={eraStyle}
            chromeColors={chromeColors}
            align="left"
          />
        )}
      </div>

      {/* Mobile: always render the card (below the grid) */}
      <div className="md:hidden">
        <CardContent
          model={model}
          cat={cat}
          cardBase={cardBase}
          eraStyle={eraStyle}
          chromeColors={chromeColors}
          align="left"
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Card content (shared between left/right/mobile)
   ───────────────────────────────────────────────────── */
function CardContent({
  model,
  cat,
  cardBase,
  eraStyle,
  chromeColors,
  align,
}: {
  model: AIModel
  cat: { icon: string; label: string; color: string }
  cardBase: string
  eraStyle: EraStyle
  chromeColors: string[]
  align: "left" | "right"
}) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
    }
    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showShareMenu])

  const generateTweet = () => {
    const fact = `${model.name} (${model.year}) — ${model.description}`
    const tweet = `Did you know? ${fact} 🤖 via @theaimuseum`
    return tweet.length > 280 ? tweet.substring(0, 277) + "..." : tweet
  }

  const handleTwitterShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const tweetText = encodeURIComponent(generateTweet())
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank", "width=550,height=420")
    setShowShareMenu(false)
  }

  const handleCopyFact = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const fact = `${model.name} (${model.year}) — ${model.description}`
    navigator.clipboard.writeText(fact)
    toast({
      description: "Copied!",
      duration: 2000,
    })
    setShowShareMenu(false)
  }

  const handleWebShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${model.name} (${model.year})`,
          text: model.description,
          url: `${window.location.origin}/model/${model.slug}`,
        })
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(`${window.location.origin}/model/${model.slug}`)
      toast({
        description: "Link copied!",
        duration: 2000,
      })
    }
    setShowShareMenu(false)
  }

  const toggleShareMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowShareMenu(!showShareMenu)
  }

  return (
    <div className="relative">
      <Link href={`/model/${model.slug}`} className={cn(cardBase, "group block")}>
        {/* Terminal window chrome bar */}
        <div className="mb-3 flex items-center gap-1.5">
          <div className={cn("h-1.5 w-1.5 rounded-full", chromeColors[0])} />
          <div className={cn("h-1.5 w-1.5 rounded-full", chromeColors[1])} />
          <div className={cn("h-1.5 w-1.5 rounded-full", chromeColors[2])} />
          <span className="ml-2 font-mono text-[9px] text-muted-foreground/60">
            {model.slug}.exe
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: statusColors[model.status] || "#6b6b78" }}
              title={model.status}
            />
          </div>
        </div>

      {/* Name + year + creator */}
      <div className={cn("flex items-baseline gap-2", align === "right" && "md:justify-end")}>
        <span className={cn(
          "text-sm text-foreground transition-colors group-hover:text-primary",
          eraStyle === "terminal" ? "font-mono" : "font-sans"
        )}>
          {model.name}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-primary/70">{model.year}</span>
      </div>
      <p className={cn(
        "mt-0.5 font-mono text-[10px] text-muted-foreground",
        align === "right" && "md:text-right"
      )}>
        {model.creator}
      </p>

      {/* Description */}
      <p className={cn(
        "mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground",
        align === "right" && "md:text-right"
      )}>
        {model.description}
      </p>

      {/* Capability bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className="metric-bar flex-1">
          <div
            className="metric-bar-fill"
            style={{ width: `${model.capability}%`, backgroundColor: model.color }}
          />
        </div>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{model.capability}%</span>
      </div>

      {/* Tags */}
      <div className={cn("mt-2.5 flex items-center gap-1.5 flex-wrap", align === "right" && "md:justify-end")}>
        <span
          className="border border-current/20 px-1.5 py-0.5 font-mono text-[10px]"
          style={{ color: cat.color }}
        >
          {cat.icon} {cat.label}
        </span>
        <span
          className={cn(
            "border px-1.5 py-0.5 font-mono text-[10px]",
            model.open ? "border-chart-3/20 text-chart-3" : "border-border text-muted-foreground"
          )}
        >
          {model.open ? "OPEN" : "CLOSED"}
        </span>
      </div>
    </Link>
  )
}
