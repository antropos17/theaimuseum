"use client"

import { useState } from "react"
import { victims } from "@/data/models"
import { cn } from "@/lib/utils"

export function VictimsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Impact</p>
        <h1 className="text-lg text-primary sm:text-xl">VICTIMS OF AI</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          Professions being reshaped by artificial intelligence.
        </p>

        <div className="mt-8 space-y-2">
          {victims.map((victim, i) => {
            const isOpen = expanded === i
            const lostPct = 100 - victim.currentPct
            return (
              <button
                key={victim.profession}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="pixel-border w-full bg-card p-4 text-left transition-colors hover:border-chart-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-chart-5">v</span>
                    <span className="text-[9px] text-foreground">{victim.profession}</span>
                  </div>
                  <span className={cn("text-[9px] tabular-nums", lostPct >= 50 ? "text-chart-5" : "text-chart-4")}>
                    -{lostPct}%
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[6px] text-muted-foreground">0</span>
                  <div className="h-[6px] flex-1 bg-muted">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${victim.currentPct}%`,
                        backgroundColor: victim.currentPct > 50 ? "var(--chart-3)" : "var(--chart-5)",
                      }}
                    />
                  </div>
                  <span className="text-[6px] text-muted-foreground">100</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-[6px] text-muted-foreground">REM: ~{victim.currentPct}%</span>
                  <span className="text-[6px] text-chart-5/70">LOST: ~{lostPct}%</span>
                </div>

                <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "mt-3 max-h-32 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t-2 border-dashed border-border pt-3">
                    <p className="text-[7px] leading-[2] text-foreground/80">{victim.detail}</p>
                  </div>
                </div>
                <p className="mt-2 text-[6px] text-muted-foreground">
                  {isOpen ? "[-] LESS" : "[+] MORE"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-10 pixel-border bg-card p-4 text-center">
          <p className="text-[7px] leading-[2] text-muted-foreground">
            These are illustrative estimates. The situation is evolving rapidly.
          </p>
        </div>
      </div>
    </div>
  )
}
