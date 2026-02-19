"use client"

import { useState, useEffect, useRef } from "react"
import { victims } from "@/data/models"
import { cn } from "@/lib/utils"

/* ── Countdown counter: counts DOWN from 100 to remaining % ───── */
function PowerDown({ target, color }: { target: number; color: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(100)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const dur = 2000
          const start = performance.now()
          const step = (now: number) => {
            const t = Math.min((now - start) / dur, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            setVal(Math.round(100 - ease * (100 - target)))
            if (t < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-mono text-xl tabular-nums" style={{ color }}>
      {val}%
    </span>
  )
}

export function VictimsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <span className="data-label">[Impact Assessment]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          Victims of AI
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Professions losing power. Systems shutting down.
        </p>

        {/* System status banner */}
        <div className="mt-6 flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-chart-5 pulse-dot" />
          <span className="text-chart-5">POWER_DRAIN DETECTED</span>
          <span className="text-muted-foreground">-- monitoring {victims.length} sectors</span>
        </div>

        <div className="mt-6 space-y-3">
          {victims.map((victim, i) => {
            const isOpen = expanded === i
            const lostPct = 100 - victim.currentPct
            const severity = victim.currentPct <= 40 ? "CRITICAL" : victim.currentPct <= 55 ? "WARNING" : "DEGRADED"
            const sevColor = severity === "CRITICAL" ? "text-chart-5" : severity === "WARNING" ? "text-chart-4" : "text-primary"

            return (
              <button
                key={victim.profession}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="terminal-card-solid group w-full p-5 text-left transition-all duration-300 hover:-translate-y-px"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{victim.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{victim.profession}</p>
                      <span className={cn("font-mono text-[10px]", sevColor)}>[{severity}]</span>
                    </div>
                  </div>
                  <PowerDown
                    target={victim.currentPct}
                    color={victim.currentPct <= 40 ? "var(--chart-5)" : victim.currentPct <= 55 ? "var(--chart-4)" : "var(--primary)"}
                  />
                </div>

                {/* Remaining power bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="data-label">Remaining Power</span>
                    <span className="font-mono text-[10px] tabular-nums text-chart-5">
                      -{lostPct}% lost
                    </span>
                  </div>
                  <div className="mt-1.5 metric-bar">
                    <div
                      className="metric-bar-fill transition-all duration-[2s] ease-out"
                      style={{
                        width: `${victim.currentPct}%`,
                        backgroundColor: victim.currentPct <= 40 ? "var(--chart-5)" : victim.currentPct <= 55 ? "var(--chart-4)" : "var(--primary)",
                      }}
                    />
                  </div>
                  {/* Scale markers */}
                  <div className="mt-1 flex justify-between font-mono text-[9px] text-muted-foreground/50">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Expandable detail */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-dashed border-border pt-4">
                    <p className="data-label text-chart-5">[System Log]</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">{victim.detail}</p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? "[-] Collapse" : "[+] Read diagnostics"}
                </p>
              </button>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 terminal-card p-5 text-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            DISCLAIMER: Illustrative estimates. Real impact varies by sector and geography.
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/50">
            Data sources: McKinsey, Goldman Sachs AI Impact Reports 2024
          </p>
        </div>
      </div>
    </div>
  )
}
