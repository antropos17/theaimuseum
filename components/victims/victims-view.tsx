"use client"

import { useState } from "react"
import { victims } from "@/data/models"
import { cn } from "@/lib/utils"

export function VictimsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Victims of AI
        </h1>
        <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
          Every technological revolution has collateral damage. These are the professions
          being reshaped by artificial intelligence.
        </p>

        <div className="mt-10 space-y-4">
          {victims.map((victim, i) => {
            const isOpen = expanded === i
            const lostPct = 100 - victim.currentPct
            return (
              <button
                key={victim.profession}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={cn(
                  "w-full text-left glass rounded-xl p-6 transition-all duration-300",
                  isOpen && "glass-hover"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{victim.emoji}</span>
                    <h3 className="font-sans text-base font-bold text-foreground">
                      {victim.profession}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "font-mono text-sm font-bold",
                      lostPct >= 50 ? "text-destructive" : "text-[var(--museum-warning)]"
                    )}
                  >
                    -{lostPct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground">0%</span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                    {/* Remaining (green) */}
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${victim.currentPct}%`,
                        backgroundColor: victim.currentPct > 50 ? "var(--museum-success)" : "var(--museum-danger)",
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">100%</span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Jobs remaining: ~{victim.currentPct}%
                  </span>
                  <span className="font-mono text-[11px] text-destructive/70">
                    Displaced: ~{lostPct}%
                  </span>
                </div>

                {/* Expanded detail */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-32 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="font-sans text-sm leading-relaxed text-foreground/80">
                      {victim.detail}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 glass rounded-xl p-6 text-center">
          <p className="font-sans text-xs leading-relaxed text-muted-foreground">
            These percentages are illustrative estimates based on industry reporting,
            not exact measurements. The situation is evolving rapidly.
            Some displaced roles are being replaced by new AI-adjacent positions.
          </p>
        </div>
      </div>
    </div>
  )
}
