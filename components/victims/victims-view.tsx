"use client"

import { useState } from "react"
import { victims } from "@/data/models"
import { cn } from "@/lib/utils"

export function VictimsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <span className="data-label">[Impact]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">Victims of AI</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
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
                className="terminal-card-solid w-full p-5 text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">{victim.profession}</span>
                  <span className={cn("font-mono text-sm tabular-nums", lostPct >= 50 ? "text-chart-5" : "text-chart-4")}>
                    -{lostPct}%
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">0</span>
                  <div className="metric-bar flex-1">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: `${victim.currentPct}%`,
                        backgroundColor: victim.currentPct > 50 ? "var(--chart-3)" : "var(--chart-5)",
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">100</span>
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">Remaining: ~{victim.currentPct}%</span>
                  <span className="font-mono text-[10px] text-chart-5/70">Lost: ~{lostPct}%</span>
                </div>

                <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t border-dashed border-border pt-3">
                    <p className="text-[13px] leading-relaxed text-foreground/80">{victim.detail}</p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? "[-] Less" : "[+] More"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-10 terminal-card p-5 text-center">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            These are illustrative estimates. The situation is evolving rapidly.
          </p>
        </div>
      </div>
    </div>
  )
}
