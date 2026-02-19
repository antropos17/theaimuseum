"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { graveyard } from "@/data/models"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

const SEVERITY_MAP: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: "CATASTROPHIC", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  1: { label: "FATAL", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  2: { label: "CRITICAL", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  3: { label: "SEVERE", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  4: { label: "CRITICAL", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  5: { label: "CHRONIC", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
}

function CrashCard({ item, index, expanded, onToggle }: {
  item: typeof graveyard[0]
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const severity = SEVERITY_MAP[index] || SEVERITY_MAP[0]
  const errorCode = `ERR_${(index * 1337 + 4096).toString(16).toUpperCase()}`

  const handleShareRIP = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card toggle
    const birthYear = item.years.split(/[–-]/)[0].trim()
    const deathYear = item.years.split(/[–-]/)[1]?.trim() || "present"
    const twitterText = `RIP ${item.name} (${birthYear}–${deathYear}) — via @theaimuseum`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent("https://v0-theaimuseum.vercel.app/graveyard")}`
    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full text-left border border-dashed transition-all duration-300",
          "bg-[#0c0a0a] hover:bg-[#110e0e]",
          expanded ? "border-red-500/30" : "border-border/50 hover:border-red-500/20"
        )}
        style={{ borderRadius: 0 }}
      >
        {/* Error header bar */}
        <div className="flex items-center gap-3 border-b border-dashed border-border/30 px-4 py-2.5"
          style={{ background: "rgba(255, 68, 68, 0.03)" }}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              {severity.label}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-[10px] text-muted-foreground/50">{errorCode}</span>
            <span className={cn(
              "border px-2 py-0.5 font-mono text-[9px] uppercase",
              severity.bg, severity.color
            )}>
              TERMINATED
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="px-4 py-4">
          {/* Name + years */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-medium text-foreground line-through decoration-red-500/40 decoration-1">
                {item.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                OPERATIONAL: <span className="text-foreground/70">{item.years}</span>
              </p>
            </div>
            <div
              className="mt-0.5 h-3 w-3 shrink-0 border border-dashed transition-transform duration-200"
              style={{
                borderColor: item.color,
                backgroundColor: `${item.color}20`,
                transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              }}
            />
          </div>

          {/* Cause of death */}
          <div className="mt-3 flex items-start gap-2">
            <span className="shrink-0 font-mono text-[10px] uppercase text-red-400/70">
              [CAUSE]
            </span>
            <p className="text-[13px] leading-relaxed text-orange-300/90">
              {item.cause}
            </p>
          </div>

          {/* Survivability bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                SURVIVABILITY
              </span>
              <span className="font-mono text-[10px] text-red-400">0.00%</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden bg-muted/30">
              <div
                className="h-full bg-red-500/50"
                style={{ width: "0%", transition: "width 1s ease-out 0.5s" }}
              />
            </div>
          </div>

          {/* Expand hint + Share button */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="font-mono text-[10px] text-muted-foreground/40">
              {expanded ? "> COLLAPSE [-]" : "> EXPAND [+]"}
            </div>
            <button
              onClick={handleShareRIP}
              className="opacity-40 hover:opacity-100 transition-opacity"
              title="Share RIP"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded detail */}
        <div className={cn(
          "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="border-t border-dashed border-border/30 px-4 py-4"
            style={{ background: "rgba(255, 68, 68, 0.02)" }}
          >
            <div className="flex gap-2">
              <span className="shrink-0 font-mono text-[10px] text-muted-foreground/50">
                {"//"}
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase text-muted-foreground/50 mb-2">
                  CRASH_DUMP.LOG
                </p>
                <p className="text-[13px] leading-relaxed text-foreground/70">
                  {item.detail}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-dashed border-border/20 pt-3">
              <span className="font-mono text-[10px] text-muted-foreground/40">STATUS:</span>
              <span className="font-mono text-[10px] text-red-400">
                PERMANENTLY_OFFLINE
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/30">
                RECOVERY: IMPOSSIBLE
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

export function GraveyardView() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const totalYearsWasted = graveyard.reduce((sum, g) => {
    const match = g.years.match(/(\d{4})\s*[–-]\s*(\d{4})/)
    if (match) return sum + (parseInt(match[2]) - parseInt(match[1]))
    return sum + 0
  }, 0)

  return (
    <div className="min-h-screen pt-16" style={{ background: "#060404" }}>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        {/* Header */}
        <div className={cn(
          "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        )}>
          <Link href="/" className="flex items-center gap-1.5 mb-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Museum
          </Link>
          {/* System error banner */}
          <div className="mb-6 flex items-center gap-2 border border-dashed border-red-500/20 bg-red-500/5 px-4 py-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              SYSTEM ERROR LOG :: TERMINATED PROJECTS
            </span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
              {graveyard.length} entries
            </span>
          </div>

          <h1 className="text-2xl font-light tracking-tight text-foreground sm:text-3xl">
            AI Graveyard
          </h1>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            Fatal errors. Catastrophic failures. Cautionary tales from the history
            of artificial intelligence.
          </p>

          {/* Summary stats */}
          <div className="mt-5 flex flex-wrap gap-4">
            <div className="font-mono text-[11px] text-muted-foreground/60">
              [PROJECTS] <span className="text-red-400">{graveyard.length}</span>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground/60">
              [YEARS_WASTED] <span className="text-orange-400">{totalYearsWasted}+</span>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground/60">
              [BILLIONS_BURNED] <span className="text-yellow-400">$15B+</span>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground/60">
              [SURVIVAL_RATE] <span className="text-red-400">0%</span>
            </div>
          </div>
        </div>

        {/* Crash reports */}
        <div className="mt-10 space-y-3">
          {graveyard.map((item, i) => (
            <CrashCard
              key={item.name}
              item={item}
              index={i}
              expanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom epitaph */}
        <div className={cn(
          "mt-16 transition-all duration-700 delay-300",
          entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <div className="border-t border-dashed border-border/20 pt-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30">
              END OF ERROR LOG
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground/60">
              {'"Move fast and break things."'}
            </p>
            <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/40">
              They moved fast. Things broke. People were affected.
            </p>
            <p className="mt-4 font-mono text-[10px] text-red-400/30">
              {'> process.exit(1)_'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
