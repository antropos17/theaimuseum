"use client"

import { useState } from "react"
import { ChevronRight, TrendingDown } from "lucide-react"
import { victims } from "@/data/models"
import { cn } from "@/lib/utils"

export function VictimsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Impact
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Victims of AI
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Every technological revolution has collateral damage. These are the professions
          being reshaped by artificial intelligence.
        </p>

        <div className="mt-10 space-y-3">
          {victims.map((victim, i) => {
            const isOpen = expanded === i
            const lostPct = 100 - victim.currentPct
            return (
              <button
                key={victim.profession}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-chart-5/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chart-5/10">
                      <TrendingDown className="h-4 w-4 text-chart-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {victim.profession}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "font-mono text-sm font-semibold tabular-nums",
                      lostPct >= 50 ? "text-chart-5" : "text-chart-4"
                    )}
                  >
                    -{lostPct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">0%</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${victim.currentPct}%`,
                        backgroundColor: victim.currentPct > 50 ? "var(--chart-3)" : "var(--chart-5)",
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">100%</span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Remaining: ~{victim.currentPct}%
                  </span>
                  <span className="font-mono text-[10px] text-chart-5/70">
                    Displaced: ~{lostPct}%
                  </span>
                </div>

                {/* Expanded */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-32 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="text-[13px] leading-relaxed text-foreground/80">
                      {victim.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <ChevronRight className={cn("h-3 w-3 transition-transform", isOpen && "rotate-90")} />
                  <span>{isOpen ? "Less" : "More"}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl border border-border bg-card p-5 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            These percentages are illustrative estimates based on industry reporting,
            not exact measurements. The situation is evolving rapidly.
            Some displaced roles are being replaced by new AI-adjacent positions.
          </p>
        </div>
      </div>
    </div>
  )
}
